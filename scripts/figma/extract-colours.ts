// Colour extraction from Figma "Colours (Final)" page
// Walks color card structures to extract named swatches,
// groups them by section (primary, secondary, neutral, status).

import type {
  ColourExtractionData,
  ColourSwatchData,
  FigmaNode,
  VariableColorResolver,
} from './types';
import { extractSolidFill, figmaColorToRgb } from './utils';

const MAX_RGB = 255;

function hexFromRgb(r: number, g: number, b: number): string {
  const toHex = (v: number): string =>
    Math.round(v * MAX_RGB).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

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

function findTextNode(node: FigmaNode): string | undefined {
  if (node.type === 'TEXT' && node.characters) return node.characters;
  for (const child of node.children ?? []) {
    const found = findTextNode(child);
    if (found) return found;
  }
  return undefined;
}

function extractSwatchFromNode(node: FigmaNode): ColourSwatchData | undefined {
  // Try finding a colored rectangle or frame child
  for (const child of node.children ?? []) {
    const fill = extractSolidFill(child);
    if (fill) {
      const rgb = figmaColorToRgb(fill);
      const hex = hexFromRgb(fill.r, fill.g, fill.b);
      const label = findTextNode(node) ?? node.name;
      return { name: label.trim(), hex, rgb };
    }

    // Check one level deeper
    for (const grandchild of child.children ?? []) {
      const gFill = extractSolidFill(grandchild);
      if (gFill) {
        const rgb = figmaColorToRgb(gFill);
        const hex = hexFromRgb(gFill.r, gFill.g, gFill.b);
        const label = findTextNode(node) ?? node.name;
        return { name: label.trim(), hex, rgb };
      }
    }
  }

  // Try the node itself
  const directFill = extractSolidFill(node);
  if (directFill) {
    const rgb = figmaColorToRgb(directFill);
    const hex = hexFromRgb(directFill.r, directFill.g, directFill.b);
    return { name: node.name.trim(), hex, rgb };
  }

  return undefined;
}

/** Classify section names into palette categories */
const SECTION_CLASSIFIERS: Record<string, RegExp> = {
  primary: /primary|brand|main/i,
  secondary: /secondary|accent/i,
  neutral: /neutral|gray|grey/i,
  success: /success|green/i,
  warning: /warning|yellow|amber|orange/i,
  error: /error|red|danger/i,
  info: /info|blue|link/i,
};

function classifySwatch(name: string): { category: string; shade?: string } {
  const lower = name.toLowerCase();

  for (const [category, regex] of Object.entries(SECTION_CLASSIFIERS)) {
    if (regex.test(lower)) {
      // Try to extract shade number
      const shadeMatch = lower.match(/(\d{2,3})/);
      return { category, shade: shadeMatch?.[1] };
    }
  }

  // Try numeric shade detection without category prefix
  const shadeMatch = lower.match(/(\d{2,3})/);
  if (shadeMatch) {
    return { category: 'unknown', shade: shadeMatch[1] };
  }

  return { category: 'unknown' };
}

export function extractColours(
  document: FigmaNode,
  _resolver: VariableColorResolver | undefined,
): ColourExtractionData | undefined {
  const page = findPageByName(document, 'colours');
  if (!page) return undefined;

  const primary: Record<string, ColourSwatchData> = {};
  const secondary: Record<string, ColourSwatchData> = {};
  const neutral: Record<string, ColourSwatchData> = {};
  const status: Record<string, Record<string, ColourSwatchData>> = {
    success: {},
    warning: {},
    error: {},
    info: {},
  };

  let currentSection = 'unknown';

  for (const child of page.children ?? []) {
    // Detect section headings
    const text = findTextNode(child);
    if (text && child.type !== 'RECTANGLE') {
      const classified = classifySwatch(text);
      if (classified.category !== 'unknown') {
        currentSection = classified.category;
      }
    }

    // Extract color cards
    const swatch = extractSwatchFromNode(child);
    if (!swatch) continue;

    const { category, shade } = classifySwatch(swatch.name);
    const key = shade ?? swatch.name;
    const effectiveCategory =
      category !== 'unknown' ? category : currentSection;

    switch (effectiveCategory) {
      case 'primary':
        primary[key] = swatch;
        break;
      case 'secondary':
        secondary[key] = swatch;
        break;
      case 'neutral':
        neutral[key] = swatch;
        break;
      case 'success':
      case 'warning':
      case 'error':
      case 'info':
        status[effectiveCategory]![key] = swatch;
        break;
      default:
        // Unclassified, skip
        break;
    }
  }

  const totalSwatches =
    Object.keys(primary).length +
    Object.keys(secondary).length +
    Object.keys(neutral).length +
    Object.values(status).reduce((sum, s) => sum + Object.keys(s).length, 0);

  if (totalSwatches === 0) return undefined;

  console.log(
    `Colours: ${Object.keys(primary).length} primary, ` +
    `${Object.keys(secondary).length} secondary, ` +
    `${Object.keys(neutral).length} neutral, ` +
    `${Object.values(status).reduce((s, v) => s + Object.keys(v).length, 0)} status`,
  );

  return { primary, secondary, neutral, status };
}
