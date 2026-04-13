/**
 * Custom ESLint Plugin: Enforce Function Style & Ordering
 *
 * Two independent checks controlled by options:
 *
 * 1. **checkStyle** — Multi-statement functions must use `function` declarations,
 *    not `const`-assigned arrow/function expressions. Single-expression arrows
 *    are fine (concise one-liners). React components are exempt (enforced by
 *    `react/function-component-definition`). Closures/callbacks are exempt.
 *
 * 2. **checkOrdering** — Module-level statements should follow this order:
 *    exports → private functions → constants.
 *    Imports, type declarations, and re-exports are exempt.
 */

// ---------------------------------------------------------------------------
// Helpers – JSX detection (borrowed from smart-max-lines for consistency)
// ---------------------------------------------------------------------------

function isJSX(node) {
  return node && (node.type === 'JSXElement' || node.type === 'JSXFragment');
}

function expressionReturnsJSX(node) {
  if (!node) return false;
  if (isJSX(node)) return true;
  if (node.type === 'ConditionalExpression')
    return expressionReturnsJSX(node.consequent) || expressionReturnsJSX(node.alternate);
  if (node.type === 'LogicalExpression')
    return expressionReturnsJSX(node.left) || expressionReturnsJSX(node.right);
  if (node.type === 'ParenthesizedExpression')
    return expressionReturnsJSX(node.expression);
  return false;
}

function blockReturnsJSX(body) {
  if (!Array.isArray(body)) return false;
  for (const stmt of body) {
    if (stmt.type === 'ReturnStatement' && expressionReturnsJSX(stmt.argument))
      return true;
    if (stmt.type === 'IfStatement') {
      const check = (branch) => {
        if (!branch) return false;
        if (branch.type === 'BlockStatement') return blockReturnsJSX(branch.body);
        return branch.type === 'ReturnStatement' && expressionReturnsJSX(branch.argument);
      };
      if (check(stmt.consequent) || check(stmt.alternate)) return true;
    }
    if (stmt.type === 'SwitchStatement') {
      for (const c of stmt.cases)
        if (blockReturnsJSX(c.consequent)) return true;
    }
  }
  return false;
}

function functionReturnsJSX(fnNode) {
  if (fnNode.type === 'ArrowFunctionExpression' && fnNode.body.type !== 'BlockStatement')
    return expressionReturnsJSX(fnNode.body);
  if (fnNode.body && fnNode.body.type === 'BlockStatement')
    return blockReturnsJSX(fnNode.body.body);
  return false;
}

// ---------------------------------------------------------------------------
// Helpers – Statement classification for ordering
// ---------------------------------------------------------------------------

/** Exempt statement types that don't participate in ordering zones. */
function isExemptStatement(stmt) {
  if (stmt.type === 'ImportDeclaration') return true;
  if (stmt.type === 'TSTypeAliasDeclaration') return true;
  if (stmt.type === 'TSInterfaceDeclaration') return true;
  if (stmt.type === 'TSEnumDeclaration') return true;
  if (stmt.type === 'ExportAllDeclaration') return true;
  // Type-only exports
  if (stmt.type === 'ExportNamedDeclaration' && stmt.exportKind === 'type') return true;
  // Re-exports (export { ... } from '...')
  if (stmt.type === 'ExportNamedDeclaration' && stmt.source) return true;
  // Empty export declarations (export {};)
  if (stmt.type === 'ExportNamedDeclaration' && !stmt.declaration && stmt.specifiers.length === 0)
    return true;
  return false;
}

/** Check if a VariableDeclaration's init is a function (arrow or function expression). */
function hasFunctionInit(varDecl) {
  if (!varDecl.declarations || varDecl.declarations.length === 0) return false;
  const init = varDecl.declarations[0].init;
  if (!init) return false;
  return init.type === 'ArrowFunctionExpression' || init.type === 'FunctionExpression';
}

/**
 * Classify a top-level statement into a zone for ordering:
 *   1 = export, 2 = private function, 3 = constant, 0 = exempt
 */
function classifyZone(stmt) {
  if (isExemptStatement(stmt)) return 0;

  // Exports → zone 1
  if (stmt.type === 'ExportNamedDeclaration' || stmt.type === 'ExportDefaultDeclaration')
    return 1;

  // Private function declarations → zone 2
  if (stmt.type === 'FunctionDeclaration') return 2;

  // Private variable declarations
  if (stmt.type === 'VariableDeclaration') {
    if (hasFunctionInit(stmt)) return 2; // function-valued → zone 2
    return 3; // plain constant → zone 3
  }

  // Everything else (expression statements, etc.) → exempt
  return 0;
}

/** Get a readable name from a statement for error messages. */
function getStatementName(stmt) {
  if (stmt.type === 'ExportNamedDeclaration' && stmt.declaration) {
    const decl = stmt.declaration;
    if (decl.type === 'FunctionDeclaration' && decl.id) return decl.id.name;
    if (decl.type === 'VariableDeclaration' && decl.declarations[0]?.id)
      return decl.declarations[0].id.name;
  }
  if (stmt.type === 'ExportDefaultDeclaration') return 'default export';
  if (stmt.type === 'FunctionDeclaration' && stmt.id) return stmt.id.name;
  if (stmt.type === 'VariableDeclaration' && stmt.declarations[0]?.id)
    return stmt.declarations[0].id.name;
  return '(anonymous)';
}

// ---------------------------------------------------------------------------
// Helpers – Dependency analysis for ordering suppression
// ---------------------------------------------------------------------------

/** Get names defined by a top-level statement. */
function getDefinedNames(stmt) {
  const names = new Set();
  if (stmt.type === 'FunctionDeclaration' && stmt.id) names.add(stmt.id.name);
  if (stmt.type === 'VariableDeclaration') {
    for (const d of stmt.declarations)
      if (d.id?.type === 'Identifier') names.add(d.id.name);
  }
  // Class declarations
  if (stmt.type === 'ClassDeclaration' && stmt.id) names.add(stmt.id.name);
  // TypeScript declarations
  if (stmt.type === 'TSEnumDeclaration' && stmt.id) names.add(stmt.id.name);
  if (stmt.type === 'TSInterfaceDeclaration' && stmt.id) names.add(stmt.id.name);
  if (stmt.type === 'TSTypeAliasDeclaration' && stmt.id) names.add(stmt.id.name);
  // Exported declarations: unwrap
  if (
    (stmt.type === 'ExportNamedDeclaration' || stmt.type === 'ExportDefaultDeclaration') &&
    stmt.declaration
  ) {
    for (const n of getDefinedNames(stmt.declaration)) names.add(n);
  }
  return names;
}

/** Collect all Identifier references in a node's AST (excluding the name it defines). */
function collectReferences(node, defined) {
  const refs = new Set();
  function visit(n) {
    if (!n || typeof n !== 'object') return;
    if ((n.type === 'Identifier' || n.type === 'JSXIdentifier') && !defined.has(n.name))
      refs.add(n.name);
    for (const key of Object.keys(n)) {
      if (key === 'parent') continue;
      const child = n[key];
      if (Array.isArray(child)) child.forEach(visit);
      else if (child && typeof child.type === 'string') visit(child);
    }
  }
  visit(node);
  return refs;
}

/**
 * Check if a statement references any name from a given set.
 * Used to detect when a statement MUST appear after certain definitions
 * due to @typescript-eslint/no-use-before-define constraints.
 */
function referencesAnyName(stmt, nameSet) {
  const defined = getDefinedNames(stmt);
  const refs = collectReferences(stmt, defined);
  for (const ref of refs) if (nameSet.has(ref)) return true;
  return false;
}

// ---------------------------------------------------------------------------
// Helpers – Top-level detection
// ---------------------------------------------------------------------------

/**
 * Check if a VariableDeclarator is at the module top level.
 * A declarator is top-level if its VariableDeclaration parent is directly
 * under Program, or under an ExportNamedDeclaration that is under Program.
 */
function isTopLevel(node) {
  const varDecl = node.parent; // VariableDeclaration
  if (!varDecl) return false;
  const container = varDecl.parent;
  if (!container) return false;
  if (container.type === 'Program') return true;
  if (container.type === 'ExportNamedDeclaration' && container.parent?.type === 'Program')
    return true;
  return false;
}

// ---------------------------------------------------------------------------
// Rule definition
// ---------------------------------------------------------------------------

const enforceFunctionStyleRule = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Enforce function declarations for multi-statement functions and ' +
        'correct ordering of exports, private functions, and constants.',
      category: 'Best Practices',
      recommended: true,
    },
    schema: [
      {
        type: 'object',
        properties: {
          checkStyle: {
            type: 'boolean',
            description: 'Flag const-assigned multi-statement functions (default true)',
          },
          checkOrdering: {
            type: 'boolean',
            description: 'Flag out-of-order module statements (default true)',
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      useFunction:
        'Use `function {{name}}()` instead of const arrow. Function declarations are hoisted and easier to spot in diffs. Single-expression arrows are fine.',
      exportBeforePrivate:
        'Export `{{name}}` appears after private functions. Exports first makes the public API scannable — move it above private helpers.',
      exportBeforeConstant:
        'Export `{{name}}` appears after constants. Exports first makes the public API scannable — move it above module-level constants.',
      functionBeforeConstant:
        'Private function `{{name}}` appears after constants. Functions before constants keeps the reading order logical — move it up.',
    },
  },

  create(context) {
    const options = context.options[0] || {};
    const checkStyle = options.checkStyle !== false;
    const checkOrdering = options.checkOrdering !== false;

    return {
      // -----------------------------------------------------------------
      // Check 1: Declaration style
      // -----------------------------------------------------------------
      ...(checkStyle
        ? {
            VariableDeclarator(node) {
              // Only care about top-level const-assigned functions
              if (!isTopLevel(node)) return;

              const init = node.init;
              if (!init) return;
              if (init.type !== 'ArrowFunctionExpression' && init.type !== 'FunctionExpression')
                return;

              // Allow single-expression arrows (concise body, no block)
              if (init.type === 'ArrowFunctionExpression' && init.body.type !== 'BlockStatement')
                return;

              // Allow empty and single-statement block bodies — only flag
              // multi-statement (2+) functions, matching the rule's intent.
              {
                const body =
                  init.body && init.body.type === 'BlockStatement' ? init.body.body : null;
                if (body && body.length < 2) return;
              }

              // Allow React components (JSX return) — enforced separately
              if (functionReturnsJSX(init)) return;

              // IIFEs like `const x = (() => {...})()` are implicitly exempt
              // because their init is a CallExpression, filtered by the type
              // check above.

              const name = node.id?.name ?? '(anonymous)';

              context.report({
                node,
                messageId: 'useFunction',
                data: { name },
              });
            },
          }
        : {}),

      // -----------------------------------------------------------------
      // Check 2: Ordering
      // -----------------------------------------------------------------
      ...(checkOrdering
        ? {
            'Program:exit'(programNode) {
              let maxZoneSeen = 0;

              // Two name sets for dependency suppression:
              // 1. precedingNonHoistedNames: constants/variables (not hoisted)
              //    — used for most statements
              // 2. precedingAllNames: includes function declaration names too
              //    — used for `export { ... }` because no-use-before-define flags
              //    names in export specifiers even with functions:false
              const precedingNonHoistedNames = new Set();
              const precedingAllNames = new Set();

              for (const stmt of programNode.body) {
                const zone = classifyZone(stmt);

                // Track ALL non-import names for dependency checking.
                // Imports are always available so excluded.
                // Function declarations are hoisted (no-use-before-define functions:false),
                // so they're only added to precedingAllNames (for named export checks).
                if (stmt.type !== 'ImportDeclaration') {
                  for (const n of getDefinedNames(stmt)) {
                    precedingAllNames.add(n);
                    // Non-hoisted: everything except function declarations
                    if (stmt.type !== 'FunctionDeclaration')
                      precedingNonHoistedNames.add(n);
                  }
                }

                if (zone === 0) continue; // exempt — ignore ordering

                if (zone < maxZoneSeen) {
                  // Determine which name set to check against.
                  // Named exports (`export { a, b }`) trigger no-use-before-define
                  // for ALL referenced names, including function declarations.
                  const isNamedExport =
                    stmt.type === 'ExportNamedDeclaration' &&
                    !stmt.declaration &&
                    stmt.specifiers.length > 0 &&
                    !stmt.source;
                  const nameSet = isNamedExport ? precedingAllNames : precedingNonHoistedNames;

                  if (!referencesAnyName(stmt, nameSet)) {
                    const name = getStatementName(stmt);
                    let messageId;
                    if (zone === 1 && maxZoneSeen === 2) messageId = 'exportBeforePrivate';
                    else if (zone === 1) messageId = 'exportBeforeConstant';
                    else messageId = 'functionBeforeConstant';

                    context.report({
                      node: stmt,
                      messageId,
                      data: { name },
                    });
                  }
                }

                if (zone > maxZoneSeen) maxZoneSeen = zone;
              }
            },
          }
        : {}),
    };
  },
};

export default {
  rules: {
    'enforce-function-style': enforceFunctionStyleRule,
  },
};
