# Syncfusion Theme Studio

A high-performance, fully customizable React admin portal template with visual theme editor. Built with React 18, Vite, TypeScript, Tailwind CSS, and Syncfusion components.

- local dev http://localhost:4444/
- local production http://localhost:4446/dashboard

Login page light house result for production build 

![alt text](image.png)

- [Syncfusion Theme Studio](#syncfusion-theme-studio)
  - [Performance Highlights](#performance-highlights)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Quick Start](#quick-start)
  - [Environment Setup](#environment-setup)
    - [Syncfusion License Key (Required)](#syncfusion-license-key-required)
    - [Figma-to-Theme Sync (Optional)](#figma-to-theme-sync-optional)
    - [Files Not in Git (Generated / Local-Only)](#files-not-in-git-generated--local-only)
    - [All Commands](#all-commands)
  - [Project Structure](#project-structure)
  - [Theme Customization](#theme-customization)
    - [Export/Import Themes](#exportimport-themes)
  - [API Integration](#api-integration)
  - [Code Standards](#code-standards)
  - [Icons](#icons)
    - [Generation Script](#generation-script)
    - [Rules](#rules)
    - [Exceptions (not in `src/components/icons/`)](#exceptions-not-in-srccomponentsicons)
  - [Figma Integration](#figma-integration)
    - [Two Theme Paths](#two-theme-paths)
    - [Three-Phase Pipeline](#three-phase-pipeline)
    - [Full Sync](#full-sync)
    - [Figma API Setup](#figma-api-setup)
    - [Mapping Configuration](#mapping-configuration)
    - [Script Files](#script-files)
    - [Commands](#commands)
    - [Adding a New Section](#adding-a-new-section)
    - [Section Readiness Tracker](#section-readiness-tracker)
    - [Icons from Figma](#icons-from-figma)
  - [Local Development Pipeline](#local-development-pipeline)
    - [Automatic Startup Order](#automatic-startup-order)
    - [Resource Reference](#resource-reference)
      - [Dev (automatic)](#dev-automatic)
      - [Build (manual)](#build-manual)
      - [Testing (manual)](#testing-manual)
      - [Quality (manual)](#quality-manual)
      - [CodeGen (manual)](#codegen-manual)
      - [Figma (manual)](#figma-manual)
      - [MockServer (manual)](#mockserver-manual)
    - [Port Summary](#port-summary)
    - [Common Workflows](#common-workflows)
  - [Common Functionality \& References](#common-functionality--references)
    - [Tailwind CSS Spacing Scale](#tailwind-css-spacing-scale)
    - [Where to Find Things](#where-to-find-things)
  - [Performance Optimization Details](#performance-optimization-details)
    - [The Problem](#the-problem)
    - [Root Causes Identified](#root-causes-identified)
    - [Solution 1: Dynamic Imports for Syncfusion License](#solution-1-dynamic-imports-for-syncfusion-license)
    - [Solution 2: Split UI Component Barrels](#solution-2-split-ui-component-barrels)
    - [Solution 3: Native HTML Components for Login](#solution-3-native-html-components-for-login)
    - [Solution 4: Lazy-Load MainLayout](#solution-4-lazy-load-mainlayout)
    - [Solution 5: CSS Code Splitting](#solution-5-css-code-splitting)
    - [Solution 6: Remove Syncfusion Grid from Modulepreload](#solution-6-remove-syncfusion-grid-from-modulepreload)
    - [Solution 7: Background Preloading After Login](#solution-7-background-preloading-after-login)
    - [Solution 8: Optimize Vite Dev Server](#solution-8-optimize-vite-dev-server)
    - [Bundle Analysis](#bundle-analysis)
    - [Performance Testing](#performance-testing)
    - [Module Preloading Strategy](#module-preloading-strategy)
      - [What to Preload and Where](#what-to-preload-and-where)
      - [Implementation Locations](#implementation-locations)
      - [Preload Configuration Files](#preload-configuration-files)
      - [Preloading Best Practices](#preloading-best-practices)
  - [CSS Customization System](#css-customization-system)
    - [CSS Architecture](#css-architecture)
    - [CSS Layers](#css-layers)
    - [Theme Variables](#theme-variables)
    - [Per-Component Theming](#per-component-theming)
    - [Theme Presets](#theme-presets)
    - [Using Presets](#using-presets)
    - [Export/Import Themes](#exportimport-themes-1)
    - [Syncfusion Component Styling](#syncfusion-component-styling)
  - [Related Projects](#related-projects)
    - [Integration Points](#integration-points)
  - [License](#license)
  - [Contributing](#contributing)


## Performance Highlights

| Metric | Score |
|--------|-------|
| **Lighthouse Performance** | 98/100 |
| **First Contentful Paint** | 1.8s |
| **Largest Contentful Paint** | 2.0s |
| **Total Blocking Time** | 0ms |
| **Cumulative Layout Shift** | 0 |
| **Initial JS Bundle** | ~116 KB |
| **Initial CSS Bundle** | ~6 KB |

## Features

- **Visual Theme Editor** - Real-time theme customization with live preview
- **100% CSS Variables** - All styling driven by CSS variables for runtime editing
- **Per-Component Theming** - Each component has its own light/dark theme configuration
- **12+ Theme Presets** - Beautiful pre-built themes with light/dark variants
- **Dark/Light Mode** - Full theme support with smooth transitions
- **Syncfusion Components** - Enterprise-grade UI components with custom wrappers
- **Type-Safe API Hooks** - Auto-generated with Orval from OpenAPI specs
- **Internationalization** - Built-in i18next support
- **Lazy Loading** - Optimized bundle splitting for fast initial load
- **Strict TypeScript** - Enterprise-grade type safety
- **Comprehensive Testing** - Unit tests (Vitest) and E2E tests (Playwright)

## Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 | UI Framework |
| Vite 5 | Build Tool |
| TypeScript 5 | Type Safety |
| Tailwind CSS 3 | Utility-First Styling |
| Syncfusion | Enterprise UI Components |
| TanStack Query | Server State Management |
| Zustand | Client State Management |
| React Router 6 | Routing |
| i18next | Internationalization |
| Orval | API Hook Generation |
| Vitest | Unit Testing |
| Playwright | E2E Testing |

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables (see Environment Setup below)
cp .env.example .env

# 3. Generate API hooks (required — these are gitignored)
npm run api:generate

# 4. Start development server
npm run dev

# 5. Open http://localhost:4444 and log in with demo credentials
```

> **Note:** `src/api/generated/` is gitignored and must be regenerated after cloning.
> Without this step, pages that use API hooks (Products, Forms) will fail to compile.

## Environment Setup

Copy `.env.example` to `.env` and configure the required variables:

```bash
cp .env.example .env
```

### Syncfusion License Key (Required)

```env
VITE_SYNCFUSION_LICENSE_KEY=your-license-key-here
```

A valid Syncfusion license key is **required** to suppress trial watermark banners on Syncfusion components (DataGrid, DatePicker, etc.). Without it the app runs normally but displays license warnings.

Get your key from the [Syncfusion License Portal](https://www.syncfusion.com/account/manage-trials/downloads) under "License & Downloads" > "Get License Key".

### Figma-to-Theme Sync (Optional)

```env
FIGMA_API_TOKEN=your-figma-personal-access-token
FIGMA_FILE_KEY=your-figma-file-key
```

These variables enable the Figma-to-Theme sync pipeline (`npm run figma:sync`) which extracts design tokens from a Figma file and generates a theme preset. **This is entirely optional** — the app runs fully without Figma credentials. Only configure these if you want to sync themes from Figma.

Generate a Figma personal access token at **Figma > Settings > Personal access tokens**.

### Files Not in Git (Generated / Local-Only)

These files are required to run the project but are **gitignored**. They must be created or generated locally after cloning:

| File / Directory | Purpose | How to Create |
|------------------|---------|---------------|
| `.env` | Syncfusion license key, optional Figma tokens | `cp .env.example .env` and fill in values |
| `node_modules/` | npm dependencies | `npm install` |
| `src/api/generated/` | Orval-generated React Query hooks and TypeScript types | `npm run api:generate` |
| `dev-dist/` | PWA service worker files (VitePWA) | Auto-generated by `npm run dev` |
| `dist/` | Production build output | `npm run build` |
| `coverage/` | Unit test coverage reports | `npm run test:coverage` |
| `playwright-report/` | E2E test reports | `npm run test:e2e` |
| `reports/` | Lighthouse audit reports | `npm run lighthouse:prod` |

**Critical for compilation:** `.env` and `src/api/generated/` — without these, the app will not build. The remaining items are generated on demand.

### All Commands

```bash
# Development
npm run dev                # Start dev server (port 4444)
npm run build              # Production build
npm run preview            # Preview production build (port 4445)
npm run test               # Run unit tests
npm run test:coverage      # Run tests with coverage
npm run lint               # Lint check
npm run lint:fix           # Auto-fix lint issues

# Figma sync (optional, requires FIGMA_* env vars)
npm run figma:sync         # Extract + generate theme from Figma
npm run figma:discover     # List available Figma styles

# Tilt (optional orchestrator)
tilt up --port=10351       # Start all services via Tilt
```

## Project Structure

```
src/
├── app/                    # Application shell
│   ├── App.tsx
│   ├── routes.tsx
│   └── providers/
├── components/
│   ├── icons/              # Centralized SVG icons (see Icons section)
│   ├── layout/             # MainLayout, Sidebar, Header
│   ├── ui/                 # Syncfusion wrappers
│   └── common/             # Shared components
├── features/
│   ├── auth/               # Login page
│   ├── dashboard/          # Home page
│   ├── pets/               # Demo API integration
│   ├── showcase/           # Component showcase
│   └── theme-editor/       # Visual theme customization
├── api/                    # Orval-generated hooks
├── stores/                 # Zustand stores
├── localization/           # i18n setup
├── styles/                 # CSS layers and themes
└── utils/                  # Utility functions
```

## Theme Customization

The theme editor allows real-time customization of:

- **Primary Colors** - Full color scale (50-900)
- **Status Colors** - Success, warning, error, info
- **Layout** - Sidebar width, header height
- **Border Radius** - Component roundness
- **Typography** - Font families and sizes
- **Transitions** - Animation timing

All changes are applied instantly without page reload and persist across sessions.

### Export/Import Themes

```typescript
// Export current theme
const themeJson = exportTheme();

// Import custom theme
importTheme(customThemeJson);
```

## API Integration

This template uses the [Swagger Petstore API](https://petstore3.swagger.io/) for demonstration. API hooks are auto-generated using Orval.

```bash
# Regenerate API hooks after OpenAPI spec changes
npm run api:generate
```

## Code Standards

- [Code Standards Hub](./docs/code-standards/README.md) - Index of all standards
- [Styling Architecture Guide](./docs/code-standards/styling-architecture.md) - CSS layers, theme injection, customization guide
- [Forms Architecture Guide](./docs/code-standards/forms-architecture.md) - React Hook Form + Zod, field adapters, validation patterns

This project follows strict coding standards:

- ESLint with TypeScript strict rules
- Maximum file length: 300 lines
- Maximum function length: 50 lines
- No magic numbers
- Comprehensive accessibility support
- Unit test coverage > 80%

## Icons

All reusable SVG icons live in `src/components/icons/`, organized for natural Vite code-splitting:

| File | Contents | When Loaded |
|------|----------|-------------|
| `AppIcons.tsx` | 28 core icons (sidebar, header, brand) | Every page |
| `SettingsIcons.tsx` | 19 drawer icons (tabs, import/export, sections) | When settings drawer opens |
| `ShowcaseIcons.tsx` | 22 demo icons (toolbar, breadcrumb, buttons) | Demo pages only |
| `ThemeIcons.tsx` | 2 theme toggle icons (sun/moon) | Header |
| `FeatherIconsA–Z.tsx` | 270 auto-generated Feather icons (25 files) | On demand (tree-shaken) |
| `CustomIcons.tsx` | 17 custom media/action icons + aliases | On demand |

**Supporting files:** `types.ts` (shared `IconProps` interface), `index.ts` (barrel re-export), `featherIconEntries.ts` (icon list for showcase page).

**Total: 357 icon components** available.

### Generation Script

The Feather icons are auto-generated from the `feather-icons` npm package (devDependency):

```bash
# Regenerate all Feather icon files
node scripts/generate-feather-icons.mjs
```

The script:
1. Reads all SVG icons from the `feather-icons` package
2. Converts them to React TSX components matching the project pattern (`defaults` spread, `IconProps`, `currentColor`)
3. Splits output into alphabetical files (A–Z) to stay under the 300-line ESLint limit
4. Skips 18 icons already defined in `AppIcons.tsx` to avoid duplicates

To add a new hand-coded icon, add it to the appropriate file (`AppIcons`, `SettingsIcons`, `ShowcaseIcons`, or `CustomIcons`) based on where it's consumed.

### Rules

- **All new icons go in `src/components/icons/`** — never define inline SVGs in feature files. The ESLint rule `no-inline-svg-icons` enforces this automatically.
- **Pick the right file** based on where the icon is consumed: app-wide → `AppIcons`, settings drawer → `SettingsIcons`, showcase/demo → `ShowcaseIcons`.
- **Import from the barrel**: `import { IconName } from '@/components/icons'`.
- **Naming**: App icons use `Icon` prefix (`IconDashboard`). Settings/showcase icons use descriptive names (`ExportIcon`, `BoldIcon`).
- **Props**: All icons accept `{ className?: string }` via `IconProps`. Icons that need extra props (e.g. `CollapseIcon` with `isCollapsed`) define their own interface.

### Exceptions (not in `src/components/icons/`)

These are **stateful mini-components**, not reusable icons:

- `ThemeToggleNative` — Sun/Moon with animation states and hardcoded colors
- `SelectNative/ChevronIcon` — Memoized with `isOpen` prop and wrapper span
- `NativeChipShowcase` — 2 tiny inline SVGs (3 lines each) inside JSX

---

## Figma Integration

The project includes an optional Figma-to-Theme sync pipeline that extracts design tokens from the Figma API and applies them to the **Figma Design** preset theme only. All other preset themes (Fremen, Voyager, CyberWatch, etc.) are manually authored and are not affected by this pipeline.

The app works with or without Figma data. When the pipeline has not been run, the Figma Design preset falls back to defaults.

### Two Theme Paths

There are 18 preset themes. Each is a complete `ThemeConfig`. They follow two distinct paths:

**Path 1 — Hand-Authored Presets (17 themes)**

```
Hand-authored TypeScript file (e.g. fremen.ts, cyberWatch.ts)
    │  Defines: primary/secondary/neutral scales,
    │  status colors, light/dark mode overrides.
    │  Components: DEFAULT_COMPONENTS (no component-level overrides)
    │
    v
PresetsSection.handleApplyPreset()
    │
    ├── 1. generateDerivedColors(primary)
    │      Computes interactive colors (hover, active, focus)
    │      from the primary color scale
    │
    ├── 2. buildDerivedComponents(DEFAULT_COMPONENTS, derived)
    │      Patches buttons, sidebar, inputs, dataGrid
    │      with primary-derived colors at runtime
    │
    └── 3. updateTheme({...preset, components})
           │
           v
    useThemeStore (Zustand)
           │
           v
    injectThemeVariables()
           │
           v
    CSS custom properties on :root
           │
           ├──> BadgeNative     (uses DEFAULT badge colors — no preset override)
           ├──> Buttons         (uses primary-derived colors from buildDerivedComponents)
           ├──> Sidebar         (uses primary-derived colors from buildDerivedComponents)
           └──> Every other component...
```

These presets are written by hand in `src/stores/theme/presets/`. Each file defines color scales, status colors, and light/dark mode overrides. They rely on `DEFAULT_COMPONENTS` for all component-level styling — the `buildDerivedComponents()` step at runtime patches buttons, sidebar, inputs, and dataGrid with colors derived from the primary scale. Badge colors, typography, and other component sections use the default values unchanged.

**Path 2 — Figma Design Preset (1 theme, generated)**

```
Figma REST API
    │
    v
figma:extract              data/figma-extract.json        (1 API call, stores everything)
    │
    v
figma:generate:badges      data/figma-sections/badges.json (per-section intermediate)
figma:generate:buttons     data/figma-sections/buttons.json (future)
    ...
    │
    v
figma:generate             1. reads extract + ALL section JSONs
                           2. deep-merges figma-corrections/*.json on top
                           3. writes ONE src/stores/theme/presets/figmaDesign.ts
    │
    v
PresetsSection.handleApplyPreset()
    │
    ├── 1. generateDerivedColors(primary)
    ├── 2. buildDerivedComponents(FIGMA_COMPONENTS, derived)
    │      Same runtime patching, but starts from FIGMA_COMPONENTS
    │      which already has Figma overrides baked in for synced sections
    └── 3. updateTheme({...preset, components})
           │
           v
    useThemeStore (Zustand)  →  injectThemeVariables()  →  CSS custom properties
           │
           ├──> BadgeNative     (uses FIGMA badge colors — Figma-synced section)
           ├──> AlertBadge      (uses FIGMA typography — Figma-synced section)
           ├──> Buttons         (uses primary-derived + any future Figma overrides)
           └──> Every other component...
```

The generated `figmaDesign.ts` spreads `DEFAULT_COMPONENTS_LIGHT`/`DEFAULT_COMPONENTS_DARK` and only overrides the sections that have a corresponding `data/figma-sections/<name>.json` file. Unsynced sections keep their default values. Post-processing corrections from `data/figma-corrections/` are deep-merged on top to fix any incorrect Figma API values.

**Both paths converge at the same runtime steps**: `handleApplyPreset()` calls `generateDerivedColors()` then `buildDerivedComponents()` then `updateTheme()`. The Zustand store injects CSS variables, and both Native and Syncfusion components read the same CSS vars — so they always look identical regardless of which path produced the theme.

**Key difference**: hand-authored presets start from `DEFAULT_COMPONENTS` (all default badge/card/modal colors), while the Figma preset starts from `FIGMA_COMPONENTS` (with Figma-extracted overrides for synced sections like badges and alertBadges).

| Preset | Source | Figma-synced? |
|--------|--------|:---:|
| Fremen | `presets/fremen.ts` | No |
| Oceanus | `presets/oceanus.ts` | No |
| CyberWatch | `presets/cyberWatch.ts` | No |
| Default Blue | `defaultTheme.ts` | No |
| Voyager, Ocean Blue, Forest Green, ... | `presets/*.ts` | No |
| **Figma Design** | **`presets/figmaDesign.ts`** | **Yes** |

### Three-Phase Pipeline

**Phase 1: Extract** (`npm run figma:extract`)

- Makes one API call to the Figma REST API
- Walks the document tree for each section (badges, buttons, etc.)
- Stores raw extracted data in `data/figma-extract.json`
- This is the only step that requires network access and `FIGMA_API_TOKEN`

**Phase 2: Section Generators** (`npm run figma:generate:<section>`)

Each section has its own dedicated generator script that:
1. Reads `data/figma-extract.json` (no API call)
2. Maps Figma labels/nodes to theme variant keys
3. Writes an intermediate JSON to `data/figma-sections/<section>.json`

Section generators are independent. You can run one without running the others.

| Section | Script | Status |
|---------|--------|--------|
| Badges | `generate-badges.ts` | Implemented |
| Typography | stub | Future |
| Colours | stub | Future |
| Buttons | stub | Future |
| Input | stub | Future |
| (21 more) | stub | Future |

**Phase 3: Main Generator** (`npm run figma:generate`)

- Reads `data/figma-extract.json` for general color/mode mappings
- Reads ALL `data/figma-sections/*.json` files (auto-discovered)
- Deep-merges any `data/figma-corrections/*.json` files on top (corrections win)
- Combines everything into one `figmaDesign.ts` preset
- Component section JSONs become inline overrides in the `FIGMA_COMPONENTS` constant

### Full Sync

`npm run figma:sync` runs all three phases in order:

```
extract  -->  generate:badges  -->  generate
```

### Figma API Setup

Two environment variables are required (both in `.env`):

| Variable | Source | Example |
|----------|--------|---------|
| `FIGMA_API_TOKEN` | Figma > Settings > Personal access tokens | `figd_abc123...` |
| `FIGMA_FILE_KEY` | The file ID from the Figma URL (`figma.com/file/<KEY>/...`) | `AbCdEf12345` |

Both are optional. Without them, the `figma:*` commands will exit with a helpful message and no other functionality is affected.

### Mapping Configuration

`scripts/figma/figma-mapping.ts` defines how Figma node paths map to `ThemeConfig` properties. It supports:

- **Shared mappings** — applied to both light and dark themes (e.g., border radii, font families)
- **Separate light/dark mappings** — different Figma nodes for each mode (e.g., background colors, text colors)

Edit this file to add or change which Figma styles map to which theme properties.

### Script Files

```
scripts/figma/
  extract.ts                    Phase 1: Figma API -> JSON
  generate-badges.ts            Phase 2: Badges section generator
  corrections.ts                Deep-merges correction files onto sections
  generate.ts                   Phase 3: Combines sections -> figmaDesign.ts
  code-generators.ts            TypeScript code generation helpers
  figma-mapping.ts              Color/mode mapping rules (manual config)
  types.ts                      Shared TypeScript types
  utils.ts                      Color conversion and tree traversal utilities
  discover.ts                   Exploration tool for Figma file structure
  data/
    figma-extract.json          Raw API extraction output
    figma-sections/
      badges.json               Badge section overrides (generated)
      alertBadges.json          Alert badge section overrides (generated)
      buttons.json              (future)
      ...
    figma-corrections/
      badges.json               Fixes light mode badge text colors
```

For the full pipeline documentation including badge extraction details, correction system, and CSS variable injection flow, see [`scripts/figma/README.md`](scripts/figma/README.md).

### Commands

| Command | Description |
|---------|-------------|
| `npm run figma:extract` | Fetch Figma file and save raw extraction JSON |
| `npm run figma:generate:badges` | Generate badge section overrides from extraction |
| `npm run figma:generate` | Combine all sections into `figmaDesign.ts` |
| `npm run figma:sync` | Full pipeline: extract + all generators + combine |
| `npm run figma:discover` | Explore Figma file structure (development tool) |

### Adding a New Section

To implement a new section generator (e.g., buttons):

1. **Create `generate-buttons.ts`** that reads `figma-extract.json`, maps Figma values to theme keys, writes `data/figma-sections/buttons.json`
2. **Update extraction** in `extract.ts` if the section needs new node parsing logic
3. **Replace the stub** in `package.json`: change `"figma:generate:buttons": "echo [STUB]..."` to `"figma:generate:buttons": "tsx scripts/figma/generate-buttons.ts"`
4. **Update `figma:sync`** to include the new generator in the pipeline chain
5. **Run `figma:generate`** which automatically picks up `buttons.json` and adds it to `figmaDesign.ts`

The main generator discovers section files automatically from `data/figma-sections/*.json`.

### Section Readiness Tracker

| Category | Section | Ready Design | Variables Defined | Generation Script | App Integration |
|----------|---------|:---:|:---:|:---:|:---:|
| Foundation | Typography | Yes | - | stub | - |
| Foundation | Colours | Yes | - | stub | - |
| Foundation | Layouts / Grid | Review | - | stub | - |
| Foundation | Icons | - | - | stub | - |
| Components | **Badges** | **Yes** | **Yes** | **generate-badges.ts** | **Yes** |
| Components | Buttons | Yes | - | stub | - |
| Components | Description | Yes | - | stub | - |
| Components | Input | Yes | - | stub | - |
| Components | Drawer | Future | - | stub | - |
| Components | External Link | Yes | - | stub | - |
| Components | Notifications / Alerts | Future | - | stub | - |
| Components | Image | Future | - | stub | - |
| Components | Navigation Menus | - | - | stub | - |
| Components | Drop Down Lists | - | - | stub | - |
| Components | Breadcrumbs | - | - | stub | - |
| Components | Data Grid | - | - | stub | - |
| Components | Combobox | - | - | stub | - |
| Components | Filtering / Search | - | - | stub | - |
| Components | Pagination | - | - | stub | - |
| Components | Progress | - | - | stub | - |
| Components | Skeleton | - | - | stub | - |
| Components | Slider | - | - | stub | - |
| Components | Subhead | - | - | stub | - |

### Icons from Figma

The Figma design file (the same one linked via `FIGMA_FILE_KEY`) also contains the icon reference — a complete Feather Icons set plus custom media icons. The icon SVGs in the codebase were generated to match the Figma design's icon page.

The `scripts/generate-feather-icons.mjs` script uses the `feather-icons` npm package rather than the Figma API for icon generation, since Feather icons are standardized and the npm package is the canonical source. See the [Generation Script](#generation-script) section above.

---

## Local Development Pipeline

[Tilt](https://tilt.dev/) orchestrates the entire development workflow. It manages dependency ordering, runs quality checks before the dev server starts, and provides a dashboard to trigger manual actions. Every resource has a clear purpose in the pipeline.

```bash
# Start the pipeline (opens Tilt dashboard at http://localhost:10351)
tilt up

# Start on a specific port
tilt up --port=10351
```

### Automatic Startup Order

When you run `tilt up`, these resources execute automatically in dependency order:

```
theme-studio-lint          ESLint check (gate 1)
        │
        v
theme-studio-unit-tests    Jest with coverage (gate 2)
        │
        v
theme-studio-dev           Vite dev server on port 4444 (ready)
```

The pipeline enforces that **lint must pass before tests run**, and **tests must pass before the dev server starts**. If lint fails, nothing downstream starts. This prevents wasting time developing against broken code.

### Resource Reference

#### Dev (automatic)

| Resource | Command | Trigger | Why It Exists |
|----------|---------|---------|---------------|
| `theme-studio-lint` | `npm run lint` | Auto | Catches code style violations, unused imports, accessibility issues, and enforces the 300-line file limit before tests run. Failing early here saves a full test cycle. |
| `theme-studio-lint-fix` | `npm run lint:fix` | Manual | Auto-fixes all fixable ESLint violations (import order, spacing, trailing commas). Run this instead of fixing lint errors by hand. |
| `theme-studio-unit-tests` | `npm run test:coverage` | Auto (after lint) | Runs the full Vitest suite with coverage reporting. Blocks the dev server from starting if any test fails, ensuring you never develop against a broken test baseline. |
| `theme-studio-unit-tests-watch` | `npm run test` | Manual | Starts Vitest in watch mode for TDD workflows. Re-runs affected tests on every file save. Does not block anything — use alongside the dev server. |
| `theme-studio-dev` | `npm run dev` | Auto (after tests) | Starts the Vite dev server on **port 4444** with HMR. Only starts after lint and tests pass. Links to Dashboard, Products, Native Components, Syncfusion Components, and Login pages. |

#### Build (manual)

These resources are triggered manually because production builds are expensive and not needed during normal development.

| Resource | Command | Trigger | Why It Exists |
|----------|---------|---------|---------------|
| `theme-studio-typecheck` | `npm run typecheck` | Manual | Runs `tsc --noEmit` for full TypeScript type checking. Vite's dev server skips type checking for speed, so this catches type errors that HMR misses. Run before committing. |
| `theme-studio-build` | `npm run build` | Manual (after hooks) | Creates an optimized production bundle with Vite. Depends on `theme-studio-generate-hooks` so the build always has the latest API types. Used for Lighthouse audits and deployment. |
| `theme-studio-prod` | `npm run preview` | Manual (after build) | Serves the production build on **port 4445**. Use this to verify the production bundle locally — minified JS, code-split CSS, real chunk sizes. Required before running Lighthouse. |

#### Testing (manual)

| Resource | Command | Trigger | Why It Exists |
|----------|---------|---------|---------------|
| `theme-studio-e2e` | `npm run test:e2e` | Manual (after dev) | Runs Playwright E2E tests against the running dev server. Tests real browser interactions (login flow, theme switching, component showcase navigation). Depends on `theme-studio-dev` being healthy. |

#### Quality (manual)

Quality gates are manual because they're slow, network-dependent, or only needed before releases.

| Resource | Command | Trigger | Why It Exists |
|----------|---------|---------|---------------|
| `theme-studio-lighthouse-prod` | `npm run lighthouse:prod:ci && ...` | Manual (after prod) | Runs a Lighthouse audit against the production preview server, asserts score thresholds, generates an HTML report, and opens it. Requires `theme-studio-prod` running on port 4445. Use to verify the 98/100 performance score hasn't regressed. |
| `theme-studio-bundle-analyze` | `npm run analyze` | Manual | Generates a visual treemap of the production bundle. Shows which dependencies are largest and where code-splitting boundaries are. Use when investigating bundle size regressions. |
| `theme-studio-security-audit` | `npm audit --audit-level=high` | Manual | Checks all npm dependencies for known vulnerabilities at severity `high` or above. Run before releases or after adding new dependencies. |
| `theme-studio-deps-health` | `npm outdated` | Manual | Lists all outdated npm packages with current vs latest versions. Helps plan dependency upgrades. Always succeeds (exit 0) even when packages are outdated. |

#### CodeGen (manual)

| Resource | Command | Trigger | Why It Exists |
|----------|---------|---------|---------------|
| `theme-studio-generate-hooks` | `npm run api:generate` | Manual | Runs Orval to generate type-safe React Query hooks from OpenAPI specs. Must be triggered after API contract changes. The production build depends on this resource to ensure generated types are fresh. |

#### Figma (manual)

All Figma resources are manual-trigger and require `FIGMA_API_TOKEN` / `FIGMA_FILE_KEY` env vars. See [Figma Integration](#figma-integration) for the full pipeline documentation.

| Resource | Command | Why It Exists |
|----------|---------|---------------|
| `figma-extract` | `npm run figma:extract` | Single API call to Figma REST API. Saves the entire document tree to `data/figma-extract.json`. All other Figma generators read from this file (no additional API calls). |
| `figma-discover` | `npm run figma:discover` | Exploration tool that lists all available styles and nodes in the Figma file. Use when mapping new sections to find the correct Figma node paths. |
| `figma-generate-badges` | `npm run figma:generate:badges` | Generates badge component theme overrides from extracted Figma data. **Implemented** — produces `data/figma-sections/badges.json`. |
| `figma-generate-typography` | `npm run figma:generate:typography` | Stub for future typography section generation (font families, sizes, weights). |
| `figma-generate-colours` | `npm run figma:generate:colours` | Stub for future color palette generation (primary, status, surface colors). |
| `figma-generate-layouts` | `npm run figma:generate:layouts` | Stub for future layout/grid section generation (spacing, breakpoints). |
| `figma-generate-icons` | `npm run figma:generate:icons` | Stub for future icon metadata generation from Figma. (Icon SVGs use the `feather-icons` npm package instead.) |
| `figma-generate-buttons` | `npm run figma:generate:buttons` | Stub for future button component theme generation. |
| `figma-generate-description` | `npm run figma:generate:description` | Stub for future description/text component generation. |
| `figma-generate-input` | `npm run figma:generate:input` | Stub for future input field theme generation. |
| `figma-generate-drawer` | `npm run figma:generate:drawer` | Stub for future drawer/sidebar component generation. |
| `figma-generate-external-link` | `npm run figma:generate:external-link` | Stub for future external link component generation. |
| `figma-generate-notifications` | `npm run figma:generate:notifications` | Stub for future notification/alert component generation. |
| `figma-generate-image` | `npm run figma:generate:image` | Stub for future image component generation. |
| `figma-generate-nav-menus` | `npm run figma:generate:nav-menus` | Stub for future navigation menu generation. |
| `figma-generate-dropdowns` | `npm run figma:generate:dropdowns` | Stub for future dropdown list generation. |
| `figma-generate-breadcrumbs` | `npm run figma:generate:breadcrumbs` | Stub for future breadcrumb component generation. |
| `figma-generate-data-grid` | `npm run figma:generate:data-grid` | Stub for future data grid theme generation. |
| `figma-generate-combobox` | `npm run figma:generate:combobox` | Stub for future combobox component generation. |
| `figma-generate-filtering` | `npm run figma:generate:filtering` | Stub for future search/filter component generation. |
| `figma-generate-pagination` | `npm run figma:generate:pagination` | Stub for future pagination component generation. |
| `figma-generate-progress` | `npm run figma:generate:progress` | Stub for future progress bar generation. |
| `figma-generate-skeleton` | `npm run figma:generate:skeleton` | Stub for future skeleton loader generation. |
| `figma-generate-slider` | `npm run figma:generate:slider` | Stub for future slider component generation. |
| `figma-generate-subhead` | `npm run figma:generate:subhead` | Stub for future subhead component generation. |
| `figma-generate` | `npm run figma:generate` | Main generator that reads `figma-extract.json` plus all `data/figma-sections/*.json` files and produces the final `figmaDesign.ts` preset. |
| `figma-sync` | `npm run figma:sync` | Full pipeline shortcut: runs extract, then all section generators, then the main generator in sequence. |

#### MockServer (manual)

| Resource | Command | Trigger | Why It Exists |
|----------|---------|---------|---------------|
| `mock-server` | `dotnet run MockServer.Web` | Manual | Starts a .NET mock API server on **port 5150** that simulates backend endpoints (Products, Users, Orders). Enables frontend development without running the full backend stack. Has a readiness probe on `/api/products`. |
| `mock-server-export-spec` | Downloads `swagger.json` | Manual (after mock-server) | Exports the MockServer's OpenAPI spec to `src/api/swagger/mockserver.json`. Run this after changing mock endpoints, then trigger `theme-studio-generate-hooks` to regenerate API hooks from the updated spec. |

### Port Summary

| Port | Service | Auto-Start |
|------|---------|:---:|
| **4444** | Vite dev server | Yes |
| **4445** | Production preview | No |
| **5150** | Mock API server | No |
| **9001** | Lighthouse reports | No |
| **10351** | Tilt dashboard | Yes |

### Common Workflows

**Normal development:** Just run `tilt up`. Lint, tests, and dev server start automatically in order.

**Before committing:** Trigger `theme-studio-typecheck` in the Tilt dashboard to catch type errors Vite skips.

**Performance check:** Trigger `theme-studio-build` → `theme-studio-prod` → `theme-studio-lighthouse-prod` in sequence.

**After API changes:** Trigger `mock-server-export-spec` → `theme-studio-generate-hooks` to regenerate typed API hooks.

**Figma sync:** Trigger `figma-sync` for the full pipeline, or trigger individual section generators after `figma-extract`.

---

## Common Functionality & References

### Tailwind CSS Spacing Scale

Used for padding (`p-`), margin (`m-`), width (`w-`), height (`h-`), gap, etc.

| Class suffix | CSS value | Pixels |
|-------------|-----------|--------|
| `0` | `0px` | 0 |
| `px` | `1px` | 1 |
| `0.5` | `0.125rem` | 2 |
| `1` | `0.25rem` | 4 |
| `1.5` | `0.375rem` | 6 |
| `2` | `0.5rem` | 8 |
| `2.5` | `0.625rem` | 10 |
| `3` | `0.75rem` | 12 |
| `4` | `1rem` | 16 |
| `5` | `1.25rem` | 20 |
| `6` | `1.5rem` | 24 |
| `8` | `2rem` | 32 |
| `[3px]` | `3px` | Arbitrary value syntax |

**Direction prefixes:** `t` (top), `b` (bottom), `l` (left), `r` (right), `x` (horizontal), `y` (vertical), none (all sides).

Example: `pt-2` = `padding-top: 0.5rem` (8px), `mx-4` = `margin-left: 1rem; margin-right: 1rem` (16px).

Full reference: https://tailwindcss.com/docs/padding

### Where to Find Things

| What | Location |
|------|----------|
| **SVG Icons** | `src/components/icons/` (AppIcons, SettingsIcons, ShowcaseIcons, FeatherIcons*, CustomIcons) |
| **Figma sync pipeline** | `scripts/figma/` (discover, extract, generate, corrections, mapping) — see [`scripts/figma/README.md`](scripts/figma/README.md) |
| **Icon generation** | `scripts/generate-feather-icons.mjs` |
| **Tilt pipeline** | `Tiltfile` (all resources, dependency order, port mappings) |
| **Mock API server** | `MockServer/` (.NET mock for standalone frontend development) |
| **Shared UI components** | `src/components/ui/shared/` (SearchInput, etc.) |
| **Layout components** | `src/components/layout/` (Sidebar, Header, MainLayout) |
| **Theme store & types** | `src/stores/theme/` |
| **Theme presets** | `src/stores/theme/presets/` |
| **Default component styles** | `src/stores/theme/defaults/` (light & dark) |
| **CSS variable injection** | `src/stores/theme/injectors/` |
| **Theme settings UI editors** | `src/components/layout/ThemeSettingsDrawer/sections/ComponentsSection/` |
| **CSS layers & component styles** | `src/styles/layers/` |
| **Localization strings** | `src/localization/locales/en.json` |
| **Syncfusion wrappers** | `src/components/ui/` (DataGrid, Select, DatePicker, etc.) |
| **Feature pages** | `src/features/` (auth, dashboard, showcase, etc.) |
| **API hooks (Orval-generated)** | `src/api/` |
| **Utility functions** | `src/utils/` (cn, is, etc.) |

---

## Performance Optimization Details

This project underwent extensive performance optimization to achieve a **98/100 Lighthouse score**. Below are the detailed fixes and techniques implemented.

### The Problem

The initial implementation had severe performance issues:

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Lighthouse Score | 54/100 | 98/100 | +44 points |
| First Contentful Paint | 32.2s | 1.8s | **18x faster** |
| Largest Contentful Paint | 62.4s | 2.0s | **31x faster** |
| Initial JS Bundle | ~2.5 MB | ~116 KB | **95% smaller** |
| Total Blocking Time | 120ms | 0ms | **Perfect** |

### Root Causes Identified

1. **Syncfusion Grid Loading on Login Page** - The 2.1MB Syncfusion Grid component was loading on every page, including the login page where it wasn't needed.

2. **Static Imports of Heavy Dependencies** - The `registerLicense` function from `@syncfusion/ej2-base` was imported statically, pulling in the entire Syncfusion dependency tree.

3. **Barrel Export Tree-Shaking Issues** - The main UI component barrel (`@/components/ui/index.ts`) mixed native and Syncfusion components, causing bundlers to include all Syncfusion code.

4. **Eager CSS Loading** - All Syncfusion CSS was loaded upfront instead of being code-split.

5. **MainLayout Not Lazy-Loaded** - The dashboard layout and all its dependencies loaded on every page.

### Solution 1: Dynamic Imports for Syncfusion License

**Problem:** Static import of `registerLicense` pulled in all Syncfusion dependencies.

**Before:**
```typescript
// src/config/syncfusion.ts
import { registerLicense } from '@syncfusion/ej2-base';

export function initializeSyncfusion(): void {
  registerLicense(DEFAULT_LICENSE_KEY);
}
```

**After:**
```typescript
// src/config/syncfusion.ts
async function registerLicenseAsync(key: string): Promise<void> {
  const { registerLicense } = await import('@syncfusion/ej2-base');
  registerLicense(key);
}

export function initializeSyncfusion(): void {
  registerLicenseAsync(DEFAULT_LICENSE_KEY).catch(() => undefined);
}
```

**Impact:** Removed ~2MB from initial bundle by deferring Syncfusion base library loading.

### Solution 2: Split UI Component Barrels

**Problem:** Importing any component from the main barrel loaded all Syncfusion dependencies.

**Solution:** Created separate barrel exports for native and Syncfusion components:

```
src/components/ui/
├── index.ts        → Re-exports types only (backward compatible)
├── native.ts       → ButtonNative, InputNative (zero Syncfusion deps)
└── syncfusion.ts   → DataGrid, Button, Input, Select, etc.
```

**Login Page Import (Before):**
```typescript
import { Button, Input } from '@/components/ui';  // Loaded ALL components
```

**Login Page Import (After):**
```typescript
import { ButtonNative, InputNative } from '@/components/ui/native';  // Zero Syncfusion
```

**Impact:** Login page no longer loads any Syncfusion JavaScript.

### Solution 3: Native HTML Components for Login

**Problem:** Login page used Syncfusion Button and Input components unnecessarily.

**Solution:** Created lightweight native HTML components:

```typescript
// src/components/ui/ButtonNative/index.tsx
const ButtonNative = ({ children, variant, ...props }) => (
  <button className={`btn btn-${variant}`} {...props}>
    {children}
  </button>
);

// src/components/ui/InputNative/index.tsx
const InputNative = ({ label, error, ...props }) => (
  <div className="input-wrapper">
    <label>{label}</label>
    <input className="input" {...props} />
    {error && <span className="error">{error}</span>}
  </div>
);
```

**Impact:** Login page uses only ~2KB of component code instead of ~200KB.

### Solution 4: Lazy-Load MainLayout

**Problem:** MainLayout and all its dependencies (Sidebar, Header, ThemeSettingsDrawer) loaded on every page.

**Before:**
```typescript
// src/app/routes.tsx
import { MainLayout } from '@/components/layout/MainLayout';

const routes = [
  { path: '/dashboard', element: <MainLayout /> }
];
```

**After:**
```typescript
// src/app/routes.tsx
const MainLayout = lazy(async () => ({
  default: (await import('@/components/layout/MainLayout')).MainLayout,
}));

const routes = [
  {
    path: '/dashboard',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <MainLayout />
      </Suspense>
    )
  }
];
```

**Impact:** Dashboard layout code only loads when navigating to `/dashboard`.

### Solution 5: CSS Code Splitting

**Problem:** All CSS (including Syncfusion styles) loaded on initial page load.

**Solution:** Split CSS into login-specific and app-specific files:

```
src/styles/
├── login.css       → Base styles + critical components only (~6KB gzipped)
├── app.css         → Syncfusion styles + full components (~140KB gzipped)
└── layers/
    ├── base.css
    ├── components-critical.css  → btn, card, input only
    └── components-app.css       → sidebar, header, badges, modals
```

**Login Page:**
```typescript
// src/main.tsx
import './styles/login.css';  // Only critical CSS
```

**Dashboard (loaded dynamically):**
```typescript
// src/components/layout/MainLayout/index.tsx
useEffect(() => {
  import('@/styles/app.css');  // Full CSS loaded after login
}, []);
```

**Impact:** Initial CSS reduced from ~150KB to ~6KB.

### Solution 6: Remove Syncfusion Grid from Modulepreload

**Problem:** Vite's modulepreload was including the 2.1MB Syncfusion Grid chunk.

**Solution:** Post-build script to strip heavy chunks from modulepreload:

```javascript
// scripts/add-prefetch-hints.js
const REMOVE_FROM_MODULEPRELOAD = ['syncfusion-grid'];

for (const chunkName of REMOVE_FROM_MODULEPRELOAD) {
  const regex = new RegExp(
    `\\s*<link[^>]*rel="modulepreload"[^>]*href="[^"]*${chunkName}[^"]*"[^>]*>`,
    'g'
  );
  html = html.replace(regex, '\n');
}
```

**Also configured in Vite:**
```typescript
// vite.config.ts
build: {
  modulePreload: {
    resolveDependencies: (_filename, deps) => {
      return deps.filter((dep) => !dep.includes('syncfusion-grid'));
    },
  },
}
```

**Impact:** Browser no longer preloads the 2.1MB grid chunk on login.

### Solution 7: Background Preloading After Login

**Problem:** Dashboard felt slow because Syncfusion modules loaded on navigation.

**Solution:** Preload modules in background after successful login:

```typescript
// src/config/syncfusionLazy.ts
export const preloadSyncfusionModules = (): void => {
  const preload = (): void => {
    import('@syncfusion/ej2-react-grids').catch(() => undefined);
    import('@syncfusion/ej2-react-calendars').catch(() => undefined);
    import('@syncfusion/ej2-react-dropdowns').catch(() => undefined);
  };

  if ('requestIdleCallback' in window)
    window.requestIdleCallback(preload, { timeout: 2000 });
  else
    setTimeout(preload, 100);
};

// Called on login form submit
const handleSubmit = () => {
  preloadSyncfusionModules();  // Start loading in background
  navigate('/dashboard');
};
```

**Impact:** Dashboard loads instantly because modules are already cached.

### Solution 8: Optimize Vite Dev Server

**Problem:** Development server had 9.1s FCP due to on-demand transforms.

**Solution:** Pre-bundle all heavy dependencies:

```typescript
// vite.config.ts
optimizeDeps: {
  include: [
    'react', 'react-dom', 'react-dom/client',
    'react-router-dom', '@tanstack/react-query', 'zustand',
    'i18next', 'react-i18next',
    '@syncfusion/ej2-base',
    '@syncfusion/ej2-react-grids',
    '@syncfusion/ej2-react-inputs',
    '@syncfusion/ej2-react-buttons',
    // ... all Syncfusion packages
  ],
  esbuildOptions: {
    target: 'es2020',
    keepNames: true,
  },
},
server: {
  warmup: {
    clientFiles: [
      './src/main.tsx',
      './src/app/App.tsx',
      './src/app/routes.tsx',
      './src/features/auth/pages/LoginPage/index.tsx',
    ],
  },
},
```

**Impact:** Dev server starts faster and HMR is more responsive.

### Bundle Analysis

**Final Production Bundle (Login Page):**

| File | Size (gzipped) | Purpose |
|------|----------------|---------|
| `index-*.js` | 27.7 KB | Main app entry |
| `react-vendor-*.js` | 66.1 KB | React + React DOM |
| `query-vendor-*.js` | 13.5 KB | TanStack Query |
| `index-*.css` | 6.4 KB | Login CSS |
| **Total** | **~116 KB** | Initial load |

**Deferred Chunks (loaded after login):**

| File | Size (gzipped) | When Loaded |
|------|----------------|-------------|
| `syncfusion-grid-*.js` | 498 KB | DataGrid pages |
| `syncfusion-inputs-*.js` | 1.4 KB | Form pages |
| `app-*.css` | 140 KB | Dashboard |

### Performance Testing

Always test performance using the **production build**:

```bash
# Build for production
npm run build

# Start preview server (port 4173)
npm run preview

# Run Lighthouse
npx lighthouse http://localhost:4173 --view
```

**Note:** The dev server (port 4444/4445) will always be slower because code isn't minified. Only use production builds for accurate performance metrics.

### Module Preloading Strategy

To maintain fast initial load while ensuring smooth dashboard experience, we use strategic background preloading.

#### What to Preload and Where

| Module | When to Preload | Location | Why |
|--------|-----------------|----------|-----|
| **Syncfusion Components** | On login submit | LoginPage | Dashboard needs them immediately |
| **Form Libraries** (react-hook-form, zod) | After login page loads | LoginPage useEffect | Forms used throughout dashboard |
| **App CSS** | On dashboard mount | MainLayout | Full styling for dashboard |
| **Syncfusion Grid** | On dashboard idle | MainLayout | Heavy, load when browser is idle |

#### Implementation Locations

```typescript
// 1. Login Page - Preload Syncfusion on submit
// src/features/auth/pages/LoginPage/index.tsx
import { preloadSyncfusionModules } from '@/config/syncfusionLazy';
import { preloadFormLibraries } from '@/config/preloadForms';

function LoginPage() {
  // Preload form libraries when login page mounts
  useEffect(() => {
    preloadFormLibraries();
  }, []);

  const handleSubmit = () => {
    preloadSyncfusionModules(); // Start loading before navigation
    navigate('/dashboard');
  };
}

// 2. MainLayout - Preload remaining heavy modules
// src/components/layout/MainLayout/index.tsx
import { preloadSyncfusionFormComponents } from '@/config/preloadForms';

function MainLayout() {
  useEffect(() => {
    import('@/styles/app.css'); // Load full CSS
    preloadSyncfusionFormComponents(); // Form-specific Syncfusion
  }, []);
}
```

#### Preload Configuration Files

```typescript
// src/config/preloadForms.ts
export function preloadFormLibraries(): void {
  const preload = (): void => {
    import('react-hook-form').catch(() => undefined);
    import('zod').catch(() => undefined);
    import('@hookform/resolvers/zod').catch(() => undefined);
  };

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(preload, { timeout: 3000 });
  } else {
    setTimeout(preload, 1000);
  }
}

export function preloadSyncfusionFormComponents(): void {
  const preload = (): void => {
    import('@syncfusion/ej2-react-inputs').catch(() => undefined);
    import('@syncfusion/ej2-react-dropdowns').catch(() => undefined);
    import('@syncfusion/ej2-react-calendars').catch(() => undefined);
  };

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(preload, { timeout: 3000 });
  } else {
    setTimeout(preload, 1000);
  }
}
```

#### Preloading Best Practices

1. **Use `requestIdleCallback`** - Only preload when browser is idle
2. **Set timeout** - Ensure preload happens even if browser never idles
3. **Catch errors** - Silent failure for preloads (non-critical)
4. **Don't block** - Preloading should never delay user interactions
5. **Order matters** - Preload modules in order of likely use

---

## CSS Customization System

This project implements a comprehensive CSS customization system using CSS variables, layers, and dynamic injection.

### CSS Architecture

```
src/styles/
├── login.css                    # Entry point for login page
├── app.css                      # Entry point for dashboard (lazy-loaded)
└── layers/
    ├── base.css                 # CSS reset, variables, theme tokens
    ├── components.css           # Full component library
    ├── components-critical.css  # Minimal components for login
    ├── components-app.css       # Additional dashboard components
    └── syncfusion-overrides.css # Syncfusion theme integration
```

### CSS Layers

CSS layers are used for specificity control:

```css
@layer base, components, utilities;
```

This ensures:
1. **base** - Theme variables and resets (lowest specificity)
2. **components** - Component styles
3. **utilities** - Tailwind utilities (highest specificity)

### Theme Variables

All styling is driven by CSS variables for runtime customization:

```css
:root {
  /* Primary Colors */
  --color-primary-50: 239 246 255;
  --color-primary-500: 59 130 246;
  --color-primary-900: 30 58 138;

  /* Component-Specific Variables */
  --button-bg: var(--color-primary-500);
  --button-text: 255 255 255;
  --button-border-radius: var(--radius-md);

  --input-bg: var(--color-surface);
  --input-border: var(--color-border);
  --input-focus-ring: var(--color-primary-500);

  /* Layout Variables */
  --sidebar-width: 256px;
  --header-height: 64px;
}
```

### Per-Component Theming

Each component has its own light and dark theme configuration:

```typescript
// src/stores/theme/types/componentTypes.ts
interface ComponentsConfig {
  light: ComponentConfigSingle;
  dark: ComponentConfigSingle;
}

interface ComponentConfigSingle {
  button: ButtonConfig;
  input: InputConfig;
  select: SelectConfig;
  dataGrid: DataGridConfig;
  datePicker: DatePickerConfig;
  dialog: DialogConfig;
}
```

Components automatically use the correct theme based on current mode:

```typescript
// src/stores/theme/injectors/componentInjector.ts
export function injectComponentVariables(
  components: ComponentsConfig,
  mode: 'light' | 'dark'
): void {
  const config = components[mode];

  // Inject button variables
  setVar('--button-bg', config.button.background);
  setVar('--button-text', config.button.textColor);

  // Inject input variables
  setVar('--input-bg', config.input.background);
  setVar('--input-border', config.input.borderColor);
  // ... etc
}
```

### Theme Presets

12 beautiful theme presets are included, each with light and dark variants:

| Preset | Description |
|--------|-------------|
| Ocean Blue | Professional blue (Salesforce-inspired) |
| Forest Green | Nature-inspired with amber accents |
| Royal Purple | Elegant with rose gold secondary |
| Sunset Orange | Warm coral and orange tones |
| Rose Pink | Soft pink with lavender accent |
| Midnight | Deep dark blue with electric violet |
| Arctic | Cool ice blue, clean and refreshing |
| Copper | Warm metallic with bronze accents |
| Emerald | Rich jewel-toned green |
| Lavender | Soft calming purple tones |
| Slate | Professional gray |
| Gold | Luxurious with bronze accents |

### Using Presets

```typescript
import { useThemeStore } from '@/stores/useThemeStore';
import { oceanBluePreset } from '@/stores/theme/presets';

const { applyPreset } = useThemeStore();

// Apply a preset
applyPreset(oceanBluePreset);
```

### Export/Import Themes

```typescript
const { exportTheme, importTheme } = useThemeStore();

// Export current theme as JSON
const themeJson = exportTheme();
console.log(JSON.stringify(themeJson, null, 2));

// Import a theme
importTheme(customThemeJson);
```

### Syncfusion Component Styling

Syncfusion components are styled using CSS variable overrides:

```css
/* src/styles/layers/syncfusion-overrides.css */

/* Button Overrides */
.e-btn {
  background-color: rgb(var(--button-bg));
  color: rgb(var(--button-text));
  border-radius: var(--button-border-radius);
}

/* Input Overrides */
.e-input-group {
  background-color: rgb(var(--input-bg));
  border-color: rgb(var(--input-border));
}

.e-input-group:focus-within {
  border-color: rgb(var(--input-focus-ring));
  box-shadow: 0 0 0 3px rgb(var(--input-focus-ring) / 0.1);
}

/* DataGrid Overrides */
.e-grid {
  background-color: rgb(var(--datagrid-bg));
  border-color: rgb(var(--datagrid-border));
}

.e-grid .e-headercell {
  background-color: rgb(var(--datagrid-header-bg));
  color: rgb(var(--datagrid-header-text));
}
```

---

## Related Projects

This theme studio is designed to work with the broader SaaS platform:

| Project | Description | Location |
|---------|-------------|----------|
| **BaseClient** | React Native/Expo frontend | `../BaseClient` |
| **IdentityService** | Authentication & authorization | `../IdentityService` |
| **QuestionerService** | Survey/questionnaire service | `../QuestionerService` |
| **OnlineMenuService** | Restaurant menu management | `../OnlineMenuSaaS/OnlineMenuService` |
| **NotificationService** | Push notifications & alerts | `../NotificationService` |
| **E2ETests** | Playwright end-to-end tests | `../E2ETests` |

### Integration Points

1. **Theme Export** - Export themes as JSON for use in other frontends
2. **CSS Variables** - Generated variables can be imported into any project
3. **Component Wrappers** - Syncfusion wrappers are reusable across projects
4. **Design Tokens** - Export design tokens for design system consistency

---

## License

MIT License - see [LICENSE](LICENSE) for details.

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting a PR.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
