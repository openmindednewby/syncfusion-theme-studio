/**
 * Custom ESLint Plugin: No Null/Undefined Check
 *
 * Prohibits direct null/undefined checks (!== null, === null, !== undefined, === undefined)
 * and requires using isValueDefined() or isNullOrUndefined() from '@dloizides/utils' instead.
 *
 * These utility functions handle both null and undefined, providing
 * consistent and safer null checking across the codebase.
 *
 * Examples:
 *   BAD:  if (item !== null) { ... }
 *   BAD:  if (item !== undefined) { ... }
 *   GOOD: if (isValueDefined(item)) { ... }
 *
 *   BAD:  if (item === null) { ... }
 *   BAD:  if (item === undefined) { ... }
 *   GOOD: if (!isValueDefined(item)) { ... }
 *   GOOD: if (isNullOrUndefined(item)) { ... }
 */

const noNullCheckRule = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Disallow direct null/undefined checks. Use isValueDefined() or isNullOrUndefined() instead.',
      category: 'Best Practices',
      recommended: true,
    },
    fixable: 'code',
    schema: [
      {
        type: 'object',
        properties: {
          utilImportPath: {
            type: 'string',
            description: 'Import path for the utility functions',
            default: '@dloizides/utils',
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      noNotEqualsNull:
        'Avoid "!== null". Catches only null, not undefined — use isValueDefined({{identifier}}) to handle both consistently.',
      noEqualsNull:
        'Avoid "=== null". Catches only null, not undefined — use !isValueDefined({{identifier}}) or isNullOrUndefined({{identifier}}).',
      noNotEqualsNullComplex:
        'Avoid "!== null". Catches only null, not undefined — use isValueDefined() to handle both consistently.',
      noEqualsNullComplex:
        'Avoid "=== null". Catches only null, not undefined — use !isValueDefined() or isNullOrUndefined().',
      noNotEqualsUndefined:
        'Avoid "!== undefined". Catches only undefined, not null — use isValueDefined({{identifier}}) to handle both consistently.',
      noEqualsUndefined:
        'Avoid "=== undefined". Catches only undefined, not null — use !isValueDefined({{identifier}}) or isNullOrUndefined({{identifier}}).',
      noNotEqualsUndefinedComplex:
        'Avoid "!== undefined". Catches only undefined, not null — use isValueDefined() to handle both consistently.',
      noEqualsUndefinedComplex:
        'Avoid "=== undefined". Catches only undefined, not null — use !isValueDefined() or isNullOrUndefined().',
    },
  },

  create(context) {
    const sourceCode = context.sourceCode || context.getSourceCode();

    /**
     * Check if a node is a null literal
     */
    function isNullLiteral(node) {
      return node && node.type === 'Literal' && node.value === null;
    }

    /**
     * Check if a node is an undefined identifier
     */
    function isUndefinedIdentifier(node) {
      return node && node.type === 'Identifier' && node.name === 'undefined';
    }

    /**
     * Get the source text for a node
     */
    function getNodeText(node) {
      return sourceCode.getText(node);
    }

    /**
     * Check if the identifier is simple enough for a clean message
     */
    function isSimpleIdentifier(node) {
      return (
        node.type === 'Identifier' ||
        (node.type === 'MemberExpression' && !node.computed)
      );
    }

    /**
     * Handle binary expressions (===, !==)
     */
    function checkBinaryExpression(node) {
      const { operator, left, right } = node;

      // Only handle === and !==
      if (operator !== '===' && operator !== '!==') {
        return;
      }

      // Check if either side is null or undefined
      const leftIsNull = isNullLiteral(left);
      const rightIsNull = isNullLiteral(right);
      const leftIsUndefined = isUndefinedIdentifier(left);
      const rightIsUndefined = isUndefinedIdentifier(right);

      const isNullCheck = leftIsNull || rightIsNull;
      const isUndefinedCheck = leftIsUndefined || rightIsUndefined;

      if (!isNullCheck && !isUndefinedCheck) {
        return;
      }

      // Get the non-null/undefined operand
      const valueNode = (leftIsNull || leftIsUndefined) ? right : left;
      const valueText = getNodeText(valueNode);
      const isSimple = isSimpleIdentifier(valueNode);

      if (operator === '!==') {
        // item !== null/undefined -> isValueDefined(item)
        const messageId = isNullCheck
          ? (isSimple ? 'noNotEqualsNull' : 'noNotEqualsNullComplex')
          : (isSimple ? 'noNotEqualsUndefined' : 'noNotEqualsUndefinedComplex');

        context.report({
          node,
          messageId,
          data: isSimple ? { identifier: valueText } : {},
          fix(fixer) {
            return fixer.replaceText(node, `isValueDefined(${valueText})`);
          },
        });
      } else {
        // item === null/undefined -> !isValueDefined(item)
        const messageId = isNullCheck
          ? (isSimple ? 'noEqualsNull' : 'noEqualsNullComplex')
          : (isSimple ? 'noEqualsUndefined' : 'noEqualsUndefinedComplex');

        context.report({
          node,
          messageId,
          data: isSimple ? { identifier: valueText } : {},
          fix(fixer) {
            return fixer.replaceText(node, `!isValueDefined(${valueText})`);
          },
        });
      }
    }

    return {
      BinaryExpression: checkBinaryExpression,
    };
  },
};

/**
 * Export the plugin
 */
export default {
  rules: {
    'no-null-check': noNullCheckRule,
  },
};
