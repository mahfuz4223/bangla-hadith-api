import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, BookOpen, Quote } from 'lucide-react';
import { useSettings } from '@/contexts/SettingsContext';

interface Hadith {
  hadith_id: number;
  narrator: string;
  bn: string;
  ar?: string;
  chapter_title: string;
}

const hadithBooks = [
  { slug: 'Bukhari', totalHadith: 7563, name: 'সহীহ বুখারী' },
  { slug: 'Muslim', totalHadith: 7563, name: 'সহীহ মুসলিম' },
  { slug: 'AbuDaud', totalHadith: 5274, name: 'সুনান আবু দাউদ' },
  { slug: 'Ibne-Mazah', totalHadith: 4341, name: 'সুনান ইবনে মাজাহ' },
  { slug: 'Al-Nasai', totalHadith: 5758, name: 'সুনান আন-নাসাঈ' },
  { slug: 'At-tirmizi', totalHadith: 3956, name: 'সুনান আত-তিরমিযী' },
];

const totalHadiths = hadithBooks.reduce((sum, book) => sum + book.totalHadith, 0);

const getHadithForDay = () => {
  const date = new Date();
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  const seed = date.getFullYear() * 1000 + dayOfYear;
  const pseudoRandom = Math.floor((Math.sin(seed) * 10000) % totalHadiths);

  let hadithNumber = pseudoRandom + 1;
  let bookSlug = '';
  let bookName = '';

  for (const book of hadithBooks) {
    if (hadithNumber <= book.totalHadith) {
      bookSlug = book.slug;
      bookName = book.name;
      break;
    }
    hadithNumber -= book.totalHadith;
  }

  return { bookSlug, hadithNumber, bookName };
};


export const DailyHadith = () => {
  const [hadith, setHadith] = useState<Hadith | null>(null);
  const [book, setBook] = useState({ slug: '', name: '' });
  const [loading, setLoading] = useState(true);
  const { showArabic } = useSettings();

  useEffect(() => {
    const fetchDailyHadith = async () => {
      const { bookSlug, hadithNumber, bookName } = getHadithForDay();
      setBook({ slug: bookSlug, name: bookName });

      try {
        const response = await fetch(
          `https://cdn.jsdelivr.net/gh/md-rifatkhan/hadithbangla@main/${bookSlug}/hadith/${hadithNumber}.json`
        );
        if (!response.ok) throw new Error('Daily hadith not found');
        const data = await response.json();
        setHadith(data.hadith);
      } catch (error) {
        console.error("Failed to fetch daily hadith:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDailyHadith();
  }, []);

  if (loading) {
    return (
      <Card className="shadow-elegant">
        <CardContent className="p-6 text-center">
          <Loader2 className="h-6 w-6 animate-spin mx-auto text-primary" />
          <p className="mt-2 text-muted-foreground font-bengali">আজকের হাদিস লোড হচ্ছে...</p>
        </CardContent>
      </Card>
    );
  }

  if (!hadith) {
    return null; // Don't render anything if the hadith couldn't be fetched
  }

  return (
    <Card className="shadow-elegant bg-gradient-subtle border-primary/20">
      <CardHeader>
        <CardTitle className="font-bengali text-gradient-primary flex items-center">
          <Quote className="h-5 w-5 mr-2" />
          আজকের হাদিস
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {showArabic && hadith.ar && (
          <p className="font-arabic text-xl text-right leading-relaxed">{hadith.ar}</p>
        )}
        <p className="font-bengali text-foreground leading-relaxed">
          {hadith.bn}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground font-bengali">
          {book.name}, হাদিস নং {hadith.hadith_id}
        </p>
        <Link to={`/read/${book.slug}/${hadith.hadith_id}`}>
          <Button variant="outline" size="sm">
            <BookOpen className="h-4 w-4 mr-2" />
            বিস্তারিত
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
