# Component Package Extraction Guide

This document describes the current state of `SyncfusionThemeStudio/src/components` and what is required to extract them into a standalone, shareable npm package for use across UI projects.

Two extraction paths are covered:

1. **Native-only package** - Zero third-party UI dependencies, CSS-variable-driven
2. **Syncfusion-only package** - Themed wrappers around Syncfusion EJ2 React components

---

## Table of Contents

- [Current Architecture Overview](#current-architecture-overview)
- [Path A: Native Components Package](#path-a-native-components-package)
- [Path B: Syncfusion Components Package](#path-b-syncfusion-components-package)
- [Shared Infrastructure (Both Paths)](#shared-infrastructure-both-paths)
- [Changes Required](#changes-required)
- [Recommended Package Structure](#recommended-package-structure)
- [Consumer Setup](#consumer-setup)
- [Migration Checklist](#migration-checklist)

---

## Current Architecture Overview

### Component Inventory

| Category | Location | Files | Description |
|----------|----------|-------|-------------|
| Native UI | `src/components/ui/native/` | 126 | Zero-dependency components using CSS variables + Tailwind |
| Syncfusion wrappers | `src/components/ui/syncfusion/` | 39 | Theme-aware wrappers around Syncfusion EJ2 React |
| Shared types | `src/components/ui/shared/` | 22 | Const enums, interfaces, and type definitions |
| Form field adapters | `src/components/ui/form-fields/` | 9 | React Hook Form integrations for both native and Syncfusion |
| Icons | `src/components/icons/` | 30+ | Feather icon wrappers and custom icon sets |

### Style System (Critical Dependency)

All components are styled through a **CSS custom property system**. Styles live in `src/styles/layers/`:

| File | Lines | Used By | Purpose |
|------|-------|---------|---------|
| `base.css` | 395 | Both | CSS variables: colors, typography, radius, transitions, component defaults, dark mode |
| `components.css` | 1,395 | Native | Component classes: `.native-btn`, `.native-select`, `.native-input`, etc. |
| `native-overrides.css` | 148 | Native | Native-specific style corrections |
| `syncfusion-overrides.css` | 1,946 | Syncfusion | Overrides for Syncfusion default styling to match theme |
| `syncfusion-themed.css` | 281 | Syncfusion | Theme-aware Syncfusion class definitions (`.sf-themed`, `.sf-light`, `.sf-dark`) |

**Layer order** (increasing specificity):
```
base -> syncfusion-base -> components -> syncfusion-overrides -> utilities
```

### CSS Variable Categories

The `base.css` file defines the following variable groups that components consume:

- **Primary colors**: `--color-primary-50` through `--color-primary-900` (RGB triplets for Tailwind alpha support)
- **Status colors**: `--color-success-*`, `--color-warning-*`, `--color-error-*`, `--color-info-*`
- **Semantic surfaces**: `--color-background`, `--color-surface`, `--color-surface-elevated`, `--color-border`
- **Text colors**: `--color-text-primary`, `--color-text-secondary`, `--color-text-muted`
- **Typography**: `--font-sans`, `--font-mono`, `--font-size-*`, `--font-weight-*`, `--line-height-*`
- **Border radius**: `--radius-none` through `--radius-full`
- **Transitions**: `--transition-fast`, `--transition-normal`, `--transition-slow`
- **Animations**: `--animation-enabled`, `--animation-default-*`
- **Per-component defaults**: `--component-button-*`, `--component-input-*`, `--component-datagrid-*`, `--component-card-*`, `--component-modal-*`, `--component-badge-*`, `--component-select-*`, etc.
- **Dark mode overrides**: All of the above are re-declared under `.dark {}` selector

### Utility Dependencies

Every component imports these two tiny utility files:

**`src/utils/cn.ts`** (7 lines) - className joiner:
```ts
export function cn(...classes: Array<string | boolean | undefined | null>): string {
  return classes.filter((c): c is string => typeof c === 'string' && c.length > 0).join(' ');
}
```

**`src/utils/is.ts`** (37 lines) - Type guards:
```ts
export function isValueDefined<T>(value: T | null | undefined): value is T
export function isNullOrUndefined(value: unknown): value is null | undefined
export function isNotEmptyString(value: string | null | undefined): value is string
export function isNotEmptyArray<T>(value: T[] | null | undefined): value is T[]
```

### Localization Dependency

**16 components** (mostly native) use `FM()` from `src/localization/helpers.ts` for translated strings (e.g., table pagination labels, dialog button text). This function wraps `i18next.t()`.

### Path Aliases

All imports use `@/` aliases resolved in `tsconfig.json`:
```json
{
  "@/*": ["./src/*"],
  "@components/*": ["./src/components/*"],
  "@stores/*": ["./src/stores/*"],
  "@utils/*": ["./src/utils/*"],
  "@styles/*": ["./src/styles/*"]
}
```

---

## Path A: Native Components Package

### What You Get

32 components with zero third-party UI dependencies:

| Component | Category |
|-----------|----------|
| `ButtonNative`, `IconButtonNative`, `FabNative`, `SplitButtonNative` | Actions |
| `InputNative`, `SelectNative`, `CheckboxNative`, `DatePickerNative`, `RadioNative`, `ToggleNative` | Forms |
| `TableNative` (with pagination, filtering, sorting, editing, grouping) | Data display |
| `TabsNative`, `TimelineNative`, `BadgeNative`, `TagNative`, `ChipNative` | Data display |
| `AvatarNative`, `CardNative`, `ProgressBarNative` | Data display |
| `AccordionNative`, `MenuNative`, `BreadcrumbNative`, `ToolbarNative` | Navigation |
| `AlertNative`, `DialogNative`, `ToastNative` (with context provider), `TooltipNative` | Feedback |
| `HeadingNative`, `TextNative`, `DescriptionNative` | Typography |
| `ThemeToggleNative` | Theme |

### What Must Ship With It

| Artifact | Source | Why |
|----------|--------|-----|
| Component source | `src/components/ui/native/**` | The components themselves |
| Shared types | `src/components/ui/shared/**` | Enums & interfaces all components import |
| `cn()` utility | `src/utils/cn.ts` | Every component uses this |
| `is.*()` guards | `src/utils/is.ts` | Every component uses this |
| Grid library | `src/lib/grid/` (16 files) | Required by `TableNative` |
| Base CSS variables | `src/styles/layers/base.css` | All components consume CSS variables |
| Component CSS classes | `src/styles/layers/components.css` | Native component class definitions |
| Native overrides | `src/styles/layers/native-overrides.css` | Native-specific corrections |
| Tailwind preset | `tailwind.config.ts` (theme.extend portion) | Maps CSS variables to Tailwind classes |

### Current State - What Works Today

- All components are already self-contained in `src/components/ui/native/`
- Clean barrel export via `src/components/ui/native/index.ts` (104 lines)
- No dependency on zustand, Syncfusion, or any state management
- Styling is 100% CSS-variable-driven with sensible defaults in `base.css`
- Dark mode works via `.dark` class on a parent element

### Current State - What Blocks Extraction

| Issue | Severity | Details |
|-------|----------|---------|
| **Path aliases** | High | All imports use `@/` which won't resolve outside the monorepo. Must be resolved at build time. |
| **i18n coupling** | Medium | 16 components import `FM()` which requires a configured i18next instance. Cannot work without it. |
| **No build pipeline** | High | No library build config exists. The project builds as an app (Vite), not a library. |
| **Tailwind requirement** | Medium | Components use Tailwind utility classes alongside CSS classes. Consumers must have Tailwind. |
| **CSS not independently importable** | Medium | Styles are bundled as a monolithic `index.css` with Syncfusion imports. Native styles need isolation. |
| **SearchInput in shared** | Low | `src/components/ui/shared/SearchInput.tsx` is a React component in the types barrel. Should move. |

### Changes Required for Native Package

1. **Create library build config** (`tsup.config.ts` or `vite.config.lib.ts`)
   - Externalize `react`, `react-dom`
   - Resolve `@/` path aliases at build time
   - Output ESM + CJS + type declarations
   - Tree-shake unused components

2. **Decouple `FM()` from i18next** - Two options:
   - **Option A** (recommended): Accept an optional `t` function prop, fall back to English defaults
   - **Option B**: Export a `configureLocalization()` function consumers call once

3. **Create isolated CSS entry point**
   - New file: `styles/native.css` that imports only `base.css` + `components.css` + `native-overrides.css`
   - Exclude all Syncfusion CSS imports

4. **Extract Tailwind preset**
   - New file: `tailwind-preset.js` containing only the `theme.extend` values from `tailwind.config.ts`
   - Remove app-specific values (`sidebar`, `header` spacing)

5. **Package.json with subpath exports**
   ```json
   {
     "exports": {
       ".": "./dist/index.js",
       "./styles": "./dist/styles/native.css",
       "./tailwind-preset": "./dist/tailwind-preset.js"
     }
   }
   ```

### Peer Dependencies (Native)

```json
{
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0",
    "react-dom": "^18.0.0 || ^19.0.0"
  },
  "peerDependenciesMeta": {
    "tailwindcss": { "optional": true }
  }
}
```

Tailwind is optional because consumers can use the shipped CSS classes directly without Tailwind, but they lose the Tailwind utility classes used in some component styles.

---

## Path B: Syncfusion Components Package

### What You Get

17 themed wrapper components:

| Component | Wraps |
|-----------|-------|
| `Button` | `@syncfusion/ej2-react-buttons` |
| `Input` | `@syncfusion/ej2-react-inputs` |
| `Select` | `@syncfusion/ej2-react-dropdowns` |
| `DataGrid` | `@syncfusion/ej2-react-grids` |
| `DatePicker` | `@syncfusion/ej2-react-calendars` |
| `Dialog` | `@syncfusion/ej2-react-popups` |
| `Alert` | Custom (uses Syncfusion styling) |
| `Tabs` | `@syncfusion/ej2-react-navigations` |
| `Timeline` | `@syncfusion/ej2-react-navigations` |
| `Tag`, `Badge`, `Avatar`, `Card`, `ProgressBar`, `Tooltip`, `Description` | Various |

Plus hooks: `useSyncfusionTheme`, `getButtonClasses`

### What Must Ship With It

Everything from the Native path, **plus**:

| Artifact | Source | Why |
|----------|--------|-----|
| Syncfusion wrappers | `src/components/ui/syncfusion/**` | The components themselves |
| Syncfusion types | `src/components/ui/syncfusion/types.ts` | `SF_THEME_PREFIX`, `SF_LIGHT_CLASS`, theme interfaces |
| Theme hook | `src/components/ui/syncfusion/hooks/` | `useSyncfusionTheme` - reads mode from zustand store |
| Mode enum | `src/stores/mode.ts` | `Mode.Light` / `Mode.Dark` |
| Theme store | `src/stores/useThemeStore.ts` | Zustand store that holds current mode |
| Theme system | `src/stores/theme/` (120 files) | Default theme, injectors, presets, actions, types |
| Syncfusion override CSS | `src/styles/layers/syncfusion-overrides.css` | 1,946 lines of Syncfusion styling overrides |
| Syncfusion themed CSS | `src/styles/layers/syncfusion-themed.css` | 281 lines of theme-aware class definitions |
| Syncfusion base CSS | `@syncfusion/ej2-*/styles/tailwind.css` | Syncfusion's own base stylesheets |

### Current State - What Works Today

- All wrappers are self-contained in `src/components/ui/syncfusion/`
- Clean barrel export via `src/components/ui/syncfusion/index.ts`
- Theme-aware: automatically switches CSS classes based on light/dark mode
- `useSyncfusionTheme()` hook provides all theme classes to consumers

### Current State - What Blocks Extraction

| Issue | Severity | Details |
|-------|----------|---------|
| **Zustand store coupling** | **Critical** | Every Syncfusion component calls `useSyncfusionTheme()` which reads from a zustand store (`useThemeStore`). This store is deeply integrated into the app. |
| **Theme system size** | High | The theme store spans 120 files. It manages colors, typography, layout, animations, and per-component configs. Extracting it means shipping a massive dependency. |
| **Runtime CSS injection** | High | `themeInjector.ts` writes CSS variables to `:root` at runtime based on store state. Consumers must either use this system or provide their own. |
| **Syncfusion license** | Medium | Syncfusion EJ2 requires a commercial license. Consumers must have their own. |
| **Path aliases** | High | Same as native - all `@/` imports must be resolved. |
| **i18n coupling** | Medium | Some wrappers use `FM()`. |
| **No build pipeline** | High | Same as native. |
| **CSS not independently importable** | Medium | Syncfusion styles are mixed with native styles in `index.css`. |

### Changes Required for Syncfusion Package

Everything from the native path, **plus**:

1. **Refactor theme consumption to React Context** (the biggest change)

   Currently: Components call `useThemeStore()` directly (zustand global store).

   Target: Components consume a `<ThemeProvider>` context.

   ```tsx
   // Package exports a provider + hook
   export function ThemeProvider({ mode, children }: { mode: 'light' | 'dark'; children: ReactNode }) {
     // inject CSS variables, provide context
   }

   // Components consume via hook
   export function useSyncfusionTheme(): SyncfusionTheme {
     return useContext(ThemeContext);  // instead of useThemeStore()
   }
   ```

   This decouples components from the zustand store and lets consumers control mode however they want.

2. **Extract a minimal theme injector**
   - Current `themeInjector.ts` injects 100+ CSS variables based on full `ThemeConfig`
   - Package only needs: mode (light/dark) and optional color overrides
   - Ship a slim injector that sets CSS variables based on a simple config object

3. **Isolate Syncfusion CSS entry point**
   ```css
   /* styles/syncfusion.css */
   @import '@syncfusion/ej2-base/styles/tailwind.css';
   @import '@syncfusion/ej2-react-inputs/styles/tailwind.css';
   @import '@syncfusion/ej2-react-buttons/styles/tailwind.css';
   @import './layers/base.css';
   @import './layers/syncfusion-overrides.css';
   @import './layers/syncfusion-themed.css';
   ```

4. **Externalize all Syncfusion packages** as peer dependencies

5. **Decide on theme store shipping strategy**:
   - **Option A** (recommended): Ship components + `ThemeProvider` + slim injector. No zustand dependency. Consumers provide `mode` prop.
   - **Option B**: Ship the full theme store (120 files + zustand). Consumers get the full theme editor capability. Much larger bundle.

### Peer Dependencies (Syncfusion)

```json
{
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0",
    "react-dom": "^18.0.0 || ^19.0.0",
    "@syncfusion/ej2-react-buttons": "^32.0.0",
    "@syncfusion/ej2-react-inputs": "^32.0.0",
    "@syncfusion/ej2-react-dropdowns": "^32.0.0",
    "@syncfusion/ej2-react-grids": "^32.0.0",
    "@syncfusion/ej2-react-calendars": "^32.0.0",
    "@syncfusion/ej2-react-navigations": "^32.0.0",
    "@syncfusion/ej2-react-popups": "^32.0.0",
    "@syncfusion/ej2-react-layouts": "^32.0.0"
  }
}
```

---

## Shared Infrastructure (Both Paths)

### Form Field Adapters (Optional Add-On)

`src/components/ui/form-fields/` provides React Hook Form integrations:

| Component | Wraps | Variant |
|-----------|-------|---------|
| `FormInput` | Syncfusion `Input` | Syncfusion |
| `FormSelect` | Syncfusion `Select` | Syncfusion |
| `FormDatePicker` | Syncfusion `DatePicker` | Syncfusion |
| `FormCheckbox` | Syncfusion `Checkbox` | Syncfusion |
| `FormNativeInput` | `InputNative` | Native |
| `FormNativeSelect` | `SelectNative` | Native |
| `FormNativeDatePicker` | `DatePickerNative` | Native |
| `FieldError` | Shared error display | Both |

These depend on `react-hook-form` and optionally `zod` / `@hookform/resolvers`.

**Recommendation**: Ship as a separate subpath export (`/form-fields`) since they introduce additional peer dependencies.

### Icons

`src/components/icons/` contains Feather icon wrappers and custom icon sets. These are standalone React components with no external dependencies. They can be included in either package or shipped separately.

---

## Recommended Package Structure

### Single Package with Subpath Exports

```
@your-scope/ui/
  dist/
    native/          # Native components (tree-shakeable)
    syncfusion/      # Syncfusion wrappers (tree-shakeable)
    form-fields/     # React Hook Form adapters
    utils/           # cn(), is.*() utilities
    icons/           # Icon components
    styles/
      native.css     # Native-only styles
      syncfusion.css # Syncfusion styles (includes native base)
      variables.css  # CSS variables only (for custom implementations)
    tailwind-preset.js
```

```json
{
  "name": "@your-scope/ui",
  "version": "1.0.0",
  "type": "module",
  "exports": {
    "./native":           { "import": "./dist/native/index.js",       "types": "./dist/native/index.d.ts" },
    "./syncfusion":       { "import": "./dist/syncfusion/index.js",   "types": "./dist/syncfusion/index.d.ts" },
    "./form-fields":      { "import": "./dist/form-fields/index.js",  "types": "./dist/form-fields/index.d.ts" },
    "./icons":            { "import": "./dist/icons/index.js",        "types": "./dist/icons/index.d.ts" },
    "./utils":            { "import": "./dist/utils/index.js",        "types": "./dist/utils/index.d.ts" },
    "./styles/native":    "./dist/styles/native.css",
    "./styles/syncfusion":"./dist/styles/syncfusion.css",
    "./styles/variables": "./dist/styles/variables.css",
    "./tailwind-preset":  "./dist/tailwind-preset.js"
  },
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0",
    "react-dom": "^18.0.0 || ^19.0.0"
  },
  "peerDependenciesMeta": {
    "tailwindcss": { "optional": true },
    "@syncfusion/ej2-react-buttons": { "optional": true },
    "@syncfusion/ej2-react-inputs": { "optional": true },
    "@syncfusion/ej2-react-dropdowns": { "optional": true },
    "@syncfusion/ej2-react-grids": { "optional": true },
    "@syncfusion/ej2-react-calendars": { "optional": true },
    "@syncfusion/ej2-react-navigations": { "optional": true },
    "@syncfusion/ej2-react-popups": { "optional": true },
    "@syncfusion/ej2-react-layouts": { "optional": true },
    "react-hook-form": { "optional": true },
    "zod": { "optional": true }
  }
}
```

---

## Consumer Setup

### Native Components Only

```bash
npm install @your-scope/ui
```

```ts
// tailwind.config.ts
import uiPreset from '@your-scope/ui/tailwind-preset';

export default {
  presets: [uiPreset],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@your-scope/ui/dist/**/*.js', // so Tailwind scans component classes
  ],
};
```

```css
/* app.css */
@import '@your-scope/ui/styles/native';
@tailwind base;
@tailwind components;
@tailwind utilities;
```

```tsx
// App.tsx
import { ButtonNative, AlertNative, TableNative } from '@your-scope/ui/native';

function App() {
  return <ButtonNative variant="primary" size="md">Click me</ButtonNative>;
}
```

**Dark mode**: Add class `dark` to a parent element (e.g., `<html class="dark">`). All CSS variables swap automatically.

### Syncfusion Components

```bash
npm install @your-scope/ui @syncfusion/ej2-react-buttons @syncfusion/ej2-react-inputs # ... etc
```

```css
/* app.css */
@import '@your-scope/ui/styles/syncfusion';
@tailwind base;
@tailwind components;
@tailwind utilities;
```

```tsx
// App.tsx (after refactor to context-based)
import { ThemeProvider } from '@your-scope/ui/syncfusion';
import { Button, DataGrid } from '@your-scope/ui/syncfusion';

function App() {
  return (
    <ThemeProvider mode="light">
      <Button variant="primary" size="md">Click me</Button>
    </ThemeProvider>
  );
}
```

---

## Migration Checklist

### Phase 1: Foundation (Both Paths)

- [ ] Set up build tooling (`tsup` or Vite library mode)
- [ ] Configure path alias resolution for `@/` imports
- [ ] Extract `cn()` and `is.*()` into a `utils/` entry point
- [ ] Extract shared types from `src/components/ui/shared/` into package
- [ ] Create `tailwind-preset.js` from `tailwind.config.ts` theme.extend
- [ ] Set up automated type declaration generation

### Phase 2: Native Package

- [ ] Create `styles/native.css` entry point (base + components + native-overrides only)
- [ ] Decouple `FM()` - add optional `t` prop to 16 components, default to English
- [ ] Move `SearchInput.tsx` out of shared types barrel
- [ ] Verify all native components build and tree-shake correctly
- [ ] Write package.json with subpath exports
- [ ] Test in a fresh consumer project

### Phase 3: Syncfusion Package

- [ ] Refactor `useSyncfusionTheme()` from zustand store to React Context
- [ ] Create `ThemeProvider` that accepts `mode` prop and injects CSS variables
- [ ] Extract minimal theme injector (mode-only, no full ThemeConfig)
- [ ] Create `styles/syncfusion.css` entry point
- [ ] Externalize all `@syncfusion/ej2-react-*` as peer dependencies
- [ ] Verify wrappers build with Syncfusion packages externalized
- [ ] Test in a fresh consumer project with Syncfusion license

### Phase 4: Optional Add-Ons

- [ ] Package form field adapters as `/form-fields` subpath
- [ ] Package icons as `/icons` subpath
- [ ] Add Storybook or docs site for component showcase

---

## Effort Estimates

| Phase | Complexity | Key Risk |
|-------|-----------|----------|
| Foundation | Medium | Build tooling + path alias resolution |
| Native package | Low-Medium | i18n decoupling is the main work; everything else is configuration |
| Syncfusion package | **High** | Zustand-to-Context refactor touches every wrapper component + theme system |
| Form field adapters | Low | Straightforward extraction |

**Recommendation**: Start with **Phase 1 + Phase 2** (native-only). This gives you a usable package with minimal refactoring. Phase 3 (Syncfusion) requires significant architectural changes to the theme system and should be planned as a separate effort.
