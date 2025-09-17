import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Zap, Shuffle, Calendar, Printer } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useRandomHadith } from '@/hooks/useRandomHadith';
import { useToast } from '@/hooks/use-toast';

export const QuickActionsDialog = () => {
  const [open, setOpen] = useState(false);
  const [goToHadith, setGoToHadith] = useState('');
  const [selectedBook, setSelectedBook] = useState('Bukhari');
  const navigate = useNavigate();
  const { getRandomHadith } = useRandomHadith();
  const { toast } = useToast();

  const hadithBooks = [
    { name: 'সহীহ বুখারী', slug: 'Bukhari' },
    { name: 'সহীহ মুসলিম', slug: 'Muslim' },
    { name: 'সুনান আবু দাউদ', slug: 'AbuDaud' },
    { name: 'সুনান ইবনে মাজাহ', slug: 'Ibne-Mazah' },
    { name: 'সুনান আন-নাসাঈ', slug: 'Al-Nasai' },
    { name: 'সুনান আত-তিরমিযী', slug: 'At-tirmizi' },
  ];

  const handleGoToHadith = () => {
    const hadithNumber = parseInt(goToHadith);
    if (hadithNumber && hadithNumber > 0) {
      navigate(`/read/${selectedBook}/${hadithNumber}`);
      setOpen(false);
      setGoToHadith('');
    } else {
      toast({
        title: 'ভুল নম্বর',
        description: 'অনুগ্রহ করে সঠিক হাদিস নম্বর দিন',
        variant: 'destructive',
      });
    }
  };

  const handleRandomHadith = () => {
    const random = getRandomHadith();
    navigate(`/read/${random.bookSlug}/${random.hadithId}`);
    setOpen(false);
    toast({
      title: 'র‍্যান্ডম হাদিস',
      description: 'একটি এলোমেলো হাদিস নির্বাচন করা হয়েছে',
    });
  };

  const handlePrint = () => {
    window.print();
    setOpen(false);
  };

  const getTodaysHadith = () => {
    // Generate a "hadith of the day" based on current date
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    const bookIndex = dayOfYear % hadithBooks.length;
    const book = hadithBooks[bookIndex];
    const hadithNumber = (dayOfYear % 100) + 1; // Simple algorithm
    
    navigate(`/read/${book.slug}/${hadithNumber}`);
    setOpen(false);
    toast({
      title: 'আজকের হাদিস',
      description: 'আজকের জন্য নির্বাচিত হাদিস',
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="transition-smooth">
          <Zap className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-bengali">দ্রুত অ্যাকশন</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {/* Go to specific hadith */}
          <div className="space-y-2">
            <Label className="font-bengali text-sm font-medium">নির্দিষ্ট হাদিসে যান</Label>
            <div className="flex gap-2">
              <select 
                value={selectedBook} 
                onChange={(e) => setSelectedBook(e.target.value)}
                className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                {hadithBooks.map(book => (
                  <option key={book.slug} value={book.slug}>{book.name}</option>
                ))}
              </select>
              <Input
                type="number"
                placeholder="হাদিস নং"
                value={goToHadith}
                onChange={(e) => setGoToHadith(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleGoToHadith()}
              />
              <Button onClick={handleGoToHadith} size="sm">যান</Button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 gap-2">
            <Button onClick={handleRandomHadith} variant="outline" className="justify-start font-bengali">
              <Shuffle className="h-4 w-4 mr-2" />
              এলোমেলো হাদিস
            </Button>
            
            <Button onClick={getTodaysHadith} variant="outline" className="justify-start font-bengali">
              <Calendar className="h-4 w-4 mr-2" />
              আজকের হাদিস
            </Button>
            
            <Button onClick={handlePrint} variant="outline" className="justify-start font-bengali">
              <Printer className="h-4 w-4 mr-2" />
              প্রিন্ট করুন
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};