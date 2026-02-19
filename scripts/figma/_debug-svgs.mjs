import { readFileSync } from 'node:fs';

const d = JSON.parse(readFileSync('scripts/figma/data/figma-extract.json', 'utf-8'));
const icons = d.icons.icons;

// Check several icons to understand the pattern
for (const name of ['airplay', 'camera', 'edit', 'heart', 'mail', 'star', 'wifi', 'x']) {
  const icon = icons.find(i => i.name === name);
  if (!icon) continue;
  const svg = icon.svgContent;
  const vb = svg.match(/viewBox="([^"]+)"/);
  const wh = svg.match(/width="(\d+)" height="(\d+)"/);
  // Find the last group of stroke-based paths
  const strokePaths = svg.match(/<path[^>]*stroke="black"[^>]*\/>/g) || [];
  const fillPaths = svg.match(/<path[^>]*fill="black"[^>]*\/>/g) || [];
  console.log(`${name}: vb=${vb?.[1]} size=${wh?.[1]}x${wh?.[2]} stroke=${strokePaths.length} fill=${fillPaths.length}`);

  // Show first coordinate of each stroke path to verify offset
  for (const p of strokePaths) {
    const dAttr = p.match(/d="([^"]{0,40})/);
    if (dAttr) console.log(`  stroke path start: ${dAttr[1]}`);
  }
}
