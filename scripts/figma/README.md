# Figma-to-Theme Sync Pipeline

Extracts design tokens from the Figma API and applies them to the **Figma Design** preset theme only. All other preset themes (Fremen, Voyager, CyberWatch, etc.) are manually authored and are not affected by this pipeline.

The app works with or without Figma data. When the pipeline has not been run, the Figma Design preset falls back to defaults.

---

## How the Theme System Works

The app has a centralized theme system. Every visual property is defined in a single `ThemeConfig` type. When a user selects a preset, the entire `ThemeConfig` is loaded into the Zustand store, which injects CSS custom properties onto `document.documentElement`. Both Native and Syncfusion components read from the same CSS variables, so they always look identical.

```
ThemeConfig (one of 18 presets)
    |
    v
PresetsSection.handleApplyPreset()
    |
    ├── 1. generateDerivedColors(primary)       — compute interactive colors
    ├── 2. buildDerivedComponents(comps, derived) — patch buttons/sidebar/inputs/dataGrid
    └── 3. updateTheme({...preset, components})
           |
           v
    useThemeStore (Zustand)
           |
           v
    injectThemeVariables()
           |
           v
    CSS custom properties on :root
           |
           +---> BadgeNative        (reads --component-badge-error-bg, etc.)
           +---> SyncfusionBadge    (reads the same CSS vars)
           +---> AlertBadge          (reads the same CSS vars)
           +---> Every other component...
```

For hand-authored presets (Fremen, Voyager, etc.), `comps` is `DEFAULT_COMPONENTS` — all component sections use default colors. For the Figma Design preset, `comps` is `FIGMA_COMPONENTS` — synced sections (badges, alertBadges) have Figma-extracted overrides, while unsynced sections fall back to defaults. The `buildDerivedComponents()` step patches buttons, sidebar, inputs, and dataGrid from the primary color scale for both paths.

### ThemeConfig Structure

```
ThemeConfig
  ├── primary, secondary, neutral    (color scales)
  ├── status                         (error, warning, info, success colors)
  ├── light / dark                   (mode-specific backgrounds, text, borders)
  ├── typography, spacing, layout    (foundation tokens)
  ├── shadows, borderRadius          (elevation & shape)
  ├── transitions, animations        (motion)
  ├── components                     (ComponentsConfig)
  │     ├── light: ComponentConfigSingle
  │     │     ├── header, sidebar
  │     │     ├── buttons, inputs
  │     │     ├── badges       <-- Figma pipeline writes colors here
  │     ├── alertBadges  <-- Figma pipeline writes typography here
  │     │     ├── cards, modals, select, datePicker, ...
  │     │     └── (25+ component sections)
  │     └── dark: ComponentConfigSingle
  │           └── (same sections)
  └── typographyComponents
```

### Preset Themes

There are 18 preset themes. Each is a complete `ThemeConfig`:

| Preset | Source | Figma-synced? |
|--------|--------|---------------|
| Fremen | `presets/fremen.ts` | No |
| Oceanus | `presets/oceanus.ts` | No |
| CyberWatch | `presets/cyberWatch.ts` | No |
| Default Blue | `defaultTheme.ts` | No |
| Voyager, Ocean Blue, Forest Green, ... | `presets/*.ts` | No |
| **Figma Design** | **`presets/figmaDesign.ts`** | **Yes** |

Only `figmaDesign.ts` is generated. All others are hand-authored.

---

## Pipeline Architecture

```
Figma REST API
    |
    v
figma:extract              data/figma-extract.json         (1 API call, stores everything)
    |
    v
figma:generate:badges      data/figma-sections/badges.json (intermediate)
figma:generate:buttons     data/figma-sections/buttons.json (future)
figma:generate:input       data/figma-sections/input.json   (future)
    ...
    |
    v
figma:generate             1. reads extract + ALL section JSONs
                           2. deep-merges figma-corrections/*.json on top
                           3. writes ONE src/stores/theme/presets/figmaDesign.ts
    |
    v
ThemeConfig.components
    |
    v
useThemeStore  -->  injectThemeVariables  -->  CSS custom properties
    |                                              |
    v                                              v
BadgeNative                                SyncfusionBadge
(reads same CSS vars)                      (reads same CSS vars)
= identical appearance = matches Figma design
```

### Three-Phase Pipeline

**Phase 1: Extract** (`npm run figma:extract`)

- Makes one API call to Figma REST API
- Walks the document tree for each section (badges, buttons, etc.)
- Stores raw extracted data in `data/figma-extract.json`
- This is the only step that requires network access and `FIGMA_API_TOKEN`

**Phase 2: Section Generators** (`npm run figma:generate:<section>`)

Each section has its own dedicated generator script that:
1. Reads `data/figma-extract.json` (no API call)
2. Maps Figma labels/nodes to theme variant keys
3. Writes an intermediate JSON to `data/figma-sections/<section>.json`

Section generators are independent. You can run one without running the others.

| Section | Script | Status |
|---------|--------|--------|
| Badges | `generate-badges.ts` | Implemented |
| Typography | stub | Future |
| Colours | stub | Future |
| Buttons | stub | Future |
| Input | stub | Future |
| (21 more) | stub | Future |

**Phase 2.5: Post-Processing Corrections** (automatic, no command needed)

The Figma API sometimes returns incorrect values. Rather than hardcoding fixes in generator scripts or manually editing section JSONs (which get overwritten), correction files in `data/figma-corrections/` are deep-merged on top of section data during Phase 3.

- Correction files follow the same JSON structure as section files
- Only the specific keys that need fixing are specified — everything else passes through
- Matched by filename: `figma-corrections/badges.json` corrects `figma-sections/badges.json`
- Applied automatically by `corrections.ts` during the main generate step

Example — fixing light mode badge text color from white to dark:
```json
{
  "light": {
    "error": { "textColor": "17 19 25" },
    "warning": { "textColor": "17 19 25" },
    "success": { "textColor": "17 19 25" }
  }
}
```

How it works in practice:

```
data/figma-sections/alertBadges.json     (Figma API output — paddingTop: "2px")
         +
data/figma-corrections/alertBadges.json  (our override — paddingTop: "7px")
         =
src/stores/theme/presets/figmaDesign.ts  (generated — paddingTop: "7px")
```

The `figma-corrections/` directory currently has two files:
- **`badges.json`** — fixes light mode text colors (white → dark)
- **`alertBadges.json`** — fixes paddingTop (2px → 7px)

If you re-run `figma:extract` and `figma:generate:badges` in the future, the section JSONs get overwritten but the corrections persist and are re-applied automatically on the next `figma:generate`.

**Phase 3: Main Generator** (`npm run figma:generate`)

- Reads `data/figma-extract.json` for general color/mode mappings
- Reads ALL `data/figma-sections/*.json` files (from section generators)
- Deep-merges any `data/figma-corrections/*.json` files on top (corrections win)
- Combines everything into one `figmaDesign.ts` preset
- Component section JSONs become inline overrides in the `FIGMA_COMPONENTS` constant

### Full Sync

`npm run figma:sync` runs all three phases in order:

```
extract  -->  generate:badges  -->  generate
```

---

## File Map

```
scripts/figma/
  extract.ts                    Phase 1: Figma API -> JSON
  generate-badges.ts            Phase 2: Badges section generator
  corrections.ts                Phase 2.5: Deep-merges correction files onto sections
  generate.ts                   Phase 3: Combines sections -> figmaDesign.ts
  code-generators.ts            TypeScript code generation helpers
  figma-mapping.ts              Color/mode mapping rules (manual config)
  types.ts                      Shared TypeScript types
  utils.ts                      Color conversion and tree traversal utilities
  discover.ts                   Exploration tool for Figma file structure
  data/
    figma-extract.json          Raw API extraction output
    figma-sections/
      badges.json               Badge section overrides (generated)
      alertBadges.json          Alert badge section overrides (generated)
      buttons.json              (future)
      ...
    figma-corrections/
      badges.json               Fixes light mode badge text colors

src/stores/theme/
  presets/
    figmaDesign.ts              GENERATED - the Figma Design preset
    figmaComponents.ts          Manual component overrides (ClearSkies design)
    fremen.ts                   Hand-authored preset
    cyberWatch.ts               Hand-authored preset
    ...                         16 more hand-authored presets
  defaults/
    defaultComponents.ts        Default component values (fallback)
    defaultComponentsLight.ts   Light mode component defaults
    defaultComponentsDark.ts    Dark mode component defaults
  injectors/
    componentInjector.ts        Converts theme values -> CSS variables
  themeInjector.ts              Orchestrates all CSS variable injection
  types/
    componentTypes.ts           ComponentsConfig, ComponentConfigSingle
    displayComponentTypes.ts    BadgesConfig, BadgeVariant, CardsConfig, etc.

src/styles/layers/
  syncfusion-overrides.css      CSS layer: Syncfusion component overrides (~1,900 lines)
                                Buttons, checkbox, radio, switch, dropdown, input,
                                grid, datepicker, dialog, card, slider, tab, etc.
                                All use CSS variables (e.g. var(--component-button-primary-bg))
  native-overrides.css          CSS layer: Native HTML element overrides (select, etc.)
```

---

## Badges vs Alert Badges

The app has two distinct badge component families that share **colors** but differ in **typography**:

| Component | Config Key | Purpose | Typography |
|-----------|-----------|---------|------------|
| `BadgeNative` | `badges` | General-purpose badge (dot, count, label) | Hardcoded via Tailwind (`text-xs font-medium`) |
| `SyncfusionBadge` | `badges` | Syncfusion badge wrapper | Same Tailwind classes |
| `AlertBadge` | `badges` (colors) + `alertBadges` (typography) | Severity/SLA badges in alert grids | Configurable via CSS variables |

**Color variables** (`--component-badge-*-bg`, `--component-badge-*-text`, `--component-badge-*-border`) are shared by all three components and come from the `badges` config.

**Typography variables** (`--component-alert-badge-font-*`) are only used by `AlertBadge` and come from the `alertBadges` config. The Figma design specifies `Fira Sans Condensed`, `500`, `10px`, `15px` for these badges.

In the **Theme Settings drawer**, these appear as two separate sections:
- **Badges**: Color pickers for success/warning/error/info variants (shared by all badge components)
- **Alert Badges**: Typography controls (font family, size, weight, line height, letter spacing) specific to `AlertBadge`

The Figma pipeline writes:
- `data/figma-sections/badges.json` — color overrides for all badge components
- `data/figma-sections/alertBadges.json` — typography overrides for `AlertBadge` only

---

## Badge Pipeline Detail

### Extraction (extract.ts)

The extractor walks the Figma document tree looking for `severity` and `sla` SECTION/FRAME nodes. Under each, it finds `light` and `dark` child frames. Each badge instance is identified by its text child's `characters` field.

```
Document
  └── Badges (Final) page
        ├── severity (SECTION)
        │     ├── light (FRAME)
        │     │     ├── ico-badge-sev → text: "CRITICAL" → fill: red
        │     │     ├── ico-badge-sev → text: "HIGH"     → fill: orange
        │     │     ├── ico-badge-sev → text: "MEDIUM"   → fill: amber
        │     │     └── ico-badge-sev → text: "LOW"      → fill: teal
        │     └── dark (FRAME)
        │           └── (same structure, dark colors)
        └── sla (SECTION)
              ├── light (FRAME)
              │     ├── ico-badge-sla → text: "BREACHED"  → fill: red, opacity: 0.2
              │     ├── ico-badge-sla → text: "AT RISK"   → fill: orange, opacity: 0.2
              │     └── ico-badge-sla → text: "COMPLIANT" → fill: green, opacity: 0.2
              └── dark (FRAME)
                    └── (same structure)
```

### Generation (generate-badges.ts)

Maps Figma labels to theme badge variant keys:

| Figma Label | Theme Variant | Source Section |
|-------------|---------------|----------------|
| CRITICAL | `error` | severity (solid) |
| HIGH | `warning` | severity (solid) |
| MEDIUM | `info` | severity (solid) |
| LOW | `success` | severity (solid) |
| BREACHED | `error` | sla (outline) |
| AT RISK | `warning` | sla (outline) |
| COMPLIANT | `success` | sla (outline) |

Severity mappings take priority. SLA mappings fill gaps for variants not covered by severity.

Output: `data/figma-sections/badges.json` (colors) + `data/figma-sections/alertBadges.json` (typography)
```json
// badges.json — shared colors for all badge components
{
  "light": {
    "error":   { "background": "239 68 68",  "textColor": "255 255 255", "borderColor": "239 68 68" },
    "warning": { "background": "249 115 22", "textColor": "255 255 255", "borderColor": "249 115 22" },
    "info":    { "background": "254 177 48", "textColor": "17 19 25",    "borderColor": "254 177 48" },
    "success": { "background": "123 164 175","textColor": "255 255 255", "borderColor": "123 164 175" }
  },
  "dark": { ... }
}
```

> **Note**: The Figma API returns white text (`255 255 255`) for light mode error/warning/success badges, but dark text is needed for readability. The correction file `data/figma-corrections/badges.json` overrides these to `17 19 25` during generation.

```json

// alertBadges.json — typography for AlertBadge only
{
  "light": {},
  "dark": {},
  "typography": {
    "fontFamily": "Fira Sans Condensed",
    "fontSize": "10px",
    "fontWeight": "500",
    "lineHeight": "15px",
    "letterSpacing": "0px"
  }
}
```

### Code Generation (generate.ts + code-generators.ts)

The main generator reads `badges.json`, applies corrections, and produces inline overrides in `figmaDesign.ts`:

```typescript
const FIGMA_COMPONENTS: ComponentsConfig = {
  light: {
    ...DEFAULT_COMPONENTS_LIGHT,
    badges: {
      ...DEFAULT_COMPONENTS_LIGHT.badges,
      error: { background: '239 68 68', textColor: '17 19 25', borderColor: '239 68 68' },
      // ...  (textColor corrected from '255 255 255' by figma-corrections/badges.json)
    },
  },
  dark: {
    ...DEFAULT_COMPONENTS_DARK,
    badges: { ... },
  },
};

export const FIGMA_DESIGN_THEME: ThemeConfig = {
  // ...
  components: FIGMA_COMPONENTS,
};
```

The spread pattern (`...DEFAULT_COMPONENTS_LIGHT`) ensures that any component section NOT overridden by Figma keeps its default values. Only sections with a corresponding `data/figma-sections/<name>.json` file get overridden.

### CSS Variable Injection

When a user selects the "Figma Design" preset, `injectBadgeVariables()` reads the badge config and sets CSS variables:

```
components.light.badges.error.background  -->  --component-badge-error-bg
components.light.badges.error.textColor   -->  --component-badge-error-text
components.light.badges.error.borderColor -->  --component-badge-error-border
                                          -->  --component-badge-error-outline-bg (20% opacity)
```

Both `BadgeNative` and `SyncfusionBadge` read these same CSS variables, so they render identically.

---

## CSS Style Override Layers

The Figma pipeline generates **theme values** (stored as JS objects in `figmaDesign.ts`), which are injected as **CSS custom properties** at runtime. The actual visual styling is applied via two CSS override layers in `src/styles/layers/`:

### `syncfusion-overrides.css`

Master CSS layer (~1,900 lines) that overrides Syncfusion component defaults. Covers buttons (primary, secondary, outline, ghost, danger, success, warning, info), checkbox, radio, switch, dropdown, input, grid, datepicker, dialog, card, slider, tabs, and global styles (font-family, popup visibility). All rules reference CSS variables injected by the theme system:

```css
/* Example: button primary uses theme-injected variables */
.e-btn.e-primary {
  background-color: rgb(var(--component-button-primary-bg));
  color: rgb(var(--component-button-primary-text));
  border-color: rgb(var(--component-button-primary-border));
}
```

### `native-overrides.css`

Overrides for native HTML elements (e.g., `<select>`) that also read from the same CSS variable system.

### `figmaComponents.ts`

Manual component overrides for the ClearSkies 2.0 design (accent and surface colors for light/dark modes). Unlike `figmaDesign.ts` which is auto-generated, this file is hand-authored and provides additional component-level overrides that sit alongside the Figma pipeline output.

### How they connect

```
Figma API → figmaDesign.ts (generated theme values)
                |
                v
         useThemeStore (Zustand)
                |
                v
         injectThemeVariables() → CSS custom properties on :root
                |
                +--→ syncfusion-overrides.css (reads CSS vars, styles Syncfusion components)
                +--→ native-overrides.css     (reads CSS vars, styles native elements)
                +--→ React components          (reads CSS vars via inline styles / Tailwind)
```

---

## Adding a New Section

To implement a new section generator (e.g., buttons):

1. **Create the extraction logic** in `extract.ts` to find and parse the Figma nodes for that section
2. **Create `generate-buttons.ts`** that reads `figma-extract.json`, maps Figma values to theme keys, writes `data/figma-sections/buttons.json`
3. **Replace the stub** in `package.json`: change `"figma:generate:buttons": "echo [STUB]..."` to `"figma:generate:buttons": "tsx scripts/figma/generate-buttons.ts"`
4. **Update `figma:sync`** to include the new generator in the pipeline chain
5. **Run `figma:generate`** which automatically picks up `buttons.json` and adds it to `figmaDesign.ts`

The main generator discovers section files automatically from `data/figma-sections/*.json`, so no changes needed there.

---

## Adding a Correction

When the Figma API returns incorrect values for a section, add a correction file instead of editing the section JSON (which gets overwritten) or the generator script.

1. **Create `data/figma-corrections/<section>.json`** with the same structure as the section file, but only include the keys that need fixing
2. **Run `npm run figma:generate`** — the correction is automatically deep-merged on top of the section data
3. The correction persists across re-extractions and re-generations since it lives in a separate file

Corrections are matched by filename. Only keys present in the correction file are overridden — all other values pass through from the section unchanged.

---

## Commands

| Command | Description |
|---------|-------------|
| `npm run figma:extract` | Fetch Figma file and save raw extraction JSON |
| `npm run figma:generate:badges` | Generate badge section overrides from extraction |
| `npm run figma:generate` | Combine all sections into `figmaDesign.ts` |
| `npm run figma:sync` | Full pipeline: extract + all generators + combine |
| `npm run figma:discover` | Explore Figma file structure (development tool) |

---

## Section Readiness Tracker

| Category | Section | Ready Design | Variables Defined | Generation Script | App Integration |
|----------|---------|:---:|:---:|:---:|:---:|
| Foundation | Typography | Yes | - | stub | - |
| Foundation | Colours | Yes | - | stub | - |
| Foundation | Layouts / Grid | Review | - | stub | - |
| Foundation | Icons | - | - | stub | - |
| Components | **Badges** | **Yes** | **Yes** | **generate-badges.ts** | **Yes** |
| Components | Buttons | Yes | - | stub | - |
| Components | **Description** | **Yes** | **Yes** | **generate-text-description.ts** | **Yes** |
| Components | Input | Yes | - | stub | - |
| Components | Drawer | Future | - | stub | - |
| Components | External Link | Yes | - | stub | - |
| Components | Notifications / Alerts | Future | - | stub | - |
| Components | Image | Future | - | stub | - |
| Components | Navigation Menus | - | - | stub | - |
| Components | Drop Down Lists | - | - | stub | - |
| Components | Breadcrumbs | - | - | stub | - |
| Components | Data Grid | - | - | stub | - |
| Components | Combobox | - | - | stub | - |
| Components | Filtering / Search | - | - | stub | - |
| Components | Pagination | - | - | stub | - |
| Components | Progress | - | - | stub | - |
| Components | Skeleton | - | - | stub | - |
| Components | Slider | - | - | stub | - |
| Components | Subhead | - | - | stub | - |

---

## Environment Setup

Create a `.env` file in the project root:

```
FIGMA_API_TOKEN=figd_xxxxx
FIGMA_FILE_KEY=hTPo6YaE32xCzSFltwxTLQ
```

The API token is only needed for `figma:extract`. All generation steps work offline from the stored JSON.
