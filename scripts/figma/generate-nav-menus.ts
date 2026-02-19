// Dedicated nav menu generation pipeline
// Reads figma-extract.json, maps nav menu colors to theme MenuConfig fields,
// writes intermediate JSON for the main generator to consume.
// Usage: npx tsx scripts/figma/generate-nav-menus.ts

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

import type { FigmaExtraction, NavMenuColorData } from './types';

const EXTRACT_PATH = resolve(import.meta.dirname, 'data/figma-extract.json');
const SECTIONS_DIR = resolve(import.meta.dirname, 'data/figma-sections');
const OUTPUT_PATH = resolve(SECTIONS_DIR, 'menu.json');

function loadExtraction(): FigmaExtraction {
  if (!existsSync(EXTRACT_PATH)) {
    console.error('No extraction data found. Run `npm run figma:extract` first.');
    process.exit(1);
  }
  const raw = readFileSync(EXTRACT_PATH, 'utf-8');
  return JSON.parse(raw) as FigmaExtraction;
}

interface MenuOverride {
  background?: string;
  textColor?: string;
  hoverBackground?: string;
  hoverTextColor?: string;
  activeBackground?: string;
  borderColor?: string;
  iconColor?: string;
  separatorColor?: string;
}

function mapModeToOverride(data: NavMenuColorData): MenuOverride {
  const override: MenuOverride = {};

  override.background = data.background;
  override.textColor = data.textColor;
  override.activeBackground = data.activeBackground;
  override.borderColor = data.borderColor;

  if (data.hoverBackground) override.hoverBackground = data.hoverBackground;
  if (data.hoverTextColor) override.hoverTextColor = data.hoverTextColor;
  if (data.iconColor) override.iconColor = data.iconColor;
  if (data.separatorColor) override.separatorColor = data.separatorColor;

  // Use activeTextColor as popupTextColor isn't a separate field in extraction
  // The menu popup inherits from the main menu colors

  return override;
}

function main(): void {
  const extraction = loadExtraction();
  console.log(`Source: ${extraction.fileName} (${extraction.extractedAt})`);

  if (!extraction.navMenus) {
    console.log('No nav menu data in extraction. Skipping.');
    return;
  }

  const lightOverride = mapModeToOverride(extraction.navMenus.light);
  const darkOverride = mapModeToOverride(extraction.navMenus.dark);

  const lightFields = Object.keys(lightOverride).length;
  const darkFields = Object.keys(darkOverride).length;
  console.log(`Nav menu overrides: ${lightFields} light + ${darkFields} dark fields`);

  const output = {
    light: lightOverride,
    dark: darkOverride,
  };

  mkdirSync(SECTIONS_DIR, { recursive: true });
  writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));
  console.log(`Written: ${OUTPUT_PATH}`);
}

main();
