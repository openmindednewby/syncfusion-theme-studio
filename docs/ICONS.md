# Icons

> Back to [README](../README.md)

All reusable SVG icons live in `src/components/icons/`, organized for natural Vite code-splitting:

| File                  | Contents                                        | When Loaded                |
| --------------------- | ----------------------------------------------- | -------------------------- |
| `AppIcons.tsx`        | 28 core icons (sidebar, header, brand)          | Every page                 |
| `SettingsIcons.tsx`   | 19 drawer icons (tabs, import/export, sections) | When settings drawer opens |
| `ShowcaseIcons.tsx`   | 22 demo icons (toolbar, breadcrumb, buttons)    | Demo pages only            |
| `ThemeIcons.tsx`      | 2 theme toggle icons (sun/moon)                 | Header                     |
| `FeatherIconsA–Z.tsx` | 270 auto-generated Feather icons (25 files)     | On demand (tree-shaken)    |
| `CustomIcons.tsx`     | 17 custom media/action icons + aliases          | On demand                  |

**Supporting files:** `types.ts` (shared `IconProps` interface), `index.ts` (barrel re-export), `featherIconEntries.ts` (icon list for showcase page).

**Total: 357 icon components** available.

---

## Generation Script

The Feather icons are auto-generated from the `feather-icons` npm package (devDependency):

```bash
# Regenerate all Feather icon files
node scripts/generate-feather-icons.mjs
```

The script:

1. Reads all SVG icons from the `feather-icons` package
2. Converts them to React TSX components matching the project pattern (`defaults` spread, `IconProps`, `currentColor`)
3. Splits output into alphabetical files (A–Z) to stay under the 300-line ESLint limit
4. Skips 18 icons already defined in `AppIcons.tsx` to avoid duplicates

---

## Rules

- **All new icons go in `src/components/icons/`** — never define inline SVGs in feature files. The ESLint rule `no-inline-svg-icons` enforces this automatically.
- **Pick the right file** based on where the icon is consumed: app-wide → `AppIcons`, settings drawer → `SettingsIcons`, showcase/demo → `ShowcaseIcons`.
- **Import from the barrel**: `import { IconName } from '@/components/icons'`.
- **Naming**: App icons use `Icon` prefix (`IconDashboard`). Settings/showcase icons use descriptive names (`ExportIcon`, `BoldIcon`).
- **Props**: All icons accept `{ className?: string }` via `IconProps`. Icons that need extra props (e.g. `CollapseIcon` with `isCollapsed`) define their own interface.

---

## Exceptions (not in `src/components/icons/`)

These are **stateful mini-components**, not reusable icons:

- `ThemeToggleNative` — Sun/Moon with animation states and hardcoded colors
- `SelectNative/ChevronIcon` — Memoized with `isOpen` prop and wrapper span
- `NativeChipShowcase` — 2 tiny inline SVGs (3 lines each) inside JSX
