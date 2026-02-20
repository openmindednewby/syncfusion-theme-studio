// Form controls generation pipeline (checkbox + radio)
// Reads figma-extract.json, maps form control data to theme fields,
// writes intermediate JSON for the main generator to consume.
// Usage: npx tsx scripts/figma/generate-form-controls.ts

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

import type {
  CheckboxExtractionData,
  FigmaExtraction,
  RadioExtractionData,
} from './types';

const EXTRACT_PATH = resolve(import.meta.dirname, 'data/figma-extract.json');
const SECTIONS_DIR = resolve(import.meta.dirname, 'data/figma-sections');

function loadExtraction(): FigmaExtraction {
  if (!existsSync(EXTRACT_PATH)) {
    console.error('No extraction data found. Run `npm run figma:extract` first.');
    process.exit(1);
  }
  const raw = readFileSync(EXTRACT_PATH, 'utf-8');
  return JSON.parse(raw) as FigmaExtraction;
}

function mapCheckbox(data: CheckboxExtractionData): Record<string, string> {
  const result: Record<string, string> = {};

  result.checkedBackground = data.checkedBackground;
  result.checkedBorderColor = data.checkedBorderColor;
  result.checkmarkColor = data.checkmarkColor;
  result.uncheckedBorderColor = data.uncheckedBorderColor;

  // Use checkedBackground for indeterminate as well
  result.indeterminateBackground = data.checkedBackground;

  if (data.disabledBackground) result.disabledBackground = data.disabledBackground;
  if (data.disabledBorderColor) result.disabledBorderColor = data.disabledBorderColor;
  if (data.size) result.size = data.size;
  if (data.borderRadius) result.borderRadius = data.borderRadius;

  return result;
}

function mapRadio(data: RadioExtractionData): Record<string, string> {
  const result: Record<string, string> = {};

  result.selectedBorderColor = data.selectedBorderColor;
  result.dotColor = data.dotColor;
  result.uncheckedBorderColor = data.uncheckedBorderColor;

  // Use dot color as selected background too
  result.selectedBackground = data.dotColor;

  // RadioConfig uses labelDisabledColor, not disabledBorderColor
  if (data.disabledLabelColor) result.labelDisabledColor = data.disabledLabelColor;
  if (data.size) result.size = data.size;

  return result;
}

function main(): void {
  const extraction = loadExtraction();
  console.log(`Source: ${extraction.fileName} (${extraction.extractedAt})`);

  if (!extraction.formControls) {
    console.log('No form control data in extraction. Skipping.');
    return;
  }

  mkdirSync(SECTIONS_DIR, { recursive: true });

  // Generate checkbox overrides
  if (extraction.formControls.checkbox) {
    const lightData = mapCheckbox(extraction.formControls.checkbox.light);
    const darkData = mapCheckbox(extraction.formControls.checkbox.dark);

    const output = { light: lightData, dark: darkData };
    const outPath = resolve(SECTIONS_DIR, 'checkbox.json');
    writeFileSync(outPath, JSON.stringify(output, null, 2));

    console.log(`Checkbox: ${Object.keys(lightData).length} overrides → ${outPath}`);
  }

  // Generate radio overrides
  if (extraction.formControls.radio) {
    const lightData = mapRadio(extraction.formControls.radio.light);
    const darkData = mapRadio(extraction.formControls.radio.dark);

    const output = { light: lightData, dark: darkData };
    const outPath = resolve(SECTIONS_DIR, 'radio.json');
    writeFileSync(outPath, JSON.stringify(output, null, 2));

    console.log(`Radio: ${Object.keys(lightData).length} overrides → ${outPath}`);
  }
}

main();
