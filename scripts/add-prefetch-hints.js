 
/**
 * Post-build script to add prefetch hints for heavy Syncfusion chunks.
 * Run this after vite build to inject resource hints into index.html.
 *
 * Usage: node scripts/add-prefetch-hints.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.resolve(ROOT_DIR, 'dist');

// Heavy chunks that should be prefetched (loaded in background with low priority)
const PREFETCH_CHUNKS = [
  'syncfusion-grid',
  'syncfusion-inputs',
  'syncfusion-nav',
  'syncfusion-dropdowns',
  'syncfusion-popups',
  'syncfusion-calendars',
];

function addPrefetchHints() {
  const assetsDir = path.resolve(DIST_DIR, 'assets');
  const htmlPath = path.resolve(DIST_DIR, 'index.html');

  if (!fs.existsSync(htmlPath)) {
    console.log('No dist/index.html found, skipping prefetch hints');
    return;
  }

  if (!fs.existsSync(assetsDir)) {
    console.log('No dist/assets found, skipping prefetch hints');
    return;
  }

  // Scan assets directory for Syncfusion chunks
  const files = fs.readdirSync(assetsDir);
  const prefetchChunks = files.filter(
    (file) => file.endsWith('.js') && PREFETCH_CHUNKS.some((name) => file.includes(name)),
  );

  if (prefetchChunks.length === 0) {
    console.log('No Syncfusion chunks found to prefetch');
    return;
  }

  let html = fs.readFileSync(htmlPath, 'utf-8');
  const prefetchHints = [];

  for (const fileName of prefetchChunks) {
    const fullPath = `assets/${fileName}`;
    // Skip if already has modulepreload (Vite adds these for directly imported chunks)
    const alreadyHasHint = html.includes(`href="/${fullPath}"`);

    if (!alreadyHasHint) {
      prefetchHints.push(`    <link rel="prefetch" href="/${fullPath}" as="script" />`);
      console.log(`Adding prefetch hint for: ${fileName}`);
    } else {
      console.log(`Skipping ${fileName} (already has modulepreload)`);
    }
  }

  // Only add hints if we have any
  if (prefetchHints.length === 0) {
    console.log('No new prefetch hints to add');
    return;
  }

  // Build the hints block
  const hintsBlock = [
    '',
    '    <!-- Prefetch heavy Syncfusion chunks in background (low priority) -->',
    ...prefetchHints,
  ].join('\n');

  // Insert hints before </head>
  html = html.replace('</head>', `${hintsBlock}\n  </head>`);
  fs.writeFileSync(htmlPath, html);

  console.log(`Added ${prefetchHints.length} prefetch hints to index.html`);
}

addPrefetchHints();
