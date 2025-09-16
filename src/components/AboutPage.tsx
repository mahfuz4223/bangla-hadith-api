import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Heart, Code, GitBranch, Star, Users, Briefcase } from 'lucide-react';

// Reusable component for feature cards
const FeatureCard = ({ icon, title, description }: { icon: React.ElementType, title: string, description: string }) => {
  const Icon = icon;
  return (
    <div className="text-center p-4 bg-muted/50 rounded-lg transition-all hover:bg-muted/80">
      <Icon className="h-8 w-8 text-primary mx-auto mb-3" />
      <h3 className="font-medium font-bengali">{title}</h3>
      <p className="text-sm text-muted-foreground font-bengali">{description}</p>
    </div>
  );
};

// Reusable component for contributor cards
const ContributorCard = ({ name, role, description, githubUser, repoName, children }: any) => (
  <Card className="shadow-elegant border-primary/20 bg-gradient-subtle">
    <CardHeader>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold font-bengali">{name}</h3>
        <Badge variant="secondary" className="bg-gradient-gold">
          {role === 'Developer' ? <Code className="h-3 w-3 mr-1" /> : <Star className="h-3 w-3 mr-1" />}
          {role}
        </Badge>
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      <p className="text-muted-foreground font-bengali text-sm leading-relaxed">{description}</p>
      {children}
      <div className="flex flex-wrap gap-3 mt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.open(`https://github.com/${githubUser}`, '_blank')}
          className="font-bengali"
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          GitHub Profile
        </Button>
        {repoName && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(`https://github.com/${repoName}`, '_blank')}
            className="font-bengali"
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
    <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-12">
      {/* Header */}
      <header className="text-center space-y-4">
        <Badge variant="secondary" className="bg-gradient-gold text-accent-foreground">
          <Heart className="h-4 w-4 mr-2" />
          Our Mission
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold text-gradient-primary font-bengali">
          হাদিস বাংলা সম্পর্কে
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          ইসলামিক জ্ঞান সবার জন্য সহজলভ্য করার একটি উদ্যোগ।
        </p>
      </header>

      {/* Project Overview */}
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="font-bengali text-gradient-primary flex items-center">
            <Briefcase className="h-5 w-5 mr-2" />
            আমাদের লক্ষ্য
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground font-bengali leading-relaxed text-center">
            হাদিস বাংলা প্রকল্পের মূল উদ্দেশ্য হলো ইসলামের ৬টি প্রধান হাদিস গ্রন্থের বাংলা অনুবাদ সবার জন্য সহজভাবে পৌঁছে দেওয়া। 
            আমরা বিশ্বাস করি যে, ইসলামিক জ্ঞান সবার অধিকার এবং তা বিনামূল্যে ও সহজে পাওয়া উচিত।
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <FeatureCard icon={Code} title="ওপেন সোর্স" description="সম্পূর্ণ কোড সবার জন্য উন্মুক্ত" />
            <FeatureCard icon={Users} title="কমিউনিটি" description="সবার অংশগ্রহণে উন্নত" />
            <FeatureCard icon={Heart} title="বিনামূল্যে" description="সম্পূর্ণ ফ্রি এবং অ্যাড-ফ্রি" />
          </div>
        </CardContent>
      </Card>

      {/* Contributors Section */}
      <div className="grid md:grid-cols-2 gap-8">
        <ContributorCard
          name="Mahfuz Rahman"
          role="System Developer"
          description="This entire Hadith Bangla application and API system was designed and developed by Mahfuz Rahman. He is a full-stack software developer specializing in creating Islamic technology solutions."
          githubUser="mahfuz4223"
          repoName="mahfuz4223/hadithbangla-app"
        />
        <ContributorCard
          name="MD Rifat Khan"
          role="Data Provider"
          description="All Hadith data for this project was sourced from MD Rifat Khan's GitHub repository. He collected and stored the complete Bengali translation of the 6 major Hadith books in JSON format."
          githubUser="md-rifatkhan"
          repoName="md-rifatkhan/hadithbangla"
        />
      </div>

      {/* Data Source & Tech Stack */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="font-bengali text-gradient-primary flex items-center">
              <GitBranch className="h-5 w-5 mr-2" />
              হাদিস গ্রন্থসমূহ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid grid-cols-2 gap-2 text-sm text-muted-foreground font-bengali">
              <li>• সহীহ বুখারী</li>
              <li>• সহীহ মুসলিম</li>
              <li>• সুনান আবু দাউদ</li>
              <li>• সুনান আত-তিরমিযী</li>
              <li>• সুনান আন-নাসাঈ</li>
              <li>• সুনান ইবনে মাজাহ</li>
            </ul>
          </CardContent>
        </Card>
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="font-bengali text-gradient-primary flex items-center">
              <Code className="h-5 w-5 mr-2" />
              ব্যবহৃত প্রযুক্তি
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid grid-cols-2 gap-2 text-sm text-muted-foreground font-bengali">
              <li>• React & TypeScript</li>
              <li>• Tailwind CSS</li>
              <li>• Shadcn/ui</li>
              <li>• Lucide Icons</li>
              <li>• Vite</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Collaboration & Contribution */}
      <Card className="shadow-elegant text-center bg-gradient-subtle border-accent/20">
        <CardHeader>
          <CardTitle className="font-bengali text-gradient-gold flex items-center justify-center">
            <Users className="h-5 w-5 mr-2" />
            অবদান রাখুন
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground font-bengali">
            এই প্রকল্পটি ওপেন সোর্স। আপনি চাইলে কোড উন্নতি, বাগ রিপোর্ট, বা নতুন ফিচার যোগ করে অবদান রাখতে পারেন।
            This project is a collaboration, and we welcome contributions from the community.
          </p>
          <Button
            variant="outline"
            onClick={() => window.open('https://github.com/mahfuz4223/hadithbangla-app/issues', '_blank')}
            className="font-bengali"
          >
            <GitBranch className="h-4 w-4 mr-2" />
            Contribute on GitHub
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};