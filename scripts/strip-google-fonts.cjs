/* eslint-disable no-undef */
/**
 * Post-build script to remove Google Fonts @import from CSS.
 * Syncfusion CSS includes Inter font which is render-blocking.
 * We use system fonts instead for better performance.
 */

const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist', 'assets');

// Find all CSS files in dist/assets
const cssFiles = fs.readdirSync(distDir).filter(file => file.endsWith('.css'));

let strippedCount = 0;

for (const cssFile of cssFiles) {
  const filePath = path.join(distDir, cssFile);
  const content = fs.readFileSync(filePath, 'utf-8');

  // Remove @import for Google Fonts
  // Note: URL contains semicolons in font weights (e.g., wght@100;200;300), so match until ";@
  const cleanedContent = content.replace(
    /@import\s*["']https:\/\/fonts\.googleapis\.com[^"']*["'];/gi,
    '/* Google Fonts removed for performance */'
  );

  if (cleanedContent !== content) {
    fs.writeFileSync(filePath, cleanedContent);
    console.log(`Stripped Google Fonts from: ${cssFile}`);
    strippedCount++;
  }
}

console.log(`Processed ${cssFiles.length} CSS files, stripped fonts from ${strippedCount}`);
