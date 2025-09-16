import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Star, BookOpen } from 'lucide-react';
import { getBookmarks, Bookmark } from '@/lib/bookmarks';

interface Hadith {
  hadith_id: number;
  narrator: string;
  bn: string;
  chapter_title: string;
}

interface BookmarkedHadith extends Hadith {
  bookSlug: string;
}

// A map to get book names from slugs
const bookNameMap: { [key: string]: string } = {
  Bukhari: 'সহীহ বুখারী',
  Muslim: 'সহীহ মুসলিম',
  AbuDaud: 'সুনান আবু দাউদ',
  'Ibne-Mazah': 'সুনান ইবনে মাজাহ',
  'Al-Nasai': 'সুনান আন-নাসাঈ',
  'At-tirmizi': 'সুনান আত-তিরমিযী',
};

export const FavoritesPage = () => {
  const [bookmarkedHadiths, setBookmarkedHadiths] = useState<BookmarkedHadith[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarkedHadiths = async () => {
      setLoading(true);
      const bookmarks = getBookmarks();
      if (bookmarks.length === 0) {
        setLoading(false);
        return;
      }

      try {
        const hadithPromises = bookmarks.map(async (bookmark: Bookmark) => {
          const response = await fetch(
            `https://cdn.jsdelivr.net/gh/md-rifatkhan/hadithbangla@main/${bookmark.bookSlug}/hadith/${bookmark.hadithId}.json`
          );
          if (!response.ok) {
            console.error(`Failed to fetch hadith: ${bookmark.bookSlug}/${bookmark.hadithId}`);
            return null;
          }
          const data = await response.json();
          return { ...data.hadith, bookSlug: bookmark.bookSlug };
        });

        const results = await Promise.all(hadithPromises);
        setBookmarkedHadiths(results.filter((h): h is BookmarkedHadith => h !== null));
      } catch (error) {
        console.error('Error fetching bookmarked hadiths', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarkedHadiths();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="text-gradient-primary font-bengali flex items-center">
            <Star className="h-6 w-6 mr-2" />
            আপনার পছন্দের হাদিসসমূহ
          </CardTitle>
        </CardHeader>
      </Card>

      {loading ? (
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="mt-2 text-muted-foreground">পছন্দের হাদিস লোড হচ্ছে...</p>
        </div>
      ) : bookmarkedHadiths.length > 0 ? (
        <div className="space-y-4">
          {bookmarkedHadiths.map((hadith) => (
            <Card key={`${hadith.bookSlug}-${hadith.hadith_id}`} className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg font-bengali text-primary">
                  {bookNameMap[hadith.bookSlug] || hadith.bookSlug} - হাদিস নং {hadith.hadith_id}
                </CardTitle>
                <p className="text-sm text-muted-foreground font-bengali">অধ্যায়: {hadith.chapter_title}</p>
              </CardHeader>
              <CardContent>
                <p className="font-bengali text-muted-foreground leading-relaxed truncate">
                  {hadith.bn}
                </p>
                <Link to={`/read/${hadith.bookSlug}/${hadith.hadith_id}`} className="mt-4 inline-block">
                  <Button variant="outline" size="sm">
                    <BookOpen className="h-4 w-4 mr-2" />
                    সম্পূর্ণ পড়ুন
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground font-bengali">আপনার পছন্দের কোনো হাদিস এখনো যোগ করা হয়নি।</p>
        </div>
      )}
    </div>
  );
};
