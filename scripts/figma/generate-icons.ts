// Phase 2 (Icons): Generate React TSX icon components from Figma-extracted SVG data.
// Reads figma-extract.json → writes FeatherIcons*.tsx files.
// Usage: npx tsx scripts/figma/generate-icons.ts

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

import {
  buildComponent,
  codeLineCount,
  extractSvgInnerContent,
  fileHeader,
  MAX_CODE_LINES,
  splitGroup,
  toJsx,
  toPascalCase,
} from './icon-utils';
import type { FigmaExtraction, IconNodeData } from './types';

const EXTRACT_PATH = resolve(import.meta.dirname, 'data/figma-extract.json');
const ICONS_DIR = resolve(import.meta.dirname, '../../src/components/icons');

function loadExtraction(): FigmaExtraction {
  if (!existsSync(EXTRACT_PATH)) {
    console.error(`Extraction file not found: ${EXTRACT_PATH}`);
    console.error('Run "npm run figma:extract" first.');
    process.exit(1);
  }
  return JSON.parse(readFileSync(EXTRACT_PATH, 'utf-8')) as FigmaExtraction;
}

/** Convert an icon's SVG content to a JSX component string */
function iconToComponent(icon: IconNodeData): string {
  const innerContent = extractSvgInnerContent(icon.svgContent);
  const jsx = toJsx(innerContent);
  return buildComponent(icon.name, jsx);
}

function main(): void {
  const extraction = loadExtraction();
  const iconData = extraction.icons;

  if (!iconData || iconData.icons.length === 0) {
    console.error('No icon data in figma-extract.json.');
    console.error('Run "npm run figma:extract" to fetch icons from Figma.');
    process.exit(1);
  }

  const icons = iconData.icons.slice().sort((a, b) => a.name.localeCompare(b.name));
  console.log(`Generating components for ${icons.length} icons`);

  // Build a lookup from name → IconNodeData for the splitGroup callback
  const iconByName = new Map<string, IconNodeData>();
  for (const icon of icons) {
    iconByName.set(icon.name, icon);
  }

  // Group icons by first letter
  const groups = new Map<string, string[]>();
  for (const icon of icons) {
    const letter = icon.name.charAt(0).toUpperCase();
    const group = groups.get(letter) ?? [];
    group.push(icon.name);
    groups.set(letter, group);
  }

  const generatedFiles: Array<{
    fileName: string;
    count: number;
    totalLines: number;
    codeLines: number;
  }> = [];

  const sortedLetters = [...groups.keys()].sort();

  for (const letter of sortedLetters) {
    const names = groups.get(letter)!;
    const splits = splitGroup(letter, names, (name) => {
      const icon = iconByName.get(name)!;
      return iconToComponent(icon);
    });

    for (const { suffix, names: chunkNames } of splits) {
      const fileName = `FeatherIcons${suffix}.tsx`;
      const filePath = resolve(ICONS_DIR, fileName);

      const firstIcon = chunkNames[0]!;
      const lastIcon = chunkNames[chunkNames.length - 1]!;
      const range =
        chunkNames.length === 1
          ? toPascalCase(firstIcon)
          : `${toPascalCase(firstIcon)} \u2013 ${toPascalCase(lastIcon)}`;

      let content = fileHeader(range);

      for (const name of chunkNames) {
        const icon = iconByName.get(name)!;
        content += iconToComponent(icon) + '\n';
      }

      writeFileSync(filePath, content, 'utf-8');

      const totalLines = content.split('\n').length;
      const codeLines = codeLineCount(content);
      generatedFiles.push({ fileName, count: chunkNames.length, totalLines, codeLines });
      console.log(
        `  ${fileName}: ${chunkNames.length} icons, ${codeLines} code lines (${totalLines} total)`,
      );

      if (codeLines > MAX_CODE_LINES) {
        console.error(`  *** WARNING: ${fileName} exceeds ${MAX_CODE_LINES} code lines! ***`);
      }
    }
  }

  console.log(
    `\nGenerated ${generatedFiles.length} files with ${icons.length} icons total.`,
  );
}

main();
