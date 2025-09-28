import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  BookOpen, 
  ChevronRight, 
  Hash, 
  User, 
  Star,
  Filter,
  Search,
  ArrowRight,
  List
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toBanglaNumber } from '@/lib/utils';

interface Hadith {
  hadith_id: number;
  narrator: string;
  bn: string;
  ar?: string;
  grade: string;
  grade_color: string;
  note?: string;
}

interface ChapterData {
  id: number;
  title: string;
  hadiths: Hadith[];
  hadithCount: number;
  book: string;
}

interface ChapterNavigatorProps {
  onHadithSelect?: (bookSlug: string, hadithId: number, chapterId: number) => void;
}

const books = [
  { slug: 'bukhari', name: 'সহীহ বুখারী', path: 'Bukhari' },
  { slug: 'muslim', name: 'সহীহ মুসলিম', path: 'Muslim' },
  { slug: 'abu-dawood', name: 'সুনান আবু দাউদ', path: 'AbuDaud' },
  { slug: 'ibn-majah', name: 'সুনান ইবনে মাজাহ', path: 'Ibne-Mazah' },
  { slug: 'nasai', name: 'সুনান নাসাঈ', path: 'Al-Nasai' },
  { slug: 'tirmidhi', name: 'সুনান তিরমিযী', path: 'At-tirmizi' }
];

// Function to get metadata filename for each book
const getMetadataFilename = (bookPath: string) => {
  const filenameMap: Record<string, string> = {
    'Bukhari': 'bukhari',
    'Muslim': 'muslim',
    'AbuDaud': 'abudaud',
    'Ibne-Mazah': 'ibnemajah',
    'Al-Nasai': 'nasai',
    'At-tirmizi': 'tirmizi'
  };
  return filenameMap[bookPath] || bookPath.toLowerCase();
};

export const ChapterNavigator = ({ onHadithSelect }: ChapterNavigatorProps) => {
  const navigate = useNavigate();
  
  // State
  const [selectedBook, setSelectedBook] = useState('bukhari');
  const [chapters, setChapters] = useState<ChapterData[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<ChapterData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [gradeFilter, setGradeFilter] = useState('all');
  const [chapterMetadata, setChapterMetadata] = useState<Record<string, Record<string, { title: string; hadis_range: string }>>>({});

  // Function to fetch chapter metadata
  const fetchChapterMetadata = async (bookPath: string) => {
    if (chapterMetadata[bookPath]) return; // Already loaded
    try {
      const metadataFilename = getMetadataFilename(bookPath);
      const response = await fetch(
        `https://raw.githubusercontent.com/md-rifatkhan/hadithbangla/main/${bookPath}/Meta/${metadataFilename}.json`
      );
      if (response.ok) {
        const data = await response.json();
        setChapterMetadata(prev => ({ ...prev, [bookPath]: data }));
      }
    } catch (error) {
      console.warn('Could not fetch chapter metadata:', error);
    }
  };

  // Function to get chapter title
  const getChapterTitle = (bookPath: string, chapterNumber: string) => {
    if (!chapterMetadata[bookPath]) {
      return `অধ্যায় ${chapterNumber}`;
    }
    const metadata = chapterMetadata[bookPath][chapterNumber];
    return metadata ? metadata.title : `অধ্যায় ${chapterNumber}`;
  };

  // Load chapters when book changes
  useEffect(() => {
    if (selectedBook) {
      const book = books.find(b => b.slug === selectedBook);
      if (book) {
        fetchChapterMetadata(book.path); // Fetch metadata first
        loadChapters(selectedBook);
      }
    } else {
      setChapters([]);
      setSelectedChapter(null);
    }
  }, [selectedBook]);

  const loadChapters = async (bookSlug: string) => {
    setLoading(true);
    setError('');
    
    try {
      const book = books.find(b => b.slug === bookSlug);
      if (!book) throw new Error('Book not found');
      
      const chaptersData: ChapterData[] = [];
      
      // Load first 15 chapters
      for (let chapterId = 1; chapterId <= 15; chapterId++) {
        try {
          const response = await fetch(
            `https://cdn.jsdelivr.net/gh/md-rifatkhan/hadithbangla@main/${book.path}/Chapter/${chapterId}.json`
          );
          
          if (response.ok) {
            const hadiths: Hadith[] = await response.json();
            
            if (Array.isArray(hadiths) && hadiths.length > 0) {
              chaptersData.push({
                id: chapterId,
                title: getChapterTitle(book.path, chapterId.toString()),
                hadiths,
                hadithCount: hadiths.length,
                book: bookSlug
              });
            }
          }
        } catch (chapterError) {
          console.warn(`Failed to load chapter ${chapterId}:`, chapterError);
        }
      }
      
      setChapters(chaptersData);
      
      // Auto-select first chapter if available
      if (chaptersData.length > 0) {
        setSelectedChapter(chaptersData[0]);
      }
      
    } catch (err) {
      console.error('Failed to load chapters:', err);
      setError('অধ্যায়সমূহ লোড করতে সমস্যা হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  const handleHadithClick = (hadith: Hadith, chapterId: number) => {
    if (onHadithSelect) {
      onHadithSelect(selectedBook, hadith.hadith_id, chapterId);
    } else {
      navigate(`/read/${selectedBook}/${hadith.hadith_id}`);
    }
  };

  const filteredHadiths = selectedChapter?.hadiths.filter(hadith => {
    const matchesSearch = !searchQuery || 
      hadith.bn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hadith.narrator.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesGrade = !gradeFilter || gradeFilter === 'all' || hadith.grade === gradeFilter;
    
    return matchesSearch && matchesGrade;
  }) || [];

  const getGradeColorClass = (grade: string) => {
    switch (grade) {
      case 'সহিহ হাদিস': return 'bg-green-500';
      case 'হাসান হাদিস': return 'bg-orange-500';
      case 'যঈফ হাদিস': return 'bg-red-500';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="space-y-6">
      {/* Book Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-bengali">
            <BookOpen className="h-5 w-5" />
            অধ্যায় নেভিগেশন
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedBook} onValueChange={setSelectedBook}>
            <SelectTrigger>
              <SelectValue placeholder="একটি হাদিস গ্রন্থ নির্বাচন করুন" />
            </SelectTrigger>
            <SelectContent>
              {books.map((book) => (
                <SelectItem key={book.slug} value={book.slug}>
                  <span className="font-bengali">{book.name}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {loading && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="font-bengali">অধ্যায়সমূহ লোড হচ্ছে...</p>
          </CardContent>
        </Card>
      )}

      {error && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-destructive font-bengali">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Chapter Navigation */}
      {chapters.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chapter List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-bengali text-lg">
                <List className="h-5 w-5" />
                অধ্যায়সমূহ
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-96">
                <div className="p-4 space-y-2">
                  {chapters.map((chapter) => (
                    <Button
                      key={chapter.id}
                      variant={selectedChapter?.id === chapter.id ? "default" : "ghost"}
                      className="w-full justify-between font-bengali"
                      onClick={() => setSelectedChapter(chapter)}
                    >
                      <div className="flex items-center gap-2">
                        <Hash className="h-4 w-4" />
                        {chapter.title}
                      </div>
                      <Badge variant="secondary">
                        {chapter.hadithCount}
                      </Badge>
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Chapter Details and Hadiths */}
          <div className="lg:col-span-2 space-y-4">
            {selectedChapter && (
              <>
                {/* Chapter Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between font-bengali">
                      <div className="flex items-center gap-2">
                        <Hash className="h-5 w-5" />
                        {selectedChapter.title}
                      </div>
                      <Badge variant="secondary">
                        {selectedChapter.hadithCount} টি হাদিস
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                </Card>

                {/* Search and Filters */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1">
                        <div className="relative">
                          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="হাদিস বা রাবী খুঁজুন..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 font-bengali"
                          />
                        </div>
                      </div>
                      
                      <Select value={gradeFilter} onValueChange={setGradeFilter}>
                        <SelectTrigger className="w-full sm:w-48">
                          <SelectValue placeholder="গ্রেড ফিল্টার" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">সব গ্রেড</SelectItem>
                          <SelectItem value="সহিহ হাদিস">সহিহ হাদিস</SelectItem>
                          <SelectItem value="হাসান হাদিস">হাসান হাদিস</SelectItem>
                          <SelectItem value="যঈফ হাদিস">যঈফ হাদিস</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Hadiths List */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between font-bengali text-lg">
                      <span>হাদিসসমূহ</span>
                      <span className="text-sm font-normal">
                        {filteredHadiths.length} টি হাদিস
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ScrollArea className="h-96">
                      <div className="p-4 space-y-4">
                        {filteredHadiths.map((hadith) => (
                          <Card 
                            key={hadith.hadith_id}
                            className="hover:shadow-md transition-shadow cursor-pointer"
                            onClick={() => handleHadithClick(hadith, selectedChapter.id)}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline">
                                    হাদিস নং {toBanglaNumber(hadith.hadith_id)}
                                  </Badge>
                                </div>
                                <Badge 
                                  className={`text-white font-bengali ${getGradeColorClass(hadith.grade)}`}
                                >
                                  {hadith.grade}
                                </Badge>
                              </div>
                              
                              <div className="flex items-center gap-2 mb-2">
                                <User className="h-3 w-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground font-bengali">
                                  {hadith.narrator}
                                </span>
                              </div>
                              
                              <p className="text-sm font-bengali line-clamp-3 mb-2">
                                {hadith.bn.substring(0, 200)}
                                {hadith.bn.length > 200 ? '...' : ''}
                              </p>
                              
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <span className="font-bengali">সম্পূর্ণ পড়ুন</span>
                                </div>
                                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                        
                        {filteredHadiths.length === 0 && (
                          <div className="text-center py-8">
                            <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                            <p className="font-bengali text-muted-foreground">
                              {searchQuery || gradeFilter ? 
                                'কোনো হাদিস খুঁজে পাওয়া যায়নি' : 
                                'এই অধ্যায়ে কোনো হাদিস নেই'
                              }
                            </p>
                          </div>
                        )}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};