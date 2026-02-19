// Shared utilities for icon extraction and generation pipelines.
// TypeScript port of JSX conversion logic from scripts/generate-feather-icons.mjs.

/** Icons already hand-coded in AppIcons.tsx — skip during generation */
export const SKIP_ICONS = new Set([
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

/** Header template contributes 14 code lines */
export const HEADER_CODE_LINES = 14;
/** ESLint max-lines is 200 (skipBlankLines + skipComments) */
export const MAX_CODE_LINES = 200;
/** Budget for components per file */
export const COMPONENT_BUDGET = MAX_CODE_LINES - HEADER_CODE_LINES;

const SHORT_COMPONENT_THRESHOLD = 80;

/** Frames wider than this are multi-variant (filled-small + filled-medium + stroke) */
const MULTI_VARIANT_WIDTH_THRESHOLD = 30;

/** Convert kebab-case icon name to PascalCase with Icon prefix */
export function toPascalCase(kebab: string): string {
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
 * Handles both self-closing (`<tag ... />`) and opening (`<tag ...>`) tags.
 */
export function sortElementProps(tag: string): string {
  const selfClosing = tag.match(/^<(\w+)\s+(.*?)\s*\/>$/s);
  const opening = selfClosing ? null : tag.match(/^<(\w+)\s+(.*?)\s*>$/s);
  const match = selfClosing ?? opening;
  if (!match) return tag;

  const [, tagName, attrString] = match;
  const attrs: Array<{ name: string; value: string }> = [];
  const attrRegex = /(\w[\w-]*)="([^"]*)"/g;
  let m;
  while ((m = attrRegex.exec(attrString!)) !== null) {
    attrs.push({ name: m[1]!, value: m[2]! });
  }
  attrs.sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }),
  );
  const sorted = attrs.map((a) => `${a.name}="${a.value}"`).join(' ');
  const suffix = selfClosing ? ' />' : '>';
  return `<${tagName} ${sorted}${suffix}`;
}

/**
 * Convert SVG inner HTML to valid JSX with sorted props.
 * Converts HTML-style tags to JSX self-closing tags and camelCase attributes.
 */
export function toJsx(html: string): string {
  let jsx = html;

  // Convert empty open+close tags to self-closing
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

  // Sort props within each element (self-closing and opening tags)
  jsx = jsx.replace(/<\w+\s[^>]*?>/g, sortElementProps);

  return jsx;
}

/** Build a single icon component string */
export function buildComponent(name: string, jsxContent: string): string {
  const componentName = toPascalCase(name);
  const inner = jsxContent.trim();

  if (inner.length <= SHORT_COMPONENT_THRESHOLD) {
    return `export const ${componentName} = ({ className }: IconProps): JSX.Element => (\n  <svg {...defaults} className={className}>${inner}</svg>\n);\n`;
  }

  // Match all XML tags: self-closing (<tag ... />), opening (<tag ...>), closing (</tag>)
  const tags = inner.match(/<[^>]+>/g) ?? [];
  const parts = tags.map((tag) => '    ' + tag);

  return `export const ${componentName} = ({ className }: IconProps): JSX.Element => (\n  <svg {...defaults} className={className}>\n${parts.join('\n')}\n  </svg>\n);\n`;
}

/** Count non-blank, non-comment lines (matching ESLint max-lines behavior) */
export function codeLineCount(str: string): number {
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

/** Generate the file header for a FeatherIcons*.tsx file */
export function fileHeader(letterRange: string): string {
  return `/**
 * Auto-generated Feather icons (${letterRange}).
 * DO NOT EDIT — re-run: npm run figma:generate:icons
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

interface SplitResult {
  suffix: string;
  names: string[];
}

/** Split a list of icon names into chunks that fit within COMPONENT_BUDGET */
export function splitGroup(
  letter: string,
  names: string[],
  buildJsx: (name: string) => string,
): SplitResult[] {
  const chunks: string[][] = [];
  let currentNames: string[] = [];
  let currentCodeLines = 0;

  for (const name of names) {
    const comp = buildJsx(name);
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
    return [{ suffix: letter, names: chunks[0]! }];
  }

  return chunks.map((chunk, i) => ({
    suffix: `${letter}${i + 1}`,
    names: chunk,
  }));
}

/**
 * Strip redundant stroke/fill attributes that inherit from parent SVG defaults.
 * The parent `<svg>` sets stroke="currentColor", strokeWidth, linecap, linejoin, fill="none".
 */
function stripRedundantAttributes(svg: string): string {
  let result = svg;
  result = result.replace(/\s+stroke="black"/g, '');
  result = result.replace(/\s+stroke-width="[^"]*"/g, '');
  result = result.replace(/\s+stroke-linecap="round"/g, '');
  result = result.replace(/\s+stroke-linejoin="round"/g, '');
  result = result.replace(/\s+fill="none"/g, '');
  return result;
}

/**
 * Extract the stroke variant from a multi-variant Figma icon frame.
 * Removes the dashed border rect, filled variants, clip-path groups, and defs.
 * Wraps remaining paths in a translate group to shift into 0-24 space.
 */
function extractStrokeVariant(
  inner: string,
  frameWidth: number,
  frameHeight: number,
): string {
  let result = inner;
  const VARIANT_3_PADDING = 40;
  const ICON_VIEWPORT_SIZE = 24;

  // Remove dashed border rect
  result = result.replace(
    /<rect[^>]*stroke-dasharray[^>]*(?:\/>|>[^<]*<\/rect>)/gi,
    '',
  );

  // Remove <defs>...</defs> blocks (clip-path definitions)
  result = result.replace(/<defs[\s\S]*?<\/defs>/gi, '');

  // Handle <g clip-path> groups: remove variant 2 (fill-only), unwrap variant 3 (stroke)
  result = result.replace(
    /<g\s[^>]*clip-path[^>]*>([\s\S]*?)<\/g>/gi,
    (_match: string, content: string) => {
      if (/\bstroke=/.test(content)) return content;
      return '';
    },
  );

  // Remove <path> with fill="black" but no stroke attribute (filled variant 1)
  result = result.replace(
    /<path\b(?=[^>]*\bfill="black")(?![^>]*\bstroke=)[^>]*(?:\/>|>[^<]*<\/path>)/gi,
    '',
  );

  // Shift variant 3 into the 0-24 coordinate space
  const offsetX = frameWidth - VARIANT_3_PADDING;
  const offsetY = (frameHeight - ICON_VIEWPORT_SIZE) / 2;

  result = result.trim().replace(/\n\s*\n/g, '\n');

  return `<g transform="translate(-${offsetX} -${offsetY})">${result}</g>`;
}

/**
 * Extract the inner content from a full `<svg>` element string.
 * Strips the outer `<svg ...>...</svg>` wrapper and removes
 * xmlns, class, style attributes from child elements.
 * Detects multi-variant frames and extracts only the stroke variant.
 * Always strips redundant stroke/fill attributes so paths inherit from defaults.
 */
export function extractSvgInnerContent(svgString: string): string {
  const viewBoxMatch = svgString.match(
    /<svg[^>]*\bviewBox="([^"]*)"[^>]*>/i,
  );
  const innerMatch = svgString.match(/<svg[^>]*>([\s\S]*)<\/svg>/i);
  if (!innerMatch) return svgString;

  let inner = innerMatch[1]!.trim();

  // Remove xmlns attributes from inner elements
  inner = inner.replace(/\s+xmlns(?::\w+)?="[^"]*"/g, '');
  // Remove class attributes
  inner = inner.replace(/\s+class="[^"]*"/g, '');
  // Remove style attributes
  inner = inner.replace(/\s+style="[^"]*"/g, '');

  // Detect multi-variant frame by viewBox width
  if (viewBoxMatch) {
    const parts = viewBoxMatch[1]!.split(/\s+/).map(Number);
    const frameWidth = parts[2] ?? 0;
    const frameHeight = parts[3] ?? 0;

    if (frameWidth > MULTI_VARIANT_WIDTH_THRESHOLD) {
      inner = extractStrokeVariant(inner, frameWidth, frameHeight);
    }
  }

  // Always strip redundant attributes so paths inherit from parent SVG defaults
  inner = stripRedundantAttributes(inner);

  return inner;
}
