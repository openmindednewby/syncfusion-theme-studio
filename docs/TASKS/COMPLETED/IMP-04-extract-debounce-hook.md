# IMP-04: Extract useDebouncedCallback Hook

## Status: COMPLETED
## Priority: Medium
## Depends on: None
## Agent: frontend-dev

## Problem

5 components implement the identical debounce-with-local-state pattern: `useState` + `useRef<setTimeout>` + `clearTimeout`/`setTimeout` in a `useCallback`:

- `ThemeSettingsDrawer/components/TextInputRow.tsx` (lines 18-31)
- `ThemeSettingsDrawer/components/NumberInputRow.tsx` (lines 26-39)
- `ThemeSettingsDrawer/components/ColorPicker.tsx` (lines 40-53)
- `TypographySection/components/FontFamilyEditor.tsx` (lines 53-67)
- `LayoutSection/components/ShadowsEditor.tsx` (lines 19-33)

A separate `useDebouncedFilter` hook already exists in `TableNative/hooks/` — the pattern was recognized as reusable but never consolidated.

All 5 follow the identical structure:
```typescript
const [localValue, setLocalValue] = useState(value);
const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
const handleChange = useCallback((e) => {
  setLocalValue(newValue);
  if (timeoutRef.current) clearTimeout(timeoutRef.current);
  timeoutRef.current = setTimeout(() => { onChange(newValue); }, DEBOUNCE_MS);
}, [onChange]);
```

## Solution

1. Create `src/hooks/useDebouncedCallback.ts` (or `src/components/layout/ThemeSettingsDrawer/hooks/useDebouncedInput.ts` if scoped to theme drawer)
2. API: `useDebouncedInput(value, onChange, delayMs)` returning `{ localValue, handleChange }`
3. Replace the 5 local implementations
4. Add unit test

## Files to Change

- Create `src/hooks/useDebouncedInput.ts`
- Create `src/hooks/useDebouncedInput.test.ts`
- `src/components/layout/ThemeSettingsDrawer/components/TextInputRow.tsx`
- `src/components/layout/ThemeSettingsDrawer/components/NumberInputRow.tsx`
- `src/components/layout/ThemeSettingsDrawer/components/ColorPicker.tsx`
- `src/components/layout/ThemeSettingsDrawer/sections/TypographySection/components/FontFamilyEditor.tsx`
- `src/components/layout/ThemeSettingsDrawer/sections/LayoutSection/components/ShadowsEditor.tsx`

## Benefits

- DRY — eliminates 5 identical ~15-line blocks
- Bug fixes propagate to all consumers (e.g., cleanup on unmount, consistent delay)
- New theme editors automatically get the same debounce behavior
