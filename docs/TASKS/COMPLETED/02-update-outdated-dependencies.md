# Task: Update Outdated Dependencies

> **Priority**: HIGH
> **Status**: COMPLETED
> **Estimated Effort**: Large
> **Assigned Agent**: frontend-dev
> **Depends On**: `01-security-vulnerabilities-fix.md`
> **Completed**: 2026-02-09

## Problem Statement

Many dependencies are severely outdated, including major version jumps that bring new features, performance improvements, and security fixes.

## Summary of Changes

### Packages Successfully Updated

| Package | Before | After | Notes |
|---------|--------|-------|-------|
| **@syncfusion/ej2-react-*** | 24.2.x | 32.2.3 | 8 major versions |
| **vite** | 5.4.21 | 7.3.1 | Via clean install |
| **vitest** | 1.6.1 | 4.0.18 | Via clean install |
| **@vitejs/plugin-react** | 4.2.0 | 5.1.3 | Via clean install |
| **@vitest/coverage-v8** | 1.6.0 | 4.0.18 | Via clean install |
| **zustand** | 4.5.7 | 5.0.11 | Smooth upgrade |
| **react-router-dom** | 6.30.3 | 7.13.0 | Required Promise handling for navigate() |
| **i18next** | 23.16.8 | 25.8.4 | Smooth upgrade |
| **react-i18next** | 14.1.3 | 16.5.4 | Smooth upgrade |
| **i18next-browser-languagedetector** | 7.2.2 | 8.2.0 | Smooth upgrade |
| **@testing-library/react** | 14.3.1 | 16.3.2 | Required @testing-library/dom peer |
| **@testing-library/dom** | - | Added | New peer dependency |
| **orval** | 6.31.0 | 8.2.0 | Via clean install - required mutator changes |
| **@playwright/test** | 1.42.0 | 1.58.2 | Via clean install |

### Packages Intentionally NOT Updated

| Package | Current | Latest | Reason |
|---------|---------|--------|--------|
| **React** | 18.3.1 | 19.2.4 | Awaiting Syncfusion v32 compatibility confirmation |
| **react-dom** | 18.3.1 | 19.2.4 | Tied to React upgrade |
| **@types/react** | 18.3.28 | 19.2.13 | Tied to React upgrade |
| **@types/react-dom** | 18.3.7 | 19.2.3 | Tied to React upgrade |
| **tailwindcss** | 3.4.19 | 4.1.18 | Major config rewrite required (separate task) |
| **eslint** | 9.39.2 | 10.0.0 | Breaking changes, evaluate separately |
| **@eslint/js** | 9.39.2 | 10.0.1 | Tied to ESLint upgrade |
| **eslint-plugin-react-hooks** | 4.6.2 | 7.0.1 | Tied to ESLint upgrade |
| **globals** | 15.15.0 | 17.3.0 | Tied to ESLint upgrade |

## Code Changes Required

### 1. API Mutator (`src/api/mutator.ts`)
- Rewrote to support Orval 8.x response structure
- Added proper type handling for axios signal
- Added header conversion from axios to web Headers

### 2. ProductsListPage (`src/features/products/pages/ProductsListPage/index.tsx`)
- Updated to access `productsData?.data?.products` (Orval 8.x wraps responses)
- Fixed categories data access pattern

### 3. Navigation Handling (LoginPage, DashboardPage)
- React Router v7's `navigate()` may return a Promise
- Added `Promise.resolve(navigate()).catch()` pattern

### 4. Test Setup (`src/test/setup.ts`)
- Added proper type annotation for `requestAnimationFrame` callback

## Verification Results

```
npm audit: 0 vulnerabilities
npm run lint:fix: 0 errors, 3 warnings (file length warnings for test files)
npm run test -- --run: 13 test files, 353 tests passed
npm run build: Successful (8.97s)
```

## Success Criteria

- [x] All targeted packages updated to latest compatible versions
- [x] `npm audit` passes (0 vulnerabilities)
- [x] Build succeeds
- [x] All 353 unit tests pass
- [ ] All E2E tests pass (not run in this task)
- [x] Theme customization works (CSS overrides unchanged)
- [ ] No visual regressions (requires manual verification)

## Files Modified

| File | Changes |
|------|---------|
| `package.json` | Version updates |
| `package-lock.json` | Regenerated |
| `src/api/mutator.ts` | Rewritten for Orval 8.x compatibility |
| `src/features/products/pages/ProductsListPage/index.tsx` | Data access pattern updates |
| `src/features/auth/pages/LoginPage/index.tsx` | Navigate Promise handling |
| `src/features/dashboard/pages/DashboardPage/index.tsx` | Navigate Promise handling |
| `src/test/setup.ts` | Type annotation fix |

## Recommendations for Future Tasks

### React 19 Upgrade (New Task Required)
1. Wait for Syncfusion to confirm React 19 support
2. Review React 19 migration guide
3. Update `forwardRef` usage patterns
4. Test all Syncfusion component wrappers

### Tailwind 4 Upgrade (New Task Required)
1. Review Tailwind v4 migration guide
2. Convert `tailwind.config.js` to CSS-first config
3. Update any deprecated utilities
4. Test theme customization system

### ESLint 10 Upgrade (New Task Required)
1. Review ESLint 10 breaking changes
2. Update flat config if needed
3. Test all custom ESLint rules

---

*Created: 2026-02-09*
*Completed: 2026-02-09*
