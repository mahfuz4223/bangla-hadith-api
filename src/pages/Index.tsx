import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { HomePage } from '@/components/HomePage';
import { HadithReader } from '@/components/HadithReader';
import { ApiDocumentation } from '@/components/ApiDocumentation';

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'reader' | 'api'>('home');

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return <HomePage onViewChange={setCurrentView} />;
      case 'reader':
        return <HadithReader />;
      case 'api':
        return <ApiDocumentation />;
      default:
        return <HomePage onViewChange={setCurrentView} />;
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
