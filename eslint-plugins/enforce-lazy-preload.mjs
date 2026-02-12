/**
 * Custom ESLint Plugin: Enforce Lazy Route Preloading
 *
 * Ensures every lazy()-loaded route page also has a matching dynamic import()
 * inside a preload function (default: preloadRoutePages) in the same file.
 *
 * This prevents developers from adding new lazy routes and forgetting to add
 * them to the background preloader, which would cause slower navigation.
 *
 * Reports:
 *   - Missing preload: lazy route import path not found in preload function
 *   - Missing preload function: file has lazy() routes but no preload function
 *   - Stale preload: preload import has no matching lazy() route
 */

/**
 * Recursively find all ImportExpression source paths within an AST subtree.
 */
function collectImportPaths(node) {
  const paths = [];

  function walk(n) {
    if (!n || typeof n !== 'object') return;

    if (n.type === 'ImportExpression' && n.source?.type === 'Literal')
      paths.push({ value: n.source.value, node: n });

    for (const key of Object.keys(n)) {
      if (key === 'parent') continue;
      const child = n[key];
      if (Array.isArray(child))
        child.forEach(walk);
      else if (child?.type)
        walk(child);
    }
  }

  walk(node);
  return paths;
}

/**
 * Check if a CallExpression is a lazy() call (React.lazy or bare lazy).
 */
function isLazyCall(node) {
  if (node.type !== 'CallExpression') return false;
  const { callee } = node;
  // lazy(...)
  if (callee.type === 'Identifier' && callee.name === 'lazy') return true;
  // React.lazy(...)
  if (
    callee.type === 'MemberExpression' &&
    callee.object?.name === 'React' &&
    callee.property?.name === 'lazy'
  )
    return true;
  return false;
}

const enforceLazyPreloadRule = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Ensure every lazy()-loaded route has a matching import() in the preload function',
      category: 'Best Practices',
      recommended: true,
    },
    schema: [
      {
        type: 'object',
        properties: {
          preloadFunctionName: {
            type: 'string',
            description: 'Name of the preload function to check against',
            default: 'preloadRoutePages',
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      missingPreload:
        'Lazy-loaded route "{{path}}" is not preloaded in {{fn}}(). Add: import(\'{{path}}\').catch(() => undefined);',
      missingPreloadFn:
        'File contains {{count}} lazy() route(s) but no {{fn}}() function. Add a preload function so lazy routes are loaded in the background.',
      stalePreload:
        'Preload import "{{path}}" in {{fn}}() has no matching lazy() route. Remove it or add the corresponding lazy route.',
    },
  },

  create(context) {
    const options = context.options[0] ?? {};
    const preloadFnName = options.preloadFunctionName ?? 'preloadRoutePages';

    // Collected during traversal
    const lazyImports = []; // { path: string, node: ASTNode }
    let preloadFnNode = null;
    const preloadImports = []; // { path: string, node: ASTNode }

    /**
     * Visit CallExpression nodes to find lazy() calls.
     */
    function visitCallExpression(node) {
      if (!isLazyCall(node)) return;

      const importPaths = collectImportPaths(node);
      for (const { value, node: importNode } of importPaths)
        lazyImports.push({ path: value, node: importNode });
    }

    /**
     * Visit VariableDeclarator to find the preload function.
     * Matches: const preloadRoutePages = (...) => { ... }
     */
    function visitVariableDeclarator(node) {
      if (node.id?.name !== preloadFnName) return;
      preloadFnNode = node.init;
      if (!preloadFnNode) return;
      const imports = collectImportPaths(preloadFnNode);
      for (const { value, node: importNode } of imports)
        preloadImports.push({ path: value, node: importNode });
    }

    /**
     * Visit FunctionDeclaration to find named preload functions.
     * Matches: function preloadRoutePages() { ... }
     */
    function visitFunctionDeclaration(node) {
      if (node.id?.name !== preloadFnName) return;
      preloadFnNode = node;
      const imports = collectImportPaths(node);
      for (const { value, node: importNode } of imports)
        preloadImports.push({ path: value, node: importNode });
    }

    /**
     * On program exit, compare lazy imports vs preload imports.
     */
    function onProgramExit(programNode) {
      // No lazy routes in this file - nothing to check
      if (lazyImports.length === 0) return;

      // Has lazy routes but no preload function
      if (!preloadFnNode) {
        context.report({
          node: programNode,
          messageId: 'missingPreloadFn',
          data: {
            count: String(lazyImports.length),
            fn: preloadFnName,
          },
        });
        return;
      }

      const preloadPaths = new Set(preloadImports.map((i) => i.path));
      const lazyPaths = new Set(lazyImports.map((i) => i.path));

      // Check each lazy import has a matching preload
      for (const { path, node } of lazyImports) {
        if (!preloadPaths.has(path))
          context.report({
            node,
            messageId: 'missingPreload',
            data: { path, fn: preloadFnName },
          });
      }

      // Check for stale preloads (in preload but not in lazy)
      for (const { path, node } of preloadImports) {
        if (!lazyPaths.has(path))
          context.report({
            node,
            messageId: 'stalePreload',
            data: { path, fn: preloadFnName },
          });
      }
    }

    return {
      CallExpression: visitCallExpression,
      VariableDeclarator: visitVariableDeclarator,
      FunctionDeclaration: visitFunctionDeclaration,
      'Program:exit': onProgramExit,
    };
  },
};

export default {
  rules: {
    'enforce-lazy-preload': enforceLazyPreloadRule,
  },
};
