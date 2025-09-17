import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useSearch, SearchResult } from '@/hooks/useSearch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Loader2, Search, ChevronRight } from 'lucide-react';

// A map to get book names from slugs
const bookNameMap: { [key: string]: string } = {
  Bukhari: 'সহীহ বুখারী',
  Muslim: 'সহীহ মুসলিম',
  AbuDaud: 'সুনান আবু দাউদ',
  'Ibne-Mazah': 'সুনান ইবনে মাজাহ',
  'Al-Nasai': 'সুনান আন-নাসাঈ',
  'At-tirmizi': 'সুনান আত-তিরমিযী',
};

const hadithBooks = [
  { name: 'সব বই', slug: 'all' },
  { name: 'সহীহ বুখারী', slug: 'Bukhari' },
  { name: 'সহীহ মুসলিম', slug: 'Muslim' },
  { name: 'সুনান আবু দাউদ', slug: 'AbuDaud' },
  { name: 'সুনান ইবনে মাজাহ', slug: 'Ibne-Mazah' },
  { name: 'সুনান আন-নাসাঈ', slug: 'Al-Nasai' },
  { name: 'সুনান আত-তিরমিযী', slug: 'At-tirmizi' },
];

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const book = searchParams.get('book') || 'all';
  const [inputValue, setInputValue] = useState(query);
  const [bookFilter, setBookFilter] = useState(book);

  const { search, loading: indexLoading, error: indexError } = useSearch();
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    // Perform search when the query or book parameters in the URL change
    const searchResults = search(query, book);
    setResults(searchResults);
    setInputValue(query);
    setBookFilter(book);
  }, [query, book, search]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params: { q: string, book?: string } = { q: inputValue };
    if (bookFilter !== 'all') {
      params.book = bookFilter;
    }
    setSearchParams(params);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="text-gradient-primary font-bengali flex items-center">
            <Search className="h-6 w-6 mr-2" />
            হাদিস অনুসন্ধান করুন
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-2">
            <div className="w-full sm:w-48">
              <Select value={bookFilter} onValueChange={setBookFilter}>
                <SelectTrigger className="font-bengali">
                  <SelectValue placeholder="বই নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  {hadithBooks.map(b => (
                    <SelectItem key={b.slug} value={b.slug} className="font-bengali">
                      {b.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Input
              type="search"
              placeholder="যেকোনো হাদিস খুঁজুন..."
              className="font-bengali"
              value={inputValue}
              onChange={handleInputChange}
            />
            <Button type="submit" className="bg-gradient-primary">
              <Search className="h-4 w-4 mr-2" />
              অনুসন্ধান
            </Button>
          </form>
        </CardContent>
      </Card>

      {indexLoading && (
        <div className="text-center py-12">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="mt-2 text-muted-foreground">সার্চ ইনডেক্স লোড হচ্ছে...</p>
        </div>
      )}

      {indexError && (
        <div className="text-center py-12">
          <p className="text-red-500 font-medium">একটি ত্রুটি হয়েছে</p>
          <p className="text-muted-foreground">{indexError}</p>
        </div>
      )}

      {!indexLoading && !indexError && (
        <div className="space-y-4">
          {query && (
            <p className="text-muted-foreground">
              <span className="font-bold text-primary">{`'${query}'`}</span> এর জন্য {results.length} টি ফলাফল পাওয়া গেছে
            </p>
          )}

          {results.length === 0 && query && (
            <div className="text-center py-12">
              <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground font-bengali">কোনো ফলাফল পাওয়া যায়নি</p>
            </div>
          )}

          {results.map((result) => (
            <Link to={`/read/${result.bookSlug}/${result.hadithId}`} key={result.id}>
              <Card className="shadow-sm hover:shadow-elegant transition-all duration-300 cursor-pointer border-l-4 border-l-transparent hover:border-l-primary">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-bengali text-primary flex items-center justify-between">
                    <span>{bookNameMap[result.bookSlug] || result.bookSlug} - হাদিস নং {result.hadithId}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-bengali text-muted-foreground leading-relaxed line-clamp-3">
                    {result.bn_short}...
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
