# CUL-06: FD() Helper Update & useCultureFormat Hook

## Status: TODO
## Priority: High
## Depends on: CUL-01, CUL-04
## Agent: frontend-dev

## Objective

Update the `FD()` date formatting helper to use the culture resolver instead of `i18n.language`, and create the `useCultureFormat` React hook that provides Syncfusion-compatible format strings from the active culture config.

## Implementation Plan

### 1. Update FD() Helper
**File to modify**: `src/localization/helpers.ts`

Current behavior:
```ts
// FD() currently uses i18n.language for locale
export function FD(date: Date, options?: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat(i18n.language, options).format(date);
}
```

Updated behavior:
```ts
import { getActiveLocale, getDateFormatOptions } from './cultureResolver';

export function FD(date: Date, options?: Intl.DateTimeFormatOptions): string {
  const locale = getActiveLocale();
  const mergedOptions = getDateFormatOptions(options);
  return new Intl.DateTimeFormat(locale, mergedOptions).format(date);
}
```

Key changes:
- Replace `i18n.language` with `getActiveLocale()` from `cultureResolver`
- Merge caller's options with `getDateFormatOptions(callerOptions)` so culture defaults apply
- Caller-provided options still override culture defaults (spread order matters)
- No changes to function signature — fully backward compatible

### 2. Create useCultureFormat Hook
**File to create**: `src/components/ui/syncfusion/hooks/useCultureFormat.ts`

```ts
import { useMemo } from 'react';
import { useThemeStore } from '@/stores/useThemeStore';
import {
  getSyncfusionDateFormat,
  getSyncfusionTimeFormat,
} from '@/localization/cultureResolver';

interface CultureFormatResult {
  dateFormat: string;      // e.g. 'MM/dd/yyyy', 'dd.MM.yyyy'
  timeFormat: string;      // e.g. 'hh:mm a', 'HH:mm'
  dateTimeFormat: string;  // Combined: 'MM/dd/yyyy hh:mm a'
  firstDayOfWeek: number;  // 0=Sunday, 1=Monday, etc.
}

export function useCultureFormat(): CultureFormatResult {
  const culture = useThemeStore((state) => state.theme.culture);

  return useMemo(() => {
    const dateFormat = getSyncfusionDateFormat(culture);
    const timeFormat = getSyncfusionTimeFormat(culture);
    const firstDayOfWeek = culture.firstDayOfWeek ?? getLocaleFirstDay(culture);

    return {
      dateFormat,
      timeFormat,
      dateTimeFormat: `${dateFormat} ${timeFormat}`,
      firstDayOfWeek,
    };
  }, [culture]);
}

// Helper: resolve first day of week from locale when set to null (auto)
function getLocaleFirstDay(culture: CultureConfig): number {
  // Use Intl.Locale.prototype.weekInfo if available (modern browsers)
  // Fallback to known locale defaults:
  //   Sunday (0): en-US, ja, zh, pt-BR
  //   Saturday (6): ar
  //   Monday (1): most European locales (de, fr, es, en-GB)
}
```

### Design Decisions

- **`useMemo` on `culture` reference**: Re-computes format strings only when culture config changes
- **`firstDayOfWeek` auto-resolution**: When `null`, derived from locale using `Intl.Locale` weekInfo API with fallback table
- **Backward compatible FD()**: Existing callers get culture-aware formatting without changes
- **Callers can still override**: `FD(date, { dateStyle: 'long' })` still works — caller options take precedence

## Files to Create

- `src/components/ui/syncfusion/hooks/useCultureFormat.ts`

## Files to Modify

- `src/localization/helpers.ts`

## Acceptance Criteria

- [ ] `FD()` uses `getActiveLocale()` instead of `i18n.language`
- [ ] `FD()` merges culture defaults with caller-provided options
- [ ] Caller options override culture defaults (not the other way around)
- [ ] `useCultureFormat()` returns `dateFormat`, `timeFormat`, `dateTimeFormat`, `firstDayOfWeek`
- [ ] Hook is memoized on `culture` reference
- [ ] `firstDayOfWeek` resolves from locale when config value is `null`
- [ ] Existing `FD()` callers continue to work without changes
- [ ] `npm run lint:fix` — no new errors
- [ ] `npx tsc --noEmit` — passes
- [ ] Existing tests that use `FD()` still pass
