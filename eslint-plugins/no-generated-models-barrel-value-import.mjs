/**
 * Custom ESLint Plugin: No Generated Models Barrel Value Import
 *
 * Disallows runtime imports from the generated models barrel:
 *   @/api/generated/argosphere/models
 *
 * This barrel re-exports hundreds of modules; importing it as a value can
 * cause large dependency graphs and many dev-server module fetches.
 *
 * Type-only imports are allowed:
 *   import type { Foo } from '@/api/generated/argosphere/models';
 */

const BARREL_MODULES = new Set([
  '@/api/generated/argosphere/models',
  '@/api/generated/argosphere/models/index',
]);

function isTypeOnlyImport(importDeclarationNode) {
  if (importDeclarationNode.importKind === 'type') return true;

  // Support inline type specifiers:
  //   import { type Foo } from '...';
  const specifiers = importDeclarationNode.specifiers ?? [];
  if (specifiers.length === 0) return false;

  return specifiers.every((s) => s.importKind === 'type');
}

const noGeneratedModelsBarrelValueImportRule = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallow runtime (value) imports from the generated models barrel; allow type-only imports.',
      category: 'Best Practices',
      recommended: true,
    },
    schema: [],
    messages: {
      noValueImport:
        'Do not import runtime values from "{{module}}". Import from a specific leaf model module instead. Type-only imports are allowed.',
    },
  },

  create(context) {
    return {
      ImportDeclaration(node) {
        const moduleName = node.source?.value;
        if (typeof moduleName !== 'string') return;
        if (!BARREL_MODULES.has(moduleName)) return;

        if (isTypeOnlyImport(node)) return;

        context.report({
          node,
          messageId: 'noValueImport',
          data: { module: moduleName },
        });
      },
    };
  },
};

export default {
  rules: {
    'no-generated-models-barrel-value-import': noGeneratedModelsBarrelValueImportRule,
  },
};
