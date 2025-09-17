import { useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useSettings } from '@/hooks/useSettings';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTheme } from 'next-themes';

export const SettingsPage = () => {
  const { settings, updateSettings } = useSettings();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    // Sync theme with settings
    updateSettings({ darkMode: theme === 'dark' });
  }, [theme, updateSettings]);

  const handleThemeChange = (checked: boolean) => {
    const newTheme = checked ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gradient-primary font-bengali">সেটিংস</h1>

      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="font-bengali">ডিসপ্লে ও অ্যাক্সেসিবিলিটি</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-4">
          {/* Font Family */}
          <div className="flex items-center justify-between">
            <Label className="font-bengali text-sm font-medium">ফন্ট</Label>
            <div className="w-40">
              <Select
                value={settings.fontFamily}
                onValueChange={(value: string) =>
                  updateSettings({ fontFamily: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Noto Sans Bengali">Noto Sans Bengali</SelectItem>
                  <SelectItem value="Anek Bangla">Anek Bangla</SelectItem>
                  <SelectItem value="Hind Siliguri">Hind Siliguri</SelectItem>
                  <SelectItem value="Baloo Da 2">Baloo Da 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Font Size */}
          <div className="flex items-center justify-between">
            <Label className="font-bengali text-sm font-medium">ফন্ট সাইজ</Label>
            <div className="w-40">
              <Select
                value={settings.fontSize}
                onValueChange={(value: 'small' | 'medium' | 'large') =>
                  updateSettings({ fontSize: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">ছোট</SelectItem>
                  <SelectItem value="medium">মাঝারি</SelectItem>
                  <SelectItem value="large">বড়</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Arabic Text */}
          <div className="flex items-center justify-between">
            <Label className="font-bengali text-sm font-medium">আরবি টেক্সট দেখান</Label>
            <Switch
              checked={settings.arabicText}
              onCheckedChange={(checked) => updateSettings({ arabicText: checked })}
            />
          </div>

          {/* Arabic Font Family */}
          <div className="flex items-center justify-between">
            <Label className="font-bengali text-sm font-medium">আরবি ফন্ট</Label>
            <div className="w-40">
              <Select
                value={settings.arabicFontFamily}
                onValueChange={(value: string) =>
                  updateSettings({ arabicFontFamily: value })
                }
                disabled={!settings.arabicText}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Amiri">Amiri</SelectItem>
                  <SelectItem value="Rubik">Rubik</SelectItem>
                  <SelectItem value="Lateef">Lateef</SelectItem>
                  <SelectItem value="Scheherazade New">Scheherazade New</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

        </CardContent>
      </Card>

      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="font-bengali">থিম</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-4">
          {/* Dark Mode */}
          <div className="flex items-center justify-between">
            <Label className="font-bengali text-sm font-medium">ডার্ক মোড</Label>
            <Switch
              checked={theme === 'dark'}
              onCheckedChange={handleThemeChange}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
