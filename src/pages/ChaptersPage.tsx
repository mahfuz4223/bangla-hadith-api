import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, List, Grid3X3 } from 'lucide-react';
import { ChapterNavigator } from '@/components/ChapterNavigator';
import { ChapterBrowser } from '@/components/ChapterBrowser';
import { useNavigate } from 'react-router-dom';

export const ChaptersPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('navigator');

  const handleChapterSelect = (bookSlug: string, chapterId: number) => {
    // Navigate to the first hadith of the selected chapter
    navigate(`/read/${bookSlug}/1`);
  };

  const handleHadithSelect = (bookSlug: string, hadithId: number, chapterId: number) => {
    // Navigate to the specific hadith
    navigate(`/read/${bookSlug}/${hadithId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-12 bg-gradient-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <div className="bg-white/20 p-4 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
              <BookOpen className="h-10 w-10 text-white" />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-white font-bengali">
              অধ্যায় ব্রাউজার
            </h1>
            
            <p className="text-xl text-white/90 font-bengali max-w-2xl mx-auto">
              হাদিস গ্রন্থের অধ্যায় অনুসারে হাদিস খুঁজে বের করুন এবং পড়ুন
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            {/* Tab Navigation */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <TabsList className="grid w-full sm:w-auto grid-cols-2">
                <TabsTrigger value="navigator" className="font-bengali">
                  <List className="h-4 w-4 mr-2" />
                  উন্নত নেভিগেটর
                </TabsTrigger>
                <TabsTrigger value="browser" className="font-bengali">
                  <Grid3X3 className="h-4 w-4 mr-2" />
                  সিম্পল ব্রাউজার
                </TabsTrigger>
              </TabsList>

              <div className="text-sm text-muted-foreground font-bengali">
                মোট ৬টি হাদিস গ্রন্থের অধ্যায়সমূহ ব্রাউজ করুন
              </div>
            </div>

            {/* Tab Content */}
            <TabsContent value="navigator" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-bengali flex items-center gap-2">
                    <List className="h-5 w-5" />
                    উন্নত অধ্যায় নেভিগেটর
                  </CardTitle>
                  <p className="text-muted-foreground font-bengali">
                    প্রতিটি অধ্যায়ের হাদিস দেখুন এবং সরাসরি নির্দিষ্ট হাদিসে যান
                  </p>
                </CardHeader>
                <CardContent>
                  <ChapterNavigator onHadithSelect={handleHadithSelect} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="browser" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-bengali flex items-center gap-2">
                    <Grid3X3 className="h-5 w-5" />
                    সিম্পল অধ্যায় ব্রাউজার
                  </CardTitle>
                  <p className="text-muted-foreground font-bengali">
                    অধ্যায়ের সারসংক্ষেপ দেখুন এবং পূর্ণ অধ্যায় পড়তে যান
                  </p>
                </CardHeader>
                <CardContent>
                  <ChapterBrowser onChapterSelect={handleChapterSelect} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Help Section */}
          <div className="mt-16 text-center">
            <Card className="bg-muted/30">
              <CardContent className="py-8">
                <h3 className="text-xl font-bold font-bengali mb-4">
                  কীভাবে ব্যবহার করবেন?
                </h3>
                <div className="grid md:grid-cols-2 gap-6 text-sm text-muted-foreground font-bengali">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">উন্নত নেভিগেটর:</h4>
                    <p>প্রতিটি অধ্যায়ের সব হাদিস দেখুন এবং যেকোনো হাদিসে সরাসরি ক্লিক করে পড়তে যান।</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">সিম্পল ব্রাউজার:</h4>
                    <p>অধ্যায়ের সারসংক্ষেপ দেখুন এবং পূর্ণ অধ্যায়ের প্রথম হাদিস থেকে শুরু করুন।</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};