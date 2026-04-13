# PERF-01: Eliminate Critical Path Waterfall on Login Page

## Status: TODO
## Priority: P1 (Performance)
## Depends on: None
## Agent: frontend-dev
## Related: `login-page-performance-optimization.md` (Phase 1-5 completed)

## Problem

After completing all prior performance optimizations (native components, deferred Syncfusion init, CSS splitting), Lighthouse still reports a **1,810ms maximum critical path latency** caused by a 4-deep sequential module waterfall on the login page.

### Current Waterfall Chain

```
index-[hash].js (71.03 KiB gzip)          ─ 1,420ms
  └─ query-vendor-[hash].js (13.09 KiB)   ─   240ms
       └─ [bridge chunk] (2.95 KiB)       ─    80ms
            └─ [tiny wrapper] (0.17 KiB)   ─    70ms
                                           ─────────
                                Total:      1,810ms
```

Each chunk in the chain can only begin loading after its parent finishes executing, creating sequential round trips that block First Contentful Paint.

### Root Causes

1. **React Query in login critical path**: `QueryClientProvider` wraps the entire app in `App.tsx`, forcing `query-vendor` (13 KiB) into the entry bundle's dependency graph. The login page does not use React Query.

2. **LoginPage is lazy-loaded**: `router.tsx` loads LoginPage via `lazy()` from `lazyPages.ts`, adding an unnecessary async round trip for the initial route. Since login is the first page every user sees, it should be bundled directly.

3. **No modulepreload hints for remaining chunks**: The browser discovers chunks sequentially as each module executes, rather than fetching them in parallel via `<link rel="modulepreload">`.

## Solution

### Task 1: Move QueryClientProvider Inside MainLayout

Move `QueryClientProvider` from `App.tsx` into `MainLayout` so it only loads for authenticated routes. The login page doesn't use any React Query hooks.

**File**: `src/app/App.tsx`

```diff
- import { QueryClientProvider } from '@tanstack/react-query';
- import { queryClient } from './providers/QueryProvider';

  export const App = (): JSX.Element => {
    return (
      <I18nProvider>
        <ToastProvider>
          <ApiEventsProvider>
-           <QueryClientProvider client={queryClient}>
              <ErrorBoundary>
                <RouterProvider router={router} />
              </ErrorBoundary>
-             {/* PWA components, devtools... */}
-           </QueryClientProvider>
+           {/* PWA components stay here (no Query dependency) */}
          </ApiEventsProvider>
        </ToastProvider>
      </I18nProvider>
    );
  };
```

**File**: `src/components/layout/MainLayout/index.tsx`

```diff
+ import { QueryClientProvider } from '@tanstack/react-query';
+ import { queryClient } from '@/app/providers/QueryProvider';

  export const MainLayout = (): JSX.Element => {
    return (
+     <QueryClientProvider client={queryClient}>
        <div className="grid h-screen ...">
          <Sidebar />
          <div className="flex flex-col overflow-hidden">
            <Header />
            <main>
              <Outlet />
            </main>
          </div>
        </div>
+     </QueryClientProvider>
    );
  };
```

**Impact**: Removes `query-vendor` (13 KiB) from login critical path. Saves ~240ms.

**Risks**:
- ReactQueryDevtools also needs `QueryClientProvider` -- move it inside MainLayout or conditionally wrap
- PWA components (`PWAUpdatePrompt`, `PWAInstallPrompt`, `OfflineIndicator`) must not depend on React Query
- `ApiEventsProvider` must not depend on React Query

**Verification**:
- [ ] Login page loads without React Query in network waterfall
- [ ] Dashboard pages still have full React Query functionality
- [ ] ReactQueryDevtools still works on dashboard
- [ ] PWA prompts still work on both login and dashboard

---

### Task 2: Direct-Import LoginPage (Remove Lazy Loading)

Since LoginPage is the initial route every user hits, lazy-loading it adds an unnecessary async hop. Import it directly in `router.tsx`.

**File**: `src/app/router.tsx`

```diff
+ import LoginPage from '@/features/auth/pages/LoginPage';

  // Remove LoginPage from lazyPages.ts imports
- import { LoginPage, DashboardPage, ... } from './routes/lazyPages';
+ import { DashboardPage, ... } from './routes/lazyPages';

  const routes: RouteObject[] = [
-   { path: RoutePath.Root, element: <LazyPage component={LoginPage} /> },
+   { path: RoutePath.Root, element: <LoginPage /> },
    // ...
-   { path: RoutePath.Login, element: <LazyPage component={LoginPage} /> },
+   { path: RoutePath.Login, element: <LoginPage /> },
  ];
```

**File**: `src/app/routes/lazyPages.ts`

```diff
- export const LoginPage = lazy(async () => import('@/features/auth/pages/LoginPage'));
  // Remove LoginPage from lazy declarations
```

**Impact**: Eliminates one async round trip. LoginPage code (~2 KiB) inlined in entry bundle. Saves ~80ms.

**Risks**:
- Entry bundle size increases slightly (LoginPage is small -- native components only)
- ErrorBoundary/Suspense wrapper removed for login route -- LoginPage should not throw during render

**Verification**:
- [ ] Login page renders without intermediate loading spinner
- [ ] Entry bundle size increase is < 5 KiB
- [ ] All login E2E tests pass

---

### Task 3: Add Modulepreload Hints for Critical Chunks

Configure Vite to emit `<link rel="modulepreload">` for chunks that remain in the critical path, allowing the browser to fetch them in parallel with the entry module.

**File**: `vite.config.ts`

Review the current `modulePreload.resolveDependencies` filter. Currently it only filters out `syncfusion-grid`. After Tasks 1 and 2, review what chunks remain in the critical path and ensure they are all preloaded.

```diff
  modulePreload: {
    resolveDependencies: (filename, deps) => {
      if (!filename.includes('index')) return deps;
      return deps.filter((dep) => {
-       const isHeavyChunk = dep.includes('syncfusion-grid');
+       const isHeavyChunk =
+         dep.includes('syncfusion-grid') ||
+         dep.includes('syncfusion-base') ||
+         dep.includes('syncfusion-inputs') ||
+         dep.includes('syncfusion-dropdowns') ||
+         dep.includes('syncfusion-nav') ||
+         dep.includes('syncfusion-popups') ||
+         dep.includes('syncfusion-calendars') ||
+         dep.includes('query-vendor');
        return !isHeavyChunk;
      });
    },
  },
```

**Impact**: Collapses remaining sequential loads into parallel fetches. Saves ~150ms.

**Verification**:
- [ ] `<link rel="modulepreload">` tags in built HTML for critical chunks
- [ ] No Syncfusion or React Query chunks preloaded on login page
- [ ] Lighthouse critical path depth reduced to 1-2 levels

---

## Expected Results

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Critical path latency | 1,810ms | ~1,000ms | -810ms |
| Critical path depth | 4 levels | 1-2 levels | -2-3 levels |
| Entry bundle (login) | 71 KiB gzip | ~58 KiB gzip | -13 KiB |
| `query-vendor` on login | Yes (13 KiB) | No | Eliminated |
| LoginPage async hop | Yes | No | Eliminated |

## Testing Checklist

### Unit Tests
- [ ] Existing tests pass after QueryProvider relocation
- [ ] Login-related tests still work

### E2E Tests
- [ ] Login flow works end-to-end
- [ ] Dashboard navigation works after login
- [ ] React Query data fetching works on dashboard pages
- [ ] PWA prompts still appear correctly

### Lighthouse Audit
```bash
npm run lighthouse -- --url=http://localhost:4445/
# Verify: critical path latency < 1,200ms
# Verify: Performance score >= 95
```

## Files to Modify

| File | Change |
|------|--------|
| `src/app/App.tsx` | Remove QueryClientProvider wrapper, keep PWA/devtools |
| `src/components/layout/MainLayout/index.tsx` | Add QueryClientProvider + ReactQueryDevtools |
| `src/app/router.tsx` | Direct-import LoginPage, remove LazyPage wrapper |
| `src/app/routes/lazyPages.ts` | Remove LoginPage lazy declaration |
| `vite.config.ts` | Update modulePreload filter to exclude more Syncfusion chunks |

## Rollback Plan

1. Move `QueryClientProvider` back to `App.tsx`
2. Restore `LoginPage` lazy import in `lazyPages.ts`
3. Restore `LazyPage` wrapper for login routes in `router.tsx`
4. Revert `modulePreload` filter changes in `vite.config.ts`
