// Phase 1: Extract data from Figma API and save as JSON
// Usage: npx tsx scripts/figma/extract.ts

import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { FIGMA_MAPPING } from './figma-mapping';
import type { ExtractedProperty, FigmaColor, FigmaExtraction, FigmaNode } from './types';
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
    console.error('Create a .env file with FIGMA_API_TOKEN and FIGMA_FILE_KEY');
    process.exit(1);
  }
  return value;
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

function findFrameByName(root: FigmaNode, name: string): FigmaNode | undefined {
  if (root.name === name && (root.type === 'FRAME' || root.type === 'SECTION')) {
    return root;
  }

  for (const child of root.children ?? []) {
    const found = findFrameByName(child, name);
    if (found) return found;
  }

  return undefined;
}

function extractFillProperty(node: FigmaNode, nodePath: string): ExtractedProperty | undefined {
  const fillColor = extractSolidFill(node);
  if (!fillColor) return undefined;
  return {
    nodePath, nodeId: node.id, propertyType: 'fill',
    rawValue: fillColor, convertedValue: figmaColorToRgb(fillColor),
  };
}

function extractStrokeProperty(node: FigmaNode, nodePath: string): ExtractedProperty | undefined {
  const strokeColor = extractSolidStroke(node);
  if (!strokeColor) return undefined;
  return {
    nodePath, nodeId: node.id, propertyType: 'stroke',
    rawValue: strokeColor, convertedValue: figmaColorToRgb(strokeColor),
  };
}

function extractCornerRadius(node: FigmaNode, nodePath: string): ExtractedProperty | undefined {
  if (node.cornerRadius === undefined || node.cornerRadius <= 0) return undefined;
  return {
    nodePath, nodeId: node.id, propertyType: 'corner-radius',
    rawValue: node.cornerRadius, convertedValue: `${node.cornerRadius}px`,
  };
}

function extractTextStyle(node: FigmaNode, nodePath: string): ExtractedProperty | undefined {
  if (!node.style?.fontSize) return undefined;
  return {
    nodePath, nodeId: node.id, propertyType: 'text-style',
    rawValue: node.style,
    convertedValue: `${node.style.fontFamily ?? 'unknown'} ${node.style.fontSize}px`,
  };
}

function extractEffects(node: FigmaNode, nodePath: string): ExtractedProperty[] {
  return (node.effects ?? [])
    .filter((e) => e.visible !== false && e.color)
    .map((e) => ({
      nodePath, nodeId: node.id, propertyType: 'effect' as const,
      rawValue: e.color as FigmaColor,
      convertedValue: figmaColorToRgb(e.color as FigmaColor),
    }));
}

function extractNodeProperties(node: FigmaNode, parentPath: string): ExtractedProperty[] {
  const nodePath = buildNodePath(node.name, parentPath);
  const extractors = [extractFillProperty, extractStrokeProperty, extractCornerRadius, extractTextStyle];

  const properties: ExtractedProperty[] = extractors
    .map((fn) => fn(node, nodePath))
    .filter((p): p is ExtractedProperty => p !== undefined);

  properties.push(...extractEffects(node, nodePath));

  for (const child of node.children ?? []) {
    properties.push(...extractNodeProperties(child, nodePath));
  }

  return properties;
}

function buildExtraction(
  fileKey: string,
  fileName: string,
  lightFrame: FigmaNode | undefined,
  darkFrame: FigmaNode | undefined,
): FigmaExtraction {
  return {
    fileKey,
    fileName,
    extractedAt: new Date().toISOString(),
    lightFrame: {
      nodeId: lightFrame?.id ?? '',
      nodeName: lightFrame?.name ?? FIGMA_MAPPING.lightFrameSelector,
      properties: lightFrame ? extractNodeProperties(lightFrame, '') : [],
    },
    darkFrame: {
      nodeId: darkFrame?.id ?? '',
      nodeName: darkFrame?.name ?? FIGMA_MAPPING.darkFrameSelector,
      properties: darkFrame ? extractNodeProperties(darkFrame, '') : [],
    },
  };
}

async function main(): Promise<void> {
  const token = getEnvVar('FIGMA_API_TOKEN');
  const fileKey = getEnvVar('FIGMA_FILE_KEY');
  const file = await fetchFigmaFile(fileKey, token);
  console.log(`File: ${file.name}`);

  const lightFrame = findFrameByName(file.document, FIGMA_MAPPING.lightFrameSelector);
  const darkFrame = findFrameByName(file.document, FIGMA_MAPPING.darkFrameSelector);

  if (!lightFrame) console.warn(`Light frame "${FIGMA_MAPPING.lightFrameSelector}" not found.`);
  if (!darkFrame) console.warn(`Dark frame "${FIGMA_MAPPING.darkFrameSelector}" not found.`);

  const extraction = buildExtraction(fileKey, file.name, lightFrame, darkFrame);
  const outPath = resolve(import.meta.dirname, 'data/figma-extract.json');
  writeFileSync(outPath, JSON.stringify(extraction, null, 2));

  const lightCount = extraction.lightFrame.properties.length;
  const darkCount = extraction.darkFrame.properties.length;
  console.log(`Extracted ${lightCount} light + ${darkCount} dark properties`);
  console.log(`Written to: ${outPath}`);
}

main().catch((err: unknown) => {
  console.error('Extraction failed:', err);
  process.exit(1);
});
