# Adding a New Feature (Component Showcase)

Step-by-step guide for adding a new component showcase to the SyncfusionThemeStudio. Uses "Slider" as an example throughout.

---

## Checklist Overview

| # | What | File(s) | Directory |
|---|------|---------|-----------|
| 1 | Route segments | `routeSegment.ts` | `src/app/routes/` |
| 2 | Absolute paths | `routePath.ts` | `src/app/routes/` |
| 3 | Route prefix (sidebar active state) | `routePrefix.ts` | `src/app/routes/` |
| 4 | Showcase page(s) | `index.tsx` | `src/features/components/pages/` |
| 5 | Lazy imports | `lazyPages.ts` | `src/app/routes/` |
| 6 | Route registration | `componentShowcaseRoutes.tsx` | `src/app/routes/` |
| 7 | Sidebar navigation entry | `sidebarComponentGroups.ts` | `src/components/layout/Sidebar/` |
| 8 | Test IDs (page + nav) | `testIds.components.ts` | `src/shared/` |
| 9 | Translation keys (menu label) | `en.json` | `src/localization/locales/` |
| 10 | Preload registration | `preloadOrchestrator.ts` | `src/config/` |

---

## Step 1 — Route Segments

**File:** `src/app/routes/routeSegment.ts`

Add relative path segments for the component, its Native variant, and (optionally) its Syncfusion variant.

```ts
// Slider
ComponentsSlider = 'components/slider',
ComponentsSliderNative = 'components/slider/native',
ComponentsSliderSyncfusion = 'components/slider/syncfusion',
```

---

## Step 2 — Absolute Paths

**File:** `src/app/routes/routePath.ts`

Add full absolute paths (prefixed with `/dashboard/`).

```ts
// Slider
ComponentsSlider = '/dashboard/components/slider',
ComponentsSliderNative = '/dashboard/components/slider/native',
ComponentsSliderSyncfusion = '/dashboard/components/slider/syncfusion',
```

---

## Step 3 — Route Prefix

**File:** `src/app/routes/routePrefix.ts`

Add a prefix entry so the sidebar highlights the correct item when any sub-route is active.

```ts
ComponentsSlider = '/dashboard/components/slider',
```

---

## Step 4 — Create the Showcase Page(s)

**Directory:** `src/features/components/pages/`

Create one directory per variant:

```
src/features/components/pages/
├── NativeSliderShowcase/
│   ├── index.tsx          # Main page component (default export)
│   └── sections/          # Optional sub-sections
│       ├── BasicSection.tsx
│       └── InteractiveSection.tsx
└── SyncfusionSliderShowcase/
    └── index.tsx
```

Page rules:
- Default export from `index.tsx`
- Use `data-testid` from shared test IDs
- All user-facing text via `t()` or `FM()`
- No hardcoded color literals (use theme tokens / Tailwind classes)
- Keep the page under 200 lines; split into `sections/` if needed

Minimal example:

```tsx
import { useTranslation } from 'react-i18next';

import { ComponentTestIds } from '@/shared/testIds.components';

const NativeSliderShowcase = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div data-testid={ComponentTestIds.NATIVE_SLIDER_SHOWCASE}>
      <h1>{t('components.sliderShowcase.title')}</h1>
      {/* sections here */}
    </div>
  );
};

export default NativeSliderShowcase;
```

---

## Step 5 — Lazy Imports

**File:** `src/app/routes/lazyPages.ts`

Add lazy-loaded exports for each page.

```ts
// Slider showcase
export const NativeSliderShowcase = lazy(
  async () => import('@/features/components/pages/NativeSliderShowcase'),
);
export const SyncfusionSliderShowcase = lazy(
  async () => import('@/features/components/pages/SyncfusionSliderShowcase'),
);
```

---

## Step 6 — Route Registration

**File:** `src/app/routes/componentShowcaseRoutes.tsx`

Import the lazy pages and add three route objects (redirect + two variants).

```tsx
import {
  NativeSliderShowcase,
  SyncfusionSliderShowcase,
} from './lazyPages';

// Inside componentShowcaseRoutes array:

// Slider
{ path: RouteSegment.ComponentsSlider, element: <Navigate replace to={RouteRedirectTarget.Native} /> },
{ path: RouteSegment.ComponentsSliderNative, element: <LazyShowcase component={NativeSliderShowcase} /> },
{ path: RouteSegment.ComponentsSliderSyncfusion, element: <LazyShowcase component={SyncfusionSliderShowcase} /> },
```

> The parent redirect (`/slider` -> `/slider/native`) ensures that visiting the base path auto-redirects to the Native variant.

---

## Step 7 — Sidebar Navigation

**File:** `src/components/layout/Sidebar/sidebarComponentGroups.ts`

Add an entry to the `COMPONENTS_CHILDREN` array. Items are sorted alphabetically.

```ts
{
  labelKey: 'menu.slider', testId: ComponentTestIds.NAV_SLIDER_GROUP,
  expandTestId: ComponentTestIds.NAV_SLIDER_GROUP_EXPAND, items: [
    { path: RoutePath.ComponentsSliderNative, labelKey: 'menu.native', testId: ComponentTestIds.NAV_SLIDER_NATIVE },
    { path: RoutePath.ComponentsSliderSyncfusion, labelKey: 'menu.syncfusion', testId: ComponentTestIds.NAV_SLIDER_SYNCFUSION },
  ],
},
```

> For components with only a Native variant (no Syncfusion), use the flat format instead:
> ```ts
> { path: RoutePath.ComponentsSliderNative, labelKey: 'menu.slider', testId: ComponentTestIds.NAV_SLIDER_GROUP },
> ```

---

## Step 8 — Test IDs

**File:** `src/shared/testIds.components.ts`

Add page-level and navigation test IDs.

```ts
// Slider
NATIVE_SLIDER_SHOWCASE: 'native-slider-showcase',
SYNCFUSION_SLIDER_SHOWCASE: 'syncfusion-slider-showcase',
NAV_SLIDER_NATIVE: 'nav-slider-native',
NAV_SLIDER_SYNCFUSION: 'nav-slider-syncfusion',
NAV_SLIDER_GROUP: 'nav-slider-group',
NAV_SLIDER_GROUP_EXPAND: 'nav-slider-group-expand',
```

> These are automatically spread into the main `TestIds` object via `...ComponentTestIds` in `src/shared/testIds.ts`.

---

## Step 9 — Translations

**File:** `src/localization/locales/en.json`

Add the menu label under the `"menu"` section:

```json
"slider": "Slider"
```

Add showcase-specific translations under `"components"`:

```json
"sliderShowcase": {
  "title": "Slider Showcase",
  "nativeTitle": "Native Slider",
  "syncfusionTitle": "Syncfusion Slider"
}
```

---

## Step 10 — Preload Registration

**File:** `src/config/preloadOrchestrator.ts`

Add the new pages to the appropriate preload phase.

- **Phase 2b** (`preloadShowcasePages`) — for component showcase pages:

```ts
import('@/features/components/pages/NativeSliderShowcase').catch(() => undefined),
import('@/features/components/pages/SyncfusionSliderShowcase').catch(() => undefined),
```

- If the component uses a heavy Syncfusion module not already preloaded, add it to **Phase 3** (`preloadSyncfusionModules`):

```ts
import('@syncfusion/ej2-react-inputs').catch(() => undefined),
```

---

## Quick Reference: File Locations

```
src/
├── app/
│   ├── routes/
│   │   ├── routeSegment.ts              ← Step 1
│   │   ├── routePath.ts                 ← Step 2
│   │   ├── routePrefix.ts              ← Step 3
│   │   ├── lazyPages.ts                ← Step 5
│   │   └── componentShowcaseRoutes.tsx  ← Step 6
│   └── router.tsx                       (no change needed for showcase components)
├── features/
│   └── components/
│       └── pages/
│           ├── NativeSliderShowcase/    ← Step 4
│           └── SyncfusionSliderShowcase/← Step 4
├── components/
│   └── layout/
│       └── Sidebar/
│           └── sidebarComponentGroups.ts← Step 7
├── shared/
│   └── testIds.components.ts            ← Step 8
├── localization/
│   └── locales/
│       └── en.json                      ← Step 9
└── config/
    └── preloadOrchestrator.ts           ← Step 10
```

---

## Adding a Non-Component Feature (e.g. a new top-level page)

For features that are **not** component showcases (e.g. a new "Reports" page), the steps differ slightly:

1. **Feature directory:** Create `src/features/reports/pages/ReportsPage/index.tsx`
2. **Route segment:** Add `Reports = 'reports'` to `routeSegment.ts`
3. **Route path:** Add `Reports = '/dashboard/reports'` to `routePath.ts`
4. **Route prefix:** Add `Reports = '/dashboard/reports'` to `routePrefix.ts`
5. **Lazy import:** Add to `lazyPages.ts`
6. **Register route:** Add directly in `router.tsx` under the dashboard `children` array (not in `componentShowcaseRoutes.tsx`)
7. **Sidebar:** Add a top-level entry in `sidebarNavData.ts` (not `sidebarComponentGroups.ts`)
   - Also add an icon name in `iconName.ts` and mapping in `iconMap.ts`
   - If the item is expandable with children, define children in `sidebarNavChildren.ts`
8. **Test IDs:** Add to `testIds.ts` (main file, not components)
9. **Translations:** Add to `en.json` under `"menu"` and `"sidebar.nav"`
10. **Preload:** Add to Phase 2a (`preloadCoreRoutes`) in `preloadOrchestrator.ts`

---

## Common Mistakes

- **Forgetting the redirect route** — Without the `<Navigate replace to="native" />` entry for the base path, visiting `/dashboard/components/slider` will show nothing
- **Wrong preload phase** — Showcase pages go in Phase 2b, core pages in Phase 2a, heavy vendor modules in Phase 3
- **Missing test IDs** — Both page-level (`NATIVE_SLIDER_SHOWCASE`) and navigation-level (`NAV_SLIDER_GROUP`) IDs are needed
- **Translation key mismatch** — The `labelKey` in `sidebarComponentGroups.ts` must match the key path in `en.json` (e.g. `'menu.slider'` maps to `menu.slider` in the JSON)
- **Alphabetical ordering** — Entries in `COMPONENTS_CHILDREN` and `routeSegment.ts` are kept alphabetically sorted
