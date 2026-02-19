import { readFileSync } from 'node:fs';

const data = JSON.parse(readFileSync('scripts/figma/data/figma-extract.json', 'utf-8'));

function findSection(node, name) {
  if (node.name && node.name.toLowerCase() === name.toLowerCase() && (node.type === 'SECTION' || node.type === 'FRAME')) return node;
  for (const child of node.children || []) {
    const f = findSection(child, name);
    if (f) return f;
  }
  return null;
}

const doc = data.document;
const section = findSection(doc, 'Icons');
if (!section) { console.log('No Icons section'); process.exit(0); }

console.log('Icons section:', section.name, section.type, section.id);
console.log('Direct children (rows):', section.children?.length);

// Show first 2 rows
for (const row of (section.children || []).slice(0, 2)) {
  console.log('\nRow:', row.name, row.type, row.id);
  console.log('Row children:', row.children?.length);

  for (const icon of (row.children || []).slice(0, 3)) {
    console.log('\n  Icon:', icon.name, icon.type, icon.id);
    console.log('  Size:', icon.absoluteBoundingBox || 'n/a');
    console.log('  Children:', icon.children?.length || 0);
    if (icon.children) {
      for (const child of icon.children.slice(0, 6)) {
        console.log('    Child:', child.name, child.type, child.id);
        if (child.children) {
          console.log('    Grandchildren:', child.children.length);
          for (const gc of child.children.slice(0, 3)) {
            console.log('      GC:', gc.name, gc.type, gc.id);
          }
        }
      }
    }
  }
}
