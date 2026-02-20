// Dedicated external link generation pipeline
// Reads figma-extract.json, maps external link data to theme format,
// writes intermediate JSON for the main generator to consume.
// Usage: npx tsx scripts/figma/generate-external-links.ts

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

import type { FigmaExtraction } from './types';

const EXTRACT_PATH = resolve(import.meta.dirname, 'data/figma-extract.json');
const SECTIONS_DIR = resolve(import.meta.dirname, 'data/figma-sections');
const OUTPUT_PATH = resolve(SECTIONS_DIR, 'externalLink.json');

const DEFAULT_LIGHT_TEXT_COLOR = '59 130 246';
const DEFAULT_LIGHT_HOVER_COLOR = '37 99 235';
const DEFAULT_LIGHT_DISABLED_COLOR = '156 163 175';
const DEFAULT_DARK_TEXT_COLOR = '96 165 250';
const DEFAULT_DARK_HOVER_COLOR = '147 197 253';
const DEFAULT_DARK_DISABLED_COLOR = '107 114 128';

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

  if (!extraction.externalLink) {
    console.log('No external link data in extraction. Skipping.');
    return;
  }

  const { externalLink } = extraction;
  console.log(
    `External Link: ${externalLink.fontFamily ?? 'unknown'} ` +
    `${externalLink.fontSize ?? '?'} / color ${externalLink.textColor}`,
  );

  const typography = {
    fontFamily: externalLink.fontFamily ?? 'inherit',
    fontSize: externalLink.fontSize ?? '0.875rem',
    fontWeight: externalLink.fontWeight ?? '500',
    lineHeight: externalLink.lineHeight ?? '1.5',
    letterSpacing: externalLink.letterSpacing ?? '0px',
  };

  const textDecoration = externalLink.textDecoration ?? 'none';
  const gap = externalLink.gap ?? '4px';

  const output = {
    light: {
      textColor: externalLink.textColor || DEFAULT_LIGHT_TEXT_COLOR,
      iconColor: externalLink.iconColor || DEFAULT_LIGHT_TEXT_COLOR,
      hoverTextColor: DEFAULT_LIGHT_HOVER_COLOR,
      hoverIconColor: DEFAULT_LIGHT_HOVER_COLOR,
      disabledTextColor: externalLink.disabledTextColor || DEFAULT_LIGHT_DISABLED_COLOR,
      disabledIconColor: externalLink.disabledIconColor || DEFAULT_LIGHT_DISABLED_COLOR,
      typography,
      textDecoration,
      gap,
      iconSize: '14px',
      transitionDuration: '150ms',
    },
    dark: {
      textColor: DEFAULT_DARK_TEXT_COLOR,
      iconColor: DEFAULT_DARK_TEXT_COLOR,
      hoverTextColor: DEFAULT_DARK_HOVER_COLOR,
      hoverIconColor: DEFAULT_DARK_HOVER_COLOR,
      disabledTextColor: DEFAULT_DARK_DISABLED_COLOR,
      disabledIconColor: DEFAULT_DARK_DISABLED_COLOR,
      typography,
      textDecoration,
      gap,
      iconSize: '14px',
      transitionDuration: '150ms',
    },
  };

  mkdirSync(SECTIONS_DIR, { recursive: true });
  writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));
  console.log(`Written: ${OUTPUT_PATH}`);
}

main();
