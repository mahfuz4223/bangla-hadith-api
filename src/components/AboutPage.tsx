import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Heart, Code, GitBranch, Star, Users, Briefcase, BookOpen, Globe, Database, Shield, Zap, Award, Target, Mail, MessageCircle, Calendar, Download, CheckCircle } from 'lucide-react';

// Reusable component for feature cards
const FeatureCard = ({ icon, title, description, color = "primary" }: { 
  icon: React.ElementType, 
  title: string, 
  description: string,
  color?: string 
}) => {
  const Icon = icon;
  return (
    <div className="group text-center p-6 bg-gradient-to-br from-background to-muted/30 rounded-xl border border-border/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 hover:scale-105">
      <div className={`inline-flex p-3 rounded-full bg-${color}/10 text-${color} mb-4 group-hover:bg-${color}/20 transition-colors`}>
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="font-semibold font-bengali text-lg mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground font-bengali leading-relaxed">{description}</p>
    </div>
  );
};

// Statistics card component
const StatCard = ({ number, label, icon }: { number: string, label: string, icon: React.ElementType }) => {
  const Icon = icon;
  return (
    <div className="text-center p-6 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl border border-primary/20">
      <Icon className="h-8 w-8 text-primary mx-auto mb-3" />
      <div className="text-3xl font-bold text-primary mb-2">{number}</div>
      <p className="text-sm font-bengali text-muted-foreground">{label}</p>
    </div>
  );
};

// Reusable component for contributor cards
interface ContributorCardProps {
  name: string;
  role: string;
  description: string;
  githubUser: string;
  repoName?: string;
  children?: React.ReactNode;
}

const ContributorCard = ({ name, role, description, githubUser, repoName }: ContributorCardProps) => (
  <Card className="group shadow-elegant border-primary/20 bg-gradient-to-br from-background to-muted/20 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300">
    <CardHeader className="pb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white font-bold text-lg">
            {name.charAt(0)}
          </div>
          <div>
            <h3 className="text-lg font-bold font-bengali group-hover:text-primary transition-colors">{name}</h3>
            <Badge variant="secondary" className="bg-gradient-to-r from-amber-100 to-amber-200 text-amber-800 border-amber-300">
              {role === 'System Developer' ? <Code className="h-3 w-3 mr-1" /> : <Star className="h-3 w-3 mr-1" />}
              {role}
            </Badge>
          </div>
        </div>
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      <p className="text-muted-foreground font-bengali text-sm leading-relaxed">{description}</p>
      <div className="flex flex-wrap gap-3 mt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.open(`https://github.com/${githubUser}`, '_blank')}
          className="font-bengali hover:bg-primary hover:text-white transition-colors"
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          GitHub Profile
        </Button>
        {repoName && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(`https://github.com/${repoName}`, '_blank')}
            className="font-bengali hover:bg-secondary hover:text-white transition-colors"
          >
            <Code className="h-4 w-4 mr-2" />
            Source Code
          </Button>
        )}
      </div>
    </CardContent>
  </Card>
);

export const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-16">
        {/* Hero Header */}
        <header className="text-center space-y-6 py-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-amber-100 rounded-full border border-primary/20">
            <Heart className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary font-bengali">আমাদের মিশন</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-primary to-amber-600 bg-clip-text text-transparent font-bengali leading-tight">
            হাদিস বাংলা
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto font-bengali leading-relaxed">
            ইসলামিক জ্ঞানের সবচেয়ে বিশুদ্ধ উৎস - ৬টি প্রামাণিক হাদিস গ্রন্থের সম্পূর্ণ বাংলা অনুবাদ
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Badge variant="outline" className="px-4 py-2 text-sm">
              <BookOpen className="h-4 w-4 mr-2" />
              ৩৪,০০০+ হাদিস
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-sm">
              <Globe className="h-4 w-4 mr-2" />
              ১০০% বিনামূল্যে
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-sm">
              <Shield className="h-4 w-4 mr-2" />
              সম্পূর্ণ নির্ভরযোগ্য
            </Badge>
          </div>
        </header>

        {/* Statistics Section */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard number="৬" label="হাদিস গ্রন্থ" icon={BookOpen} />
          <StatCard number="৩৪,০০০+" label="মোট হাদিস" icon={Database} />
          <StatCard number="১০০%" label="বিনামূল্যে" icon={Heart} />
          <StatCard number="২৪/৭" label="অ্যাক্সেসযোগ্য" icon={Globe} />
        </section>

        {/* Mission & Vision */}
        <section className="grid md:grid-cols-2 gap-8">
          <Card className="shadow-2xl border-0 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardHeader>
              <CardTitle className="font-bengali text-2xl flex items-center text-primary">
                <Target className="h-6 w-6 mr-3" />
                আমাদের লক্ষ্য
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground font-bengali leading-relaxed text-lg">
                হাদিস বাংলা প্রকল্পের মূল উদ্দেশ্য হলো ইসলামের ৬টি প্রধান হাদিস গ্রন্থের বাংলা অনুবাদ সবার জন্য সহজভাবে পৌঁছে দেওয়া। 
                আমরা বিশ্বাস করি যে, ইসলামিক জ্ঞান সবার অধিকার এবং তা বিনামূল্যে ও সহজে পাওয়া উচিত।
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-2xl border-0 bg-gradient-to-br from-amber-50 to-amber-100">
            <CardHeader>
              <CardTitle className="font-bengali text-2xl flex items-center text-amber-700">
                <Award className="h-6 w-6 mr-3" />
                আমাদের দৃষ্টিভঙ্গি
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-amber-700/80 font-bengali leading-relaxed text-lg">
                একটি আধুনিক, ব্যবহারকারী-বান্ধব প্ল্যাটফর্ম তৈরি করা যেখানে মুসলিম উম্মাহ সহজেই প্রামাণিক হাদিস অধ্যয়ন করতে পারবে। 
                প্রযুক্তির মাধ্যমে ইসলামিক শিক্ষাকে আরও সহজলভ্য করে তোলা।
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Key Features */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold font-bengali text-primary">বৈশিষ্ট্যসমূহ</h2>
            <p className="text-lg text-muted-foreground font-bengali max-w-3xl mx-auto">
              আধুনিক প্রযুক্তির সাথে ঐতিহ্যবাহী ইসলামিক জ্ঞানের সমন্বয়
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              icon={BookOpen} 
              title="সম্পূর্ণ হাদিস সংগ্রহ" 
              description="৬টি প্রধান হাদিস গ্রন্থের সম্পূর্ণ বাংলা অনুবাদ একই স্থানে" 
            />
            <FeatureCard 
              icon={Database} 
              title="ফ্রি API অ্যাক্সেস" 
              description="ডেভেলপারদের জন্য সম্পূর্ণ বিনামূল্যে RESTful API সেবা" 
            />
            <FeatureCard 
              icon={Zap} 
              title="দ্রুত অনুসন্ধান" 
              description="উন্নত সার্চ ইঞ্জিনের মাধ্যমে তাৎক্ষণিক হাদিস খুঁজে পান" 
            />
            <FeatureCard 
              icon={Globe} 
              title="সব ডিভাইসে" 
              description="মোবাইল, ট্যাবলেট ও কম্পিউটার - সব ডিভাইসেই ব্যবহারযোগ্য" 
            />
            <FeatureCard 
              icon={Shield} 
              title="নির্ভরযোগ্য সূত্র" 
              description="সকল হাদিস যাচাইকৃত এবং প্রামাণিক উৎস থেকে সংগৃহীত" 
            />
            <FeatureCard 
              icon={Heart} 
              title="সম্পূর্ণ বিনামূল্যে" 
              description="কোন বিজ্ঞাপন নেই, কোন পেমেন্ট নেই - সম্পূর্ণ ফ্রি সেবা" 
            />
          </div>
        </section>

        {/* Hadith Books Collection */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold font-bengali text-primary">হাদিস গ্রন্থসমূহ</h2>
            <p className="text-lg text-muted-foreground font-bengali max-w-3xl mx-auto">
              ইসলামের সবচেয়ে প্রামাণিক ৬টি হাদিস গ্রন্থের সম্পূর্ণ সংগ্রহ
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'সহীহ বুখারী', arabic: 'صحيح البخاري', count: '৭,৫৬৩', color: 'emerald' },
              { name: 'সহীহ মুসলিম', arabic: 'صحيح مسلم', count: '৭,৫৬৩', color: 'blue' },
              { name: 'সুনান আবু দাউদ', arabic: 'سنن أبي داود', count: '৫,২৭৪', color: 'purple' },
              { name: 'সুনান ইবনে মাজাহ', arabic: 'سنن ابن ماجه', count: '৪,৩৪১', color: 'amber' },
              { name: 'সুনান আন-নাসাঈ', arabic: 'سنن النسائي', count: '৫,৭৫৮', color: 'rose' },
              { name: 'সুনান আত-তিরমিযী', arabic: 'سنن الترمذي', count: '৩,৯৫৬', color: 'indigo' }
            ].map((book, index) => (
              <Card key={index} className={`shadow-lg border-0 bg-gradient-to-br from-${book.color}-50 to-${book.color}-100 hover:shadow-xl transition-all duration-300 group`}>
                <CardContent className="p-6 text-center">
                  <div className={`inline-flex p-3 rounded-full bg-${book.color}-200 text-${book.color}-700 mb-4 group-hover:scale-110 transition-transform`}>
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <h3 className={`font-bold font-bengali text-lg mb-2 text-${book.color}-800`}>{book.name}</h3>
                  <p className={`text-sm mb-3 font-arabic text-${book.color}-600`}>{book.arabic}</p>
                  <Badge variant="secondary" className={`bg-${book.color}-200 text-${book.color}-800 font-bengali`}>
                    {book.count} হাদিস
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contributors Section */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold font-bengali text-primary">অবদানকারীগণ</h2>
            <p className="text-lg text-muted-foreground font-bengali max-w-3xl mx-auto">
              যাদের প্রচেষ্টায় এই প্রকল্প সম্ভব হয়েছে
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <ContributorCard
              name="Mahfuz Rahman"
              role="System Developer"
              description="হাদিস বাংলা অ্যাপ্লিকেশন এবং API সিস্টেমের সম্পূর্ণ ডিজাইন ও ডেভেলপমেন্ট করেছেন মাহফুজ রহমান। তিনি একজন ফুল-স্ট্যাক সফটওয়্যার ডেভেলপার যিনি ইসলামিক প্রযুক্তি সমাধান তৈরিতে বিশেষজ্ঞ।"
              githubUser="mahfuz4223"
              repoName="mahfuz4223/bangla-hadith-api"
            />
            <ContributorCard
              name="MD Rifat Khan"
              role="Data Provider"
              description="এই প্রকল্পের সমস্ত হাদিস ডেটা এমডি রিফাত খানের GitHub রিপোজিটরি থেকে সংগ্রহ করা হয়েছে। তিনি ৬টি প্রধান হাদিস গ্রন্থের সম্পূর্ণ বাংলা অনুবাদ JSON ফরম্যাটে সংগ্রহ ও সংরক্ষণ করেছেন।"
              githubUser="md-rifatkhan"
              repoName="md-rifatkhan/hadithbangla"
            />
          </div>
        </section>

        {/* Technology Stack */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold font-bengali text-primary">ব্যবহৃত প্রযুক্তি</h2>
            <p className="text-lg text-muted-foreground font-bengali max-w-3xl mx-auto">
              আধুনিক ওয়েব প্রযুক্তির সমন্বয়ে তৈরি
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: 'React', icon: Code },
              { name: 'TypeScript', icon: Code },
              { name: 'Tailwind CSS', icon: Code },
              { name: 'Vite', icon: Zap },
              { name: 'Shadcn/ui', icon: Code },
              { name: 'Lucide Icons', icon: Star }
            ].map((tech, index) => (
              <div key={index} className="text-center p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <tech.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">{tech.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center space-y-8 py-16">
          <Card className="shadow-2xl border-0 bg-gradient-to-br from-primary/10 via-primary/5 to-background max-w-4xl mx-auto">
            <CardContent className="p-12 space-y-6">
              <div className="inline-flex p-4 rounded-full bg-primary/10 text-primary mb-6">
                <Users className="h-8 w-8" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-bengali text-primary">
                অবদান রাখুন
              </h2>
              <p className="text-lg text-muted-foreground font-bengali max-w-2xl mx-auto leading-relaxed">
                এই প্রকল্পটি সম্পূর্ণ ওপেন সোর্স। আপনি চাইলে কোড উন্নতি, বাগ রিপোর্ট, বা নতুন ফিচার যোগ করে অবদান রাখতে পারেন।
                কমিউনিটির সবার অংশগ্রহণে এই প্রকল্প আরও উন্নত হবে।
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <Button
                  size="lg"
                  onClick={() => window.open('https://github.com/mahfuz4223/bangla-hadith-api', '_blank')}
                  className="font-bengali bg-primary hover:bg-primary/90"
                >
                  <GitBranch className="h-5 w-5 mr-2" />
                  GitHub এ অবদান রাখুন
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => window.open('https://github.com/mahfuz4223/bangla-hadith-api/issues', '_blank')}
                  className="font-bengali border-primary text-primary hover:bg-primary hover:text-white"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  ইস্যু রিপোর্ট করুন
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Footer Info */}
        <section className="text-center space-y-4 py-8 border-t border-border/50">
          <p className="text-muted-foreground font-bengali text-lg">
            হাদিস বাংলা - ইসলামিক জ্ঞান অর্জনের জন্য একটি নির্ভরযোগ্য উৎস
          </p>
          <p className="text-sm text-muted-foreground font-bengali">
            সূত্র ব্যবহারের সময় দয়া করে যথাযথভাবে ক্রেডিট দিন। © ২০২৫ হাদিস বাংলা প্রকল্প
          </p>
          <div className="flex justify-center items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>সর্বশেষ আপডেট: সেপ্টেম্বর ২০২৫</span>
          </div>
        </section>
      </div>
    </div>
  );
};