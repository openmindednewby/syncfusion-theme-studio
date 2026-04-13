# Creating a New Feature

> Back to [README](../README.md) | See also: [Create New Component Guide](CREATE_NEW_COMPONENT_GUIDE.md) · [Adding a Component Showcase](ADDING_NEW_FEATURE.md)

This guide walks you through creating a **brand new top-level feature** (e.g. a "Reports" page) from scratch — including routing, sidebar navigation, lazy loading, translations, test IDs, and preloading.

If you're adding a **component showcase** instead (under the existing Components section), see [ADDING_NEW_FEATURE.md](ADDING_NEW_FEATURE.md).

---

## Table of Contents

- [Creating a New Feature](#creating-a-new-feature)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Overview — What Files You'll Touch](#overview--what-files-youll-touch)
  - [Step 1 — Create the Feature Directory](#step-1--create-the-feature-directory)
  - [Step 2 — Create the Page Component](#step-2--create-the-page-component)
  - [Step 3 — Add Route Segments](#step-3--add-route-segments)
  - [Step 4 — Add Absolute Paths](#step-4--add-absolute-paths)
  - [Step 5 — Add Route Prefix (Sidebar Active State)](#step-5--add-route-prefix-sidebar-active-state)
  - [Step 6 — Add Lazy Imports](#step-6--add-lazy-imports)
  - [Step 7 — Register the Route](#step-7--register-the-route)
  - [Step 8 — Add Sidebar Navigation](#step-8--add-sidebar-navigation)
    - [8a — Add an Icon Name](#8a--add-an-icon-name)
    - [8b — Map the Icon](#8b--map-the-icon)
    - [8c — Add to Sidebar Navigation Data](#8c--add-to-sidebar-navigation-data)
  - [Step 9 — Add Test IDs](#step-9--add-test-ids)
  - [Step 10 — Add Translations](#step-10--add-translations)
  - [Step 11 — Register Preloading](#step-11--register-preloading)
  - [Step 12 — Verify Everything Works](#step-12--verify-everything-works)
  - [Complete File Map](#complete-file-map)
  - [Adding Sub-Pages (Expandable Sidebar)](#adding-sub-pages-expandable-sidebar)
  - [Adding a Feature Flag](#adding-a-feature-flag)
  - [Common Mistakes](#common-mistakes)

---

## Prerequisites

Before starting, make sure you can run the project:

```bash
npm install
cp .env.example .env          # Fill in VITE_SYNCFUSION_LICENSE_KEY
npm run api:generate          # Generate API hooks (required)
npm run local                 # Verify the app runs on http://localhost:4444
```

Familiarize yourself with:

- The project uses **React Router v6** for routing
- **Lazy loading** via React `lazy()` for code-splitting
- **i18next** for all user-facing text (no hardcoded strings)
- **Zustand** for client state, **TanStack Query** for server state
- **Tailwind CSS** + CSS variables for styling (see [CSS Architecture](CSS_ARCHITECTURE.md))

---

## Overview — What Files You'll Touch

| #   | What                   | File                                               |
| --- | ---------------------- | -------------------------------------------------- |
| 1   | Feature page component | `src/features/reports/pages/ReportsPage/index.tsx` |
| 2   | Route segments         | `src/app/routes/routeSegment.ts`                   |
| 3   | Absolute paths         | `src/app/routes/routePath.ts`                      |
| 4   | Route prefix           | `src/app/routes/routePrefix.ts`                    |
| 5   | Lazy imports           | `src/app/routes/lazyPages.ts`                      |
| 6   | Route registration     | `src/app/router.tsx` (or a new route file)         |
| 7   | Sidebar icon name      | `src/components/layout/Sidebar/utils/iconName.ts`  |
| 8   | Sidebar icon map       | `src/components/layout/Sidebar/utils/iconMap.ts`   |
| 9   | Sidebar nav data       | `src/components/layout/Sidebar/sidebarNavData.ts`  |
| 10  | Test IDs               | `src/shared/testIds.ts`                            |
| 11  | Translations           | `src/localization/locales/en.json`                 |
| 12  | Preload registration   | `src/config/preloadOrchestrator.ts`                |

---

## Step 1 — Create the Feature Directory

Create a new feature directory following the project structure convention:

```
src/features/reports/
└── pages/
    └── ReportsPage/
        ├── index.tsx          # Main page component (default export)
        ├── types.ts           # Page-specific types (if needed)
        └── sections/          # Split large pages into sections
            └── ReportsSummarySection.tsx
```

**Rules:**

- Feature directories live under `src/features/`
- Pages live under `pages/` with PascalCase directory names
- Each page directory has an `index.tsx` with a **default export**
- Keep pages under 200 lines — use `sections/` for larger pages
- If the directory grows past 3 source files, organize into `hooks/`, `utils/`, `components/` subdirectories

---

## Step 2 — Create the Page Component

**File:** `src/features/reports/pages/ReportsPage/index.tsx`

```tsx
import { useTranslation } from 'react-i18next';

import { TestIds } from '@/shared/testIds';

const ReportsPage = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div data-testid={TestIds.REPORTS_PAGE} className="p-6">
      <h1 className="text-2xl font-semibold text-[rgb(var(--color-text-primary))]">
        {t('reports.title')}
      </h1>
      <p className="mt-2 text-[rgb(var(--color-text-secondary))]">{t('reports.description')}</p>
    </div>
  );
};

export default ReportsPage;
```

**Important conventions:**

- Always use `data-testid` from shared test IDs (never hardcode strings)
- All user-facing text must go through `t()` for i18n
- Use CSS variable classes for colors: `text-[rgb(var(--color-text-primary))]`
- No hardcoded color literals — always use theme tokens or Tailwind classes
- Page component uses **default export** (required for `lazy()`)

---

## Step 3 — Add Route Segments

**File:** `src/app/routes/routeSegment.ts`

Route segments are the **relative path fragments** used in nested route definitions. Add your new segment alphabetically:

```ts
export const enum RouteSegment {
  // ... existing segments ...

  // Reports
  Reports = 'reports',

  // ... rest of segments ...
}
```

If your feature has sub-pages:

```ts
  Reports = 'reports',
  ReportsSummary = 'reports/summary',
  ReportsDetailed = 'reports/detailed',
```

---

## Step 4 — Add Absolute Paths

**File:** `src/app/routes/routePath.ts`

Absolute paths are used for programmatic navigation (`navigate()`, `NavLink`, etc.):

```ts
export const enum RoutePath {
  // ... existing paths ...

  // Reports
  Reports = '/reports',

  // ... rest of paths ...
}
```

If you have sub-pages:

```ts
  Reports = '/reports',
  ReportsSummary = '/reports/summary',
  ReportsDetailed = '/reports/detailed',
```

---

## Step 5 — Add Route Prefix (Sidebar Active State)

**File:** `src/app/routes/routePrefix.ts`

The route prefix determines which sidebar item stays highlighted when navigating to sub-routes:

```ts
export const enum RoutePrefix {
  // ... existing prefixes ...

  Reports = '/reports',
}
```

This means that `/reports`, `/reports/summary`, and `/reports/detailed` will all highlight the "Reports" sidebar item.

---

## Step 6 — Add Lazy Imports

**File:** `src/app/routes/lazyPages.ts`

Add a lazy-loaded export for your page. This enables code-splitting — the page's JavaScript only downloads when the user navigates to it:

```ts
// Reports
export const ReportsPage = lazy(async () => import('@/features/reports/pages/ReportsPage'));
```

If you have sub-pages:

```ts
export const ReportsPage = lazy(async () => import('@/features/reports/pages/ReportsPage'));
export const ReportsSummaryPage = lazy(
  async () => import('@/features/reports/pages/ReportsSummaryPage')
);
export const ReportsDetailedPage = lazy(
  async () => import('@/features/reports/pages/ReportsDetailedPage')
);
```

---

## Step 7 — Register the Route

**File:** `src/app/router.tsx`

For a **top-level feature** (not a component showcase), add the route directly in the router's dashboard children.

**Option A: Simple page (no sub-routes)**

Create a new route file `src/app/routes/reportsRoutes.ts`:

```tsx
import type { RouteObject } from 'react-router-dom';

import { RouteSegment } from './routeSegment';
import { LazyPage } from './LazyPage';
import * as LazyPages from './lazyPages';

export const reportsRoutes: RouteObject[] = [
  {
    path: RouteSegment.Reports,
    element: <LazyPage component={LazyPages.ReportsPage} />,
  },
];
```

Then import and spread it in `router.tsx`:

```tsx
import { reportsRoutes } from './routes/reportsRoutes';

// Inside children array:
children: [
  ...dashboardRoutes,
  ...reportsRoutes,          // ← Add here
  ...getProductsRoutes(ENV.enableProducts),
  // ...
],
```

**Option B: Feature with sub-pages and redirect**

```tsx
import { Navigate } from 'react-router-dom';

export const reportsRoutes: RouteObject[] = [
  // Base path redirects to summary
  { path: RouteSegment.Reports, element: <Navigate replace to="summary" /> },
  {
    path: RouteSegment.ReportsSummary,
    element: <LazyPage component={LazyPages.ReportsSummaryPage} />,
  },
  {
    path: RouteSegment.ReportsDetailed,
    element: <LazyPage component={LazyPages.ReportsDetailedPage} />,
  },
];
```

---

## Step 8 — Add Sidebar Navigation

This involves three files:

### 8a — Add an Icon Name

**File:** `src/components/layout/Sidebar/utils/iconName.ts`

If your feature needs a new icon not already in the enum, add it:

```ts
export const enum IconName {
  // ... existing icons ...
  FileText = 'fileText', // ← New icon for Reports
}
```

### 8b — Map the Icon

**File:** `src/components/layout/Sidebar/utils/iconMap.ts`

Import the icon component and add the mapping:

```ts
import {
  // ... existing imports ...
  IconFileText,
} from '@/components/icons';

const ICON_MAP: Record<IconName, IconComponent> = {
  // ... existing mappings ...
  [IconName.FileText]: IconFileText,
};
```

> **Tip:** Browse `src/components/icons/AppIcons.tsx` to see available icons. If none fit, check the Feather icons in `src/components/icons/FeatherIcons*.tsx` or add a new one to `AppIcons.tsx`.

### 8c — Add to Sidebar Navigation Data

**File:** `src/components/layout/Sidebar/sidebarNavData.ts`

**For a simple page (no children):**

Add a `SidebarNavItem` entry to the `RAW_MAIN_NAV_ITEMS` array:

```ts
const RAW_MAIN_NAV_ITEMS: SidebarNavEntry[] = [
  // ... existing items ...
  {
    id: 'reports',
    labelKey: 'sidebar.nav.reports',
    testId: TestIds.NAV_REPORTS,
    path: RoutePath.Reports,
    iconName: IconName.FileText,
  },
];
```

**For an expandable page (with children):**

First, define children in `src/components/layout/Sidebar/utils/sidebarNavChildren.ts`:

```ts
export const REPORTS_CHILDREN: SubNavItem[] = [
  {
    path: RoutePath.ReportsSummary,
    labelKey: 'sidebar.nav.reportsSummary',
    testId: TestIds.NAV_REPORTS_SUMMARY,
  },
  {
    path: RoutePath.ReportsDetailed,
    labelKey: 'sidebar.nav.reportsDetailed',
    testId: TestIds.NAV_REPORTS_DETAILED,
  },
];
```

Then use it in `sidebarNavData.ts`:

```ts
import { REPORTS_CHILDREN } from './utils/sidebarNavChildren';

// In RAW_MAIN_NAV_ITEMS:
{
  id: 'reports',
  labelKey: 'sidebar.nav.reports',
  testId: TestIds.NAV_REPORTS,
  expandTestId: TestIds.NAV_REPORTS_EXPAND,
  pathPrefix: RoutePrefix.Reports,
  iconName: IconName.FileText,
  children: REPORTS_CHILDREN,
},
```

---

## Step 9 — Add Test IDs

**File:** `src/shared/testIds.ts`

Add test IDs for the page and navigation elements:

```ts
// Reports
NAV_REPORTS: 'nav-reports',
NAV_REPORTS_EXPAND: 'nav-reports-expand',           // Only if expandable
NAV_REPORTS_SUMMARY: 'nav-reports-summary',          // Only if has children
NAV_REPORTS_DETAILED: 'nav-reports-detailed',        // Only if has children
REPORTS_PAGE: 'reports-page',
REPORTS_SUMMARY_PAGE: 'reports-summary-page',        // Only if has sub-pages
REPORTS_DETAILED_PAGE: 'reports-detailed-page',      // Only if has sub-pages
```

**Convention:** `NAV_*` for sidebar navigation items, page names for page-level IDs.

---

## Step 10 — Add Translations

**File:** `src/localization/locales/en.json`

Add entries in two places:

**Sidebar label** (under `"sidebar"` → `"nav"`):

```json
{
  "sidebar": {
    "nav": {
      "reports": "Reports",
      "reportsSummary": "Summary",
      "reportsDetailed": "Detailed View"
    }
  }
}
```

**Page content** (add a new top-level section):

```json
{
  "reports": {
    "title": "Reports",
    "description": "View and manage your reports."
  }
}
```

> **Important:** The `labelKey` in your sidebar config must match the JSON path exactly. `'sidebar.nav.reports'` maps to `sidebar.nav.reports` in the JSON.

---

## Step 11 — Register Preloading

**File:** `src/config/preloadOrchestrator.ts`

Add your page to the appropriate preload phase so it loads in the background after login:

- **Phase 2a** (`preloadCoreRoutes`) — for important top-level pages users visit frequently
- **Phase 2b-2e** — for less critical pages

```ts
// In Phase 2a (preloadCoreRoutes):
const preloadCoreRoutes = async (): Promise<unknown[]> =>
  Promise.all([
    // ... existing imports ...
    import('@/features/reports/pages/ReportsPage').catch(() => undefined),
  ]);
```

---

## Step 12 — Verify Everything Works

Run through this checklist:

```bash
# 1. Start the dev server
npm run local

# 2. Check for TypeScript errors
npm run typecheck

# 3. Check for lint errors
npm run lint

# 4. Run unit tests
npm run test
```

Then manually verify:

- [ ] Navigate to `http://localhost:4444/reports` — page renders
- [ ] Sidebar shows "Reports" item with correct icon
- [ ] Sidebar item is highlighted when on the Reports page
- [ ] If expandable, clicking expands to show children
- [ ] Child routes work and highlight correctly
- [ ] Direct URL navigation works (paste URL in browser)
- [ ] Unknown sub-routes redirect to dashboard (catch-all)
- [ ] Browser back/forward works correctly

---

## Complete File Map

```
src/
├── app/
│   ├── router.tsx                          ← Step 7 (import routes)
│   └── routes/
│       ├── routeSegment.ts                 ← Step 3
│       ├── routePath.ts                    ← Step 4
│       ├── routePrefix.ts                  ← Step 5
│       ├── lazyPages.ts                    ← Step 6
│       └── reportsRoutes.ts               ← Step 7 (new file)
├── features/
│   └── reports/
│       └── pages/
│           └── ReportsPage/
│               └── index.tsx               ← Steps 1-2
├── components/
│   └── layout/
│       └── Sidebar/
│           ├── sidebarNavData.ts            ← Step 8c
│           └── utils/
│               ├── iconName.ts              ← Step 8a
│               ├── iconMap.ts               ← Step 8b
│               └── sidebarNavChildren.ts    ← Step 8c (if expandable)
├── shared/
│   └── testIds.ts                          ← Step 9
├── localization/
│   └── locales/
│       └── en.json                         ← Step 10
└── config/
    └── preloadOrchestrator.ts              ← Step 11
```

---

## Adding Sub-Pages (Expandable Sidebar)

If your feature grows to need sub-pages, upgrade from a simple nav item to an expandable one:

1. Add sub-page route segments in `routeSegment.ts`
2. Add sub-page absolute paths in `routePath.ts`
3. Create sub-page directories under `src/features/reports/pages/`
4. Add lazy imports in `lazyPages.ts`
5. Add redirect route from base path + sub-page routes in your routes file
6. Convert your sidebar entry from `SidebarNavItem` to `SidebarExpandableItem` with children
7. Add child test IDs and translations

---

## Adding a Feature Flag

If your feature should be toggleable (excluded from production builds when disabled):

1. Add `VITE_ENABLE_REPORTS=true` to `.env` and `.env.example`
2. Add the type to `src/vite-env.d.ts`:
   ```ts
   readonly VITE_ENABLE_REPORTS: string;
   ```
3. Add `enableReports` to `ENV` in `src/config/env.ts`:
   ```ts
   enableReports: import.meta.env.VITE_ENABLE_REPORTS !== 'false',
   ```
4. Gate lazy imports in `lazyPages.ts` using `import.meta.env` directly (NOT `ENV`):
   ```ts
   export const ReportsPage =
     import.meta.env.VITE_ENABLE_REPORTS !== 'false'
       ? lazy(async () => import('@/features/reports/pages/ReportsPage'))
       : lazy(async () => import('@/features/dashboard/pages/DashboardPage'));
   ```
5. Gate routes in your route file:
   ```ts
   export const getReportsRoutes = (enabled: boolean): RouteObject[] =>
     enabled ? [{ path: RouteSegment.Reports, element: <LazyPage component={LazyPages.ReportsPage} /> }] : [];
   ```
6. Gate the sidebar entry in `sidebarNavData.ts`:
   ```ts
   const SECTION_GATES: Record<string, boolean> = {
     reports: ENV.enableReports,
   };
   ```
7. Gate preloads in `preloadOrchestrator.ts`:
   ```ts
   if (ENV.enableReports) {
     await import('@/features/reports/pages/ReportsPage').catch(() => undefined);
   }
   ```

---

## Common Mistakes

| Mistake                                     | Consequence                                   | Fix                                              |
| ------------------------------------------- | --------------------------------------------- | ------------------------------------------------ |
| Forgetting the redirect route for base path | Visiting `/reports` shows blank               | Add `<Navigate replace to="summary" />`          |
| Using `ENV` inside `lazyPages.ts`           | ESLint error, breaks build-time tree-shaking  | Use `import.meta.env` directly in `lazyPages.ts` |
| Hardcoding text instead of `t()`            | Breaks i18n, fails lint                       | Always use `t('key')` from `useTranslation()`    |
| Hardcoding colors                           | Theme changes don't apply                     | Use `rgb(var(--color-*))` or Tailwind classes    |
| Missing `data-testid`                       | E2E tests can't find elements                 | Use `TestIds.*` from shared test IDs             |
| Wrong `labelKey` path                       | Sidebar shows translation key instead of text | Ensure JSON path matches: `sidebar.nav.reports`  |
| Missing route prefix                        | Sidebar doesn't highlight on sub-routes       | Add prefix in `routePrefix.ts`                   |
| Forgetting preload registration             | Page loads slower on first visit              | Add to `preloadOrchestrator.ts` Phase 2          |
| Using named export in page                  | `lazy()` can't find the component             | Use `export default` in page `index.tsx`         |
| Skipping `npm run typecheck`                | Type errors slip through (Vite skips them)    | Always run before committing                     |
