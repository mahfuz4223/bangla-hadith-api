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
