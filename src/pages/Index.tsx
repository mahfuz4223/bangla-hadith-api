import { Outlet } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Outlet />
      </main>
      
      {/* Enhanced Footer */}
      <footer className="bg-card border-t mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* About Section */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-gradient-primary font-bengali">হাদিস বাংলা</h3>
              <p className="text-sm text-muted-foreground font-bengali leading-relaxed">
                আমাদের উদ্দেশ্য সকলের জন্য বিশুদ্ধ হাদিসের কালেকশন তৈরি করা। সহজেই ইসলামের জ্ঞান অর্জন এবং ইসলামের দাওয়াত প্রচার করতে সাহায্য করা।
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground font-bengali">দ্রুত লিংক</h3>
              <div className="space-y-2">
                <a href="/about" className="block text-sm text-muted-foreground hover:text-primary font-bengali transition-colors">আমাদের সম্পর্কে</a>
                <a href="/api" className="block text-sm text-muted-foreground hover:text-primary font-bengali transition-colors">API ডকুমেন্টেশন</a>
                <a href="/contact" className="block text-sm text-muted-foreground hover:text-primary font-bengali transition-colors">যোগাযোগ করুন</a>
                <a href="/privacy" className="block text-sm text-muted-foreground hover:text-primary font-bengali transition-colors">গোপনীয়তা নীতি</a>
              </div>
            </div>

            {/* Hadith Books */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground font-bengali">হাদিস গ্রন্থসমূহ</h3>
              <div className="space-y-2">
                <a href="/bukhari" className="block text-sm text-muted-foreground hover:text-primary font-bengali transition-colors">সহীহ বুখারী</a>
                <a href="/muslim" className="block text-sm text-muted-foreground hover:text-primary font-bengali transition-colors">সহীহ মুসলিম</a>
                <a href="/abu-dawud" className="block text-sm text-muted-foreground hover:text-primary font-bengali transition-colors">সুনান আবু দাউদ</a>
                <a href="/tirmidhi" className="block text-sm text-muted-foreground hover:text-primary font-bengali transition-colors">সুনান তিরমিযী</a>
              </div>
            </div>

            {/* Important Links */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground font-bengali">গুরুত্বপূর্ণ লিংক</h3>
              <div className="space-y-2">
                <a href="https://quran.com/" target="_blank" rel="noopener noreferrer" className="block text-sm text-muted-foreground hover:text-primary font-bengali transition-colors">Quran.com</a>
                <a href="https://sunnah.com/" target="_blank" rel="noopener noreferrer" className="block text-sm text-muted-foreground hover:text-primary font-bengali transition-colors">Sunnah.com</a>
                <a href="https://islamhouse.com/" target="_blank" rel="noopener noreferrer" className="block text-sm text-muted-foreground hover:text-primary font-bengali transition-colors">Islamhouse.com</a>
                <a href="https://ihadis.com/" target="_blank" rel="noopener noreferrer" className="block text-sm text-muted-foreground hover:text-primary font-bengali transition-colors">iHadis.com</a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border/40 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              {/* Copyright */}
              <div className="text-center md:text-left">
                <p className="text-sm text-muted-foreground font-bengali">
                  © ২০২৪ হাদিস বাংলা। সর্বস্বত্ব সংরক্ষিত।
                </p>
                <p className="text-xs text-muted-foreground font-bengali mt-1">
                  সূত্র ব্যবহারের সময় দয়া করে যথাযথভাবে ক্রেডিট দিন।
                </p>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="YouTube">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
