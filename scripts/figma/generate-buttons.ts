// Dedicated button generation pipeline
// Reads figma-extract.json, maps button variants/states to theme fields,
// writes intermediate JSON for the main generator to consume.
// Usage: npx tsx scripts/figma/generate-buttons.ts

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

import type { ButtonVariantData, FigmaExtraction } from './types';
import { deriveDarkOverrides, modesAreIdentical } from './generate-buttons-dark';
import type { ButtonVariantOverride } from './generate-buttons-helpers';
import { deriveHoverFromDefault, synthesizeDangerIfMissing } from './generate-buttons-helpers';

const EXTRACT_PATH = resolve(import.meta.dirname, 'data/figma-extract.json');
const SECTIONS_DIR = resolve(import.meta.dirname, 'data/figma-sections');
const OUTPUT_PATH = resolve(SECTIONS_DIR, 'buttons.json');

// ────────────────────────────────────────────────────────────────────

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

// ── Variant mapping ────────────────────────────────────────────────

function mapVariantToOverride(data: ButtonVariantData): ButtonVariantOverride {
  const override: ButtonVariantOverride = {};

  if (data.default) {
    override.background = data.default.background;
    override.textColor = data.default.textColor;
    override.borderColor = data.default.borderColor;
    if (data.default.borderRadius) override.borderRadius = data.default.borderRadius;
    if (data.default.borderWidth) override.borderWidth = data.default.borderWidth;
  }

  if (data.hover) {
    override.backgroundHover = data.hover.background;
    override.textColorHover = data.hover.textColor;
  } else if (data.default) {
    // Derive meaningful hover instead of copying default verbatim
    deriveHoverFromDefault(override);
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

// ── Shared property extraction ─────────────────────────────────────

/** Extract shared typography from the first variant with default state data */
function extractTypography(
  modeData: Record<string, ButtonVariantData>,
): Record<string, string> | undefined {
  for (const variantData of Object.values(modeData)) {
    const def = variantData.default;
    if (!def?.fontFamily) continue;
    const typo: Record<string, string> = {};
    if (def.fontFamily) typo.fontFamily = def.fontFamily;
    if (def.fontSize) typo.fontSize = def.fontSize;
    if (def.fontWeight) typo.fontWeight = def.fontWeight;
    if (def.lineHeight) typo.lineHeight = def.lineHeight;
    if (def.letterSpacing) typo.letterSpacing = def.letterSpacing;
    return Object.keys(typo).length > 0 ? typo : undefined;
  }
  return undefined;
}

/** Extract shared padding from the first variant with default state data */
function extractPadding(
  modeData: Record<string, ButtonVariantData>,
): Record<string, string> | undefined {
  for (const variantData of Object.values(modeData)) {
    const def = variantData.default;
    if (!def?.paddingTop) continue;
    const pad: Record<string, string> = {};
    if (def.paddingTop) pad.paddingTop = def.paddingTop;
    if (def.paddingRight) pad.paddingRight = def.paddingRight;
    if (def.paddingBottom) pad.paddingBottom = def.paddingBottom;
    if (def.paddingLeft) pad.paddingLeft = def.paddingLeft;
    return Object.keys(pad).length > 0 ? pad : undefined;
  }
  return undefined;
}

/** Extract shared gap from the first variant with default state data */
function extractGap(
  modeData: Record<string, ButtonVariantData>,
): string | undefined {
  for (const variantData of Object.values(modeData)) {
    if (variantData.default?.gap) return variantData.default.gap;
  }
  return undefined;
}

// ── Build + propagate ──────────────────────────────────────────────

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

/**
 * If a majority of variants share the same borderRadius, propagate it
 * to variants that are missing it (e.g., ghost/outline missing pill shape).
 */
function propagateSharedBorderRadius(
  overrides: Record<string, ButtonVariantOverride>,
): void {
  const radii = Object.values(overrides)
    .map((v) => v.borderRadius)
    .filter(Boolean) as string[];

  if (radii.length === 0) return;

  const counts = new Map<string, number>();
  for (const r of radii) {
    counts.set(r, (counts.get(r) ?? 0) + 1);
  }
  let dominant = '';
  let maxCount = 0;
  for (const [r, c] of counts) {
    if (c > maxCount) {
      dominant = r;
      maxCount = c;
    }
  }

  for (const variant of Object.values(overrides)) {
    if (!variant.borderRadius) {
      variant.borderRadius = dominant;
    }
  }
}

// ── Main pipeline ──────────────────────────────────────────────────

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

  const typography = extractTypography(extraction.buttons.light);
  const padding = extractPadding(extraction.buttons.light);
  const gap = extractGap(extraction.buttons.light);

  const lightOverrides = buildModeOverrides(extraction.buttons.light);
  let darkOverrides = buildModeOverrides(extraction.buttons.dark);

  // Check identity BEFORE danger synthesis (danger is always synthesized)
  const shouldDeriveDark = modesAreIdentical(lightOverrides, darkOverrides);

  // Synthesize danger variant if Figma didn't have one
  synthesizeDangerIfMissing(lightOverrides);

  if (shouldDeriveDark) {
    console.log('Light/dark identical — deriving dark overrides from light');
    darkOverrides = deriveDarkOverrides(lightOverrides);
  } else {
    synthesizeDangerIfMissing(darkOverrides);
  }

  // Propagate shared borderRadius to variants missing it
  propagateSharedBorderRadius(lightOverrides);
  propagateSharedBorderRadius(darkOverrides);

  writeOutput(lightOverrides, darkOverrides, typography, padding, gap);
}

function writeOutput(
  light: Record<string, ButtonVariantOverride>,
  dark: Record<string, ButtonVariantOverride>,
  typography?: Record<string, string>,
  padding?: Record<string, string>,
  gap?: string,
): void {
  const output: Record<string, unknown> = { light, dark };
  if (typography) output.typography = typography;
  if (padding) output.padding = padding;
  if (gap) output.gap = gap;

  mkdirSync(SECTIONS_DIR, { recursive: true });
  writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));

  console.log(`Generated ${Object.keys(light).length} button variant overrides`);
  console.log(`Written: ${OUTPUT_PATH}`);
}

main();
