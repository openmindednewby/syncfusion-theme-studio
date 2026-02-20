// Dedicated nav menu generation pipeline
// Reads figma-extract.json, maps nav menu colors to theme MenuConfig + SidebarComponentConfig fields,
// writes intermediate JSON for the main generator to consume.
// NavMenu and Sidebar share the same Figma source — the navigation menu component.
// Usage: npx tsx scripts/figma/generate-nav-menus.ts

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

import type { FigmaExtraction, NavMenuColorData } from './types';

const EXTRACT_PATH = resolve(import.meta.dirname, 'data/figma-extract.json');
const SECTIONS_DIR = resolve(import.meta.dirname, 'data/figma-sections');
const MENU_OUTPUT_PATH = resolve(SECTIONS_DIR, 'menu.json');
const SIDEBAR_OUTPUT_PATH = resolve(SECTIONS_DIR, 'sidebar.json');

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

interface SidebarOverride {
  background?: string;
  textColor?: string;
  activeItemBackground?: string;
  activeItemTextColor?: string;
  hoverItemBackground?: string;
  borderRight?: string;
  searchHighlightColor?: string;
}

function mapModeToMenuOverride(data: NavMenuColorData): MenuOverride {
  const override: MenuOverride = {};

  override.background = data.background;
  override.textColor = data.textColor;
  override.activeBackground = data.activeBackground;
  override.borderColor = data.borderColor;

  if (data.hoverBackground) override.hoverBackground = data.hoverBackground;
  if (data.hoverTextColor) override.hoverTextColor = data.hoverTextColor;
  if (data.iconColor) override.iconColor = data.iconColor;
  if (data.separatorColor) override.separatorColor = data.separatorColor;

  return override;
}

function mapModeToSidebarOverride(data: NavMenuColorData): SidebarOverride {
  const override: SidebarOverride = {};

  override.background = data.background;
  override.textColor = data.textColor;
  override.activeItemBackground = data.activeBackground;
  override.activeItemTextColor = data.activeTextColor;
  override.borderRight = data.borderColor;

  if (data.hoverBackground) override.hoverItemBackground = data.hoverBackground;

  // Use the active background color for search highlight consistency
  override.searchHighlightColor = data.activeBackground;

  return override;
}

function main(): void {
  const extraction = loadExtraction();
  console.log(`Source: ${extraction.fileName} (${extraction.extractedAt})`);

  if (!extraction.navMenus) {
    console.log('No nav menu data in extraction. Skipping.');
    return;
  }

  mkdirSync(SECTIONS_DIR, { recursive: true });

  // --- Menu overrides ---
  const lightMenuOverride = mapModeToMenuOverride(extraction.navMenus.light);
  const darkMenuOverride = mapModeToMenuOverride(extraction.navMenus.dark);

  const menuOutput = { light: lightMenuOverride, dark: darkMenuOverride };
  writeFileSync(MENU_OUTPUT_PATH, JSON.stringify(menuOutput, null, 2));
  console.log(`Menu overrides: ${Object.keys(lightMenuOverride).length} light + ${Object.keys(darkMenuOverride).length} dark fields`);
  console.log(`Written: ${MENU_OUTPUT_PATH}`);

  // --- Sidebar overrides (derived from the same nav menu source) ---
  const lightSidebarOverride = mapModeToSidebarOverride(extraction.navMenus.light);
  const darkSidebarOverride = mapModeToSidebarOverride(extraction.navMenus.dark);

  const sidebarOutput = { light: lightSidebarOverride, dark: darkSidebarOverride };
  writeFileSync(SIDEBAR_OUTPUT_PATH, JSON.stringify(sidebarOutput, null, 2));
  console.log(`Sidebar overrides: ${Object.keys(lightSidebarOverride).length} light + ${Object.keys(darkSidebarOverride).length} dark fields`);
  console.log(`Written: ${SIDEBAR_OUTPUT_PATH}`);
}

main();
