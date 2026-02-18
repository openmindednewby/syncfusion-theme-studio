// Discovery mode: Dump all Figma paths for mapping authoring
// Usage: npx tsx scripts/figma/discover.ts

import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

import type { FigmaNode } from './types';
import { buildNodePath, extractSolidFill, extractSolidStroke, figmaColorToRgb } from './utils';

const FIGMA_API_BASE = 'https://api.figma.com/v1';
const MAX_RETRIES = 3;
const MAX_RETRY_WAIT_S = 60;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    console.error(`Missing environment variable: ${name}`);
    process.exit(1);
  }
  return value;
}

interface DiscoveryEntry {
  path: string;
  type: string;
  details: string[];
}

function discoverNode(
  node: FigmaNode,
  parentPath: string,
  entries: DiscoveryEntry[],
): void {
  const nodePath = buildNodePath(node.name, parentPath);
  const details: string[] = [];

  const fillColor = extractSolidFill(node);
  if (fillColor) {
    details.push(`fill: ${figmaColorToRgb(fillColor)}`);
  }

  const strokeColor = extractSolidStroke(node);
  if (strokeColor) {
    details.push(`stroke: ${figmaColorToRgb(strokeColor)}`);
  }

  if (node.cornerRadius !== undefined && node.cornerRadius > 0) {
    details.push(`radius: ${node.cornerRadius}px`);
  }

  if (node.style?.fontSize) {
    const font = node.style.fontFamily ?? 'unknown';
    details.push(`fontSize: ${node.style.fontSize}, font: ${font}`);
  }

  if (details.length > 0) {
    entries.push({ path: nodePath, type: node.type, details });
  }

  for (const child of node.children ?? []) {
    discoverNode(child, nodePath, entries);
  }
}

function formatDiscovery(
  frameName: string,
  entries: DiscoveryEntry[],
): string {
  const lines: string[] = [];
  const headerSeparator = '='.repeat(50);

  lines.push(`FIGMA DISCOVERY - ${frameName}`);
  lines.push(headerSeparator);

  const maxPathLen = Math.max(...entries.map((e) => e.path.length), 0);

  for (const entry of entries) {
    const paddedPath = entry.path.padEnd(maxPathLen + 2);
    const typeTag = `[${entry.type}]`.padEnd(12);
    lines.push(`${paddedPath}${typeTag}${entry.details.join(', ')}`);
  }

  lines.push('');
  lines.push(
    `Total: ${entries.length} nodes with extractable properties`,
  );

  return lines.join('\n');
}

function discoverAllFrames(document: FigmaNode): string {
  const lines: string[] = [];
  const allFrames: { name: string; id: string; depth: number }[] = [];

  function walkFrames(node: FigmaNode, depth: number): void {
    if (
      (node.type === 'FRAME' || node.type === 'SECTION' || node.type === 'COMPONENT_SET') &&
      depth > 0
    ) {
      allFrames.push({ name: node.name, id: node.id, depth });
    }
    for (const child of node.children ?? []) {
      walkFrames(child, depth + 1);
    }
  }

  walkFrames(document, 0);

  lines.push('ALL TOP-LEVEL FRAMES');
  lines.push('='.repeat(50));
  for (const frame of allFrames) {
    const indent = '  '.repeat(frame.depth - 1);
    lines.push(`${indent}${frame.name}  (${frame.id})`);
  }

  return lines.join('\n');
}

async function fetchFigmaFile(
  fileKey: string,
  token: string,
): Promise<{ name: string; document: FigmaNode }> {
  const url = `${FIGMA_API_BASE}/files/${fileKey}`;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    console.log(`Fetching Figma file: ${fileKey} (attempt ${attempt}/${MAX_RETRIES})...`);
    const response = await fetch(url, { headers: { 'X-FIGMA-TOKEN': token } });

    if (response.ok) {
      return response.json() as Promise<{ name: string; document: FigmaNode }>;
    }

    if (response.status === 429 && attempt < MAX_RETRIES) {
      const raw = Number(response.headers.get('retry-after') ?? '30');
      const waitS = Math.min(raw, MAX_RETRY_WAIT_S);
      console.log(`  Rate limited. Waiting ${waitS}s before retry...`);
      await sleep(waitS * 1000);
      continue;
    }

    const body = await response.text();
    throw new Error(`Figma API error ${response.status}: ${body}`);
  }

  throw new Error(`Failed after ${MAX_RETRIES} retries`);
}

async function main(): Promise<void> {
  const token = getEnvVar('FIGMA_API_TOKEN');
  const fileKey = getEnvVar('FIGMA_FILE_KEY');

  const file = await fetchFigmaFile(fileKey, token);
  console.log(`File: ${file.name}`);

  const sections: string[] = [];

  // List all frames first
  sections.push(discoverAllFrames(file.document));
  sections.push('');

  // Discover all pages
  for (const page of file.document.children ?? []) {
    const entries: DiscoveryEntry[] = [];
    for (const child of page.children ?? []) {
      discoverNode(child, '', entries);
    }

    if (entries.length > 0) {
      sections.push(formatDiscovery(`Page: ${page.name}`, entries));
      sections.push('');
    }
  }

  const output = sections.join('\n');
  const outPath = resolve(import.meta.dirname, 'data/figma-discovery.txt');
  writeFileSync(outPath, output);

  console.log(`Discovery complete. Written to: ${outPath}`);
  console.log(`Use this file to populate figma-mapping.ts`);
}

main().catch((err: unknown) => {
  console.error('Discovery failed:', err);
  process.exit(1);
});
