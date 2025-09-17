import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Settings } from 'lucide-react';
import { useSettings } from '@/hooks/useSettings';

export const SettingsDialog = () => {
  const { settings, updateSettings } = useSettings();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="transition-smooth">
          <Settings className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-bengali">সেটিংস</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Font Size */}
          <div className="space-y-2">
            <Label className="font-bengali text-sm font-medium">ফন্ট সাইজ</Label>
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

          {/* Arabic Text */}
          <div className="flex items-center justify-between">
            <Label className="font-bengali text-sm font-medium">আরবি টেক্সট দেখান</Label>
            <Switch
              checked={settings.arabicText}
              onCheckedChange={(checked) => updateSettings({ arabicText: checked })}
            />
          </div>

          {/* Auto Read */}
          <div className="flex items-center justify-between">
            <Label className="font-bengali text-sm font-medium">স্বয়ংক্রিয় পড়া</Label>
            <Switch
              checked={settings.autoRead}
              onCheckedChange={(checked) => updateSettings({ autoRead: checked })}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};