import { useState, useEffect, useCallback } from 'react';

export interface AppSettings {
  fontSize: 'small' | 'medium' | 'large';
  fontFamily: string;
  arabicFontFamily: string;
  arabicText: boolean;
  darkMode: boolean;
  autoRead: boolean;
}

const DEFAULT_SETTINGS: AppSettings = {
  fontSize: 'medium',
  fontFamily: 'Noto Sans Bengali',
  arabicFontFamily: 'Amiri',
  arabicText: false,
  darkMode: false,
  autoRead: false,
};

const SETTINGS_KEY = 'hadith_app_settings';

export const useSettings = () => {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_KEY);
      if (saved) {
        setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(saved) });
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  }, []);

  const updateSettings = useCallback((newSettings: Partial<AppSettings>) => {
    setSettings(prevSettings => {
      const updated = { ...prevSettings, ...newSettings };
      try {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
      } catch (error) {
        console.error('Error saving settings:', error);
      }
      return updated;
    });
  }, []);

  return { settings, updateSettings };
};