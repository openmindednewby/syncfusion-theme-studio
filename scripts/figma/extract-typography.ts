// Typography extraction from Figma document tree
// Searches for "Typography" page, extracts heading/body text styles.

import type {
  FigmaNode,
  TypographyExtractionData,
  TypographyExtractionStyle,
  VariableColorResolver,
} from './types';

function findPageByName(
  root: FigmaNode,
  name: string,
): FigmaNode | undefined {
  const lowerName = name.toLowerCase();
  for (const child of root.children ?? []) {
    if (child.name.toLowerCase().includes(lowerName)) return child;
  }
  return undefined;
}

function findTextNodes(node: FigmaNode): FigmaNode[] {
  const results: FigmaNode[] = [];
  if (node.type === 'TEXT' && node.style?.fontSize) {
    results.push(node);
  }
  for (const child of node.children ?? []) {
    results.push(...findTextNodes(child));
  }
  return results;
}

function extractStyle(node: FigmaNode): TypographyExtractionStyle {
  const style: TypographyExtractionStyle = {};
  if (!node.style) return style;

  const { fontFamily, fontSize, fontWeight, lineHeightPx, letterSpacing } =
    node.style;

  if (fontFamily) style.fontFamily = fontFamily;
  if (fontSize !== undefined) style.fontSize = `${fontSize}px`;
  if (fontWeight !== undefined) style.fontWeight = String(fontWeight);
  if (lineHeightPx !== undefined) style.lineHeight = `${lineHeightPx}px`;
  if (letterSpacing !== undefined) style.letterSpacing = `${letterSpacing}px`;

  return style;
}

/** Normalize Figma level names to our config keys */
const LEVEL_NAME_MAP: Record<string, string> = {
  h1: 'h1',
  'heading 1': 'h1',
  h2: 'h2',
  'heading 2': 'h2',
  h3: 'h3',
  'heading 3': 'h3',
  h4: 'h4',
  'heading 4': 'h4',
  body: 'body',
  'body text': 'body',
  'body small': 'bodySmall',
  caption: 'caption',
  label: 'label',
  secondary: 'secondary',
  muted: 'muted',
};

function classifyTextNode(node: FigmaNode): string | undefined {
  const name = node.name.toLowerCase().trim();

  // Direct match
  if (LEVEL_NAME_MAP[name]) return LEVEL_NAME_MAP[name];

  // Partial match
  for (const [pattern, level] of Object.entries(LEVEL_NAME_MAP)) {
    if (name.includes(pattern)) return level;
  }

  // Classify by character content
  const chars = node.characters?.toLowerCase().trim();
  if (chars) {
    for (const [pattern, level] of Object.entries(LEVEL_NAME_MAP)) {
      if (chars.includes(pattern)) return level;
    }
  }

  return undefined;
}

export function extractTypography(
  document: FigmaNode,
  _resolver: VariableColorResolver | undefined,
): TypographyExtractionData | undefined {
  const page = findPageByName(document, 'typography');
  if (!page) return undefined;

  const textNodes = findTextNodes(page);
  if (textNodes.length === 0) return undefined;

  const levels: Record<string, TypographyExtractionStyle> = {};
  let fontFamily: string | undefined;

  for (const node of textNodes) {
    const level = classifyTextNode(node);
    if (!level) continue;

    // Don't overwrite if already found (first match wins)
    if (levels[level]) continue;

    levels[level] = extractStyle(node);

    // Capture primary font family from the first heading
    if (!fontFamily && node.style?.fontFamily) {
      fontFamily = node.style.fontFamily;
    }
  }

  if (Object.keys(levels).length === 0) return undefined;

  console.log(
    `Typography: ${Object.keys(levels).length} levels (${Object.keys(levels).join(', ')})`,
  );

  return { fontFamily, levels };
}
