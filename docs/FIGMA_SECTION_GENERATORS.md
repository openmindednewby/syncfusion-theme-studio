# Figma Section Generators

How the section generator scripts work, how to run them, and how to add new ones.

For the overall pipeline architecture, see [scripts/figma/README.md](../scripts/figma/README.md).

---

## Overview

Section generators are Phase 2 of the Figma-to-Theme pipeline. Each reads the shared extraction JSON, transforms one component section into theme-compatible overrides, and writes an intermediate JSON that the main generator consumes.

```
Phase 1: extract.ts           → data/figma-extract.json      (one API call)
Phase 2: generate-<section>.ts → data/figma-sections/<s>.json  (one per section, offline)
Phase 2.5: corrections.ts      deep-merges figma-corrections/  (automatic in Phase 3)
Phase 3: generate.ts           → figmaDesign*.ts               (reads all sections)
```

Sections are independent. You can regenerate one without touching the others.

---

## Implemented Generators

| Section | Script | Outputs | Extraction |
|---------|--------|---------|------------|
| Badges | `generate-badges.ts` | `badges.json`, `alertBadges.json` | `extract-badges.ts` |
| Buttons | `generate-buttons.ts` + `-helpers.ts` + `-dark.ts` | `buttons.json` | `extract-buttons.ts` |
| Inputs | `generate-inputs.ts` | `inputs.json` | `extract-inputs.ts` |
| Form Controls | `generate-form-controls.ts` | `checkbox.json`, `radio.json` | `extract-form-controls.ts` |
| External Links | `generate-external-links.ts` | `externalLink.json` | `extract-external-link.ts` |
| Nav Menus | `generate-nav-menus.ts` | `menu.json`, `sidebar.json` | `extract-nav-menus.ts` |
| Text Description | `generate-text-description.ts` | `textDescription.json` | `extract-text-description.ts` |
| Icons | `generate-icons.ts` | TSX component files | `extract-icons.ts` |

---

## Running Generators

### Single section

```bash
npx tsx scripts/figma/generate-buttons.ts
```

Or via npm script:

```bash
npm run figma:generate:buttons
```

### Full pipeline (extract + all generators + combine)

```bash
npm run figma:sync
```

This runs extract, then every implemented generator, then the main combine step. Requires `FIGMA_API_TOKEN` in `.env`.

### Regenerate without re-extracting

If `data/figma-extract.json` already exists, you can skip the API call:

```bash
npx tsx scripts/figma/generate-buttons.ts   # one section
npx tsx scripts/figma/generate.ts            # combine all sections
```

---

## Common Generator Pattern

Every generator follows the same structure. Use `generate-badges.ts` as the reference implementation.

### 1. File header and imports

```typescript
// Dedicated <section> generation pipeline
// Reads figma-extract.json, maps <section> data to theme fields,
// writes intermediate JSON for the main generator to consume.
// Usage: npx tsx scripts/figma/generate-<section>.ts

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { FigmaExtraction } from './types';
```

### 2. Path constants

```typescript
const EXTRACT_PATH = resolve(import.meta.dirname, 'data/figma-extract.json');
const SECTIONS_DIR = resolve(import.meta.dirname, 'data/figma-sections');
const OUTPUT_PATH = resolve(SECTIONS_DIR, '<section>.json');
```

### 3. Label-to-theme mapping

Each generator defines a mapping from Figma's labels/names to the theme's variant keys. This is the core domain logic.

```typescript
// Badges: Figma label → theme variant
const SEVERITY_LABEL_MAP = { CRITICAL: 'error', HIGH: 'warning', ... };

// Buttons: Figma variant name → theme variant
const VARIANT_MAP = { primary: 'primary', secondary: 'secondary', ... };

// Inputs: Figma state label → theme property mapper
const STATE_PROPERTY_MAP = { DEFAULT: (d) => ({ background: d.background }), ... };
```

### 4. Override interface

Define a local interface for the shape of one variant's overrides. This should match the section's fields in `ComponentConfigSingle`.

```typescript
interface BadgeVariantOverride {
  background: string;
  textColor: string;
  borderColor: string;
}
```

### 5. loadExtraction()

Standard boilerplate (identical across all generators):

```typescript
function loadExtraction(): FigmaExtraction {
  if (!existsSync(EXTRACT_PATH)) {
    console.error('No extraction data found. Run `npm run figma:extract` first.');
    process.exit(1);
  }
  return JSON.parse(readFileSync(EXTRACT_PATH, 'utf-8')) as FigmaExtraction;
}
```

### 6. Mapping functions

Transform extracted Figma data into theme overrides. One function typically handles one mode (light or dark).

### 7. main() + main()

Orchestrates the pipeline: load, map, write.

```typescript
function main(): void {
  const extraction = loadExtraction();
  console.log(`Source: ${extraction.fileName} (${extraction.extractedAt})`);

  if (!extraction.<section>) {
    console.log('No <section> data in extraction. Skipping.');
    return;
  }

  const light = buildModeOverrides('light', extraction.<section>);
  const dark = buildModeOverrides('dark', extraction.<section>);

  mkdirSync(SECTIONS_DIR, { recursive: true });
  writeFileSync(OUTPUT_PATH, JSON.stringify({ light, dark }, null, 2));
  console.log(`Written: ${OUTPUT_PATH}`);
}

main();
```

---

## Output JSON Structure

Every section JSON has the same top-level shape that `generate.ts` expects:

```json
{
  "light": {
    "<variant>": { "<field>": "<value>", ... },
    ...
  },
  "dark": {
    "<variant>": { "<field>": "<value>", ... },
    ...
  },
  "typography": { ... },
  "padding": { ... },
  "gap": "10px",
  "outlineFillOpacity": "0.2"
}
```

- `light` and `dark` are required (keyed by variant name)
- `typography`, `padding`, `gap`, `outlineFillOpacity` are optional shared properties
- Values are strings: RGB as `"R G B"` (space-separated), dimensions as `"Npx"`, opacity as `"0.25"`

---

## Dark Mode Handling

Three approaches depending on what Figma provides:

### Figma has separate dark mode data

Both light and dark extracted data differ. Map them independently.

```typescript
const light = buildModeOverrides(extraction.section.light);
const dark = buildModeOverrides(extraction.section.dark);
```

### Figma has identical light/dark (no Variables)

Light and dark extraction are byte-identical (Figma file doesn't use Variables for mode switching). Derive dark from light using color analysis.

```typescript
if (modesAreIdentical(light, dark)) {
  dark = deriveDarkOverrides(light);
}
```

This is the approach `generate-buttons.ts` uses. The derivation classifies each variant by its background/text brightness pattern and applies the appropriate inversion.

### Section is mode-independent

Some sections (typography, icons) don't change between modes. Write the same values for both, or use a single shared key.

---

## Buttons: Multi-File Generator

The buttons generator is split across three files due to the 300-line lint limit:

| File | Purpose | Lines |
|------|---------|-------|
| `generate-buttons.ts` | Main pipeline, variant mapping, shared property extraction | ~230 |
| `generate-buttons-helpers.ts` | `ButtonVariantOverride` type, color utilities, hover derivation, danger synthesis | ~125 |
| `generate-buttons-dark.ts` | Dark mode derivation with named color constants, danger-specific dark treatment | ~155 |

### Hover derivation

When Figma doesn't provide hover states, `deriveHoverFromDefault()` synthesizes them:
- **Dark background** (primary): lighten RGB by 15 steps
- **Light background** (secondary): darken RGB by 10 steps
- **Transparent background** (ghost/outline): add subtle gray background (`243 244 246`)

### Danger synthesis

When Figma doesn't include a danger variant, `synthesizeDangerIfMissing()` creates one by copying primary's shape (borderRadius, borderWidth) and applying a red color scheme (`220 38 38` bg, `185 28 28` hover).

### Danger in dark mode

Danger stays red in dark mode instead of being inverted like primary. `deriveDangerDark()` uses lighter reds for dark surfaces (`239 68 68` bg, `248 113 113` hover).

---

## Corrections

When generated values don't match the design, add a correction file instead of editing the generator or the output JSON (both get overwritten).

### Location

```
scripts/figma/data/figma-corrections/<section>.json
```

### How it works

1. Filename must match the section JSON (e.g., `buttons.json` corrects `figma-sections/buttons.json`)
2. Same JSON structure as the section file
3. Only include keys that need overriding
4. Deep-merged on top during Phase 3 (`generate.ts`)
5. Survives re-extraction and re-generation

### Example

To fix the danger hover color in light mode:

```json
{
  "light": {
    "danger": {
      "backgroundHover": "190 30 30"
    }
  }
}
```

### Current corrections

| File | What it fixes |
|------|---------------|
| `badges.json` | Light mode badge text colors (white to dark) |
| `alertBadges.json` | Alert badge padding (2px to 7px) |
| `buttons.json` | Empty (placeholder for post-visual-QA tuning) |

---

## Adding a New Section Generator

### Step 1: Add extraction logic

In `extract.ts`, add a call to extract data for your section. The extraction should:
- Walk the Figma document tree for relevant nodes
- Store raw data under a new key in `FigmaExtraction` (defined in `types.ts`)
- Handle both light and dark modes

### Step 2: Create the generator script

Create `scripts/figma/generate-<section>.ts` following the common pattern above. Key decisions:
- What Figma labels map to which theme variant keys?
- What override interface shape matches the theme's config for this section?
- Does dark mode need derivation or does Figma provide it?

### Step 3: Register the npm script

In `package.json`, replace the stub with the real command:

```json
"figma:generate:<section>": "tsx scripts/figma/generate-<section>.ts"
```

### Step 4: Add to the sync pipeline

In `package.json`, add the new generator to `figma:sync` command chain (before `generate.ts`).

### Step 5: Run and verify

```bash
npx tsx scripts/figma/generate-<section>.ts  # generates section JSON
npx tsx scripts/figma/generate.ts             # combines into figmaDesign.ts
```

The main generator auto-discovers `data/figma-sections/*.json` files — no code changes needed in `generate.ts`.

### Step 6: Add corrections if needed

If the generated values don't match the Figma design exactly, create `data/figma-corrections/<section>.json` with just the fields that need fixing.

---

## Coding Standards for Generators

- **File limit**: 300 lines max. Split into helper modules if needed (see buttons pattern).
- **Function limit**: 50 lines max.
- **No magic numbers**: Extract all color values and thresholds to named constants.
- **Named constants format**: `SECTION_VARIANT_PROPERTY` (e.g., `DANGER_DARK_HOVER_BG`).
- **Export surface**: Only export what other modules import. Keep internal helpers private.
- **DRY**: Shared constants (like `DEFAULT_DISABLED_OPACITY`) belong in a helpers module, imported by consumers.
- **Output JSON**: Use 2-space indentation (`JSON.stringify(output, null, 2)`).
- **Console logging**: Log source file name, variant counts, and output path.
