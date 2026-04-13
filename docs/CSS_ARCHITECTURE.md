# CSS Architecture

> Back to [README](../README.md)

The theme studio relies on a layered CSS architecture where **every visual property** is driven by CSS custom properties that the theme engine injects at runtime.

---

## CSS Layer Order

Specificity is controlled via `@layer` (declared in `src/styles/index.css`):

```
@layer base, syncfusion-base, components, syncfusion-overrides, utilities;
```

| Layer                  | File(s)                                                    | Purpose                                                                          |
| ---------------------- | ---------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `base`                 | `layers/base.css`                                          | CSS variable defaults (:root), colors, radii, typography, transitions            |
| `syncfusion-base`      | Syncfusion `tailwind.css` packages                         | Vendor CSS for Syncfusion components                                             |
| `components`           | `layers/components.css`, `components-critical.css`         | Custom component classes (`.btn`, `.native-input`, etc.) consuming CSS variables |
| `syncfusion-overrides` | `layers/syncfusion-overrides.css`, `syncfusion-themed.css` | Theme-aware overrides for Syncfusion widgets using `--component-*` variables     |
| `utilities`            | Tailwind `@tailwind utilities`                             | Tailwind utility classes (highest layer specificity)                             |

> **Dynamically loaded files** (`components-app.css`, `native-overrides.css`) intentionally omit `@layer` directives because they are loaded after Tailwind processing and receive naturally higher specificity.

---

## CSS Code-Splitting

CSS is split into two bundles to optimize initial page load:

| Bundle        | Entry File         | When Loaded          | Contains                                                       |
| ------------- | ------------------ | -------------------- | -------------------------------------------------------------- |
| **Login CSS** | `styles/login.css` | On initial page load | `base.css` + `components-critical.css` (btn, card, input only) |
| **App CSS**   | `styles/app.css`   | After login (lazy)   | Full components, Syncfusion styles, overrides, themed wrappers |

This gives the login page a faster First Contentful Paint by deferring all Syncfusion CSS until it is actually needed.

---

## CSS File Loading Order

Files are loaded in a specific sequence so that each layer can override the previous one without needing `!important` (except for Syncfusion's hardcoded font-family).

**Phase 1 — Login page** (loaded immediately via `styles/login.css`):

| #   | File / Directive                          | What it provides                                                             |
| --- | ----------------------------------------- | ---------------------------------------------------------------------------- |
| 1   | `@layer base, components, utilities`      | Declares layer order so later rules respect prioritization                   |
| 2   | `layers/base.css`                         | `:root` CSS variable defaults (colors, radii, typography, transitions, etc.) |
| 3   | `layers/components-critical.css`          | Minimal component classes needed on the login page (`.btn`, `.native-btn-*`) |
| 4   | `@tailwind base / components / utilities` | Tailwind's generated utility classes                                         |

**Phase 2 — Protected routes** (lazy-loaded via `styles/app.css` after login):

| #   | File                                                | What it provides                                                                                  |
| --- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| 5   | `layers/components-app.css`                         | Full component styles (sidebar, header, badges, modals, etc.) — extends `components-critical.css` |
| 6   | `@syncfusion/ej2-base/styles/tailwind.css`          | Syncfusion base CSS (layout, typography, core)                                                    |
| 7   | `@syncfusion/ej2-react-inputs/styles/tailwind.css`  | Syncfusion input components (text inputs, sliders, color pickers)                                 |
| 8   | `@syncfusion/ej2-react-buttons/styles/tailwind.css` | Syncfusion button components (buttons, checkboxes, switches, chips)                               |
| 9   | `layers/native-overrides.css`                       | Custom styles for native components using `--component-*` variables                               |
| 10  | `layers/syncfusion-overrides.css`                   | Theme-aware overrides that restyle Syncfusion widgets with CSS variables                          |
| 11  | `layers/syncfusion-themed.css`                      | Themed wrapper classes (`.sf-button`, `.sf-input-wrapper`, `.sf-dark`, etc.)                      |

**Phase 3 — On-demand Syncfusion modules** (lazy-loaded per component via `loadSyncfusionCss()`):

| #   | Module                  | Loaded when                                 |
| --- | ----------------------- | ------------------------------------------- |
| 12+ | `ej2-react-grids`       | A page renders a DataGrid                   |
| 12+ | `ej2-react-calendars`   | A page renders a DatePicker / Calendar      |
| 12+ | `ej2-react-navigations` | A page renders a TreeView / Sidebar / Tab   |
| 12+ | `ej2-react-popups`      | A page renders a Tooltip / Dialog           |
| 12+ | `ej2-react-dropdowns`   | A page renders a DropDownList / MultiSelect |
| 12+ | `ej2-react-layouts`     | A page renders a Splitter / DashboardLayout |

> **Why this order?** Files 5-8 load the vendor CSS that Syncfusion components need. Files 9-11 override those vendor styles with theme-aware variables — loaded _after_ the vendor CSS so they win by source order. Files 12+ are loaded individually per component so pages that don't use grids never download grid CSS.

---

## CSS Variable Naming Convention

All variables follow a predictable hierarchy:

| Prefix                      | Level            | Example                                                         |
| --------------------------- | ---------------- | --------------------------------------------------------------- |
| `--color-{scale}-{shade}`   | Global colors    | `--color-primary-500`, `--color-error-50`                       |
| `--color-{semantic}`        | Mode colors      | `--color-background`, `--color-text-primary`, `--color-border`  |
| `--component-{comp}-{prop}` | Component tokens | `--component-button-primary-bg`, `--component-sidebar-hover-bg` |
| `--radius-{size}`           | Border radius    | `--radius-md`, `--radius-full`                                  |
| `--font-size-{size}`        | Typography       | `--font-size-sm`, `--font-weight-bold`                          |
| `--transition-{speed}`      | Transitions      | `--transition-fast`, `--transition-slow`                        |
| `--shadow-{size}`           | Shadows          | `--shadow-sm`, `--shadow-lg`                                    |
| `--animation-*`             | Animations       | `--animation-enabled`, `--animation-default-duration`           |

Global color values use **raw RGB triplets** (e.g. `59 130 246`) rather than `rgb()` so that Tailwind can apply alpha modifiers: `rgb(var(--color-primary-500) / 0.5)`.

---

## Theme Injection Pipeline

The runtime flow from Zustand store to the DOM:

```
┌──────────────────────┐
│   useThemeStore()    │  Zustand store (persisted to localStorage)
│   { theme, mode }    │  Holds full ThemeConfig + current Mode
└──────────┬───────────┘
           │ useEffect on [theme, mode]
           ▼
┌──────────────────────┐
│ injectThemeVariables │  src/stores/theme/utils/themeInjector.ts
│   (theme, mode)      │  Orchestrator — called inside requestAnimationFrame
└──────────┬───────────┘
           │ delegates to specialized injectors
           ▼
┌───────────────────────────────────────────────────────────┐
│  colorInjector    → --color-primary-*, --color-error-*    │
│  layoutInjector   → --color-background, --sidebar-width   │
│  componentInjector→ --component-button-*, --component-*   │
│  buttonInjector   → --component-button-primary-bg, etc.   │
│  dataGridInjector → --component-datagrid-*, etc.          │
│  datePickerInjector→ --component-datepicker-*, etc.       │
│  navigationInjector→ --component-accordion-*, etc.        │
│  ... (15+ injector files)                                 │
└───────────────────────────────────────────────────────────┘
           │ root.style.setProperty(...)
           ▼
┌──────────────────────┐
│   document.documentElement (:root)                        │
│   CSS variables available to all components               │
└──────────────────────┘
```

**Key details:**

- `useThemeInitializer()` runs `injectThemeVariables(theme, mode)` inside a `useEffect` whenever the theme or mode changes.
- All `setProperty` calls are batched inside a single `requestAnimationFrame` to avoid layout thrashing.
- Mode switching toggles the `dark` class on `<html>` and swaps mode-specific component variables.
- The store is persisted via Zustand `persist` middleware so themes survive page reloads.

---

## Injector File Map

Each injector file in `src/stores/theme/injectors/` is responsible for one domain:

| Injector File                    | Variables Injected                                                    |
| -------------------------------- | --------------------------------------------------------------------- |
| `colorInjector.ts`               | Color scales, status colors, border radii, shadows                    |
| `layoutInjector.ts`              | Mode colors, layout dimensions, typography, transitions, spacing      |
| `animationInjector.ts`           | Animation settings (enabled, duration, easing)                        |
| `componentInjector.ts`           | Orchestrates all component injectors (header, sidebar, inputs, cards) |
| `buttonInjector.ts`              | Button variants, FAB, split button, icon button                       |
| `dataGridInjector.ts`            | Data grid row, header, cell, selection, toolbar                       |
| `datePickerInjector.ts`          | DatePicker input, calendar, range colors, layout                      |
| `feedbackInjector.ts`            | Alerts, chips, dialogs, toasts, date pickers, selects                 |
| `formControlInjector.ts`         | Checkboxes, radios, toggles                                           |
| `navigationInjector.ts`          | Accordion, breadcrumb, menu, toolbar                                  |
| `paginationInjector.ts`          | Pagination component                                                  |
| `dataDisplayInjector.ts`         | Avatars, badges, progress bars, tabs, tooltips, timelines             |
| `gridButtonInjector.ts`          | Grid-specific button styles                                           |
| `gridDropdownInjector.ts`        | Grid-specific dropdown styles                                         |
| `typographyComponentInjector.ts` | Component-level typography (heading, body, label sizes)               |
| `fontLoader.ts`                  | Dynamic local font loading                                            |

---

## Adding a New Themed Component

1. **Define the config** — Add the component's properties to `ComponentConfigSingle` in `src/stores/theme/types/`.
2. **Create an injector** — Add a function like `injectMyComponentVariables(root, config)` that calls `root.style.setProperty(...)` for each CSS variable.
3. **Wire it up** — Import and call the new injector from `componentInjector.ts → injectComponentVariables()`.
4. **Add default values** — Provide defaults in `src/stores/theme/utils/defaultTheme.ts` (both light and dark).
5. **Consume in CSS** — Use the variables in `components.css`, `native-overrides.css`, or a Syncfusion override:
   ```css
   .my-component {
     background: var(--component-mycomp-bg);
     color: var(--component-mycomp-text);
   }
   ```
6. **Add editor controls** — Create a section in the theme editor (`src/features/theme-editor/`) so users can customize the new variables at runtime.
