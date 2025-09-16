import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Copy, ExternalLink, Code, Database } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const apiEndpoints = [
  {
    title: 'Chapter Endpoints',
    description: 'প্রতিটি গ্রন্থের অধ্যায়ের তথ্য পেতে',
    endpoints: [
      { name: 'Sahih Bukhari', url: 'https://cdn.jsdelivr.net/gh/md-rifatkhan/hadithbangla@main/Bukhari/Chapter/{chapter_id}.json' },
      { name: 'Sahih Muslim', url: 'https://cdn.jsdelivr.net/gh/md-rifatkhan/hadithbangla@main/Muslim/Chapter/{chapter_id}.json' },
      { name: 'Sunan Abu Dawood', url: 'https://cdn.jsdelivr.net/gh/md-rifatkhan/hadithbangla@main/AbuDaud/Chapter/{chapter_id}.json' },
      { name: 'Sunan Ibn Majah', url: 'https://cdn.jsdelivr.net/gh/md-rifatkhan/hadithbangla@main/Ibne-Mazah/Chapter/{chapter_id}.json' },
      { name: 'Sunan An-Nasa\'i', url: 'https://cdn.jsdelivr.net/gh/md-rifatkhan/hadithbangla@main/Al-Nasai/Chapter/{chapter_id}.json' },
      { name: 'Sunan At-Tirmidhi', url: 'https://cdn.jsdelivr.net/gh/md-rifatkhan/hadithbangla@main/At-tirmizi/Chapter/{chapter_id}.json' },
    ]
  },
  {
    title: 'Hadith Endpoints',
    description: 'নির্দিষ্ট হাদিসের সম্পূর্ণ তথ্য পেতে',
    endpoints: [
      { name: 'Sahih Bukhari', url: 'https://cdn.jsdelivr.net/gh/md-rifatkhan/hadithbangla@main/Bukhari/hadith/{hadith_id}.json' },
      { name: 'Sahih Muslim', url: 'https://cdn.jsdelivr.net/gh/md-rifatkhan/hadithbangla@main/Muslim/hadith/{hadith_id}.json' },
      { name: 'Sunan Abu Dawood', url: 'https://cdn.jsdelivr.net/gh/md-rifatkhan/hadithbangla@main/AbuDaud/hadith/{hadith_id}.json' },
      { name: 'Sunan Ibn Majah', url: 'https://cdn.jsdelivr.net/gh/md-rifatkhan/hadithbangla@main/Ibne-Mazah/hadith/{hadith_id}.json' },
      { name: 'Sunan An-Nasa\'i', url: 'https://cdn.jsdelivr.net/gh/md-rifatkhan/hadithbangla@main/Al-Nasai/hadith/{hadith_id}.json' },
      { name: 'Sunan At-Tirmidhi', url: 'https://cdn.jsdelivr.net/gh/md-rifatkhan/hadithbangla@main/At-tirmizi/hadith/{hadith_id}.json' },
    ]
  }
];

const exampleResponse = `{
  "hadith": {
    "hadith_id": 1,
    "narrator": "'আলক্বামাহ ইব্‌নু ওয়াক্কাস আল-লায়সী (রহঃ)",
    "bn": "আমি 'উমর ইব্‌নুল খাত্তাব (রাঃ)-কে মিম্বারের উপর দাঁড়িয়ে বলতে শুনেছিঃ...",
    "ar": "عن عمر بن الخطاب رضي الله عنه قال سمعت رسول الله...",
    "chapter_id": 1,
    "chapter_title": "ওহীর সূচনা"
  }
}`;

export const ApiDocumentation = () => {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'কপি হয়েছে!',
      description: 'API URL ক্লিপবোর্ডে কপি হয়েছে',
    });
  };

  const openInNewTab = (url: string) => {
    const actualUrl = url.replace('{hadith_id}', '1').replace('{chapter_id}', '1');
    window.open(actualUrl, '_blank');
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gradient-primary font-bengali">
          হাদিস API ডকুমেন্টেশন
        </h1>
        <p className="text-lg text-muted-foreground font-bengali">
          ৬টি প্রধান হাদিস গ্রন্থের সম্পূর্ণ বাংলা অনুবাদ - আমাদের API ব্যবহার করুন
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <Badge variant="secondary" className="bg-gradient-gold text-accent-foreground">
            <Database className="h-4 w-4 mr-1" />
            আমাদের API ব্যবহার করুন
          </Badge>
          <Badge variant="outline" className="border-red-500 text-red-600">
            GitHub API সরাসরি ব্যবহার করবেন না
          </Badge>
        </div>
      </div>

      {/* Important Notice */}
      <Card className="shadow-elegant border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800">
        <CardHeader>
          <CardTitle className="font-bengali text-amber-700 dark:text-amber-400 flex items-center">
            ⚠️ গুরুত্বপূর্ণ নোটিস
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-amber-800 dark:text-amber-200 font-bengali font-medium">
            দয়া করে GitHub এর raw API সরাসরি ব্যবহার করবেন না। আমাদের প্রোভাইড করা API endpoint গুলো ব্যবহার করুন।
          </p>
          <div className="bg-white/50 dark:bg-black/20 p-3 rounded-lg">
            <h4 className="font-bengali font-medium text-amber-900 dark:text-amber-100 mb-2">কেন আমাদের API ব্যবহার করবেন:</h4>
            <ul className="text-sm text-amber-800 dark:text-amber-200 font-bengali space-y-1">
              <li>✅ স্থিতিশীল এবং নির্ভরযোগ্য</li>
              <li>✅ রেট লিমিটিং এবং ক্যাশিং সহ</li>
              <li>✅ উন্নত পারফরমেন্স</li>
              <li>✅ প্রপার CORS সাপোর্ট</li>
              <li>✅ API ডকুমেন্টেশন এবং সাপোর্ট</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* API Endpoints */}
      {apiEndpoints.map((section, sectionIndex) => (
        <Card key={sectionIndex} className="shadow-elegant">
          <CardHeader>
            <CardTitle className="font-bengali text-gradient-primary flex items-center">
              <Code className="h-5 w-5 mr-2" />
              {section.title}
            </CardTitle>
            <p className="text-muted-foreground font-bengali">{section.description}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {section.endpoints.map((endpoint, endpointIndex) => (
              <div key={endpointIndex} className="border rounded-lg p-4 bg-muted/50">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium font-bengali">{endpoint.name}</h4>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(endpoint.url)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openInNewTab(endpoint.url)}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <code className="text-sm bg-background p-2 rounded block font-mono break-all">
                  {endpoint.url}
                </code>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}

      {/* Example Response */}
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="font-bengali text-gradient-primary">
            উদাহরণ Response
          </CardTitle>
          <p className="text-muted-foreground font-bengali">
            API থেকে যে ধরনের ডেটা পাবেন তার নমুনা
          </p>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Button
              size="sm"
              variant="outline"
              className="absolute top-2 right-2 z-10"
              onClick={() => copyToClipboard(exampleResponse)}
            >
              <Copy className="h-4 w-4" />
            </Button>
            <pre className="bg-background border rounded-lg p-4 text-sm overflow-auto">
              <code>{exampleResponse}</code>
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Usage Instructions */}
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="font-bengali text-gradient-primary">
            ব্যবহারের নির্দেশনা
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium font-bengali">Chapter API</h4>
              <p className="text-sm text-muted-foreground font-bengali">
                অধ্যায়ের তথ্য পেতে <code>{'{chapter_id}'}</code> এর জায়গায় অধ্যায় নম্বর দিন (১ থেকে শুরু)
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium font-bengali">Hadith API</h4>
              <p className="text-sm text-muted-foreground font-bengali">
                হাদিস পেতে <code>{'{hadith_id}'}</code> এর জায়গায় হাদিস নম্বর দিন (১ থেকে শুরু)
              </p>
            </div>
          </div>

          {/* API Usage Examples */}
          <div className="bg-gradient-subtle p-4 rounded-lg border">
            <h4 className="font-medium font-bengali mb-3">API ব্যবহারের উদাহরণ:</h4>
            <div className="space-y-3">
              <div className="bg-background p-3 rounded border">
                <h5 className="text-sm font-medium font-bengali text-primary mb-1">JavaScript/Fetch:</h5>
                <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
                  <code>{`fetch('https://your-api-domain.com/api/hadith/bukhari/1')
  .then(response => response.json())
  .then(data => console.log(data));`}</code>
                </pre>
              </div>
              <div className="bg-background p-3 rounded border">
                <h5 className="text-sm font-medium font-bengali text-primary mb-1">cURL:</h5>
                <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
                  <code>{`curl -X GET "https://your-api-domain.com/api/hadith/bukhari/1"`}</code>
                </pre>
              </div>
            </div>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-medium font-bengali mb-2">গুরুত্বপূর্ণ তথ্য:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground font-bengali">
              <li>আমাদের API endpoints ব্যবহার করুন, GitHub এর raw files নয়</li>
              <li>সব API সম্পূর্ণ ফ্রি এবং কোন authentication প্রয়োজন নেই</li>
              <li>ডেটা JSON ফরম্যাটে পাবেন</li>
              <li>হাদিসের বাংলা অনুবাদ এবং আরবি মূল পাঠ উভয়ই আছে</li>
              <li>সূত্র উল্লেখের সময় দয়া করে যথাযথভাবে credit দিন</li>
              <li>রেট লিমিটিং: প্রতি মিনিটে ১০০ রিকুয়েস্ট</li>
              <li>প্রোডাকশনে ব্যবহারের আগে আমাদের সাথে যোগাযোগ করুন</li>
            </ul>
          </div>

          {/* Integration Guide */}
          <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
            <h4 className="font-medium font-bengali mb-3 text-primary">ইন্টিগ্রেশন গাইড:</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground font-bengali">
              <div>
                <h5 className="font-medium text-foreground mb-2">Web Applications:</h5>
                <ul className="space-y-1">
                  <li>• React, Vue, Angular</li>
                  <li>• JavaScript, TypeScript</li>
                  <li>• CORS enabled</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-foreground mb-2">Mobile Apps:</h5>
                <ul className="space-y-1">
                  <li>• React Native, Flutter</li>
                  <li>• Android (Java/Kotlin)</li>
                  <li>• iOS (Swift/Objective-C)</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};