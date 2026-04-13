/**
 * Safe wrapper: runs fix-function-ordering.mjs on files listed in a text file,
 * then compares ESLint error counts before vs after. Any file that gains new
 * errors is automatically reverted.
 *
 * Usage: node scripts/safe-fix-ordering.mjs <file-list.txt>
 */
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const listFile = process.argv[2];
if (!listFile) {
  console.error('Usage: node scripts/safe-fix-ordering.mjs <file-list.txt>');
  process.exit(1);
}

const files = fs.readFileSync(listFile, 'utf8').trim().split('\n').map((l) => l.trim()).filter(Boolean);
console.log(`${files.length} files to process`);

function getErrorsByFile() {
  try {
    const result = execSync(
      'npx eslint --rule "import/order: off" --format json .',
      { encoding: 'utf8', cwd: process.cwd(), stdio: ['pipe', 'pipe', 'pipe'], maxBuffer: 50 * 1024 * 1024 },
    );
    return parseErrors(result);
  } catch (e) {
    return parseErrors(e.stdout || '[]');
  }
}

function parseErrors(json) {
  const data = JSON.parse(json);
  const map = new Map();
  for (const f of data) {
    let errors = 0;
    for (const m of f.messages)
      if (m.severity === 2) errors++;
    if (errors > 0) map.set(f.filePath.replace(/\\/g, '/'), errors);
  }
  return map;
}

// Step 1: Baseline error counts
console.log('Collecting baseline errors...');
const baseline = getErrorsByFile();
const baselineTotal = [...baseline.values()].reduce((a, b) => a + b, 0);
console.log(`Baseline: ${baselineTotal} total errors in ${baseline.size} files`);

// Step 2: Save originals
const originals = new Map();
for (const f of files) originals.set(f, fs.readFileSync(f, 'utf8'));

// Step 3: Run codemod in batches
console.log(`\nRunning codemod...`);
const batchSize = 50;
for (let i = 0; i < files.length; i += batchSize) {
  const batch = files.slice(i, i + batchSize);
  const args = batch.map((f) => `"${f}"`).join(' ');
  try {
    const out = execSync(`node scripts/fix-function-ordering.mjs ${args}`, {
      encoding: 'utf8', cwd: process.cwd(),
    });
    // Print only "Fixed" lines
    for (const line of out.split('\n'))
      if (line.startsWith('  Fixed:')) process.stdout.write(line + '\n');
  } catch { /* non-fatal */ }
}

// Step 4: Post-codemod error counts
console.log('\nChecking for new errors...');
const after = getErrorsByFile();

// Step 5: Revert files with new errors
let fixed = 0;
let reverted = 0;
let unchanged = 0;
for (const f of files) {
  const current = fs.readFileSync(f, 'utf8');
  if (current === originals.get(f)) { unchanged++; continue; }

  const norm = f.replace(/\\/g, '/');
  const pre = baseline.get(norm) || 0;
  const post = after.get(norm) || 0;

  if (post > pre) {
    fs.writeFileSync(f, originals.get(f));
    reverted++;
    const rel = path.relative(process.cwd(), f);
    process.stdout.write(`  Reverted: ${rel} (${pre} → ${post} errors)\n`);
  } else {
    fixed++;
  }
}

const afterTotal = [...after.values()].reduce((a, b) => a + b, 0);
console.log(`\nResult: Fixed ${fixed} files, Reverted ${reverted}, Unchanged ${unchanged}`);
console.log(`Errors: ${baselineTotal} → ${afterTotal - reverted} (after reverts)`);
