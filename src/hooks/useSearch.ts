import { useState, useEffect, useCallback } from 'react';
import FlexSearch from 'flexsearch';

// Define the structure of the search result document
export interface SearchResult {
  id: string;
  bookSlug: string;
  hadithId: number;
  bn_short: string;
  [key: string]: any; // Index signature for FlexSearch compatibility
}

export const useSearch = () => {
  const [index, setIndex] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadIndex = async () => {
      setLoading(true);
      try {
        const searchIndex = new (FlexSearch as any).Document({
          document: {
            id: 'id',
            index: ['bn', 'narrator', 'chapter_title'],
            store: ['bookSlug', 'hadithId', 'bn_short'],
          },
          tokenize: 'forward',
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

        // Fallback: build index in-browser from a compact data file
        const loadFromDataJson = async () => {
          const response = await fetch('/search-index/data.json');
          if (!response.ok) throw new Error('Fallback data.json not found');
          const contentType = response.headers.get('content-type') || '';
          if (!contentType.includes('application/json')) {
            throw new Error(`Invalid content-type for data.json: ${contentType}`);
          }
          const docs: any[] = await response.json();
          for (const doc of docs) {
            searchIndex.add(doc);
          }
        };

        try {
          await loadFromExportedParts();
        } catch (err) {
          console.warn('Prebuilt index not available, falling back to data.json', err);
          await loadFromDataJson();
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
