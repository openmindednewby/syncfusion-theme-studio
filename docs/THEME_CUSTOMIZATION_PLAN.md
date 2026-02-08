# Theme Customization Plan - Maximum Configurability

## Overview

Transform the theme system into a fully customizable design system where EVERY visual aspect can be configured separately for light and dark modes.

---

## 1. Global Design Tokens

### Color Palettes
- **Primary** (50-900 shades)
- **Secondary/Accent** (50-900 shades)
- **Neutral/Gray** (50-900 shades)
- **Status Colors** (each with 50-700 shades):
  - Success (green)
  - Warning (yellow/orange)
  - Error (red)
  - Info (blue)

### Typography
- Font family (sans, serif, mono)
- Font sizes (xs, sm, base, lg, xl, 2xl, 3xl, 4xl)
- Font weights (light, normal, medium, semibold, bold)
- Line heights (tight, normal, relaxed, loose)
- Letter spacing (tight, normal, wide)

### Spacing
- Base unit (4px default)
- Scale (0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64)

### Border Radius
- none, xs, sm, md, lg, xl, 2xl, full
- Per-component overrides

### Shadows
- none, xs, sm, md, lg, xl, 2xl
- Custom shadow colors
- Inner shadows

### Transitions
- Duration (fast: 150ms, normal: 300ms, slow: 500ms)
- Easing functions

---

## 2. Light Theme Configuration

### Backgrounds
- Page background
- Surface (cards, panels)
- Surface elevated (modals, dropdowns)
- Surface sunken (inputs, wells)
- Overlay/backdrop

### Text Colors
- Primary (headings, important)
- Secondary (body text)
- Muted (labels, hints)
- Disabled
- Inverse (on dark backgrounds)
- Link (default, hover, visited)

### Borders
- Default border color
- Strong border
- Subtle border
- Focus ring color
- Divider color

---

## 3. Dark Theme Configuration

Same structure as Light Theme but with dark-appropriate values.

---

## 4. Component-Specific Configuration

### Header
- Background color
- Text color
- Border bottom
- Logo area background
- Icon colors
- Height
- Shadow

### Sidebar
- Background color
- Text color
- Active item background
- Active item text
- Hover item background
- Border right
- Width (expanded/collapsed)
- Logo background
- Divider color

### Buttons (per variant: primary, secondary, outline, ghost, danger)
- Background (default, hover, active, disabled)
- Text color (default, hover, active, disabled)
- Border color
- Border width
- Border radius
- Shadow
- Focus ring

### Inputs & Forms
- Background
- Border color (default, hover, focus, error)
- Text color
- Placeholder color
- Label color
- Helper text color
- Error text color
- Focus ring color
- Border radius
- Disabled styles

### Select/Dropdown
- Trigger background
- Trigger border
- Options background
- Option hover
- Option selected
- Option text color
- Dropdown shadow

### DataGrid
- Header background
- Header text color
- Header border
- Row background (even)
- Row background (odd)
- Row hover background
- Row selected background
- Cell border color
- Cell padding
- Pagination background
- Sort icon color
- Filter background

### Cards
- Background
- Border color
- Border radius
- Shadow (default, hover)
- Header background
- Footer background
- Padding

### Modals/Dialogs
- Backdrop color
- Backdrop blur
- Content background
- Border color
- Border radius
- Shadow
- Header background
- Footer background

### Badges/Tags
- Each status variant (success, warning, error, info)
  - Background
  - Text color
  - Border color
- Size variants

### Tabs
- Background
- Active tab background
- Active tab text
- Active tab border
- Inactive tab text
- Hover tab background
- Border bottom

### Tooltips
- Background
- Text color
- Border radius
- Shadow
- Arrow color

### Alerts/Notifications
- Each variant (success, warning, error, info)
  - Background
  - Border color
  - Text color
  - Icon color

### Progress/Loading
- Track background
- Progress color
- Spinner color

### Scrollbars
- Track background
- Thumb background
- Thumb hover

---

## 5. Drawer UI Organization

### Drawer Sections (Tabs)

1. **Colors**
   - Primary palette editor
   - Secondary palette editor
   - Neutral palette editor
   - Status colors editor

2. **Typography**
   - Font family selector
   - Font size scale
   - Font weights
   - Line heights

3. **Layout**
   - Spacing base unit
   - Border radius scale
   - Shadow scale

4. **Light Theme**
   - Background colors
   - Text colors
   - Border colors

5. **Dark Theme**
   - Background colors
   - Text colors
   - Border colors

6. **Components**
   - Header
   - Sidebar
   - Buttons
   - Inputs
   - DataGrid
   - Cards
   - Modals
   - Badges
   - Tabs
   - (expandable sections for each)

7. **Presets & Export**
   - Built-in presets
   - Import/Export JSON
   - Reset to defaults

---

## Implementation Tasks

### Task 1: Expand Theme Types & Store
- Update ThemeConfig type with all new properties
- Update defaultTheme with comprehensive defaults
- Update themeInjector to handle all CSS variables

### Task 2: Color Palette Sections
- Create PrimaryColorSection
- Create SecondaryColorSection
- Create NeutralColorSection
- Create StatusColorsSection

### Task 3: Typography Section
- Font family picker
- Font size scale editor
- Font weight editor
- Line height editor

### Task 4: Layout Section
- Spacing scale editor
- Border radius editor
- Shadow editor

### Task 5: Light Theme Section
- Background colors
- Text colors
- Border colors

### Task 6: Dark Theme Section
- Same as light theme

### Task 7: Header Component Section
- All header-specific customizations

### Task 8: Sidebar Component Section
- All sidebar-specific customizations

### Task 9: Button Component Section
- All button variants customization

### Task 10: Input Component Section
- All input/form customization

### Task 11: DataGrid Component Section
- All grid customization

### Task 12: Cards & Modals Section
- Card customization
- Modal customization

### Task 13: Badges & Alerts Section
- Badge variants
- Alert variants

### Task 14: Presets Section
- Multiple built-in presets
- Preset preview cards

---

## File Structure

```
src/
├── stores/
│   └── theme/
│       ├── types.ts           # Comprehensive type definitions
│       ├── defaultTheme.ts    # Full default configuration
│       ├── themeInjector.ts   # CSS variable injection
│       ├── storeActions.ts    # Store actions
│       └── presets/           # Built-in theme presets
│           ├── default.ts
│           ├── emerald.ts
│           ├── violet.ts
│           ├── rose.ts
│           └── midnight.ts
│
├── components/layout/ThemeSettingsDrawer/
│   ├── index.tsx              # Main drawer
│   ├── DrawerTabs.tsx         # Tab navigation
│   ├── sections/
│   │   ├── ColorsSection/
│   │   │   ├── index.tsx
│   │   │   ├── PrimaryPalette.tsx
│   │   │   ├── SecondaryPalette.tsx
│   │   │   ├── NeutralPalette.tsx
│   │   │   └── StatusColors.tsx
│   │   ├── TypographySection/
│   │   │   ├── index.tsx
│   │   │   ├── FontFamilyPicker.tsx
│   │   │   ├── FontSizeScale.tsx
│   │   │   └── FontWeights.tsx
│   │   ├── LayoutSection/
│   │   │   ├── index.tsx
│   │   │   ├── SpacingEditor.tsx
│   │   │   ├── BorderRadiusEditor.tsx
│   │   │   └── ShadowEditor.tsx
│   │   ├── LightThemeSection/
│   │   │   └── index.tsx
│   │   ├── DarkThemeSection/
│   │   │   └── index.tsx
│   │   ├── ComponentsSection/
│   │   │   ├── index.tsx
│   │   │   ├── HeaderConfig.tsx
│   │   │   ├── SidebarConfig.tsx
│   │   │   ├── ButtonsConfig.tsx
│   │   │   ├── InputsConfig.tsx
│   │   │   ├── DataGridConfig.tsx
│   │   │   ├── CardsConfig.tsx
│   │   │   ├── ModalsConfig.tsx
│   │   │   └── BadgesConfig.tsx
│   │   └── PresetsSection/
│   │       ├── index.tsx
│   │       └── PresetCard.tsx
│   └── shared/
│       ├── ColorPicker.tsx
│       ├── SliderInput.tsx
│       ├── SelectInput.tsx
│       └── SectionHeader.tsx
```

---

*Created: 2026-02-07*
