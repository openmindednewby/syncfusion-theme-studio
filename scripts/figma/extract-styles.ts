// Extract all Figma styles (colors, text, effects) from the file
// Usage: npx tsx scripts/figma/extract-styles.ts

import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

import type { FigmaColor, FigmaNode } from './types';
import { figmaColorToRgb } from './utils';

const FIGMA_API_BASE = 'https://api.figma.com/v1';

interface FigmaStyle {
  key: string;
  name: string;
  style_type: string;
  node_id: string;
}

function hexFromColor(c: FigmaColor): string {
  const toHex = (v: number): string => Math.round(v * 255).toString(16).padStart(2, '0');
  return `#${toHex(c.r)}${toHex(c.g)}${toHex(c.b)}`.toUpperCase();
}

async function main(): Promise<void> {
  const token = process.env['FIGMA_API_TOKEN']!;
  const fileKey = process.env['FIGMA_FILE_KEY']!;

  // Step 1: Get all styles defined in the file
  console.log('Fetching file styles...');
  const stylesRes = await fetch(`${FIGMA_API_BASE}/files/${fileKey}/styles`, {
    headers: { 'X-FIGMA-TOKEN': token },
  });
  const stylesData = (await stylesRes.json()) as {
    meta: { styles: FigmaStyle[] };
  };

  const styles = stylesData.meta.styles;
  console.log(`Found ${styles.length} styles\n`);

  // Group styles by type
  const colorStyles = styles.filter((s) => s.style_type === 'FILL');
  const textStyles = styles.filter((s) => s.style_type === 'TEXT');
  const effectStyles = styles.filter((s) => s.style_type === 'EFFECT');

  console.log(`Color styles: ${colorStyles.length}`);
  console.log(`Text styles: ${textStyles.length}`);
  console.log(`Effect styles: ${effectStyles.length}\n`);

  // Step 2: Fetch the actual node data for color styles to get fill values
  if (colorStyles.length > 0) {
    const nodeIds = colorStyles.map((s) => s.node_id).join(',');
    console.log('Fetching color style node data...');

    const nodesRes = await fetch(
      `${FIGMA_API_BASE}/files/${fileKey}/nodes?ids=${nodeIds}`,
      { headers: { 'X-FIGMA-TOKEN': token } },
    );
    const nodesData = (await nodesRes.json()) as {
      nodes: Record<string, { document: FigmaNode }>;
    };

    console.log('\n=== COLOR STYLES ===\n');

    const colorOutput: Record<string, { hex: string; rgb: string }> = {};

    for (const style of colorStyles) {
      const node = nodesData.nodes[style.node_id]?.document;
      if (!node) continue;

      const fills = node.fills ?? [];
      const solidFill = fills.find(
        (f: { type: string; visible?: boolean }) => f.type === 'SOLID' && f.visible !== false,
      );

      if (solidFill?.color) {
        const color = solidFill.color as FigmaColor;
        const hex = hexFromColor(color);
        const rgb = figmaColorToRgb(color);
        colorOutput[style.name] = { hex, rgb };
        console.log(`${style.name.padEnd(40)} ${hex.padEnd(10)} rgb(${rgb})`);
      }
    }

    // Write to file for reference
    const outPath = resolve(import.meta.dirname, 'data/figma-styles.json');
    writeFileSync(outPath, JSON.stringify({ colors: colorOutput, textStyles: textStyles.map((s) => s.name), effectStyles: effectStyles.map((s) => s.name) }, null, 2));
    console.log(`\nWritten to: ${outPath}`);
  }

  // Step 3: Also fetch text style nodes for font info
  if (textStyles.length > 0) {
    const nodeIds = textStyles.map((s) => s.node_id).join(',');
    const nodesRes = await fetch(
      `${FIGMA_API_BASE}/files/${fileKey}/nodes?ids=${nodeIds}`,
      { headers: { 'X-FIGMA-TOKEN': token } },
    );
    const nodesData = (await nodesRes.json()) as {
      nodes: Record<string, { document: FigmaNode }>;
    };

    console.log('\n=== TEXT STYLES ===\n');

    for (const style of textStyles) {
      const node = nodesData.nodes[style.node_id]?.document;
      if (!node) continue;
      const s = node.style;
      if (s) {
        console.log(
          `${style.name.padEnd(30)} ` +
          `font: ${s.fontFamily ?? '?'}, size: ${s.fontSize ?? '?'}, weight: ${s.fontWeight ?? '?'}`,
        );
      }
    }
  }

  // Step 4: Effect styles
  if (effectStyles.length > 0) {
    console.log('\n=== EFFECT STYLES ===\n');
    for (const style of effectStyles) {
      console.log(`${style.name}`);
    }
  }
}

main().catch(console.error);
