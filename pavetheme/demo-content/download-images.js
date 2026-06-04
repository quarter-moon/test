// Pavé — Download demo images from Unsplash
// No dependencies — uses Node.js built-ins only (requires Node 18+)
//
// Usage:
//   node download-images.js
//
// Images are saved to ./images/
// Then upload that folder to Shopify Admin → Content → Files

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, 'images');
const BASE = 'https://images.unsplash.com';

const images = [
  // ── Homepage: Hero ────────────────────────────────────────────
  {
    group: 'Homepage — Hero',
    file: 'hero-ring.jpg',
    url: `${BASE}/photo-1599643478518-a784e5dc4c8f?w=1200&h=1600&fit=crop&auto=format`,
  },

  // ── Homepage: Collection tiles ────────────────────────────────
  {
    group: 'Homepage — Collection tiles',
    file: 'tile-engagement.jpg',
    url: `${BASE}/photo-1605100804763-247f67b3557e?w=1400&h=700&fit=crop&auto=format`,
  },
  {
    file: 'tile-necklaces.jpg',
    url: `${BASE}/photo-1515562141027-7062a566a479?w=800&h=1000&fit=crop&auto=format`,
  },
  {
    file: 'tile-earrings.jpg',
    url: `${BASE}/photo-1535632066927-3f04f35e4c0c?w=800&h=1000&fit=crop&auto=format`,
  },
  {
    file: 'tile-bracelets.jpg',
    url: `${BASE}/photo-1611591437281-460bfbe1220a?w=800&h=1000&fit=crop&auto=format`,
  },

  // ── Homepage: Spotlight ───────────────────────────────────────
  {
    group: 'Homepage — Spotlight',
    file: 'spotlight-riviere.jpg',
    url: `${BASE}/photo-1617038260897-41a1f14a8ca0?w=900&h=900&fit=crop&auto=format`,
  },

  // ── Homepage: Lookbook / Atelier ──────────────────────────────
  {
    group: 'Homepage — Lookbook / Atelier',
    file: 'lookbook-atelier.jpg',
    url: `${BASE}/photo-1589182373726-e4f658ab50f0?w=2000&h=1000&fit=crop&auto=format`,
  },

  // ── Blog featured images ──────────────────────────────────────
  {
    group: 'Blog featured images',
    file: 'blog-pave-setting.jpg',
    url: `${BASE}/photo-1617038260897-41a1f14a8ca0?w=1200&h=628&fit=crop&auto=format`,
  },
  {
    file: 'blog-diamond-guide.jpg',
    url: `${BASE}/photo-1605100804763-247f67b3557e?w=1200&h=628&fit=crop&auto=format`,
  },
  {
    file: 'blog-care-guide.jpg',
    url: `${BASE}/photo-1589128777073-263566ae5e4d?w=1200&h=628&fit=crop&auto=format`,
  },
  {
    file: 'blog-stone-shapes.jpg',
    url: `${BASE}/photo-1573408301408-52188e8f4c8a?w=1200&h=628&fit=crop&auto=format`,
  },
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);

    function get(u) {
      https.get(u, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          // Follow redirect
          get(res.headers.location);
          return;
        }
        if (res.statusCode !== 200) {
          file.destroy();
          fs.unlink(dest, () => {});
          reject(new Error(`HTTP ${res.statusCode} for ${u}`));
          return;
        }
        res.pipe(file);
        file.on('finish', () => file.close(resolve));
        file.on('error', (err) => {
          fs.unlink(dest, () => {});
          reject(err);
        });
      }).on('error', reject);
    }

    get(url);
  });
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });

  console.log('\nPavé — Downloading demo images');
  console.log('================================\n');

  let done = 0;
  let skipped = 0;
  let lastGroup = '';

  for (const img of images) {
    if (img.group && img.group !== lastGroup) {
      console.log(img.group);
      lastGroup = img.group;
    }

    const dest = path.join(OUT, img.file);

    if (fs.existsSync(dest)) {
      console.log(`  ✓ ${img.file} (already downloaded)`);
      skipped++;
      continue;
    }

    process.stdout.write(`  ↓ ${img.file} … `);
    try {
      await download(img.url, dest);
      const kb = Math.round(fs.statSync(dest).size / 1024);
      console.log(`${kb} KB`);
      done++;
    } catch (err) {
      console.log(`FAILED (${err.message})`);
    }
  }

  console.log('\n================================');
  console.log(`Done. ${done} downloaded, ${skipped} already present.`);
  console.log(`\nImages saved to: ${OUT}`);
  console.log('\nNext steps:');
  console.log('  1. Upload everything in images/ to Shopify Admin → Content → Files');
  console.log('  2. Open the theme editor and assign each image — see image-guide.md for the map\n');
}

main();
