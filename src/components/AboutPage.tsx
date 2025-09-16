import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Heart, Code, GitBranch, Star, Users } from 'lucide-react';

export const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gradient-primary font-bengali">
          হাদিস বাংলা সম্পর্কে
        </h1>
        <p className="text-lg text-muted-foreground font-bengali">
          ইসলামিক জ্ঞান সবার জন্য সহজলভ্য করার একটি উদ্যোগ
        </p>
      </div>

      {/* Project Overview */}
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="font-bengali text-gradient-primary flex items-center">
            <Heart className="h-5 w-5 mr-2 text-red-500" />
            আমাদের লক্ষ্য
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground font-bengali leading-relaxed">
            হাদিস বাংলা প্রকল্পের মূল উদ্দেশ্য হলো ইসলামের ৬টি প্রধান হাদিস গ্রন্থের বাংলা অনুবাদ সবার জন্য সহজভাবে পৌঁছে দেওয়া। 
            আমরা বিশ্বাস করি যে, ইসলামিক জ্ঞান সবার অধিকার এবং তা বিনামূল্যে ও সহজে পাওয়া উচিত।
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <Code className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-medium font-bengali">ওপেন সোর্স</h3>
              <p className="text-sm text-muted-foreground font-bengali">সম্পূর্ণ কোড সবার জন্য উন্মুক্ত</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <Users className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-medium font-bengali">কমিউনিটি</h3>
              <p className="text-sm text-muted-foreground font-bengali">সবার অংশগ্রহণে উন্নত</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
              <h3 className="font-medium font-bengali">বিনামূল্যে</h3>
              <p className="text-sm text-muted-foreground font-bengali">সম্পূর্ণ ফ্রি এবং অ্যাড-ফ্রি</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Source Credit */}
      <Card className="shadow-elegant border-primary/20">
        <CardHeader>
          <CardTitle className="font-bengali text-gradient-primary flex items-center">
            <GitBranch className="h-5 w-5 mr-2" />
            ডেটা সোর্স ও কৃতজ্ঞতা
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gradient-subtle p-4 rounded-lg border border-primary/20">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold font-bengali">MD Rifat Khan</h3>
              <Badge variant="secondary" className="bg-gradient-gold">
                <Star className="h-3 w-3 mr-1" />
                মূল ডেটা প্রোভাইডার
              </Badge>
            </div>
            <p className="text-muted-foreground font-bengali mb-4">
              এই প্রকল্পের সমস্ত হাদিস ডেটা MD Rifat Khan এর GitHub রিপোজিটরি থেকে নেওয়া হয়েছে। 
              তিনি ৬টি প্রধান হাদিস গ্রন্থের সম্পূর্ণ বাংলা অনুবাদ JSON ফরম্যাটে সংগ্রহ ও সংরক্ষণ করেছেন।
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open('https://github.com/md-rifatkhan/hadithbangla', '_blank')}
                className="font-bengali"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                GitHub রিপোজিটরি দেখুন
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open('https://github.com/md-rifatkhan', '_blank')}
                className="font-bengali"
              >
                <Users className="h-4 w-4 mr-2" />
                প্রোফাইল দেখুন
              </Button>
            </div>
          </div>
          
          <div className="bg-muted/30 p-4 rounded-lg">
            <h4 className="font-medium font-bengali mb-2">অন্তর্ভুক্ত হাদিস গ্রন্থসমূহ:</h4>
            <ul className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground font-bengali">
              <li>• সহীহ বুখারী (৭৫৬৩ হাদিস)</li>
              <li>• সহীহ মুসলিম (৭৫৬৩ হাদিস)</li>
              <li>• সুনান আবু দাউদ (৫২৭৪ হাদিস)</li>
              <li>• সুনান আত-তিরমিযী (৩৯৫৬ হাদিস)</li>
              <li>• সুনান আন-নাসাঈ (৫৭৬২ হাদিস)</li>
              <li>• সুনান ইবনে মাজাহ (৪৩৪১ হাদিস)</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Technical Information */}
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="font-bengali text-gradient-primary">
            প্রযুক্তিগত তথ্য
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium font-bengali mb-3">ব্যবহৃত প্রযুক্তি:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground font-bengali">
                <li>• React + TypeScript</li>
                <li>• Tailwind CSS</li>
                <li>• Shadcn/ui Components</li>
                <li>• Lucide Icons</li>
                <li>• Vite Build Tool</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium font-bengali mb-3">বৈশিষ্ট্যসমূহ:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground font-bengali">
                <li>• রেসপন্সিভ ডিজাইন</li>
                <li>• ডার্ক/লাইট থিম</li>
                <li>• ইসলামিক থিমড UI</li>
                <li>• বাংলা ও আরবি ফন্ট সাপোর্ট</li>
                <li>• API ডকুমেন্টেশন</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact & Contribution */}
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="font-bengali text-gradient-primary">
            অবদান রাখুন
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground font-bengali mb-4">
            এই প্রকল্পটি ওপেন সোর্স। আপনি চাইলে কোড উন্নতি, বাগ রিপোর্ট, 
            বা নতুন ফিচার যোগ করতে অবদান রাখতে পারেন।
          </p>
          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-medium font-bengali mb-2">গুরুত্বপূর্ণ নোট:</h4>
            <p className="text-sm text-muted-foreground font-bengali">
              সমস্ত হাদিস ডেটার মূল উৎস MD Rifat Khan এর GitHub রিপোজিটরি। 
              এই অ্যাপ্লিকেশন শুধুমাত্র ডেটা প্রদর্শন ও API সেবা প্রদানের জন্য তৈরি।
              মূল ডেটার কোনো পরিবর্তন বা সম্পাদনা করা হয়নি।
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};