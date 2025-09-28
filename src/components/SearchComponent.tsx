import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, BookOpen, Hash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
  const [quickSearchQuery, setQuickSearchQuery] = useState<string>('');
  const navigate = useNavigate();

  const handleDirectSearch = () => {
    if (selectedBook && hadithNumber) {
      onSearch(selectedBook, parseInt(hadithNumber, 10));
    }
  };

  const handleQuickSearch = () => {
    if (quickSearchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(quickSearchQuery)}`);
    }
  };

  return (
    <div className="space-y-4">
      {/* Quick Text Search */}
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="font-bengali text-gradient-primary flex items-center">
            <Search className="h-5 w-5 mr-2" />
            দ্রুত অনুসন্ধান
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="হাদিসের অংশ লিখুন (বাংলা/আরবি/রাবী)..."
            value={quickSearchQuery}
            onChange={(e) => setQuickSearchQuery(e.target.value)}
            className="font-bengali"
            onKeyDown={(e) => e.key === 'Enter' && handleQuickSearch()}
          />
          <Button onClick={handleQuickSearch} className="w-full bg-gradient-primary text-primary-foreground">
            <Search className="h-4 w-4 mr-2" />
            খুঁজুন
          </Button>
        </CardContent>
      </Card>

      {/* Direct Hadith Number Search */}
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="font-bengali text-gradient-primary flex items-center">
            <Hash className="h-5 w-5 mr-2" />
            নির্দিষ্ট হাদিস নম্বর
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
            onKeyDown={(e) => e.key === 'Enter' && handleDirectSearch()}
          />

          <Button onClick={handleDirectSearch} className="w-full" variant="outline">
            <BookOpen className="h-4 w-4 mr-2" />
            হাদিস পড়ুন
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
