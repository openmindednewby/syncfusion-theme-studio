import { describe, it, expect, vi } from 'vitest';

import { DEFAULT_TYPOGRAPHY_COMPONENTS } from '../defaults';
import { DEFAULT_THEME } from '../defaultTheme';
import { injectTypographyComponentVariables } from './typographyComponentInjector';

describe('injectTypographyComponentVariables', () => {
  it('writes correct CSS variables for all levels', () => {
    const setProperty = vi.fn();
    const root = { style: { setProperty } } as unknown as HTMLElement;
    const theme = { ...DEFAULT_THEME, typographyComponents: DEFAULT_TYPOGRAPHY_COMPONENTS };

    injectTypographyComponentVariables(root, theme);

    // h1 should reference 3xl size and bold weight
    expect(setProperty).toHaveBeenCalledWith('--typo-h1-size', 'var(--font-size-3xl)');
    expect(setProperty).toHaveBeenCalledWith('--typo-h1-weight', 'var(--font-weight-bold)');
    expect(setProperty).toHaveBeenCalledWith('--typo-h1-color', 'var(--color-text-primary)');

    // muted should reference sm size and muted color
    expect(setProperty).toHaveBeenCalledWith('--typo-muted-size', 'var(--font-size-sm)');
    expect(setProperty).toHaveBeenCalledWith('--typo-muted-color', 'var(--color-text-muted)');

    // caption should reference xs size
    expect(setProperty).toHaveBeenCalledWith('--typo-caption-size', 'var(--font-size-xs)');

    // label should reference medium weight
    expect(setProperty).toHaveBeenCalledWith('--typo-label-weight', 'var(--font-weight-medium)');
  });

  it('writes 50 CSS variables total (5 per level x 10 levels)', () => {
    const setProperty = vi.fn();
    const root = { style: { setProperty } } as unknown as HTMLElement;
    const theme = { ...DEFAULT_THEME, typographyComponents: DEFAULT_TYPOGRAPHY_COMPONENTS };

    injectTypographyComponentVariables(root, theme);

    const PROPS_PER_LEVEL = 5;
    const LEVEL_COUNT = 10;
    expect(setProperty).toHaveBeenCalledTimes(PROPS_PER_LEVEL * LEVEL_COUNT);
  });
});
