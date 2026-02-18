// Extract component data from all finished Figma pages
// Usage: npx tsx scripts/figma/extract-all-pages.ts [--skip=ID1,ID2]

import type { FigmaColor, FigmaNode, FigmaPaint } from './types';

const FIGMA_API_BASE = 'https://api.figma.com/v1';

const MAX_RGB_VALUE = 255;
const DELAY_BETWEEN_REQUESTS_MS = 5000;
const MAX_RETRY_WAIT_MS = 30000;
const MAX_RETRIES = 3;

interface PageInfo {
  name: string;
  id: string;
}

const FINISHED_PAGES: PageInfo[] = [
  { name: 'Buttons (Final)', id: '6809:9145' },
  { name: 'Bagdes (Final)', id: '6808:20' },
  { name: 'Input (Final)', id: '2872:5609' },
  { name: 'External Link (Final)', id: '6821:22250' },
  { name: 'Description (Final)', id: '328:0' },
];

function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    console.error(`Missing environment variable: ${name}`);
    console.error('Create a .env file with FIGMA_API_TOKEN and FIGMA_FILE_KEY');
    process.exit(1);
  }
  return value;
}

function getSkipIds(): Set<string> {
  const skipArg = process.argv.find((a) => a.startsWith('--skip='));
  if (!skipArg) return new Set();
  return new Set(skipArg.replace('--skip=', '').split(','));
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function figmaColorToHex(color: FigmaColor): string {
  const r = Math.round(color.r * MAX_RGB_VALUE);
  const g = Math.round(color.g * MAX_RGB_VALUE);
  const b = Math.round(color.b * MAX_RGB_VALUE);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

function figmaColorToRgbString(color: FigmaColor): string {
  const r = Math.round(color.r * MAX_RGB_VALUE);
  const g = Math.round(color.g * MAX_RGB_VALUE);
  const b = Math.round(color.b * MAX_RGB_VALUE);
  return `rgb(${r}, ${g}, ${b})`;
}

function getVisibleSolidFill(fills: FigmaPaint[]): FigmaColor | undefined {
  const solid = fills.find(
    (f) => f.type === 'SOLID' && f.visible !== false && f.color,
  );
  return solid?.color;
}

interface NodeResult {
  path: string;
  nodeType: string;
  fillHex?: string;
  fillRgb?: string;
  characters?: string;
}

function walkNode(
  node: FigmaNode,
  parentPath: string,
  results: NodeResult[],
): void {
  const currentPath = parentPath ? `${parentPath} > ${node.name}` : node.name;

  const fills = node.fills ?? [];
  const fillColor = getVisibleSolidFill(fills);
  const characters = (node as FigmaNode & { characters?: string }).characters;

  const hasFill = fillColor !== undefined;
  const hasCharacters = characters !== undefined && characters.length > 0;

  if (hasFill || hasCharacters) {
    const result: NodeResult = {
      path: currentPath,
      nodeType: node.type,
    };

    if (fillColor) {
      result.fillHex = figmaColorToHex(fillColor);
      result.fillRgb = figmaColorToRgbString(fillColor);
    }

    if (hasCharacters) {
      result.characters = characters;
    }

    results.push(result);
  }

  for (const child of node.children ?? []) {
    walkNode(child, currentPath, results);
  }
}

interface FigmaNodesResponse {
  nodes: Record<string, { document: FigmaNode } | null>;
}

async function fetchPageNodes(
  fileKey: string,
  token: string,
  pageId: string,
): Promise<FigmaNode | null> {
  const encodedId = encodeURIComponent(pageId);
  const url = `${FIGMA_API_BASE}/files/${fileKey}/nodes?ids=${encodedId}&depth=100`;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    const response = await fetch(url, {
      headers: { 'X-FIGMA-TOKEN': token },
    });

    if (response.ok) {
      const data = (await response.json()) as FigmaNodesResponse;
      const nodeEntry = data.nodes[pageId];
      return nodeEntry?.document ?? null;
    }

    if (response.status === 429) {
      const retryAfter = response.headers.get('retry-after');
      const headerWaitMs = retryAfter ? Number(retryAfter) * 1000 : MAX_RETRY_WAIT_MS;
      const waitMs = Math.min(headerWaitMs, MAX_RETRY_WAIT_MS);
      console.log(`  Rate limited (attempt ${attempt}/${MAX_RETRIES}). Waiting ${waitMs / 1000}s...`);
      await sleep(waitMs);
      continue;
    }

    const body = await response.text();
    console.error(`  API error ${response.status}: ${body}`);
    return null;
  }

  console.error(`  Failed after ${MAX_RETRIES} retries (rate limited)`);
  return null;
}

function printResults(results: NodeResult[]): void {
  for (const r of results) {
    const parts: string[] = [`  [${r.nodeType}] ${r.path}`];

    if (r.fillHex) {
      parts.push(`    Fill: ${r.fillHex} | ${r.fillRgb}`);
    }

    if (r.characters) {
      const truncated =
        r.characters.length > 80
          ? `${r.characters.slice(0, 80)}...`
          : r.characters;
      parts.push(`    Text: "${truncated}"`);
    }

    console.log(parts.join('\n'));
  }
}

async function main(): Promise<void> {
  const token = getEnvVar('FIGMA_API_TOKEN');
  const fileKey = getEnvVar('FIGMA_FILE_KEY');
  const skipIds = getSkipIds();

  console.log(`Figma file: ${fileKey}`);
  console.log(`Extracting ${FINISHED_PAGES.length} finished pages...\n`);

  if (skipIds.size > 0) {
    console.log(`Skipping page IDs: ${[...skipIds].join(', ')}\n`);
  }

  let requestCount = 0;

  for (const page of FINISHED_PAGES) {
    if (skipIds.has(page.id)) {
      console.log(`SKIPPED: ${page.name} (id: ${page.id})\n`);
      continue;
    }

    if (requestCount > 0) {
      console.log(`  (waiting ${DELAY_BETWEEN_REQUESTS_MS / 1000}s before next request...)\n`);
      await sleep(DELAY_BETWEEN_REQUESTS_MS);
    }

    console.log(`${'='.repeat(70)}`);
    console.log(`PAGE: ${page.name} (id: ${page.id})`);
    console.log(`${'='.repeat(70)}`);

    const document = await fetchPageNodes(fileKey, token, page.id);
    requestCount++;

    if (!document) {
      console.log('  (no data returned)\n');
      continue;
    }

    const results: NodeResult[] = [];
    walkNode(document, '', results);

    console.log(`  Found ${results.length} nodes with fills or text\n`);
    printResults(results);
    console.log('');
  }

  console.log('Done.');
}

main().catch((err: unknown) => {
  console.error('Extraction failed:', err);
  process.exit(1);
});
