# Fix Figma Design Preset Button Rendering

## Status: In Progress

## Problem
When switching to the "Figma Design" preset, buttons don't match the Figma source due to 6 bugs in the rendering pipeline.

## Bugs Fixed

| # | Bug | File |
|---|-----|------|
| 1 | `buildDerivedButtons` overwrites preset's primary button colors with auto-derived blue | `PresetsSection/index.tsx` |
| 2 | `borderRadius: '25px'` wrapped as `var(--radius-25px)` (doesn't exist) | `buttonInjector.ts` |
| 3 | `rgb(transparent)` — injector wraps ALL values in `rgb()` | `buttonInjector.ts` |
| 4 | No hover states in generated Figma preset | `generate-buttons.ts` |
| 5 | `applyDisabledOverrides` overwrites Figma disabled colors | `PresetsSection/index.tsx` |
| 6 | No `gap` at section level in buttons.json | `generate-buttons.ts` + `code-generators.ts` |

## Changes Made

### `buttonInjector.ts`
- Added `cssColor()` helper: returns `transparent`/`inherit` as-is, wraps others in `rgb()`
- Added `cssBorderRadius()`: literal px values pass through, scale tokens use `var(--radius-...)`

### `PresetsSection/index.tsx`
- Added `withPresetButtonOverrides()`: re-applies preset button overrides after auto-derivation
- Chained in `handleApplyPreset` after `withPresetSidebarOverrides`

### `generate-buttons.ts`
- Auto-derives hover states (same as default) when Figma doesn't provide them
- Added `extractGap()` to extract gap at section level

### `code-generators.ts`
- Added `gap` to `ComponentSectionOverrides` interface
- Added gap output in both `generateComponentsOverride` and `generateModeComponentLines`

### Generated Files (regenerated)
- `buttons.json` — now includes `backgroundHover`, `textColorHover`, `gap`
- `figmaDesignComponentsLight.ts` / `figmaDesignComponentsDark.ts` — updated
