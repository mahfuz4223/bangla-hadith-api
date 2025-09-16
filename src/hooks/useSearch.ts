import { useState, useEffect, useCallback } from 'react';
import FlexSearch from 'flexsearch';

// Define the structure of the search result document
export interface SearchResult {
  id: string;
  bookSlug: string;
  hadithId: number;
  bn_short: string;
}

export const useSearch = () => {
  const [index, setIndex] = useState<FlexSearch.Document<SearchResult, true> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadIndex = async () => {
      try {
        setLoading(true);
        const searchIndex = new FlexSearch.Document<SearchResult, true>({
          document: {
            id: 'id',
            index: ['bn', 'narrator', 'chapter_title'],
            store: ['bookSlug', 'hadithId', 'bn_short'],
          },
          tokenize: 'forward',
        });

        // The index is exported into multiple files. We need to fetch them all.
        const indexParts = ['reg', 'cfg', 'map', 'ctx'];
        for (const part of indexParts) {
          const response = await fetch(`/search-index/${part}.json`);
          if (!response.ok) {
            throw new Error(`Failed to load search index part: ${part}`);
          }
          const data = await response.json();
          searchIndex.import(part, data);
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
    (query: string): SearchResult[] => {
      if (!index || !query) {
        return [];
      }
      // FlexSearch returns results for each field. We need to flatten and deduplicate.
      const results = index.search(query, { enrich: true });
      const uniqueIds = new Set<string>();
      const uniqueResults: SearchResult[] = [];

      results.forEach(resultSet => {
        resultSet.result.forEach((doc: SearchResult) => {
          if (!uniqueIds.has(doc.id)) {
            uniqueIds.add(doc.id);
            uniqueResults.push(doc);
          }
        });
      });

      return uniqueResults;
    },
    [index]
  );

  return { search, loading, error };
};
