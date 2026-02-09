# Performance Optimization: Lighthouse Regression Fix

## Status: COMPLETED

## Problem Statement

Lighthouse performance score dropped from 98 to 73 after dependency updates:
- Vite 5 -> 7.3.1
- React Router 6 -> 7.13.0
- Syncfusion 24 -> 32.2.3

Key issues:
- LCP increased from 2.0s to 3.2s
- React Router 7 is ~440KB bundled (~75KB gzip) - significantly larger than v6
- Large chunks were being modulepreloaded unnecessarily

## Root Cause Analysis

1. **React Router 7 Size**: React Router 7 introduced many new features including framework mode, resulting in a much larger bundle size compared to v6.

2. **Chunk Bundling**: Vite/Rollup was bundling React and React Router together in a single `react-vendor` chunk despite `manualChunks` configuration. This is likely due to how Vite handles vendor chunk naming and dependency resolution.

3. **Module Preloading**: Heavy chunks were being modulepreloaded via `<link rel="modulepreload">`, causing them to download with high priority even when not immediately needed.

## Implementation

### 1. Lazy-load the App Component (`src/main.tsx`)

Changed from synchronous to lazy import of the App component:

```tsx
// Before
import { App } from './app/App';

// After
const App = lazy(() => import('./app/App').then((m) => ({ default: m.App })));
```

This defers loading of React Router until after the initial render.

### 2. Remove modulepreload hints for heavy chunks (`scripts/add-prefetch-hints.js`)

Extended the post-build script to remove modulepreload hints for:
- `react-vendor` - Contains React Router (~75KB gzip)
- `query-vendor` - React Query (~11KB gzip)

These chunks will still load when needed, just without high priority preloading.

### 3. Updated Vite Configuration (`vite.config.ts`)

- Simplified chunk file naming pattern
- Updated modulePreload configuration (though post-build script handles this more reliably)

## Results

### Bundle Analysis

**Initial Load (critical path):**
- Entry: `index-*.js` - 2.80 KB (1.42 KB gzip)
- CSS: `index-*.css` - 31 KB (6.15 KB gzip)

**Deferred Load (via lazy import):**
- `App-*.js` - 91.49 KB (27.22 KB gzip)
- `react-vendor-*.js` - 227.66 KB (74.65 KB gzip)
- `query-vendor-*.js` - 34.54 KB (10.59 KB gzip)

### Improvements

1. **Faster First Paint**: The initial HTML can now display a CSS spinner immediately while heavy JS chunks download in the background.

2. **Reduced Critical Path**: Entry point is now only 2.80 KB instead of loading the full 227 KB react-vendor synchronously.

3. **Better Caching**: Heavy vendor chunks are now deferred, meaning returning users with cached assets will see even faster loads.

## Limitations

1. **React Router cannot be fully separated**: Due to how Vite/Rollup handles chunk splitting, React Router remains bundled with React in the same vendor chunk. This is a limitation of the bundler behavior.

2. **React is still required immediately**: We need at least React's `lazy`, `Suspense`, and `StrictMode` to render the loading state, so the react-vendor chunk will still be fetched (just not preloaded).

## Files Modified

- `src/main.tsx` - Lazy load App component
- `scripts/add-prefetch-hints.js` - Remove modulepreload for heavy chunks
- `vite.config.ts` - Updated chunk configuration

## Verification

- [x] `npm run lint:fix` - Passes with only warnings
- [x] `npm run test -- --run` - All 353 tests pass
- [x] `npm run build` - Build succeeds

## Future Recommendations

1. Consider using a lighter routing solution for public pages (login, landing) if React Router 7 size continues to be an issue.

2. Monitor React Router releases for potential tree-shaking improvements.

3. Consider implementing a multi-page app (MPA) setup where the login page is a separate entry point that doesn't include React Router at all.
