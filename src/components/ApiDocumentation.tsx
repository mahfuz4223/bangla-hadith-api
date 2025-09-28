import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Copy, ExternalLink, Code, Database, ShieldCheck, Zap, Info, BookOpen, Layers } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from '@/components/ui/label';

const apiInfo = {
  baseUrl: "https://api.hadithbangla.com",
  githubRepo: "https://github.com/md-rifatkhan/hadithbangla",
  cdnBaseUrl: "https://cdn.jsdelivr.net/gh/md-rifatkhan/hadithbangla@main",
  books: [
    { value: "bukhari", label: "সহীহ বুখারী", labelEn: "Sahih Bukhari", path: "Bukhari" },
    { value: "muslim", label: "সহীহ মুসলিম", labelEn: "Sahih Muslim", path: "Muslim" },
    { value: "abu-dawood", label: "সুনান আবু দাউদ", labelEn: "Sunan Abu Dawood", path: "AbuDaud" },
    { value: "ibn-majah", label: "সুনান ইবনে মাজাহ", labelEn: "Sunan Ibn Majah", path: "Ibne-Mazah" },
    { value: "nasai", label: "সুনান নাসাঈ", labelEn: "Sunan An-Nasa'i", path: "Al-Nasai" },
    { value: "tirmidhi", label: "সুনান তিরমিযী", labelEn: "Sunan At-Tirmidhi", path: "At-tirmizi" }
  ],
  endpoints: [
    {
      name: "Get Random Hadith",
      path: "/random",
      params: ["book (optional)"],
      example: "/random?book=bukhari",
      description: "Get a random hadith from all books or a specific book"
    },
    {
      name: "Get Hadith by Number",
      path: "/hadith/{book}/{number}",
      params: ["book", "number"],
      example: "/hadith/bukhari/1",
      description: "Get a specific hadith by book and hadith number"
    },
    {
      name: "Search Hadith",
      path: "/search",
      params: ["q", "book (optional)", "limit (optional)"],
      example: "/search?q=prayer&book=bukhari&limit=10",
      description: "Search hadith by text content"
    },
    {
      name: "Get Chapter List",
      path: "/chapters/{book}",
      params: ["book"],
      example: "/chapters/bukhari",
      description: "Get all chapters from a specific book"
    },
    {
      name: "Get Chapter by ID",
      path: "/chapter/{book}/{id}",
      params: ["book", "id"],
      example: "/chapter/bukhari/1",
      description: "Get a specific chapter with its hadith list"
    }
  ],
  cdnEndpoints: [
    {
      name: "CDN Chapter Data",
      path: "/{BookPath}/Chapter/{id}.json",
      example: "/Bukhari/Chapter/1.json",
      description: "Get chapter data directly from CDN"
    },
    {
      name: "CDN Hadith Data",
      path: "/{BookPath}/Hadith/{number}.json", 
      example: "/Bukhari/Hadith/1.json",
      description: "Get individual hadith data from CDN"
    }
  ],
  responseSchema: {
    "hadith_id": { type: "number", description: "হাদিসের অনন্য আইডি" },
    "narrator": { type: "string", description: "হাদিসের বর্ণনাকারী" },
    "bn": { type: "string", description: "বাংলা হাদিস টেক্সট" },
    "ar": { type: "string", description: "আরবি হাদিস টেক্সট" },
    "chapter_id": { type: "number", description: "অধ্যায়ের আইডি" },
    "chapter_title": { type: "string", description: "অধ্যায়ের শিরোনাম" },
    "book": { type: "string", description: "হাদিস গ্রন্থের নাম" }
  }
};

export const ApiDocumentation = () => {
  const { toast } = useToast();
  const [selectedBook, setSelectedBook] = useState('bukhari');
  const [selectedEndpoint, setSelectedEndpoint] = useState('0');

  const generatedUrl = useMemo(() => {
    const endpoint = apiInfo.endpoints[parseInt(selectedEndpoint)];
    if (!endpoint) return apiInfo.baseUrl;
    
    const url = endpoint.example.replace('bukhari', selectedBook);
    return `${apiInfo.baseUrl}${url}`;
  }, [selectedBook, selectedEndpoint]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'কপি সম্পন্ন!',
      description: 'API URL ক্লিপবোর্ডে কপি হয়েছে।',
    });
  };

  const openInNewTab = (url: string) => {
    window.open(url, '_blank');
  };

  const getCodeExamples = (url: string) => ({
    javascript: `fetch('${url}')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`,
    python: `import requests

try:
    response = requests.get('${url}')
    response.raise_for_status()
    data = response.json()
    print(data)
except requests.exceptions.RequestException as e:
    print(f"An error occurred: {e}")`,
    curl: `curl "${url}"`,
  });

  const codeExamples = getCodeExamples(generatedUrl);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold font-bengali">হাদিস API ডকুমেন্টেশন</h1>
          <p className="text-lg text-muted-foreground font-bengali">
            বাংলা হাদিস অ্যাক্সেস করার জন্য RESTful API এবং CDN সেবা
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <a href={apiInfo.githubRepo} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="font-bengali">
                <Code className="h-4 w-4 mr-2" />
                GitHub Repository
              </Button>
            </a>
          </div>
        </div>

        {/* Quick Start */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="font-bengali flex items-center">
                <Zap className="h-5 w-5 mr-2" />
                API দ্রুত শুরু
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2 font-bengali">বেস URL:</h3>
                <code className="bg-muted px-3 py-1 rounded text-sm">{apiInfo.baseUrl}</code>
              </div>
              <div>
                <h3 className="font-semibold mb-2 font-bengali">উদাহরণ রিকোয়েস্ট:</h3>
                <pre className="bg-muted p-3 rounded overflow-x-auto text-sm">
                  <code>GET {apiInfo.baseUrl}/random</code>
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-bengali flex items-center">
                <Database className="h-5 w-5 mr-2" />
                CDN দ্রুত শুরু
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2 font-bengali">CDN বেস URL:</h3>
                <code className="bg-muted px-3 py-1 rounded text-sm block break-all">
                  {apiInfo.cdnBaseUrl}
                </code>
              </div>
              <div>
                <h3 className="font-semibold mb-2 font-bengali">উদাহরণ রিকোয়েস্ট:</h3>
                <pre className="bg-muted p-3 rounded overflow-x-auto text-sm">
                  <code>GET {apiInfo.cdnBaseUrl}/Bukhari/Chapter/1.json</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* API Endpoint Builder */}
        <Card>
          <CardHeader>
            <CardTitle className="font-bengali">API এন্ডপয়েন্ট বিল্ডার</CardTitle>
            <CardDescription className="font-bengali">
              আপনার প্রয়োজন অনুযায়ী API URL তৈরি করুন
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="book-select" className="font-bengali">বই নির্বাচন করুন:</Label>
                <Select value={selectedBook} onValueChange={setSelectedBook}>
                  <SelectTrigger id="book-select">
                    <SelectValue placeholder="একটি বই নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    {apiInfo.books.map((book) => (
                      <SelectItem key={book.value} value={book.value}>
                        <div className="flex flex-col">
                          <span className="font-bengali">{book.label}</span>
                          <span className="text-xs text-muted-foreground">{book.labelEn} • Path: {book.path}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="endpoint-select" className="font-bengali">এন্ডপয়েন্ট নির্বাচন করুন:</Label>
                <Select value={selectedEndpoint} onValueChange={setSelectedEndpoint}>
                  <SelectTrigger id="endpoint-select">
                    <SelectValue placeholder="একটি এন্ডপয়েন্ট নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    {apiInfo.endpoints.map((endpoint, index) => (
                      <SelectItem key={index} value={index.toString()}>
                        <div className="flex flex-col">
                          <span>{endpoint.name}</span>
                          <span className="text-xs text-muted-foreground font-bengali">{endpoint.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {selectedEndpoint && (
              <div className="space-y-4">
                <div>
                  <Label className="font-bengali">তৈরি করা URL:</Label>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 mt-1">
                    <code className="flex-1 bg-muted p-3 rounded text-sm overflow-x-auto w-full">
                      {generatedUrl}
                    </code>
                    <div className="flex space-x-2 w-full sm:w-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(generatedUrl)}
                        className="font-bengali flex-1 sm:flex-initial"
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        কপি
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openInNewTab(generatedUrl)}
                        className="font-bengali flex-1 sm:flex-initial"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        টেস্ট
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Code Examples */}
                <div className="space-y-4">
                  <Label className="font-bengali">কোড উদাহরণ:</Label>
                  <Tabs defaultValue="javascript" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                      <TabsTrigger value="python">Python</TabsTrigger>
                      <TabsTrigger value="curl">cURL</TabsTrigger>
                    </TabsList>
                    <TabsContent value="javascript">
                      <pre className="bg-muted p-4 rounded text-sm overflow-x-auto">
                        <code>{codeExamples.javascript}</code>
                      </pre>
                    </TabsContent>
                    <TabsContent value="python">
                      <pre className="bg-muted p-4 rounded text-sm overflow-x-auto">
                        <code>{codeExamples.python}</code>
                      </pre>
                    </TabsContent>
                    <TabsContent value="curl">
                      <pre className="bg-muted p-4 rounded text-sm overflow-x-auto">
                        <code>{codeExamples.curl}</code>
                      </pre>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* API Endpoints */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="font-bengali flex items-center">
                <Zap className="h-5 w-5 mr-2" />
                API এন্ডপয়েন্টসমূহ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {apiInfo.endpoints.map((endpoint, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <h3 className="font-semibold text-lg mb-2">{endpoint.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2 font-bengali">
                      {endpoint.description}
                    </p>
                    <p className="text-sm text-muted-foreground mb-2">
                      <strong>Path:</strong> <code className="bg-muted px-1 rounded">{endpoint.path}</code>
                    </p>
                    <p className="text-sm text-muted-foreground mb-2">
                      <strong>Parameters:</strong> {endpoint.params.join(", ")}
                    </p>
                    <p className="text-sm">
                      <strong>Example:</strong> 
                      <code className="ml-2 bg-muted px-2 py-1 rounded text-xs break-all">
                        {apiInfo.baseUrl}{endpoint.example}
                      </code>
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-bengali flex items-center">
                <Database className="h-5 w-5 mr-2" />
                CDN এন্ডপয়েন্টসমূহ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {apiInfo.cdnEndpoints.map((endpoint, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <h3 className="font-semibold text-lg mb-2">{endpoint.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2 font-bengali">
                      {endpoint.description}
                    </p>
                    <p className="text-sm text-muted-foreground mb-2">
                      <strong>Path:</strong> <code className="bg-muted px-1 rounded">{endpoint.path}</code>
                    </p>
                    <p className="text-sm">
                      <strong>Example:</strong> 
                      <code className="ml-2 bg-muted px-2 py-1 rounded text-xs break-all">
                        {apiInfo.cdnBaseUrl}{endpoint.example}
                      </code>
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 w-full font-bengali"
                      onClick={() => openInNewTab(`${apiInfo.cdnBaseUrl}${endpoint.example}`)}
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      CDN টেস্ট করুন
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Response Schema */}
        <Card>
          <CardHeader>
            <CardTitle className="font-bengali">রেসপন্স স্কিমা</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-border text-sm">
                <thead>
                  <tr className="bg-muted">
                    <th className="border border-border p-3 text-left font-bengali">ফিল্ড</th>
                    <th className="border border-border p-3 text-left font-bengali">টাইপ</th>
                    <th className="border border-border p-3 text-left font-bengali">বর্ণনা</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(apiInfo.responseSchema).map(([field, info]) => (
                    <tr key={field} className="hover:bg-muted/50">
                      <td className="border border-border p-3 font-mono text-sm">{field}</td>
                      <td className="border border-border p-3 text-sm">{info.type}</td>
                      <td className="border border-border p-3 font-bengali text-sm">{info.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* General Information */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="font-bengali flex items-center">
                <Info className="h-5 w-5 mr-2" />
                API তথ্য
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h3 className="font-semibold mb-1 font-bengali">রেট লিমিট:</h3>
                <p className="text-sm text-muted-foreground font-bengali">
                  প্রতি মিনিটে ১০০টি রিকোয়েস্ট
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-1 font-bengali">অথেন্টিকেশন:</h3>
                <p className="text-sm text-muted-foreground font-bengali">
                  বর্তমানে প্রয়োজন নেই
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-1 font-bengali">CORS:</h3>
                <p className="text-sm text-muted-foreground font-bengali">
                  সকল ডোমেইনের জন্য সক্রিয়
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-bengali flex items-center">
                <Database className="h-5 w-5 mr-2" />
                ডেটা সোর্স
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h3 className="font-semibold mb-1 font-bengali">GitHub:</h3>
                <p className="text-sm text-muted-foreground">
                  md-rifatkhan/hadithbangla
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-1 font-bengali">CDN:</h3>
                <p className="text-sm text-muted-foreground">
                  jsDelivr CDN
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-1 font-bengali">আপডেট:</h3>
                <p className="text-sm text-muted-foreground font-bengali">
                  নিয়মিত আপডেট হয়
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-bengali flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                সাপোর্ট করা বই
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {apiInfo.books.map((book) => (
                  <div key={book.value} className="text-sm">
                    <span className="font-medium font-bengali">{book.label}</span>
                    <span className="text-muted-foreground ml-2">({book.path})</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};