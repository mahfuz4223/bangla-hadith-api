import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Loader2, BookOpen, Hash } from 'lucide-react';
import { toBanglaNumber } from '@/lib/utils';

interface Chapter {
  id: number;
  title: string;
  titleAr?: string;
  hadithCount: number;
  hadiths: Array<{
    hadith_id: number;
    narrator: string;
    bn: string;
    ar?: string;
    grade: string;
    grade_color: string;
  }>;
  description?: string;
}

interface ChapterBrowserProps {
  onChapterSelect?: (bookSlug: string, chapterId: number) => void;
}

const books = [
  { slug: 'bukhari', name: 'সহীহ বুখারী', nameEn: 'Sahih Bukhari', path: 'Bukhari' },
  { slug: 'muslim', name: 'সহীহ মুসলিম', nameEn: 'Sahih Muslim', path: 'Muslim' },
  { slug: 'abu-dawood', name: 'সুনান আবু দাউদ', nameEn: 'Sunan Abu Dawood', path: 'AbuDaud' },
  { slug: 'ibn-majah', name: 'সুনান ইবনে মাজাহ', nameEn: 'Sunan Ibn Majah', path: 'Ibne-Mazah' },
  { slug: 'nasai', name: 'সুনান নাসাঈ', nameEn: 'Sunan An-Nasa\'i', path: 'Al-Nasai' },
  { slug: 'tirmidhi', name: 'সুনান তিরমিযী', nameEn: 'Sunan At-Tirmidhi', path: 'At-tirmizi' },
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

export const ChapterBrowser = ({ onChapterSelect }: ChapterBrowserProps) => {
  const [selectedBook, setSelectedBook] = useState('bukhari');
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
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

  const fetchChapters = async (bookPath: string) => {
    setLoading(true);
    setError('');
    try {
      // Since each chapter file contains hadiths, let's load multiple chapters
      const chaptersData: Chapter[] = [];
      
      // Load first 20 chapters to get a good overview
      for (let chapterId = 1; chapterId <= 20; chapterId++) {
        try {
          const response = await fetch(`https://cdn.jsdelivr.net/gh/md-rifatkhan/hadithbangla@main/${bookPath}/Chapter/${chapterId}.json`);
          if (response.ok) {
            const hadiths = await response.json();
            
            if (Array.isArray(hadiths) && hadiths.length > 0) {
              // Create chapter info from the hadiths data
              const firstHadith = hadiths[0];
              const chapterTitle = getChapterTitle(bookPath, chapterId.toString());
              
              chaptersData.push({
                id: chapterId,
                title: chapterTitle,
                hadithCount: hadiths.length,
                hadiths: hadiths.map(h => ({
                  hadith_id: h.hadith_id,
                  narrator: h.narrator,
                  bn: h.bn,
                  ar: h.ar,
                  grade: h.grade,
                  grade_color: h.grade_color
                }))
              });
            }
          }
        } catch (chapterErr) {
          console.warn(`Failed to load chapter ${chapterId}:`, chapterErr);
        }
      }
      
      setChapters(chaptersData);
    } catch (err) {
      setError('অধ্যায় লোড করতে সমস্যা হয়েছে');
      setChapters([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedBook) {
      const book = books.find(b => b.slug === selectedBook);
      if (book) {
        fetchChapterMetadata(book.path); // Fetch metadata first
        fetchChapters(book.path);
      }
    }
  }, [selectedBook]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4 font-bengali">অধ্যায় অনুসন্ধান</h2>
        <Select value={selectedBook} onValueChange={setSelectedBook}>
          <SelectTrigger className="w-full max-w-md">
            <SelectValue placeholder="একটি হাদিস গ্রন্থ নির্বাচন করুন" />
          </SelectTrigger>
          <SelectContent>
            {books.map((book) => (
              <SelectItem key={book.slug} value={book.slug}>
                <div className="flex flex-col">
                  <span className="font-bengali">{book.name}</span>
                  <span className="text-sm text-muted-foreground">{book.nameEn}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="ml-2 font-bengali">অধ্যায় লোড হচ্ছে...</span>
        </div>
      )}

      {error && (
        <div className="text-destructive text-center py-4 font-bengali">{error}</div>
      )}

      {chapters.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {chapters.map((chapter) => (
            <Card key={chapter.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg font-bengali flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    {chapter.title}
                  </CardTitle>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Hash className="h-3 w-3" />
                    {chapter.id}
                  </Badge>
                </div>
                {chapter.titleAr && (
                  <CardDescription className="text-right font-arabic text-lg">
                    {chapter.titleAr}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground font-bengali">
                      হাদিস সংখ্যা: {toBanglaNumber(chapter.hadithCount)}
                    </span>
                  </div>
                  
                  {chapter.hadiths && chapter.hadiths.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground font-bengali">
                        প্রথম হাদিস:
                      </p>
                      <p className="text-xs text-muted-foreground font-bengali line-clamp-2">
                        {chapter.hadiths[0].bn.substring(0, 100)}...
                      </p>
                      <p className="text-xs text-muted-foreground font-bengali">
                        বর্ণনাকারী: {chapter.hadiths[0].narrator}
                      </p>
                    </div>
                  )}
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => onChapterSelect?.(selectedBook, chapter.id)}
                  >
                    অধ্যায় দেখুন
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};