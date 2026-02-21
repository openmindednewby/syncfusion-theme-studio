// Dedicated dropdown generation pipeline
// Reads figma-extract.json, maps dropdown colors to SelectConfig properties,
// writes intermediate JSON for the main generator to consume.
// Usage: npx tsx scripts/figma/generate-dropdowns.ts

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

import type { DropdownColorData, FigmaExtraction } from './types';

const EXTRACT_PATH = resolve(import.meta.dirname, 'data/figma-extract.json');
const SECTIONS_DIR = resolve(import.meta.dirname, 'data/figma-sections');
const OUTPUT_PATH = resolve(SECTIONS_DIR, 'select.json');

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

/** Maps DropdownColorData fields to SelectConfig property names */
function buildModeOverrides(data: DropdownColorData): Record<string, string> {
  const result: Record<string, string> = {
    background: data.background,
    borderDefault: data.borderColor,
    popupBorderColor: data.borderColor,
    textColor: data.textColor,
    placeholderColor: data.textColor,
    iconColor: data.iconColor,
    popupBackground: data.itemBackground,
    itemTextColor: data.itemTextColor,
  };

  if (data.borderRadius) result['borderRadius'] = data.borderRadius;
  if (data.fontSize) result['itemFontSize'] = data.fontSize;

  return result;
}

function main(): void {
  const extraction = loadExtraction();
  console.log(`Source: ${extraction.fileName} (${extraction.extractedAt})`);

  if (!extraction.dropdowns) {
    console.log('No dropdown data in extraction. Skipping.');
    return;
  }

  const { light, dark } = extraction.dropdowns;
  const output = {
    light: buildModeOverrides(light),
    dark: buildModeOverrides(dark),
  };

  mkdirSync(SECTIONS_DIR, { recursive: true });
  writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));

  console.log(`Light properties: ${Object.keys(output.light).join(', ')}`);
  console.log(`Dark properties: ${Object.keys(output.dark).join(', ')}`);
  console.log(`Written: ${OUTPUT_PATH}`);
}

main();
