# IMP-01: Add Zustand Selectors to All useThemeStore Consumers

## Status: TODO
## Priority: High (biggest performance win)
## Depends on: None
## Agent: frontend-dev

## Problem

Every component using `useThemeStore()` subscribes to the **entire store** — any theme change (color, typography, layout, spacing) re-renders all visible Syncfusion wrappers, header, settings drawer, etc. ~40+ files affected. Only `MainLayout` uses a selector today.

**Worst offender**: `ComponentsSection/index.tsx` destructures 35 actions, causing all 27 child editors to re-render on any theme change.

## Solution

Replace `const { mode } = useThemeStore()` with `const mode = useThemeStore(s => s.mode)` across all consumers. For components needing multiple fields, use `useThemeStore(s => ({ mode: s.mode, theme: s.theme }))` with Zustand's `shallow` equality.

## Files to Change (~40+)

### Syncfusion wrappers (only need `s.mode`)
- `src/components/ui/syncfusion/Button/index.tsx`
- `src/components/ui/syncfusion/Input/index.tsx`
- `src/components/ui/syncfusion/Select/index.tsx`
- `src/components/ui/syncfusion/DataGrid/index.tsx`
- `src/components/ui/syncfusion/Dialog/index.tsx`
- `src/components/ui/syncfusion/DatePicker/index.tsx`
- `src/components/ui/syncfusion/Alert/index.tsx`
- `src/components/ui/syncfusion/Checkbox/index.tsx`
- `src/components/ui/syncfusion/Radio/index.tsx`
- `src/components/ui/syncfusion/Toggle/index.tsx`
- `src/components/ui/syncfusion/Accordion/index.tsx`
- `src/components/ui/syncfusion/Toolbar/index.tsx`
- `src/components/ui/syncfusion/Menu/index.tsx`
- `src/components/ui/syncfusion/Breadcrumb/index.tsx`
- `src/components/ui/syncfusion/IconButton/index.tsx`
- `src/components/ui/syncfusion/Fab/index.tsx`
- `src/components/ui/syncfusion/Chip/index.tsx`
- `src/components/ui/syncfusion/hooks/useSyncfusionTheme.ts`

### Layout components
- `src/components/layout/Header/index.tsx` (only needs `mode` + `toggleMode`)
- `src/components/layout/ThemeSettingsDrawer/index.tsx` (only needs `resetTheme`)
- `src/components/layout/ThemeEditorPanel/index.tsx`

### Theme editor sections (need data selector + action selectors)
- `src/components/layout/ThemeSettingsDrawer/sections/ComponentsSection/index.tsx`
- `src/components/layout/ThemeSettingsDrawer/sections/TypographySection/index.tsx`
- `src/components/layout/ThemeSettingsDrawer/sections/LayoutSection/index.tsx`
- `src/components/layout/ThemeSettingsDrawer/components/ColorsSection.tsx`
- `src/components/layout/ThemeSettingsDrawer/sections/PresetsSection/index.tsx`
- `src/components/layout/ThemeSettingsDrawer/sections/DarkThemeSection/index.tsx`
- `src/components/layout/ThemeSettingsDrawer/sections/LightThemeSection/index.tsx`

### Store internals
- `src/stores/useThemeStore.ts` (`useThemeInitializer`)

## Benefits

- Eliminates cascading re-renders when editing any theme property
- Biggest single performance improvement possible — every color picker drag currently re-renders the entire visible component tree
- Syncfusion components are expensive to re-render (DOM-heavy), so this matters more than in a typical React app

## Linter Enforcement

Add an ESLint rule (or custom plugin) to flag `useThemeStore()` calls without a selector argument:

```
// BAD — no selector (flag these)
const { mode } = useThemeStore()
useThemeStore()

// GOOD — with selector (allow these)
useThemeStore(s => s.mode)
useThemeStore(selectX)
```

Consider using `eslint-plugin-zustand` or a custom rule `enforce-zustand-selectors` due to performance issues!.
