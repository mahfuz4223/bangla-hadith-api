import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSearch, SearchResult } from '@/hooks/useSearch';
import { useDebounce } from '@/hooks/useDebounce';
import { Search, BookOpen, User, Star, FileText, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AdvancedSearchProps {
  onResultSelect?: (result: SearchResult) => void;
}

const books = [
  { slug: 'bukhari', name: 'সহীহ বুখারী', path: 'Bukhari' },
  { slug: 'muslim', name: 'সহীহ মুসলিম', path: 'Muslim' },
  { slug: 'abu-dawood', name: 'সুনান আবু দাউদ', path: 'AbuDaud' },
  { slug: 'ibn-majah', name: 'সুনান ইবনে মাজাহ', path: 'Ibne-Mazah' },
  { slug: 'nasai', name: 'সুনান নাসাঈ', path: 'Al-Nasai' },
  { slug: 'tirmidhi', name: 'সুনান তিরমিযী', path: 'At-tirmizi' }
];

const grades = [
  { value: 'সহিহ হাদিস', label: 'সহিহ হাদিস', color: 'bg-green-500' },
  { value: 'হাসান হাদিস', label: 'হাসান হাদিস', color: 'bg-orange-500' },
  { value: 'যঈফ হাদিস', label: 'যঈফ হাদিস', color: 'bg-red-500' }
];

export const AdvancedSearch = ({ onResultSelect }: AdvancedSearchProps) => {
  const navigate = useNavigate();
  const { search, loading } = useSearch();
  
  // Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState('all');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [narratorQuery, setNarratorQuery] = useState('');
  const [arabicQuery, setArabicQuery] = useState('');
  
  // Results
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  // Debounced queries
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const debouncedNarratorQuery = useDebounce(narratorQuery, 300);
  const debouncedArabicQuery = useDebounce(arabicQuery, 300);

  const performSearch = useCallback(async () => {
    if (!debouncedSearchQuery && !debouncedNarratorQuery && !debouncedArabicQuery) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    
    try {
      let query = '';
      if (debouncedSearchQuery) query += debouncedSearchQuery + ' ';
      if (debouncedNarratorQuery) query += debouncedNarratorQuery + ' ';
      if (debouncedArabicQuery) query += debouncedArabicQuery + ' ';
      
      const searchResults = search(query.trim(), {
        book: (selectedBook && selectedBook !== 'all') ? selectedBook : undefined,
        grade: (selectedGrade && selectedGrade !== 'all') ? selectedGrade : undefined,
        narrator: debouncedNarratorQuery || undefined
      });
      
      setResults(searchResults);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  }, [debouncedSearchQuery, debouncedNarratorQuery, debouncedArabicQuery, selectedBook, selectedGrade, search]);

  // Trigger search when any parameter changes
  useEffect(() => {
    performSearch();
  }, [debouncedSearchQuery, debouncedNarratorQuery, debouncedArabicQuery, selectedBook, selectedGrade, performSearch]);

  const handleResultClick = (result: SearchResult) => {
    if (onResultSelect) {
      onResultSelect(result);
    } else {
      navigate(`/read/${result.doc.bookSlug}/${result.doc.hadithId}`);
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedBook('all');
    setSelectedGrade('all');
    setNarratorQuery('');
    setArabicQuery('');
    setResults([]);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-bengali">
            <Search className="h-5 w-5" />
            উন্নত হাদিস অনুসন্ধান
          </CardTitle>
          <CardDescription className="font-bengali">
            বিভিন্ন ফিল্টার ব্যবহার করে নির্দিষ্ট হাদিস খুঁজুন
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic" className="font-bengali">মূল অনুসন্ধান</TabsTrigger>
              <TabsTrigger value="narrator" className="font-bengali">রাবী দিয়ে</TabsTrigger>
              <TabsTrigger value="arabic" className="font-bengali">আরবি টেক্সট</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic" className="space-y-4">
              <div>
                <Label htmlFor="search-query" className="font-bengali">বাংলা টেক্সট দিয়ে খুঁজুন</Label>
                <Input
                  id="search-query"
                  placeholder="হাদিসের বাংলা অংশ লিখুন..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="font-bengali"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="narrator" className="space-y-4">
              <div>
                <Label htmlFor="narrator-query" className="font-bengali">রাবীর নাম</Label>
                <Input
                  id="narrator-query"
                  placeholder="রাবীর নাম লিখুন..."
                  value={narratorQuery}
                  onChange={(e) => setNarratorQuery(e.target.value)}
                  className="font-bengali"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="arabic" className="space-y-4">
              <div>
                <Label htmlFor="arabic-query" className="font-bengali">আরবি টেক্সট</Label>
                <Input
                  id="arabic-query"
                  placeholder="আরবি টেক্সট লিখুন..."
                  value={arabicQuery}
                  onChange={(e) => setArabicQuery(e.target.value)}
                  className="font-arabic text-right"
                  dir="rtl"
                />
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="font-bengali">হাদিস গ্রন্থ</Label>
              <Select value={selectedBook} onValueChange={setSelectedBook}>
                <SelectTrigger>
                  <SelectValue placeholder="সব গ্রন্থ" />
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
            
            <div>
              <Label className="font-bengali">হাদিসের গ্রেড</Label>
              <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                <SelectTrigger>
                  <SelectValue placeholder="সব গ্রেড" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">সব গ্রেড</SelectItem>
                  {grades.map((grade) => (
                    <SelectItem key={grade.value} value={grade.value}>
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${grade.color}`} />
                        <span className="font-bengali">{grade.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button onClick={performSearch} disabled={isSearching || loading} className="font-bengali">
              <Search className="h-4 w-4 mr-2" />
              {isSearching ? 'খুঁজছি...' : 'অনুসন্ধান'}
            </Button>
            <Button variant="outline" onClick={clearFilters} className="font-bengali">
              <Filter className="h-4 w-4 mr-2" />
              ক্লিয়ার
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Results */}
      {results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="font-bengali flex items-center gap-2">
              <FileText className="h-5 w-5" />
              অনুসন্ধানের ফলাফল ({results.length} টি)
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
                        variant="secondary" 
                        className={`text-white font-bengali ${
                          result.doc.grade === 'সহিহ হাদিস' ? 'bg-green-500' :
                          result.doc.grade === 'হাসান হাদিস' ? 'bg-orange-500' :
                          result.doc.grade === 'যঈফ হাদিস' ? 'bg-red-500' :
                          'bg-gray-500'
                        }`}
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
      {!loading && !isSearching && results.length === 0 && (searchQuery || narratorQuery || arabicQuery) && (
        <Card>
          <CardContent className="p-8 text-center">
            <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-bengali text-lg font-medium mb-2">কোনো ফলাফল পাওয়া যায়নি</h3>
            <p className="text-muted-foreground font-bengali">
              অন্য কীওয়ার্ড দিয়ে চেষ্টা করুন বা ফিল্টার পরিবর্তন করুন
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};