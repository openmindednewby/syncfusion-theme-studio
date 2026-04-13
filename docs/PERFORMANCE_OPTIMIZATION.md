# Performance Optimization

> Back to [README](../README.md)

This project underwent extensive optimization to achieve a **98/100 Lighthouse score**.

---

## Before & After

| Metric                   | Before  | After   | Improvement     |
| ------------------------ | ------- | ------- | --------------- |
| Lighthouse Score         | 54/100  | 98/100  | +44 points      |
| First Contentful Paint   | 32.2s   | 1.8s    | **18x faster**  |
| Largest Contentful Paint | 62.4s   | 2.0s    | **31x faster**  |
| Initial JS Bundle        | ~2.5 MB | ~116 KB | **95% smaller** |
| Total Blocking Time      | 120ms   | 0ms     | **Perfect**     |

---

## Root Causes Identified

1. **Syncfusion Grid Loading on Login Page** — 2.1MB grid component loaded everywhere
2. **Static Imports of Heavy Dependencies** — `registerLicense` pulled entire Syncfusion tree
3. **Barrel Export Tree-Shaking Issues** — mixed native/Syncfusion barrels prevented dead-code elimination
4. **Eager CSS Loading** — all Syncfusion CSS loaded upfront
5. **MainLayout Not Lazy-Loaded** — dashboard layout loaded on every page

---

## Solutions

### Solution 1: Dynamic Imports for Syncfusion License

```typescript
// Before: static import pulled ~2MB
import { registerLicense } from '@syncfusion/ej2-base';

// After: dynamic import defers loading
async function registerLicenseAsync(key: string): Promise<void> {
  const { registerLicense } = await import('@syncfusion/ej2-base');
  registerLicense(key);
}
```

**Impact:** Removed ~2MB from initial bundle.

### Solution 2: Split UI Component Barrels

```
src/components/ui/
├── index.ts        → Re-exports types only
├── native.ts       → ButtonNative, InputNative (zero Syncfusion deps)
└── syncfusion.ts   → DataGrid, Button, Input, Select, etc.
```

Login page imports from `native.ts` only — zero Syncfusion JavaScript.

### Solution 3: Native HTML Components for Login

Created lightweight native HTML components (`ButtonNative`, `InputNative`) — ~2KB vs ~200KB.

### Solution 4: Lazy-Load MainLayout

```typescript
const MainLayout = lazy(async () => ({
  default: (await import('@/components/layout/MainLayout')).MainLayout,
}));
```

Dashboard layout code only loads when navigating to `/dashboard`.

### Solution 5: CSS Code Splitting

```
src/styles/
├── login.css       → Base styles + critical components only (~6KB gzipped)
├── app.css         → Syncfusion styles + full components (~140KB gzipped)
```

Initial CSS reduced from ~150KB to ~6KB.

### Solution 6: Remove Syncfusion Grid from Modulepreload

Post-build script strips heavy chunks from modulepreload hints. Also configured in `vite.config.ts` via `build.modulePreload.resolveDependencies`.

### Solution 7: Background Preloading After Login

```typescript
export const preloadSyncfusionModules = (): void => {
  const preload = (): void => {
    import('@syncfusion/ej2-react-grids').catch(() => undefined);
    import('@syncfusion/ej2-react-calendars').catch(() => undefined);
    import('@syncfusion/ej2-react-dropdowns').catch(() => undefined);
  };

  if ('requestIdleCallback' in window) window.requestIdleCallback(preload, { timeout: 2000 });
  else setTimeout(preload, 100);
};
```

Dashboard loads instantly because modules are already cached.

### Solution 8: Optimize Vite Dev Server

Pre-bundle all heavy dependencies via `optimizeDeps.include` and warm up critical files via `server.warmup.clientFiles`.

---

## Bundle Analysis

**Final Production Bundle (Login Page):**

| File                | Size (gzipped) | Purpose           |
| ------------------- | -------------- | ----------------- |
| `index-*.js`        | 27.7 KB        | Main app entry    |
| `react-vendor-*.js` | 66.1 KB        | React + React DOM |
| `query-vendor-*.js` | 13.5 KB        | TanStack Query    |
| `index-*.css`       | 6.4 KB         | Login CSS         |
| **Total**           | **~116 KB**    | Initial load      |

**Deferred Chunks (loaded after login):**

| File                     | Size (gzipped) | When Loaded    |
| ------------------------ | -------------- | -------------- |
| `syncfusion-grid-*.js`   | 498 KB         | DataGrid pages |
| `syncfusion-inputs-*.js` | 1.4 KB         | Form pages     |
| `app-*.css`              | 140 KB         | Dashboard      |

---

## Performance Testing

Always test with the **production build**:

```bash
npm run build
npm run preview
npx lighthouse http://localhost:4173 --view
```

The dev server will always be slower — only use production builds for accurate metrics.

---

## Module Preloading Strategy

| Module                                    | When to Preload        | Location            | Why                              |
| ----------------------------------------- | ---------------------- | ------------------- | -------------------------------- |
| **Syncfusion Components**                 | On login submit        | LoginPage           | Dashboard needs them immediately |
| **Form Libraries** (react-hook-form, zod) | After login page loads | LoginPage useEffect | Forms used throughout dashboard  |
| **App CSS**                               | On dashboard mount     | MainLayout          | Full styling for dashboard       |
| **Syncfusion Grid**                       | On dashboard idle      | MainLayout          | Heavy, load when browser is idle |

### Preloading Best Practices

1. **Use `requestIdleCallback`** — Only preload when browser is idle
2. **Set timeout** — Ensure preload happens even if browser never idles
3. **Catch errors** — Silent failure for preloads (non-critical)
4. **Don't block** — Preloading should never delay user interactions
5. **Order matters** — Preload modules in order of likely use
