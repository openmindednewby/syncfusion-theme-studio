/**
 * Codemod: enforce-function-style
 *
 * Fixes all three categories of enforce-function-style ESLint warnings:
 *
 * 1. Style: Convert const-assigned block-body arrow/function expressions
 *    to function declarations (skip React components that return JSX).
 *
 * 2. Ordering: Reorder top-level statements so that:
 *    exports → private functions → constants
 *    (imports, types, re-exports are exempt and stay in place)
 *
 * Run with: npx tsx scripts/codemod-function-style.ts
 */

import {
  Project,
  type SourceFile,
  SyntaxKind,
  type Node,
  type Statement,
  type VariableStatement,
  type VariableDeclaration,
  type ArrowFunction,
  type FunctionExpression,
  type ExportDeclaration,
  type ExportAssignment,
} from 'ts-morph';
import * as path from 'path';
import { fileURLToPath } from 'url';

// ─── Configuration ───────────────────────────────────────────────────────────

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');
const TSCONFIG_PATH = path.join(PROJECT_ROOT, 'tsconfig.json');

// ─── JSX Detection ───────────────────────────────────────────────────────────

function nodeIsJSX(node: Node): boolean {
  return (
    node.getKind() === SyntaxKind.JsxElement ||
    node.getKind() === SyntaxKind.JsxSelfClosingElement ||
    node.getKind() === SyntaxKind.JsxFragment
  );
}

function expressionReturnsJSX(node: Node): boolean {
  if (nodeIsJSX(node)) return true;

  if (node.getKind() === SyntaxKind.ConditionalExpression) {
    const children = node.getChildren();
    // ConditionalExpression: condition ? whenTrue : whenFalse
    // Children: condition, ?, whenTrue, :, whenFalse
    const whenTrue = children[2];
    const whenFalse = children[4];
    if (whenTrue && expressionReturnsJSX(whenTrue)) return true;
    if (whenFalse && expressionReturnsJSX(whenFalse)) return true;
  }

  if (node.getKind() === SyntaxKind.ParenthesizedExpression) {
    const inner = node.getChildren().find(
      (c) =>
        c.getKind() !== SyntaxKind.OpenParenToken &&
        c.getKind() !== SyntaxKind.CloseParenToken,
    );
    if (inner) return expressionReturnsJSX(inner);
  }

  return false;
}

function blockReturnsJSX(statements: Node[]): boolean {
  for (const stmt of statements) {
    if (stmt.getKind() === SyntaxKind.ReturnStatement) {
      const expr = stmt.getChildren().find(
        (c) =>
          c.getKind() !== SyntaxKind.ReturnKeyword &&
          c.getKind() !== SyntaxKind.SemicolonToken,
      );
      if (expr && expressionReturnsJSX(expr)) return true;
    }
    if (stmt.getKind() === SyntaxKind.IfStatement) {
      // Check consequent and alternate
      for (const child of stmt.getChildren()) {
        if (child.getKind() === SyntaxKind.Block) {
          if (blockReturnsJSX(child.getChildren())) return true;
        }
        if (child.getKind() === SyntaxKind.ReturnStatement) {
          const expr = child.getChildren().find(
            (c) =>
              c.getKind() !== SyntaxKind.ReturnKeyword &&
              c.getKind() !== SyntaxKind.SemicolonToken,
          );
          if (expr && expressionReturnsJSX(expr)) return true;
        }
      }
    }
    if (stmt.getKind() === SyntaxKind.SwitchStatement) {
      for (const clause of stmt.getDescendantsOfKind(SyntaxKind.CaseClause)) {
        if (blockReturnsJSX(clause.getStatements())) return true;
      }
      for (const clause of stmt.getDescendantsOfKind(SyntaxKind.DefaultClause)) {
        if (blockReturnsJSX(clause.getStatements())) return true;
      }
    }
  }
  return false;
}

function functionReturnsJSX(fnNode: ArrowFunction | FunctionExpression): boolean {
  if (fnNode.getKind() === SyntaxKind.ArrowFunction) {
    const body = fnNode.getBody();
    if (body.getKind() !== SyntaxKind.Block) {
      return expressionReturnsJSX(body);
    }
    return blockReturnsJSX(body.getChildren().filter((c) => c.getKind() !== SyntaxKind.OpenBraceToken && c.getKind() !== SyntaxKind.CloseBraceToken));
  }
  const body = fnNode.getBody();
  if (body) {
    return blockReturnsJSX(body.getChildren().filter((c) => c.getKind() !== SyntaxKind.OpenBraceToken && c.getKind() !== SyntaxKind.CloseBraceToken));
  }
  return false;
}

// ─── Statement Classification (mirrors ESLint rule) ──────────────────────────

const ZONE_EXEMPT = 0;
const ZONE_EXPORT = 1;
const ZONE_PRIVATE_FUNCTION = 2;
const ZONE_CONSTANT = 3;

type Zone = typeof ZONE_EXEMPT | typeof ZONE_EXPORT | typeof ZONE_PRIVATE_FUNCTION | typeof ZONE_CONSTANT;

function hasFunctionInit(decl: VariableDeclaration): boolean {
  const init = decl.getInitializer();
  if (!init) return false;
  return (
    init.getKind() === SyntaxKind.ArrowFunction ||
    init.getKind() === SyntaxKind.FunctionExpression
  );
}

function classifyZone(stmt: Statement): Zone {
  const kind = stmt.getKind();

  // Imports
  if (kind === SyntaxKind.ImportDeclaration) return ZONE_EXEMPT;

  // Type declarations
  if (kind === SyntaxKind.TypeAliasDeclaration) return ZONE_EXEMPT;
  if (kind === SyntaxKind.InterfaceDeclaration) return ZONE_EXEMPT;
  if (kind === SyntaxKind.EnumDeclaration) return ZONE_EXEMPT;

  // ExportDeclaration: covers `export { ... } from '...'`, `export * from '...'`, `export type { ... }`
  if (kind === SyntaxKind.ExportDeclaration) {
    const ed = stmt as unknown as ExportDeclaration;
    // Type-only exports
    if (ed.isTypeOnly()) return ZONE_EXEMPT;
    // Re-exports (has module specifier)
    if (ed.getModuleSpecifier()) return ZONE_EXEMPT;
    // Empty export: export {}
    if (ed.getNamedExports().length === 0) return ZONE_EXEMPT;
    // export { x, y } (value re-export without source)
    return ZONE_EXPORT;
  }

  // export default ...
  if (kind === SyntaxKind.ExportAssignment) {
    return ZONE_EXPORT;
  }

  // Exported variable/function/class declarations
  if (stmt.hasModifier?.(SyntaxKind.ExportKeyword)) {
    return ZONE_EXPORT;
  }

  // Check for export keyword via text for edge cases
  const text = stmt.getText().trimStart();
  if (text.startsWith('export ')) {
    // Check if it's a type export
    if (text.startsWith('export type ')) return ZONE_EXEMPT;
    return ZONE_EXPORT;
  }

  // Function declarations
  if (kind === SyntaxKind.FunctionDeclaration) return ZONE_PRIVATE_FUNCTION;

  // Variable declarations
  if (kind === SyntaxKind.VariableStatement) {
    const varStmt = stmt as VariableStatement;
    const declarations = varStmt.getDeclarations();
    if (declarations.length > 0 && hasFunctionInit(declarations[0]!)) {
      return ZONE_PRIVATE_FUNCTION;
    }
    return ZONE_CONSTANT;
  }

  // Expression statements (e.g., function calls like `registerInterceptors(apiClient)`)
  return ZONE_EXEMPT;
}

// ─── Style Transform: const arrow → function declaration ─────────────────────

interface StyleFixCandidate {
  varStmt: VariableStatement;
  decl: VariableDeclaration;
  fn: ArrowFunction | FunctionExpression;
  isExported: boolean;
}

function findStyleFixCandidates(sourceFile: SourceFile): StyleFixCandidate[] {
  const candidates: StyleFixCandidate[] = [];

  for (const stmt of sourceFile.getStatements()) {
    let varStmt: VariableStatement | undefined;
    let isExported = false;

    if (stmt.getKind() === SyntaxKind.VariableStatement) {
      varStmt = stmt as VariableStatement;
      isExported = varStmt.hasModifier(SyntaxKind.ExportKeyword);
    }

    if (!varStmt) continue;

    const declarations = varStmt.getDeclarations();
    if (declarations.length !== 1) continue;

    const decl = declarations[0]!;
    const init = decl.getInitializer();
    if (!init) continue;

    // Must be arrow function or function expression
    if (
      init.getKind() !== SyntaxKind.ArrowFunction &&
      init.getKind() !== SyntaxKind.FunctionExpression
    )
      continue;

    const fn = init as ArrowFunction | FunctionExpression;

    // Skip single-expression arrows (no block body)
    if (fn.getKind() === SyntaxKind.ArrowFunction) {
      const body = fn.getBody();
      if (body.getKind() !== SyntaxKind.Block) continue;
    }

    // Skip React components (returns JSX)
    if (functionReturnsJSX(fn)) continue;

    // Check it's top-level (parent is VariableStatement, grandparent is SourceFile or ExportDeclaration)
    const parent = decl.getParent(); // VariableDeclarationList
    const grandparent = parent?.getParent(); // VariableStatement
    if (!grandparent) continue;

    candidates.push({ varStmt, decl, fn, isExported });
  }

  return candidates;
}

function applyStyleFixes(sourceFile: SourceFile): number {
  const candidates = findStyleFixCandidates(sourceFile);
  if (candidates.length === 0) return 0;

  let fixCount = 0;

  // Process in reverse order to maintain positions
  for (let i = candidates.length - 1; i >= 0; i--) {
    const candidate = candidates[i]!;
    const { varStmt, decl, fn, isExported } = candidate;

    const name = decl.getName();
    const isAsync = fn.isAsync();

    // Get type parameters
    const typeParams = fn.getTypeParameters();
    const typeParamText =
      typeParams.length > 0
        ? `<${typeParams.map((tp) => tp.getText()).join(', ')}>`
        : '';

    // Get parameters
    const params = fn.getParameters().map((p) => p.getText()).join(', ');

    // Get return type
    const returnType = fn.getReturnType();
    let returnTypeText = '';
    const explicitReturnType = decl.getTypeNode()?.getText() ?? fn.getReturnTypeNode()?.getText();

    if (explicitReturnType) {
      // The decl type annotation might wrap the whole function type, e.g. `(x: number) => string`
      // We need just the return type
      const declType = decl.getTypeNode();
      if (declType) {
        // If the type annotation is a function type like `(x: number) => string`,
        // we need to extract just the return type
        const declTypeText = declType.getText();
        if (
          declTypeText.includes('=>') ||
          declTypeText.startsWith('(') ||
          declTypeText.includes('Promise')
        ) {
          // Use the function's own return type annotation if available
          const fnReturnType = fn.getReturnTypeNode();
          if (fnReturnType) {
            returnTypeText = `: ${fnReturnType.getText()}`;
          } else {
            // Try to extract from the variable's type annotation
            // For patterns like `const foo: (x: number) => string = (x) => { ... }`
            // We need to parse the return type from the type annotation
            returnTypeText = `: ${returnType.getText()}`;
          }
        } else {
          returnTypeText = `: ${declTypeText}`;
        }
      } else {
        returnTypeText = `: ${explicitReturnType}`;
      }
    } else {
      // No explicit type — don't add one (let inference work)
    }

    // Get body
    let bodyText: string;
    const body = fn.getBody();
    if (body.getKind() === SyntaxKind.Block) {
      bodyText = body.getText();
    } else {
      // Shouldn't happen since we filtered non-block arrows
      bodyText = `{\n  return ${body.getText()};\n}`;
    }

    // Get leading trivia (comments/JSDoc)
    const leadingTrivia = varStmt.getLeadingCommentRanges()
      .map((c) => c.getText())
      .join('\n');

    // Build the function declaration
    const exportPrefix = isExported ? 'export ' : '';
    const asyncPrefix = isAsync ? 'async ' : '';
    const newText = `${exportPrefix}${asyncPrefix}function ${name}${typeParamText}(${params})${returnTypeText} ${bodyText}`;

    // Replace the variable statement with the function declaration
    const fullLeadingTrivia = leadingTrivia ? leadingTrivia + '\n' : '';
    varStmt.replaceWithText(`${fullLeadingTrivia}${newText}`);

    fixCount++;
  }

  return fixCount;
}

// ─── Ordering Transform ──────────────────────────────────────────────────────

/**
 * Get the full text of a statement including its leading trivia (comments, whitespace).
 * We use getFullText() which includes leading trivia.
 */
function getStatementFullText(stmt: Statement): string {
  return stmt.getFullText();
}

/**
 * Collect the names that a statement defines.
 */
function getDefinedNames(stmt: Statement): Set<string> {
  const names = new Set<string>();
  const kind = stmt.getKind();

  if (kind === SyntaxKind.VariableStatement) {
    const vs = stmt as VariableStatement;
    for (const d of vs.getDeclarations()) {
      names.add(d.getName());
    }
  } else if (kind === SyntaxKind.FunctionDeclaration) {
    const name = (stmt as any).getName?.();
    if (name) names.add(name);
  } else if (kind === SyntaxKind.EnumDeclaration) {
    const name = (stmt as any).getName?.();
    if (name) names.add(name);
  } else if (kind === SyntaxKind.InterfaceDeclaration) {
    const name = (stmt as any).getName?.();
    if (name) names.add(name);
  } else if (kind === SyntaxKind.TypeAliasDeclaration) {
    const name = (stmt as any).getName?.();
    if (name) names.add(name);
  } else if (kind === SyntaxKind.ClassDeclaration) {
    const name = (stmt as any).getName?.();
    if (name) names.add(name);
  }

  // Handle exported declarations (which wrap the inner declaration)
  // e.g., `export const foo = ...`
  // The export keyword is a modifier on the VariableStatement itself in ts-morph

  return names;
}

/**
 * Collect identifiers referenced by a statement (excluding its own defined names).
 * This is a simple heuristic: scan all Identifier nodes.
 */
function getReferencedNames(stmt: Statement): Set<string> {
  const refs = new Set<string>();
  const defined = getDefinedNames(stmt);

  for (const id of stmt.getDescendantsOfKind(SyntaxKind.Identifier)) {
    const name = id.getText();
    if (!defined.has(name)) {
      refs.add(name);
    }
  }

  return refs;
}

interface StatementInfo {
  index: number;
  stmt: Statement;
  zone: Zone;
  fullText: string;
  definedNames: Set<string>;
  referencedNames: Set<string>;
}

function applyOrdering(sourceFile: SourceFile): number {
  const statements = sourceFile.getStatements();
  if (statements.length === 0) return 0;

  // Classify each statement
  const infos: StatementInfo[] = statements.map((stmt, index) => ({
    index,
    stmt,
    zone: classifyZone(stmt),
    fullText: getStatementFullText(stmt),
    definedNames: getDefinedNames(stmt),
    referencedNames: getReferencedNames(stmt),
  }));

  // Check if ordering is already correct
  let maxZone = 0;
  let needsReorder = false;
  for (const info of infos) {
    if (info.zone === ZONE_EXEMPT) continue;
    if (info.zone < maxZone) {
      needsReorder = true;
      break;
    }
    if (info.zone > maxZone) maxZone = info.zone;
  }

  if (!needsReorder) return 0;

  // Separate into exempt (stay in place) and non-exempt (need ordering)
  // Strategy: We'll build the new order of non-exempt statements,
  // then interleave them back with the exempt statements.

  // Actually, the ESLint rule checks all non-exempt statements in order.
  // The rule expects: all exports, then all private functions, then all constants.
  // Exempt statements can be anywhere (they're ignored by the rule).

  // The safest approach: partition non-exempt statements into their zones,
  // then reconstruct the file by placing exempt statements in their original
  // positions relative to the zone boundaries.

  // However, we need to be careful with dependencies between const declarations.
  // A const in zone 3 might be referenced by an export in zone 1.
  // If the export is a function declaration, it hoists — no problem.
  // If the export is a const, it doesn't hoist — so the referenced const
  // must come before it.

  // Strategy:
  // 1. Collect all statements with their zones
  // 2. Build dependency graph for non-exempt statements
  // 3. Stable-sort non-exempt statements by zone, respecting dependencies
  // 4. Reconstruct file with exempt statements staying in place

  // Build a map from name → statement info
  const nameToInfo = new Map<string, StatementInfo>();
  for (const info of infos) {
    for (const name of info.definedNames) {
      nameToInfo.set(name, info);
    }
  }

  // For dependency analysis: if a zone-1 (export) const references a zone-3 (constant) name,
  // that constant must be promoted to appear before the export.
  // But function declarations (zone 2) hoist, so they don't create dependency issues.

  // Simple approach: collect non-exempt statements, stable-sort by zone,
  // then do a topological adjustment for const→const dependencies.

  const exemptWithPositions: Array<{ position: number; info: StatementInfo }> = [];
  const nonExempt: StatementInfo[] = [];

  for (const info of infos) {
    if (info.zone === ZONE_EXEMPT) {
      exemptWithPositions.push({ position: info.index, info });
    } else {
      nonExempt.push(info);
    }
  }

  // Stable sort non-exempt by zone
  const sorted = [...nonExempt].sort((a, b) => a.zone - b.zone);

  // Now handle dependencies: if a const (zone 3) is referenced by an earlier
  // non-hoisting statement (zone 1 const), we need to move it up.
  // Actually, we need to check: after sorting, does any statement reference
  // a name that's defined by a statement appearing later in the sorted order?
  // If so, and the later statement is a const (not a function declaration that hoists),
  // we need to move the dependency before the referencing statement.

  // Build a simpler approach: do multiple passes to pull up constants that
  // are needed by earlier statements.
  function fixDependencies(stmts: StatementInfo[]): StatementInfo[] {
    const result = [...stmts];
    let changed = true;
    let iterations = 0;
    const MAX_ITERATIONS = 100;

    while (changed && iterations < MAX_ITERATIONS) {
      changed = false;
      iterations++;

      for (let i = 0; i < result.length; i++) {
        const current = result[i]!;
        // Only check if current is a non-hoisting statement (VariableStatement)
        // Function declarations hoist, so they don't need their deps before them
        if (current.stmt.getKind() === SyntaxKind.FunctionDeclaration) continue;

        for (const refName of current.referencedNames) {
          // Find where the definition is in the sorted order
          const defIdx = result.findIndex(
            (s) => s.definedNames.has(refName) && s !== current,
          );
          if (defIdx === -1) continue; // defined outside this file (import, etc.)
          if (defIdx <= i) continue; // already before us, fine

          const dep = result[defIdx]!;
          // Only need to move if the dependency is a const (doesn't hoist)
          if (dep.stmt.getKind() === SyntaxKind.FunctionDeclaration) continue;

          // Move dep to just before current
          result.splice(defIdx, 1);
          result.splice(i, 0, dep);
          changed = true;
          break; // restart the inner loop
        }
        if (changed) break; // restart the outer loop
      }
    }

    return result;
  }

  const finalSorted = fixDependencies(sorted);

  // Now reconstruct: place exempt statements at their relative positions
  // among the non-exempt statements.

  // Map original positions of exempt statements.
  // We need to figure out where each exempt statement falls in the new order.
  // Strategy: exempt statements stay at the same index relative to the total statement count.

  // Actually, let's think about this differently.
  // The original file has statements at positions 0..N-1.
  // Some are exempt (imports, types), some are non-exempt.
  // The non-exempt ones need to be reordered.
  // Exempt ones should stay at their original position relative to each other,
  // but the non-exempt ones fill in the gaps.

  // Simplest correct approach: build the new order by taking the original
  // statement positions, and for each non-exempt slot, fill from the sorted list.

  const newStatements: StatementInfo[] = [];
  let nonExemptIdx = 0;

  for (const info of infos) {
    if (info.zone === ZONE_EXEMPT) {
      newStatements.push(info);
    } else {
      newStatements.push(finalSorted[nonExemptIdx]!);
      nonExemptIdx++;
    }
  }

  // Check if order actually changed
  let orderChanged = false;
  for (let i = 0; i < infos.length; i++) {
    if (newStatements[i]!.index !== infos[i]!.index) {
      orderChanged = true;
      break;
    }
  }

  if (!orderChanged) return 0;

  // Reconstruct the file text
  // We need to be careful with leading/trailing whitespace and comments.
  // The safest approach is to use getFullText() for each statement and rebuild.

  // Get the text before the first statement (file-level leading comments, shebang, etc.)
  const firstStmt = statements[0]!;
  const fileStart = sourceFile.getFullText().substring(0, firstStmt.getFullStart());

  // Build new file content
  const newTexts = newStatements.map((info) => info.fullText);
  const newContent = fileStart + newTexts.join('');

  // Check if content actually differs
  if (newContent === sourceFile.getFullText()) return 0;

  sourceFile.replaceWithText(newContent);
  return 1;
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  console.log('Loading project...');
  const project = new Project({
    tsConfigFilePath: TSCONFIG_PATH,
    skipAddingFilesFromTsConfig: false,
  });

  const sourceFiles = project.getSourceFiles().filter((sf) => {
    const fp = sf.getFilePath();
    return !fp.includes('node_modules') && !fp.includes('.test.') && (fp.endsWith('.ts') || fp.endsWith('.tsx'));
  });

  console.log(`Found ${sourceFiles.length} source files to process.`);

  let totalStyleFixes = 0;
  let totalOrderFixes = 0;
  let filesModified = 0;

  for (const sourceFile of sourceFiles) {
    const relPath = path.relative(PROJECT_ROOT, sourceFile.getFilePath());
    let modified = false;

    // Apply style fixes first (convert const arrows to function declarations)
    const styleFixes = applyStyleFixes(sourceFile);
    if (styleFixes > 0) {
      totalStyleFixes += styleFixes;
      modified = true;
    }

    // Apply ordering fixes
    const orderFixes = applyOrdering(sourceFile);
    if (orderFixes > 0) {
      totalOrderFixes += orderFixes;
      modified = true;
    }

    if (modified) {
      filesModified++;
      console.log(`  Modified: ${relPath} (${styleFixes} style, ${orderFixes > 0 ? 'reordered' : 'no reorder'})`);
    }
  }

  console.log('\nSaving changes...');
  await project.save();

  console.log(`\nDone!`);
  console.log(`  Files modified: ${filesModified}`);
  console.log(`  Style fixes (const→function): ${totalStyleFixes}`);
  console.log(`  Files reordered: ${totalOrderFixes}`);
}

main().catch((err) => {
  console.error('Codemod failed:', err);
  process.exit(1);
});
