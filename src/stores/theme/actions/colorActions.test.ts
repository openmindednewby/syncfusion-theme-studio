import { describe, it, expect } from 'vitest';

import { createComponents } from '@/test/fixtures/themeComponentFixtures';
import { generateDerivedColors, generatePaletteFromBase } from '@/utils';
import type { DerivedComponentColors } from '@/utils';

import {
  buildDerivedButtons,
  buildDerivedDataGrid,
  buildDerivedInputs,
  buildDerivedModeConfig,
  buildDerivedSidebar,
  buildDerivedComponents,
} from './colorActions';

const PINK_500 = '233 30 99';
const GREEN_500 = '34 197 94';

function createDerivedFromBase(base500: string): DerivedComponentColors {
  const palette = generatePaletteFromBase(base500);
  return generateDerivedColors(palette);
}

describe('buildDerivedButtons', () => {
  it('overrides primary button background from derived colors', () => {
    const config = createComponents().light;
    const derived = createDerivedFromBase(PINK_500);
    const result = buildDerivedButtons(config.buttons, derived);

    expect(result.primary.background).toBe(derived.buttons.primary.background);
    expect(result.primary.backgroundHover).toBe(derived.buttons.primary.backgroundHover);
    expect(result.primary.textColor).toBe(derived.buttons.primary.textColor);
  });

  it('preserves non-primary button configs', () => {
    const config = createComponents().light;
    const derived = createDerivedFromBase(PINK_500);
    const result = buildDerivedButtons(config.buttons, derived);

    expect(result.secondary).toEqual(config.buttons.secondary);
    expect(result.danger).toEqual(config.buttons.danger);
    expect(result.ghost).toEqual(config.buttons.ghost);
    expect(result.outline).toEqual(config.buttons.outline);
  });
});

describe('buildDerivedSidebar', () => {
  it('overrides active item background and text from derived colors', () => {
    const config = createComponents().light;
    const derived = createDerivedFromBase(GREEN_500);
    const result = buildDerivedSidebar(config.sidebar, derived);

    expect(result.activeItemBackground).toBe(derived.sidebar.activeBg);
    expect(result.activeItemTextColor).toBe(derived.sidebar.activeText);
  });

  it('preserves non-active sidebar configs', () => {
    const config = createComponents().light;
    const derived = createDerivedFromBase(GREEN_500);
    const result = buildDerivedSidebar(config.sidebar, derived);

    expect(result.background).toBe(config.sidebar.background);
    expect(result.textColor).toBe(config.sidebar.textColor);
    expect(result.hoverItemBackground).toBe(config.sidebar.hoverItemBackground);
  });
});

describe('buildDerivedInputs', () => {
  it('overrides borderFocus from derived colors', () => {
    const config = createComponents().light;
    const derived = createDerivedFromBase(PINK_500);
    const result = buildDerivedInputs(config.inputs, derived);

    expect(result.borderFocus).toBe(derived.inputs.borderFocus);
  });

  it('overrides focusRingColor from derived colors', () => {
    const config = createComponents().light;
    const derived = createDerivedFromBase(PINK_500);
    const result = buildDerivedInputs(config.inputs, derived);

    expect(result.focusRingColor).toBe(derived.inputs.focusRingColor);
  });

  it('uses primary-500 for focusRingColor', () => {
    const derived = createDerivedFromBase(PINK_500);

    expect(derived.inputs.focusRingColor).toBe(PINK_500);
  });

  it('preserves non-focus input configs', () => {
    const config = createComponents().light;
    const derived = createDerivedFromBase(PINK_500);
    const result = buildDerivedInputs(config.inputs, derived);

    expect(result.background).toBe(config.inputs.background);
    expect(result.textColor).toBe(config.inputs.textColor);
    expect(result.borderError).toBe(config.inputs.borderError);
  });
});

describe('buildDerivedDataGrid', () => {
  it('overrides paginationActiveBackground from derived colors', () => {
    const config = createComponents().light;
    const derived = createDerivedFromBase(GREEN_500);
    const result = buildDerivedDataGrid(config.dataGrid, derived);

    expect(result.paginationActiveBackground).toBe(derived.dataGrid.paginationActiveBackground);
  });

  it('uses primary-500 for paginationActiveBackground', () => {
    const derived = createDerivedFromBase(GREEN_500);

    expect(derived.dataGrid.paginationActiveBackground).toBe(GREEN_500);
  });

  it('preserves non-pagination dataGrid configs', () => {
    const config = createComponents().light;
    const derived = createDerivedFromBase(GREEN_500);
    const result = buildDerivedDataGrid(config.dataGrid, derived);

    expect(result.headerBackground).toBe(config.dataGrid.headerBackground);
    expect(result.rowEvenBackground).toBe(config.dataGrid.rowEvenBackground);
    expect(result.cellBorderColor).toBe(config.dataGrid.cellBorderColor);
  });
});

describe('buildDerivedModeConfig', () => {
  it('applies all derived values to a component config', () => {
    const config = createComponents().light;
    const derived = createDerivedFromBase(PINK_500);
    const result = buildDerivedModeConfig(config, derived);

    expect(result.buttons.primary.background).toBe(derived.buttons.primary.background);
    expect(result.sidebar.activeItemBackground).toBe(derived.sidebar.activeBg);
    expect(result.inputs.borderFocus).toBe(derived.inputs.borderFocus);
    expect(result.inputs.focusRingColor).toBe(derived.inputs.focusRingColor);
    expect(result.dataGrid.paginationActiveBackground).toBe(derived.dataGrid.paginationActiveBackground);
  });
});

describe('buildDerivedComponents', () => {
  it('applies derived values to both light and dark configs', () => {
    const config = createComponents().light;
    const components = { light: config, dark: config };
    const derived = createDerivedFromBase(PINK_500);
    const result = buildDerivedComponents(components, derived);

    expect(result.light.inputs.focusRingColor).toBe(PINK_500);
    expect(result.dark.inputs.focusRingColor).toBe(PINK_500);
    expect(result.light.dataGrid.paginationActiveBackground).toBe(PINK_500);
    expect(result.dark.dataGrid.paginationActiveBackground).toBe(PINK_500);
  });
});

describe('generateDerivedColors', () => {
  it('produces focusRingColor matching primary-500', () => {
    const palette = generatePaletteFromBase(PINK_500);
    const derived = generateDerivedColors(palette);

    expect(derived.inputs.focusRingColor).toBe(palette['500']);
  });

  it('produces paginationActiveBackground matching primary-500', () => {
    const palette = generatePaletteFromBase(GREEN_500);
    const derived = generateDerivedColors(palette);

    expect(derived.dataGrid.paginationActiveBackground).toBe(palette['500']);
  });

  it('produces button background from primary-700', () => {
    const palette = generatePaletteFromBase(PINK_500);
    const derived = generateDerivedColors(palette);

    expect(derived.buttons.primary.background).toBe(palette['700']);
  });

  it('produces sidebar activeBg from primary-700', () => {
    const palette = generatePaletteFromBase(PINK_500);
    const derived = generateDerivedColors(palette);

    expect(derived.sidebar.activeBg).toBe(palette['700']);
  });
});
