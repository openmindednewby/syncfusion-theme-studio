# CUL-05: Syncfusion CLDR Lazy Loading

## Status: TODO
## Priority: High
## Depends on: CUL-01
## Agent: frontend-dev

## Objective

Create the Syncfusion globalization module that lazy-loads CLDR data and calls `setCulture()` when the user selects a culture. Also create the `src/config/cldr/` directory with per-culture CLDR JSON files.

## Implementation Plan

### 1. Create Syncfusion Culture Module
**File to create**: `src/config/syncfusionCulture.ts`

Follow the lazy-loading pattern of `loadSyncfusionCss.ts`:

```ts
import { loadCldr, setCulture } from '@syncfusion/ej2-base';
import type { CultureConfig } from '@/stores/theme/types/cultureTypes';
import { CultureMode } from '@/stores/theme/types/cultureMode';

// Supported cultures with display names
export const SUPPORTED_CULTURES = [
  { tag: 'en-US', name: 'English (US)' },
  { tag: 'en-GB', name: 'English (UK)' },
  { tag: 'de', name: 'German' },
  { tag: 'fr', name: 'French' },
  { tag: 'es', name: 'Spanish' },
  { tag: 'ja', name: 'Japanese' },
  { tag: 'zh', name: 'Chinese (Simplified)' },
  { tag: 'ar', name: 'Arabic' },
  { tag: 'pt-BR', name: 'Portuguese (Brazil)' },
] as const;

// Track loaded cultures to avoid duplicate loading
const loadedCultures = new Set<string>();
// Track in-flight promises for deduplication
const pendingLoads = new Map<string, Promise<void>>();

export async function applySyncfusionCulture(config: CultureConfig): Promise<void> {
  // 1. Resolve locale (Auto = navigator.language, Manual = config.locale)
  // 2. If 'en-US', just call setCulture('en') — no CLDR needed (Syncfusion default)
  // 3. If already loaded, just call setCulture(locale) and return
  // 4. If in-flight, await the pending promise
  // 5. Otherwise, dynamically import the CLDR file, call loadCldr(), add to Set
  // 6. Call setCulture(locale)
}
```

### 2. Create CLDR Data Directory
**Directory to create**: `src/config/cldr/`

One file per supported culture (excluding `en-US` which needs no CLDR data):

| File | Culture |
|------|---------|
| `en-GB.ts` | English (UK) |
| `de.ts` | German |
| `fr.ts` | French |
| `es.ts` | Spanish |
| `ja.ts` | Japanese |
| `zh.ts` | Chinese (Simplified) |
| `ar.ts` | Arabic |
| `pt-BR.ts` | Portuguese (Brazil) |

Each file exports CLDR JSON for:
- `ca-gregorian` — calendar data (month names, day names, date/time patterns)
- `numbers` — decimal separators, grouping symbols, number patterns
- `timeZoneNames` — timezone display names

**Data source**: `cldr-data` npm package (install as dev dependency). Extract only the minimal JSON needed for Syncfusion, then vendor it into each culture file as a default export.

### 3. Dynamic Import Pattern

Each CLDR file is loaded via dynamic import for tree-shaking:
```ts
// In applySyncfusionCulture:
const cldrModule = await import(`./cldr/${locale}.ts`);
loadCldr(cldrModule.default);
```

This ensures only the selected culture's data is included in the runtime bundle.

### CLDR File Structure Example

```ts
// src/config/cldr/de.ts
export default {
  main: {
    de: {
      dates: {
        calendars: {
          gregorian: {
            months: { /* ... */ },
            days: { /* ... */ },
            dateFormats: { /* ... */ },
            timeFormats: { /* ... */ },
          },
        },
      },
      numbers: {
        defaultNumberingSystem: 'latn',
        'symbols-numberSystem-latn': {
          decimal: ',',
          group: '.',
          // ...
        },
        // ...
      },
    },
  },
};
```

### Performance Notes

- `en-US` requires zero CLDR loading (Syncfusion default) — no impact on initial load
- CLDR files are ~5-15 KB each (gzipped: ~2-4 KB)
- Only one culture's data loads at a time
- Deduplication prevents loading the same culture twice
- Dynamic imports ensure unused cultures are tree-shaken

## Dependencies to Add

| Package | Purpose | Dev only? |
|---------|---------|-----------|
| `cldr-data` | Source for CLDR JSON data | Yes |

The `cldr-data` package is only used during development to extract the minimal JSON. The vendored files in `src/config/cldr/` contain only what Syncfusion needs.

## Files to Create

- `src/config/syncfusionCulture.ts`
- `src/config/cldr/en-GB.ts`
- `src/config/cldr/de.ts`
- `src/config/cldr/fr.ts`
- `src/config/cldr/es.ts`
- `src/config/cldr/ja.ts`
- `src/config/cldr/zh.ts`
- `src/config/cldr/ar.ts`
- `src/config/cldr/pt-BR.ts`

## Files to Modify

- `package.json` — add `cldr-data` as devDependency

## Acceptance Criteria

- [ ] `applySyncfusionCulture` resolves locale from config
- [ ] `en-US` skips CLDR loading (calls `setCulture('en')` only)
- [ ] Other cultures dynamically import their CLDR file
- [ ] Deduplication: same culture is not loaded twice
- [ ] In-flight promise deduplication (concurrent calls for same culture await the same promise)
- [ ] `SUPPORTED_CULTURES` array has 9 entries with tags and display names
- [ ] Each CLDR file contains `ca-gregorian`, `numbers`, `timeZoneNames`
- [ ] `npm run lint:fix` — no new errors
- [ ] `npx tsc --noEmit` — passes
- [ ] Build succeeds (dynamic imports resolve correctly)
