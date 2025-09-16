import fs from 'fs/promises';
import path from 'path';
import FlexSearch from 'flexsearch';

const hadithBooks = [
  { name: 'Sahih Bukhari', slug: 'Bukhari', totalHadith: 7563 },
  { name: 'Sahih Muslim', slug: 'Muslim', totalHadith: 7563 },
  { name: 'Sunan Abu Dawood', slug: 'AbuDaud', totalHadith: 5274 },
  { name: 'Sunan Ibn Majah', slug: 'Ibne-Mazah', totalHadith: 4341 },
  { name: 'Sunan An-Nasa\'i', slug: 'Al-Nasai', totalHadith: 5758 },
  { name: 'Sunan At-Tirmidhi', slug: 'At-tirmizi', totalHadith: 3956 },
];

const publicDir = path.resolve(process.cwd(), 'public', 'search-index');

async function buildSearchIndex() {
  console.log('Starting search index build...');

  // Create the FlexSearch index
  const index = new FlexSearch.Document({
    document: {
      id: 'id',
      index: ['bn', 'narrator', 'chapter_title'],
      store: ['bookSlug', 'hadithId', 'bn_short'],
    },
    tokenize: 'forward',
    language: 'bn', // Assuming Bengali language support; may need custom tokenizer
  });

  // Ensure the output directory exists
  await fs.mkdir(publicDir, { recursive: true });

  let totalIndexed = 0;
  for (const book of hadithBooks) {
    console.log(`Processing ${book.name}...`);
    for (let i = 1; i <= book.totalHadith; i++) {
      try {
        const url = `https://cdn.jsdelivr.net/gh/md-rifatkhan/hadithbangla@main/${book.slug}/hadith/${i}.json`;
        const response = await fetch(url);
        if (!response.ok) {
          console.warn(`Could not fetch hadith ${book.slug}/${i}. Status: ${response.status}`);
          continue;
        }
        const data = await response.json();
        const hadith = data.hadith;

        if (hadith && hadith.bn) {
          index.add({
            id: `${book.slug}-${hadith.hadith_id}`,
            bookSlug: book.slug,
            hadithId: hadith.hadith_id,
            bn: hadith.bn,
            bn_short: hadith.bn.substring(0, 150), // Store a short version for display
            narrator: hadith.narrator,
            chapter_title: hadith.chapter_title,
          });
          totalIndexed++;
        }
      } catch (error) {
        console.error(`Error processing ${book.slug}/${i}:`, error);
      }

      // Log progress
      if (totalIndexed % 100 === 0 && totalIndexed > 0) {
        console.log(`Indexed ${totalIndexed} hadiths...`);
      }
    }
  }

  console.log(`Total hadiths indexed: ${totalIndexed}`);
  console.log('Exporting index...');

  // Export the index to multiple files for efficient loading
  await new Promise(resolve => {
    let remaining = 0;
    const callback = () => !--remaining && resolve();

    index.export((key, data) => {
      remaining++;
      const filePath = path.join(publicDir, `${key}.json`);
      console.log(`Writing ${filePath}...`);
      fs.writeFile(filePath, JSON.stringify(data), 'utf-8').then(callback);
    });
  });

  console.log('Search index build complete!');
}

buildSearchIndex().catch(console.error);
