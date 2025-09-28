import { useState, useEffect, useCallback } from 'react';
import FlexSearch from 'flexsearch';

// Define the structure of the hadith document based on actual API
export interface Hadith {
  hadith_id: number;
  narrator: string;
  bn: string;
  ar: string;
  grade_id: number;
  grade: string;
  grade_color: string;
  note?: string;
}

// Define the structure of the search result document
export interface SearchResult {
  id: string;
  doc: {
    bookSlug: string;
    bookName: string;
    chapterId: number;
    hadithId: number;
    narrator: string;
    bn: string;
    bn_short: string;
    ar?: string;
    grade: string;
    grade_color: string;
  };
}

// Types for hadith data structure
interface HadithData {
  id: string;
  bookSlug: string;
  bookName: string;
  chapterId: number;
  hadithId: number;
  narrator: string;
  bn: string;
  bn_short: string;
  ar: string;
  grade: string;
  grade_color: string;
}

// Type for FlexSearch Document (simplified to avoid complex typing issues)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FlexSearchDocument = any;

// Cache for loaded hadith data
let searchDataCache: HadithData[] | null = null;

// Helper function to load hadith data for search indexing with caching and lazy loading
const loadHadithData = async (searchIndex: FlexSearchDocument) => {
  // Use cached data if available
  if (searchDataCache) {
    searchDataCache.forEach(doc => searchIndex.add(doc));
    return;
  }

  const books = [
    { slug: 'bukhari', name: 'সহীহ বুখারী', path: 'Bukhari' },
    { slug: 'muslim', name: 'সহীহ মুসলিম', path: 'Muslim' },
    { slug: 'abu-dawood', name: 'সুনান আবু দাউদ', path: 'AbuDaud' },
    { slug: 'ibn-majah', name: 'সুনান ইবনে মাজাহ', path: 'Ibne-Mazah' },
    { slug: 'nasai', name: 'সুনান নাসাঈ', path: 'Al-Nasai' },
    { slug: 'tirmidhi', name: 'সুনান তিরমিযী', path: 'At-tirmizi' }
  ];

  const docsToCache: HadithData[] = [];
  let totalLoaded = 0;
  const maxHadiths = 500; // Limit total hadiths to prevent memory issues

  // Load more comprehensive data but with limits
  for (const book of books.slice(0, 3)) { // Load first 3 books
    try {
      for (let chapterId = 1; chapterId <= 5 && totalLoaded < maxHadiths; chapterId++) {
        const response = await fetch(
          `https://cdn.jsdelivr.net/gh/md-rifatkhan/hadithbangla@main/${book.path}/Chapter/${chapterId}.json`,
          { 
            cache: 'force-cache', // Enable HTTP caching
            headers: {
              'Accept': 'application/json',
            }
          }
        );
        
        if (response.ok) {
          const hadiths: Hadith[] = await response.json();
          
          if (Array.isArray(hadiths)) {
            // Process in batches to prevent blocking
            const batchSize = 10;
            for (let i = 0; i < hadiths.length && totalLoaded < maxHadiths; i += batchSize) {
              const batch = hadiths.slice(i, i + batchSize);
              
              batch.forEach((hadith) => {
                if (hadith.hadith_id && hadith.bn && totalLoaded < maxHadiths) {
                  const doc = {
                    id: `${book.slug}-${chapterId}-${hadith.hadith_id}`,
                    bookSlug: book.slug,
                    bookName: book.name,
                    chapterId,
                    hadithId: hadith.hadith_id,
                    narrator: hadith.narrator || '',
                    bn: hadith.bn,
                    bn_short: hadith.bn.substring(0, 200) + (hadith.bn.length > 200 ? '...' : ''),
                    ar: hadith.ar || '',
                    grade: hadith.grade || '',
                    grade_color: hadith.grade_color || '#46B891'
                  };
                  
                  searchIndex.add(doc);
                  docsToCache.push(doc);
                  totalLoaded++;
                }
              });
              
              // Yield control to prevent blocking UI
              if (i % (batchSize * 5) === 0) {
                await new Promise(resolve => setTimeout(resolve, 10));
              }
            }
          }
        }
      }
    } catch (error) {
      console.warn(`Failed to load search data for ${book.name}:`, error);
    }
  }
  
  // Cache the loaded data
  searchDataCache = docsToCache;
  console.log(`Search index loaded with ${totalLoaded} hadiths`);
};

export const useSearch = () => {
  const [index, setIndex] = useState<FlexSearchDocument | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadIndex = async () => {
      setLoading(true);
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const searchIndex = new (FlexSearch as any).Document({
          document: {
            id: 'id',
            index: [
              { field: 'bn', tokenize: 'forward', context: true },
              { field: 'ar', tokenize: 'forward' },
              { field: 'narrator', tokenize: 'forward' },
              { field: 'grade' },
              'bookName'
            ],
            store: ['bookSlug', 'bookName', 'chapterId', 'hadithId', 'narrator', 'bn', 'bn_short', 'ar', 'grade', 'grade_color'],
          },
          tokenize: 'forward',
          context: {
            resolution: 3,
            depth: 2
          }
        });

        // Try loading pre-exported parts first
        const loadFromExportedParts = async () => {
          const indexParts = ['reg', 'cfg', 'map', 'ctx'];
          for (const part of indexParts) {
            const response = await fetch(`/search-index/${part}.json`);
            if (!response.ok) throw new Error(`Failed to load search index part: ${part}`);
            const contentType = response.headers.get('content-type') || '';
            if (!contentType.includes('application/json')) {
              throw new Error(`Invalid content-type for ${part}.json: ${contentType}`);
            }
            const data = await response.json();
            searchIndex.import(part, data);
          }
        };

        try {
          await loadFromExportedParts();
        } catch (err) {
          console.warn('Prebuilt index not available, loading hadith data for search...', err);
          await loadHadithData(searchIndex);
        }

        setIndex(searchIndex);
        setError(null);
      } catch (e) {
        console.error('Failed to load search index:', e);
        setError('Search is currently unavailable.');
      } finally {
        setLoading(false);
      }
    };

    loadIndex();
  }, []);

  const search = useCallback(
    (query: string, options?: { book?: string; narrator?: string; grade?: string }): SearchResult[] => {
      if (!index || !query) {
        return [];
      }
      
      try {
        // FlexSearch returns results for each field. We need to flatten and deduplicate.
        const results = index.search(query, { enrich: true, limit: 50 });
        const uniqueIds = new Set<string>();
        const uniqueResults: SearchResult[] = [];

        // Handle the results properly - FlexSearch returns an array of result sets
        if (Array.isArray(results)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          results.forEach((resultSet: any) => {
            if (resultSet && Array.isArray(resultSet.result)) {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              resultSet.result.forEach((item: any) => {
                const doc = item.doc || item;
                const id = item.id || doc.id;
                
                if (!uniqueIds.has(id) && doc) {
                  uniqueIds.add(id);
                  
                  // Apply optional filters
                  if (options?.book && options.book !== 'all' && doc.bookSlug !== options.book) return;
                  if (options?.narrator && !doc.narrator?.toLowerCase().includes(options.narrator.toLowerCase())) return;
                  if (options?.grade && options.grade !== 'all' && doc.grade !== options.grade) return;
                  
                  uniqueResults.push({
                    id,
                    doc: {
                      bookSlug: doc.bookSlug || doc.book || '',
                      bookName: doc.bookName || '',
                      chapterId: doc.chapterId || doc.chapter_id || 1,
                      hadithId: doc.hadithId || doc.hadith_id || 0,
                      narrator: doc.narrator || '',
                      bn: doc.bn || '',
                      bn_short: doc.bn_short || doc.bn?.substring(0, 100) || '',
                      ar: doc.ar || '',
                      grade: doc.grade || '',
                      grade_color: doc.grade_color || '#46B891'
                    }
                  });
                }
              });
            }
          });
        }

        return uniqueResults.slice(0, 20); // Limit results for performance
      } catch (error) {
        console.error('Search error:', error);
        return [];
      }
    },
    [index]
  );

  return { search, loading, error };
};
