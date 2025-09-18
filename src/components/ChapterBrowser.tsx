import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Loader2, BookOpen, Hash } from 'lucide-react';

interface Chapter {
  id: number;
  title: string;
  titleAr?: string;
  hadithCount?: number;
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

export const ChapterBrowser = ({ onChapterSelect }: ChapterBrowserProps) => {
  const [selectedBook, setSelectedBook] = useState('');
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchChapters = async (bookPath: string) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`https://cdn.jsdelivr.net/gh/md-rifatkhan/hadithbangla@main/${bookPath}/Chapter/1.json`);
      if (!response.ok) throw new Error('Failed to fetch chapters');
      const data = await response.json();
      setChapters(data.chapters || data || []);
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
                {chapter.description && (
                  <p className="text-sm text-muted-foreground mb-3 font-bengali">
                    {chapter.description}
                  </p>
                )}
                {chapter.hadithCount && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground font-bengali">
                      হাদিস সংখ্যা: {chapter.hadithCount}
                    </span>
                  </div>
                )}
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-3"
                  onClick={() => onChapterSelect?.(selectedBook, chapter.id)}
                >
                  অধ্যায় দেখুন
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};