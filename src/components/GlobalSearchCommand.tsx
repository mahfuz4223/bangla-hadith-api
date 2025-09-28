import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '@/hooks/useDebounce';
import { useSearch, SearchResult } from '@/hooks/useSearch';
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { FileText } from 'lucide-react';
import { SearchIndexLoader } from './SearchIndexLoader';

const bookNameMap: { [key: string]: string } = {
  Bukhari: 'সহীহ বুখারী',
  Muslim: 'সহীহ মুসলিম',
  AbuDaud: 'সুনান আবু দাউদ',
  'Ibne-Mazah': 'সুনান ইবনে মাজাহ',
  'Al-Nasai': 'সুনান আন-নাসাঈ',
  'At-tirmizi': 'সুনান আত-তিরমিযী',
};

export const GlobalSearchCommand = ({ open, setOpen }: { open: boolean, setOpen: (open: boolean) => void }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [searchFilters, setSearchFilters] = useState({ book: '', grade: '' });
  const debouncedQuery = useDebounce(query, 300);
  const { search, loading } = useSearch();
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (debouncedQuery && debouncedQuery.length >= 2) {
      const searchResults = search(debouncedQuery, {
        book: searchFilters.book || undefined,
        grade: searchFilters.grade || undefined
      });
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [debouncedQuery, search, searchFilters]);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  const gradeColors: { [key: string]: string } = {
    'সহিহ হাদিস': '#46B891',
    'হাসান হাদিস': '#FFA500',
    'যঈফ হাদিস': '#FF6B6B',
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput
        placeholder="হাদিস খুঁজুন... (নারায়ক, গ্রেড, বাংলা বা আরবি টেক্সট)"
        value={query}
        onValueChange={setQuery}
        className="font-bengali"
      />
      <CommandList>
        {loading && (
          <div className="p-4">
            <SearchIndexLoader loading={loading} error={null} />
          </div>
        )}
        {!loading && results.length === 0 && query.length > 2 && <CommandEmpty>কোনো ফলাফল পাওয়া যায়নি।</CommandEmpty>}
        {results.length > 0 && (
          <CommandGroup heading={`হাদিস (${results.length} টি ফলাফল)`}>
            {results.map((result) => (
              <CommandItem
                key={result.id}
                value={result.id}
                onSelect={() => {
                  runCommand(() => navigate(`/read/${result.doc.bookSlug}/${result.doc.hadithId}`));
                }}
                className="cursor-pointer p-4"
              >
                <div className="flex items-start space-x-4 w-full">
                  <FileText className="h-5 w-5 text-muted-foreground mt-1 flex-shrink-0" />
                  <div className="flex flex-col w-full min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-bengali font-medium text-sm">
                        {result.doc.bookName} - হাদিস নং {result.doc.hadithId}
                      </p>
                      {result.doc.grade && (
                        <span 
                          className={`text-xs px-2 py-1 rounded-full text-white font-bengali ${
                            result.doc.grade === 'সহিহ হাদিস' ? 'bg-green-500' :
                            result.doc.grade === 'হাসান হাদিস' ? 'bg-orange-500' :
                            result.doc.grade === 'যঈফ হাদিস' ? 'bg-red-500' :
                            'bg-gray-500'
                          }`}
                        >
                          {result.doc.grade}
                        </span>
                      )}
                    </div>
                    
                    {result.doc.narrator && (
                      <p className="text-xs text-muted-foreground font-bengali mb-1">
                        বর্ণনাকারী: {result.doc.narrator}
                      </p>
                    )}
                    
                    <p className="text-xs text-muted-foreground font-bengali line-clamp-2">
                      {result.doc.bn_short}
                    </p>
                    
                    {result.doc.ar && (
                      <p className="text-xs text-muted-foreground font-arabic text-right mt-1 line-clamp-1">
                        {result.doc.ar.substring(0, 100)}...
                      </p>
                    )}
                  </div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
};
