// Dedicated colours generation pipeline
// Reads figma-extract.json, maps color swatches to ColorScale shade keys,
// writes intermediate JSON for the main generator to merge into color overrides.
// Usage: npx tsx scripts/figma/generate-colours.ts

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

import type { ColourSwatchData, FigmaExtraction } from './types';

const EXTRACT_PATH = resolve(import.meta.dirname, 'data/figma-extract.json');
const SECTIONS_DIR = resolve(import.meta.dirname, 'data/figma-sections');
const OUTPUT_PATH = resolve(SECTIONS_DIR, 'colours.json');

/** Valid ColorScale shade keys */
const VALID_SHADES = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];

/** Valid StatusColor shade keys */
const VALID_STATUS_SHADES = ['50', '100', '200', '500', '700'];

function buildScaleOverrides(
  swatches: Record<string, ColourSwatchData>,
  validShades: string[],
): Record<string, string> {
  const result: Record<string, string> = {};

  for (const [shade, swatch] of Object.entries(swatches)) {
    if (validShades.includes(shade)) {
      result[shade] = swatch.rgb;
    }
  }

  return result;
}

function loadExtraction(): FigmaExtraction {
  if (!existsSync(EXTRACT_PATH)) {
    console.error(
      'No extraction data found. Run `npm run figma:extract` first.',
    );
    process.exit(1);
  }
  const raw = readFileSync(EXTRACT_PATH, 'utf-8');
  return JSON.parse(raw) as FigmaExtraction;
}

interface ColoursOutput {
  primary?: Record<string, string>;
  secondary?: Record<string, string>;
  neutral?: Record<string, string>;
  status?: Record<string, Record<string, string>>;
}

function main(): void {
  const extraction = loadExtraction();
  console.log(`Source: ${extraction.fileName} (${extraction.extractedAt})`);

  if (!extraction.colours) {
    console.log('No colour data in extraction. Skipping.');
    return;
  }

  const { primary, secondary, neutral, status } = extraction.colours;
  const output: ColoursOutput = {};

  const primaryOverrides = buildScaleOverrides(primary, VALID_SHADES);
  if (Object.keys(primaryOverrides).length > 0) {
    output.primary = primaryOverrides;
  }

  const secondaryOverrides = buildScaleOverrides(secondary, VALID_SHADES);
  if (Object.keys(secondaryOverrides).length > 0) {
    output.secondary = secondaryOverrides;
  }

  const neutralOverrides = buildScaleOverrides(neutral, VALID_SHADES);
  if (Object.keys(neutralOverrides).length > 0) {
    output.neutral = neutralOverrides;
  }

  const statusOverrides: Record<string, Record<string, string>> = {};
  for (const [statusKey, statusSwatches] of Object.entries(status)) {
    const shades = buildScaleOverrides(statusSwatches, VALID_STATUS_SHADES);
    if (Object.keys(shades).length > 0) {
      statusOverrides[statusKey] = shades;
    }
  }
  if (Object.keys(statusOverrides).length > 0) {
    output.status = statusOverrides;
  }

  mkdirSync(SECTIONS_DIR, { recursive: true });
  writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));

  const parts: string[] = [];
  if (output.primary) parts.push(`primary(${Object.keys(output.primary).length})`);
  if (output.secondary) parts.push(`secondary(${Object.keys(output.secondary).length})`);
  if (output.neutral) parts.push(`neutral(${Object.keys(output.neutral).length})`);
  if (output.status) parts.push(`status(${Object.keys(output.status).length})`);

  console.log(`Colour overrides: ${parts.join(', ')}`);
  console.log(`Written: ${OUTPUT_PATH}`);
}

main();
