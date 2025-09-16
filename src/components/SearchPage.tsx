import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useSearch, SearchResult } from '@/hooks/useSearch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Loader2, Search } from 'lucide-react';

// A map to get book names from slugs
const bookNameMap: { [key: string]: string } = {
  Bukhari: 'সহীহ বুখারী',
  Muslim: 'সহীহ মুসলিম',
  AbuDaud: 'সুনান আবু দাউদ',
  'Ibne-Mazah': 'সুনান ইবনে মাজাহ',
  'Al-Nasai': 'সুনান আন-নাসাঈ',
  'At-tirmizi': 'সুনান আত-তিরমিযী',
};

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [inputValue, setInputValue] = useState(query);

  const { search, loading: indexLoading, error: indexError } = useSearch();
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    // Perform search when the query parameter in the URL changes
    const searchResults = search(query);
    setResults(searchResults);
  }, [query, search]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: inputValue });
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
          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <Input
              type="search"
              placeholder="যেকোনো হাদিস খুঁজুন..."
              className="font-bengali"
              value={inputValue}
              onChange={handleInputChange}
            />
            <Button type="submit">অনুসন্ধান</Button>
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

          {results.map((result) => (
            <Link to={`/read/${result.bookSlug}/${result.hadithId}`} key={result.id}>
              <Card className="shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg font-bengali text-primary">
                    {bookNameMap[result.bookSlug] || result.bookSlug} - হাদিস নং {result.hadithId}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-bengali text-muted-foreground leading-relaxed">
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
