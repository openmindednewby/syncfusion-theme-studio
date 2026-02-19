// Dedicated text description generation pipeline
// Reads figma-extract.json, maps text description data to theme format,
// writes intermediate JSON for the main generator to consume.
// Usage: npx tsx scripts/figma/generate-text-description.ts

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

import type { FigmaExtraction } from './types';

const EXTRACT_PATH = resolve(import.meta.dirname, 'data/figma-extract.json');
const SECTIONS_DIR = resolve(import.meta.dirname, 'data/figma-sections');
const OUTPUT_PATH = resolve(SECTIONS_DIR, 'textDescription.json');

const DEFAULT_DARK_TEXT_COLOR = '180 190 210';

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

  if (!extraction.textDescription) {
    console.log('No text description data in extraction. Skipping.');
    return;
  }

  const { textDescription } = extraction;
  console.log(
    `Text Description: ${textDescription.fontFamily ?? 'unknown'} ` +
    `${textDescription.fontSize ?? '?'} / color ${textDescription.textColor}`,
  );

  const typography = {
    fontFamily: textDescription.fontFamily ?? 'Fira Sans',
    fontSize: textDescription.fontSize ?? '12px',
    fontWeight: textDescription.fontWeight ?? '400',
    lineHeight: textDescription.lineHeight ?? '20px',
    letterSpacing: textDescription.letterSpacing ?? '2%',
  };

  const output = {
    light: {
      textColor: textDescription.textColor,
      ...typography,
    },
    dark: {
      textColor: DEFAULT_DARK_TEXT_COLOR,
      ...typography,
    },
  };

  mkdirSync(SECTIONS_DIR, { recursive: true });
  writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));
  console.log(`Written: ${OUTPUT_PATH}`);
}

main();
