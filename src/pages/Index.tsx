import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { HomePage } from '@/components/HomePage';
import { HadithReader } from '@/components/HadithReader';
import { ApiDocumentation } from '@/components/ApiDocumentation';
import { AboutPage } from '@/components/AboutPage';

interface SearchQuery {
  bookSlug: string;
  hadithNumber: number;
}

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'reader' | 'api' | 'about'>('home');
  const [searchQuery, setSearchQuery] = useState<SearchQuery | null>(null);

  const handleSearch = (bookSlug: string, hadithNumber: number) => {
    setSearchQuery({ bookSlug, hadithNumber });
    setCurrentView('reader');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return <HomePage onViewChange={setCurrentView} onSearch={handleSearch} />;
      case 'reader':
        return <HadithReader
                  initialBook={searchQuery?.bookSlug}
                  initialHadithNumber={searchQuery?.hadithNumber}
                />;
      case 'api':
        return <ApiDocumentation />;
      case 'about':
        return <AboutPage />;
      default:
        return <HomePage onViewChange={setCurrentView} onSearch={handleSearch} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentView={currentView} onViewChange={setCurrentView} />
      <main>
        {renderContent()}
      </main>
      
      {/* Footer */}
      <footer className="bg-card border-t mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center space-y-4">
            <p className="text-muted-foreground font-bengali">
              হাদিস বাংলা - ইসলামিক জ্ঞান অর্জনের জন্য একটি নির্ভরযোগ্য উৎস
            </p>
            <p className="text-sm text-muted-foreground font-bengali">
              সূত্র ব্যবহারের সময় দয়া করে যথাযথভাবে ক্রেডিট দিন।
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
