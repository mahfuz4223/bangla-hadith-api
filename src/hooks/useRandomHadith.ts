import { useState, useCallback } from 'react';

const hadithBooks = [
  { slug: 'Bukhari', totalHadith: 7563 },
  { slug: 'Muslim', totalHadith: 7563 },
  { slug: 'AbuDaud', totalHadith: 5274 },
  { slug: 'Ibne-Mazah', totalHadith: 4341 },
  { slug: 'Al-Nasai', totalHadith: 5758 },
  { slug: 'At-tirmizi', totalHadith: 3956 },
];

export const useRandomHadith = () => {
  const [loading, setLoading] = useState(false);

  const getRandomHadith = useCallback(() => {
    setLoading(true);
    
    // Get a random book
    const randomBook = hadithBooks[Math.floor(Math.random() * hadithBooks.length)];
    
    // Get a random hadith number from that book
    const randomHadithId = Math.floor(Math.random() * randomBook.totalHadith) + 1;
    
    setLoading(false);
    
    return {
      bookSlug: randomBook.slug,
      hadithId: randomHadithId,
    };
  }, []);

  return { getRandomHadith, loading };
};