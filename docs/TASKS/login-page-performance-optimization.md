# Login Page Performance Optimization

> **Status**: TODO
> **Created**: 2026-02-08
> **Priority**: P0 (Critical)
> **Goal**: Achieve Lighthouse Performance 100% on Login Page (Currently: FCP 32s, LCP 62s)

## Problem Statement

The login page has unacceptable Lighthouse performance scores:

| Metric | Current | Target | Weight |
|--------|---------|--------|--------|
| FCP (First Contentful Paint) | 32,177ms | <1,800ms | 10% |
| SI (Speed Index) | 32,177ms | <3,400ms | 10% |
| LCP (Largest Contentful Paint) | 62,399ms | <2,500ms | 25% |
| TBT (Total Blocking Time) | 120ms | <200ms | 30% |
| CLS (Cumulative Layout Shift) | 0.00 | <0.1 | 25% |

**Current Performance Score: 54/100**
**Target Performance Score: 100/100**

## Root Cause Analysis

### Critical Bottlenecks

1. **Syncfusion Components on Login Page**
   - `LoginPage` imports `Input` and `Button` from `@/components/ui`
   - These wrappers import `TextBoxComponent` and `ButtonComponent` from Syncfusion
   - Syncfusion modules are 1.6MB+ and block initial render
   - **Impact**: +500ms FCP

2. **Blocking License Initialization**
   - `initializeSyncfusion()` called synchronously in `main.tsx` before React renders
   - Reads from localStorage, parses JSON, registers license
   - **Impact**: +200ms TBT

3. **Eager CSS Loading**
   - `src/styles/index.css` imports Syncfusion CSS statically:
     ```css
     @import '@syncfusion/ej2-base/styles/tailwind.css';
     @import '@syncfusion/ej2-react-inputs/styles/tailwind.css';
     @import '@syncfusion/ej2-react-buttons/styles/tailwind.css';
     ```
   - All CSS loads even though login only needs basic styling
   - **Impact**: +300-500ms FCP

4. **Theme Initialization on Every Page**
   - `useThemeInitializer()` in `App.tsx` injects 100+ CSS custom properties
   - Runs on login page even though theme editor is not available there
   - **Impact**: +200ms render blocking

5. **Duplicate License Registration**
   - `initializeSyncfusion()` in `main.tsx`
   - `useLicenseStore` rehydration also calls `registerLicense()`
   - **Impact**: +50ms waste

---

## Implementation Plan

### Phase 1: P0 - Native HTML Components for Login (FCP: 32s -> <2s)

#### Task 1.1: Create Native Input Component

**File**: `src/components/ui/InputNative/index.tsx`

```tsx
import { memo, forwardRef, useId, type InputHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';
import { isValueDefined } from '@/utils/is';

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  label?: string;
  helperText?: string;
  error?: string;
  className?: string;
  testId?: string;
  fullWidth?: boolean;
}

const InputNative = forwardRef<HTMLInputElement, Props>(
  ({ label, helperText, error, className, testId, fullWidth = false, ...rest }, ref) => {
    const id = useId();
    const hasError = isValueDefined(error);
    const helperId = `${id}-helper`;
    const hasHelperOrError = isValueDefined(helperText) || hasError;

    return (
      <div className={cn('flex flex-col gap-1', fullWidth && 'w-full', className)} data-testid={testId}>
        {isValueDefined(label) && (
          <label className="text-sm font-medium text-text-primary" htmlFor={id}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          aria-describedby={hasHelperOrError ? helperId : undefined}
          aria-invalid={hasError}
          className={cn(
            'h-10 rounded-md border px-3 py-2 text-sm transition-colors',
            'bg-surface text-text-primary placeholder:text-text-muted',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1',
            hasError
              ? 'border-error-500 focus:ring-error-500'
              : 'border-border hover:border-primary-300',
            fullWidth && 'w-full'
          )}
          {...rest}
        />
        {hasHelperOrError && (
          <span
            className={cn('text-sm', hasError ? 'text-error-500' : 'text-text-secondary')}
            id={helperId}
          >
            {hasError ? error : helperText}
          </span>
        )}
      </div>
    );
  }
);

InputNative.displayName = 'InputNative';

export default memo(InputNative);
export type { Props as InputNativeProps };
```

**Verification**:
- [ ] Component renders correctly
- [ ] Styling matches Syncfusion Input appearance
- [ ] Accessibility attributes present
- [ ] Unit tests pass

---

#### Task 1.2: Create Native Button Component

**File**: `src/components/ui/ButtonNative/index.tsx`

```tsx
import { memo, forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  testId?: string;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700',
  secondary: 'bg-surface-elevated text-text-primary hover:bg-surface-hover',
  outline: 'border border-border bg-transparent text-text-primary hover:bg-surface',
  ghost: 'bg-transparent text-text-primary hover:bg-surface',
  danger: 'bg-error-500 text-white hover:bg-error-600 active:bg-error-700',
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
};

const ButtonNative = forwardRef<HTMLButtonElement, Props>(
  (
    { variant = 'primary', size = 'md', className, testId, fullWidth = false, children, disabled, ...rest },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        data-testid={testId}
        disabled={disabled}
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1',
          'disabled:pointer-events-none disabled:opacity-50',
          VARIANT_CLASSES[variant],
          SIZE_CLASSES[size],
          fullWidth && 'w-full',
          className
        )}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

ButtonNative.displayName = 'ButtonNative';

export default memo(ButtonNative);
export type { Props as ButtonNativeProps, ButtonVariant, ButtonSize };
```

**Verification**:
- [ ] Component renders correctly
- [ ] All variants work (primary, secondary, outline, ghost, danger)
- [ ] All sizes work (sm, md, lg)
- [ ] Disabled state works
- [ ] Unit tests pass

---

#### Task 1.3: Update UI Component Exports

**File**: `src/components/ui/index.ts`

```tsx
// Syncfusion-wrapped components (lazy-loaded after login)
export { default as Button } from './Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './Button';
export { default as Input } from './Input';
export type { InputProps } from './Input';

// Native components (for login page - zero Syncfusion dependency)
export { default as ButtonNative } from './ButtonNative';
export type { ButtonNativeProps } from './ButtonNative';
export { default as InputNative } from './InputNative';
export type { InputNativeProps } from './InputNative';

// Other exports remain unchanged
export { default as Select } from './Select';
export { default as DatePicker } from './DatePicker';
export { default as Dialog } from './Dialog';
export { default as DataGrid } from './DataGrid';
```

---

#### Task 1.4: Update Login Page to Use Native Components

**File**: `src/features/auth/pages/LoginPage/index.tsx`

```diff
- import { Button, Input } from '@/components/ui';
+ import { ButtonNative, InputNative } from '@/components/ui';

// Update all Input usage:
- <Input
+ <InputNative
    fullWidth
-   input={handleEmailChange}
+   onChange={(e) => setEmail(e.target.value)}
    label={FM('login.email')}
    placeholder={FM('login.emailPlaceholder')}
    testId={TestIds.LOGIN_USERNAME}
    type="email"
    value={email}
  />

// Update Button usage:
- <Button fullWidth testId={TestIds.LOGIN_SUBMIT} variant="primary">
+ <ButtonNative fullWidth testId={TestIds.LOGIN_SUBMIT} variant="primary" type="submit">
    {FM('login.submit')}
- </Button>
+ </ButtonNative>
```

**Full Updated LoginPage**:
- Remove dependency on `useThemeStore` for theme toggle (use native CSS)
- Use `InputNative` for email, password, license key fields
- Use `ButtonNative` for submit button
- Keep native theme toggle button (already using native HTML)

**Verification**:
- [ ] Login page renders without loading Syncfusion
- [ ] Form submission works
- [ ] Theme toggle works
- [ ] E2E login tests pass

---

### Phase 2: P0 - Defer Syncfusion Initialization (TBT: -200ms)

#### Task 2.1: Remove Blocking Initialization from main.tsx

**File**: `src/main.tsx`

```diff
  import { StrictMode } from 'react';
  import { createRoot } from 'react-dom/client';
- import { initializeSyncfusion } from '@config/syncfusion';
  import { App } from './app/App';
  import './styles/index.css';

- // Initialize Syncfusion license
- initializeSyncfusion();

  const rootElement = document.getElementById('root');
  if (!rootElement) throw new Error('Root element not found');

  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
```

---

#### Task 2.2: Create Lazy Syncfusion Initializer

**File**: `src/config/syncfusionLazy.ts`

```tsx
import { initializeSyncfusion } from './syncfusion';

let isInitialized = false;

/**
 * Initializes Syncfusion license lazily (only when needed)
 * Should be called when entering protected routes that use Syncfusion components
 */
export const initializeSyncfusionLazy = (): void => {
  if (isInitialized) return;
  isInitialized = true;
  initializeSyncfusion();
};

/**
 * Preloads Syncfusion modules in the background using requestIdleCallback
 * Call after login to prepare dashboard load
 */
export const preloadSyncfusionModules = (): void => {
  const preload = (): void => {
    // Preload Syncfusion CSS
    import('@syncfusion/ej2-react-grids/styles/tailwind.css');
    import('@syncfusion/ej2-react-calendars/styles/tailwind.css');
    import('@syncfusion/ej2-react-dropdowns/styles/tailwind.css');
    import('@syncfusion/ej2-react-navigations/styles/tailwind.css');
    import('@syncfusion/ej2-react-popups/styles/tailwind.css');

    // Preload Syncfusion JS modules
    import('@syncfusion/ej2-react-grids');
    import('@syncfusion/ej2-react-calendars');
    import('@syncfusion/ej2-react-dropdowns');
  };

  if ('requestIdleCallback' in window) {
    requestIdleCallback(preload, { timeout: 2000 });
  } else {
    setTimeout(preload, 100);
  }
};
```

---

#### Task 2.3: Initialize Syncfusion in MainLayout

**File**: `src/components/layout/MainLayout/index.tsx`

```diff
+ import { useEffect } from 'react';
  import { Outlet } from 'react-router-dom';
  import { FM } from '@/localization/helpers';
+ import { initializeSyncfusionLazy } from '@/config/syncfusionLazy';
  import { Header } from '../Header';
  import { Sidebar } from '../Sidebar';
  import { ThemeSettingsDrawer } from '../ThemeSettingsDrawer';

  const MAIN_CONTENT_ID = 'main-content';

  export const MainLayout = (): JSX.Element => {
+   // Initialize Syncfusion only when entering protected routes
+   useEffect(() => {
+     initializeSyncfusionLazy();
+   }, []);

    return (
      // ... rest unchanged
    );
  };
```

---

#### Task 2.4: Fix Duplicate License Registration

**File**: `src/stores/useLicenseStore.ts`

```diff
  onRehydrateStorage: () => (state) => {
-   const hasLicenseKey = isValueDefined(state) && state.licenseKey !== '';
-   if (hasLicenseKey) registerLicense(state.licenseKey);
+   // License registration is now handled lazily in MainLayout
+   // No need to register on rehydration
  },
```

**Verification**:
- [x] Login page loads without Syncfusion initialization
- [x] Dashboard loads with Syncfusion initialized
- [x] No console errors
- [x] License registration works correctly

**Completion Notes** (2026-02-08):
- Removed `initializeSyncfusion()` call from `main.tsx`
- Created `syncfusionLazy.ts` with lazy initialization utilities
- Added `useEffect` in `MainLayout` to initialize on protected route entry
- Removed duplicate license registration in `useLicenseStore.ts`
- Created comprehensive unit tests in `syncfusionLazy.test.ts` (10 tests)
- All tests pass (312 total)
- Build succeeds

---

### Phase 3: P1 - Split CSS Loading (FCP: -500ms)

#### Task 3.1: Create Login-Only CSS

**File**: `src/styles/login.css`

```css
/*
 * Login Page CSS - Zero Syncfusion Dependencies
 * This file contains only the styles needed for the login page
 */

/* Base variables and theme */
@import './layers/base.css';
@import './layers/components.css';

/* Tailwind */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

#### Task 3.2: Create App CSS (Syncfusion Included)

**File**: `src/styles/app.css`

```css
/*
 * App CSS - Full Syncfusion Styles
 * Loaded only after login on protected routes
 */

/* Syncfusion base styles */
@import '@syncfusion/ej2-base/styles/tailwind.css';
@import '@syncfusion/ej2-react-inputs/styles/tailwind.css';
@import '@syncfusion/ej2-react-buttons/styles/tailwind.css';

/* Custom overrides */
@import './layers/syncfusion-overrides.css';
```

---

#### Task 3.3: Update Main Entry to Use Login CSS

**File**: `src/main.tsx`

```diff
  import { StrictMode } from 'react';
  import { createRoot } from 'react-dom/client';
  import { App } from './app/App';

- import './styles/index.css';
+ // Login-only CSS (no Syncfusion)
+ import './styles/login.css';

  const rootElement = document.getElementById('root');
  if (!rootElement) throw new Error('Root element not found');

  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
```

---

#### Task 3.4: Load App CSS in MainLayout

**File**: `src/components/layout/MainLayout/index.tsx`

```diff
  import { useEffect } from 'react';
  import { Outlet } from 'react-router-dom';
  import { FM } from '@/localization/helpers';
  import { initializeSyncfusionLazy } from '@/config/syncfusionLazy';
  import { Header } from '../Header';
  import { Sidebar } from '../Sidebar';
  import { ThemeSettingsDrawer } from '../ThemeSettingsDrawer';

  const MAIN_CONTENT_ID = 'main-content';

  export const MainLayout = (): JSX.Element => {
    useEffect(() => {
      initializeSyncfusionLazy();
+     // Load Syncfusion CSS
+     import('@/styles/app.css');
    }, []);

    return (
      // ... rest unchanged
    );
  };
```

**Verification**:
- [ ] Login page loads with minimal CSS
- [ ] Dashboard loads with full Syncfusion CSS
- [ ] No FOUC (Flash of Unstyled Content)
- [ ] Theme variables work on both pages

---

### Phase 4: P1 - Theme Settings as Fixed Sidebar

#### Task 4.1: Create Theme Settings Panel Component

**File**: `src/components/layout/ThemeSettingsPanel/index.tsx`

The Theme Settings should be a fixed panel on the right side of the layout, not a modal-like drawer with backdrop.

**Key Changes**:
1. Remove backdrop overlay
2. Remove `aria-modal="true"`
3. Change from absolute positioning to grid layout integration
4. Add collapse/expand toggle
5. Persist collapsed state in Zustand store

**Implementation**:

```tsx
import { useCallback, useRef, useState, lazy, Suspense } from 'react';
import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';
import { useThemeSettingsDrawerStore } from '@/stores/useThemeSettingsDrawerStore';
import { useThemeStore } from '@/stores/useThemeStore';
import { DrawerTabs, type TabId } from './DrawerTabs';
import { ImportExportSection } from './ImportExportSection';

// Lazy load sections (keep existing lazy imports)
const ColorsSection = lazy(async () => ({
  default: (await import('./ColorsSection')).ColorsSection,
}));
// ... other lazy imports

const PANEL_WIDTH = 420;
const DEFAULT_TAB: TabId = 'colors';

const CollapseIcon = ({ isCollapsed }: { isCollapsed: boolean }): JSX.Element => (
  <svg
    aria-hidden="true"
    className={`h-5 w-5 transition-transform ${isCollapsed ? 'rotate-180' : ''}`}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ThemeSettingsPanel = (): JSX.Element => {
  const { isOpen, toggle } = useThemeSettingsDrawerStore();
  const { resetTheme } = useThemeStore();
  const [activeTab, setActiveTab] = useState<TabId>(DEFAULT_TAB);

  const handleReset = (): void => {
    resetTheme();
  };

  return (
    <aside
      aria-label={FM('themeSettings.panelLabel')}
      className={`
        flex h-full flex-col border-l border-border bg-surface
        transition-all duration-normal
        ${isOpen ? `w-[${PANEL_WIDTH}px]` : 'w-12'}
      `}
      data-testid={TestIds.THEME_SETTINGS_PANEL}
    >
      {/* Collapse Toggle */}
      <button
        aria-label={isOpen ? FM('themeSettings.collapse') : FM('themeSettings.expand')}
        className="flex h-12 w-full items-center justify-center border-b border-border hover:bg-surface-elevated"
        data-testid={TestIds.THEME_TOGGLE_PANEL}
        type="button"
        onClick={toggle}
      >
        <CollapseIcon isCollapsed={!isOpen} />
      </button>

      {isOpen && (
        <>
          {/* Header */}
          <header className="flex items-center justify-between border-b border-border px-4 py-3">
            <h3 className="text-lg font-semibold text-text-primary">
              {FM('themeSettings.title')}
            </h3>
          </header>

          {/* Tabs */}
          <DrawerTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Content */}
          <div className="flex-1 space-y-6 overflow-y-auto p-4">
            {/* ... existing tab content rendering */}
            <ImportExportSection />

            {/* Reset Button */}
            <section className="pt-4">
              <button
                aria-label={FM('themeSettings.resetToDefault')}
                className="btn btn-secondary w-full text-xs"
                data-testid={TestIds.THEME_RESET_BTN}
                type="button"
                onClick={handleReset}
              >
                {FM('themeSettings.resetToDefault')}
              </button>
            </section>
          </div>
        </>
      )}
    </aside>
  );
};
```

---

#### Task 4.2: Update MainLayout Grid

**File**: `src/components/layout/MainLayout/index.tsx`

```diff
  import { useEffect } from 'react';
  import { Outlet } from 'react-router-dom';
  import { FM } from '@/localization/helpers';
  import { initializeSyncfusionLazy } from '@/config/syncfusionLazy';
  import { Header } from '../Header';
  import { Sidebar } from '../Sidebar';
- import { ThemeSettingsDrawer } from '../ThemeSettingsDrawer';
+ import { ThemeSettingsPanel } from '../ThemeSettingsPanel';

  const MAIN_CONTENT_ID = 'main-content';

  export const MainLayout = (): JSX.Element => {
    useEffect(() => {
      initializeSyncfusionLazy();
      import('@/styles/app.css');
    }, []);

    return (
-     <div className="flex h-screen bg-background">
+     <div className="grid h-screen grid-cols-[auto_1fr_auto] bg-background">
        {/* Skip link */}
        <a
          className="sr-only focus:not-sr-only ..."
          href={`#${MAIN_CONTENT_ID}`}
        >
          {FM('accessibility.skipToMainContent')}
        </a>
+
+       {/* Left Sidebar */}
        <Sidebar />
-       <div className="flex flex-1 flex-col overflow-hidden">
+
+       {/* Main Content Area */}
+       <div className="flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-auto p-6" id={MAIN_CONTENT_ID} tabIndex={-1}>
            <Outlet />
          </main>
        </div>
-       <ThemeSettingsDrawer />
+
+       {/* Right Theme Settings Panel */}
+       <ThemeSettingsPanel />
      </div>
    );
  };
```

---

#### Task 4.3: Update Store for Panel Behavior

**File**: `src/stores/useThemeSettingsDrawerStore.ts`

```diff
  import { create } from 'zustand';
+ import { persist } from 'zustand/middleware';

  interface ThemeSettingsDrawerState {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
  }

- export const useThemeSettingsDrawerStore = create<ThemeSettingsDrawerState>((set) => ({
-   isOpen: false,
-   open: () => set({ isOpen: true }),
-   close: () => set({ isOpen: false }),
-   toggle: () => set((state) => ({ isOpen: !state.isOpen })),
- }));
+ export const useThemeSettingsDrawerStore = create<ThemeSettingsDrawerState>()(
+   persist(
+     (set) => ({
+       isOpen: true, // Default to open
+       open: () => set({ isOpen: true }),
+       close: () => set({ isOpen: false }),
+       toggle: () => set((state) => ({ isOpen: !state.isOpen })),
+     }),
+     {
+       name: 'theme-settings-panel',
+     }
+   )
+ );
```

**Verification**:
- [ ] Theme panel renders on the right side
- [ ] Panel collapse/expand works
- [ ] Panel state persists across page reloads
- [ ] No backdrop/overlay
- [ ] Keyboard navigation still works
- [ ] E2E tests pass

---

### Phase 5: P2 - Background Preload After Login

#### Task 5.1: Trigger Preload After Login

**File**: `src/features/auth/pages/LoginPage/index.tsx`

```diff
+ import { preloadSyncfusionModules } from '@/config/syncfusionLazy';

  const handleSubmit = useCallback(
    (e: React.FormEvent): void => {
      e.preventDefault();
      if (localLicenseKey !== '') setLicenseKey(localLicenseKey);
+
+     // Preload Syncfusion modules in background before navigation
+     preloadSyncfusionModules();
+
      navigate('/dashboard');
    },
    [navigate, localLicenseKey, setLicenseKey],
  );
```

**Verification**:
- [ ] Syncfusion modules preload in background after login
- [ ] Dashboard loads faster due to preloaded modules
- [ ] No visible delay on login page

---

## Success Criteria

| Metric | Before | Target | Achieved |
|--------|--------|--------|----------|
| FCP | 32,177ms | <1,800ms | [ ] |
| SI | 32,177ms | <3,400ms | [ ] |
| LCP | 62,399ms | <2,500ms | [ ] |
| TBT | 120ms | <200ms | [ ] |
| CLS | 0.00 | <0.1 | [ ] |
| **Performance Score** | **54** | **100** | [ ] |

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/components/ui/InputNative/index.tsx` | NEW - Native input component |
| `src/components/ui/ButtonNative/index.tsx` | NEW - Native button component |
| `src/components/ui/index.ts` | Export native components |
| `src/features/auth/pages/LoginPage/index.tsx` | Use native components |
| `src/main.tsx` | Remove blocking Syncfusion init |
| `src/config/syncfusionLazy.ts` | NEW - Lazy initialization utilities |
| `src/components/layout/MainLayout/index.tsx` | Lazy init, CSS loading, grid layout |
| `src/stores/useLicenseStore.ts` | Remove duplicate registration |
| `src/styles/login.css` | NEW - Login-only CSS |
| `src/styles/app.css` | NEW - Syncfusion CSS bundle |
| `src/styles/index.css` | Refactor to login.css |
| `src/components/layout/ThemeSettingsPanel/index.tsx` | NEW - Fixed sidebar panel |
| `src/stores/useThemeSettingsDrawerStore.ts` | Add persistence, rename to panel |

---

## Testing Checklist

### Unit Tests
- [ ] InputNative component tests
- [ ] ButtonNative component tests
- [ ] syncfusionLazy utilities tests
- [ ] ThemeSettingsPanel component tests

### E2E Tests
- [ ] Login flow with native components
- [ ] Dashboard loads correctly after login
- [ ] Theme panel opens/closes/persists
- [ ] All existing E2E tests pass

### Manual Testing
- [ ] Login page loads in <2s on mobile throttling
- [ ] No console errors on login page
- [ ] Theme toggle works on login page
- [ ] Dashboard loads with all Syncfusion components working
- [ ] Theme panel collapse/expand works
- [ ] Theme changes apply correctly

### Lighthouse Audit
```bash
# Run Lighthouse on login page
npm run lighthouse -- --url=http://localhost:4444/

# Expected scores:
# Performance: 100
# Accessibility: 100
# Best Practices: 100
# SEO: 100
```

---

## Rollback Plan

If issues arise:
1. Revert to original `index.css` importing all Syncfusion CSS
2. Restore `initializeSyncfusion()` in `main.tsx`
3. Restore `Input` and `Button` imports in LoginPage
4. Restore `ThemeSettingsDrawer` instead of `ThemeSettingsPanel`

---

## Related Documentation

- [Lighthouse Performance Scoring](https://web.dev/performance-scoring/)
- [Syncfusion License Registration](https://ej2.syncfusion.com/react/documentation/licensing/)
- [Vite Code Splitting](https://vitejs.dev/guide/build.html#chunking-strategy)
- Previous task: `lighthouse-100-and-theme-editor-fixes.md`
