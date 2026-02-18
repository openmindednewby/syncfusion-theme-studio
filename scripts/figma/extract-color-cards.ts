// Deep extract color cards from the ClearSkies 2.0 section of Colours (Final) page
// Usage: npx tsx scripts/figma/extract-color-cards.ts

import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

import type { FigmaColor, FigmaNode } from './types';
import { figmaColorToRgb } from './utils';

const FIGMA_API_BASE = 'https://api.figma.com/v1';
const COLOURS_PAGE_ID = '5:126';

function hexFromColor(c: FigmaColor): string {
  const toHex = (v: number): string => Math.round(v * 255).toString(16).padStart(2, '0');
  return `#${toHex(c.r)}${toHex(c.g)}${toHex(c.b)}`.toUpperCase();
}

interface FigmaNodeFull extends FigmaNode {
  characters?: string;
}

function findAllText(node: FigmaNodeFull): string[] {
  const texts: string[] = [];
  if (node.characters) texts.push(node.characters);
  for (const child of (node.children ?? []) as FigmaNodeFull[]) {
    texts.push(...findAllText(child));
  }
  return texts;
}

function findFirstFill(node: FigmaNode): FigmaColor | undefined {
  // Check fills on this node
  const fills = node.fills ?? [];
  const solid = fills.find(
    (f: { type: string; visible?: boolean }) => f.type === 'SOLID' && f.visible !== false,
  );
  if (solid?.color) return solid.color as FigmaColor;

  // Check RECTANGLE children (color swatches)
  for (const child of node.children ?? []) {
    if (child.type === 'RECTANGLE' || child.type === 'ELLIPSE') {
      const cFills = child.fills ?? [];
      const cSolid = cFills.find(
        (f: { type: string; visible?: boolean }) => f.type === 'SOLID' && f.visible !== false,
      );
      if (cSolid?.color) return cSolid.color as FigmaColor;
    }
  }

  return undefined;
}

function dumpNodeTree(node: FigmaNodeFull, depth: number): void {
  const indent = '  '.repeat(depth);
  const fills = node.fills ?? [];
  const solidFill = fills.find(
    (f: { type: string; visible?: boolean }) => f.type === 'SOLID' && f.visible !== false,
  );
  const fillStr = solidFill?.color
    ? ` fill:${hexFromColor(solidFill.color as FigmaColor)}`
    : '';
  const charStr = node.characters ? ` "${node.characters}"` : '';

  console.log(`${indent}[${node.type}] "${node.name}"${fillStr}${charStr}`);

  for (const child of (node.children ?? []) as FigmaNodeFull[]) {
    dumpNodeTree(child, depth + 1);
  }
}

async function main(): Promise<void> {
  const token = process.env['FIGMA_API_TOKEN']!;
  const fileKey = process.env['FIGMA_FILE_KEY']!;

  console.log('Fetching Colours page nodes...');
  const url = `${FIGMA_API_BASE}/files/${fileKey}/nodes?ids=${COLOURS_PAGE_ID}`;
  const res = await fetch(url, { headers: { 'X-FIGMA-TOKEN': token } });
  const data = (await res.json()) as {
    nodes: Record<string, { document: FigmaNodeFull }>;
  };

  const page = data.nodes[COLOURS_PAGE_ID]?.document;
  if (!page) { console.error('Page not found'); return; }

  console.log(`\nPage: "${page.name}" — ${page.children?.length ?? 0} children\n`);

  // Dump all Color Card and Section Title nodes with their full tree
  for (const child of (page.children ?? []) as FigmaNodeFull[]) {
    if (child.name === 'Color Card' || child.name === 'Section Title' ||
        child.type === 'TEXT') {
      dumpNodeTree(child, 0);
      console.log('');
    }
  }
}

main().catch(console.error);
