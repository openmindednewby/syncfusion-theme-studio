/**
 * Custom ESLint Plugin: No Duplicate Nav Prefix
 *
 * Ensures every expandable sidebar nav item has a unique `pathPrefix`.
 * Duplicate prefixes cause multiple sidebar items to highlight simultaneously
 * because `NavExpandableItem` uses `location.pathname.startsWith(pathPrefix)`.
 *
 * Scoped to: src/components/layout/Sidebar/sidebarNavData.ts
 */

const noDuplicateNavPrefixRule = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallow duplicate pathPrefix values in sidebar nav data. ' +
        'Duplicate prefixes cause multiple nav items to highlight at once.',
      category: 'Possible Errors',
      recommended: true,
    },
    schema: [],
    messages: {
      duplicatePrefix:
        'Duplicate pathPrefix "{{value}}" — each expandable nav item must have a unique prefix.',
    },
  },

  create(context) {
    return {
      ArrayExpression(node) {
        // Only inspect arrays that contain objects with pathPrefix
        const objectsWithPrefix = node.elements.filter(
          (el) =>
            el &&
            el.type === 'ObjectExpression' &&
            el.properties.some(
              (p) =>
                p.type === 'Property' &&
                p.key.type === 'Identifier' &&
                p.key.name === 'pathPrefix',
            ),
        );

        if (objectsWithPrefix.length === 0) return;

        /** @type {Map<string, import('estree').Property>} */
        const seen = new Map();

        for (const obj of objectsWithPrefix) {
          const prop = obj.properties.find(
            (p) =>
              p.type === 'Property' &&
              p.key.type === 'Identifier' &&
              p.key.name === 'pathPrefix',
          );
          if (!prop) continue;

          let value;
          if (prop.value.type === 'Literal') {
            value = String(prop.value.value);
          } else if (prop.value.type === 'MemberExpression') {
            const src = context.sourceCode || context.getSourceCode();
            value = src.getText(prop.value);
          } else {
            continue;
          }

          if (seen.has(value)) {
            context.report({
              node: prop.value,
              messageId: 'duplicatePrefix',
              data: { value },
            });
          } else {
            seen.set(value, prop);
          }
        }
      },
    };
  },
};

export default {
  rules: {
    'no-duplicate-nav-prefix': noDuplicateNavPrefixRule,
  },
};
