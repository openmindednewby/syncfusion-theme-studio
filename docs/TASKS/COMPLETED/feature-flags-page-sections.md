# Feature Flags: Per-Section Page Gating with Build-Time Tree-Shaking

## Status: COMPLETED
## Priority: High
## Depends on: ENV config module (`src/config/env.ts` — already implemented)
## Agent: frontend-dev

## Goal

Add per-section environment variables that control which page sections are included in the app. When a section is disabled, its pages must be:
1. **Excluded from the production bundle** (chunks not generated — true tree-shaking)
2. **Removed from the sidebar navigation** (no dead links)
3. **Removed from the route definitions** (no blank pages on direct URL access)
4. **Skipped by the phased preloader** (no wasted network requests)

## Environment Variables

| Env var | Default | What it gates |
|---------|---------|--------------|
| `VITE_ENABLE_COMPONENTS` | `true` | All ~46 component showcase pages (native + syncfusion variants), component overview pages, Grid showcase |
| `VITE_ENABLE_FORMS` | `true` | SyncfusionFormsPage, NativeFormsPage |
| `VITE_ENABLE_PRODUCTS` | `true` | NativeProductsPage, ProductsListPage |

All default to `true`. Set to `'false'` to disable.

## Architecture: Two-Layer Gating Strategy

### Why two layers?

Vite statically replaces `import.meta.env.VITE_*` with literal strings **before** Rollup processes the code. For Rollup to eliminate a dynamic `import()` call (and skip generating its chunk), it must see a **literal dead branch** directly in the source:

```typescript
// Vite replaces import.meta.env.VITE_ENABLE_COMPONENTS with "false":
const Page = "false" !== 'false' ? lazy(() => import('./Page')) : null;
//         → false ? ... : null → Rollup sees dead branch → no chunk generated
```

If the condition goes through an intermediary module (like `ENV.enableComponents` from `env.ts`), Rollup cannot propagate the constant across module boundaries and **the chunk survives**. This is a Vite/Rollup limitation — the replacement is text-based and happens before JS evaluation.

### The two layers

| Layer | Where | How | Why |
|-------|-------|-----|-----|
| **Build-time** | `lazyPages.ts` only | `import.meta.env.VITE_*` directly | Guarantees tree-shaking — chunks not generated |
| **Runtime** | Router, sidebar, preloader | `ENV` from `@/config/env` | Centralized, typed, consistent with rest of app |

### The rule

> `import.meta.env.VITE_*` is used directly in **exactly two files**: `env.ts` (to populate `ENV`) and `lazyPages.ts` (for tree-shaking). **Every other file** uses `ENV` from `@/config/env`.

This rule must be enforced by ESLint (see Step 7 below).

## Implementation Steps

### Step 1: Add env vars to `.env`, `.env.example`, `vite-env.d.ts`

**Files**: `.env`, `.env.example`, `src/vite-env.d.ts`

Add to `.env`:
```env
VITE_ENABLE_COMPONENTS=true
VITE_ENABLE_FORMS=true
VITE_ENABLE_PRODUCTS=true
```

Add to `.env.example` with documentation comments.

Add to `ImportMetaEnv` in `vite-env.d.ts`:
```typescript
readonly VITE_ENABLE_COMPONENTS?: string;
readonly VITE_ENABLE_FORMS?: string;
readonly VITE_ENABLE_PRODUCTS?: string;
```

### Step 2: Extend `ENV` in `src/config/env.ts`

Add runtime accessors for sidebar/router/preloader use:

```typescript
export const ENV = {
  // ... existing
  enableComponents: import.meta.env['VITE_ENABLE_COMPONENTS'] !== 'false',
  enableForms: import.meta.env['VITE_ENABLE_FORMS'] !== 'false',
  enableProducts: import.meta.env['VITE_ENABLE_PRODUCTS'] !== 'false',
} as const;
```

### Step 3: Gate lazy imports in `src/app/routes/lazyPages.ts` (BUILD-TIME)

This is the critical file for tree-shaking. Use `import.meta.env.VITE_*` **directly** — not through `ENV`.

Pattern:
```typescript
import { lazy, type LazyExoticComponent, type ComponentType } from 'react';

// Build-time feature flags — read directly for tree-shaking (see docs/TASKS/TODO/feature-flags-page-sections.md)
const COMPONENTS = import.meta.env['VITE_ENABLE_COMPONENTS'] !== 'false';
const FORMS = import.meta.env['VITE_ENABLE_FORMS'] !== 'false';
const PRODUCTS = import.meta.env['VITE_ENABLE_PRODUCTS'] !== 'false';

type LazyPage = LazyExoticComponent<ComponentType> | null;

// Auth & Dashboard (always enabled)
export const LoginPage = lazy(async () => import('@/features/auth/pages/LoginPage'));
export const DashboardPage = lazy(async () => import('@/features/dashboard/pages/DashboardPage'));

// Products
export const NativeProductsPage: LazyPage = PRODUCTS
  ? lazy(async () => import('@/features/products/pages/NativeProductsPage'))
  : null;
export const ProductsListPage: LazyPage = PRODUCTS
  ? lazy(async () => import('@/features/products/pages/ProductsListPage'))
  : null;

// Components overview
export const NativeComponentsPage: LazyPage = COMPONENTS
  ? lazy(async () => import('@/features/components/pages/NativeComponentsPage'))
  : null;
// ... same pattern for all ~46 component pages

// Forms
export const SyncfusionFormsPage: LazyPage = FORMS
  ? lazy(async () => import('@/features/forms/pages/SyncfusionFormsPage'))
  : null;
export const NativeFormsPage: LazyPage = FORMS
  ? lazy(async () => import('@/features/forms/pages/NativeFormsPage'))
  : null;
```

**Important**: The local `const COMPONENTS = import.meta.env[...] !== 'false'` at the top of the file is resolved by Vite in the same module scope — Rollup sees the literal boolean and eliminates dead branches.

### Step 4: Gate routes in `src/app/router.tsx` and `src/app/routes/componentShowcaseRoutes.tsx` (RUNTIME)

Use `ENV` from `@/config/env`. Filter out routes whose component is `null`.

In `router.tsx`, conditionally include route groups:
```typescript
import { ENV } from '@/config/env';

const children: RouteObject[] = [
  { index: true, element: <LazyPage component={DashboardPage} /> },

  // Products — included only when enabled
  ...(ENV.enableProducts ? [
    { path: RouteSegment.Products, element: <Navigate replace to={RouteRedirectTarget.Native} /> },
    { path: RouteSegment.ProductsNative, element: <LazyPage component={NativeProductsPage!} /> },
    { path: RouteSegment.ProductsSyncfusion, element: <LazyPage component={ProductsListPage!} /> },
  ] : []),

  // Components — included only when enabled
  ...(ENV.enableComponents ? [
    { path: RouteSegment.Components, element: <Navigate replace to={RouteRedirectTarget.Native} /> },
    { path: RouteSegment.ComponentsNative, element: <LazyPage component={NativeComponentsPage!} /> },
    // ... grid, componentShowcaseRoutes
  ] : []),

  // Forms — included only when enabled
  ...(ENV.enableForms ? [
    { path: RouteSegment.Forms, element: <Navigate replace to={RouteRedirectTarget.Syncfusion} /> },
    { path: RouteSegment.FormsSyncfusion, element: <LazyPage component={SyncfusionFormsPage!} /> },
    { path: RouteSegment.FormsNative, element: <LazyPage component={NativeFormsPage!} /> },
  ] : []),

  // Always included
  { path: RouteSegment.NotImplemented, element: <LazyPage component={NotImplementedPage} /> },
  { path: '*', element: <Navigate replace to={RoutePath.Dashboard} /> },
];
```

Similarly, wrap `componentShowcaseRoutes.tsx` — the entire export can be gated:
```typescript
export const componentShowcaseRoutes: RouteObject[] = ENV.enableComponents ? [ ... ] : [];
```

### Step 5: Gate sidebar navigation items (RUNTIME)

**Files**:
- `src/components/layout/Sidebar/sidebarNavData.ts`

Filter `MAIN_NAV_ITEMS` based on `ENV`:

```typescript
import { ENV } from '@/config/env';

const ALL_NAV_ITEMS: SidebarNavEntry[] = [
  { id: 'dashboard', ... },    // always
  { id: 'products', ... },     // gated
  { id: 'forms', ... },        // gated
  { id: 'components', ... },   // gated
  // ... rest (always — they point to NotImplemented)
];

const SECTION_GATES: Record<string, boolean> = {
  products: ENV.enableProducts,
  forms: ENV.enableForms,
  components: ENV.enableComponents,
};

export const MAIN_NAV_ITEMS = ALL_NAV_ITEMS.filter(
  (item) => SECTION_GATES[item.id] ?? true,
);
```

### Step 6: Gate preload phases in `src/config/preloadOrchestrator.ts` (RUNTIME)

Use `ENV` to conditionally include imports in each phase:

```typescript
import { ENV } from '@/config/env';

const preloadCoreRoutes = async (): Promise<unknown[]> =>
  Promise.all([
    import('@/features/auth/pages/LoginPage').catch(() => undefined),
    ...(ENV.enableProducts ? [
      import('@/features/products/pages/NativeProductsPage').catch(() => undefined),
      import('@/features/products/pages/ProductsListPage').catch(() => undefined),
    ] : []),
    ...(ENV.enableComponents ? [
      import('@/features/components/pages/NativeComponentsPage').catch(() => undefined),
      import('@/features/components/pages/SyncfusionComponentsPage').catch(() => undefined),
      import('@/features/components/pages/NativeGridShowcase').catch(() => undefined),
      import('@/features/components/pages/SyncfusionGridShowcase').catch(() => undefined),
    ] : []),
    ...(ENV.enableForms ? [
      import('@/features/forms/pages/SyncfusionFormsPage').catch(() => undefined),
      import('@/features/forms/pages/NativeFormsPage').catch(() => undefined),
    ] : []),
  ]);

const preloadShowcasePages = async (): Promise<unknown[]> => {
  if (!ENV.enableComponents) return [];
  return Promise.all([ /* ... existing showcase imports ... */ ]);
};

const preloadSyncfusionModules = async (): Promise<unknown[]> => {
  // Only preload Syncfusion vendor chunks if components or forms are enabled
  if (!ENV.enableComponents && !ENV.enableForms) return [];
  return Promise.all([ /* ... existing syncfusion imports ... */ ]);
};
```

**Note**: The `import()` calls in the preloader do NOT need `import.meta.env` directly because they are runtime-only (they fetch already-built chunks). If the chunk doesn't exist in the build (because `lazyPages.ts` tree-shook it), the `import().catch(() => undefined)` will silently fail. But gating them via `ENV` avoids unnecessary failed network requests.

### Step 7: ESLint rules to enforce the pattern

**File**: Create new ESLint rule or extend existing plugin

Two rules are needed:

#### Rule 1: `no-direct-env-access`
**Scope**: All files EXCEPT `src/config/env.ts` and `src/app/routes/lazyPages.ts`
**Error**: "Direct `import.meta.env` access is not allowed. Use `ENV` from `@/config/env` instead."

```typescript
// eslint rule pseudocode
// Match: import.meta.env.VITE_* or import.meta.env['VITE_*']
// Allow in: src/config/env.ts, src/app/routes/lazyPages.ts
// Error everywhere else
```

#### Rule 2: `require-direct-env-in-lazy-pages`
**Scope**: `src/app/routes/lazyPages.ts` only
**Error**: "Feature flag conditionals in lazyPages.ts must use `import.meta.env.VITE_*` directly for build-time tree-shaking. Do not use `ENV` from `@/config/env`."

```typescript
// eslint rule pseudocode
// In lazyPages.ts: flag any import of ENV from @/config/env
// Suggest using import.meta.env directly
```

**Implementation location**: `eslint-plugins/` directory (existing plugin infrastructure), or inline in `eslint.config.ts` using `no-restricted-imports` + `no-restricted-syntax`.

Quick approach using built-in ESLint rules:
```typescript
// In eslint.config.ts, add overrides:
{
  files: ['!src/config/env.ts', '!src/app/routes/lazyPages.ts'],
  rules: {
    'no-restricted-syntax': ['error', {
      selector: "MemberExpression[object.object.property.name='meta'][object.property.name='env']",
      message: 'Use ENV from @/config/env instead of import.meta.env directly.',
    }],
  },
},
{
  files: ['src/app/routes/lazyPages.ts'],
  rules: {
    'no-restricted-imports': ['error', {
      paths: [{ name: '@/config/env', message: 'Use import.meta.env directly in lazyPages.ts for tree-shaking.' }],
    }],
  },
},
```

### Step 8: Update README documentation

**File**: `SyncfusionThemeStudio/README.md`

Add a new section documenting:

1. **Available feature flags** — table of all `VITE_*` env vars with descriptions
2. **How to disable a section** — set the env var to `'false'` in `.env`
3. **The two-layer gating architecture** — why `lazyPages.ts` uses `import.meta.env` directly while everything else uses `ENV`
4. **Adding a new feature flag** — step-by-step guide (add to `.env`, `.env.example`, `vite-env.d.ts`, `env.ts`, `lazyPages.ts`, router, sidebar, preloader)
5. **ESLint enforcement** — explain the two rules that enforce the pattern

## Files to Change

| File | Action | Layer |
|------|--------|-------|
| `.env` | Modify | Config |
| `.env.example` | Modify | Config |
| `src/vite-env.d.ts` | Modify | Types |
| `src/config/env.ts` | Modify | Config |
| `src/app/routes/lazyPages.ts` | Modify | Build-time |
| `src/app/router.tsx` | Modify | Runtime |
| `src/app/routes/componentShowcaseRoutes.tsx` | Modify | Runtime |
| `src/components/layout/Sidebar/sidebarNavData.ts` | Modify | Runtime |
| `src/config/preloadOrchestrator.ts` | Modify | Runtime |
| `eslint.config.ts` (or `eslint-plugins/`) | Modify | Enforcement |
| `README.md` | Modify | Documentation |

## Verification

1. Set `VITE_ENABLE_COMPONENTS=false` → build → verify no component showcase chunks in `dist/assets/`
2. Set `VITE_ENABLE_FORMS=false` → build → verify no forms chunks in `dist/assets/`
3. Set `VITE_ENABLE_PRODUCTS=false` → build → verify no products chunks in `dist/assets/`
4. With any section disabled → verify sidebar doesn't show the section
5. With any section disabled → navigate to disabled route directly → verify redirect to dashboard (not blank page)
6. With any section disabled → verify preloader doesn't attempt to fetch disabled chunks (no 404s in network tab)
7. With all sections enabled (default) → verify everything works as before (no regression)
8. Run `npm run lint:fix` → no new errors
9. Run `npm run test:coverage` → all tests pass
10. Run `npx tsc --noEmit` → no new type errors
11. ESLint rules: verify `import.meta.env` in a random component file triggers the lint error
12. ESLint rules: verify importing `ENV` in `lazyPages.ts` triggers the lint error

## Lifecycle

- [x] quality-gate — GATE_PASSED (1131/1135 tests pass, 4 pre-existing failures unrelated to changes)
- [x] code-reviewer — REVIEW_PASSED (all 11 files reviewed, 0 issues)
- [ ] visual-qa (test with components disabled, then enabled)
- [ ] regression-tester (verify existing E2E tests pass with default config)

## Build Verification Results

| Config | Precache Entries | Total Size | Build Time |
|--------|-----------------|------------|------------|
| All enabled (default) | 183 | ~8515 KiB | 23.75s |
| Components disabled | 111 | ~7680 KiB | 22.04s |
| All disabled | 103 | ~6955 KiB | 18.39s |
