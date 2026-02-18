// Phase 1: Extract data from Figma API and save as JSON
// Usage: npx tsx scripts/figma/extract.ts

import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { FIGMA_MAPPING } from './figma-mapping';
import type { BadgeColorData, BadgeSectionData, ExtractedProperty, FigmaColor, FigmaExtraction, FigmaNode } from './types';
import { buildNodePath, extractSolidFill, extractSolidFillWithOpacity, extractSolidStroke, figmaColorToRgb } from './utils';

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

function findSectionByName(
  root: FigmaNode,
  name: string,
): FigmaNode | undefined {
  const lowerName = name.toLowerCase();
  if (root.name.toLowerCase() === lowerName && (root.type === 'SECTION' || root.type === 'FRAME')) {
    return root;
  }
  for (const child of root.children ?? []) {
    const found = findSectionByName(child, name);
    if (found) return found;
  }
  return undefined;
}

function findTextChild(node: FigmaNode): FigmaNode | undefined {
  if (node.type === 'TEXT' && node.characters) return node;
  for (const child of node.children ?? []) {
    const found = findTextChild(child);
    if (found) return found;
  }
  return undefined;
}

function extractBadgeColorData(badge: FigmaNode): BadgeColorData | undefined {
  const fillData = extractSolidFillWithOpacity(badge);
  if (!fillData) return undefined;

  const strokeColor = extractSolidStroke(badge);
  const textNode = findTextChild(badge);
  const textFill = textNode ? extractSolidFill(textNode) : undefined;

  return {
    background: figmaColorToRgb(fillData.color),
    textColor: textFill ? figmaColorToRgb(textFill) : '255 255 255',
    borderColor: strokeColor ? figmaColorToRgb(strokeColor) : figmaColorToRgb(fillData.color),
    fillOpacity: fillData.opacity,
  };
}

function extractBadgesFromMode(
  modeFrame: FigmaNode,
): Record<string, BadgeColorData> {
  const badges: Record<string, BadgeColorData> = {};

  for (const child of modeFrame.children ?? []) {
    const textNode = findTextChild(child);
    if (!textNode?.characters) continue;

    const label = textNode.characters.trim().toUpperCase();
    const colorData = extractBadgeColorData(child);
    if (colorData) badges[label] = colorData;
  }

  return badges;
}

function extractBadgeSection(
  root: FigmaNode,
  sectionName: string,
): BadgeSectionData | undefined {
  const section = findSectionByName(root, sectionName);
  if (!section) return undefined;

  const lightFrame = (section.children ?? []).find(
    (c) => c.name.toLowerCase() === 'light',
  );
  const darkFrame = (section.children ?? []).find(
    (c) => c.name.toLowerCase() === 'dark',
  );

  if (!lightFrame && !darkFrame) return undefined;

  const light = lightFrame ? extractBadgesFromMode(lightFrame) : {};
  const dark = darkFrame ? extractBadgesFromMode(darkFrame) : {};

  if (Object.keys(light).length === 0 && Object.keys(dark).length === 0) return undefined;

  return { light, dark };
}

function extractBadges(
  document: FigmaNode,
): FigmaExtraction['badges'] {
  const severity = extractBadgeSection(document, 'severity');
  const sla = extractBadgeSection(document, 'sla');

  if (!severity && !sla) return undefined;

  console.log(
    `Badges: ${severity ? Object.keys(severity.light).length : 0} severity, ` +
    `${sla ? Object.keys(sla.light).length : 0} sla`,
  );

  return { severity, sla };
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
  extraction.badges = extractBadges(file.document);

  const outPath = resolve(import.meta.dirname, 'data/figma-extract.json');
  writeFileSync(outPath, JSON.stringify(extraction, null, 2));

  const lightCount = extraction.lightFrame.properties.length;
  const darkCount = extraction.darkFrame.properties.length;
  console.log(`Extracted ${lightCount} light + ${darkCount} dark properties`);
  if (extraction.badges) console.log('Badge data extracted successfully');
  console.log(`Written to: ${outPath}`);
}

main().catch((err: unknown) => {
  console.error('Extraction failed:', err);
  process.exit(1);
});
