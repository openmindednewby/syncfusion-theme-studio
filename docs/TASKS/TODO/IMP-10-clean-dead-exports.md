# IMP-10: Clean Up Dead Exports and Unused Code

## Status: TODO
## Priority: Low
## Depends on: IMP-02 (ErrorBoundary gets deployed before deciding its fate here)
## Agent: frontend-dev

## Problem

Multiple exported symbols have zero consumers in the codebase.

### Unused components/hooks
- `useSyncfusionTheme` hook + `getButtonClasses` — only imported in their own test file, no production use
- `ComponentSize` enum (re-exported from `syncfusion/utils/componentSize.ts`) — unused in production

### Unused utility functions
- `isSyncfusionCssLoaded()` — exported from `loadSyncfusionCss.ts`, re-exported from `utils/index.ts`, zero consumers
- `preloadSyncfusionCss()` — same file, same situation, zero consumers
- `isNullOrUndefined()` — exported from `utils/is.ts`, only used in its own test file

### Unused type exports
- `StatusColor` type — exported from `stores/theme/index.ts`, never imported (vs `StatusColors` plural which IS used)

### Unnecessary indirection
- `routePaths.ts` — single-line re-export from `./routes/index`; all consumers import from `@/app/routePaths` instead of directly

### Stale debug code
- `useSyncfusionFilters.ts:40` — bare `console.warn()` instead of project's `logger` utility

### Inconsistent patterns
- `.catch(() => undefined)` vs `.catch(() => {})` for `loadSyncfusionCss` — split ~7/22 across 29 files; standardize to one form
- `LoadingSpinner` imported via deep path in 7 files despite barrel export existing
- `Mode` enum imported from 3 different paths (`@/stores/mode`, `@/stores/theme/types`, relative); standardize to `@/stores/mode`

## Solution

1. Remove `isSyncfusionCssLoaded`, `preloadSyncfusionCss` exports (keep internal if potentially useful, just unexport)
2. Remove `isNullOrUndefined` from `is.ts` and its test
3. Remove `StatusColor` type export
4. Remove `ComponentSize`, `useSyncfusionTheme`, `getButtonClasses` exports and their test file (YAGNI)
5. Inline `routePaths.ts` re-export or update consumers to import from `@/app/routes` directly
6. Replace `console.warn` with `logger.warn` in `useSyncfusionFilters.ts`
7. Standardize `.catch(() => undefined)` across all `loadSyncfusionCss` call sites
8. Update 7 `LoadingSpinner` deep-path imports to use `@/components/common` barrel
9. Fix `Mode` enum imports in `LightThemeSection` and `DarkThemeSection` to use `@/stores/mode`

## Benefits

- Smaller public API surface — developers aren't confused by exports that nothing uses
- YAGNI compliance — dead code adds maintenance burden without value
- Cleaner barrel files — fewer things to scan when looking for imports
- `console.warn` replacement prevents debug logs leaking to production
- Consistent patterns reduce cognitive load for contributors

## Linter Enforcement

- Run `knip` or `ts-prune` in CI to detect unused exports and prevent accumulation
- Add `no-console` ESLint rule with `allow: []` (no exceptions) — force use of `logger` utility
- Consider `eslint-plugin-unused-imports` with `no-unused-exports` rule
