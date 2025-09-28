import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Code, Database, Star, Globe, Search, ArrowRight } from 'lucide-react';
import heroBanner from '@/assets/hero-banner.jpg';
import { useNavigate, Link } from 'react-router-dom';

export const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: BookOpen,
      title: 'সম্পূর্ণ হাদিস সংগ্রহ',
      description: '৬টি প্রধান হাদিস গ্রন্থের সম্পূর্ণ বাংলা অনুবাদ',
      action: () => navigate('/read'),
      actionText: 'পড়া শুরু করুন'
    },
    {
      icon: Search,
      title: 'উন্নত অনুসন্ধান',
      description: 'যেকোনো হাদিস সহজেই খুঁজে বের করুন',
      action: () => navigate('/search'),
      actionText: 'অনুসন্ধান করুন'
    },
    {
      icon: Database,
      title: 'ফ্রি API',
      description: 'ডেভেলপারদের জন্য সম্পূর্ণ ফ্রি JSON API',
      action: () => navigate('/api'),
      actionText: 'API দেখুন'
    }
  ];



  const hadithBooks = [
    {
      name: 'সহীহ বুখারী',
      symbol: 'ب',
      count: '৭,৫৬৩',
      description: 'ইমাম বুখারী রহ. সংকলিত সবচেয়ে বিশুদ্ধ হাদিস গ্রন্থ। ইসলামের সর্বাধিক নির্ভরযোগ্য হাদিস সংকলন।',
      path: '/bukhari',
      bookKey: 'bukhari'
    },
    {
      name: 'সহীহ মুসলিম',
      symbol: 'م',
      count: '৭,৫৬৩',
      description: 'ইমাম মুসলিম রহ. সংকলিত দ্বিতীয় সর্বোচ্চ বিশুদ্ধ হাদিস গ্রন্থ। বুখারীর পর সবচেয়ে বিশ্বস্ত সংকলন।',
      path: '/muslim',
      bookKey: 'muslim'
    },
    {
      name: 'সুনান আবু দাউদ',
      symbol: 'د',
      count: '৫,২৭৪',
      description: 'ইমাম আবু দাউদ রহ. সংকলিত ফিকহী হাদিসের গুরুত্বপূর্ণ সংকলন। আইন-কানুন সংক্রান্ত হাদিসের ভান্ডার।',
      path: '/abu-dawud',
      bookKey: 'abudawud'
    },
    {
      name: 'সুনান আত-তিরমিযী',
      symbol: 'ت',
      count: '৩,৯৫৬',
      description: 'ইমাম তিরমিযী রহ. সংকলিত হাদিসের মান নির্ণয়সহ গ্রন্থ। হাদিসের গ্রহণযোগ্যতা যাচাইয়ের উত্তম গ্রন্থ।',
      path: '/tirmidhi',
      bookKey: 'tirmidhi'
    },
    {
      name: 'সুনান আন-নাসাঈ',
      symbol: 'ن',
      count: '৫,৭৫৮',
      description: 'ইমাম নাসাঈ রহ. সংকলিত নামাজ ও ইবাদতের হাদিসসমূহ। সালাত ও পবিত্রতার বিস্তারিত নির্দেশনা।',
      path: '/nasai',
      bookKey: 'nasai'
    },
    {
      name: 'সুনান ইবনে মাজাহ',
      symbol: 'ه',
      count: '৤,৩৪১',
      description: 'ইমাম ইবনে মাজাহ রহ. সংকলিত হাদিসের ষষ্ঠ গ্রন্থ। সিহাহ সিত্তার অন্তর্ভুক্ত গুরুত্বপূর্ণ সংকলন।',
      path: '/ibn-majah',
      bookKey: 'ibnmajah'
    }
  ];

  // Random Hadith collection for daily hadith
  const randomHadiths = [
    {
      text: "কর্মের প্রতিদান নির্ভর করে নিয়তের উপর, এবং প্রত্যেক ব্যক্তির জন্য রয়েছে সে যা নিয়ত করেছে।",
      reference: "সহীহ বুখারী : ০১",
      book: "বুখারী"
    },
    {
      text: "তোমাদের কেউ মুমিন হতে পারবে না যতক্ষণ না সে নিজের জন্য যা কামনা করে, তা তার ভাইয়ের জন্যও কামনা করে।",
      reference: "সহীহ বুখারী : ১৩",
      book: "বুখারী"
    },
    {
      text: "যে ব্যক্তি আল্লাহ ও আখিরাত দিনে বিশ্বাস রাখে, সে যেন ভালো কথা বলে অথবা চুপ থাকে।",
      reference: "সহীহ বুখারী : ৬০১৮",
      book: "বুখারী"
    },
    {
      text: "মুসলিম সে ব্যক্তি, যার জিহ্বা ও হাত থেকে অন্যান্য মুসলিমরা নিরাপদ থাকে।",
      reference: "সহীহ বুখারী : ১০",
      book: "বুখারী"
    },
    {
      text: "সর্বোত্তম জিহাদ হলো সত্যবাদী শাসকের সামনে সত্য কথা বলা।",
      reference: "সুনান আবু দাউদ : ৪৩৪৪",
      book: "আবু দাউদ"
    },
    {
      text: "দুনিয়া মুমিনদের জন্য কারাগার এবং কাফিরদের জন্য জান্নাত।",
      reference: "সহীহ মুসলিম : ২৯৫৬",
      book: "মুসলিম"
    },
    {
      text: "যে ব্যক্তি মানুষের কৃতজ্ঞতা প্রকাশ করে না, সে আল্লাহর কৃতজ্ঞতাও প্রকাশ করে না।",
      reference: "সুনান আত-তিরমিযী : ১৯৫৪",
      book: "তিরমিযী"
    },
    {
      text: "তোমাদের মধ্যে সবচেয়ে ভাল সে ব্যক্তি, যে অন্যদের উপকার করে।",
      reference: "সুনান আদ-দারাকুতনী",
      book: "দারাকুতনী"
    }
  ];

  // Get today's hadith (based on day of year for consistency)
  const getTodaysHadith = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
    return randomHadiths[dayOfYear % randomHadiths.length];
  };

  const todaysHadith = getTodaysHadith();

  return (
    <div className="min-h-screen">
      {/* Hero Section with Enhanced Transitions */}
      <section className="relative overflow-hidden min-h-[80vh] flex items-center">
        {/* Background Layer */}
        <div className="absolute inset-0">
          <img 
            src={heroBanner} 
            alt="Islamic pattern background" 
            className="w-full h-full object-cover opacity-20 scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-primary opacity-85"></div>
        </div>
        
        {/* Smooth gradient transition */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="h-32 bg-gradient-to-b from-transparent to-background"></div>
        </div>
        
        {/* Subtle decorative elements */}
        <div className="absolute inset-0 opacity-3 pointer-events-none">
          <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 left-20 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 dark:bg-white/20 dark:text-white dark:border-white/30 animate-fade-in animate-delay-200">
                <Star className="h-4 w-4 mr-1" />
                বিশ্বস্ত হাদিস সংগ্রহ
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white font-bengali leading-tight hero-text animate-fade-in-up animate-delay-300">
                হাদিস বাংলা
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 font-bengali font-light hero-text animate-fade-in-up animate-delay-500">
                ৬টি প্রধান হাদিস গ্রন্থের সম্পূর্ণ বাংলা অনুবাদ
              </p>
              
              <p className="text-lg text-white/80 font-bengali max-w-2xl mx-auto hero-text animate-fade-in-up animate-delay-700">
                সহীহ বুখারী, সহীহ মুসলিম সহ আরও ৪টি প্রামাণিক হাদিস গ্রন্থ পড়ুন। 
                ডেভেলপারদের জন্য রয়েছে সম্পূর্ণ ফ্রি API।
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animate-delay-700">
              <Link to="/read">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-primary hover:bg-white/90 dark:bg-white dark:text-primary dark:hover:bg-white/90 font-bengali text-lg px-8 py-6 hover-lift group"
                >
                  <BookOpen className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                  হাদিস পড়া শুরু করুন
                </Button>
              </Link>
              <Link to="/search">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-white/30 text-white hover:bg-white/10 dark:border-white/30 dark:text-white dark:hover:bg-white/10 font-bengali text-lg px-8 py-6 hover-lift group backdrop-blur-glass"
                >
                  <Search className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                  হাদিস খুঁজুন
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Hadith Books Section - Enhanced with Better Transitions */}
      <section className="pt-32 pb-24 bg-gradient-to-b from-background via-muted/10 to-background relative overflow-hidden">
        {/* Decorative top border */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
        
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            {/* Section Badge */}
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 font-bengali mb-6 px-4 py-2 animate-fade-in animate-delay-200">
              <BookOpen className="w-4 h-4 mr-2" />
              সিহাহ সিত্তাহ
            </Badge>
            
            {/* Enhanced Title */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-bengali relative animate-fade-in-up animate-delay-300">
              <span className="text-gradient-primary">হাদিসের</span>{" "}
              <span className="text-foreground">বইসমূহ</span>
              {/* Decorative underline */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-primary rounded-full animate-fade-in animate-delay-500"></div>
            </h2>
            
            {/* Enhanced Description */}
            <p className="text-xl text-muted-foreground font-bengali max-w-3xl mx-auto leading-relaxed">
              রাসূলুল্লাহ ﷺ এর পবিত্র বাণী ও আদর্শের সংকলন। 
              <br className="hidden md:block" />
              ছয়টি বিশ্বস্ত হাদিস গ্রন্থের মাধ্যমে জানুন ইসলামের প্রকৃত শিক্ষা।
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4" />
                <span className="font-bengali">৩০,০০০+ হাদিস</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span className="font-bengali">৬টি প্রধান গ্রন্থ</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                <span className="font-bengali">বিশুদ্ধ সংকলন</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-20">
            {hadithBooks.map((book, index) => {
              const delayClass = index === 0 ? 'animate-delay-300' : 
                                 index === 1 ? 'animate-delay-500' : 
                                 index === 2 ? 'animate-delay-700' : 
                                 index === 3 ? 'animate-delay-200' : 
                                 index === 4 ? 'animate-delay-500' : 'animate-delay-700';
              
              return (
                <div
                  key={index}
                  className={`group relative overflow-hidden animate-fade-in-up ${delayClass}`}
                >
                {/* Modern Card with Enhanced Design */}
                <Card 
                  className="relative h-full bg-gradient-to-br from-card to-card/80 border-0 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 backdrop-blur-sm"
                  onClick={() => navigate(`/read${book.path}`)}
                >
                  {/* Decorative Background Pattern */}
                  <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-primary via-primary-glow to-accent"></div>
                  
                  {/* Top Accent Border */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-primary"></div>
                  
                  <CardHeader className="relative pb-6 pt-8">
                    {/* Enhanced Icon Design */}
                    <div className="relative mb-6">
                      <div className="w-20 h-20 mx-auto bg-gradient-primary rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                        <span className="text-3xl font-bold text-primary-foreground font-arabic drop-shadow-md">
                          {book.symbol}
                        </span>
                      </div>
                      {/* Floating Ring Animation */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-2xl border-2 border-primary/20 group-hover:border-primary/40 group-hover:scale-125 transition-all duration-700 -z-10"></div>
                    </div>
                    
                    {/* Book Title */}
                    <CardTitle className="font-bengali text-xl md:text-2xl text-center mb-3 group-hover:text-primary transition-colors duration-300">
                      {book.name}
                    </CardTitle>
                    
                    {/* Hadith Count Badge */}
                    <div className="flex justify-center">
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 font-bengali px-3 py-1">
                        <Database className="w-3 h-3 mr-1" />
                        {book.count} হাদিস
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="relative space-y-6 pb-8">
                    {/* Description */}
                    <p className="text-muted-foreground font-bengali text-sm leading-relaxed text-center px-2">
                      {book.description}
                    </p>
                    
                    {/* Action Button */}
                    <div className="flex justify-center pt-2">
                      <Button 
                        className="bg-gradient-primary hover:bg-gradient-gold text-primary-foreground font-bengali px-6 py-2.5 rounded-xl group-hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        <BookOpen className="w-4 h-4 mr-2" />
                        পড়া শুরু করুন
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </div>
                  </CardContent>
                  
                  {/* Bottom Accent */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-primary rounded-t-full group-hover:w-24 transition-all duration-500"></div>
                </Card>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient-primary font-bengali mb-4">
              দ্রুত অ্যাক্সেস
            </h2>
            <p className="text-lg text-muted-foreground font-bengali">
              আপনার প্রয়োজন অনুযায়ী হাদিস পড়ুন ও খুঁজুন
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="shadow-elegant hover:shadow-glow transition-smooth group cursor-pointer"
                      onClick={feature.action}>
                  <CardHeader className="text-center pb-4">
                    <div className="bg-gradient-primary p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Icon className="h-10 w-10 text-primary-foreground" />
                    </div>
                    <CardTitle className="font-bengali text-gradient-primary text-xl">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-4">
                    <p className="text-muted-foreground font-bengali">
                      {feature.description}
                    </p>
                    <Button 
                      variant="outline" 
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        feature.action();
                      }}
                    >
                      {feature.actionText}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Daily Hadith Section - Enhanced */}
      <section className="py-20 bg-gradient-primary relative">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 mb-4">
              <Star className="h-4 w-4 mr-1" />
              দৈনিক হাদিস
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white font-bengali mb-4">
              আজের হাদিস
            </h2>
            <p className="text-lg text-white/80 font-bengali">
              প্রতিদিন একটি নতুন হাদিস - ইসলামী জ্ঞান অর্জনের সহজ উপায়
            </p>
          </div>
          
          <Card className="shadow-glow border-0 overflow-hidden">
            <div className="bg-gradient-to-r from-card to-card/50 dark:from-card dark:to-card/80">
              <CardContent className="p-8 md:p-12">
                <div className="space-y-8">
                  {/* Hadith Text */}
                  <div className="text-center">
                    <div className="text-6xl text-primary/20 font-arabic mb-4">"</div>
                    <p className="text-xl md:text-2xl leading-relaxed font-bengali text-foreground font-medium">
                      {todaysHadith.text}
                    </p>
                    <div className="text-6xl text-primary/20 font-arabic mt-4 rotate-180">"</div>
                  </div>
                  
                  {/* Reference */}
                  <div className="text-center py-4 border-t border-border">
                    <div className="inline-flex items-center space-x-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <p className="text-lg font-bengali text-primary font-semibold">
                        {todaysHadith.reference}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground font-bengali mt-1">
                      সূত্র: {todaysHadith.book}
                    </p>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      onClick={() => navigate('/read')}
                      className="bg-gradient-primary text-primary-foreground hover:opacity-90 font-bengali px-8"
                      size="lg"
                    >
                      <BookOpen className="h-5 w-5 mr-2" />
                      আরও হাদিস পড়ুন
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => navigate('/search')}
                      className="font-bengali px-8"
                      size="lg"
                    >
                      <Search className="h-5 w-5 mr-2" />
                      হাদিস খুঁজুন
                    </Button>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient-primary font-bengali mb-4">
              কেন হাদিস বাংলা?
            </h2>
            <p className="text-lg text-muted-foreground font-bengali">
              বিশ্বস্ত ও সহজ হাদিস অধ্যয়নের জন্য সব প্রয়োজনীয় সুবিধা
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-elegant hover:shadow-glow transition-smooth text-center">
              <CardHeader>
                <div className="bg-gradient-primary p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Globe className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle className="font-bengali text-gradient-primary">
                  সহজ ব্যবহার
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground font-bengali">
                  যেকোনো ডিভাইস থেকে সহজেই হাদিস পড়ুন ও অনুসন্ধান করুন
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-elegant hover:shadow-glow transition-smooth text-center">
              <CardHeader>
                <div className="bg-gradient-primary p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Star className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle className="font-bengali text-gradient-primary">
                  বিশ্বস্ত সূত্র
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground font-bengali">
                  প্রামাণিক হাদিস গ্রন্থ থেকে নেওয়া নির্ভরযোগ্য অনুবাদ
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-elegant hover:shadow-glow transition-smooth text-center">
              <CardHeader>
                <div className="bg-gradient-primary p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Database className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle className="font-bengali text-gradient-primary">
                  সম্পূর্ণ ফ্রি
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground font-bengali">
                  সম্পূর্ণ বিনামূল্যে ব্যবহার করুন, কোনো সীমাবদ্ধতা নেই
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gradient-primary font-bengali">
                এখনই শুরু করুন
              </h2>
              <p className="text-xl text-muted-foreground font-bengali leading-relaxed max-w-2xl mx-auto">
                ৩৪,০০০+ সহীহ হাদিস পড়ুন, অনুসন্ধান করুন এবং ইসলামী জ্ঞান অর্জন করুন। সম্পূর্ণ বিনামূল্যে।
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/read">
                <Button 
                  size="lg"
                  className="bg-gradient-primary text-primary-foreground hover:opacity-90 font-bengali text-lg px-10 py-6"
                >
                  <BookOpen className="h-6 w-6 mr-2" />
                  হাদিস পড়া শুরু করুন
                </Button>
              </Link>
              <Link to="/search">
                <Button 
                  variant="outline"
                  size="lg"
                  className="font-bengali text-lg px-10 py-6"
                >
                  <Search className="h-6 w-6 mr-2" />
                  হাদিস অনুসন্ধান করুন
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">৬</div>
                <p className="text-sm text-muted-foreground font-bengali">প্রামাণিক গ্রন্থ</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">৩৪,০০০+</div>
                <p className="text-sm text-muted-foreground font-bengali">মোট হাদিস</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">১০০%</div>
                <p className="text-sm text-muted-foreground font-bengali">বিনামূল্যে</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">২৤/৭</div>
                <p className="text-sm text-muted-foreground font-bengali">সেবা</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Message Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="shadow-elegant border-0">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="text-4xl">📚</div>
                <h3 className="text-2xl font-bold text-gradient-primary font-bengali">
                  আল্লাহর রাসূল ﷺ এর আদর্শে জীবন গড়ুন
                </h3>
                <p className="text-lg text-muted-foreground font-bengali leading-relaxed">
                  হাদিসের আলোকে আপনার দৈনন্দিন জীবনকে আরও সুন্দর ও অর্থবহ করে তুলুন। 
                  প্রতিদিন হাদিস পড়ার অভ্যাস গড়ে তুলুন এবং ইসলামী জীবনযাত্রার পথ খুঁজে নিন।
                </p>
                <div className="pt-4">
                  <Link to="/read">
                    <Button 
                      size="lg"
                      className="bg-gradient-primary text-primary-foreground hover:opacity-90 font-bengali px-8"
                    >
                      <BookOpen className="h-5 w-5 mr-2" />
                      আজই শুরু করুন
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};