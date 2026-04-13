# Custom ESLint Rules Reference

All custom ESLint rules for SyncfusionThemeStudio. Each rule includes the problem it prevents, bad/good examples, and auto-fix availability.

---

## Table of Contents

### Custom Plugin Rules
1. [smart-max-lines](#smart-max-lines)
2. [no-null-check](#no-null-check)
3. [i18n-interpolation](#i18n-interpolation)
4. [enforce-lazy-preload](#enforce-lazy-preload)
5. [prefer-const-enum](#prefer-const-enum)
6. [enum-file-isolation](#enum-file-isolation)
7. [require-stable-hook-args](#require-stable-hook-args)
8. [no-barrel-companion-file](#no-barrel-companion-file)
9. [no-duplicate-nav-prefix](#no-duplicate-nav-prefix)
10. [no-inline-svg-icons](#no-inline-svg-icons)
11. [no-optional-undefined](#no-optional-undefined)
12. [enforce-module-structure](#enforce-module-structure)
13. [enforce-test-colocation](#enforce-test-colocation)
14. [enforce-function-style](#enforce-function-style)

### Inline no-restricted-syntax Rules
15. [No regular enum](#no-regular-enum)
16. [No complex conditions (3+ expressions)](#no-complex-conditions)

---

## Custom Plugin Rules

---

### smart-max-lines

**Severity:** `error` (exceeds max) / `warn` (exceeds recommended)
**Auto-fix:** No

**Why this rule exists:**
Long functions and components become difficult to read, test, and review. By enforcing line limits (200 for React components, 50 for functions, warning at 30), the rule nudges developers to extract logic into focused, testable units. Blank lines and comments are excluded from the count by default.

**Bad:**
```tsx
// Component with 250+ lines — too much logic in one place
const DataGrid = () => {
  const [data, setData] = useState([]);
  // ... 250 lines of mixed concerns: fetching, sorting, rendering ...
  return <table>...</table>;
};
```

**Good:**
```tsx
// Main component delegates to sub-components and hooks
const DataGrid = () => {
  const { data, sort } = useGridData();
  return (
    <table>
      <GridHeader onSort={sort} />
      <GridBody data={data} />
    </table>
  );
};
```

**Thresholds:**

| Function type | Warning | Error |
|---|---|---|
| React component (returns JSX) | — | 200 lines |
| Regular function | 30 lines | 50 lines |

---

### no-null-check

**Severity:** `error`
**Auto-fix:** Yes

**Why this rule exists:**
Checking `!== null` only catches `null`, not `undefined` (and vice versa). In JavaScript, both represent "no value" and frequently appear interchangeably (optional params are `undefined`, API responses may use `null`). Using `isValueDefined()` from `@dloizides/utils` handles both cases consistently, eliminating an entire category of bugs.

**Bad:**
```ts
if (item !== null) { ... }
if (item === undefined) { ... }
```

**Good:**
```ts
if (isValueDefined(item)) { ... }
if (!isValueDefined(item)) { ... }
if (isNullOrUndefined(item)) { ... }
```

**Edge cases:**
- `== null` (loose equality) is NOT flagged because it already catches both null and undefined
- Only `===` and `!==` strict comparisons are caught
- Auto-fix replaces the expression but does NOT add the import — you need to add `import { isValueDefined } from '@dloizides/utils'` yourself

---

### i18n-interpolation

**Severity:** `error`
**Auto-fix:** Yes (non-standard names and single-brace placeholders)

**Why this rule exists:**
The `FM()` translation helper uses positional placeholders (`{{p1}}`, `{{p2}}`, `{{p3}}`). Non-standard names like `{{message}}` or `{{userName}}` won't be interpolated correctly. Single braces `{p1}` also break i18next interpolation. Standardizing ensures translations work across all locales.

**Bad (in JSON translation files):**
```json
{
  "greeting": "Hello {{userName}}, you have {{count}} items",
  "error": "Error: {message}"
}
```

**Good:**
```json
{
  "greeting": "Hello {{p1}}, you have {{p2}} items",
  "error": "Error: {{p1}}"
}
```

**Edge cases:**
- Maximum of 3 unique placeholders per string (FM() only supports `p1`, `p2`, `p3`)
- If more than 3 are needed, refactor into multiple translation keys
- Only runs on JSON files (translation files)

---

### enforce-lazy-preload

**Severity:** `error`
**Auto-fix:** No

**Why this rule exists:**
When a route is loaded with `React.lazy()` but not preloaded, users see a loading spinner on first navigation. The preload function triggers background `import()` calls so bundles are already cached when the user navigates. Forgetting to add a new route to the preload function is a common oversight.

**Bad:**
```ts
const Settings = lazy(() => import('./pages/Settings'));
const Profile = lazy(() => import('./pages/Profile'));

// No preload function — users wait for bundle download on navigation
```

**Good:**
```ts
const Settings = lazy(() => import('./pages/Settings'));
const Profile = lazy(() => import('./pages/Profile'));

const preloadRoutePages = () => {
  import('./pages/Settings').catch(() => undefined);
  import('./pages/Profile').catch(() => undefined);
};
```

**Three checks:**
1. **missingPreload** — lazy route not in preload function
2. **missingPreloadFn** — file has lazy routes but no preload function at all
3. **stalePreload** — preload has an import with no matching lazy route (dead code)

---

### prefer-const-enum

**Severity:** `warn`
**Auto-fix:** No (provides a suggestion)

**Why this rule exists:**
String literal union types (`type Mode = 'light' | 'dark'`) provide no autocomplete in IDE, no rename-refactoring support, and scatter the same strings across the codebase. `const enum` values are inlined at build time (zero runtime cost) while providing full IDE support.

**Bad:**
```ts
type Mode = 'light' | 'dark';
export type Status = 'active' | 'inactive' | 'pending';
```

**Good:**
```ts
const enum Mode {
  Light = 'light',
  Dark = 'dark',
}

export const enum Status {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
}
```

**Not flagged:**
- Union of type references: `type Result = Success | Error`
- Unions containing non-string types: `type Mixed = 'a' | number`
- Single-value types: `type Single = 'only'`
- Function types: `type Callback = () => void`

---

### enum-file-isolation

**Severity:** `warn`
**Auto-fix:** No

**Why this rule exists:**
When an enum shares a file with unrelated exports, importing the enum also pulls in everything else — hurting tree-shaking and making the import graph unclear. Dedicated enum files make dependencies explicit and allow bundlers to eliminate unused code.

**Bad:**
```ts
// settings.ts — enum mixed with unrelated code
export const enum ExportType { Csv = 'csv', Excel = 'excel' }
export interface TableColumn { name: string; width: number }
```

**Good:**
```ts
// export-type.ts — dedicated file
export const enum ExportType { Csv = 'csv', Excel = 'excel' }
```
```ts
// settings.ts — no enum clutter
export interface TableColumn { name: string; width: number }
```

**Allowed:** Related helpers (functions/types that reference the enum by name) can stay in the same file:
```ts
export const enum MenuStatus { Active = 'active', Inactive = 'inactive' }
export const menuStatusToLabel = (s: MenuStatus): string => { ... };
// ^ References MenuStatus — allowed in same file
```

---

### require-stable-hook-args

**Severity:** `error`
**Auto-fix:** No

**Why this rule exists:**
Functions, objects, and arrays declared in component scope create a new reference on every render. When passed to a custom hook that puts them in a `useEffect` dependency array, this triggers an infinite re-render loop — one of the most common and hard-to-debug React bugs.

**Bad:**
```tsx
const MyComponent = () => {
  const config = { theme: 'dark' };       // new object every render
  const format = (v: string) => v.trim();  // new function every render
  useMyHook(config, format);               // infinite loop!
};
```

**Good:**
```tsx
const MyComponent = () => {
  const config = useMemo(() => ({ theme: 'dark' }), []);
  const format = useCallback((v: string) => v.trim(), []);
  useMyHook(config, format);  // stable references
};
```

**Not flagged:**
- React built-in hooks (useState, useEffect, useMemo, etc.)
- Well-known library hooks (useQuery, useSelector, useForm, etc.)
- Values initialized with useCallback, useMemo, useRef, useState, etc.

---

### no-barrel-companion-file

**Severity:** `error`
**Auto-fix:** Yes (when file is pure re-exports)

**Why this rule exists:**
When `types.ts` exists alongside `types/index.ts`, TypeScript resolves `import from './types'` to `types.ts` (the file), NOT `types/index.ts` (the barrel). This creates a silent resolution conflict where exports added to the barrel directory are invisible to importers — causing "has no exported member" errors that are extremely confusing to debug.

**Bad:**
```
src/
  types.ts          <-- TypeScript resolves here
  types/
    index.ts        <-- This is IGNORED
    newType.ts
```

**Good (option A — remove companion):**
```
src/
  types/
    index.ts        <-- Resolves correctly
    newType.ts
```

**Good (option B — passthrough):**
```ts
// types.ts — pure re-export, auto-fixed by the rule
export * from './types/index';
```

---

### no-duplicate-nav-prefix

**Severity:** `error`
**Auto-fix:** No

**Why this rule exists:**
`NavExpandableItem` highlights when `location.pathname.startsWith(pathPrefix)`. If two nav items share the same prefix, both highlight at once — confusing users about which section they're in.

**Bad:**
```ts
const navItems = [
  { label: 'Settings', pathPrefix: '/settings' },
  { label: 'Advanced', pathPrefix: '/settings' },  // duplicate!
];
```

**Good:**
```ts
const navItems = [
  { label: 'Settings', pathPrefix: '/settings/general' },
  { label: 'Advanced', pathPrefix: '/settings/advanced' },
];
```

**Scoped to:** `src/components/layout/Sidebar/sidebarNavData.ts`

---

### no-inline-svg-icons

**Severity:** `warn`
**Auto-fix:** No

**Why this rule exists:**
SVG icon components defined outside `src/components/icons/` get duplicated across bundles and bypass Vite's code-splitting. Centralizing icons in `AppIcons.tsx`, `SettingsIcons.tsx`, or `ShowcaseIcons.tsx` enables deduplication and natural chunk splitting.

**Bad:**
```tsx
// DataGrid/GridToolbar.tsx
export const FilterIcon = () => (
  <svg viewBox="0 0 24 24">...</svg>
);
```

**Good:**
```tsx
// components/icons/AppIcons.tsx
export const FilterIcon = () => (
  <svg viewBox="0 0 24 24">...</svg>
);

// DataGrid/GridToolbar.tsx
import { FilterIcon } from '@/components/icons';
```

**Exceptions:** Stateful mini-components that happen to contain SVG (e.g., `ThemeToggleNative`, `SelectNative`) are exempt via `allowedPatterns`.

---

### no-optional-undefined

**Severity:** `warn`
**Auto-fix:** No

**Why this rule exists:**
With `exactOptionalPropertyTypes: true` in tsconfig, `?: T` and `?: T | undefined` have different semantics. The `?:` marker already means "this key can be omitted." Adding `| undefined` widens the type to also accept `{ key: undefined }` — which is rarely intended and weakens type safety. The correct fix is to use `?: T` and omit the key entirely when there's no value.

**Bad:**
```ts
interface Config {
  pageCount?: number | undefined;
}

function load(path?: string | undefined) { ... }
```

**Good:**
```ts
interface Config {
  pageCount?: number;
}

function load(path?: string) { ... }
```

---

### enforce-module-structure

**Severity:** `error`
**Auto-fix:** No

**Why this rule exists:**
When a feature directory grows beyond 3 files, a flat structure becomes hard to navigate. Enforcing standard subdirectories (`hooks/`, `components/`, `utils/`, `data/`) makes it immediately obvious where to find or add files — every developer uses the same mental model.

**Bad (8 files at root):**
```
DataGrid/
  index.tsx
  types.ts
  useGridCallbacks.ts       <-- hook at root
  useGridSelection.ts       <-- hook at root
  GridHeader.tsx             <-- sub-component at root
  GridBody.tsx               <-- sub-component at root
  pageSettingsHelpers.ts     <-- util at root
  gridData.ts                <-- data at root
```

**Good:**
```
DataGrid/
  index.tsx
  types.ts
  hooks/
    useGridCallbacks.ts
    useGridSelection.ts
  components/
    GridHeader.tsx
    GridBody.tsx
  utils/
    pageSettingsHelpers.ts
  data/
    gridData.ts
```

**Threshold:** Only enforced when directory has 4+ non-test source files. Small modules (1-3 files) are left alone.

**Flat-exempt directories** (no reorganization enforced): `shared/`, `presets/`, `defaults/`, `injectors/`, `types/`, `actions/`, `icons/`, `errors/`, `interceptors/`, `events/`, `routes/`, `utils/`, `components/`, `form-fields/`

**Component-exempt directories** (`.tsx` files are not flagged as sub-components): `sections/`, `forms/` — these contain page sections and form components as primary content, not reusable sub-components

---

### enforce-test-colocation

**Severity:** `error`
**Auto-fix:** No

**Why this rule exists:**
Tests in `__tests__/` directories are disconnected from their source files. You can't tell at a glance which files have test coverage, and file navigation requires extra mental mapping. Co-locating tests next to source (`useX.test.ts` beside `useX.ts`) makes coverage gaps immediately visible in the file explorer.

**Bad:**
```
DataGrid/
  hooks/
    useGridCallbacks.ts
  __tests__/
    useGridCallbacks.test.ts    <-- disconnected from source
```

**Good:**
```
DataGrid/
  hooks/
    useGridCallbacks.ts
    useGridCallbacks.test.ts    <-- right next to source
```

---

### enforce-function-style

**Severity:** `warn`
**Auto-fix:** No

**Why this rule exists:**
This rule has two checks:

**Check 1 — Function declarations over const arrows (for multi-statement functions):**
Function declarations are hoisted (available anywhere in the file), making top-level code easier to reorganize. They also show the function name prominently in diffs and stack traces. Single-expression arrows remain fine for concise one-liners.

**Bad:**
```ts
const processData = (items: Item[]) => {
  const filtered = items.filter(isValid);
  const sorted = filtered.sort(byName);
  return sorted.map(format);
};
```

**Good:**
```ts
function processData(items: Item[]) {
  const filtered = items.filter(isValid);
  const sorted = filtered.sort(byName);
  return sorted.map(format);
}
```

**Check 2 — Statement ordering (exports > private functions > constants):**
Putting exports first makes the module's public API visible at a glance without scrolling. Private helpers come next, then constants at the bottom.

**Bad:**
```ts
const MAX_RETRIES = 3;                    // constant first
function validateInput(data: Data) {}     // private function second
export function processData() {}          // export last — buried
```

**Good:**
```ts
export function processData() {}          // public API first
function validateInput(data: Data) {}     // private helpers
const MAX_RETRIES = 3;                    // constants last
```

**Exceptions:** React components (JSX return), closures/callbacks, and statements with forward-reference dependencies are exempt.

---

## Inline no-restricted-syntax Rules

These rules are defined inline in `eslint.config.mjs` using AST selectors.

---

### No regular enum

**Selector:** `TSEnumDeclaration:not([const])`
**Severity:** `error`

**Why:** Regular `enum` declarations emit runtime JavaScript objects that can't be tree-shaken. `const enum` values are inlined at the call site by TypeScript, producing zero runtime overhead.

**Bad:**
```ts
enum Direction {
  Up = 'up',
  Down = 'down',
}
```

**Good:**
```ts
const enum Direction {
  Up = 'up',
  Down = 'down',
}
```

---

### No complex conditions

**Selectors:** Applied to `IfStatement`, `ConditionalExpression`, and `WhileStatement`
**Severity:** `error`

**Why:** Conditions with 3+ boolean expressions (`a && b && c`) are hard to read, debug, and name. Extracting to a descriptive variable makes the intent clear and gives you a named value to inspect in the debugger.

**Bad:**
```ts
if (isLoaded && hasPermission && !isDisabled) { ... }

const result = a && b || c ? 'yes' : 'no';

while (hasNext && !isComplete && count < max) { ... }
```

**Good:**
```ts
const canProceed = isLoaded && hasPermission;
if (canProceed && !isDisabled) { ... }

const isEligible = (a && b) || c;
const result = isEligible ? 'yes' : 'no';

const shouldContinue = hasNext && !isComplete;
while (shouldContinue && count < max) { ... }
```
