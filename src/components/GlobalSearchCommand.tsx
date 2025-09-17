import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '@/hooks/useDebounce';
import { useSearch, SearchResult } from '@/hooks/useSearch';
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { FileText, Book } from 'lucide-react';

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
  const debouncedQuery = useDebounce(query, 300);
  const { search } = useSearch();
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (debouncedQuery) {
      const searchResults = search(debouncedQuery);
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [debouncedQuery, search]);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput
        placeholder="যেকোনো হাদিস খুঁজুন..."
        value={query}
        onValueChange={setQuery}
        className="font-bengali"
      />
      <CommandList>
        {results.length === 0 && query.length > 2 && <CommandEmpty>কোনো ফলাফল পাওয়া যায়নি।</CommandEmpty>}
        {results.length > 0 && (
          <CommandGroup heading="হাদিস">
            {results.map((result) => (
              <CommandItem
                key={result.id}
                value={result.id}
                onSelect={() => {
                  runCommand(() => navigate(`/read/${result.bookSlug}/${result.hadithId}`));
                }}
                className="cursor-pointer"
              >
                <div className="flex items-start space-x-4">
                  <FileText className="h-5 w-5 text-muted-foreground mt-1" />
                  <div className="flex flex-col">
                    <p className="font-bengali font-medium">
                      {bookNameMap[result.bookSlug] || result.bookSlug} - হাদিস নং {result.hadithId}
                    </p>
                    <p className="text-xs text-muted-foreground font-bengali truncate">
                      {result.bn_short}...
                    </p>
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
