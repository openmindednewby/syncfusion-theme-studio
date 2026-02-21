# Component Showcase Pages - Dedicated Per-Component Pages

> **Project**: SyncfusionThemeStudio
> **Status**: TODO
> **Priority**: Medium
> **Estimated Agents**: 8-15 parallel agents

## Problem Statement

Currently, all native components are showcased on a single `NativeComponentsPage` (`/dashboard/components/native`) and all Syncfusion components are on a single `SyncfusionComponentsPage` (`/dashboard/components/syncfusion`). The only component with its own dedicated showcase page is the **Grid** (`/dashboard/components/grid/native` and `/dashboard/components/grid/syncfusion`).

Each component needs its own dedicated showcase page with comprehensive demonstrations of all states, variants, features, and interactive behaviors - following the same sidebar nesting pattern established by the Grid showcase.

## Current State

### Existing Pages
| Page | Route | Components Shown |
|------|-------|-----------------|
| NativeComponentsPage | `/dashboard/components/native` | ALL 13 native components on ONE page |
| SyncfusionComponentsPage | `/dashboard/components/syncfusion` | ALL Syncfusion components on ONE page |
| NativeGridShowcase | `/dashboard/components/grid/native` | Grid only (dedicated) |
| SyncfusionGridShowcase | `/dashboard/components/grid/syncfusion` | Grid only (dedicated) |

### Component Inventory

**Native Components (14 total, in `src/components/ui/native/`):**
1. AccordionNative
2. AlertNative
3. BreadcrumbNative
4. ButtonNative
5. CheckboxNative
6. DatePickerNative
7. DialogNative
8. InputNative
9. MenuNative
10. SelectNative
11. TableNative (Grid - DONE)
12. ToastNative
13. ToggleNative
14. ToolbarNative

**Syncfusion Components (7 total, in `src/components/ui/syncfusion/`):**
1. Alert
2. Button
3. DataGrid (Grid - DONE)
4. DatePicker
5. Dialog
6. Input
7. Select

### Components Needing Dedicated Pages

**Paired (both native + syncfusion exist) - 6 component types:**
| Component Type | Native Component | Syncfusion Component |
|---------------|-----------------|---------------------|
| Button | ButtonNative | Button |
| Input | InputNative | Input |
| Select | SelectNative | Select |
| DatePicker | DatePickerNative | DatePicker |
| Dialog | DialogNative | Dialog |
| Alert | AlertNative | Alert |

**Native-only - 7 components:**
| Component | Notes |
|-----------|-------|
| CheckboxNative | Toggle/checkbox states |
| ToastNative | Notification toasts |
| ToggleNative | On/off toggle switch |
| ToolbarNative | Action toolbar |
| MenuNative | Dropdown/context menu |
| AccordionNative | Expandable sections |
| BreadcrumbNative | Navigation breadcrumbs |

## Target Sidebar Structure

Following the Grid pattern (`indent: true` under parent):

```
Components (expandable)
  Syncfusion          /dashboard/components/syncfusion (overview)
    Grid Syncfusion     /dashboard/components/grid/syncfusion (indent)
    Button Syncfusion   /dashboard/components/button/syncfusion (indent)
    Input Syncfusion    /dashboard/components/input/syncfusion (indent)
    Select Syncfusion   /dashboard/components/select/syncfusion (indent)
    DatePicker SF       /dashboard/components/datepicker/syncfusion (indent)
    Dialog Syncfusion   /dashboard/components/dialog/syncfusion (indent)
    Alert Syncfusion    /dashboard/components/alert/syncfusion (indent)
  Native              /dashboard/components/native (overview)
    Grid Native         /dashboard/components/grid/native (indent)
    Button Native       /dashboard/components/button/native (indent)
    Input Native        /dashboard/components/input/native (indent)
    Select Native       /dashboard/components/select/native (indent)
    Checkbox Native     /dashboard/components/checkbox/native (indent)
    DatePicker Native   /dashboard/components/datepicker/native (indent)
    Dialog Native       /dashboard/components/dialog/native (indent)
    Alert Native        /dashboard/components/alert/native (indent)
    Toast Native        /dashboard/components/toast/native (indent)
    Toggle Native       /dashboard/components/toggle/native (indent)
    Toolbar Native      /dashboard/components/toolbar/native (indent)
    Menu Native         /dashboard/components/menu/native (indent)
    Accordion Native    /dashboard/components/accordion/native (indent)
    Breadcrumb Native   /dashboard/components/breadcrumb/native (indent)
```

## Route Pattern

Following the Grid showcase pattern:

```typescript
// routePath.ts - add for each component type:
ComponentsButton = '/dashboard/components/button',
ComponentsButtonNative = '/dashboard/components/button/native',
ComponentsButtonSyncfusion = '/dashboard/components/button/syncfusion',
// ... repeat for input, select, datepicker, dialog, alert
// Native-only:
ComponentsCheckbox = '/dashboard/components/checkbox',
ComponentsCheckboxNative = '/dashboard/components/checkbox/native',
// ... repeat for toast, toggle, toolbar, menu, accordion, breadcrumb

// routeSegment.ts - add for each:
ComponentsButton = 'components/button',
ComponentsButtonNative = 'components/button/native',
ComponentsButtonSyncfusion = 'components/button/syncfusion',
// ... etc.
```

## Page Structure Pattern

Each showcase page follows the NativeGridShowcase pattern:

```
src/features/components/pages/
  NativeButtonShowcase/
    index.tsx            # Page component (default export)
    sections/
      index.ts           # Barrel export
      VariantsSection.tsx # All button variants
      SizesSection.tsx    # All button sizes
      StatesSection.tsx   # Disabled, loading, etc.
    sampleData.ts        # Sample data if needed
  SyncfusionButtonShowcase/
    index.tsx
    sections/
      index.ts
      VariantsSection.tsx
      SizesSection.tsx
      StatesSection.tsx
```

### Page Component Pattern
```tsx
import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';
import { VariantsSection, SizesSection, StatesSection } from './sections';

const NativeButtonShowcase = (): JSX.Element => (
  <div className="h-full overflow-y-auto p-6" data-testid={TestIds.NATIVE_BUTTON_SHOWCASE}>
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">
          {FM('components.buttonShowcase.nativeTitle')}
        </h2>
        <p className="mt-1 text-text-secondary">
          {FM('components.buttonShowcase.nativeDescription')}
        </p>
      </div>
      <VariantsSection />
      <SizesSection />
      <StatesSection />
    </div>
  </div>
);

export default NativeButtonShowcase;
```

### Section Component Pattern
```tsx
import { memo } from 'react';
import { ButtonNative, ButtonVariant } from '@/components/ui/native';
import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';

export const VariantsSection = memo((): JSX.Element => (
  <section className="card space-y-4">
    <div>
      <h3 className="text-lg font-semibold text-text-primary">
        {FM('components.buttonShowcase.sections.variants')}
      </h3>
      <p className="mt-1 text-sm text-text-secondary">
        {FM('components.buttonShowcase.sections.variantsDesc')}
      </p>
    </div>
    <div className="flex flex-wrap gap-4">
      {/* Demonstrate all variants */}
    </div>
  </section>
));
VariantsSection.displayName = 'VariantsSection';
```

## Implementation Tasks

### TASK 1: Infrastructure Setup (PREREQUISITE - must complete first)

**Agent**: `frontend-dev`
**Scope**: Route definitions, sidebar, testIds, i18n keys, preload orchestrator

**Files to modify:**
1. `src/app/routes/routePath.ts` - Add all new RoutePath entries
2. `src/app/routes/routeSegment.ts` - Add all new RouteSegment entries
3. `src/app/router.tsx` - Add lazy imports + route definitions for all 19 new pages
4. `src/components/layout/Sidebar/index.tsx` - Add all indented children entries to COMPONENTS_CHILDREN
5. `src/shared/testIds.ts` - Add page + navigation testIds for all new pages
6. `src/localization/locales/en.json` - Add all showcase page title/description + sidebar label i18n keys
7. `src/config/preloadOrchestrator.ts` - Add new page imports to preload phases

**Route entries to add (13 component types = 13 redirect + 19 pages):**

Paired components (6 types x 3 routes each = 18 routes):
- `components/button` (redirect) + `components/button/native` + `components/button/syncfusion`
- `components/input` (redirect) + `components/input/native` + `components/input/syncfusion`
- `components/select` (redirect) + `components/select/native` + `components/select/syncfusion`
- `components/datepicker` (redirect) + `components/datepicker/native` + `components/datepicker/syncfusion`
- `components/dialog` (redirect) + `components/dialog/native` + `components/dialog/syncfusion`
- `components/alert` (redirect) + `components/alert/native` + `components/alert/syncfusion`

Native-only components (7 types x 2 routes each = 14 routes):
- `components/checkbox` (redirect) + `components/checkbox/native`
- `components/toast` (redirect) + `components/toast/native`
- `components/toggle` (redirect) + `components/toggle/native`
- `components/toolbar` (redirect) + `components/toolbar/native`
- `components/menu` (redirect) + `components/menu/native`
- `components/accordion` (redirect) + `components/accordion/native`
- `components/breadcrumb` (redirect) + `components/breadcrumb/native`

**TestIds to add (19 pages + 19 nav items = 38):**
```
NATIVE_BUTTON_SHOWCASE, SYNCFUSION_BUTTON_SHOWCASE, NAV_BUTTON_NATIVE, NAV_BUTTON_SYNCFUSION
NATIVE_INPUT_SHOWCASE, SYNCFUSION_INPUT_SHOWCASE, NAV_INPUT_NATIVE, NAV_INPUT_SYNCFUSION
NATIVE_SELECT_SHOWCASE, SYNCFUSION_SELECT_SHOWCASE, NAV_SELECT_NATIVE, NAV_SELECT_SYNCFUSION
NATIVE_DATEPICKER_SHOWCASE, SYNCFUSION_DATEPICKER_SHOWCASE, NAV_DATEPICKER_NATIVE, NAV_DATEPICKER_SYNCFUSION
NATIVE_DIALOG_SHOWCASE, SYNCFUSION_DIALOG_SHOWCASE, NAV_DIALOG_NATIVE, NAV_DIALOG_SYNCFUSION
NATIVE_ALERT_SHOWCASE, SYNCFUSION_ALERT_SHOWCASE, NAV_ALERT_NATIVE, NAV_ALERT_SYNCFUSION
NATIVE_CHECKBOX_SHOWCASE, NAV_CHECKBOX_NATIVE
NATIVE_TOAST_SHOWCASE, NAV_TOAST_NATIVE
NATIVE_TOGGLE_SHOWCASE, NAV_TOGGLE_NATIVE
NATIVE_TOOLBAR_SHOWCASE, NAV_TOOLBAR_NATIVE
NATIVE_MENU_SHOWCASE, NAV_MENU_NATIVE
NATIVE_ACCORDION_SHOWCASE, NAV_ACCORDION_NATIVE
NATIVE_BREADCRUMB_SHOWCASE, NAV_BREADCRUMB_NATIVE
```

**Sidebar COMPONENTS_CHILDREN (add after existing Grid entries):**
```typescript
// Under Syncfusion:
{ path: RoutePath.ComponentsButtonSyncfusion, labelKey: 'menu.buttonSyncfusion', testId: TestIds.NAV_BUTTON_SYNCFUSION, indent: true },
{ path: RoutePath.ComponentsInputSyncfusion, labelKey: 'menu.inputSyncfusion', testId: TestIds.NAV_INPUT_SYNCFUSION, indent: true },
{ path: RoutePath.ComponentsSelectSyncfusion, labelKey: 'menu.selectSyncfusion', testId: TestIds.NAV_SELECT_SYNCFUSION, indent: true },
{ path: RoutePath.ComponentsDatePickerSyncfusion, labelKey: 'menu.datepickerSyncfusion', testId: TestIds.NAV_DATEPICKER_SYNCFUSION, indent: true },
{ path: RoutePath.ComponentsDialogSyncfusion, labelKey: 'menu.dialogSyncfusion', testId: TestIds.NAV_DIALOG_SYNCFUSION, indent: true },
{ path: RoutePath.ComponentsAlertSyncfusion, labelKey: 'menu.alertSyncfusion', testId: TestIds.NAV_ALERT_SYNCFUSION, indent: true },

// Under Native (after Grid Native):
{ path: RoutePath.ComponentsButtonNative, labelKey: 'menu.buttonNative', testId: TestIds.NAV_BUTTON_NATIVE, indent: true },
{ path: RoutePath.ComponentsInputNative, labelKey: 'menu.inputNative', testId: TestIds.NAV_INPUT_NATIVE, indent: true },
{ path: RoutePath.ComponentsSelectNative, labelKey: 'menu.selectNative', testId: TestIds.NAV_SELECT_NATIVE, indent: true },
{ path: RoutePath.ComponentsCheckboxNative, labelKey: 'menu.checkboxNative', testId: TestIds.NAV_CHECKBOX_NATIVE, indent: true },
{ path: RoutePath.ComponentsDatePickerNative, labelKey: 'menu.datepickerNative', testId: TestIds.NAV_DATEPICKER_NATIVE, indent: true },
{ path: RoutePath.ComponentsDialogNative, labelKey: 'menu.dialogNative', testId: TestIds.NAV_DIALOG_NATIVE, indent: true },
{ path: RoutePath.ComponentsAlertNative, labelKey: 'menu.alertNative', testId: TestIds.NAV_ALERT_NATIVE, indent: true },
{ path: RoutePath.ComponentsToastNative, labelKey: 'menu.toastNative', testId: TestIds.NAV_TOAST_NATIVE, indent: true },
{ path: RoutePath.ComponentsToggleNative, labelKey: 'menu.toggleNative', testId: TestIds.NAV_TOGGLE_NATIVE, indent: true },
{ path: RoutePath.ComponentsToolbarNative, labelKey: 'menu.toolbarNative', testId: TestIds.NAV_TOOLBAR_NATIVE, indent: true },
{ path: RoutePath.ComponentsMenuNative, labelKey: 'menu.menuNative', testId: TestIds.NAV_MENU_NATIVE, indent: true },
{ path: RoutePath.ComponentsAccordionNative, labelKey: 'menu.accordionNative', testId: TestIds.NAV_ACCORDION_NATIVE, indent: true },
{ path: RoutePath.ComponentsBreadcrumbNative, labelKey: 'menu.breadcrumbNative', testId: TestIds.NAV_BREADCRUMB_NATIVE, indent: true },
```

**Success criteria:**
- [ ] All 32 new route entries added (13 redirects + 19 page routes)
- [ ] All 19 lazy imports added in router.tsx (pages don't need to exist yet - lazy() handles that)
- [ ] Sidebar shows all component items nested under Syncfusion/Native
- [ ] TestIds added for all pages and nav items
- [ ] i18n keys added for all sidebar labels and page titles/descriptions
- [ ] Preload orchestrator updated
- [ ] Lint passes
- [ ] Build succeeds (pages can be empty placeholder files initially)

---

### TASK 2: Button Showcase Pages (Native + Syncfusion)

**Agent**: `frontend-dev`
**Blocked by**: Task 1
**Existing sections to extract from**: `NativeButtonsSection`, `ButtonsSection` (Syncfusion)

**Create:**
```
src/features/components/pages/NativeButtonShowcase/
  index.tsx
  sections/
    index.ts
    VariantsSection.tsx    # Primary, Secondary, Outline, Ghost, Danger
    SizesSection.tsx       # Sm, Md, Lg
    StatesSection.tsx      # Disabled, Loading, With Icon
    InteractiveSection.tsx # Click handlers, toggle states

src/features/components/pages/SyncfusionButtonShowcase/
  index.tsx
  sections/
    index.ts
    VariantsSection.tsx    # Primary, Secondary, Outline, Ghost, Danger
    SizesSection.tsx       # Sm, Md, Lg
    StatesSection.tsx      # Disabled, Loading, With Icon
    CssButtonsSection.tsx  # Native CSS-class buttons (btn-primary etc.)
```

**What to showcase per section:**
- All ButtonVariant enum values
- All ButtonSize enum values
- Disabled state
- Loading state (if supported)
- Buttons with icons
- Button groups
- Full-width buttons
- Click handler demonstrations

**Success criteria:**
- [ ] Both pages render without errors
- [ ] All button variants visible
- [ ] All button sizes visible
- [ ] Disabled/loading states shown
- [ ] Uses FM() for all text, TestIds for all testable elements
- [ ] Follows memo + displayName pattern
- [ ] Each section file < 200 lines

---

### TASK 3: Input Showcase Pages (Native + Syncfusion)

**Agent**: `frontend-dev`
**Blocked by**: Task 1
**Existing sections to extract from**: `NativeInputsSection`, `InputsSection` (Syncfusion)

**Create:**
```
src/features/components/pages/NativeInputShowcase/
  index.tsx
  sections/
    index.ts
    BasicInputSection.tsx     # Text, email, password types
    StatesSection.tsx         # Disabled, error, helper text
    InteractiveSection.tsx    # Controlled input with value display

src/features/components/pages/SyncfusionInputShowcase/
  index.tsx
  sections/
    index.ts
    BasicInputSection.tsx     # Text, email, password types
    StatesSection.tsx         # Disabled, error, helper text
    AdvancedInputsSection.tsx # NumericTextBox, MaskedTextBox (move from ComponentsPage)
    InteractiveSection.tsx    # Controlled input with value display
```

**What to showcase:**
- All input types (text, email, password, number)
- Labels and placeholders
- Helper text
- Error states with validation messages
- Disabled state
- Full-width vs fixed-width
- Controlled input with live value display

---

### TASK 4: Select Showcase Pages (Native + Syncfusion)

**Agent**: `frontend-dev`
**Blocked by**: Task 1
**Existing sections to extract from**: `NativeSelectSection`, `InputsSection` (Syncfusion - select portion), `AdvancedDropdownsSection`, `SelectionSection`

**Create:**
```
src/features/components/pages/NativeSelectShowcase/
  index.tsx
  sections/
    index.ts
    BasicSelectSection.tsx    # Standard select with options
    StatesSection.tsx         # Disabled, error, helper text
    InteractiveSection.tsx    # Controlled select with value display

src/features/components/pages/SyncfusionSelectShowcase/
  index.tsx
  sections/
    index.ts
    BasicSelectSection.tsx    # Standard DropDownList
    AdvancedSection.tsx       # MultiSelect, AutoComplete, ComboBox
    StatesSection.tsx         # Disabled, error states
    InteractiveSection.tsx    # Controlled select
```

---

### TASK 5: DatePicker Showcase Pages (Native + Syncfusion)

**Agent**: `frontend-dev`
**Blocked by**: Task 1
**Existing sections to extract from**: `NativeDatePickerSection`, `CalendarsSection`

**Create:**
```
src/features/components/pages/NativeDatePickerShowcase/
  index.tsx
  sections/
    index.ts
    BasicSection.tsx          # Standard date picker
    StatesSection.tsx         # Disabled, error, min/max dates
    InteractiveSection.tsx    # Controlled picker with value display

src/features/components/pages/SyncfusionDatePickerShowcase/
  index.tsx
  sections/
    index.ts
    DatePickerSection.tsx     # DatePickerComponent
    DateRangeSection.tsx      # DateRangePickerComponent
    TimePickerSection.tsx     # TimePickerComponent
    StatesSection.tsx         # Disabled, min/max, error
```

---

### TASK 6: Dialog Showcase Pages (Native + Syncfusion)

**Agent**: `frontend-dev`
**Blocked by**: Task 1
**Existing sections to extract from**: `NativeDialogsSection`, `PopupsSection`

**Create:**
```
src/features/components/pages/NativeDialogShowcase/
  index.tsx
  sections/
    index.ts
    BasicDialogSection.tsx    # Simple open/close dialog
    ConfirmDialogSection.tsx  # Confirm/cancel pattern
    CustomContentSection.tsx  # Dialog with custom content

src/features/components/pages/SyncfusionDialogShowcase/
  index.tsx
  sections/
    index.ts
    BasicDialogSection.tsx    # DialogComponent basic
    ModalSection.tsx          # Modal vs non-modal
    TooltipSection.tsx        # TooltipComponent (from PopupsSection)
```

---

### TASK 7: Alert Showcase Pages (Native + Syncfusion)

**Agent**: `frontend-dev`
**Blocked by**: Task 1
**Existing sections to extract from**: `NativeAlertsSection`, `AlertsSection`

**Create:**
```
src/features/components/pages/NativeAlertShowcase/
  index.tsx
  sections/
    index.ts
    VariantsSection.tsx       # Success, Warning, Error, Info
    FeaturesSection.tsx       # Dismissible, no icon, with title

src/features/components/pages/SyncfusionAlertShowcase/
  index.tsx
  sections/
    index.ts
    FilledSection.tsx         # Filled variant alerts
    OutlinedSection.tsx       # Outlined variant alerts
    TextSection.tsx           # Text variant alerts
    DismissibleSection.tsx    # Dismissible alerts
```

---

### TASK 8: Checkbox Showcase Page (Native only)

**Agent**: `frontend-dev`
**Blocked by**: Task 1
**Existing sections to extract from**: `NativeCheckboxSection`

**Create:**
```
src/features/components/pages/NativeCheckboxShowcase/
  index.tsx
  sections/
    index.ts
    BasicSection.tsx          # Checked, unchecked
    StatesSection.tsx         # Disabled, error, indeterminate
    WithLabelSection.tsx      # Labels, helper text
    InteractiveSection.tsx    # Controlled checkbox group
```

---

### TASK 9: Toast Showcase Page (Native only)

**Agent**: `frontend-dev`
**Blocked by**: Task 1
**Existing sections to extract from**: `NativeNotificationsSection`

**Create:**
```
src/features/components/pages/NativeToastShowcase/
  index.tsx
  sections/
    index.ts
    VariantsSection.tsx       # Success, Warning, Error, Info
    PositionsSection.tsx      # Different toast positions (if supported)
    InteractiveSection.tsx    # Trigger buttons for each toast type
```

---

### TASK 10: Toggle Showcase Page (Native only)

**Agent**: `frontend-dev`
**Blocked by**: Task 1

**Create:**
```
src/features/components/pages/NativeToggleShowcase/
  index.tsx
  sections/
    index.ts
    BasicSection.tsx          # On/off toggle
    StatesSection.tsx         # Disabled, with label
    InteractiveSection.tsx    # Controlled toggle with state display
```

---

### TASK 11: Toolbar Showcase Page (Native only)

**Agent**: `frontend-dev`
**Blocked by**: Task 1
**Existing sections to extract from**: `NativeToolbarSection`

**Create:**
```
src/features/components/pages/NativeToolbarShowcase/
  index.tsx
  sections/
    index.ts
    BasicSection.tsx          # Toolbar with action buttons
    VariantsSection.tsx       # Different toolbar layouts
    InteractiveSection.tsx    # Toolbar with active state tracking
```

---

### TASK 12: Menu Showcase Page (Native only)

**Agent**: `frontend-dev`
**Blocked by**: Task 1
**Existing sections to extract from**: `NativeMenuSection`

**Create:**
```
src/features/components/pages/NativeMenuShowcase/
  index.tsx
  sections/
    index.ts
    BasicSection.tsx          # Simple dropdown menu
    NestedSection.tsx         # Nested/sub-menu items
    InteractiveSection.tsx    # Menu with selection tracking
```

---

### TASK 13: Accordion Showcase Page (Native only)

**Agent**: `frontend-dev`
**Blocked by**: Task 1
**Existing sections to extract from**: `NativeAccordionSection`

**Create:**
```
src/features/components/pages/NativeAccordionShowcase/
  index.tsx
  sections/
    index.ts
    BasicSection.tsx          # Single expand/collapse
    MultipleSection.tsx       # Multiple panels, accordion mode
    InteractiveSection.tsx    # Controlled expand with state display
```

---

### TASK 14: Breadcrumb Showcase Page (Native only)

**Agent**: `frontend-dev`
**Blocked by**: Task 1
**Existing sections to extract from**: `NativeBreadcrumbSection`

**Create:**
```
src/features/components/pages/NativeBreadcrumbShowcase/
  index.tsx
  sections/
    index.ts
    BasicSection.tsx          # Simple breadcrumb trail
    CustomSection.tsx         # Custom separators, icons
    InteractiveSection.tsx    # Dynamic breadcrumb with navigation
```

---

### TASK 15: Quality Gate (ALL domains)

**Agent**: `quality-gate`
**Blocked by**: Tasks 1-14

- [ ] `npm run lint:fix` - 0 errors
- [ ] `npm run test:coverage` - all tests pass
- [ ] `npx expo export --platform web` - build succeeds
- [ ] All new files follow coding standards (< 200 lines for components, < 50 lines for functions)
- [ ] No magic numbers, no hardcoded strings, all FM() for i18n

---

### TASK 16: Regression Testing

**Agent**: `regression-tester`
**Blocked by**: Task 15

- [ ] All existing E2E tests still pass
- [ ] Write E2E tests for navigating to each new showcase page
- [ ] Verify sidebar navigation items work
- [ ] Verify each page renders with correct content

---

## Execution Strategy

### Phase 1: Infrastructure (sequential)
Launch Task 1 (`frontend-dev`) to set up all routes, sidebar, testIds, i18n.

### Phase 2: Showcase Pages (parallel - up to 13 agents)
Once Task 1 completes, launch Tasks 2-14 simultaneously:
- 6 paired agents (Tasks 2-7): Button, Input, Select, DatePicker, Dialog, Alert
- 7 native-only agents (Tasks 8-14): Checkbox, Toast, Toggle, Toolbar, Menu, Accordion, Breadcrumb

### Phase 3: Verification (parallel then sequential)
- Launch `quality-gate` (Task 15)
- If passes, launch `regression-tester` (Task 16)

### Notes on the Overview Pages
- **Keep** `NativeComponentsPage` and `SyncfusionComponentsPage` as overview/summary pages
- Each overview page should remain as-is (showing all components in brief)
- The dedicated showcase pages provide the deep-dive per component
- Users can navigate from overview to dedicated page via sidebar

### Coding Standards Reminders for Agents
- All text via `FM()` (i18n enforcement)
- All interactive elements need `testId` (from TestIds)
- `memo()` + `displayName` for all section components
- `const enum` not regular enum
- Each file < 300 lines, components < 200 lines, functions < 50 lines
- No magic numbers (use named constants)
- Single-statement if/else without braces
- `card` CSS class for section wrappers
- `space-y-4` inside cards, `space-y-8` between sections
- Default export for page components, named exports for sections
