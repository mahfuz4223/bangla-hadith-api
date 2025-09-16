export interface Bookmark {
  bookSlug: string;
  hadithId: number;
}

const BOOKMARKS_KEY = 'hadith_bookmarks';

// Get all bookmarks from localStorage
export const getBookmarks = (): Bookmark[] => {
  try {
    const bookmarksJson = localStorage.getItem(BOOKMARKS_KEY);
    return bookmarksJson ? JSON.parse(bookmarksJson) : [];
  } catch (error) {
    console.error('Error reading bookmarks from localStorage', error);
    return [];
  }
};

// Check if a hadith is bookmarked
export const isBookmarked = (bookSlug: string, hadithId: number): boolean => {
  const bookmarks = getBookmarks();
  return bookmarks.some(
    (bookmark) => bookmark.bookSlug === bookSlug && bookmark.hadithId === hadithId
  );
};

// Add a bookmark to localStorage
export const addBookmark = (bookSlug: string, hadithId: number): void => {
  if (isBookmarked(bookSlug, hadithId)) return; // Already bookmarked

  const bookmarks = getBookmarks();
  const newBookmarks = [...bookmarks, { bookSlug, hadithId }];
  try {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(newBookmarks));
  } catch (error) {
    console.error('Error saving bookmark to localStorage', error);
  }
};

// Remove a bookmark from localStorage
export const removeBookmark = (bookSlug: string, hadithId: number): void => {
  const bookmarks = getBookmarks();
  const newBookmarks = bookmarks.filter(
    (bookmark) => !(bookmark.bookSlug === bookSlug && bookmark.hadithId === hadithId)
  );
  try {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(newBookmarks));
  } catch (error) {
    console.error('Error removing bookmark from localStorage', error);
  }
};
