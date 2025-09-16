import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface HadithBook {
  name: string;
  slug: string;
}

const hadithBooks: HadithBook[] = [
  { name: 'সহীহ বুখারী', slug: 'Bukhari' },
  { name: 'সহীহ মুসলিম', slug: 'Muslim' },
  { name: 'সুনান আবু দাউদ', slug: 'AbuDaud' },
  { name: 'সুনান ইবনে মাজাহ', slug: 'Ibne-Mazah' },
  { name: 'সুনান আন-নাসাঈ', slug: 'Al-Nasai' },
  { name: 'সুনান আত-তিরমিযী', slug: 'At-tirmizi' },
];

interface SearchComponentProps {
  onSearch: (bookSlug: string, hadithNumber: number) => void;
}

export const SearchComponent = ({ onSearch }: SearchComponentProps) => {
  const [selectedBook, setSelectedBook] = useState<string>('');
  const [hadithNumber, setHadithNumber] = useState<string>('');

  const handleSearch = () => {
    if (selectedBook && hadithNumber) {
      onSearch(selectedBook, parseInt(hadithNumber, 10));
    }
  };

  return (
    <Card className="shadow-elegant">
      <CardHeader>
        <CardTitle className="font-bengali text-gradient-primary flex items-center">
          <Search className="h-5 w-5 mr-2" />
          হাদিস অনুসন্ধান করুন
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select value={selectedBook} onValueChange={setSelectedBook}>
          <SelectTrigger>
            <SelectValue placeholder="একটি হাদিস গ্রন্থ নির্বাচন করুন..." />
          </SelectTrigger>
          <SelectContent>
            {hadithBooks.map((book) => (
              <SelectItem key={book.slug} value={book.slug}>
                {book.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          type="number"
          placeholder="হাদিস নম্বর লিখুন..."
          value={hadithNumber}
          onChange={(e) => setHadithNumber(e.target.value)}
          className="input"
        />

        <Button onClick={handleSearch} className="w-full bg-gradient-primary text-primary-foreground">
          <Search className="h-4 w-4 mr-2" />
          অনুসন্ধান
        </Button>
      </CardContent>
    </Card>
  );
};
