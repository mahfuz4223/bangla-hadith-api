import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Loader2, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Hadith {
  hadith_id: number;
  narrator: string;
  bn: string;
  ar?: string;
  chapter_id: number;
  chapter_title: string;
}

interface HadithBook {
  name: string;
  nameAr: string;
  slug: string;
  totalHadith: number;
}

const hadithBooks: HadithBook[] = [
  { name: 'সহীহ বুখারী', nameAr: 'صحيح البخاري', slug: 'Bukhari', totalHadith: 7563 },
  { name: 'সহীহ মুসলিম', nameAr: 'صحيح مسلم', slug: 'Muslim', totalHadith: 7563 },
  { name: 'সুনান আবু দাউদ', nameAr: 'سنن أبي داود', slug: 'AbuDaud', totalHadith: 5274 },
  { name: 'সুনান ইবনে মাজাহ', nameAr: 'سنن ابن ماجه', slug: 'Ibne-Mazah', totalHadith: 4341 },
  { name: 'সুনান আন-নাসাঈ', nameAr: 'سنن النسائي', slug: 'Al-Nasai', totalHadith: 5758 },
  { name: 'সুনান আত-তিরমিযী', nameAr: 'سنن الترمذي', slug: 'At-tirmizi', totalHadith: 3956 },
];

export const HadithReader = () => {
  const [selectedBook, setSelectedBook] = useState<string>('');
  const [hadithNumber, setHadithNumber] = useState<number>(1);
  const [hadith, setHadith] = useState<Hadith | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const currentBook = hadithBooks.find(book => book.slug === selectedBook);

  const fetchHadith = async (bookSlug: string, hadithId: number) => {
    if (!bookSlug) return;
    
    setLoading(true);
    try {
      const response = await fetch(
        `https://cdn.jsdelivr.net/gh/md-rifatkhan/hadithbangla@main/${bookSlug}/hadith/${hadithId}.json`
      );
      
      if (!response.ok) {
        throw new Error('হাদিস লোড করতে সমস্যা হয়েছে');
      }
      
      const data = await response.json();
      setHadith(data.hadith);
    } catch (error) {
      toast({
        title: 'ত্রুটি',
        description: 'হাদিস লোড করতে সমস্যা হয়েছে',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedBook) {
      fetchHadith(selectedBook, hadithNumber);
    }
  }, [selectedBook, hadithNumber]);

  const handleNextHadith = () => {
    if (currentBook && hadithNumber < currentBook.totalHadith) {
      setHadithNumber(prev => prev + 1);
    }
  };

  const handlePrevHadith = () => {
    if (hadithNumber > 1) {
      setHadithNumber(prev => prev - 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Book Selection */}
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="text-gradient-primary font-bengali">
            <BookOpen className="inline-block mr-2" />
            হাদিস গ্রন্থ নির্বাচন করুন
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedBook} onValueChange={setSelectedBook}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="একটি হাদিস গ্রন্থ নির্বাচন করুন..." />
            </SelectTrigger>
            <SelectContent>
              {hadithBooks.map((book) => (
                <SelectItem key={book.slug} value={book.slug}>
                  <div className="flex flex-col">
                    <span className="font-bengali font-medium">{book.name}</span>
                    <span className="font-arabic text-sm text-muted-foreground">{book.nameAr}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Navigation */}
      {selectedBook && (
        <Card className="shadow-elegant">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handlePrevHadith}
                disabled={hadithNumber <= 1}
                className="transition-smooth"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                পূর্ববর্তী
              </Button>
              
              <div className="text-center">
                <p className="font-bengali text-sm text-muted-foreground">হাদিস নম্বর</p>
                <p className="font-bold text-lg">{hadithNumber}</p>
                {currentBook && (
                  <p className="font-bengali text-xs text-muted-foreground">
                    মোট {currentBook.totalHadith} টি হাদিস
                  </p>
                )}
              </div>

              <Button
                variant="outline"
                onClick={handleNextHadith}
                disabled={!currentBook || hadithNumber >= currentBook.totalHadith}
                className="transition-smooth"
              >
                পরবর্তী
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Hadith Display */}
      {loading ? (
        <Card className="shadow-elegant">
          <CardContent className="p-8 text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="font-bengali text-muted-foreground">হাদিস লোড হচ্ছে...</p>
          </CardContent>
        </Card>
      ) : hadith ? (
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="font-bengali text-gradient-primary">
              {currentBook?.name} - হাদিস নং {hadith.hadith_id}
            </CardTitle>
            <p className="font-bengali text-sm text-muted-foreground">
              অধ্যায়: {hadith.chapter_title}
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-bengali text-sm text-muted-foreground mb-2">বর্ণনাকারী:</p>
              <p className="font-bengali font-medium">{hadith.narrator}</p>
            </div>
            
            <div className="prose prose-lg max-w-none">
              <p className="font-bengali text-foreground leading-relaxed">
                {hadith.bn}
              </p>
            </div>
          </CardContent>
        </Card>
      ) : selectedBook ? (
        <Card className="shadow-elegant">
          <CardContent className="p-8 text-center">
            <p className="font-bengali text-muted-foreground">
              হাদিস নং {hadithNumber} লোড করতে সমস্যা হয়েছে
            </p>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
};