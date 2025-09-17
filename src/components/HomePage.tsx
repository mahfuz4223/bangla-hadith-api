import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Code, Database, Star, Users, Globe } from 'lucide-react';
import heroBanner from '@/assets/hero-banner.jpg';
import { SearchComponent } from './SearchComponent';
import { useNavigate, Link } from 'react-router-dom';

export const HomePage = () => {
  const navigate = useNavigate();

  const handleSearch = (bookSlug: string, hadithNumber: number) => {
    navigate(`/read/${bookSlug}/${hadithNumber}`);
  };

  const features = [
    {
      icon: BookOpen,
      title: 'সম্পূর্ণ হাদিস সংগ্রহ',
      description: '৬টি প্রধান হাদিস গ্রন্থের সম্পূর্ণ বাংলা অনুবাদ'
    },
    {
      icon: Database,
      title: 'ফ্রি API অ্যাক্সেস',
      description: 'ডেভেলপারদের জন্য সম্পূর্ণ ফ্রি JSON API'
    },
    {
      icon: Globe,
      title: 'সহজ ব্যবহার',
      description: 'যেকোনো ডিভাইস থেকে সহজেই হাদিস পড়ুন'
    }
  ];

  const books = [
    { name: 'সহীহ বুখারী', nameAr: 'صحيح البخاري', hadithCount: '৭,৫৬৩' },
    { name: 'সহীহ মুসলিম', nameAr: 'صحيح مسلم', hadithCount: '৭,৫৬৩' },
    { name: 'সুনান আবু দাউদ', nameAr: 'سنن أبي داود', hadithCount: '৫,২৭৪' },
    { name: 'সুনান ইবনে মাজাহ', nameAr: 'سنن ابن ماجه', hadithCount: '৪,৩৪১' },
    { name: 'সুনান আন-নাসাঈ', nameAr: 'سنن النسائي', hadithCount: '৫,৭৫৮' },
    { name: 'সুনান আত-তিরমিযী', nameAr: 'سنن الترمذي', hadithCount: '৩,৯৫৬' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroBanner} 
            alt="Islamic pattern background" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-primary opacity-80"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Star className="h-4 w-4 mr-1" />
                বিশ্বস্ত হাদিস সংগ্রহ
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white font-bengali leading-tight">
                হাদিস বাংলা
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 font-bengali font-light">
                ৬টি প্রধান হাদিস গ্রন্থের সম্পূর্ণ বাংলা অনুবাদ
              </p>
              
              <p className="text-lg text-white/80 font-bengali max-w-2xl mx-auto">
                সহীহ বুখারী, সহীহ মুসলিম সহ আরও ৪টি প্রামাণিক হাদিস গ্রন্থ পড়ুন। 
                ডেভেলপারদের জন্য রয়েছে সম্পূর্ণ ফ্রি API।
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/read">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-primary hover:bg-white/90 font-bengali text-lg px-8 py-6"
                >
                  <BookOpen className="h-5 w-5 mr-2" />
                  হাদিস পড়া শুরু করুন
                </Button>
              </Link>
              <Link to="/api">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 font-bengali text-lg px-8 py-6"
                >
                  <Code className="h-5 w-5 mr-2" />
                  API ডকুমেন্টেশন
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-10 bg-background -mt-16 relative z-10">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <SearchComponent onSearch={handleSearch} />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient-primary font-bengali mb-4">
              বৈশিষ্ট্যসমূহ
            </h2>
            <p className="text-lg text-muted-foreground font-bengali">
              হাদিস অধ্যয়ন ও গবেষণার জন্য সব প্রয়োজনীয় সুবিধা
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="shadow-elegant hover:shadow-glow transition-smooth">
                  <CardHeader className="text-center">
                    <div className="bg-gradient-primary p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <CardTitle className="font-bengali text-gradient-primary">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground font-bengali">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Books Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient-primary font-bengali mb-4">
              উপলব্ধ হাদিস গ্রন্থসমূহ
            </h2>
            <p className="text-lg text-muted-foreground font-bengali">
              ইসলামের ৬টি সবচেয়ে নির্ভরযোগ্য হাদিস সংকলন
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book, index) => (
              <Card key={index} className="shadow-elegant hover:shadow-glow transition-smooth">
                <CardHeader className="text-center pb-2">
                  <CardTitle className="font-bengali text-lg text-gradient-primary">
                    {book.name}
                  </CardTitle>
                  <p className="font-arabic text-muted-foreground text-lg">
                    {book.nameAr}
                  </p>
                </CardHeader>
                <CardContent className="text-center">
                  <Badge variant="secondary" className="bg-gradient-gold text-accent-foreground">
                    {book.hadithCount} হাদিস
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/read">
              <Button 
                size="lg"
                className="bg-gradient-primary text-primary-foreground hover:opacity-90 font-bengali text-lg px-8 py-6"
              >
                <BookOpen className="h-5 w-5 mr-2" />
                এখনই পড়া শুরু করুন
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-gradient-primary">৬</div>
              <p className="text-muted-foreground font-bengali">হাদিস গ্রন্থ</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-gradient-primary">৩৪,০০০+</div>
              <p className="text-muted-foreground font-bengali">মোট হাদিস</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-gradient-primary">১০০%</div>
              <p className="text-muted-foreground font-bengali">ফ্রি API</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};