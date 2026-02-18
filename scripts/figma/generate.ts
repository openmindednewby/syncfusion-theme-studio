// Phase 2: Generate figmaDesign.ts preset from extracted JSON + mapping config
// Usage: npx tsx scripts/figma/generate.ts

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { generatePresetCode } from './code-generators';
import { FIGMA_MAPPING } from './figma-mapping';
import type { ExtractedProperty, FigmaExtraction, FigmaPropertyType, MappingRule } from './types';
import type { FigmaColor } from './types';
import { deepSet, figmaColorToRgb } from './utils';

const EXTRACT_PATH = resolve(import.meta.dirname, 'data/figma-extract.json');
const OUTPUT_PATH = resolve(
  import.meta.dirname,
  '../../src/stores/theme/presets/figmaDesign.ts',
);

interface MappingResult {
  mapped: number;
  warnings: string[];
}

function loadExtraction(): FigmaExtraction {
  if (!existsSync(EXTRACT_PATH)) {
    console.error('No extraction data found. Run `npm run figma:extract` first.');
    process.exit(1);
  }
  const raw = readFileSync(EXTRACT_PATH, 'utf-8');
  return JSON.parse(raw) as FigmaExtraction;
}

function findProperty(
  properties: ExtractedProperty[],
  figmaPath: string,
  propertyType: FigmaPropertyType,
): ExtractedProperty | undefined {
  return properties.find((p) => {
    const pathWithoutFrame = p.nodePath.includes('/')
      ? p.nodePath.slice(p.nodePath.indexOf('/') + 1)
      : p.nodePath;
    return pathWithoutFrame === figmaPath && p.propertyType === propertyType;
  });
}

function resolveValue(prop: ExtractedProperty): string | undefined {
  if (prop.convertedValue) return prop.convertedValue;

  if (prop.propertyType === 'fill' || prop.propertyType === 'stroke')
    return figmaColorToRgb(prop.rawValue as FigmaColor);
  if (prop.propertyType === 'corner-radius') return `${prop.rawValue}px`;

  return undefined;
}

function applyMappings(
  theme: Record<string, unknown>,
  rules: MappingRule[],
  properties: ExtractedProperty[],
  result: MappingResult,
): void {
  for (const rule of rules) {
    const propertyType = rule.property ?? 'fill';
    const prop = findProperty(properties, rule.figmaPath, propertyType);

    if (!prop) {
      result.warnings.push(`Not found: "${rule.figmaPath}" (${propertyType}) -> ${rule.themePath}`);
      continue;
    }

    const value = resolveValue(prop);
    if (!value) {
      result.warnings.push(`Could not resolve: "${rule.figmaPath}" -> ${rule.themePath}`);
      continue;
    }

    deepSet(theme, rule.themePath, value);
    result.mapped++;
  }
}

function main(): void {
  const extraction = loadExtraction();
  console.log(`Source: ${extraction.fileName} (${extraction.extractedAt})`);

  const totalRules =
    FIGMA_MAPPING.sharedMappings.length +
    FIGMA_MAPPING.lightMappings.length +
    FIGMA_MAPPING.darkMappings.length;

  if (totalRules === 0) {
    console.log('\nNo mapping rules defined yet.');
    console.log('Run `npm run figma:discover` and edit figma-mapping.ts.');
    console.log('Generating preset with all defaults...');
  }

  const overrides: Record<string, unknown> = {};
  const result: MappingResult = { mapped: 0, warnings: [] };

  applyMappings(overrides, FIGMA_MAPPING.sharedMappings, extraction.lightFrame.properties, result);
  applyMappings(overrides, FIGMA_MAPPING.lightMappings, extraction.lightFrame.properties, result);
  applyMappings(overrides, FIGMA_MAPPING.darkMappings, extraction.darkFrame.properties, result);

  const code = generatePresetCode(extraction, overrides);
  writeFileSync(OUTPUT_PATH, code);

  console.log(`\nGenerated: ${OUTPUT_PATH}`);
  console.log(`${result.mapped}/${totalRules} properties mapped`);

  if (result.warnings.length > 0) {
    console.log(`${result.warnings.length} warnings:`);
    for (const warning of result.warnings) {
      console.log(`  - ${warning}`);
    }
  }
}

main();
