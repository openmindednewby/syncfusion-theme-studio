# CSS Customization System

> Back to [README](../README.md) | See also: [CSS Architecture](CSS_ARCHITECTURE.md)

---

## File Structure

```
src/styles/
├── login.css                    # Entry point for login page
├── app.css                      # Entry point for dashboard (lazy-loaded)
└── layers/
    ├── base.css                 # CSS reset, variables, theme tokens
    ├── components.css           # Full component library
    ├── components-critical.css  # Minimal components for login
    ├── components-app.css       # Additional dashboard components
    └── syncfusion-overrides.css # Syncfusion theme integration
```

---

## CSS Layers

```css
@layer base, components, utilities;
```

1. **base** — Theme variables and resets (lowest specificity)
2. **components** — Component styles
3. **utilities** — Tailwind utilities (highest specificity)

---

## Theme Variables

All styling is driven by CSS variables for runtime customization:

```css
:root {
  /* Primary Colors */
  --color-primary-50: 239 246 255;
  --color-primary-500: 59 130 246;
  --color-primary-900: 30 58 138;

  /* Component-Specific Variables */
  --button-bg: var(--color-primary-500);
  --button-text: 255 255 255;
  --button-border-radius: var(--radius-md);

  --input-bg: var(--color-surface);
  --input-border: var(--color-border);
  --input-focus-ring: var(--color-primary-500);

  /* Layout Variables */
  --sidebar-width: 256px;
  --header-height: 64px;
}
```

---

## Per-Component Theming

Each component has its own light and dark theme configuration:

```typescript
interface ComponentsConfig {
  light: ComponentConfigSingle;
  dark: ComponentConfigSingle;
}

interface ComponentConfigSingle {
  button: ButtonConfig;
  input: InputConfig;
  select: SelectConfig;
  dataGrid: DataGridConfig;
  datePicker: DatePickerConfig;
  dialog: DialogConfig;
}
```

Components automatically use the correct theme based on current mode via `injectComponentVariables()`.

---

## Theme Presets

12+ beautiful theme presets are included, each with light and dark variants:

| Preset        | Description                             |
| ------------- | --------------------------------------- |
| Ocean Blue    | Professional blue (Salesforce-inspired) |
| Forest Green  | Nature-inspired with amber accents      |
| Royal Purple  | Elegant with rose gold secondary        |
| Sunset Orange | Warm coral and orange tones             |
| Rose Pink     | Soft pink with lavender accent          |
| Midnight      | Deep dark blue with electric violet     |
| Arctic        | Cool ice blue, clean and refreshing     |
| Copper        | Warm metallic with bronze accents       |
| Emerald       | Rich jewel-toned green                  |
| Lavender      | Soft calming purple tones               |
| Slate         | Professional gray                       |
| Gold          | Luxurious with bronze accents           |

### Using Presets

```typescript
import { useThemeStore } from '@/stores/useThemeStore';
import { oceanBluePreset } from '@/stores/theme/presets';

const { applyPreset } = useThemeStore();
applyPreset(oceanBluePreset);
```

---

## Export/Import Themes

```typescript
const { exportTheme, importTheme } = useThemeStore();

// Export current theme as JSON
const themeJson = exportTheme();
console.log(JSON.stringify(themeJson, null, 2));

// Import a theme
importTheme(customThemeJson);
```

---

## Syncfusion Component Styling

Syncfusion components are styled using CSS variable overrides:

```css
/* src/styles/layers/syncfusion-overrides.css */

/* Button Overrides */
.e-btn {
  background-color: rgb(var(--button-bg));
  color: rgb(var(--button-text));
  border-radius: var(--button-border-radius);
}

/* Input Overrides */
.e-input-group {
  background-color: rgb(var(--input-bg));
  border-color: rgb(var(--input-border));
}

.e-input-group:focus-within {
  border-color: rgb(var(--input-focus-ring));
  box-shadow: 0 0 0 3px rgb(var(--input-focus-ring) / 0.1);
}

/* DataGrid Overrides */
.e-grid {
  background-color: rgb(var(--datagrid-bg));
  border-color: rgb(var(--datagrid-border));
}

.e-grid .e-headercell {
  background-color: rgb(var(--datagrid-header-bg));
  color: rgb(var(--datagrid-header-text));
}
```

---

## Tailwind CSS Spacing Scale

Used for padding (`p-`), margin (`m-`), width (`w-`), height (`h-`), gap, etc.

| Class suffix | CSS value  | Pixels                 |
| ------------ | ---------- | ---------------------- |
| `0`          | `0px`      | 0                      |
| `px`         | `1px`      | 1                      |
| `0.5`        | `0.125rem` | 2                      |
| `1`          | `0.25rem`  | 4                      |
| `1.5`        | `0.375rem` | 6                      |
| `2`          | `0.5rem`   | 8                      |
| `2.5`        | `0.625rem` | 10                     |
| `3`          | `0.75rem`  | 12                     |
| `4`          | `1rem`     | 16                     |
| `5`          | `1.25rem`  | 20                     |
| `6`          | `1.5rem`   | 24                     |
| `8`          | `2rem`     | 32                     |
| `[3px]`      | `3px`      | Arbitrary value syntax |

**Direction prefixes:** `t` (top), `b` (bottom), `l` (left), `r` (right), `x` (horizontal), `y` (vertical), none (all sides).

Example: `pt-2` = `padding-top: 0.5rem` (8px), `mx-4` = `margin-left: 1rem; margin-right: 1rem` (16px).

Full reference: https://tailwindcss.com/docs/padding
