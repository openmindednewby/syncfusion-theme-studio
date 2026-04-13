# Native-Syncfusion Prop Parity: Full Component Analysis & Task Plan

**Created**: 2026-02-20
**Goal**: Make native components accept the same props/interfaces as Syncfusion components for true plug-and-play interchangeability, plus implement all Syncfusion features in native.

---

## Executive Summary

Analysis of **31 native components** vs **16 Syncfusion wrappers** reveals:

- **8 component pairs**: Fully aligned via shared base types (zero work needed)
- **1 component pair**: Structurally identical but needs shared base type extraction
- **6 component pairs**: Significant prop/interface gaps requiring harmonization
- **11 native-only components**: Need Syncfusion wrappers created (8 have Syncfusion library equivalents)
- **4 native-only components**: No Syncfusion equivalent exists (typography/specialized)

---

## TIER 0: Already Aligned (No Work Needed)

These pairs already share the exact same `BaseXProps` type. Props are identical.

| # | Syncfusion | Native | Shared Type File |
|---|-----------|--------|------------------|
| 1 | SyncfusionTabs | TabsNative | `shared/tabsTypes.ts` |
| 2 | SyncfusionTimeline | TimelineNative | `shared/timelineTypes.ts` |
| 3 | SyncfusionTag | TagNative | `shared/tagTypes.ts` |
| 4 | SyncfusionBadge | BadgeNative | `shared/badgeTypes.ts` |
| 5 | SyncfusionAvatar | AvatarNative | `shared/avatarTypes.ts` |
| 6 | SyncfusionCard | CardNative | `shared/cardTypes.ts` |
| 7 | SyncfusionProgressBar | ProgressBarNative | `shared/progressBarTypes.ts` |
| 8 | SyncfusionTooltip | TooltipNative | `shared/tooltipTypes.ts` |

**Minor note**: SyncfusionTag has `aria-label={label}` that TagNative lacks. Consider adding to TagNative for accessibility parity.

---

## TIER 1: Quick Wins (Small Gaps)

### Task 1.1: Extract Shared BaseDescriptionProps

**Priority**: Low | **Effort**: Small | **Files**: 3

**Current state**: Both SyncfusionDescription and DescriptionNative define identical props inline. They are the only pair that lacks a shared base type.

**Props** (identical in both):
- `children: ReactNode` (required)
- `as: ElementType` (optional, default `'p'`)
- `className: string` (optional, default `''`)
- `testId: string` (optional)
- `style: CSSProperties` (optional)

**Work**:
1. Create `shared/descriptionTypes.ts` with `BaseDescriptionProps`
2. Update SyncfusionDescription to `export type SyncfusionDescriptionProps = BaseDescriptionProps`
3. Update DescriptionNative to `export type DescriptionNativeProps = BaseDescriptionProps`
4. Fix testId default: SyncfusionDescription uses `'syncfusion-description'` (breaks `'sf-*'` convention) -- rename to `'sf-description'`

### Task 1.2: Harmonize Dialog Button Source

**Priority**: Low | **Effort**: Small | **Files**: 2

**Current state**: Dialog props are functionally identical. But:
- Syncfusion Dialog defines `DialogButton` locally
- Native DialogNative imports `BaseDialogButton` from `shared/dialogTypes.ts`
- Neither uses `BaseDialogProps` from shared

**Work**:
1. Make Syncfusion Dialog import `BaseDialogButton` from shared (delete local definition)
2. Consider making both extend `BaseDialogProps` from shared (like the Tier 0 components do)

---

## TIER 2: Interface Harmonization (Medium Gaps)

### Task 2.1: Harmonize Alert Props

**Priority**: Medium | **Effort**: Medium | **Files**: 4+

**Current state**: Significant divergence.

| Feature | Syncfusion Alert | AlertNative | Gap |
|---------|-----------------|-------------|-----|
| `severity` | `AlertSeverity` (local `alertSeverity.ts`) | `AlertSeverity` (from `shared/alertTypes.ts`) | **Duplicate enum** in two files |
| `displayVariant` | `AlertDisplayVariant` (Text/Outlined/Filled) | Missing | **Native needs this** |
| `showCloseIcon` | `boolean` (default `false`) | Missing (uses `dismissible`) | **Naming mismatch** |
| `title` | Missing | `string` (optional) | **Syncfusion needs this** |
| `dismissible` | Missing (uses `showCloseIcon`) | `boolean` (default `false`) | **Naming mismatch** |
| `onDismiss` | Missing | `() => void` (optional) | **Syncfusion needs this** |
| Shared `BaseAlertProps` | Not used | Not used | **Neither uses it** |

**Work**:
1. Unify `AlertSeverity` -- delete local `alertSeverity.ts` in Syncfusion, use shared one
2. Create/update `shared/alertTypes.ts` with unified `BaseAlertProps` including ALL props from both:
   - `severity`, `displayVariant`, `title`, `dismissible`, `onDismiss`, `showIcon`, `className`, `testId`, `children`
3. Decide on naming: `dismissible` + `onDismiss` (native pattern) vs `showCloseIcon` (Syncfusion pattern)
   - **Recommendation**: Use `dismissible` + `onDismiss` (more descriptive, includes callback)
4. Add `displayVariant` to AlertNative
5. Add `title` and `onDismiss` callback to Syncfusion Alert
6. Make both extend `BaseAlertProps`

### Task 2.2: Harmonize Button Family Props

**Priority**: Medium | **Effort**: Medium | **Files**: 4+

**Current state**: Shared `BaseButtonProps`, `BaseIconButtonProps`, `BaseFabProps`, `BaseSplitButtonProps` exist in `shared/` but **neither Syncfusion nor native components use them**.

**Key gaps (Button <-> ButtonNative)**:

| Feature | Syncfusion Button | ButtonNative | Issue |
|---------|-------------------|-------------|-------|
| Base type | `Omit<ButtonModel, 'cssClass'>` | `Omit<ButtonHTMLAttributes, 'className'>` | Different bases |
| `onClick` | `() => void` | `MouseEventHandler<HTMLButtonElement>` | **Different signature** |
| `isToggle` | `boolean` (from ButtonModel) | Missing | Toggle behavior |
| `type` | Not exposed | `"button" \| "submit" \| "reset"` (default `'button'`) | Form submission |
| `aria-busy` | Not set | Set during loading | Accessibility |
| Ref type | `ButtonComponent` | `HTMLButtonElement` | Different refs |

**Work**:
1. Update shared `BaseButtonProps` to be the canonical interface
2. Harmonize `onClick` signature -- recommend `(event?: React.MouseEvent) => void` for flexibility
3. Add `isToggle` to native ButtonNative (or to shared base if it should be universal)
4. Add `type` HTML attribute support to Syncfusion Button wrapper
5. Add `aria-busy` during loading to Syncfusion Button
6. Make both ButtonNative and Syncfusion Button extend `BaseButtonProps`
7. Similarly wire up `BaseIconButtonProps`, `BaseFabProps`, `BaseSplitButtonProps` for the native-only button variants

### Task 2.3: Harmonize Input Props

**Priority**: High | **Effort**: Medium | **Files**: 4+

**Current state**: Both have label/helperText/error/className/testId/fullWidth/required. But:

| Feature | Syncfusion Input | InputNative | Issue |
|---------|-----------------|-------------|-------|
| Disabled | `enabled: boolean` (from TextBoxModel) | `disabled: boolean` (HTML) | **Inverted semantics** |
| Change | `change` (Syncfusion event, ChangedEventArgs) | `onChange` (React ChangeEvent) | **Different names AND types** |
| Clear button | `showClearButton: boolean` | Missing | |
| Multiline | `multiline: boolean` | Missing | Would need `<textarea>` |
| Value type | `string` | `string \| number \| readonly string[]` | |
| Read-only | `readonly` (lowercase) | `readOnly` (camelCase) | |
| Ref | `TextBoxComponent` | `HTMLInputElement` | |

**Work**:
1. Update `shared/inputTypes.ts` `BaseInputProps` to include:
   - `disabled?: boolean` (use HTML convention, not `enabled`)
   - `onChange?: (value: string) => void` (unified callback)
   - `showClearButton?: boolean`
2. Implement `showClearButton` in InputNative (add an X button that clears the input)
3. Syncfusion Input: translate `disabled` to `enabled={!disabled}` internally
4. Both: expose a unified `onChange` that extracts the string value
5. Make both extend updated `BaseInputProps`

### Task 2.4: Harmonize Select Props

**Priority**: High | **Effort**: Medium | **Files**: 4+

**Current state**: Both share `BaseSelectProps` (good!). But:

| Feature | Syncfusion Select | SelectNative | Issue |
|---------|------------------|-------------|-------|
| Filtering | `allowFiltering` (from DropDownListModel) | `searchable: boolean` | **Different prop names** |
| Options type | `SelectOption[]` (BaseSelectOption + index sig) | `BaseSelectOption[]` | **Syncfusion adds index signature** |
| `name` | Not exposed | `string` (for form submission) | |
| `disabled` | **BUG**: Not translated to `enabled` | Works correctly | **Functional bug in Syncfusion** |

**Work**:
1. **Fix bug**: Syncfusion Select must translate `disabled` to `enabled={!disabled}` for DropDownListComponent
2. Unify filtering prop name -- add `searchable` to `BaseSelectProps`, map to `allowFiltering` internally in Syncfusion
3. Add `name` to `BaseSelectProps` for form submission support
4. Ensure both use the same `BaseSelectOption` type (remove extra index signature requirement)

### Task 2.5: Harmonize DatePicker Props

**Priority**: High | **Effort**: Medium | **Files**: 4+

**Current state**: Large divergence.

| Feature | Syncfusion DatePicker | DatePickerNative | Issue |
|---------|----------------------|-----------------|-------|
| Value | `Date` object | `string` (YYYY-MM-DD via HTML input) | **Different types** |
| Min | `min: Date` | `minDate: string` | **Different name AND type** |
| Max | `max: Date` | `maxDate: string` | **Different name AND type** |
| onChange | `(date: Date \| undefined) => void` | `ChangeEventHandler<HTMLInputElement>` | **Different signatures** |
| Disabled | `enabled: boolean` | `disabled: boolean` | **Inverted** |
| Format | `format: string` | Missing | |
| Read-only | `readonly` | `readOnly` | **Casing** |

**Work**:
1. Update `shared/datePickerTypes.ts` `BaseDatePickerProps` to include:
   - `value?: Date | null`
   - `onChange?: (date: Date | null) => void` (unified callback)
   - `minDate?: Date` (use `Date` objects, not strings)
   - `maxDate?: Date`
   - `disabled?: boolean`
   - `format?: string` (native can ignore or implement basic formatting)
2. DatePickerNative: convert `Date` objects to/from YYYY-MM-DD strings internally
3. Syncfusion DatePicker: translate `disabled` to `enabled={!disabled}`, map `minDate`/`maxDate` to `min`/`max`
4. Make both extend updated `BaseDatePickerProps`

---

## TIER 3: Major Feature Implementation (DataGrid/Table)

### Task 3.1: Harmonize DataGrid/Table Column Types

**Priority**: Critical | **Effort**: Large | **Files**: 5+

**Current state**: Completely different column definitions.

| Feature | DataGrid `ColumnModel` | TableNative `TableColumn` |
|---------|----------------------|--------------------------|
| Properties | ~50+ (Syncfusion) | 8 |
| `format` | `string` (Syncfusion format codes like `'C2'`) | `(value: unknown) => string` (function) |
| `template` | Syncfusion template (string/function) | `(row: Record<string, unknown>) => ReactNode` |
| Type safety | Typed fields | `Record<string, unknown>` |

**Work**:
1. Create `shared/gridTypes.ts` with `BaseColumnDef` that covers the common subset
2. Include: `field`, `headerText`, `width`, `minWidth`, `maxWidth`, `textAlign`, `format`, `template`, `visible`, `type`, `isPrimaryKey`, `allowSorting`, `allowFiltering`, `headerTemplate`
3. Native's `format` should accept both `string` (format codes) and `(value: unknown) => string`
4. Add generic type parameter to TableNative: `TableNative<T>` instead of `Record<string, unknown>`

### Task 3.2: Add Missing Layout/Display Props to TableNative

**Priority**: High | **Effort**: Medium | **Files**: 3+

Missing from native:
- `height: string | number` (default `'auto'`)
- `isLoading: boolean` (loading spinner overlay)
- `allowTextWrap: boolean`
- `rowHeight: number`

### Task 3.3: Add Column Manipulation to TableNative

**Priority**: Medium | **Effort**: Large | **Files**: 5+

Missing from native:
- `allowResizing: boolean` (column resize handles)
- `allowReordering: boolean` (column drag reorder)
- `frozenColumns: number` (freeze left N columns)
- `frozenRows: number` (freeze top N rows)
- `showColumnChooser: boolean` (column visibility dialog)

### Task 3.4: Add Toolbar Support to TableNative

**Priority**: Medium | **Effort**: Medium | **Files**: 3+

Missing from native:
- `toolbar: Array<string | ItemModel>` (toolbar items)
- `onToolbarClick: (args) => void`
- Integration with search, CRUD, and export actions

### Task 3.5: Add Context Menu to TableNative

**Priority**: Low | **Effort**: Medium | **Files**: 3+

Missing from native:
- `contextMenuItems: ContextMenuItem[]`
- `onContextMenuClick: (args) => void`
- Right-click context menu on rows/cells

### Task 3.6: Add Detail/Expand Row Support to TableNative

**Priority**: Medium | **Effort**: Medium | **Files**: 3+

Missing from native:
- `detailTemplate: (data: T) => JSX.Element` (expandable detail rows)
- `childGrid: object` (hierarchical child grids)
- Row expand/collapse UI

### Task 3.7: Add Row Drag and Drop to TableNative

**Priority**: Low | **Effort**: Large | **Files**: 4+

Missing from native:
- `allowRowDragAndDrop: boolean`
- `rowDropSettings: { targetID?: string }`
- `onRowDrag: (args) => void`
- `onRowDrop: (args) => void`

### Task 3.8: Add Virtualization/Performance Features to TableNative

**Priority**: Medium | **Effort**: Large | **Files**: 4+

Missing from native:
- `enableVirtualization: boolean` (render only visible rows)
- `enableColumnVirtualization: boolean`
- `enableInfiniteScrolling: boolean`

### Task 3.9: Add Export/Utility Features to TableNative

**Priority**: Low | **Effort**: Large | **Files**: 5+

Missing from native:
- `enableClipboard: boolean` (copy/paste)
- `searchSettings: { fields?, key?, ignoreCase? }` (global text search)
- `allowPrint: boolean`
- `allowExcelExport: boolean`
- `allowPdfExport: boolean`

### Task 3.10: Add Lifecycle Callbacks to TableNative

**Priority**: Medium | **Effort**: Small | **Files**: 2

Missing from native:
- `onActionBegin: (args) => void` (before any action)
- `onActionComplete: (args) => void` (after any action)

### Task 3.11: Harmonize Config Sub-types

**Priority**: High | **Effort**: Medium | **Files**: 4+

Naming and type inconsistencies:

| DataGrid | TableNative | Differences |
|----------|-------------|-------------|
| `selectionSettings: SelectionSettingsModel` | `selectionConfig: SelectionConfig` | Prop name differs, native type much simpler |
| `editSettings: EditSettingsModel` | `editConfig: EditingConfig` | Prop name differs, native type much simpler |
| `groupSettings: GroupSettingsModel` | `groupConfig: GroupingConfig` | Prop name differs, native type much simpler |
| `pageSettings: PageSettingsModel` | (via gridConfig) | Different architecture |

**Work**:
1. Standardize prop names (recommend `selectionConfig`, `editConfig`, `groupConfig` -- shorter, cleaner)
2. Expand native types to include commonly-used Syncfusion properties:
   - `SelectionConfig`: add `persistSelection`, `enableToggle`, `checkboxOnly`, `checkboxMode`
   - `EditingConfig`: add `showConfirmDialog`, `showDeleteConfirmDialog`
   - `GroupingConfig`: add `showToggleButton`, `showGroupedColumn`, `showUngroupButton`

---

## TIER 4: Create Missing Syncfusion Wrappers

These native components need Syncfusion wrappers for plug-and-play support.

### Task 4.1: Create Syncfusion CheckboxWrapper

**Priority**: High | **Effort**: Small | **Files**: 3

Wraps `CheckBoxComponent` from `@syncfusion/ej2-react-buttons`.

**Props from CheckboxNative to support**: `label`, `helperText`, `error`, `className`, `testId`, `indeterminate`, `required`, `disabled`, checked/onChange via HTML attrs.

Create `shared/checkboxTypes.ts` with `BaseCheckboxProps`, make both extend it.

### Task 4.2: Create Syncfusion RadioWrapper

**Priority**: High | **Effort**: Small | **Files**: 3

Wraps `RadioButtonComponent` from `@syncfusion/ej2-react-buttons`.

**Props from RadioNative to support**: `label`, `helperText`, `error`, `className`, `testId`, `disabled`, name/value/checked/onChange via HTML attrs.

Create `shared/radioTypes.ts` with `BaseRadioProps`, make both extend it.

### Task 4.3: Create Syncfusion AccordionWrapper

**Priority**: Medium | **Effort**: Medium | **Files**: 3

Wraps `AccordionComponent` from `@syncfusion/ej2-react-navigations`.

**Props from AccordionNative to support**: `items: AccordionItem[]`, `testId`, `allowMultiple`, `className`.

Create `shared/accordionTypes.ts` with `BaseAccordionProps`.

### Task 4.4: Create Syncfusion ToolbarWrapper

**Priority**: Medium | **Effort**: Medium | **Files**: 3

Wraps `ToolbarComponent` from `@syncfusion/ej2-react-navigations`.

**Props from ToolbarNative to support**: `items: ToolbarItem[]`, `ariaLabel`, `testId`, `className`.

Create `shared/toolbarTypes.ts` with `BaseToolbarProps`.

### Task 4.5: Create Syncfusion MenuWrapper

**Priority**: Medium | **Effort**: Medium | **Files**: 3

Wraps `MenuComponent` from `@syncfusion/ej2-react-navigations`.

**Props from MenuNative to support**: `items: MenuItem[]`, `ariaLabel`, `testId`, `className`.

Create `shared/menuTypes.ts` with `BaseMenuProps`.

### Task 4.6: Create Syncfusion BreadcrumbWrapper

**Priority**: Medium | **Effort**: Medium | **Files**: 3

Wraps `BreadcrumbComponent` from `@syncfusion/ej2-react-navigations`.

**Props from BreadcrumbNative to support**: `items: BreadcrumbItem[]`, `separator`, `ariaLabel`, `testId`, `className`, `onItemClick`.

Create `shared/breadcrumbTypes.ts` with `BaseBreadcrumbProps`.

### Task 4.7: Create Syncfusion ToggleWrapper (Switch)

**Priority**: Medium | **Effort**: Small | **Files**: 3

Wraps `SwitchComponent` from `@syncfusion/ej2-react-buttons`.

**Props from ToggleNative to support**: `checked`, `onChange`, `label`, `disabled`, `testId`, `className`.

Create `shared/toggleTypes.ts` with `BaseToggleProps`.

### Task 4.8: Create Syncfusion IconButtonWrapper

**Priority**: Medium | **Effort**: Small | **Files**: 3

Wraps `ButtonComponent` from `@syncfusion/ej2-react-buttons` in icon-only mode.

**Props from IconButtonNative to support**: `variant`, `size`, `className`, `testId`, `ariaLabel` (required), `loading`, `icon`, `disabled`.

Shared `BaseIconButtonProps` already exists -- use it.

### Task 4.9: Create Syncfusion FabWrapper

**Priority**: Low | **Effort**: Small | **Files**: 3

Wraps `FabComponent` from `@syncfusion/ej2-react-buttons`.

**Props from FabNative to support**: `className`, `testId`, `icon`, `label`, `position`, `ariaLabel` (required), `disabled`.

Shared `BaseFabProps` already exists -- use it.

### Task 4.10: Create Syncfusion SplitButtonWrapper

**Priority**: Low | **Effort**: Medium | **Files**: 3

Wraps `SplitButtonComponent` from `@syncfusion/ej2-react-splitbuttons`.

**Props from SplitButtonNative to support**: `className`, `testId`, `items`, `children`, `onItemClick`, `onClick`, `primaryAriaLabel`, `triggerAriaLabel`, `disabled`.

Shared `BaseSplitButtonProps` already exists -- use it.

### Task 4.11: Create Syncfusion ChipWrapper

**Priority**: Low | **Effort**: Small | **Files**: 3

Wraps `ChipListComponent` from `@syncfusion/ej2-react-buttons`.

**Props from ChipNative to support**: `children` (label text), `variant`, `removable`, `onClick`, `onRemove`, `disabled`, `testId`, `className`.

Create `shared/chipTypes.ts` with `BaseChipProps`.

---

## TIER 5: Native-Only Components (No Syncfusion Equivalent)

These components have no Syncfusion library equivalent. They stay native-only.

| Component | Reason |
|-----------|--------|
| **ThemeToggleNative** | Highly specialized animated sun/moon toggle -- unique to this app |
| **HeadingNative** | Typography primitive driven by CSS custom properties |
| **TextNative** | Typography primitive driven by CSS custom properties |
| **ToastNative** | Context-based toast system (ToastProvider + useToast hook) |

No Syncfusion wrappers needed. These remain native-only exports.

---

## CROSS-CUTTING TASKS

### Task X.1: Fix Syncfusion Select `disabled` Bug

**Priority**: Critical | **Effort**: Tiny | **Files**: 1

The Syncfusion Select inherits `disabled` from `BaseSelectProps` but never translates it to `enabled` for the underlying `DropDownListComponent`. Passing `disabled={true}` has no effect.

**Fix**: Destructure `disabled` from props, pass `enabled={!disabled}` to DropDownListComponent.

### Task X.2: Unify AlertSeverity Enum Source

**Priority**: High | **Effort**: Tiny | **Files**: 2

`AlertSeverity` is defined in TWO places:
- `syncfusion/Alert/alertSeverity.ts` (used by Syncfusion Alert)
- `shared/alertTypes.ts` (used by AlertNative)

**Fix**: Delete the Syncfusion-local copy, import from shared.

### Task X.3: Wire Up Unused Shared Base Types

**Priority**: Medium | **Effort**: Medium | **Files**: 10+

These shared base types exist but are NOT used by either component:
- `BaseButtonProps` (in `shared/buttonTypes.ts`)
- `BaseIconButtonProps` (in `shared/iconButtonTypes.ts`)
- `BaseFabProps` (in `shared/fabTypes.ts`)
- `BaseSplitButtonProps` (in `shared/splitButtonTypes.ts`)
- `BaseDialogProps` (in `shared/dialogTypes.ts`)
- `BaseAlertProps` (in `shared/alertTypes.ts`)

**Fix**: Make both Syncfusion and Native components extend these shared types (same pattern as Tabs/Timeline/Tag/Badge/Avatar/Card/ProgressBar/Tooltip).

### Task X.4: Standardize `enabled` vs `disabled` Convention

**Priority**: High | **Effort**: Small | **Files**: 5+

Syncfusion components use `enabled` (from Syncfusion models), native components use `disabled` (HTML standard). The shared base types should use `disabled` (HTML convention) and Syncfusion wrappers should translate internally.

**Affects**: Input, Select, DatePicker, and all new Syncfusion wrappers.

### Task X.5: Standardize `onChange` Signatures

**Priority**: High | **Effort**: Medium | **Files**: 8+

Each component pair has a different `onChange` pattern:

| Component | Current Syncfusion | Current Native | Recommended Unified |
|-----------|-------------------|----------------|---------------------|
| Button | `onClick: () => void` | `onClick: MouseEventHandler` | `onClick: (e?: MouseEvent) => void` |
| Input | `change: ChangedEventArgs` (Syncfusion) | `onChange: ChangeEventHandler` (HTML) | `onChange: (value: string) => void` |
| Select | `onChange: (value: string \| number) => void` | Same (via BaseSelectProps) | Already unified |
| DatePicker | `onChange: (date: Date \| undefined) => void` | `onChange: ChangeEventHandler` (HTML) | `onChange: (date: Date \| null) => void` |

**Fix**: Add unified `onChange` to each shared base type. Wrappers translate internally.

---

## Recommended Priority Order

1. **Task X.1** - Fix Syncfusion Select disabled bug (Critical, tiny fix)
2. **Task X.2** - Unify AlertSeverity enum (High, tiny)
3. **Task X.4** - Standardize enabled/disabled convention (High, affects many)
4. **Task X.5** - Standardize onChange signatures (High, enables interop)
5. **Task 2.3** - Harmonize Input props (High, core form component)
6. **Task 2.4** - Harmonize Select props (High, core form component)
7. **Task 2.5** - Harmonize DatePicker props (High, core form component)
8. **Task 2.1** - Harmonize Alert props (Medium)
9. **Task 2.2** - Harmonize Button family props (Medium)
10. **Task X.3** - Wire up unused shared base types (Medium, structural)
11. **Task 4.1** - Create Syncfusion Checkbox wrapper (High)
12. **Task 4.2** - Create Syncfusion Radio wrapper (High)
13. **Task 4.3-4.7** - Create remaining Syncfusion navigation wrappers (Medium)
14. **Task 4.8-4.11** - Create remaining Syncfusion button/chip wrappers (Low-Medium)
15. **Task 1.1-1.2** - Quick wins: Description/Dialog cleanup (Low)
16. **Task 3.1** - Harmonize DataGrid/Table column types (Critical, largest effort)
17. **Task 3.2-3.11** - Implement missing DataGrid features in TableNative (staged)

---

## Appendix A: Full Component Inventory

### Syncfusion Components (16)
Button, Input, Select, DataGrid, DatePicker, Description, Dialog, Alert, Tabs, Timeline, Tag, Badge, Avatar, Card, ProgressBar, Tooltip

### Native Components (31)
ButtonNative, InputNative, SelectNative, CheckboxNative, DatePickerNative, DialogNative, AlertNative, TableNative, AccordionNative, ToolbarNative, MenuNative, BreadcrumbNative, ToggleNative, ToastNative (Provider+Hook), TabsNative, TimelineNative, TagNative, BadgeNative, AvatarNative, CardNative, ProgressBarNative, TooltipNative, ThemeToggleNative, DescriptionNative, HeadingNative, TextNative, IconButtonNative, FabNative, SplitButtonNative, RadioNative, ChipNative

### Mapping Table

| # | Syncfusion | Native | Parity Status |
|---|-----------|--------|---------------|
| 1 | Button | ButtonNative | Gaps (Task 2.2) |
| 2 | Input | InputNative | Gaps (Task 2.3) |
| 3 | Select | SelectNative | Gaps + Bug (Task 2.4, X.1) |
| 4 | DataGrid | TableNative | Major gaps (Tier 3) |
| 5 | DatePicker | DatePickerNative | Gaps (Task 2.5) |
| 6 | Dialog | DialogNative | Aligned (minor cleanup Task 1.2) |
| 7 | Alert | AlertNative | Gaps (Task 2.1) |
| 8 | SyncfusionTabs | TabsNative | Aligned |
| 9 | SyncfusionTimeline | TimelineNative | Aligned |
| 10 | SyncfusionTag | TagNative | Aligned |
| 11 | SyncfusionBadge | BadgeNative | Aligned |
| 12 | SyncfusionAvatar | AvatarNative | Aligned |
| 13 | SyncfusionCard | CardNative | Aligned |
| 14 | SyncfusionProgressBar | ProgressBarNative | Aligned |
| 15 | SyncfusionTooltip | TooltipNative | Aligned |
| 16 | SyncfusionDescription | DescriptionNative | Aligned (needs shared type Task 1.1) |
| 17 | -- (needs creation) | CheckboxNative | Task 4.1 |
| 18 | -- (needs creation) | RadioNative | Task 4.2 |
| 19 | -- (needs creation) | AccordionNative | Task 4.3 |
| 20 | -- (needs creation) | ToolbarNative | Task 4.4 |
| 21 | -- (needs creation) | MenuNative | Task 4.5 |
| 22 | -- (needs creation) | BreadcrumbNative | Task 4.6 |
| 23 | -- (needs creation) | ToggleNative | Task 4.7 |
| 24 | -- (needs creation) | IconButtonNative | Task 4.8 |
| 25 | -- (needs creation) | FabNative | Task 4.9 |
| 26 | -- (needs creation) | SplitButtonNative | Task 4.10 |
| 27 | -- (needs creation) | ChipNative | Task 4.11 |
| 28 | N/A | ThemeToggleNative | Native-only (specialized) |
| 29 | N/A | HeadingNative | Native-only (typography) |
| 30 | N/A | TextNative | Native-only (typography) |
| 31 | N/A | ToastNative | Native-only (context system) |

## Appendix B: Detailed Prop Comparison Per Component

### Button vs ButtonNative

**Syncfusion Button props** (extends `Omit<ButtonModel, 'cssClass'>`):
- `variant: ButtonVariant` (opt, default Primary)
- `size: ButtonSize` (opt, default Md)
- `className: string` (opt)
- `testId: string` (opt)
- `ariaLabel: string` (opt)
- `fullWidth: boolean` (opt, default false)
- `loading: boolean` (opt, default false)
- `leftIcon: ReactNode` (opt)
- `rightIcon: ReactNode` (opt)
- `children: ReactNode` (required)
- `onClick: () => void` (opt)
- Inherited: `iconPosition`, `iconCss`, `disabled`, `isPrimary`, `content`, `isToggle`, `enableHtmlSanitizer`, `created`

**ButtonNative props** (extends `Omit<ButtonHTMLAttributes, 'className'>`):
- `variant: ButtonVariant` (opt, default Primary)
- `size: ButtonSize` (opt, default Md)
- `className: string` (opt)
- `testId: string` (opt)
- `ariaLabel: string` (opt)
- `fullWidth: boolean` (opt, default false)
- `loading: boolean` (opt)
- `leftIcon: ReactNode` (opt)
- `rightIcon: ReactNode` (opt)
- `children: ReactNode` (required)
- Inherited: `disabled`, `type`, `onClick: MouseEventHandler`, all HTML button attrs

### Input vs InputNative

**Syncfusion Input props** (extends `Omit<TextBoxModel, 'cssClass' | 'floatLabelType'>`):
- `label: string` (opt)
- `helperText: string` (opt)
- `error: string` (opt)
- `className: string` (opt)
- `testId: string` (opt)
- `fullWidth: boolean` (opt, default false)
- `required: boolean` (opt, default false)
- Inherited: `enabled`, `placeholder`, `value: string`, `type`, `showClearButton`, `multiline`, `width`, `readonly`, `change`/`input`/`blur`/`focus` events

**InputNative props** (extends `BaseInputProps, Omit<InputHTMLAttributes, 'className'>`):
- `label: string` (opt)
- `helperText: string` (opt)
- `error: string` (opt)
- `className: string` (opt)
- `testId: string` (opt)
- `fullWidth: boolean` (opt, default false)
- `required: boolean` (opt, default false)
- Inherited: `disabled`, `placeholder`, `value: string|number|readonly string[]`, `type`, `name`, `readOnly`, `onChange`, `onFocus`, `onBlur`, all HTML input attrs

### Select vs SelectNative

**Syncfusion Select props** (extends `BaseSelectProps, Omit<DropDownListModel, ...>`):
- All BaseSelectProps: `options`, `label`, `helperText`, `error`, `placeholder`, `className`, `testId`, `fullWidth`, `required`, `disabled`, `value`, `onChange`
- Overrides: `options: SelectOption[]` (adds index signature)
- Inherited: `enabled`, `sortOrder`, `allowFiltering`, `filterBarPlaceholder`, `filterType`, templates, popup sizing, Syncfusion events

**SelectNative props** (extends `BaseSelectProps`):
- All BaseSelectProps (same as above)
- `searchable: boolean` (opt, default false)
- `name: string` (opt)

### DatePicker vs DatePickerNative

**Syncfusion DatePicker props** (extends `Omit<DatePickerModel, 'cssClass' | 'floatLabelType'>`):
- `label`, `helperText`, `error`, `className`, `testId`, `fullWidth`, `required`
- `onChange: (date: Date | undefined) => void` (opt)
- Inherited: `placeholder` (default 'Select a date'), `value: Date`, `format: string` (default 'MM/dd/yyyy'), `enabled`, `min: Date`, `max: Date`, `strictMode`, `showClearButton`, `allowEdit`, `start`, `depth`, `firstDayOfWeek`, `readonly`

**DatePickerNative props** (extends `BaseDatePickerProps, Omit<InputHTMLAttributes, ...>`):
- `label`, `helperText`, `error`, `placeholder`, `className`, `testId`, `fullWidth`, `required`
- `minDate: string` (opt, YYYY-MM-DD)
- `maxDate: string` (opt, YYYY-MM-DD)
- Inherited: `disabled`, `value: string`, `name`, `readOnly`, `onChange: ChangeEventHandler`, all HTML input attrs

### Dialog vs DialogNative

**Syncfusion Dialog props** (extends `Omit<DialogModel, 'buttons' | 'cssClass' | 'content'>`):
- `title: string` (required)
- `children: ReactNode` (required)
- `isOpen: boolean` (required)
- `onClose: () => void` (required)
- `variant: DialogVariant` (opt, default Default)
- `primaryButton: DialogButton` (opt)
- `secondaryButton: DialogButton` (opt)
- `className: string` (opt)
- `testId: string` (opt)
- `width: string | number` (opt, default '400px')
- `showCloseIcon: boolean` (opt, default true)
- `closeOnOverlayClick: boolean` (opt, default true)
- Inherited: `allowDragging`, `animationSettings`, `enableResize`, `minHeight`, `height`, `isModal`, `closeOnEscape`, `position`, `target`, `zIndex`, etc.

**DialogNative props** (standalone interface):
- Identical explicit props as above (same names, types, defaults)
- No Syncfusion model inheritance

### Alert vs AlertNative

**Syncfusion Alert props**:
- `severity: AlertSeverity` (opt, default Info)
- `displayVariant: AlertDisplayVariant` (opt, default Filled)
- `showCloseIcon: boolean` (opt, default false)
- `showIcon: boolean` (opt, default true)
- `className: string` (opt)
- `testId: string` (opt)
- `children: ReactNode` (required)

**AlertNative props**:
- `severity: AlertSeverity` (opt, default Info)
- `title: string` (opt)
- `children: ReactNode` (required)
- `dismissible: boolean` (opt, default false)
- `onDismiss: () => void` (opt)
- `showIcon: boolean` (opt, default true)
- `className: string` (opt)
- `testId: string` (opt)

### DataGrid vs TableNative

See Tier 3 section above for the full 49-prop vs 23-prop breakdown and 39-gap analysis.
