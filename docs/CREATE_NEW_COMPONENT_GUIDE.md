# Creating a New Shared Reusable Component

> Back to [README](../README.md) | See also: [CSS Architecture](CSS_ARCHITECTURE.md) · [CSS Customization](CSS_CUSTOMIZATION.md) · [Create New Feature Guide](CREATE_NEW_FEATURE_GUIDE.md)

This guide walks you through creating a **new shared native UI component** (e.g. a "ProgressRingNative") from scratch — including the component itself, types, CSS classes, theme variables, barrel export, unit tests, and documentation.

All native components live in `src/components/ui/native/` and follow the same conventions as `ButtonNative`, `InputNative`, `DialogNative`, etc.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Overview — What Files You'll Touch](#overview--what-files-youll-touch)
3. [Step 1 — Create the Component Directory](#step-1--create-the-component-directory)
4. [Step 2 — Define Shared Types](#step-2--define-shared-types)
5. [Step 3 — Create the Component](#step-3--create-the-component)
6. [Step 4 — Add CSS Classes](#step-4--add-css-classes)
7. [Step 5 — Add Theme CSS Variables](#step-5--add-theme-css-variables)
8. [Step 6 — Register the Theme Injector](#step-6--register-the-theme-injector)
9. [Step 7 — Export from Barrel File](#step-7--export-from-barrel-file)
10. [Step 8 — Write Unit Tests](#step-8--write-unit-tests)
11. [Step 9 — Verify Everything Works](#step-9--verify-everything-works)
12. [Complete File Map](#complete-file-map)
13. [Scaling Up — Complex Components](#scaling-up--complex-components)
14. [Common Mistakes](#common-mistakes)

---

## Prerequisites

Before starting, make sure you can run the project:

```bash
npm install
npm run local       # Verify the app runs on http://localhost:4444
npm run test        # Verify tests pass
```

Familiarize yourself with:

- The project uses **zero-dependency native components** (no Syncfusion) for lightweight pages like Login
- All styling uses **CSS variables** so themes can change at runtime (see [CSS Architecture](CSS_ARCHITECTURE.md))
- Components use `forwardRef` + `memo` for performance and ref forwarding
- Variants and sizes are defined as **const enums** in shared type files
- Every interactive element needs a `testId` prop for E2E testing

---

## Overview — What Files You'll Touch

| #   | What                          | File                                                                                     |
| --- | ----------------------------- | ---------------------------------------------------------------------------------------- |
| 1   | Component directory           | `src/components/ui/native/ProgressRingNative/index.tsx`                                  |
| 2   | Shared types (enum/interface) | `src/components/ui/shared/progressRingTypes.ts`                                          |
| 3   | CSS classes                   | `src/styles/layers/components-app.css` (or `components-critical.css` if needed on login) |
| 4   | Theme CSS variables           | `src/styles/layers/base.css` (`:root` defaults)                                          |
| 5   | Theme injector (optional)     | `src/stores/theme/injectors/injectProgressRingVariables.ts`                              |
| 6   | Barrel export                 | `src/components/ui/native/index.ts`                                                      |
| 7   | Shared barrel export          | `src/components/ui/shared/index.ts`                                                      |
| 8   | Unit test                     | `src/components/ui/native/ProgressRingNative/ProgressRingNative.test.tsx`                |

---

## Step 1 — Create the Component Directory

Create a new directory following the naming convention `{Name}Native`:

```
src/components/ui/native/ProgressRingNative/
├── index.tsx                        # Main component (default export)
└── ProgressRingNative.test.tsx      # Co-located unit test
```

**Naming rules:**

- Directory name: `PascalCase` + `Native` suffix (e.g. `ProgressRingNative`)
- Entry file: always `index.tsx` with a **default export**
- Test file: `{ComponentName}.test.tsx` — co-located in the same directory

---

## Step 2 — Define Shared Types

**File:** `src/components/ui/shared/progressRingTypes.ts`

Shared types ensure consistency if a Syncfusion wrapper of the same component is ever created. Define your variants, sizes, and base props here:

```ts
/** Progress ring visual variants */
export const enum ProgressRingVariant {
  Primary = 'primary',
  Success = 'success',
  Warning = 'warning',
  Danger = 'danger',
  Info = 'info',
}

/** Progress ring size presets */
export const enum ProgressRingSize {
  Sm = 'sm',
  Md = 'md',
  Lg = 'lg',
}

/** Base props shared between native and potential Syncfusion versions */
export interface BaseProgressRingProps {
  /** Current progress value (0–100) */
  value: number;
  /** Visual variant */
  variant?: ProgressRingVariant;
  /** Size preset */
  size?: ProgressRingSize;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for E2E testing */
  testId?: string;
  /** Accessible label */
  ariaLabel?: string;
}
```

**Conventions:**

- Use `const enum` for variants and sizes (tree-shakeable, zero runtime overhead)
- Always include `className`, `testId`, and `ariaLabel` in base props
- Add JSDoc comments on every prop — they show up in IDE tooltips
- Export types from `src/components/ui/shared/index.ts` (see Step 7)

---

## Step 3 — Create the Component

**File:** `src/components/ui/native/ProgressRingNative/index.tsx`

Use this template — it matches the conventions of all existing native components:

```tsx
/**
 * ProgressRingNative - Zero-dependency themed progress ring using native HTML/SVG.
 *
 * Provides a circular progress indicator with variant-based coloring,
 * size presets, and accessible progress semantics.
 * Uses .native-progress-ring CSS class with --component-progress-ring-* CSS variables.
 */
import { memo, forwardRef, type HTMLAttributes } from 'react';

import { ProgressRingVariant, ProgressRingSize } from '@/components/ui/shared/progressRingTypes';
import { cn } from '@/utils/cn';

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'className'> {
  /** Current progress value (0–100) */
  value: number;
  /** Visual variant */
  variant?: ProgressRingVariant;
  /** Size preset */
  size?: ProgressRingSize;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for E2E testing */
  testId?: string;
  /** Accessible label */
  ariaLabel?: string;
}

export { ProgressRingVariant, ProgressRingSize };

const VARIANT_CLASSES: Record<ProgressRingVariant, string> = {
  [ProgressRingVariant.Primary]: 'native-progress-ring-primary',
  [ProgressRingVariant.Success]: 'native-progress-ring-success',
  [ProgressRingVariant.Warning]: 'native-progress-ring-warning',
  [ProgressRingVariant.Danger]: 'native-progress-ring-danger',
  [ProgressRingVariant.Info]: 'native-progress-ring-info',
};

const SIZE_CLASSES: Record<ProgressRingSize, string> = {
  [ProgressRingSize.Sm]: 'native-progress-ring-sm',
  [ProgressRingSize.Md]: 'native-progress-ring-md',
  [ProgressRingSize.Lg]: 'native-progress-ring-lg',
};

const ProgressRingNative = forwardRef<HTMLDivElement, Props>(
  (
    {
      value,
      variant = ProgressRingVariant.Primary,
      size = ProgressRingSize.Md,
      className,
      testId,
      ariaLabel,
      ...rest
    },
    ref
  ): JSX.Element => {
    const clampedValue = Math.min(100, Math.max(0, value));

    return (
      <div
        ref={ref}
        aria-label={ariaLabel}
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={clampedValue}
        className={cn(
          'native-progress-ring',
          VARIANT_CLASSES[variant],
          SIZE_CLASSES[size],
          className
        )}
        data-testid={testId}
        role="progressbar"
        {...rest}
      >
        {/* SVG ring implementation here */}
      </div>
    );
  }
);

ProgressRingNative.displayName = 'ProgressRingNative';

export default memo(ProgressRingNative);
export type { Props as ProgressRingNativeProps };
```

### Key Conventions Explained

| Convention                     | Why                                                        | Example                                                 |
| ------------------------------ | ---------------------------------------------------------- | ------------------------------------------------------- |
| `forwardRef`                   | Allows parent components to access the DOM element         | `forwardRef<HTMLDivElement, Props>`                     |
| `memo` wrapping default export | Prevents unnecessary re-renders                            | `export default memo(ProgressRingNative)`               |
| `displayName`                  | Shows readable name in React DevTools                      | `ProgressRingNative.displayName = 'ProgressRingNative'` |
| Re-export enums                | Consumers import component + enums from one path           | `export { ProgressRingVariant, ProgressRingSize }`      |
| Export `Props` type            | Consumers can type-extend or compose                       | `export type { Props as ProgressRingNativeProps }`      |
| `cn()` class merging           | Combines base classes, variants, and custom classes safely | `cn('native-progress-ring', VARIANT_CLASSES[variant])`  |
| Variant/size record maps       | Maps enum values to CSS class names                        | `Record<ProgressRingVariant, string>`                   |
| `Omit<..., 'className'>`       | Prevents conflicting className types from native HTML      | `Omit<HTMLAttributes<HTMLDivElement>, 'className'>`     |
| Default export                 | Required for `lazy()` if ever lazy-loaded                  | `export default memo(...)`                              |
| `data-testid` prop             | E2E tests identify the component                           | `data-testid={testId}`                                  |
| Accessible attributes          | Screen readers understand the component                    | `role="progressbar"`, `aria-valuenow`                   |
| JSDoc file header              | Documents purpose and CSS class/variable naming            | `/** ProgressRingNative - ... */`                       |

---

## Step 4 — Add CSS Classes

Choose the correct CSS file based on where the component is used:

| CSS File                                    | When to Use                                                        |
| ------------------------------------------- | ------------------------------------------------------------------ |
| `src/styles/layers/components-critical.css` | Component needed on the **login page** (loaded upfront)            |
| `src/styles/layers/components-app.css`      | Component only used on **dashboard/protected pages** (lazy-loaded) |

**File:** `src/styles/layers/components-app.css` (most components go here)

Add your CSS inside the `@layer components` block:

```css
@layer components {
  /* ===== Progress Ring ===== */
  .native-progress-ring {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  /* Variants */
  .native-progress-ring-primary {
    color: var(--component-progress-ring-primary, rgb(59 130 246));
  }

  .native-progress-ring-success {
    color: var(--component-progress-ring-success, rgb(34 197 94));
  }

  .native-progress-ring-warning {
    color: var(--component-progress-ring-warning, rgb(234 179 8));
  }

  .native-progress-ring-danger {
    color: var(--component-progress-ring-danger, rgb(239 68 68));
  }

  .native-progress-ring-info {
    color: var(--component-progress-ring-info, rgb(6 182 212));
  }

  /* Sizes */
  .native-progress-ring-sm {
    width: 1.5rem;
    height: 1.5rem;
  }
  .native-progress-ring-md {
    width: 2.5rem;
    height: 2.5rem;
  }
  .native-progress-ring-lg {
    width: 4rem;
    height: 4rem;
  }
}
```

**CSS conventions:**

- Prefix all classes with `native-` (e.g. `native-progress-ring`)
- Use CSS variables with `--component-{name}-{property}` pattern for theme-able properties
- Always provide a fallback value: `var(--component-progress-ring-primary, rgb(59 130 246))`
- Group styles: base → variants → sizes → states (hover, focus, disabled)
- Add a comment header: `/* ===== Progress Ring ===== */`

---

## Step 5 — Add Theme CSS Variables

**File:** `src/styles/layers/base.css`

Add default values for your component's CSS variables inside the `:root` block:

```css
:root {
  /* ... existing variables ... */

  /* Progress Ring */
  --component-progress-ring-primary: rgb(var(--color-primary-500));
  --component-progress-ring-success: rgb(var(--color-success-500));
  --component-progress-ring-warning: rgb(var(--color-warning-500));
  --component-progress-ring-danger: rgb(var(--color-error-500));
  --component-progress-ring-info: rgb(var(--color-info-500));
  --component-progress-ring-track: rgb(var(--color-border) / 0.3);
  --component-progress-ring-track-width: 3px;
}
```

**Variable naming convention:**

```
--component-{component-name}-{property}
--component-{component-name}-{variant}-{property}
--component-{component-name}-{variant}-{state}-{property}
```

Examples:

- `--component-button-primary-bg` → button component, primary variant, background
- `--component-button-primary-bg-hover` → button, primary, hover state, background
- `--component-input-border-default` → input component, default border
- `--component-progress-ring-track-width` → progress ring, track width

---

## Step 6 — Register the Theme Injector

If your component supports **runtime theme customization** via the Theme Editor, you need an injector function. If the component only uses static CSS variable defaults (defined in Step 5), you can skip this step.

### 6a — Create the Injector

**File:** `src/stores/theme/injectors/injectProgressRingVariables.ts`

```ts
import type { ProgressRingConfig } from '../types';

export function injectProgressRingVariables(config: ProgressRingConfig, root: HTMLElement): void {
  const s = root.style;
  s.setProperty('--component-progress-ring-primary', config.primaryColor);
  s.setProperty('--component-progress-ring-success', config.successColor);
  s.setProperty('--component-progress-ring-track', config.trackColor);
  s.setProperty('--component-progress-ring-track-width', config.trackWidth);
}
```

### 6b — Add the Type Definition

**File:** `src/stores/theme/types.ts`

Add a config interface and include it in the components config:

```ts
export interface ProgressRingConfig {
  primaryColor: string;
  successColor: string;
  trackColor: string;
  trackWidth: string;
}

// Add to existing ComponentConfigSingle:
export interface ComponentConfigSingle {
  // ... existing components ...
  progressRing: ProgressRingConfig;
}
```

### 6c — Add Defaults

**File:** `src/stores/theme/defaults/lightComponentDefaults.ts` (and `darkComponentDefaults.ts`)

```ts
progressRing: {
  primaryColor: 'rgb(59 130 246)',
  successColor: 'rgb(34 197 94)',
  trackColor: 'rgb(229 231 235 / 0.3)',
  trackWidth: '3px',
},
```

### 6d — Register in the Orchestrator

**File:** `src/stores/theme/utils/themeInjector.ts`

```ts
import { injectProgressRingVariables } from '../injectors/injectProgressRingVariables';

// Inside injectThemeVariables():
injectProgressRingVariables(components.progressRing, root);
```

> **When to skip this step:** If your component doesn't need runtime theme editing (e.g. it only uses global color variables like `--color-primary-500`), you can skip Steps 6a–6d entirely. The CSS variables from Step 5 will still work.

---

## Step 7 — Export from Barrel File

### 7a — Native barrel

**File:** `src/components/ui/native/index.ts`

Add your component export **alphabetically** in the file:

```ts
export {
  default as ProgressRingNative,
  ProgressRingVariant,
  ProgressRingSize,
} from './ProgressRingNative';
export type { ProgressRingNativeProps } from './ProgressRingNative';
```

### 7b — Shared types barrel

**File:** `src/components/ui/shared/index.ts`

Export the shared types:

```ts
export { ProgressRingVariant } from './progressRingTypes';
export type { BaseProgressRingProps } from './progressRingTypes';
export { ProgressRingSize } from './progressRingTypes';
```

**Important:** Keep exports alphabetically sorted in both files.

---

## Step 8 — Write Unit Tests

**File:** `src/components/ui/native/ProgressRingNative/ProgressRingNative.test.tsx`

Follow the existing test structure. Tests are organized into `describe` blocks by behavior category:

```tsx
import { describe, it, expect } from 'vitest';

import { render, screen } from '@/test/utils';

import ProgressRingNative, { ProgressRingVariant, ProgressRingSize } from './index';

describe('ProgressRingNative', () => {
  describe('rendering', () => {
    it('renders with default props', () => {
      render(<ProgressRingNative testId="ring" value={50} />);
      expect(screen.getByTestId('ring')).toBeInTheDocument();
    });

    it('renders with the correct role', () => {
      render(<ProgressRingNative testId="ring" value={50} />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('sets aria-valuenow to the current value', () => {
      render(<ProgressRingNative testId="ring" value={75} />);
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '75');
    });

    it('sets aria-label when provided', () => {
      render(<ProgressRingNative ariaLabel="Loading" testId="ring" value={50} />);
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-label', 'Loading');
    });

    it('clamps value between 0 and 100', () => {
      render(<ProgressRingNative testId="ring" value={150} />);
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
    });
  });

  describe('variants', () => {
    it('applies primary variant class by default', () => {
      render(<ProgressRingNative testId="ring" value={50} />);
      expect(screen.getByTestId('ring')).toHaveClass('native-progress-ring-primary');
    });

    it('applies danger variant class', () => {
      render(<ProgressRingNative testId="ring" value={50} variant={ProgressRingVariant.Danger} />);
      expect(screen.getByTestId('ring')).toHaveClass('native-progress-ring-danger');
    });
  });

  describe('sizes', () => {
    it('applies medium size class by default', () => {
      render(<ProgressRingNative testId="ring" value={50} />);
      expect(screen.getByTestId('ring')).toHaveClass('native-progress-ring-md');
    });

    it('applies small size class', () => {
      render(<ProgressRingNative size={ProgressRingSize.Sm} testId="ring" value={50} />);
      expect(screen.getByTestId('ring')).toHaveClass('native-progress-ring-sm');
    });
  });

  describe('className merging', () => {
    it('merges custom className with base classes', () => {
      render(<ProgressRingNative className="mt-4" testId="ring" value={50} />);
      const el = screen.getByTestId('ring');
      expect(el).toHaveClass('native-progress-ring');
      expect(el).toHaveClass('mt-4');
    });
  });
});
```

### Test conventions:

| Convention                            | Why                                                           |
| ------------------------------------- | ------------------------------------------------------------- |
| Group by behavior (`describe` blocks) | Tests are organized by what they verify, not by method        |
| Import from `@/test/utils`            | Uses project's custom render with providers                   |
| Import from `./index`                 | Tests the public API, not internals                           |
| Use `testId` prop                     | Reliable element selection for test assertions                |
| Use `screen.getByRole`                | Preferred for accessible elements (progressbar, button, etc.) |
| Use `screen.getByTestId`              | Fallback for non-semantic elements                            |
| Test default props                    | Ensures defaults work without explicit configuration          |
| Test each variant                     | Ensures class mapping works for all enum values               |
| Test `className` merging              | Ensures `cn()` doesn't drop custom classes                    |
| Test accessibility attributes         | Catches silence accessibility regressions                     |
| No snapshot tests                     | Snapshots are fragile — test behavior instead                 |

---

## Step 9 — Verify Everything Works

Run through this checklist:

```bash
# 1. TypeScript compiles without errors
npm run typecheck

# 2. Lint passes
npm run lint

# 3. Unit tests pass
npm run test

# 4. Start dev server and visually verify
npm run local
```

Then manually verify:

- [ ] Component renders in the browser (use it in a page or the component showcase)
- [ ] All variants display correctly (primary, success, danger, etc.)
- [ ] All sizes display correctly (sm, md, lg)
- [ ] Custom `className` applies without overriding base styles
- [ ] Theme variables respond to runtime changes (if Theme Editor integration was added)
- [ ] `testId` appears in the DOM (inspect with browser DevTools)
- [ ] Accessibility: screen reader announces the component correctly
- [ ] Dark mode: component looks correct in both light and dark themes

---

## Complete File Map

```
src/
├── components/
│   └── ui/
│       ├── native/
│       │   ├── ProgressRingNative/
│       │   │   ├── index.tsx                       ← Step 3 (component)
│       │   │   └── ProgressRingNative.test.tsx      ← Step 8 (tests)
│       │   └── index.ts                            ← Step 7a (barrel export)
│       └── shared/
│           ├── progressRingTypes.ts                 ← Step 2 (types)
│           └── index.ts                            ← Step 7b (shared barrel)
├── stores/
│   └── theme/
│       ├── injectors/
│       │   └── injectProgressRingVariables.ts       ← Step 6a (optional)
│       ├── defaults/
│       │   ├── lightComponentDefaults.ts            ← Step 6c (optional)
│       │   └── darkComponentDefaults.ts             ← Step 6c (optional)
│       ├── types.ts                                ← Step 6b (optional)
│       └── utils/
│           └── themeInjector.ts                    ← Step 6d (optional)
└── styles/
    └── layers/
        ├── base.css                                ← Step 5 (variable defaults)
        └── components-app.css                      ← Step 4 (CSS classes)
```

---

## Scaling Up — Complex Components

When a component grows beyond 3 source files, organize into standard subdirectories. Use `DatePickerNative` as your reference — it's the most complex native component:

```
DatePickerNative/
├── index.tsx              # Main component (entry point)
├── types.ts               # Component-specific types
├── constants.ts           # Component-specific constants
├── components/            # Sub-components
│   ├── CalendarHeader.tsx
│   ├── CalendarPanel.tsx
│   ├── DateInput.tsx
│   ├── DayCell.tsx
│   ├── DayGrid.tsx
│   └── WeekHeader.tsx
├── hooks/                 # Custom hooks (with co-located tests)
│   ├── useCalendarKeyboard.ts
│   ├── useCalendarKeyboard.test.ts
│   ├── useCalendarState.ts
│   └── useCalendarState.test.ts
└── utils/                 # Pure helper functions
    ├── datePickerMode.ts
    └── panelPosition.ts
```

### When to split:

| Condition                     | Action                                      |
| ----------------------------- | ------------------------------------------- |
| Component exceeds ~200 lines  | Extract sub-components into `components/`   |
| Custom hook exceeds ~30 lines | Move to `hooks/` with a co-located test     |
| Pure utility function         | Move to `utils/` with a co-located test     |
| Component-specific types grow | Create `types.ts` at the component root     |
| Magic numbers or config       | Create `constants.ts` at the component root |

### Sub-component rules:

- Sub-components in `components/` are **not** exported from the barrel file — they're internal
- Hooks in `hooks/` each get their own co-located `.test.ts` file
- Utils in `utils/` are pure functions — no React imports, no side effects
- The `index.tsx` remains the only public entry point and default export

---

## Common Mistakes

| Mistake                                        | Consequence                                                        | Fix                                                                    |
| ---------------------------------------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| Forgetting `forwardRef`                        | Parent can't access the DOM element via ref                        | Wrap component in `forwardRef<HTMLElement, Props>`                     |
| Forgetting `memo`                              | Component re-renders when parent re-renders (even with same props) | Wrap default export in `memo()`                                        |
| Forgetting `displayName`                       | React DevTools shows "Anonymous" or "ForwardRef"                   | Add `ComponentName.displayName = 'ComponentName'`                      |
| Hardcoding colors                              | Theme changes don't apply                                          | Use `var(--component-*)` CSS variables with fallbacks                  |
| Missing CSS variable fallback                  | Component is invisible until theme loads                           | Always add fallback: `var(--x, rgb(59 130 246))`                       |
| CSS classes without `@layer`                   | Specificity conflicts with Tailwind utilities                      | Wrap in `@layer components { ... }`                                    |
| CSS in `components-critical.css` unnecessarily | Increases login page bundle size                                   | Only use for login-page components; otherwise use `components-app.css` |
| Missing `testId` prop                          | E2E tests can't find the component                                 | Always accept and apply `testId` via `data-testid`                     |
| Missing accessible role/attributes             | Fails accessibility audit                                          | Add `role`, `aria-label`, `aria-valuenow`, etc.                        |
| Named export instead of default                | `lazy()` can't find the component                                  | Use `export default memo(Component)`                                   |
| Forgetting barrel export                       | Consumers can't import from `@/components/ui/native`               | Add to `native/index.ts` and `shared/index.ts`                         |
| Testing internals instead of behavior          | Tests break when refactoring                                       | Test via `testId`, `role`, `getByText` — not internal class names      |
| Skipping `npm run typecheck`                   | Type errors slip through (Vite skips them)                         | Always run before committing                                           |
