// Post-processing corrections for Figma section data.
// Loads JSON files from figma-corrections/ and deep-merges them on top of section overrides.

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import type { ComponentSectionOverrides } from './code-generators';
import { deepMerge } from './utils';

/**
 * Apply correction files on top of loaded component sections.
 * Each JSON in correctionsDir is matched by filename to a section key.
 * Correction values are deep-merged over the section (corrections win).
 */
export function deepMergeCorrections(
  sections: Record<string, ComponentSectionOverrides>,
  correctionsDir: string,
): Record<string, ComponentSectionOverrides> {
  if (!existsSync(correctionsDir)) return sections;

  const files = readdirSync(correctionsDir).filter((f) => f.endsWith('.json'));
  if (files.length === 0) return sections;

  const result = { ...sections };

  for (const file of files) {
    const name = file.replace('.json', '');
    const section = result[name];
    if (!section) {
      console.warn(`Correction "${file}" has no matching section — skipped`);
      continue;
    }

    const raw = readFileSync(resolve(correctionsDir, file), 'utf-8');
    const correction = JSON.parse(raw) as Partial<ComponentSectionOverrides>;

    result[name] = deepMerge(section as Record<string, unknown>, correction as Record<string, unknown>) as unknown as ComponentSectionOverrides;
    console.log(`Applied correction: ${file}`);
  }

  return result;
}
