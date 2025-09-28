import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseHadithSource = (text: string) => {
  const sourceRegex = /\s*(\([^)]+\)\s*){1,2}$/;
  const match = text.match(sourceRegex);

  if (match) {
    const sourcesRaw = match[0].trim();
    const cleanText = text.replace(sourceRegex, '').trim();

    // Split into individual parenthetical groups
    const sources = sourcesRaw.match(/\([^)]+\)/g) || [];

    return {
      cleanText,
      sources,
    };
  }

  return {
    cleanText: text,
    sources: [],
  };
};

// Convert English numbers to Bangla numbers
export const toBanglaNumber = (number: string | number): string => {
  const englishToBangla: Record<string, string> = {
    '0': '০',
    '1': '১',
    '2': '২',
    '3': '৩',
    '4': '৪',
    '5': '৫',
    '6': '৬',
    '7': '৭',
    '8': '৮',
    '9': '৯'
  };

  return number
    .toString()
    .split('')
    .map(char => englishToBangla[char] || char)
    .join('');
};
