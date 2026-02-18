// Extract component-specific colors from all finished Figma pages
// Usage: npx tsx scripts/figma/extract-components.ts

import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

import type { FigmaColor, FigmaNode, FigmaPaint } from './types';

const FIGMA_API_BASE = 'https://api.figma.com/v1';
const MAX_RGB = 255;
const API_DELAY_MS = 2000;

interface PageInfo { name: string; id: string; }

const FINISHED_PAGES: PageInfo[] = [
  { name: 'Buttons (Final)', id: '6809:9145' },
  { name: 'Bagdes (Final)', id: '6808:20' },
  { name: 'Input (Final)', id: '2872:5609' },
  { name: 'External Link (Final)', id: '6821:22250' },
  { name: 'Description (Final)', id: '328:0' },
];

function toRgbStr(c: FigmaColor): string {
  return `${Math.round(c.r * MAX_RGB)} ${Math.round(c.g * MAX_RGB)} ${Math.round(c.b * MAX_RGB)}`;
}

function toHex(c: FigmaColor): string {
  const h = (v: number) => Math.round(v * MAX_RGB).toString(16).padStart(2, '0');
  return `#${h(c.r)}${h(c.g)}${h(c.b)}`.toUpperCase();
}

function getSolidFill(node: FigmaNode): FigmaColor | undefined {
  const fills = node.fills ?? [];
  const solid = fills.find((f: FigmaPaint) => f.type === 'SOLID' && f.visible !== false);
  return solid?.color;
}

function getSolidStroke(node: FigmaNode): FigmaColor | undefined {
  const strokes = node.strokes ?? [];
  const solid = strokes.find((f: FigmaPaint) => f.type === 'SOLID' && f.visible !== false);
  return solid?.color;
}

interface ExtractedNode {
  path: string;
  type: string;
  fill?: { hex: string; rgb: string };
  stroke?: { hex: string; rgb: string };
  text?: string;
  cornerRadius?: number;
  fontSize?: number;
  fontWeight?: number;
  fontFamily?: string;
}

function walkNodes(
  node: FigmaNode & { characters?: string; style?: { fontFamily?: string; fontSize?: number; fontWeight?: number } },
  parentPath: string,
  results: ExtractedNode[],
): void {
  const path = parentPath ? `${parentPath} / ${node.name}` : node.name;
  
  const fillColor = getSolidFill(node);
  const strokeColor = getSolidStroke(node);
  const text = node.characters;
  const cornerRadius = node.cornerRadius;
  const style = node.style;
  
  const hasData = fillColor || strokeColor || text || cornerRadius || style;
  
  if (hasData) {
    const entry: ExtractedNode = { path, type: node.type };
    if (fillColor) entry.fill = { hex: toHex(fillColor), rgb: toRgbStr(fillColor) };
    if (strokeColor) entry.stroke = { hex: toHex(strokeColor), rgb: toRgbStr(strokeColor) };
    if (text) entry.text = text;
    if (cornerRadius) entry.cornerRadius = cornerRadius;
    if (style?.fontSize) {
      entry.fontSize = style.fontSize;
      entry.fontWeight = style.fontWeight;
      entry.fontFamily = style.fontFamily;
    }
    results.push(entry);
  }
  
  for (const child of node.children ?? []) {
    walkNodes(child as typeof node, path, results);
  }
}

async function fetchPage(fileKey: string, token: string, pageId: string): Promise<FigmaNode | null> {
  const url = `${FIGMA_API_BASE}/files/${fileKey}/nodes?ids=${encodeURIComponent(pageId)}&depth=100`;
  const res = await fetch(url, { headers: { 'X-FIGMA-TOKEN': token } });
  
  if (res.status === 429) {
    const retryRaw = Number(res.headers.get('retry-after') ?? '10');
    const MAX_WAIT_S = 60;
    const waitSeconds = retryRaw > MAX_WAIT_S ? MAX_WAIT_S : retryRaw;
    const wait = waitSeconds * 1000;
    console.log(`  Rate limited (retry-after: ${retryRaw}), waiting ${waitSeconds}s...`);
    await new Promise(r => setTimeout(r, wait));
    const retry = await fetch(url, { headers: { 'X-FIGMA-TOKEN': token } });
    if (!retry.ok) return null;
    const data = (await retry.json()) as { nodes: Record<string, { document: FigmaNode } | null> };
    return data.nodes[pageId]?.document ?? null;
  }
  
  if (!res.ok) {
    console.error(`  API error ${res.status}: ${await res.text()}`);
    return null;
  }
  
  const data = (await res.json()) as { nodes: Record<string, { document: FigmaNode } | null> };
  return data.nodes[pageId]?.document ?? null;
}

async function main(): Promise<void> {
  const token = process.env['FIGMA_API_TOKEN']!;
  const fileKey = process.env['FIGMA_FILE_KEY']!;
  
  const allData: Record<string, ExtractedNode[]> = {};
  
  for (let i = 0; i < FINISHED_PAGES.length; i++) {
    const page = FINISHED_PAGES[i]!;
    
    if (i > 0) await new Promise(r => setTimeout(r, API_DELAY_MS));
    
    console.log(`\nFetching: ${page.name} (${page.id})...`);
    const doc = await fetchPage(fileKey, token, page.id);
    
    if (!doc) { console.log('  No data'); continue; }
    
    const results: ExtractedNode[] = [];
    walkNodes(doc as any, '', results);
    allData[page.name] = results;
    
    console.log(`  Found ${results.length} nodes with data`);
    
    // Print summary for buttons
    if (page.name.includes('Button')) {
      for (const r of results) {
        if (r.fill || r.stroke) {
          const parts = [r.path.substring(0, 80)];
          if (r.fill) parts.push(`fill:${r.fill.hex}`);
          if (r.stroke) parts.push(`stroke:${r.stroke.hex}`);
          if (r.text) parts.push(`"${r.text}"`);
          console.log(`    ${parts.join(' | ')}`);
        }
      }
    }
  }
  
  const outPath = resolve(import.meta.dirname, 'data/figma-components.json');
  writeFileSync(outPath, JSON.stringify(allData, null, 2));
  console.log(`\nWritten to: ${outPath}`);
}

main().catch(console.error);
