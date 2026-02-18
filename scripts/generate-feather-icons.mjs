/**
 * Generates React TSX icon components from the feather-icons package.
 *
 * Each generated file follows the project's icon component pattern:
 * - Imports IconProps from ./types
 * - Defines a local `defaults` object with standard SVG attributes
 * - Exports named components with `Icon` prefix in PascalCase
 *
 * Files are split alphabetically to stay under the 200 code-line ESLint limit
 * (skipBlankLines + skipComments). Props within SVG elements are sorted
 * alphabetically to satisfy react/jsx-sort-props.
 *
 * Icons that already exist in AppIcons.tsx are skipped to avoid duplicates.
 *
 * Usage: node scripts/generate-feather-icons.mjs
 */

import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, '..');
const ICONS_DIR = join(PROJECT_ROOT, 'src', 'components', 'icons');

// Dynamically require feather-icons (CJS package)
const { createRequire } = await import('module');
const require = createRequire(import.meta.url);
const feather = require('feather-icons');

// ---------------------------------------------------------------------------
// Icons to skip because they already exist in existing icon files.
// These are the feather icon names (kebab-case) that have hand-coded
// equivalents in AppIcons.tsx or other existing files.
// ---------------------------------------------------------------------------
const SKIP_ICONS = new Set([
  'activity',
  'bar-chart',
  'bell',
  'chevron-left',
  'download',
  'filter',
  'folder',
  'globe',
  'key',
  'layout',
  'message-square',
  'more-vertical',
  'palette',
  'pie-chart',
  'search',
  'settings',
  'user',
  'zap',
]);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Convert kebab-case feather name to PascalCase with Icon prefix. */
function toPascalCase(kebab) {
  return (
    'Icon' +
    kebab
      .split('-')
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join('')
  );
}

/**
 * Sort attributes within an SVG element tag alphabetically.
 * E.g., <line y1="5" x1="12"> becomes <line x1="12" y1="5">
 */
function sortElementProps(tag) {
  // Match: <tagName attr1="val1" attr2="val2" ... />
  const match = tag.match(/^<(\w+)\s+(.*?)\s*\/>$/s);
  if (!match) return tag;

  const [, tagName, attrString] = match;
  // Parse attributes: name="value" pairs
  const attrs = [];
  const attrRegex = /(\w[\w-]*)="([^"]*)"/g;
  let m;
  while ((m = attrRegex.exec(attrString)) !== null) {
    attrs.push({ name: m[1], value: m[2] });
  }
  // Sort alphabetically by attribute name (case-insensitive)
  attrs.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));
  const sorted = attrs.map((a) => `${a.name}="${a.value}"`).join(' ');
  return `<${tagName} ${sorted} />`;
}

/**
 * Convert feather SVG inner HTML to valid JSX with sorted props.
 *
 * Feather outputs HTML-style tags like <line x1="1" ...></line>.
 * We need JSX self-closing tags and camelCase attributes.
 */
function toJsx(html) {
  let jsx = html;

  // Convert empty open+close tags to self-closing: <tag ...></tag> -> <tag ... />
  jsx = jsx.replace(/<(\w+)([^>]*?)><\/\1>/g, '<$1$2 />');

  // Convert HTML attributes to JSX camelCase
  jsx = jsx.replace(/stroke-width/g, 'strokeWidth');
  jsx = jsx.replace(/stroke-linecap/g, 'strokeLinecap');
  jsx = jsx.replace(/stroke-linejoin/g, 'strokeLinejoin');
  jsx = jsx.replace(/stroke-dasharray/g, 'strokeDasharray');
  jsx = jsx.replace(/stroke-dashoffset/g, 'strokeDashoffset');
  jsx = jsx.replace(/stroke-miterlimit/g, 'strokeMiterlimit');
  jsx = jsx.replace(/stroke-opacity/g, 'strokeOpacity');
  jsx = jsx.replace(/fill-opacity/g, 'fillOpacity');
  jsx = jsx.replace(/fill-rule/g, 'fillRule');
  jsx = jsx.replace(/clip-rule/g, 'clipRule');
  jsx = jsx.replace(/clip-path/g, 'clipPath');
  jsx = jsx.replace(/font-size/g, 'fontSize');
  jsx = jsx.replace(/font-family/g, 'fontFamily');
  jsx = jsx.replace(/text-anchor/g, 'textAnchor');
  jsx = jsx.replace(/stop-color/g, 'stopColor');
  jsx = jsx.replace(/stop-opacity/g, 'stopOpacity');

  // Sort props within each self-closing element
  jsx = jsx.replace(/<\w+\s[^>]*?\/>/g, sortElementProps);

  return jsx;
}

/**
 * Build a single icon component string.
 */
function buildComponent(name, jsxContent) {
  const componentName = toPascalCase(name);
  const inner = jsxContent.trim();

  if (inner.length <= 80) {
    return `export const ${componentName} = ({ className }: IconProps): JSX.Element => (\n  <svg {...defaults} className={className}>${inner}</svg>\n);\n`;
  }

  // Split multiple child elements onto separate lines
  const parts = inner
    .split('/>')
    .filter((p) => p.trim())
    .map((p) => '    ' + p.trim() + ' />');

  return `export const ${componentName} = ({ className }: IconProps): JSX.Element => (\n  <svg {...defaults} className={className}>\n${parts.join('\n')}\n  </svg>\n);\n`;
}

/**
 * Count non-blank, non-comment lines (matching ESLint max-lines behavior).
 */
function codeLineCount(str) {
  return str
    .split('\n')
    .filter((line) => {
      const trimmed = line.trim();
      if (trimmed === '') return false;
      if (trimmed.startsWith('//')) return false;
      if (trimmed.startsWith('/*')) return false;
      if (trimmed.startsWith('*')) return false;
      return true;
    }).length;
}

// ---------------------------------------------------------------------------
// File header template
// ---------------------------------------------------------------------------
function fileHeader(letterRange) {
  return `/**
 * Auto-generated Feather icons (${letterRange}).
 * DO NOT EDIT — re-run: node scripts/generate-feather-icons.mjs
 */
import type { IconProps } from './types';

const ICON_SIZE = 18;

const defaults = {
  'aria-hidden': true as const,
  width: ICON_SIZE,
  height: ICON_SIZE,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

`;
}

// Header contributes 14 code lines (import + const + object literal)
const HEADER_CODE_LINES = 14;
// ESLint max-lines is 200 (skipBlankLines + skipComments)
const MAX_CODE_LINES = 200;
// Budget for components per file
const COMPONENT_BUDGET = MAX_CODE_LINES - HEADER_CODE_LINES;

// ---------------------------------------------------------------------------
// Main generation
// ---------------------------------------------------------------------------

const allNames = Object.keys(feather.icons)
  .filter((name) => !SKIP_ICONS.has(name))
  .sort();

console.log(`Total feather icons: ${Object.keys(feather.icons).length}`);
console.log(`Skipping ${SKIP_ICONS.size} duplicates`);
console.log(`Generating ${allNames.length} icons`);
console.log(`Budget per file: ${COMPONENT_BUDGET} code lines for components`);

// Group icons by first letter
const groups = {};
for (const name of allNames) {
  const letter = name.charAt(0).toUpperCase();
  if (!groups[letter]) groups[letter] = [];
  groups[letter].push(name);
}

/**
 * Split a list of icon names into chunks that fit within COMPONENT_BUDGET.
 */
function splitGroup(letter, names) {
  const chunks = [];
  let currentNames = [];
  let currentCodeLines = 0;

  for (const name of names) {
    const jsx = toJsx(feather.icons[name].contents);
    const comp = buildComponent(name, jsx);
    const lines = codeLineCount(comp);

    if (currentCodeLines + lines > COMPONENT_BUDGET && currentNames.length > 0) {
      chunks.push([...currentNames]);
      currentNames = [];
      currentCodeLines = 0;
    }

    currentNames.push(name);
    currentCodeLines += lines;
  }

  if (currentNames.length > 0) {
    chunks.push([...currentNames]);
  }

  if (chunks.length === 1) {
    return [{ suffix: letter, names: chunks[0] }];
  }

  return chunks.map((chunk, i) => ({
    suffix: `${letter}${i + 1}`,
    names: chunk,
  }));
}

// Generate all files
const generatedFiles = [];

for (const letter of Object.keys(groups).sort()) {
  const names = groups[letter];
  const splits = splitGroup(letter, names);

  for (const { suffix, names: chunkNames } of splits) {
    const fileName = `FeatherIcons${suffix}.tsx`;
    const filePath = join(ICONS_DIR, fileName);

    const firstIcon = chunkNames[0];
    const lastIcon = chunkNames[chunkNames.length - 1];
    const range =
      chunkNames.length === 1
        ? toPascalCase(firstIcon)
        : `${toPascalCase(firstIcon)} – ${toPascalCase(lastIcon)}`;

    let content = fileHeader(range);

    for (const name of chunkNames) {
      const jsx = toJsx(feather.icons[name].contents);
      content += buildComponent(name, jsx) + '\n';
    }

    writeFileSync(filePath, content, 'utf-8');

    const totalLines = content.split('\n').length;
    const codeLines = codeLineCount(content);
    generatedFiles.push({ fileName, count: chunkNames.length, totalLines, codeLines });
    console.log(`  ${fileName}: ${chunkNames.length} icons, ${codeLines} code lines (${totalLines} total)`);

    if (codeLines > MAX_CODE_LINES) {
      console.error(`  *** WARNING: ${fileName} exceeds ${MAX_CODE_LINES} code lines! ***`);
    }
  }
}

console.log(`\nGenerated ${generatedFiles.length} files with ${allNames.length} icons total.`);

// Print barrel export additions needed
console.log('\n--- Add to index.ts ---');
for (const { fileName } of generatedFiles) {
  const moduleName = fileName.replace('.tsx', '');
  console.log(`export * from './${moduleName}';`);
}
