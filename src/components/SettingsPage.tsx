import { useSettings } from '@/contexts/SettingsContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Settings as SettingsIcon, Text, Type } from 'lucide-react';

export const SettingsPage = () => {
  const { fontSize, setFontSize, showArabic, toggleShowArabic } = useSettings();

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gradient-primary font-bengali flex items-center justify-center">
          <SettingsIcon className="h-8 w-8 mr-3" />
          সেটিংস
        </h1>
        <p className="text-lg text-muted-foreground">
          অ্যাপ্লিকেশনের বিভিন্ন অপশন পরিবর্তন করুন।
        </p>
      </header>

      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="font-bengali text-gradient-primary">পড়ার সেটিংস</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="arabic-toggle" className="font-bengali text-base">
              আরবি টেক্সট প্রদর্শন করুন
            </Label>
            <Switch
              id="arabic-toggle"
              checked={showArabic}
              onCheckedChange={toggleShowArabic}
            />
          </div>

          <div className="space-y-2">
            <Label className="font-bengali text-base">ফন্টের আকার</Label>
            <ToggleGroup
              type="single"
              value={fontSize}
              onValueChange={(value) => {
                if (value) setFontSize(value as any);
              }}
              className="grid grid-cols-4 gap-2"
            >
              <ToggleGroupItem value="sm" aria-label="Small">
                <Type className="h-4 w-4" />
                <span className="ml-2 font-bengali">ছোট</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="base" aria-label="Normal">
                <Type className="h-5 w-5" />
                <span className="ml-2 font-bengali">সাধারণ</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="lg" aria-label="Large">
                <Type className="h-6 w-6" />
                <span className="ml-2 font-bengali">বড়</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="xl" aria-label="Extra Large">
                <Text className="h-6 w-6" />
                <span className="ml-2 font-bengali">অনেক বড়</span>
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
