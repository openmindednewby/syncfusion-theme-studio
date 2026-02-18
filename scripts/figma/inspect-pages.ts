// Quick inspection script to list all pages and their top-level frames with IDs
// Usage: npx tsx scripts/figma/inspect-pages.ts

import type { FigmaNode } from './types';

const FIGMA_API_BASE = 'https://api.figma.com/v1';

async function main(): Promise<void> {
  const token = process.env['FIGMA_API_TOKEN']!;
  const fileKey = process.env['FIGMA_FILE_KEY']!;

  // Fetch with depth=2 to get pages and their top-level children only
  const response = await fetch(`${FIGMA_API_BASE}/files/${fileKey}?depth=2`, {
    headers: { 'X-FIGMA-TOKEN': token },
  });

  const file = (await response.json()) as { name: string; document: FigmaNode };
  console.log(`File: ${file.name}\n`);

  for (const page of file.document.children ?? []) {
    const childCount = page.children?.length ?? 0;
    console.log(`PAGE: "${page.name}" (id: ${page.id}, ${childCount} top-level children)`);
    for (const child of page.children ?? []) {
      console.log(`  FRAME: "${child.name}" (id: ${child.id}, type: ${child.type})`);
    }
    console.log('');
  }
}

main().catch(console.error);
