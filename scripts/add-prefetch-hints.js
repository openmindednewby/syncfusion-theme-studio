/**
 * Post-build script to optimize Syncfusion chunk loading.
 *
 * This script:
 * 1. REMOVES modulepreload for syncfusion-grid (790KB - too heavy for initial load)
 * 2. Adds prefetch hints for heavy Syncfusion chunks (low priority background load)
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
  'syncfusion-inputs',
  'syncfusion-nav',
  'syncfusion-dropdowns',
  'syncfusion-popups',
  'syncfusion-calendars',
];

// Chunks to REMOVE from modulepreload (too heavy for initial load)
const REMOVE_FROM_MODULEPRELOAD = [
  'syncfusion-grid',
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

  let html = fs.readFileSync(htmlPath, 'utf-8');

  // Step 1: Remove heavy chunks from modulepreload
  for (const chunkName of REMOVE_FROM_MODULEPRELOAD) {
    const regex = new RegExp(
      `\\s*<link[^>]*rel="modulepreload"[^>]*href="[^"]*${chunkName}[^"]*"[^>]*>\\s*`,
      'g'
    );
    const matches = html.match(regex);
    if (matches) {
      html = html.replace(regex, '\n');
      console.log(`Removed modulepreload for: ${chunkName} (${matches.length} occurrence(s))`);
    }
  }

  // Scan assets directory for Syncfusion chunks
  const files = fs.readdirSync(assetsDir);
  const prefetchChunks = files.filter(
    (file) => file.endsWith('.js') && PREFETCH_CHUNKS.some((name) => file.includes(name)),
  );

  if (prefetchChunks.length === 0) {
    console.log('No Syncfusion chunks found to prefetch');
    fs.writeFileSync(htmlPath, html);
    return;
  }

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

  // Add prefetch hints if we have any
  if (prefetchHints.length > 0) {
    // Build the hints block
    const hintsBlock = [
      '',
      '    <!-- Prefetch heavy Syncfusion chunks in background (low priority) -->',
      ...prefetchHints,
    ].join('\n');

    // Insert hints before </head>
    html = html.replace('</head>', `${hintsBlock}\n  </head>`);
    console.log(`Added ${prefetchHints.length} prefetch hints to index.html`);
  } else {
    console.log('No new prefetch hints to add');
  }

  // Always write the modified HTML (modulepreload removal + prefetch hints)
  fs.writeFileSync(htmlPath, html);
}

addPrefetchHints();
