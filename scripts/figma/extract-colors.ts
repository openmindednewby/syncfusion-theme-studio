// Extract color values from the "Colours (Final)" page
// Usage: npx tsx scripts/figma/extract-colors.ts

import type { FigmaNode } from './types';
import { extractSolidFill, figmaColorToRgb } from './utils';

const FIGMA_API_BASE = 'https://api.figma.com/v1';
const COLOURS_PAGE_ID = '5:126';

interface ColorEntry {
  name: string;
  hex: string;
  rgb: string;
  nodeId: string;
}

function hexFromFigmaRgb(r: number, g: number, b: number): string {
  const toHex = (v: number): string => Math.round(v * 255).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

function extractColorsFromNode(node: FigmaNode, depth: number): ColorEntry[] {
  const results: ColorEntry[] = [];
  const indent = '  '.repeat(depth);

  const fill = extractSolidFill(node);
  if (fill) {
    const rgb = figmaColorToRgb(fill);
    const hex = hexFromFigmaRgb(fill.r, fill.g, fill.b);
    results.push({ name: node.name, hex, rgb, nodeId: node.id });
  }

  for (const child of node.children ?? []) {
    results.push(...extractColorsFromNode(child, depth + 1));
  }

  return results;
}

async function main(): Promise<void> {
  const token = process.env['FIGMA_API_TOKEN']!;
  const fileKey = process.env['FIGMA_FILE_KEY']!;

  // Fetch just the Colours page with full depth
  const url = `${FIGMA_API_BASE}/files/${fileKey}/nodes?ids=${COLOURS_PAGE_ID}`;
  console.log('Fetching Colours (Final) page...');

  const response = await fetch(url, {
    headers: { 'X-FIGMA-TOKEN': token },
  });

  const data = (await response.json()) as {
    nodes: Record<string, { document: FigmaNode }>;
  };

  const page = data.nodes[COLOURS_PAGE_ID]?.document;
  if (!page) {
    console.error('Could not find Colours page');
    return;
  }

  console.log(`Page: "${page.name}" with ${page.children?.length ?? 0} children\n`);

  // Group by section titles and color cards
  let currentSection = 'Unknown';

  for (const child of page.children ?? []) {
    if (child.name === 'Section Title' || child.name === 'Colors' || child.name === 'ClearSkies 2.0 Colours') {
      // Extract text content from section titles
      const textNode = findTextNode(child);
      if (textNode) {
        currentSection = textNode;
        console.log(`\n=== ${currentSection} ===`);
      }
      continue;
    }

    if (child.name === 'Color Card') {
      const colorInfo = extractColorCard(child);
      if (colorInfo) {
        console.log(`  ${colorInfo.label.padEnd(30)} ${colorInfo.hex.padEnd(10)} rgb: ${colorInfo.rgb}`);
      }
    }
  }
}

function findTextNode(node: FigmaNode): string | undefined {
  if (node.type === 'TEXT') return node.name;

  // Look for text children that contain the section name
  for (const child of node.children ?? []) {
    if (child.type === 'TEXT' && child.name !== 'Section Title') {
      // The actual text content is in the characters property
      // but we may not have it at this depth - use the name as fallback
      return child.name;
    }
    const found = findTextNode(child);
    if (found) return found;
  }

  return undefined;
}

interface ColorCardInfo {
  label: string;
  hex: string;
  rgb: string;
}

function extractColorCard(node: FigmaNode): ColorCardInfo | undefined {
  // Color cards have a colored rectangle and text labels
  let colorHex = '';
  let colorRgb = '';
  let label = '';

  for (const child of node.children ?? []) {
    // Look for the color swatch rectangle
    if (child.type === 'RECTANGLE' || child.type === 'FRAME') {
      const fill = extractSolidFill(child);
      if (fill) {
        colorRgb = figmaColorToRgb(fill);
        colorHex = hexFromFigmaRgb(fill.r, fill.g, fill.b);
      }
    }

    // Look for text labels
    if (child.type === 'TEXT') {
      if (!label) label = child.name;
    }

    // Recursively check children
    for (const grandchild of child.children ?? []) {
      if (grandchild.type === 'RECTANGLE') {
        const fill = extractSolidFill(grandchild);
        if (fill && !colorHex) {
          colorRgb = figmaColorToRgb(fill);
          colorHex = hexFromFigmaRgb(fill.r, fill.g, fill.b);
        }
      }
      if (grandchild.type === 'TEXT' && !label) {
        label = grandchild.name;
      }
    }
  }

  if (!colorHex) return undefined;
  return { label: label || 'unnamed', hex: colorHex, rgb: colorRgb };
}

main().catch(console.error);
