/**
 * Codemod: Reorder module-level statements to comply with
 * enforce-function-style/enforce-function-style ordering rule.
 *
 * Expected order: exports (zone 1) → private functions (zone 2) → constants (zone 3).
 * Imports, types, interfaces, enums, re-exports (zone 0) are exempt and stay in place.
 *
 * Dependency-aware: respects @typescript-eslint/no-use-before-define by not
 * moving a statement above a const it references. Function declarations are
 * hoisted, so they can safely appear before const references.
 *
 * Also converts multi-statement const-assigned arrow/function expressions to
 * function declarations (except React components returning JSX).
 *
 * Usage: node scripts/fix-function-ordering.mjs [file1.ts file2.tsx ...]
 * If no files given, reads from stdin (one path per line).
 */

import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

// ---------------------------------------------------------------------------
// Statement classification (mirrors the ESLint rule logic)
// ---------------------------------------------------------------------------

function hasFunctionInit(stmt) {
  if (stmt.kind !== ts.SyntaxKind.VariableStatement) return false;
  const decl = stmt.declarationList.declarations[0];
  if (!decl?.initializer) return false;
  const k = decl.initializer.kind;
  return k === ts.SyntaxKind.ArrowFunction || k === ts.SyntaxKind.FunctionExpression;
}

function isExempt(stmt) {
  const k = stmt.kind;
  if (k === ts.SyntaxKind.ImportDeclaration) return true;
  if (k === ts.SyntaxKind.TypeAliasDeclaration) return true;
  if (k === ts.SyntaxKind.InterfaceDeclaration) return true;
  if (k === ts.SyntaxKind.EnumDeclaration) return true;
  if (k === ts.SyntaxKind.ExportDeclaration) {
    if (stmt.isTypeOnly) return true;
    if (stmt.moduleSpecifier) return true;
    if (!stmt.exportClause) return true;
  }
  return false;
}

function classifyZone(stmt) {
  if (isExempt(stmt)) return 0;
  if (stmt.kind === ts.SyntaxKind.ExportDeclaration) return 1;
  if (stmt.kind === ts.SyntaxKind.ExportAssignment) return 1;
  const isExported = stmt.modifiers?.some(
    (m) => m.kind === ts.SyntaxKind.ExportKeyword,
  );
  if (isExported) return 1;
  if (stmt.kind === ts.SyntaxKind.FunctionDeclaration) return 2;
  if (stmt.kind === ts.SyntaxKind.VariableStatement)
    return hasFunctionInit(stmt) ? 2 : 3;
  return 0;
}

// ---------------------------------------------------------------------------
// Identifier extraction
// ---------------------------------------------------------------------------

/** Get the name(s) defined by a top-level statement. */
function getDefinedNames(stmt) {
  const names = new Set();
  if (stmt.kind === ts.SyntaxKind.FunctionDeclaration && stmt.name)
    names.add(stmt.name.text);
  if (stmt.kind === ts.SyntaxKind.VariableStatement) {
    for (const d of stmt.declarationList.declarations)
      if (d.name.kind === ts.SyntaxKind.Identifier) names.add(d.name.text);
  }
  // Exported declarations: unwrap
  const decl =
    stmt.kind === ts.SyntaxKind.ExportAssignment
      ? null
      : stmt.declaration;
  if (decl) {
    if (decl.kind === ts.SyntaxKind.FunctionDeclaration && decl.name)
      names.add(decl.name.text);
    if (decl.kind === ts.SyntaxKind.VariableDeclaration)
      for (const d of decl.declarationList?.declarations ?? [])
        if (d.name.kind === ts.SyntaxKind.Identifier) names.add(d.name.text);
  }
  return names;
}

/** Collect all referenced identifier names from a statement's AST. */
function getReferencedNames(stmt, sourceFile) {
  const refs = new Set();
  const defined = getDefinedNames(stmt);
  function visit(node) {
    if (node.kind === ts.SyntaxKind.Identifier) {
      const name = node.text;
      if (!defined.has(name)) refs.add(name);
    }
    ts.forEachChild(node, visit);
  }
  ts.forEachChild(stmt, visit);
  return refs;
}

/** Check if a statement is a function declaration (hoisted). */
function isFunctionDeclaration(stmt) {
  if (stmt.kind === ts.SyntaxKind.FunctionDeclaration) return true;
  // Exported function declaration
  if (
    stmt.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword) &&
    stmt.kind === ts.SyntaxKind.FunctionDeclaration
  )
    return true;
  return false;
}

// ---------------------------------------------------------------------------
// Leading comments extraction
// ---------------------------------------------------------------------------

function getFullStatementText(source, stmts, index) {
  const stmt = stmts[index];
  const start = index === 0 ? 0 : stmts[index - 1].end;
  return source.slice(start, stmt.end);
}

// ---------------------------------------------------------------------------
// Style fix: convert const-assigned multi-statement arrow → function declaration
// ---------------------------------------------------------------------------

function containsJSX(text) {
  return /<[A-Z]/.test(text) || /return\s*\(?\s*</.test(text) || /<\//.test(text);
}

function tryConvertToFunctionDecl(stmtText, sourceFile, stmt) {
  if (stmt.kind !== ts.SyntaxKind.VariableStatement) return stmtText;

  const isExported = stmt.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword);
  const decl = stmt.declarationList.declarations[0];
  if (!decl?.initializer) return stmtText;

  const init = decl.initializer;
  const isArrow = init.kind === ts.SyntaxKind.ArrowFunction;
  const isFuncExpr = init.kind === ts.SyntaxKind.FunctionExpression;
  if (!isArrow && !isFuncExpr) return stmtText;
  if (isArrow && init.body.kind !== ts.SyntaxKind.Block) return stmtText;

  // Only convert multi-statement bodies (2+ statements).
  // Empty and single-statement arrows are fine as-is per the ESLint rule.
  const bodyBlock = init.body;
  if (bodyBlock.statements && bodyBlock.statements.length < 2) return stmtText;

  const bodyText = init.body.getText(sourceFile);
  if (containsJSX(bodyText)) return stmtText;

  const name = decl.name.getText(sourceFile);
  const typeParams = init.typeParameters
    ? `<${init.typeParameters.map((t) => t.getText(sourceFile)).join(', ')}>`
    : '';
  const params = init.parameters.map((p) => p.getText(sourceFile)).join(', ');
  const returnType = init.type ? `: ${init.type.getText(sourceFile)}` : '';
  const isAsync = init.modifiers?.some((m) => m.kind === ts.SyntaxKind.AsyncKeyword);

  const asyncPrefix = isAsync ? 'async ' : '';
  const exportPrefix = isExported ? 'export ' : '';
  const funcDecl = `${exportPrefix}${asyncPrefix}function ${name}${typeParams}(${params})${returnType} ${bodyText}`;

  const stmtStart = stmt.getStart(sourceFile);
  const stmtEnd = stmt.end;
  const stmtOriginal = sourceFile.text.slice(stmtStart, stmtEnd);

  return stmtText.replace(stmtOriginal, funcDecl);
}

// ---------------------------------------------------------------------------
// Dependency-aware reordering
// ---------------------------------------------------------------------------

/**
 * Reorder non-exempt items by zone, but respect dependencies.
 * If moving item X above item Y would cause X to reference a name
 * defined by Y (and Y is not a function declaration, i.e. not hoisted),
 * keep X after Y.
 */
function dependencyAwareSort(items, sourceFile) {
  // Build name→index mapping for definitions
  const nameToIndex = new Map();
  for (let i = 0; i < items.length; i++) {
    for (const name of getDefinedNames(items[i].stmt))
      nameToIndex.set(name, i);
  }

  // Build dependency edges: item i depends on item j if i references
  // a name defined by j and j is NOT a hoisted function declaration.
  //
  // Exception: `export { name }` declarations create deps on ALL referenced
  // items including function declarations, because @typescript-eslint/no-use-
  // before-define flags names in export specifiers even with functions: false.
  const deps = new Map(); // index → Set<index>
  for (let i = 0; i < items.length; i++) {
    const refs = getReferencedNames(items[i].stmt, sourceFile);
    const itemDeps = new Set();
    const isNamedExport = items[i].stmt.kind === ts.SyntaxKind.ExportDeclaration &&
      items[i].stmt.exportClause && !items[i].stmt.moduleSpecifier;
    for (const ref of refs) {
      const defIdx = nameToIndex.get(ref);
      if (defIdx !== undefined && defIdx !== i) {
        // Named exports (export { a, b }) must come after ALL definitions,
        // including function declarations, due to no-use-before-define.
        // Other statements only need to come after non-hoisted definitions.
        if (isNamedExport || !isFunctionDeclaration(items[defIdx].stmt))
          itemDeps.add(defIdx);
      }
    }
    deps.set(i, itemDeps);
  }

  // Topological sort with zone priority:
  // Try to place items in zone order, but respect dependencies.
  // Use a greedy approach: repeatedly pick the lowest-zone item
  // whose dependencies have all been placed.
  const placed = new Set();
  const result = [];
  const remaining = new Set(items.map((_, i) => i));

  while (remaining.size > 0) {
    // Find the best candidate: lowest zone, then original order
    let bestIdx = null;
    let bestZone = Infinity;
    let bestOrigIdx = Infinity;

    for (const idx of remaining) {
      // Check if all deps are placed
      const itemDeps = deps.get(idx);
      let allDepsPlaced = true;
      for (const dep of itemDeps) {
        if (!placed.has(dep)) {
          allDepsPlaced = false;
          break;
        }
      }
      if (!allDepsPlaced) continue;

      const zone = items[idx].zone;
      if (
        zone < bestZone ||
        (zone === bestZone && items[idx].index < bestOrigIdx)
      ) {
        bestIdx = idx;
        bestZone = zone;
        bestOrigIdx = items[idx].index;
      }
    }

    if (bestIdx === null) {
      // Cycle detected or unresolvable deps — place remaining in original order
      const leftover = [...remaining].sort(
        (a, b) => items[a].index - items[b].index,
      );
      for (const idx of leftover) result.push(items[idx]);
      break;
    }

    result.push(items[bestIdx]);
    placed.add(bestIdx);
    remaining.delete(bestIdx);
  }

  return result;
}

// ---------------------------------------------------------------------------
// Main reorder logic
// ---------------------------------------------------------------------------

function reorderFile(filePath) {
  const source = fs.readFileSync(filePath, 'utf8');
  const sourceFile = ts.createSourceFile(
    filePath,
    source,
    ts.ScriptTarget.Latest,
    true,
    filePath.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );

  const stmts = sourceFile.statements;
  if (stmts.length === 0) return false;

  const classified = [];
  for (let i = 0; i < stmts.length; i++) {
    const zone = classifyZone(stmts[i]);
    const text = getFullStatementText(source, stmts, i);
    classified.push({ index: i, zone, text, stmt: stmts[i] });
  }

  // Check if already in order
  let maxZone = 0;
  let needsReorder = false;
  for (const item of classified) {
    if (item.zone === 0) continue;
    if (item.zone < maxZone) { needsReorder = true; break; }
    if (item.zone > maxZone) maxZone = item.zone;
  }

  // Check for style violations (const-assigned multi-statement arrows → function decl)
  let needsStyleFix = false;
  for (const item of classified) {
    if (item.zone !== 1 && item.zone !== 2) continue;
    const s = item.stmt;
    // Handle both direct VariableStatements and exported VariableStatements
    const varStmt = s.kind === ts.SyntaxKind.VariableStatement ? s : null;
    if (!varStmt) continue;
    if (!hasFunctionInit(varStmt)) continue;
    const decl = varStmt.declarationList.declarations[0];
    if (!decl?.initializer) continue;
    const init = decl.initializer;
    if (init.kind === ts.SyntaxKind.ArrowFunction && init.body.kind !== ts.SyntaxKind.Block)
      continue;
    if (
      init.kind !== ts.SyntaxKind.ArrowFunction &&
      init.kind !== ts.SyntaxKind.FunctionExpression
    )
      continue;
    // Skip empty and single-statement bodies
    if (init.body.statements && init.body.statements.length < 2) continue;
    const bodyText = init.body.getText(sourceFile);
    if (containsJSX(bodyText)) continue;
    needsStyleFix = true;
    break;
  }

  if (!needsReorder && !needsStyleFix) return false;

  // Apply style fixes
  if (needsStyleFix) {
    for (const item of classified)
      item.text = tryConvertToFunctionDecl(item.text, sourceFile, item.stmt);
  }

  if (!needsReorder) {
    const result = classified.map((c) => c.text).join('');
    if (result !== source) {
      fs.writeFileSync(filePath, result);
      return true;
    }
    return false;
  }

  // Identify "attached" zone-0 ExpressionStatements that reference names
  // defined by non-exempt items (e.g. Foo.displayName = '...' after const Foo).
  // These must move with their parent to avoid no-use-before-define errors.
  const attachedTo = new Map(); // item index → parent item index
  const nameToClassifiedIndex = new Map();
  for (let i = 0; i < classified.length; i++) {
    for (const name of getDefinedNames(classified[i].stmt))
      nameToClassifiedIndex.set(name, i);
  }
  for (let i = 0; i < classified.length; i++) {
    const item = classified[i];
    if (item.zone !== 0) continue;
    if (item.stmt.kind !== ts.SyntaxKind.ExpressionStatement) continue;
    const refs = getReferencedNames(item.stmt, sourceFile);
    for (const ref of refs) {
      const parentIdx = nameToClassifiedIndex.get(ref);
      if (parentIdx !== undefined && classified[parentIdx].zone !== 0) {
        attachedTo.set(i, parentIdx);
        break; // attach to first match
      }
    }
  }

  // Build reverse map: parent index → list of attached item indices
  const attachments = new Map(); // parent index → [child indices]
  for (const [childIdx, parentIdx] of attachedTo) {
    if (!attachments.has(parentIdx)) attachments.set(parentIdx, []);
    attachments.get(parentIdx).push(childIdx);
  }

  // Separate non-exempt items (excluding attached zone-0 items which will tag along)
  const nonExemptItems = classified.filter((c) => c.zone !== 0);

  // Dependency-aware sort
  const sorted = dependencyAwareSort(nonExemptItems, sourceFile);

  // Rebuild: exempt items stay in place (unless attached), non-exempt filled from sorted
  // Attached items are inserted right after their parent in the sorted order.
  const attachedIndices = new Set(attachedTo.keys());
  let sortedIdx = 0;
  const result = [];
  for (const item of classified) {
    if (item.zone === 0) {
      if (!attachedIndices.has(item.index)) {
        result.push(item.text);
      }
      // Skip attached items here — they'll be emitted after their parent
    } else {
      const sortedItem = sorted[sortedIdx];
      result.push(sortedItem.text);
      // Emit any attached items for this sorted item
      const children = attachments.get(sortedItem.index);
      if (children) {
        for (const childIdx of children)
          result.push(classified[childIdx].text);
      }
      sortedIdx++;
    }
  }

  const lastStmt = stmts[stmts.length - 1];
  const trailing = source.slice(lastStmt.end);
  const output = result.join('') + trailing;

  if (output !== source) {
    fs.writeFileSync(filePath, output);
    return true;
  }
  return false;
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

const files = process.argv.slice(2);
if (files.length === 0) {
  const input = fs.readFileSync(0, 'utf8');
  files.push(...input.trim().split('\n').map((f) => f.trim()).filter(Boolean));
}

let fixed = 0;
let errors = 0;
for (const file of files) {
  try {
    if (reorderFile(file)) {
      fixed++;
      process.stdout.write(`  Fixed: ${path.relative(process.cwd(), file)}\n`);
    }
  } catch (err) {
    errors++;
    process.stderr.write(`  Error: ${path.relative(process.cwd(), file)}: ${err.message}\n`);
  }
}

process.stdout.write(`\nDone. Fixed ${fixed} files, ${errors} errors.\n`);
