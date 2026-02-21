// Dedicated typography generation pipeline
// Reads figma-extract.json, maps text styles to TypographyConfig + TypographyComponentsConfig,
// writes intermediate JSON for the main generator to consume.
// Usage: npx tsx scripts/figma/generate-typography.ts

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

import type { FigmaExtraction, TypographyExtractionStyle } from './types';

const EXTRACT_PATH = resolve(import.meta.dirname, 'data/figma-extract.json');
const SECTIONS_DIR = resolve(import.meta.dirname, 'data/figma-sections');
const OUTPUT_PATH = resolve(SECTIONS_DIR, 'typography.json');

/** Font size to scale key mapping (px -> scale key) */
const FONT_SIZE_SCALE: [number, string][] = [
  [12, 'xs'],
  [14, 'sm'],
  [16, 'base'],
  [18, 'lg'],
  [20, 'xl'],
  [24, '2xl'],
  [30, '3xl'],
];

/** Font weight to scale key mapping */
const FONT_WEIGHT_SCALE: [number, string][] = [
  [300, 'light'],
  [400, 'normal'],
  [500, 'medium'],
  [600, 'semibold'],
  [700, 'bold'],
];

/** Line height ratio to scale key mapping */
const LINE_HEIGHT_SCALE: [number, string][] = [
  [1.25, 'tight'],
  [1.5, 'normal'],
  [1.75, 'relaxed'],
];

/** Letter spacing to scale key mapping */
const LETTER_SPACING_SCALE: [number, string][] = [
  [-0.025, 'tight'],
  [0, 'normal'],
  [0.025, 'wide'],
];

function findClosest(value: number, scale: [number, string][]): string {
  let closest = scale[0]![1];
  let minDist = Math.abs(value - scale[0]![0]);

  for (const [threshold, key] of scale) {
    const dist = Math.abs(value - threshold);
    if (dist < minDist) {
      minDist = dist;
      closest = key;
    }
  }

  return closest;
}

function parsePx(value: string | undefined): number | undefined {
  if (!value) return undefined;
  const match = value.match(/^([\d.]+)px$/);
  return match ? parseFloat(match[1]!) : undefined;
}

function parseEm(value: string | undefined): number | undefined {
  if (!value) return undefined;
  const match = value.match(/^(-?[\d.]+)em$/);
  return match ? parseFloat(match[1]!) : undefined;
}

interface TypographyOutput {
  typography?: {
    fontSans?: string;
    fontSize?: Record<string, string>;
  };
  typographyComponents?: Record<string, Record<string, string>>;
}

function mapLevelToComponent(
  level: string,
  style: TypographyExtractionStyle,
): Record<string, string> | undefined {
  const result: Record<string, string> = {};

  const fontSize = parsePx(style.fontSize);
  if (fontSize !== undefined) {
    result['fontSize'] = findClosest(fontSize, FONT_SIZE_SCALE);
  }

  const fontWeight = style.fontWeight ? parseInt(style.fontWeight, 10) : undefined;
  if (fontWeight !== undefined) {
    result['fontWeight'] = findClosest(fontWeight, FONT_WEIGHT_SCALE);
  }

  if (style.lineHeight && style.fontSize) {
    const lh = parsePx(style.lineHeight);
    const fs = parsePx(style.fontSize);
    if (lh !== undefined && fs !== undefined && fs > 0) {
      const ratio = lh / fs;
      result['lineHeight'] = findClosest(ratio, LINE_HEIGHT_SCALE);
    }
  }

  const letterSpacing = parseEm(style.letterSpacing);
  if (letterSpacing !== undefined) {
    result['letterSpacing'] = findClosest(letterSpacing, LETTER_SPACING_SCALE);
  }

  return Object.keys(result).length > 0 ? result : undefined;
}

function loadExtraction(): FigmaExtraction {
  if (!existsSync(EXTRACT_PATH)) {
    console.error('No extraction data found. Run `npm run figma:extract` first.');
    process.exit(1);
  }
  const raw = readFileSync(EXTRACT_PATH, 'utf-8');
  return JSON.parse(raw) as FigmaExtraction;
}

function main(): void {
  const extraction = loadExtraction();
  console.log(`Source: ${extraction.fileName} (${extraction.extractedAt})`);

  if (!extraction.typography) {
    console.log('No typography data in extraction. Skipping.');
    return;
  }

  const { fontFamily, levels } = extraction.typography;
  const output: TypographyOutput = {};

  // Map font family override
  if (fontFamily) {
    output.typography = { fontSans: fontFamily };
  }

  // Map font size overrides from actual extracted pixel values
  const fontSizeOverrides: Record<string, string> = {};
  for (const [level, style] of Object.entries(levels)) {
    if (style.fontSize) {
      const pxVal = parsePx(style.fontSize);
      if (pxVal !== undefined) {
        const scaleKey = findClosest(pxVal, FONT_SIZE_SCALE);
        const remValue = `${pxVal / 16}rem`;
        fontSizeOverrides[scaleKey] = remValue;
      }
    }
  }
  if (Object.keys(fontSizeOverrides).length > 0) {
    output.typography = { ...output.typography, fontSize: fontSizeOverrides };
  }

  // Map heading/body levels to typography component config
  const components: Record<string, Record<string, string>> = {};
  for (const [level, style] of Object.entries(levels)) {
    const mapped = mapLevelToComponent(level, style);
    if (mapped) components[level] = mapped;
  }

  if (Object.keys(components).length > 0) {
    output.typographyComponents = components;
  }

  mkdirSync(SECTIONS_DIR, { recursive: true });
  writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));

  console.log(`Font family: ${fontFamily ?? '(none)'}`);
  console.log(`Font size overrides: ${Object.keys(fontSizeOverrides).join(', ') || '(none)'}`);
  console.log(`Component levels: ${Object.keys(components).join(', ') || '(none)'}`);
  console.log(`Written: ${OUTPUT_PATH}`);
}

main();
