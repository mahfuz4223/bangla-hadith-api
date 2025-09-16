import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Copy, ExternalLink, Code, Database, ShieldCheck, Zap, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const apiInfo = {
  baseUrl: "https://cdn.jsdelivr.net/gh/md-rifatkhan/hadithbangla@main",
  books: [
    { name: 'Sahih Bukhari', slug: 'Bukhari' },
    { name: 'Sahih Muslim', slug: 'Muslim' },
    { name: 'Sunan Abu Dawood', slug: 'AbuDaud' },
    { name: 'Sunan Ibn Majah', slug: 'Ibne-Mazah' },
    { name: 'Sunan An-Nasa\'i', slug: 'Al-Nasai' },
    { name: 'Sunan At-Tirmidhi', slug: 'At-tirmizi' },
  ],
  endpoints: [
    {
      type: 'Chapter',
      description: 'Get chapter details.',
      path: '/{bookSlug}/Chapter/{chapter_id}.json',
      param: '{chapter_id}',
    },
    {
      type: 'Hadith',
      description: 'Get a specific hadith.',
      path: '/{bookSlug}/hadith/{hadith_id}.json',
      param: '{hadith_id}',
    },
  ],
  responseSchema: [
    { field: 'hadith_id', type: 'number', description: 'The unique ID of the hadith.' },
    { field: 'narrator', type: 'string', description: 'The narrator of the hadith.' },
    { field: 'bn', type: 'string', description: 'The hadith text in Bengali.' },
    { field: 'ar', type: 'string', description: 'The hadith text in Arabic.' },
    { field: 'chapter_id', type: 'number', description: 'The ID of the chapter.' },
    { field: 'chapter_title', type: 'string', description: 'The title of the chapter.' },
  ]
};

export const ApiDocumentation = () => {
  const { toast } = useToast();
  const [selectedBook, setSelectedBook] = useState(apiInfo.books[0].slug);
  const [selectedEndpoint, setSelectedEndpoint] = useState(apiInfo.endpoints[1].type);

  const currentEndpoint = apiInfo.endpoints.find(e => e.type === selectedEndpoint)!;

  const generatedUrl = useMemo(() => {
    const path = currentEndpoint.path
      .replace('{bookSlug}', selectedBook)
      .replace(currentEndpoint.param, '1');
    return `${apiInfo.baseUrl}${path}`;
  }, [selectedBook, selectedEndpoint, currentEndpoint]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied to clipboard!',
      description: 'The API URL is now in your clipboard.',
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
    response.raise_for_status()  # Raises an HTTPError for bad responses (4xx or 5xx)
    data = response.json()
    print(data)
except requests.exceptions.RequestException as e:
    print(f"An error occurred: {e}")`,
    curl: `curl "${url}"`,
  });

  const codeExamples = getCodeExamples(generatedUrl);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-12">
      {/* Header */}
      <header className="text-center space-y-4">
        <Badge variant="secondary" className="bg-gradient-gold text-accent-foreground">
          <Database className="h-4 w-4 mr-2" />
          Developer API
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold text-gradient-primary font-bengali">
          হাদিস বাংলা API
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Access a comprehensive collection of Hadith in Bengali through our simple and free JSON API.
        </p>
      </header>

      {/* Quick Start & Important Notice */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center text-gradient-primary">
              <Zap className="h-5 w-5 mr-2" /> Quick Start
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground">
            <p>Get started in minutes:</p>
            <ol className="list-decimal list-inside space-y-2">
              <li>Select an endpoint type (e.g., Hadith).</li>
              <li>Choose a Hadith book from the dropdown.</li>
              <li>Copy the generated URL.</li>
              <li>Use it in your project with any HTTP client.</li>
            </ol>
          </CardContent>
        </Card>
        <Card className="border-amber-500/50 bg-amber-50/50 dark:bg-amber-950/20">
          <CardHeader>
            <CardTitle className="flex items-center text-amber-600 dark:text-amber-400">
              <Info className="h-5 w-5 mr-2" /> Important Notice
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-amber-800 dark:text-amber-300">
            <p>
              Please use our API endpoints instead of directly accessing the raw GitHub files.
              This ensures you benefit from better performance, stability, and proper caching.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* API Endpoint Builder */}
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="text-gradient-primary">API Endpoint Builder</CardTitle>
          <p className="text-muted-foreground">
            Select an endpoint and book to generate a sample URL and code snippets.
          </p>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-8">
          {/* Left Side: Controls */}
          <div className="space-y-6">
            <div>
              <label className="font-medium">Endpoint Type</label>
              <Select value={selectedEndpoint} onValueChange={setSelectedEndpoint}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {apiInfo.endpoints.map(ep => (
                    <SelectItem key={ep.type} value={ep.type}>{ep.type} - <span className="text-muted-foreground text-sm ml-2">{ep.description}</span></SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="font-medium">Hadith Book</label>
              <Select value={selectedBook} onValueChange={setSelectedBook}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {apiInfo.books.map(book => (
                    <SelectItem key={book.slug} value={book.slug}>{book.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="font-medium">Generated API URL</label>
              <div className="flex items-center gap-2 mt-1">
                <code className="text-sm bg-muted p-2 rounded-md block w-full font-mono break-all">
                  {generatedUrl}
                </code>
                <Button size="sm" variant="outline" onClick={() => copyToClipboard(generatedUrl)}><Copy className="h-4 w-4" /></Button>
                <Button size="sm" variant="outline" onClick={() => openInNewTab(generatedUrl)}><ExternalLink className="h-4 w-4" /></Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Replace <code>{currentEndpoint.param}</code> with a valid ID.
              </p>
            </div>
          </div>

          {/* Right Side: Code Examples */}
          <div className="space-y-4">
            <h3 className="font-medium">Code Examples</h3>
            <Tabs defaultValue="javascript" className="w-full">
              <TabsList>
                <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                <TabsTrigger value="python">Python</TabsTrigger>
                <TabsTrigger value="curl">cURL</TabsTrigger>
              </TabsList>
              <TabsContent value="javascript">
                <pre className="bg-muted rounded-md p-4 text-sm overflow-x-auto"><code>{codeExamples.javascript}</code></pre>
              </TabsContent>
              <TabsContent value="python">
                <pre className="bg-muted rounded-md p-4 text-sm overflow-x-auto"><code>{codeExamples.python}</code></pre>
              </TabsContent>
              <TabsContent value="curl">
                <pre className="bg-muted rounded-md p-4 text-sm overflow-x-auto"><code>{codeExamples.curl}</code></pre>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Response Schema */}
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="text-gradient-primary">Response Schema</CardTitle>
          <p className="text-muted-foreground">The API returns a JSON object with the following structure.</p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="p-2 font-medium">Field</th>
                  <th className="p-2 font-medium">Type</th>
                  <th className="p-2 font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                {apiInfo.responseSchema.map(field => (
                  <tr key={field.field} className="border-b">
                    <td className="p-2 font-mono text-primary">{field.field}</td>
                    <td className="p-2 font-mono text-amber-600">{field.type}</td>
                    <td className="p-2 text-muted-foreground">{field.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* General Info */}
      <div className="grid md:grid-cols-3 gap-8 text-center">
        <div className="space-y-2">
          <ShieldCheck className="h-8 w-8 mx-auto text-green-500" />
          <h3 className="font-semibold">Free & Open</h3>
          <p className="text-muted-foreground text-sm">No authentication required. Completely free to use.</p>
        </div>
        <div className="space-y-2">
          <Zap className="h-8 w-8 mx-auto text-blue-500" />
          <h3 className="font-semibold">Rate Limiting</h3>
          <p className="text-muted-foreground text-sm">A soft limit of 100 requests/minute is in place.</p>
        </div>
        <div className="space-y-2">
          <Code className="h-8 w-8 mx-auto text-purple-500" />
          <h3 className="font-semibold">JSON Format</h3>
          <p className="text-muted-foreground text-sm">All data is returned in a clean JSON format.</p>
        </div>
      </div>
    </div>
  );
};