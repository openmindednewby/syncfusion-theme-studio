/**
 * Codemod: fix enforce-function-style/enforce-function-style ordering warnings.
 *
 * Reorders top-level module statements following zone ordering:
 *   Zone 1 (exports) -> Zone 2 (private functions) -> Zone 3 (constants)
 * Exempt statements (imports, types, re-exports, expression statements) stay put.
 *
 * Safety: after reordering each file, verifies that no non-hoisted variable
 * is referenced before its declaration. Files that fail verification are skipped.
 *
 * Multiple sort strategies are attempted (from most to least aggressive).
 * The best strategy that passes verification and reduces violations is used.
 *
 * Usage:
 *   node scripts/fix-ordering.mjs                    # fix all files
 *   node scripts/fix-ordering.mjs path/to/file.ts    # fix a single file
 *   node scripts/fix-ordering.mjs --dry-run           # preview
 *   node scripts/fix-ordering.mjs --verbose           # detailed output
 */

import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';
import { createRequire } from 'module';
import { resolve, relative } from 'path';

const require = createRequire(import.meta.url);
const ts = require('typescript');

const ROOT = resolve(import.meta.dirname, '..');
const DRY_RUN = process.argv.includes('--dry-run');
const VERBOSE = process.argv.includes('--verbose');
const argFile = process.argv.find(a =>
  !a.startsWith('--') && a !== process.argv[0] && a !== process.argv[1],
);
const singleFilePath = argFile ? resolve(argFile) : null;

// ---------------------------------------------------------------------------
// Zone classification — mirrors the ESLint rule exactly
// ---------------------------------------------------------------------------

function hasFunctionInit(stmt) {
  if (stmt.kind !== ts.SyntaxKind.VariableStatement) return false;
  const decls = stmt.declarationList.declarations;
  if (decls.length === 0) return false;
  const init = decls[0].initializer;
  if (!init) return false;
  return init.kind === ts.SyntaxKind.ArrowFunction ||
    init.kind === ts.SyntaxKind.FunctionExpression;
}

function hasExportModifier(stmt) {
  return stmt.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword) ?? false;
}

function isExemptStatement(stmt) {
  if (stmt.kind === ts.SyntaxKind.ImportDeclaration) return true;
  if (stmt.kind === ts.SyntaxKind.ImportEqualsDeclaration) return true;
  if (stmt.kind === ts.SyntaxKind.TypeAliasDeclaration) return true;
  if (stmt.kind === ts.SyntaxKind.InterfaceDeclaration) return true;
  if (stmt.kind === ts.SyntaxKind.EnumDeclaration) return true;
  if (stmt.kind === ts.SyntaxKind.ExportDeclaration && !stmt.exportClause) return true;
  if (stmt.kind === ts.SyntaxKind.ExportDeclaration && stmt.isTypeOnly) return true;
  if (stmt.kind === ts.SyntaxKind.ExportDeclaration && stmt.moduleSpecifier) return true;
  if (stmt.kind === ts.SyntaxKind.ExportDeclaration && stmt.exportClause &&
    stmt.exportClause.kind === ts.SyntaxKind.NamedExports &&
    stmt.exportClause.elements.length === 0) return true;
  if (stmt.kind === ts.SyntaxKind.ExpressionStatement) return true;
  return false;
}

function classifyZone(stmt) {
  if (isExemptStatement(stmt)) return 0;
  if (stmt.kind === ts.SyntaxKind.ExportDeclaration) return 1;
  if (stmt.kind === ts.SyntaxKind.ExportAssignment) return 1;
  if (hasExportModifier(stmt)) return 1;
  if (stmt.kind === ts.SyntaxKind.FunctionDeclaration) return 2;
  if (stmt.kind === ts.SyntaxKind.VariableStatement) {
    return hasFunctionInit(stmt) ? 2 : 3;
  }
  return 0;
}

// ---------------------------------------------------------------------------
// Identifier helpers
// ---------------------------------------------------------------------------

function getDeclaredNames(stmt) {
  const names = new Set();
  if (stmt.kind === ts.SyntaxKind.FunctionDeclaration && stmt.name) names.add(stmt.name.text);
  if (stmt.kind === ts.SyntaxKind.VariableStatement)
    for (const d of stmt.declarationList.declarations) collectBindings(d.name, names);
  return names;
}

function collectBindings(pat, names) {
  if (pat.kind === ts.SyntaxKind.Identifier) names.add(pat.text);
  else if (pat.kind === ts.SyntaxKind.ObjectBindingPattern || pat.kind === ts.SyntaxKind.ArrayBindingPattern)
    for (const el of pat.elements)
      if (el.kind !== ts.SyntaxKind.OmittedExpression) collectBindings(el.name, names);
}

function getAllIdentifiers(node) {
  const ids = new Set();
  const walk = (n) => {
    if (n.kind === ts.SyntaxKind.Identifier) ids.add(n.text);
    ts.forEachChild(n, walk);
  };
  ts.forEachChild(node, walk);
  return ids;
}

// ---------------------------------------------------------------------------
// Verification: no use-before-define violations in full statement list
// ---------------------------------------------------------------------------

/**
 * Check if a statement is an ExportDeclaration without moduleSpecifier
 * (e.g., `export { X, Y }` — NOT `export { X } from './foo'`).
 * These are "re-export from local scope" and the no-use-before-define rule
 * does NOT honor function hoisting for references within them.
 */
function isLocalExportDeclaration(stmt) {
  return stmt.kind === ts.SyntaxKind.ExportDeclaration && !stmt.moduleSpecifier;
}


function verifyOrder(orderedEntries) {
  const namePos = new Map();
  const nameHoisted = new Map();

  for (let i = 0; i < orderedEntries.length; i++) {
    const s = orderedEntries[i].stmt;
    const isHoisted = s.kind === ts.SyntaxKind.FunctionDeclaration;
    for (const name of getDeclaredNames(s)) {
      namePos.set(name, i);
      nameHoisted.set(name, isHoisted);
    }
  }

  for (let i = 0; i < orderedEntries.length; i++) {
    const stmt = orderedEntries[i].stmt;
    // For `export { X }` (local export declarations), even function
    // declarations are flagged by no-use-before-define with functions:false.
    // For ExpressionStatements (like X.displayName = 'X'), all refs must
    // be above regardless of hoisting.
    const ignoreHoisting = isLocalExportDeclaration(stmt) ||
      stmt.kind === ts.SyntaxKind.ExpressionStatement;

    for (const id of getAllIdentifiers(stmt)) {
      const pos = namePos.get(id);
      if (pos === undefined || pos === i) continue;
      if (!ignoreHoisting && nameHoisted.get(id)) continue;
      if (pos > i) return false;
    }
  }
  return true;
}

// ---------------------------------------------------------------------------
// Count violations (mirrors ESLint rule)
// ---------------------------------------------------------------------------

function countViolations(entries) {
  let maxZone = 0;
  let violations = 0;
  for (const e of entries) {
    if (e.zone === 0) continue;
    if (e.zone < maxZone) violations++;
    if (e.zone > maxZone) maxZone = e.zone;
  }
  return violations;
}

function needsFix(stmts) {
  let max = 0;
  for (const s of stmts) {
    const z = classifyZone(s);
    if (z === 0) continue;
    if (z < max) return true;
    if (z > max) max = z;
  }
  return false;
}

// ---------------------------------------------------------------------------
// Sort helpers
// ---------------------------------------------------------------------------

function stableSort(arr, keyFn) {
  return [...arr].sort((a, b) => {
    const ka = keyFn(a);
    const kb = keyFn(b);
    if (ka !== kb) return ka - kb;
    return a.idx - b.idx;
  });
}

function applySort(entries, sorted) {
  let neIdx = 0;
  return entries.map(e => e.exempt ? e : sorted[neIdx++]);
}

function sortChanged(nonExempt, sorted) {
  for (let i = 0; i < nonExempt.length; i++)
    if (nonExempt[i].idx !== sorted[i].idx) return true;
  return false;
}

function buildText(orderedEntries, originalEntries, sourceText, stmts, fileHeader) {
  // Ensure leading trivia (blank lines) is preserved correctly.
  // When the first non-exempt entry changes, its leading trivia might miss
  // the blank line that separates imports from code. Fix this by swapping
  // the leading whitespace between the original and new first non-exempt entry.
  const texts = orderedEntries.map(e => e.text);

  // Find the first non-exempt position
  let firstNE = -1;
  for (let i = 0; i < orderedEntries.length; i++) {
    if (!orderedEntries[i].exempt) { firstNE = i; break; }
  }

  if (firstNE >= 0) {
    // Find the original first non-exempt entry
    let origFirstNE = -1;
    for (let i = 0; i < originalEntries.length; i++) {
      if (!originalEntries[i].exempt) { origFirstNE = i; break; }
    }

    // If the first non-exempt entry changed, transfer its leading whitespace
    if (origFirstNE >= 0 && orderedEntries[firstNE].idx !== originalEntries[origFirstNE].idx) {
      const origText = originalEntries[origFirstNE].text;
      const newText = texts[firstNE];

      // Extract leading whitespace from original first non-exempt
      const origLeadingWS = origText.match(/^(\s*)/)?.[1] ?? '';
      const newLeadingWS = newText.match(/^(\s*)/)?.[1] ?? '';

      if (origLeadingWS !== newLeadingWS) {
        // Replace the leading whitespace of the new text with the original's
        texts[firstNE] = origLeadingWS + newText.slice(newLeadingWS.length);

        // The entry that was originally first but moved elsewhere needs
        // the old target's leading whitespace
        for (let i = 0; i < texts.length; i++) {
          if (i === firstNE) continue;
          if (orderedEntries[i].idx === originalEntries[origFirstNE].idx) {
            texts[i] = newLeadingWS + texts[i].slice((texts[i].match(/^(\s*)/)?.[1] ?? '').length);
            break;
          }
        }
      }
    }
  }

  const trailing = sourceText.slice(stmts[stmts.length - 1].getEnd());
  return fileHeader + texts.join('') + trailing;
}

// ---------------------------------------------------------------------------
// Core reorder logic
// ---------------------------------------------------------------------------

function reorderFile(filePath) {
  const sourceText = readFileSync(filePath, 'utf8');
  const sourceFile = ts.createSourceFile(
    filePath, sourceText, ts.ScriptTarget.Latest, true,
    filePath.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );

  const stmts = sourceFile.statements;
  if (stmts.length === 0) return null;
  if (!needsFix(stmts)) return null;

  const firstStart = stmts[0].getStart(sourceFile);
  const fileHeader = sourceText.slice(stmts[0].getFullStart(), firstStart);

  const entries = [];
  for (let i = 0; i < stmts.length; i++) {
    const stmt = stmts[i];
    const zone = classifyZone(stmt);
    const text = i === 0
      ? sourceText.slice(firstStart, stmt.getEnd())
      : sourceText.slice(stmt.getFullStart(), stmt.getEnd());
    entries.push({ idx: i, zone, text, exempt: zone === 0, stmt });
  }

  const originalV = countViolations(entries);
  const nonExempt = entries.filter(e => !e.exempt);

  // Try strategies from most to least aggressive.
  // Each strategy is a function mapping zone -> sort key.
  const strategies = [
    // Full: 1 < 2 < 3
    { name: 'full', key: (z) => z },
    // Exports and functions together before constants
    { name: 'exp+fn<const', key: (z) => z === 3 ? 2 : 1 },
    // Functions first, then exports, then constants
    { name: 'fn<exp<const', key: (z) => z === 2 ? 1 : z === 1 ? 2 : 3 },
    // Only exports first
    { name: 'exp first', key: (z) => z === 1 ? 1 : 2 },
    // Only functions before constants (exports keep position relative to constants)
    { name: 'fn<const', key: (z) => z === 2 ? 1 : 2 },
  ];

  let bestText = null;
  let bestV = originalV;

  for (const { name, key } of strategies) {
    const sorted = stableSort(nonExempt, (e) => key(e.zone));
    if (!sortChanged(nonExempt, sorted)) continue;

    const newOrder = applySort(entries, sorted);
    const newV = countViolations(newOrder);
    if (newV >= bestV) continue;
    if (!verifyOrder(newOrder)) continue;

    bestV = newV;
    bestText = buildText(newOrder, entries, sourceText, stmts, fileHeader);
    if (VERBOSE && name !== 'full') console.log(`  [${name}] ${relative(ROOT, filePath)}`);
    if (bestV === 0) break;
  }

  if (bestText === null) return { skippedReason: 'no-safe-reorder' };
  if (bestText === sourceText) return null;
  return bestText;
}

// ---------------------------------------------------------------------------
// File listing
// ---------------------------------------------------------------------------

function getAffectedFiles() {
  if (singleFilePath) return [singleFilePath];

  const eslintPath = resolve(ROOT, 'scripts/eslint-output.json');
  let output;
  try {
    output = readFileSync(eslintPath, 'utf8');
  } catch {
    console.log('Running ESLint to find affected files...');
    try {
      output = execSync(
        'npx eslint --format json "src/**/*.{ts,tsx}"',
        { cwd: ROOT, maxBuffer: 50 * 1024 * 1024, encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] },
      );
    } catch (err) {
      output = err.stdout || '';
    }
  }

  const data = JSON.parse(output);
  const files = [];
  for (const f of data) {
    const hasOrdering = f.messages.some(
      m => m.ruleId === 'enforce-function-style/enforce-function-style' &&
        m.message && !m.message.startsWith('Use a function declaration'),
    );
    if (hasOrdering) files.push(f.filePath);
  }
  return files;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  const files = getAffectedFiles();
  console.log(`Found ${files.length} files with ordering issues.`);

  let changedCount = 0;
  let skippedNoop = 0;
  let skippedUnsafe = 0;
  let errorCount = 0;

  for (const filePath of files) {
    try {
      const result = reorderFile(filePath);
      if (result === null) { skippedNoop++; continue; }
      if (typeof result === 'object' && result.skippedReason) {
        skippedUnsafe++;
        if (VERBOSE) console.log(`  SKIP: ${relative(ROOT, filePath)}`);
        continue;
      }
      if (DRY_RUN) { changedCount++; continue; }
      writeFileSync(filePath, result, 'utf8');
      changedCount++;
      if (VERBOSE) console.log(`  FIXED: ${relative(ROOT, filePath)}`);
    } catch (err) {
      errorCount++;
      console.error(`ERROR in ${relative(ROOT, filePath)}: ${err.message}`);
    }
  }

  console.log('\nResults:');
  console.log(`  Changed: ${changedCount}`);
  console.log(`  Skipped (no change needed): ${skippedNoop}`);
  console.log(`  Skipped (unsafe to reorder): ${skippedUnsafe}`);
  console.log(`  Errors: ${errorCount}`);
}

main();
