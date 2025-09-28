import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSearch, SearchResult } from '@/hooks/useSearch';
import { useDebounce } from '@/hooks/useDebounce';
import { Search, BookOpen, User, ArrowLeft, Filter, X } from 'lucide-react';

const books = [
  { slug: 'bukhari', name: 'সহীহ বুখারী' },
  { slug: 'muslim', name: 'সহীহ মুসলিম' },
  { slug: 'abu-dawood', name: 'সুনান আবু দাউদ' },
  { slug: 'ibn-majah', name: 'সুনান ইবনে মাজাহ' },
  { slug: 'nasai', name: 'সুনান নাসাঈ' },
  { slug: 'tirmidhi', name: 'সুনান তিরমিযী' }
];

export const SearchResults = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { search, loading } = useSearch();
  
  // Search states
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [selectedBook, setSelectedBook] = useState(searchParams.get('book') || 'all');
  const [selectedGrade, setSelectedGrade] = useState(searchParams.get('grade') || 'all');
  
  // Results
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  // Debounced query
  const debouncedQuery = useDebounce(query, 300);

  const performSearch = useCallback(async () => {
    if (!debouncedQuery) return;
    
    setIsSearching(true);
    
    try {
      const searchResults = search(debouncedQuery, {
        book: (selectedBook && selectedBook !== 'all') ? selectedBook : undefined,
        grade: (selectedGrade && selectedGrade !== 'all') ? selectedGrade : undefined
      });
      
      setResults(searchResults);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  }, [debouncedQuery, selectedBook, selectedGrade, search]);

  // Perform search when parameters change
  useEffect(() => {
    if (debouncedQuery) {
      performSearch();
    } else {
      setResults([]);
    }
  }, [debouncedQuery, selectedBook, selectedGrade, performSearch]);

  // Initialize from URL params
  useEffect(() => {
    const urlQuery = searchParams.get('q');
    const urlBook = searchParams.get('book');
    const urlGrade = searchParams.get('grade');
    
    if (urlQuery) setQuery(urlQuery);
    if (urlBook) setSelectedBook(urlBook);
    else setSelectedBook('all');
    if (urlGrade) setSelectedGrade(urlGrade);
    else setSelectedGrade('all');
  }, [searchParams]);

  const updateURL = () => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (selectedBook) params.set('book', selectedBook);
    if (selectedGrade) params.set('grade', selectedGrade);
    
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSelectedBook('all');
    setSelectedGrade('all');
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    setSearchParams(params);
  };

  const handleResultClick = (result: SearchResult) => {
    navigate(`/read/${result.doc.bookSlug}/${result.doc.hadithId}`);
  };

  const getGradeColorClass = (grade: string) => {
    switch (grade) {
      case 'সহিহ হাদিস': return 'bg-green-500';
      case 'হাসান হাদিস': return 'bg-orange-500';
      case 'যঈফ হাদিস': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          ফিরে যান
        </Button>
        <h1 className="text-2xl font-bold font-bengali">অনুসন্ধানের ফলাফল</h1>
      </div>

      {/* Search Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-bengali">
            <Search className="h-5 w-5" />
            অনুসন্ধান
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="হাদিস খুঁজুন..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="font-bengali"
                onKeyDown={(e) => e.key === 'Enter' && updateURL()}
              />
            </div>
            <Button onClick={updateURL} disabled={!query}>
              <Search className="h-4 w-4 mr-2" />
              খুঁজুন
            </Button>
          </div>
          
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Select value={selectedBook} onValueChange={setSelectedBook}>
                <SelectTrigger>
                  <SelectValue placeholder="হাদিস গ্রন্থ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">সব গ্রন্থ</SelectItem>
                  {books.map((book) => (
                    <SelectItem key={book.slug} value={book.slug}>
                      <span className="font-bengali">{book.name}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex-1">
              <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                <SelectTrigger>
                  <SelectValue placeholder="হাদিসের গ্রেড" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">সব গ্রেড</SelectItem>
                  <SelectItem value="সহিহ হাদিস">সহিহ হাদিস</SelectItem>
                  <SelectItem value="হাসান হাদিস">হাসান হাদিস</SelectItem>
                  <SelectItem value="যঈফ হাদিস">যঈফ হাদিস</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {(selectedBook && selectedBook !== 'all' || selectedGrade && selectedGrade !== 'all') && (
              <Button variant="outline" onClick={clearFilters}>
                <X className="h-4 w-4 mr-2" />
                ক্লিয়ার
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Active Filters */}
      {(selectedBook && selectedBook !== 'all' || selectedGrade && selectedGrade !== 'all') && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium font-bengali">সক্রিয় ফিল্টার:</span>
          {selectedBook && selectedBook !== 'all' && (
            <Badge variant="secondary" className="font-bengali flex items-center gap-1">
              {books.find(b => b.slug === selectedBook)?.name}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedBook('all')}
                className="h-auto p-0 ml-1"
                title="গ্রন্থ ফিল্টার সরান"
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          {selectedGrade && selectedGrade !== 'all' && (
            <Badge variant="secondary" className="font-bengali flex items-center gap-1">
              {selectedGrade}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedGrade('all')}
                className="h-auto p-0 ml-1"
                title="গ্রেড ফিল্টার সরান"
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
        </div>
      )}

      {/* Loading State */}
      {(loading || isSearching) && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="font-bengali">অনুসন্ধান করা হচ্ছে...</p>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {!loading && !isSearching && results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="font-bengali">
              {results.length} টি হাদিস পাওয়া গেছে
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {results.map((result) => (
              <Card 
                key={result.id}
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleResultClick(result)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      <span className="font-bengali font-medium text-sm">
                        {result.doc.bookName} - হাদিস নং {result.doc.hadithId}
                      </span>
                    </div>
                    {result.doc.grade && (
                      <Badge 
                        className={`text-white font-bengali ${getGradeColorClass(result.doc.grade)}`}
                      >
                        {result.doc.grade}
                      </Badge>
                    )}
                  </div>
                  
                  {result.doc.narrator && (
                    <div className="flex items-center gap-2 mb-2">
                      <User className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground font-bengali">
                        {result.doc.narrator}
                      </span>
                    </div>
                  )}
                  
                  <p className="text-sm text-muted-foreground font-bengali line-clamp-3">
                    {result.doc.bn_short}
                  </p>
                  
                  {result.doc.ar && (
                    <p className="text-xs text-muted-foreground font-arabic text-right mt-2 line-clamp-2">
                      {result.doc.ar.substring(0, 150)}...
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      )}

      {/* No Results */}
      {!loading && !isSearching && results.length === 0 && query && (
        <Card>
          <CardContent className="p-8 text-center">
            <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-bengali text-lg font-medium mb-2">কোনো ফলাফল পাওয়া যায়নি</h3>
            <p className="text-muted-foreground font-bengali mb-4">
              "{query}" এর জন্য কোনো হাদিস খুঁজে পাওয়া যায়নি
            </p>
            <div className="space-y-2 text-sm text-muted-foreground font-bengali">
              <p>• অন্য কীওয়ার্ড দিয়ে চেষ্টা করুন</p>
              <p>• ফিল্টার পরিবর্তন করুন</p>
              <p>• সরল শব্দ ব্যবহার করুন</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* No Query State */}
      {!query && !loading && (
        <Card>
          <CardContent className="p-8 text-center">
            <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-bengali text-lg font-medium mb-2">অনুসন্ধান শুরু করুন</h3>
            <p className="text-muted-foreground font-bengali">
              উপরের বক্সে আপনার কীওয়ার্ড লিখুন
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};