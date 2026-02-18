// Dedicated badge generation pipeline
// Reads figma-extract.json, maps badge labels to theme variants,
// writes intermediate JSON for the main generator to consume.
// Usage: npx tsx scripts/figma/generate-badges.ts

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

import type { BadgeColorData, BadgeSectionData, FigmaExtraction } from './types';

const EXTRACT_PATH = resolve(import.meta.dirname, 'data/figma-extract.json');
const SECTIONS_DIR = resolve(import.meta.dirname, 'data/figma-sections');
const OUTPUT_PATH = resolve(SECTIONS_DIR, 'badges.json');

const SEVERITY_LABEL_MAP: Record<string, string> = {
  CRITICAL: 'error',
  HIGH: 'warning',
  MEDIUM: 'info',
  LOW: 'success',
};

const SLA_LABEL_MAP: Record<string, string> = {
  BREACHED: 'error',
  'AT RISK': 'warning',
  COMPLIANT: 'success',
};

function loadExtraction(): FigmaExtraction {
  if (!existsSync(EXTRACT_PATH)) {
    console.error('No extraction data found. Run `npm run figma:extract` first.');
    process.exit(1);
  }
  const raw = readFileSync(EXTRACT_PATH, 'utf-8');
  return JSON.parse(raw) as FigmaExtraction;
}

interface BadgeVariantOverride {
  background: string;
  textColor: string;
  borderColor: string;
}

function mapBadgeVariants(
  sectionData: BadgeSectionData | undefined,
  labelMap: Record<string, string>,
  mode: 'light' | 'dark',
): Record<string, BadgeVariantOverride> {
  if (!sectionData) return {};
  const modeData = sectionData[mode];
  const result: Record<string, BadgeVariantOverride> = {};

  for (const [label, variantKey] of Object.entries(labelMap)) {
    const colorData: BadgeColorData | undefined = modeData[label];
    if (!colorData) continue;
    result[variantKey] = {
      background: colorData.background,
      textColor: colorData.textColor,
      borderColor: colorData.borderColor,
    };
  }

  return result;
}

function buildModeOverrides(
  mode: 'light' | 'dark',
  badges: NonNullable<FigmaExtraction['badges']>,
): Record<string, BadgeVariantOverride> {
  const severityOverrides = mapBadgeVariants(badges.severity, SEVERITY_LABEL_MAP, mode);
  const slaOverrides = mapBadgeVariants(badges.sla, SLA_LABEL_MAP, mode);
  // Severity is primary source; SLA fills gaps for variants severity doesn't cover
  return { ...slaOverrides, ...severityOverrides };
}

function main(): void {
  const extraction = loadExtraction();
  console.log(`Source: ${extraction.fileName} (${extraction.extractedAt})`);

  if (!extraction.badges) {
    console.log('No badge data in extraction. Skipping.');
    return;
  }

  const sevCount = extraction.badges.severity
    ? Object.keys(extraction.badges.severity.light).length
    : 0;
  const slaCount = extraction.badges.sla
    ? Object.keys(extraction.badges.sla.light).length
    : 0;
  console.log(`Badge variants: ${sevCount} severity + ${slaCount} sla`);

  const output = {
    light: buildModeOverrides('light', extraction.badges),
    dark: buildModeOverrides('dark', extraction.badges),
  };

  mkdirSync(SECTIONS_DIR, { recursive: true });
  writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));
  console.log(`Written: ${OUTPUT_PATH}`);
}

main();
