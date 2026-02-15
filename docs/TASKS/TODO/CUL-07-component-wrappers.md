# CUL-07: Component Wrapper Updates

## Status: TODO
## Priority: Medium
## Depends on: CUL-06
## Agent: frontend-dev

## Objective

Update Syncfusion component wrappers and native date displays to use the culture-aware formatting from `useCultureFormat` and `FD()`.

## Implementation Plan

### 1. Update DatePicker Wrapper
**File to modify**: `src/components/ui/syncfusion/DatePicker/index.tsx`

Current behavior:
- Uses hardcoded `format = 'MM/dd/yyyy'` as default

Updated behavior:
```ts
import { useCultureFormat } from '../hooks/useCultureFormat';

// Inside the component:
const cultureFormat = useCultureFormat();
const resolvedFormat = format ?? cultureFormat.dateFormat;
const resolvedFirstDay = firstDayOfWeek ?? cultureFormat.firstDayOfWeek;
```

Key points:
- Explicit `format` prop still overrides culture default (per-component customization)
- `firstDayOfWeek` prop follows the same override pattern
- Existing DatePicker consumers that pass explicit `format` are unaffected

### 2. Update Other Syncfusion Date/Time Components
Check for and update any other Syncfusion wrappers that have date/time formatting:
- **TimePicker** (if wrapper exists): Use `cultureFormat.timeFormat` as default
- **DateTimePicker** (if wrapper exists): Use `cultureFormat.dateTimeFormat`
- **DateRangePicker** (if wrapper exists): Use `cultureFormat.dateFormat`
- **DataGrid date columns** in showcase sections: These likely use explicit formats already

For each: use `useCultureFormat()` for defaults, but let explicit props win.

### 3. Update Native Order Section
**File to modify**: `src/features/forms/pages/NativeFormsPage/sections/OrderSection/index.tsx`

Current behavior:
```ts
new Date(createdAt).toLocaleDateString()
```

Updated behavior:
```ts
import { FD } from '@/localization/helpers';
// ...
FD(new Date(createdAt))
```

This makes native date displays respect the active culture settings through the updated `FD()`.

### 4. Review Showcase Alert Data
**File to review**: `src/features/components/pages/SyncfusionGridShowcase/sections/alertData.ts`

This file contains SIEM/security alert data with timestamps. If it uses hardcoded ISO format, leave it as-is — ISO format is appropriate for SIEM data. This is a good example of where a per-component override makes sense.

**Decision**: If the timestamps are display values (not raw data), wrap them with `FD()`. If they are raw ISO strings used for sorting/filtering, leave as-is and document why.

## Files to Modify

- `src/components/ui/syncfusion/DatePicker/index.tsx`
- `src/features/forms/pages/NativeFormsPage/sections/OrderSection/index.tsx`
- Potentially: other Syncfusion date/time wrappers (TimePicker, DateTimePicker, DateRangePicker)

## Files to Review (No Change Expected)

- `src/features/components/pages/SyncfusionGridShowcase/sections/alertData.ts`

## Acceptance Criteria

- [ ] DatePicker uses `useCultureFormat().dateFormat` as default format
- [ ] DatePicker's explicit `format` prop still overrides culture default
- [ ] `firstDayOfWeek` on DatePicker respects culture setting
- [ ] OrderSection uses `FD()` instead of `toLocaleDateString()`
- [ ] SIEM grid data retains ISO format where appropriate
- [ ] No breaking changes to existing component consumers
- [ ] `npm run lint:fix` — no new errors
- [ ] `npx tsc --noEmit` — passes
