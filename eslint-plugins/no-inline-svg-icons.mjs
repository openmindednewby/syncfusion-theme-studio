/**
 * Custom ESLint Plugin: No Inline SVG Icons
 *
 * Prevents defining SVG icon components outside of `src/components/icons/`.
 * All reusable SVG icons must be centralized in the icons directory to:
 *   1. Eliminate duplication across files
 *   2. Enable natural Vite code-splitting (AppIcons, SettingsIcons, ShowcaseIcons)
 *   3. Maintain a single source of truth for icon components
 *
 * Detects exported arrow functions whose body is a JSX `<svg>` element.
 *
 * Configurable exceptions for stateful mini-components that are NOT
 * reusable icons (e.g. ThemeToggleNative, SelectNative/ChevronIcon).
 */

const ICONS_DIR = 'src/components/icons';

const DEFAULT_ALLOWED_PATTERNS = [
  'ThemeToggleNative',
  'SelectNative',
  'ChevronIcon',
  'NativeChipShowcase',
  'NativeAccordionShowcase',
];

/**
 * Checks if a JSXElement's opening tag is <svg>.
 */
function isSvgElement(node) {
  return (
    node.type === 'JSXElement' &&
    node.openingElement.name.type === 'JSXIdentifier' &&
    node.openingElement.name.name === 'svg'
  );
}

/**
 * Gets the JSX body from an arrow function, handling both
 * expression bodies `() => (<svg>)` and block bodies `() => { return <svg>; }`.
 */
function getReturnedJsx(fnNode) {
  const { body } = fnNode;
  if (!body) return null;

  // Expression body: () => (<svg>...</svg>)
  if (body.type === 'JSXElement') return body;

  // Block body: () => { return <svg>...</svg>; }
  if (body.type === 'BlockStatement') {
    for (const stmt of body.body) {
      if (stmt.type === 'ReturnStatement' && stmt.argument?.type === 'JSXElement')
        return stmt.argument;
    }
  }

  return null;
}

const noInlineSvgIconsRule = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Disallow defining SVG icon components outside of src/components/icons/. ' +
        'All reusable icons must be centralized for code-splitting and deduplication.',
      category: 'Best Practices',
      recommended: true,
    },
    schema: [
      {
        type: 'object',
        properties: {
          allowedPatterns: {
            type: 'array',
            items: { type: 'string' },
            description:
              'File path substrings that are exempt from this rule ' +
              '(e.g. "ThemeToggleNative" for stateful icon components).',
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      noInlineSvgIcon:
        'SVG icon "{{name}}" should be defined in src/components/icons/, not here. ' +
        'Move it to AppIcons.tsx, SettingsIcons.tsx, or ShowcaseIcons.tsx and import from @/components/icons.',
    },
  },

  create(context) {
    const filePath = context.filename || context.getFilename();
    if (!filePath) return {};

    // Normalize path separators for cross-platform support
    const normalized = filePath.replace(/\\/g, '/');

    // Skip files inside the icons directory — they ARE the icon files
    if (normalized.includes(ICONS_DIR)) return {};

    // Skip allowed exception patterns
    const options = context.options[0] || {};
    const allowedPatterns = options.allowedPatterns || DEFAULT_ALLOWED_PATTERNS;
    const isAllowed = allowedPatterns.some((pattern) => normalized.includes(pattern));
    if (isAllowed) return {};

    return {
      ExportNamedDeclaration(node) {
        // Match: export const FooIcon = (...) => <svg>...</svg>
        const declaration = node.declaration;
        if (!declaration || declaration.type !== 'VariableDeclaration') return;

        for (const declarator of declaration.declarations) {
          if (
            declarator.init &&
            declarator.init.type === 'ArrowFunctionExpression'
          ) {
            const jsx = getReturnedJsx(declarator.init);
            if (jsx && isSvgElement(jsx)) {
              const name = declarator.id?.name || 'anonymous';
              context.report({
                node: declarator,
                messageId: 'noInlineSvgIcon',
                data: { name },
              });
            }
          }
        }
      },
    };
  },
};

export default {
  rules: {
    'no-inline-svg-icons': noInlineSvgIconsRule,
  },
};
