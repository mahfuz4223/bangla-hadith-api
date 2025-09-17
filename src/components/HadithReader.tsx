import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Loader2, BookOpen, ChevronLeft, ChevronRight, Star, Share2, Volume2, VolumeX, Type, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useSettings } from '@/hooks/useSettings';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { isBookmarked, addBookmark, removeBookmark } from '@/lib/bookmarks';
import { cn, parseHadithSource } from '@/lib/utils';

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
  const { bookSlug, hadithNumber: hadithNumberStr } = useParams<{ bookSlug: string; hadithNumber: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { settings } = useSettings();
  const { speak, stop, isPlaying, isSupported } = useTextToSpeech();

  const [selectedBook, setSelectedBook] = useState<string>(bookSlug || '');
  const [hadithNumber, setHadithNumber] = useState<number>(parseInt(hadithNumberStr || '1', 10));
  const [hadith, setHadith] = useState<Hadith | null>(null);
  const [loading, setLoading] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const currentBook = hadithBooks.find(book => book.slug === selectedBook);

  const parsedHadith = useMemo(() => {
    if (!hadith) return { cleanText: '', sources: [] };
    return parseHadithSource(hadith.bn);
  }, [hadith]);

  useEffect(() => {
    const fetchHadith = async (slug: string, id: number) => {
      if (!slug || !id) return;
      setLoading(true);
      try {
        const response = await fetch(
          `https://cdn.jsdelivr.net/gh/md-rifatkhan/hadithbangla@main/${slug}/hadith/${id}.json`
        );
        if (!response.ok) throw new Error('হাদিস লোড করতে সমস্যা হয়েছে');
        const data = await response.json();
        setHadith(data.hadith);
        setIsFavorited(isBookmarked(slug, id));
      } catch (error) {
        toast({
          title: 'ত্রুটি',
          description: 'হাদিস লোড করতে সমস্যা হয়েছে',
          variant: 'destructive',
        });
        setHadith(null);
      } finally {
        setLoading(false);
      }
    };

    if (bookSlug && hadithNumberStr) {
      const num = parseInt(hadithNumberStr, 10);
      setSelectedBook(bookSlug);
      setHadithNumber(num);
      fetchHadith(bookSlug, num);
    } else if (!bookSlug) {
      // If no book is selected in the URL, default to Bukhari
      navigate('/read/Bukhari/1', { replace: true });
    }
  }, [bookSlug, hadithNumberStr, toast, navigate]);

  useEffect(() => {
    if (parsedHadith.cleanText && settings.autoRead && isSupported) {
      speak(parsedHadith.cleanText, 'bn-BD');
    }
  }, [parsedHadith, settings.autoRead, isSupported, speak]);

  const handleBookSelect = (slug: string) => {
    setSelectedBook(slug);
    navigate(`/read/${slug}/1`);
  };

  const navigateHadith = (offset: number) => {
    if (currentBook) {
      const newHadithNumber = hadithNumber + offset;
      if (newHadithNumber > 0 && newHadithNumber <= currentBook.totalHadith) {
        navigate(`/read/${selectedBook}/${newHadithNumber}`);
      }
    }
  };

  const toggleFavorite = () => {
    if (!bookSlug || !hadithNumber) return;
    if (isFavorited) {
      removeBookmark(bookSlug, hadithNumber);
      toast({ title: 'পছন্দ তালিকা থেকে সরানো হয়েছে' });
    } else {
      addBookmark(bookSlug, hadithNumber);
      toast({ title: 'পছন্দের তালিকায় যোগ করা হয়েছে' });
    }
    setIsFavorited(!isFavorited);
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    const shareTitle = `হাদিসঃ ${currentBook?.name} - ${hadithNumber}`;
    const shareText = parsedHadith.cleanText.substring(0, 100) + '...';

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(shareUrl);
      toast({
        title: 'লিঙ্ক কপি হয়েছে',
        description: 'হাদিসের লিঙ্ক আপনার ক্লিপবোর্ডে কপি করা হয়েছে।',
      });
    }
  };

  const handleCopy = () => {
    if (!hadith || !currentBook) return;

    let textToCopy = `হাদিসঃ ${currentBook.name} - ${hadith.hadith_id}\n`;
    textToCopy += `অধ্যায়: ${hadith.chapter_title}\n`;
    textToCopy += `বর্ণনাকারী: ${hadith.narrator}\n\n`;

    if (settings.arabicText && hadith.ar) {
      textToCopy += `${hadith.ar}\n\n`;
    }

    textToCopy += `${parsedHadith.cleanText}\n\n`;

    if (parsedHadith.sources.length > 0) {
      textToCopy += `সোর্সঃ ${parsedHadith.sources.join(' ')}\n\n`;
    }

    textToCopy += `লিঙ্কঃ ${window.location.href}`;

    navigator.clipboard.writeText(textToCopy);
    toast({
      title: 'হাদিস কপি হয়েছে',
      description: 'হাদিসের সম্পূর্ণ টেক্সট আপনার ক্লিপবোর্ডে কপি করা হয়েছে।',
    });
  };

  const handleTextToSpeech = () => {
    if (!parsedHadith.cleanText) return;
    
    if (isPlaying) {
      stop();
    } else {
      speak(parsedHadith.cleanText, 'bn-BD');
    }
  };

  const getFontSizeClass = () => {
    switch (settings.fontSize) {
      case 'small': return 'text-sm';
      case 'large': return 'text-lg';
      default: return 'text-base';
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
          <Select value={selectedBook} onValueChange={handleBookSelect}>
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
                onClick={() => navigateHadith(-1)}
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
                onClick={() => navigateHadith(1)}
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
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <CardTitle className="font-bengali text-gradient-primary mb-1">
                  {currentBook?.name} - হাদিস নং {hadith.hadith_id}
                </CardTitle>
                <p className="font-bengali text-sm text-muted-foreground">
                  অধ্যায়: {hadith.chapter_title}
                </p>
              </div>
              <div className="flex items-center">
                <Button variant="ghost" size="icon" onClick={toggleFavorite}>
                  <Star className={cn("h-6 w-6", isFavorited ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground")} />
                </Button>
                
                {isSupported && (
                  <Button variant="ghost" size="icon" onClick={handleTextToSpeech} className="ml-2">
                    {isPlaying ? (
                      <VolumeX className="h-6 w-6 text-muted-foreground" />
                    ) : (
                      <Volume2 className="h-6 w-6 text-muted-foreground" />
                    )}
                  </Button>
                )}
                
                <Button variant="ghost" size="icon" onClick={handleCopy} className="ml-2">
                  <Copy className="h-6 w-6 text-muted-foreground" />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleShare} className="ml-2">
                  <Share2 className="h-6 w-6 text-muted-foreground" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-bengali text-sm text-muted-foreground mb-2">বর্ণনাকারী:</p>
              <p className="font-bengali font-medium">{hadith.narrator}</p>
            </div>
            
            {settings.arabicText && hadith.ar && (
              <div className="bg-muted p-4 rounded-lg text-right">
                <p className="font-arabic text-lg leading-relaxed" dir="rtl">
                  {hadith.ar}
                </p>
              </div>
            )}
            
            <div className="prose prose-lg max-w-none">
              <p className={cn("font-bengali text-foreground leading-relaxed", getFontSizeClass())}>
                {parsedHadith.cleanText}
              </p>
            </div>
          </CardContent>
          {parsedHadith.sources.length > 0 && (
            <CardFooter className="flex-col items-start gap-4 border-t pt-6">
              <h4 className="font-bengali font-semibold text-sm text-muted-foreground">সোর্স ও রেফারেন্স</h4>
              <div className="flex flex-wrap gap-2">
                {parsedHadith.sources.map((source, index) => {
                  const cleanedSource = source.replace(/[()]/g, '');
                  const references = cleanedSource.split(/;|,/g).map(ref => ref.trim()).filter(Boolean);
                  return references.map((ref, refIndex) => (
                    <Badge key={`${index}-${refIndex}`} variant="secondary" className="font-bengali">
                      {ref}
                    </Badge>
                  ));
                })}
              </div>
            </CardFooter>
          )}
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