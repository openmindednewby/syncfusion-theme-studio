// Dedicated button generation pipeline
// Reads figma-extract.json, maps button variants/states to theme fields,
// writes intermediate JSON for the main generator to consume.
// Usage: npx tsx scripts/figma/generate-buttons.ts

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

import type { ButtonVariantData, FigmaExtraction } from './types';

const EXTRACT_PATH = resolve(import.meta.dirname, 'data/figma-extract.json');
const SECTIONS_DIR = resolve(import.meta.dirname, 'data/figma-sections');
const OUTPUT_PATH = resolve(SECTIONS_DIR, 'buttons.json');

const VARIANT_MAP: Record<string, string> = {
  primary: 'primary',
  secondary: 'secondary',
  outline: 'outline',
  ghost: 'ghost',
  danger: 'danger',
};

function loadExtraction(): FigmaExtraction {
  if (!existsSync(EXTRACT_PATH)) {
    console.error('No extraction data found. Run `npm run figma:extract` first.');
    process.exit(1);
  }
  const raw = readFileSync(EXTRACT_PATH, 'utf-8');
  return JSON.parse(raw) as FigmaExtraction;
}

interface ButtonVariantOverride {
  background?: string;
  backgroundHover?: string;
  backgroundActive?: string;
  textColor?: string;
  textColorHover?: string;
  borderColor?: string;
  disabledBackground?: string;
  disabledTextColor?: string;
  disabledBorderColor?: string;
  disabledOpacity?: string;
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  lineHeight?: string;
  letterSpacing?: string;
  paddingTop?: string;
  paddingRight?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  gap?: string;
  borderRadius?: string;
  borderWidth?: string;
}

function mapVariantToOverride(data: ButtonVariantData): ButtonVariantOverride {
  const override: ButtonVariantOverride = {};

  if (data.default) {
    override.background = data.default.background;
    override.textColor = data.default.textColor;
    override.borderColor = data.default.borderColor;
    mapDefaultLayoutFields(override, data.default);
  }

  if (data.hover) {
    override.backgroundHover = data.hover.background;
    override.textColorHover = data.hover.textColor;
  }

  if (data.active) {
    override.backgroundActive = data.active.background;
  }

  if (data.disabled) {
    override.disabledBackground = data.disabled.background;
    override.disabledTextColor = data.disabled.textColor;
    override.disabledBorderColor = data.disabled.borderColor;
    if (data.disabled.opacity) override.disabledOpacity = data.disabled.opacity;
  }

  return override;
}

function mapDefaultLayoutFields(
  override: ButtonVariantOverride,
  defaults: NonNullable<ButtonVariantData['default']>,
): void {
  if (defaults.fontFamily) override.fontFamily = defaults.fontFamily;
  if (defaults.fontSize) override.fontSize = defaults.fontSize;
  if (defaults.fontWeight) override.fontWeight = defaults.fontWeight;
  if (defaults.lineHeight) override.lineHeight = defaults.lineHeight;
  if (defaults.letterSpacing) override.letterSpacing = defaults.letterSpacing;
  if (defaults.paddingTop) override.paddingTop = defaults.paddingTop;
  if (defaults.paddingRight) override.paddingRight = defaults.paddingRight;
  if (defaults.paddingBottom) override.paddingBottom = defaults.paddingBottom;
  if (defaults.paddingLeft) override.paddingLeft = defaults.paddingLeft;
  if (defaults.gap) override.gap = defaults.gap;
  if (defaults.borderRadius) override.borderRadius = defaults.borderRadius;
  if (defaults.borderWidth) override.borderWidth = defaults.borderWidth;
}

function buildModeOverrides(
  modeData: Record<string, ButtonVariantData>,
): Record<string, ButtonVariantOverride> {
  const result: Record<string, ButtonVariantOverride> = {};

  for (const [figmaName, variantData] of Object.entries(modeData)) {
    const themeKey = VARIANT_MAP[figmaName.toLowerCase()];
    if (!themeKey) continue;

    const override = mapVariantToOverride(variantData);
    if (Object.keys(override).length > 0) result[themeKey] = override;
  }

  return result;
}

function main(): void {
  const extraction = loadExtraction();
  console.log(`Source: ${extraction.fileName} (${extraction.extractedAt})`);

  if (!extraction.buttons) {
    console.log('No button data in extraction. Skipping.');
    return;
  }

  const lightCount = Object.keys(extraction.buttons.light).length;
  const darkCount = Object.keys(extraction.buttons.dark).length;
  console.log(`Button variants: ${lightCount} light + ${darkCount} dark`);

  const output = {
    light: buildModeOverrides(extraction.buttons.light),
    dark: buildModeOverrides(extraction.buttons.dark),
  };

  mkdirSync(SECTIONS_DIR, { recursive: true });
  writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));

  const outputVariants = Object.keys(output.light).length;
  console.log(`Generated ${outputVariants} button variant overrides`);
  console.log(`Written: ${OUTPUT_PATH}`);
}

main();
