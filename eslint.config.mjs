import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import unusedImportsPlugin from 'eslint-plugin-unused-imports';
import prettierConfig from 'eslint-config-prettier';
import i18nextPlugin from 'eslint-plugin-i18next';
import jsoncParser from 'jsonc-eslint-parser';
import smartMaxLinesPlugin from './eslint-plugins/smart-max-lines.mjs';
import noNullCheckPlugin from './eslint-plugins/no-null-check.mjs';
import i18nInterpolationPlugin from './eslint-plugins/i18n-interpolation.mjs';
import enforceLazyPreloadPlugin from './eslint-plugins/enforce-lazy-preload.mjs';
import preferConstEnumPlugin from './eslint-plugins/prefer-const-enum.mjs';
import enumFileIsolationPlugin from './eslint-plugins/enum-file-isolation.mjs';
import reactCompilerPlugin from 'eslint-plugin-react-compiler';
import requireStableHookArgsPlugin from './eslint-plugins/require-stable-hook-args.mjs';
import noBarrelCompanionFilePlugin from './eslint-plugins/no-barrel-companion-file.mjs';
import noDuplicateNavPrefixPlugin from './eslint-plugins/no-duplicate-nav-prefix.mjs';
import noInlineSvgIconsPlugin from './eslint-plugins/no-inline-svg-icons.mjs';

export default [
  // =====================================================
  // IGNORE PATTERNS
  // =====================================================
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'dev-dist/**', // PWA service worker dev files
      '**/*.d.ts',
      'public/**',
      '*.config.js',
      '*.config.mjs',
      '*.config.ts',
      'src/api/generated/**',
      'eslint-plugins/**',
      'coverage/**',
      'playwright-report/**',
      'e2e/**',
      'scripts/**', // Node.js build scripts
    ],
  },

  // Base JavaScript rules
  js.configs.recommended,

  // =====================================================
  // TYPESCRIPT CONFIGURATION
  // =====================================================
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
        project: './tsconfig.json',
      },
      globals: {
        // Browser globals only (no React Native)
        fetch: 'readonly',
        FormData: 'readonly',
        Headers: 'readonly',
        Request: 'readonly',
        Response: 'readonly',
        AbortController: 'readonly',
        Blob: 'readonly',
        File: 'readonly',
        FileReader: 'readonly',
        URL: 'readonly',
        URLSearchParams: 'readonly',
        WebSocket: 'readonly',
        console: 'readonly',
        setTimeout: 'readonly',
        setInterval: 'readonly',
        clearTimeout: 'readonly',
        clearInterval: 'readonly',
        requestAnimationFrame: 'readonly',
        cancelAnimationFrame: 'readonly',
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        localStorage: 'readonly',
        sessionStorage: 'readonly',
        HTMLElement: 'readonly',
        HTMLInputElement: 'readonly',
        HTMLButtonElement: 'readonly',
        Element: 'readonly',
        Event: 'readonly',
        MouseEvent: 'readonly',
        KeyboardEvent: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      'react': reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
      'import': importPlugin,
      'unused-imports': unusedImportsPlugin,
      'smart-max-lines': smartMaxLinesPlugin,
      'no-null-check': noNullCheckPlugin,
      'prefer-const-enum': preferConstEnumPlugin,
      'enum-file-isolation': enumFileIsolationPlugin,
      'react-compiler': reactCompilerPlugin,
      'require-stable-hook-args': requireStableHookArgsPlugin,
      'no-barrel-companion-file': noBarrelCompanionFilePlugin,
      'no-inline-svg-icons': noInlineSvgIconsPlugin,
    },
    settings: {
      react: { version: 'detect' },
      'import/resolver': {
        typescript: { alwaysTryTypes: true },
      },
    },
    rules: {
      // TypeScript handles undefined identifiers
      'no-undef': 'off',

      // =====================================================
      // TYPESCRIPT STRICT RULES - NO ANY ALLOWED!
      // =====================================================
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unsafe-argument': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/no-unsafe-return': 'error',
      '@typescript-eslint/no-unsafe-enum-comparison': 'error',

      // Type safety
      '@typescript-eslint/strict-boolean-expressions': ['error', {
        allowString: false,
        allowNumber: false,
        allowNullableObject: true,
        allowNullableBoolean: false,
        allowNullableString: false,
        allowNullableNumber: false,
        allowAny: false,
      }],
      '@typescript-eslint/no-unnecessary-condition': 'error',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/switch-exhaustiveness-check': 'error',

      // Ban type assertions
      '@typescript-eslint/consistent-type-assertions': ['error', {
        assertionStyle: 'never',
      }],

      // Function and method rules
      '@typescript-eslint/explicit-function-return-type': ['error', {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
        allowHigherOrderFunctions: true,
        allowDirectConstAssertionInArrowFunctions: true,
        allowConciseArrowFunctionExpressionsStartingWithVoid: true,
      }],
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/no-misused-promises': ['error', {
        checksVoidReturn: { attributes: false },
      }],
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/promise-function-async': 'error',
      '@typescript-eslint/require-await': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-for-in-array': 'error',

      // Variable and declaration rules
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      }],
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/no-use-before-define': ['error', {
        functions: false,
        classes: true,
        variables: true,
      }],
      '@typescript-eslint/no-redeclare': 'error',
      '@typescript-eslint/no-duplicate-enum-values': 'error',

      // Code quality
      '@typescript-eslint/no-unnecessary-type-arguments': 'error',
      '@typescript-eslint/no-redundant-type-constituents': 'error',
      '@typescript-eslint/no-meaningless-void-operator': 'error',
      '@typescript-eslint/no-confusing-void-expression': ['error', {
        ignoreArrowShorthand: true,
      }],
      '@typescript-eslint/no-invalid-void-type': 'error',
      '@typescript-eslint/unified-signatures': 'error',
      '@typescript-eslint/prefer-reduce-type-parameter': 'error',
      '@typescript-eslint/prefer-includes': 'error',
      '@typescript-eslint/prefer-string-starts-ends-with': 'error',
      '@typescript-eslint/prefer-find': 'error',
      '@typescript-eslint/prefer-as-const': 'error',
      '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],

      // Consistency rules
      '@typescript-eslint/consistent-type-imports': ['error', {
        prefer: 'type-imports',
        fixStyle: 'inline-type-imports',
        disallowTypeAnnotations: true,
      }],
      '@typescript-eslint/consistent-type-exports': ['error', {
        fixMixedExportsWithInlineTypeSpecifier: true,
      }],
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/consistent-generic-constructors': ['error', 'constructor'],
      '@typescript-eslint/consistent-indexed-object-style': ['error', 'record'],
      '@typescript-eslint/method-signature-style': ['error', 'property'],
      '@typescript-eslint/naming-convention': [
        'error',
        { selector: 'default', format: ['camelCase'], leadingUnderscore: 'allow' },
        { selector: 'variable', format: ['camelCase', 'UPPER_CASE', 'PascalCase'], leadingUnderscore: 'allow' },
        { selector: 'parameter', format: ['camelCase'], leadingUnderscore: 'allow' },
        { selector: 'typeLike', format: ['PascalCase'] },
        { selector: 'enumMember', format: ['PascalCase', 'UPPER_CASE'] },
        { selector: 'function', format: ['camelCase', 'PascalCase'] },
        { selector: 'objectLiteralProperty', format: null },
        { selector: 'typeProperty', format: null }, // Allow numeric keys in interfaces like ColorScale
        { selector: 'objectLiteralMethod', format: ['camelCase', 'PascalCase'] },
        { selector: 'import', format: ['camelCase', 'PascalCase'] },
      ],

      // Disable base ESLint rules handled by TypeScript
      'no-unused-vars': 'off',
      'no-shadow': 'off',
      'no-use-before-define': 'off',
      'no-redeclare': 'off',
      'require-await': 'off',
      'no-return-await': 'off',

      // =====================================================
      // REACT RULES
      // =====================================================
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/display-name': 'error',
      'react/jsx-key': ['error', { checkFragmentShorthand: true, checkKeyMustBeforeSpread: true }],
      'react/jsx-no-duplicate-props': 'error',
      'react/jsx-no-undef': 'error',
      'react/jsx-pascal-case': 'error',
      'react/jsx-uses-vars': 'error',
      'react/no-children-prop': 'error',
      'react/no-danger-with-children': 'error',
      'react/no-deprecated': 'error',
      'react/no-direct-mutation-state': 'error',
      'react/no-find-dom-node': 'error',
      'react/no-is-mounted': 'error',
      'react/no-render-return-value': 'error',
      'react/no-string-refs': 'error',
      'react/no-unescaped-entities': 'error',
      'react/no-unknown-property': 'error',
      'react/no-unsafe': ['error', { checkAliases: true }],
      'react/self-closing-comp': 'error',
      'react/jsx-boolean-value': ['error', 'never'],
      'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
      'react/jsx-fragments': ['error', 'syntax'],
      'react/jsx-no-useless-fragment': 'error',
      'react/jsx-sort-props': ['error', {
        callbacksLast: true,
        shorthandFirst: true,
        ignoreCase: true,
        reservedFirst: true,
      }],
      'react/function-component-definition': ['error', {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      }],
      'react/hook-use-state': 'error',
      'react/no-unstable-nested-components': ['error', { allowAsProps: true }],
      'react/no-array-index-key': 'error',
      'react/jsx-no-leaked-render': 'error',
      'react/jsx-no-literals': ['warn', {
        noStrings: true,
        allowedStrings: [
          '/', '-', '>', '<', '|', ':', '.', ',', '+', '=', '(', ')',
          '*', '%', '$', '#', '&', '@', '~', '^', '!', '?', ';',
        ],
        ignoreProps: true,
        noAttributeStrings: false,
      }],

      // =====================================================
      // REACT HOOKS RULES
      // =====================================================
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',

      // =====================================================
      // REACT COMPILER & HOOK STABILITY RULES
      // =====================================================
      // React Compiler ESLint: catches violations of React's Rules
      // (unstable refs in deps, conditional hooks, mutating props, etc.)
      'react-compiler/react-compiler': 'warn',
      // Custom: flags functions/objects/arrays passed to hooks without useCallback/useMemo
      'require-stable-hook-args/require-stable-hook-args': ['warn', {
        ignoreHookPatterns: [
          // Auto-generated API hooks (safe - don't use args as deps)
          '^useApi',
          // Internal hook-to-hook composition (args derived from parent hook params, stable by design)
          '^useEdit',
          '^useSelection',
          '^useRowClick',
          '^useDataPipeline$',
          '^useTable',
        ],
      }],

      // =====================================================
      // WEB ACCESSIBILITY RULES (jsx-a11y)
      // =====================================================
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/anchor-has-content': 'error',
      'jsx-a11y/anchor-is-valid': 'error',
      'jsx-a11y/aria-activedescendant-has-tabindex': 'error',
      'jsx-a11y/aria-props': 'error',
      'jsx-a11y/aria-proptypes': 'error',
      'jsx-a11y/aria-role': 'error',
      'jsx-a11y/aria-unsupported-elements': 'error',
      'jsx-a11y/click-events-have-key-events': 'error',
      'jsx-a11y/heading-has-content': 'error',
      'jsx-a11y/html-has-lang': 'error',
      'jsx-a11y/iframe-has-title': 'error',
      'jsx-a11y/img-redundant-alt': 'error',
      'jsx-a11y/interactive-supports-focus': 'error',
      'jsx-a11y/label-has-associated-control': 'error',
      'jsx-a11y/mouse-events-have-key-events': 'error',
      'jsx-a11y/no-access-key': 'error',
      'jsx-a11y/no-autofocus': 'warn',
      'jsx-a11y/no-distracting-elements': 'error',
      'jsx-a11y/no-interactive-element-to-noninteractive-role': 'error',
      'jsx-a11y/no-noninteractive-element-interactions': 'error',
      'jsx-a11y/no-noninteractive-element-to-interactive-role': 'error',
      'jsx-a11y/no-noninteractive-tabindex': 'error',
      'jsx-a11y/no-redundant-roles': 'error',
      'jsx-a11y/no-static-element-interactions': 'error',
      'jsx-a11y/role-has-required-aria-props': 'error',
      'jsx-a11y/role-supports-aria-props': 'error',
      'jsx-a11y/scope': 'error',
      'jsx-a11y/tabindex-no-positive': 'error',

      // =====================================================
      // IMPORT RULES (adapted for Vite/web)
      // =====================================================
      'import/first': 'error',
      'import/no-duplicates': 'error',
      'import/no-self-import': 'error',
      'import/no-cycle': 'error',
      'import/no-useless-path-segments': 'error',
      'import/newline-after-import': 'error',
      'import/no-mutable-exports': 'error',
      'import/order': ['error', {
        'groups': [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling'],
          'index',
          'object',
          'type',
        ],
        'pathGroups': [
          { pattern: 'react', group: 'builtin', position: 'before' },
          { pattern: 'react-dom', group: 'builtin', position: 'before' },
          { pattern: 'react-router-dom', group: 'builtin', position: 'before' },
          { pattern: '@syncfusion/**', group: 'external', position: 'after' },
          { pattern: '@tanstack/**', group: 'external', position: 'after' },
          { pattern: '@/**', group: 'internal', position: 'before' },
        ],
        'pathGroupsExcludedImportTypes': ['react', 'react-dom'],
        'newlines-between': 'always',
        'alphabetize': { order: 'asc', caseInsensitive: true },
      }],

      // =====================================================
      // UNUSED IMPORTS
      // =====================================================
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': 'off',

      // =====================================================
      // FILE AND FUNCTION SIZE LIMITS (custom plugins)
      // =====================================================
      'max-lines': ['error', {
        max: 200,
        skipBlankLines: true,
        skipComments: true,
      }],
      'smart-max-lines/smart-max-lines': ['error', {
        componentMax: 200,
        functionMax: 50,
        functionWarn: 30,
        skipBlankLines: true,
        skipComments: true,
      }],

      // =====================================================
      // NULL CHECK RULE (custom plugin)
      // =====================================================
      'no-null-check/no-null-check': 'error',

      // =====================================================
      // ENUM ENFORCEMENT (custom plugins)
      // =====================================================
      'prefer-const-enum/prefer-const-enum': 'warn',
      'enum-file-isolation/enum-file-isolation': 'warn',

      // =====================================================
      // BARREL FILE CONFLICT PREVENTION
      // =====================================================
      // Flags foo.ts when foo/index.ts also exists (TS resolves to file, ignoring barrel)
      'no-barrel-companion-file/no-barrel-companion-file': 'error',

      // =====================================================
      // ICON PLACEMENT ENFORCEMENT
      // =====================================================
      // All SVG icon components must live in src/components/icons/
      'no-inline-svg-icons/no-inline-svg-icons': 'error',

      // =====================================================
      // GENERAL BEST PRACTICES
      // =====================================================
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      'no-alert': 'error',
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
      'no-script-url': 'error',
      'no-void': 'error',
      'no-with': 'error',
      'no-proto': 'error',
      'no-extend-native': 'error',
      'no-iterator': 'error',
      'no-labels': 'error',
      'no-lone-blocks': 'error',
      'no-multi-str': 'error',
      'no-new-wrappers': 'error',
      'no-octal-escape': 'error',
      'no-self-compare': 'error',
      'no-sequences': 'error',
      'no-throw-literal': 'error',
      'no-unmodified-loop-condition': 'error',
      'no-unused-expressions': 'error',
      'no-useless-call': 'error',
      'no-useless-concat': 'error',
      'no-useless-return': 'error',
      'prefer-promise-reject-errors': 'error',
      'radix': 'error',
      'yoda': 'error',
      'eqeqeq': ['error', 'always'],
      'curly': ['error', 'multi'],
      'default-case': 'error',
      'default-case-last': 'error',
      'grouped-accessor-pairs': 'error',
      'no-constructor-return': 'error',
      'no-else-return': 'error',
      'no-empty-function': ['error', { allow: ['arrowFunctions'] }],
      'no-extra-bind': 'error',
      'no-floating-decimal': 'error',
      'no-implicit-coercion': 'error',
      'no-multi-spaces': 'error',
      'no-param-reassign': ['error', { props: true }],
      'no-return-assign': 'error',
      'prefer-const': 'error',
      'prefer-template': 'error',
      'object-shorthand': 'error',
      'no-var': 'error',
      'no-nested-ternary': 'error',
      'no-unneeded-ternary': 'error',
      'spaced-comment': ['error', 'always'],
      'max-depth': ['error', 4],
      'max-nested-callbacks': ['error', 3],
      'max-params': ['error', 4],
      'complexity': ['warn', 15],
      'no-magic-numbers': ['error', {
        ignore: [0, 1, -1, 2, 100],
        ignoreArrayIndexes: true,
        ignoreDefaultValues: true,
        enforceConst: true,
        ignoreClassFieldInitialValues: true,
      }],
      'no-restricted-syntax': [
        'error',
        { selector: 'TSEnumDeclaration:not([const])', message: 'Use const enum instead of enum. String literal union types should also use const enum.' },
        { selector: 'IfStatement > LogicalExpression[left.type="LogicalExpression"]', message: 'Condition has more than 2 expressions. Extract to a named variable' },
        { selector: 'IfStatement > LogicalExpression[right.type="LogicalExpression"]', message: 'Condition has more than 2 expressions. Extract to a named variable' },
        { selector: 'ConditionalExpression > LogicalExpression[left.type="LogicalExpression"]', message: 'Ternary condition has more than 2 expressions. Extract to a named variable' },
        { selector: 'ConditionalExpression > LogicalExpression[right.type="LogicalExpression"]', message: 'Ternary condition has more than 2 expressions. Extract to a named variable' },
        { selector: 'WhileStatement > LogicalExpression[left.type="LogicalExpression"]', message: 'While condition has more than 2 expressions. Extract to a named variable' },
        { selector: 'WhileStatement > LogicalExpression[right.type="LogicalExpression"]', message: 'While condition has more than 2 expressions. Extract to a named variable' },
      ],
    },
  },

  // =====================================================
  // I18N ENFORCEMENT - No hardcoded user-facing strings
  // =====================================================
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: { 'i18next': i18nextPlugin },
    rules: {
      'i18next/no-literal-string': ['warn', {
        markupOnly: true,
        ignoreAttribute: [
          'className', 'style', 'id', 'key', 'ref', 'type', 'name', 'value',
          'defaultValue', 'href', 'src', 'as', 'to', 'from',
          'mode', 'variant', 'size', 'color',
          'data-testid', 'testId',
          'cssClass', 'iconCss',
          'aria-hidden', 'aria-live', 'aria-current', 'aria-expanded',
          'aria-selected', 'aria-checked',
          'd', 'viewBox', 'fill', 'stroke', 'strokeWidth',
          'strokeLinecap', 'strokeLinejoin', 'xmlns',
          'role', 'tabIndex', 'htmlFor', 'autoComplete', 'autoFocus',
        ],
        ignoreCallee: [
          'require', 'Error', 'URL', 'console.*', 'cn',
          'navigate', 'useNavigate',
        ],
        ignoreProperty: [
          'className', 'style', 'id', 'key', 'type', 'name',
          'variant', 'mode', 'path', 'cssClass', 'iconCss',
          'fontFamily', 'fontWeight', 'textAlign', 'display',
        ],
        ignore: [
          '^[A-Z_]+$',
          '^#[0-9a-fA-F]+$',
          '^rgba?\\(',
          '^hsl',
          '^var\\(--',
          '^e-',
          '^M\\d',
        ],
      }],
    },
  },

  // =====================================================
  // TEST FILE OVERRIDES
  // =====================================================
  {
    files: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx', '**/__tests__/**', '**/test/fixtures/**'],
    languageOptions: {
      globals: {
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        vi: 'readonly',
        beforeAll: 'readonly',
        beforeEach: 'readonly',
        afterAll: 'readonly',
        afterEach: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/consistent-type-assertions': ['error', {
        assertionStyle: 'as',
        objectLiteralTypeAssertions: 'allow-as-parameter',
      }],
      'max-lines': 'off', // Test files can be longer due to setup/assertions/fixtures
      'max-nested-callbacks': 'off',
      'smart-max-lines/smart-max-lines': 'off',
      'no-magic-numbers': 'off',
      'no-console': 'off',
      'no-script-url': 'off',
      'no-null-check/no-null-check': 'off', // Allow null/undefined checks in test mocks
      'prefer-const-enum/prefer-const-enum': 'off',
      'enum-file-isolation/enum-file-isolation': 'off',
      'react/jsx-no-literals': 'off', // Tests often have hardcoded strings in assertions
      'i18next/no-literal-string': 'off', // Tests use hardcoded strings
      'react-compiler/react-compiler': 'off',
      'require-stable-hook-args/require-stable-hook-args': 'off',
    },
  },

  // Allow console usage in the centralized logger utility only
  {
    files: ['src/utils/logger.ts'],
    rules: {
      'no-console': 'off',
    },
  },

  // =====================================================
  // I18N INTERPOLATION - Enforce {{p1}}/{{p2}}/{{p3}} in translation JSON
  // =====================================================
  {
    files: ['src/localization/locales/*.json'],
    languageOptions: {
      parser: jsoncParser,
    },
    plugins: {
      'i18n-interpolation': i18nInterpolationPlugin,
    },
    rules: {
      'i18n-interpolation/i18n-interpolation': 'error',
    },
  },

  // =====================================================
  // ENFORCE LAZY ROUTE PRELOADING
  // =====================================================
  {
    files: ['src/app/routes.tsx'],
    plugins: {
      'enforce-lazy-preload': enforceLazyPreloadPlugin,
    },
    rules: {
      'enforce-lazy-preload/enforce-lazy-preload': ['error', {
        preloadFunctionName: 'preloadRoutePages',
      }],
    },
  },

  // =====================================================
  // ENFORCE BARREL IMPORTS FOR UI COMPONENTS
  // =====================================================
  // Prevents importing directly from component folders (e.g. @/components/ui/ButtonNative).
  // Must use barrel exports: @/components/ui/native, @/components/ui/syncfusion, @/components/ui/form-fields.
  // Excludes src/components/ui/** since the barrels themselves need direct access.
  {
    files: ['src/features/**/*.ts', 'src/features/**/*.tsx', 'src/app/**/*.ts', 'src/app/**/*.tsx', 'src/lib/**/*.ts', 'src/lib/**/*.tsx'],
    rules: {
      'no-restricted-imports': ['error', {
        patterns: [{
          group: [
            '@/components/ui/*',
            '!@/components/ui/native',
            '!@/components/ui/syncfusion',
            '!@/components/ui/form-fields',
          ],
          message: 'Import from barrel exports (@/components/ui/native, @/components/ui/syncfusion, or @/components/ui/form-fields) instead of directly from component folders.',
        }],
      }],
    },
  },

  // =====================================================
  // SIDEBAR NAV PREFIX UNIQUENESS
  // =====================================================
  {
    files: ['src/components/layout/Sidebar/sidebarNavData.ts'],
    plugins: {
      'no-duplicate-nav-prefix': noDuplicateNavPrefixPlugin,
    },
    rules: {
      'no-duplicate-nav-prefix/no-duplicate-nav-prefix': 'error',
    },
  },

  // Prettier config (overrides formatting rules)
  prettierConfig,

  // Re-enable curly after Prettier
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      'curly': ['error', 'multi'],
    },
  },
];
