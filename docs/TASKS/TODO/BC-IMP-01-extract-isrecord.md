# BC-IMP-01: Extract isRecord/isPlainObject to Shared Utility

## Status: TODO
## Priority: High (fixes potential bugs + eliminates ~25 duplications)
## Depends on: None
## Agent: frontend-dev

## Problem

`isRecord` is copy-pasted into **15+ separate files** (~25 total occurrences), each defining its own local version. Additionally, some versions are missing the `!Array.isArray()` check, meaning arrays incorrectly pass the guard — the same bug found in SyncfusionThemeStudio's `responseNormalizer.ts`.

### Files with duplicate `isRecord` definitions (13 files)

- `src/lib/theme/utils/themeCacheStorage.ts`
- `src/lib/queryClient.ts`
- `src/lib/httpInterceptor.ts`
- `src/lib/api/tokenRefresh.ts`
- `src/lib/api/interceptors/responseNormalizer.ts`
- `src/lib/api/interceptors/errorClassifier.ts`
- `src/lib/api/errors/errorClassifier.ts`
- `src/lib/api/errors/errorMatcher.ts`
- `src/lib/api/errors/handlers/serverErrorHandler.ts`
- `src/lib/api/errors/handlers/subscriptionErrorHandler.ts`
- `src/lib/api/errors/handlers/validationErrorHandler.ts`
- `src/components/Buttons/ExportButtons/generateCsvExport.ts`
- `src/components/Buttons/ExportButtons/generateJsonExport.ts`

### Files with duplicate `isPlainObject` definitions (2 files)

- `src/utils/menuConfigImport.ts`
- `src/types/menuStyleTypeGuards.ts`

### Additional inline `typeof value === 'object'` guards (~10 files)

- `AuthProvider.tsx`, `errorMessage.ts`, `TemplateEditorModal.tsx`, `TenantListItem.tsx`, `axiosHelpers.ts`, etc.

## Solution

1. Add `isRecord(value: unknown): value is Record<string, unknown>` to a shared utility (e.g., `src/utils/typeGuards.ts` or extend existing `src/utils/is.ts` if one exists):
   ```typescript
   export function isRecord(value: unknown): value is Record<string, unknown> {
     return typeof value === 'object' && value !== null && !Array.isArray(value);
   }
   ```
2. Replace all 15+ local implementations with the shared import
3. Add unit tests covering: `null`, `undefined`, `[]`, `{}`, `new Date()`, strings, numbers

## Benefits

- Fixes real bugs where arrays incorrectly pass the record check
- Eliminates ~25 duplications — single source of truth
- Any future fix (e.g., handling `Map`, `Set`) propagates to all consumers

## Linter Enforcement

Add a `no-restricted-syntax` ESLint rule to flag inline `typeof value === 'object'` guard patterns:
```json
{
  "no-restricted-syntax": ["error", {
    "selector": "BinaryExpression[operator='==='][left.property.name='type'][right.value='object']",
    "message": "Use isRecord() from @/utils/typeGuards instead of inline typeof checks"
  }]
}
```
