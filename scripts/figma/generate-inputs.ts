// Dedicated input generation pipeline
// Reads figma-extract.json, maps input state labels to InputsConfig properties,
// writes intermediate JSON for the main generator to consume.
// Usage: npx tsx scripts/figma/generate-inputs.ts

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

import type { FigmaExtraction, InputColorData, InputSectionData } from './types';

const EXTRACT_PATH = resolve(import.meta.dirname, 'data/figma-extract.json');
const SECTIONS_DIR = resolve(import.meta.dirname, 'data/figma-sections');
const OUTPUT_PATH = resolve(SECTIONS_DIR, 'inputs.json');

/**
 * Maps Figma state labels to InputsConfig property names.
 * Each state label can contribute one or more properties.
 */
const STATE_PROPERTY_MAP: Record<string, (data: InputColorData) => Record<string, string>> = {
  DEFAULT: (data) => ({
    background: data.background,
    borderDefault: data.borderColor,
    textColor: data.textColor,
  }),
  HOVER: (data) => ({
    borderHover: data.borderColor,
  }),
  FOCUS: (data) => ({
    borderFocus: data.borderColor,
    focusRingColor: data.borderColor,
  }),
  ERROR: (data) => ({
    borderError: data.borderColor,
    errorTextColor: data.textColor,
  }),
  PLACEHOLDER: (data) => ({
    placeholderColor: data.textColor,
  }),
  LABEL: (data) => ({
    labelColor: data.textColor,
  }),
  HELPER: (data) => ({
    helperTextColor: data.textColor,
  }),
};

function loadExtraction(): FigmaExtraction {
  if (!existsSync(EXTRACT_PATH)) {
    console.error('No extraction data found. Run `npm run figma:extract` first.');
    process.exit(1);
  }
  const raw = readFileSync(EXTRACT_PATH, 'utf-8');
  return JSON.parse(raw) as FigmaExtraction;
}

function buildModeOverrides(
  modeData: Record<string, InputColorData>,
): Record<string, string> {
  const result: Record<string, string> = {};

  for (const [label, colorData] of Object.entries(modeData)) {
    const mapper = STATE_PROPERTY_MAP[label];
    if (mapper) {
      Object.assign(result, mapper(colorData));
    }
  }

  // Extract borderRadius from any state that has it
  for (const colorData of Object.values(modeData)) {
    if (colorData.cornerRadius) {
      result['borderRadius'] = colorData.cornerRadius;
      break;
    }
  }

  return result;
}

function main(): void {
  const extraction = loadExtraction();
  console.log(`Source: ${extraction.fileName} (${extraction.extractedAt})`);

  if (!extraction.inputs) {
    console.log('No input data in extraction. Skipping.');
    return;
  }

  const inputs: InputSectionData = extraction.inputs;
  const lightCount = Object.keys(inputs.light).length;
  const darkCount = Object.keys(inputs.dark).length;
  console.log(`Input states: ${lightCount} light + ${darkCount} dark`);

  const output = {
    light: buildModeOverrides(inputs.light),
    dark: buildModeOverrides(inputs.dark),
  };

  mkdirSync(SECTIONS_DIR, { recursive: true });
  writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));

  console.log(`Light properties: ${Object.keys(output.light).join(', ')}`);
  console.log(`Dark properties: ${Object.keys(output.dark).join(', ')}`);
  console.log(`Written: ${OUTPUT_PATH}`);
}

main();
