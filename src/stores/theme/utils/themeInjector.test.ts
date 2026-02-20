import { describe, it, expect, beforeEach, type vi } from 'vitest';

import { DEFAULT_THEME } from './defaultTheme';
import { injectThemeVariables } from './themeInjector';
import { Mode } from '../types';

import type { ThemeConfig } from '../types';


describe('injectThemeVariables', () => {
  let mockSetProperty: ReturnType<typeof vi.fn>;
  let mockClassListAdd: ReturnType<typeof vi.fn>;
  let mockClassListRemove: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockSetProperty = document.documentElement.style.setProperty as ReturnType<typeof vi.fn>;
    mockClassListAdd = document.documentElement.classList.add as ReturnType<typeof vi.fn>;
    mockClassListRemove = document.documentElement.classList.remove as ReturnType<typeof vi.fn>;
    mockSetProperty.mockClear();
    mockClassListAdd.mockClear();
    mockClassListRemove.mockClear();
  });

  describe('color scale injection', () => {
    it('calls setProperty for all primary color shades', () => {
      injectThemeVariables(DEFAULT_THEME, Mode.Light);
      const shades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];
      shades.forEach((shade) => {
        expect(mockSetProperty).toHaveBeenCalledWith(
          `--color-primary-${shade}`,
          DEFAULT_THEME.primary[shade as keyof typeof DEFAULT_THEME.primary]
        );
      });
    });

    it('calls setProperty for all secondary color shades', () => {
      injectThemeVariables(DEFAULT_THEME, Mode.Light);
      const shades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];
      shades.forEach((shade) => {
        expect(mockSetProperty).toHaveBeenCalledWith(
          `--color-secondary-${shade}`,
          DEFAULT_THEME.secondary[shade as keyof typeof DEFAULT_THEME.secondary]
        );
      });
    });

    it('calls setProperty for all neutral color shades', () => {
      injectThemeVariables(DEFAULT_THEME, Mode.Light);
      const shades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];
      shades.forEach((shade) => {
        expect(mockSetProperty).toHaveBeenCalledWith(
          `--color-neutral-${shade}`,
          DEFAULT_THEME.neutral[shade as keyof typeof DEFAULT_THEME.neutral]
        );
      });
    });

    it('injects custom primary color values', () => {
      const customTheme: ThemeConfig = {
        ...DEFAULT_THEME,
        primary: { ...DEFAULT_THEME.primary, '500': '255 0 0' },
      };
      injectThemeVariables(customTheme, Mode.Light);
      expect(mockSetProperty).toHaveBeenCalledWith('--color-primary-500', '255 0 0');
    });
  });

  describe('status color injection', () => {
    it('injects success status colors for all shades', () => {
      injectThemeVariables(DEFAULT_THEME, Mode.Light);
      const statusShades = ['50', '100', '200', '500', '700'];
      statusShades.forEach((shade) => {
        expect(mockSetProperty).toHaveBeenCalledWith(
          `--color-success-${shade}`,
          DEFAULT_THEME.status.success[shade as keyof typeof DEFAULT_THEME.status.success]
        );
      });
    });

    it('injects warning status colors for all shades', () => {
      injectThemeVariables(DEFAULT_THEME, Mode.Light);
      const statusShades = ['50', '100', '200', '500', '700'];
      statusShades.forEach((shade) => {
        expect(mockSetProperty).toHaveBeenCalledWith(
          `--color-warning-${shade}`,
          DEFAULT_THEME.status.warning[shade as keyof typeof DEFAULT_THEME.status.warning]
        );
      });
    });

    it('injects error status colors for all shades', () => {
      injectThemeVariables(DEFAULT_THEME, Mode.Light);
      const statusShades = ['50', '100', '200', '500', '700'];
      statusShades.forEach((shade) => {
        expect(mockSetProperty).toHaveBeenCalledWith(
          `--color-error-${shade}`,
          DEFAULT_THEME.status.error[shade as keyof typeof DEFAULT_THEME.status.error]
        );
      });
    });

    it('injects info status colors for all shades', () => {
      injectThemeVariables(DEFAULT_THEME, Mode.Light);
      const statusShades = ['50', '100', '200', '500', '700'];
      statusShades.forEach((shade) => {
        expect(mockSetProperty).toHaveBeenCalledWith(
          `--color-info-${shade}`,
          DEFAULT_THEME.status.info[shade as keyof typeof DEFAULT_THEME.status.info]
        );
      });
    });
  });

  describe('mode-specific color injection', () => {
    it('injects light mode background colors when mode is light', () => {
      injectThemeVariables(DEFAULT_THEME, Mode.Light);
      expect(mockSetProperty).toHaveBeenCalledWith('--color-background', DEFAULT_THEME.light.backgrounds.page);
      expect(mockSetProperty).toHaveBeenCalledWith('--color-surface', DEFAULT_THEME.light.backgrounds.surface);
      expect(mockSetProperty).toHaveBeenCalledWith('--color-surface-elevated', DEFAULT_THEME.light.backgrounds.surfaceElevated);
      expect(mockSetProperty).toHaveBeenCalledWith('--color-surface-sunken', DEFAULT_THEME.light.backgrounds.surfaceSunken);
      expect(mockSetProperty).toHaveBeenCalledWith('--color-overlay', DEFAULT_THEME.light.backgrounds.overlay);
    });

    it('injects dark mode background colors when mode is dark', () => {
      injectThemeVariables(DEFAULT_THEME, Mode.Dark);
      expect(mockSetProperty).toHaveBeenCalledWith('--color-background', DEFAULT_THEME.dark.backgrounds.page);
      expect(mockSetProperty).toHaveBeenCalledWith('--color-surface', DEFAULT_THEME.dark.backgrounds.surface);
      expect(mockSetProperty).toHaveBeenCalledWith('--color-surface-elevated', DEFAULT_THEME.dark.backgrounds.surfaceElevated);
    });

    it('injects light mode text colors when mode is light', () => {
      injectThemeVariables(DEFAULT_THEME, Mode.Light);
      expect(mockSetProperty).toHaveBeenCalledWith('--color-text-primary', DEFAULT_THEME.light.text.primary);
      expect(mockSetProperty).toHaveBeenCalledWith('--color-text-secondary', DEFAULT_THEME.light.text.secondary);
      expect(mockSetProperty).toHaveBeenCalledWith('--color-text-muted', DEFAULT_THEME.light.text.muted);
      expect(mockSetProperty).toHaveBeenCalledWith('--color-text-disabled', DEFAULT_THEME.light.text.disabled);
      expect(mockSetProperty).toHaveBeenCalledWith('--color-text-inverse', DEFAULT_THEME.light.text.inverse);
    });

    it('injects dark mode text colors when mode is dark', () => {
      injectThemeVariables(DEFAULT_THEME, Mode.Dark);
      expect(mockSetProperty).toHaveBeenCalledWith('--color-text-primary', DEFAULT_THEME.dark.text.primary);
      expect(mockSetProperty).toHaveBeenCalledWith('--color-text-secondary', DEFAULT_THEME.dark.text.secondary);
    });

    it('injects light mode border colors when mode is light', () => {
      injectThemeVariables(DEFAULT_THEME, Mode.Light);
      expect(mockSetProperty).toHaveBeenCalledWith('--color-border', DEFAULT_THEME.light.borders.default);
      expect(mockSetProperty).toHaveBeenCalledWith('--color-border-strong', DEFAULT_THEME.light.borders.strong);
      expect(mockSetProperty).toHaveBeenCalledWith('--color-border-subtle', DEFAULT_THEME.light.borders.subtle);
      expect(mockSetProperty).toHaveBeenCalledWith('--color-border-focus', DEFAULT_THEME.light.borders.focus);
      expect(mockSetProperty).toHaveBeenCalledWith('--color-divider', DEFAULT_THEME.light.borders.divider);
    });

    it('injects dark mode border colors when mode is dark', () => {
      injectThemeVariables(DEFAULT_THEME, Mode.Dark);
      expect(mockSetProperty).toHaveBeenCalledWith('--color-border', DEFAULT_THEME.dark.borders.default);
      expect(mockSetProperty).toHaveBeenCalledWith('--color-border-focus', DEFAULT_THEME.dark.borders.focus);
    });

    it('injects link colors based on mode', () => {
      injectThemeVariables(DEFAULT_THEME, Mode.Light);
      expect(mockSetProperty).toHaveBeenCalledWith('--color-link', DEFAULT_THEME.light.text.link);
      expect(mockSetProperty).toHaveBeenCalledWith('--color-link-hover', DEFAULT_THEME.light.text.linkHover);
    });
  });

  describe('dark mode class management', () => {
    it('adds dark class when mode is dark', () => {
      injectThemeVariables(DEFAULT_THEME, Mode.Dark);
      expect(mockClassListAdd).toHaveBeenCalledWith('dark');
    });

    it('removes dark class when mode is light', () => {
      injectThemeVariables(DEFAULT_THEME, Mode.Light);
      expect(mockClassListRemove).toHaveBeenCalledWith('dark');
    });

    it('does not add dark class when mode is light', () => {
      injectThemeVariables(DEFAULT_THEME, Mode.Light);
      expect(mockClassListAdd).not.toHaveBeenCalledWith('dark');
    });
  });

  describe('border radius injection', () => {
    it('injects all border radius values', () => {
      injectThemeVariables(DEFAULT_THEME, Mode.Light);
      expect(mockSetProperty).toHaveBeenCalledWith('--radius-none', DEFAULT_THEME.borderRadius.none);
      expect(mockSetProperty).toHaveBeenCalledWith('--radius-xs', DEFAULT_THEME.borderRadius.xs);
      expect(mockSetProperty).toHaveBeenCalledWith('--radius-sm', DEFAULT_THEME.borderRadius.sm);
      expect(mockSetProperty).toHaveBeenCalledWith('--radius-md', DEFAULT_THEME.borderRadius.md);
      expect(mockSetProperty).toHaveBeenCalledWith('--radius-lg', DEFAULT_THEME.borderRadius.lg);
      expect(mockSetProperty).toHaveBeenCalledWith('--radius-xl', DEFAULT_THEME.borderRadius.xl);
      expect(mockSetProperty).toHaveBeenCalledWith('--radius-2xl', DEFAULT_THEME.borderRadius['2xl']);
      expect(mockSetProperty).toHaveBeenCalledWith('--radius-full', DEFAULT_THEME.borderRadius.full);
    });
  });

  describe('shadow injection', () => {
    it('injects all shadow values', () => {
      injectThemeVariables(DEFAULT_THEME, Mode.Light);
      expect(mockSetProperty).toHaveBeenCalledWith('--shadow-none', DEFAULT_THEME.shadows.none);
      expect(mockSetProperty).toHaveBeenCalledWith('--shadow-xs', DEFAULT_THEME.shadows.xs);
      expect(mockSetProperty).toHaveBeenCalledWith('--shadow-sm', DEFAULT_THEME.shadows.sm);
      expect(mockSetProperty).toHaveBeenCalledWith('--shadow-md', DEFAULT_THEME.shadows.md);
      expect(mockSetProperty).toHaveBeenCalledWith('--shadow-lg', DEFAULT_THEME.shadows.lg);
      expect(mockSetProperty).toHaveBeenCalledWith('--shadow-xl', DEFAULT_THEME.shadows.xl);
      expect(mockSetProperty).toHaveBeenCalledWith('--shadow-2xl', DEFAULT_THEME.shadows['2xl']);
    });
  });

  describe('spacing injection', () => {
    it('injects base unit spacing variable', () => {
      injectThemeVariables(DEFAULT_THEME, Mode.Light);
      expect(mockSetProperty).toHaveBeenCalledWith(
        '--spacing-base-unit',
        `${DEFAULT_THEME.spacing.baseUnit}px`
      );
    });

    it('injects common spacing scale variables', () => {
      injectThemeVariables(DEFAULT_THEME, Mode.Light);
      const baseUnit = DEFAULT_THEME.spacing.baseUnit;
      expect(mockSetProperty).toHaveBeenCalledWith('--space-0', `${baseUnit * 0}px`);
      expect(mockSetProperty).toHaveBeenCalledWith('--space-1', `${baseUnit}px`);
      expect(mockSetProperty).toHaveBeenCalledWith('--space-2', `${baseUnit * 2}px`);
      expect(mockSetProperty).toHaveBeenCalledWith('--space-4', `${baseUnit * 4}px`);
      expect(mockSetProperty).toHaveBeenCalledWith('--space-8', `${baseUnit * 8}px`);
    });

    it('injects larger spacing values correctly', () => {
      injectThemeVariables(DEFAULT_THEME, Mode.Light);
      const baseUnit = DEFAULT_THEME.spacing.baseUnit;
      expect(mockSetProperty).toHaveBeenCalledWith('--space-16', `${baseUnit * 16}px`);
      expect(mockSetProperty).toHaveBeenCalledWith('--space-32', `${baseUnit * 32}px`);
      expect(mockSetProperty).toHaveBeenCalledWith('--space-64', `${baseUnit * 64}px`);
    });

    it('calculates spacing correctly with custom base unit', () => {
      const customTheme: ThemeConfig = { ...DEFAULT_THEME, spacing: { baseUnit: 8 } };
      injectThemeVariables(customTheme, Mode.Light);
      expect(mockSetProperty).toHaveBeenCalledWith('--space-4', '32px');
      expect(mockSetProperty).toHaveBeenCalledWith('--spacing-base-unit', '8px');
    });
  });

  describe('layout injection', () => {
    it('injects sidebar width variables', () => {
      injectThemeVariables(DEFAULT_THEME, Mode.Light);
      expect(mockSetProperty).toHaveBeenCalledWith('--sidebar-width', DEFAULT_THEME.layout.sidebarWidth);
      expect(mockSetProperty).toHaveBeenCalledWith('--sidebar-collapsed-width', DEFAULT_THEME.layout.sidebarCollapsedWidth);
    });

    it('injects header height variable', () => {
      injectThemeVariables(DEFAULT_THEME, Mode.Light);
      expect(mockSetProperty).toHaveBeenCalledWith('--header-height', DEFAULT_THEME.layout.headerHeight);
    });

    it('injects content max width when contentFullWidth is false', () => {
      const theme: ThemeConfig = {
        ...DEFAULT_THEME,
        layout: { ...DEFAULT_THEME.layout, contentFullWidth: false, contentMaxWidth: '1440px' },
      };
      injectThemeVariables(theme, Mode.Light);
      expect(mockSetProperty).toHaveBeenCalledWith('--content-max-width', '1440px');
    });

    it('injects none content max width when contentFullWidth is true', () => {
      const theme: ThemeConfig = {
        ...DEFAULT_THEME,
        layout: { ...DEFAULT_THEME.layout, contentFullWidth: true, contentMaxWidth: '1440px' },
      };
      injectThemeVariables(theme, Mode.Light);
      expect(mockSetProperty).toHaveBeenCalledWith('--content-max-width', 'none');
    });
  });

  describe('typography injection', () => {
    it('injects font family variables', () => {
      injectThemeVariables(DEFAULT_THEME, Mode.Light);
      expect(mockSetProperty).toHaveBeenCalledWith('--font-sans', DEFAULT_THEME.typography.fontSans);
      expect(mockSetProperty).toHaveBeenCalledWith('--font-mono', DEFAULT_THEME.typography.fontMono);
    });
  });

  describe('transition injection', () => {
    it('injects transition duration variables', () => {
      injectThemeVariables(DEFAULT_THEME, Mode.Light);
      expect(mockSetProperty).toHaveBeenCalledWith('--transition-fast', DEFAULT_THEME.transitions.fast);
      expect(mockSetProperty).toHaveBeenCalledWith('--transition-normal', DEFAULT_THEME.transitions.normal);
      expect(mockSetProperty).toHaveBeenCalledWith('--transition-slow', DEFAULT_THEME.transitions.slow);
    });

    it('injects transition easing variable', () => {
      injectThemeVariables(DEFAULT_THEME, Mode.Light);
      expect(mockSetProperty).toHaveBeenCalledWith('--transition-easing', DEFAULT_THEME.transitions.easing);
    });
  });

  describe('flexbox variable injection', () => {
    it('injects flexBox container CSS variables', () => {
      injectThemeVariables(DEFAULT_THEME, Mode.Light);
      const lightFlex = DEFAULT_THEME.components.light.flexBox;
      expect(mockSetProperty).toHaveBeenCalledWith('--component-flexbox-container-bg', `rgb(${lightFlex.containerBackground})`);
      expect(mockSetProperty).toHaveBeenCalledWith('--component-flexbox-container-border', `rgb(${lightFlex.containerBorderColor})`);
      expect(mockSetProperty).toHaveBeenCalledWith('--component-flexbox-container-radius', lightFlex.containerBorderRadius);
      expect(mockSetProperty).toHaveBeenCalledWith('--component-flexbox-container-padding', lightFlex.containerPadding);
    });

    it('injects flexBox behavior CSS variables', () => {
      injectThemeVariables(DEFAULT_THEME, Mode.Light);
      const lightFlex = DEFAULT_THEME.components.light.flexBox;
      expect(mockSetProperty).toHaveBeenCalledWith('--component-flexbox-gap', lightFlex.gap);
      expect(mockSetProperty).toHaveBeenCalledWith('--component-flexbox-direction', lightFlex.direction);
      expect(mockSetProperty).toHaveBeenCalledWith('--component-flexbox-wrap', lightFlex.wrap);
      expect(mockSetProperty).toHaveBeenCalledWith('--component-flexbox-justify', lightFlex.justifyContent);
      expect(mockSetProperty).toHaveBeenCalledWith('--component-flexbox-align', lightFlex.alignItems);
    });

    it('injects flexBox item CSS variables', () => {
      injectThemeVariables(DEFAULT_THEME, Mode.Light);
      const lightFlex = DEFAULT_THEME.components.light.flexBox;
      expect(mockSetProperty).toHaveBeenCalledWith('--component-flexbox-item-bg', `rgb(${lightFlex.itemBackground})`);
      expect(mockSetProperty).toHaveBeenCalledWith('--component-flexbox-item-border', `rgb(${lightFlex.itemBorderColor})`);
      expect(mockSetProperty).toHaveBeenCalledWith('--component-flexbox-item-radius', lightFlex.itemBorderRadius);
      expect(mockSetProperty).toHaveBeenCalledWith('--component-flexbox-item-padding', lightFlex.itemPadding);
    });

    it('injects dark mode flexBox variables when mode is dark', () => {
      injectThemeVariables(DEFAULT_THEME, Mode.Dark);
      const darkFlex = DEFAULT_THEME.components.dark.flexBox;
      expect(mockSetProperty).toHaveBeenCalledWith('--component-flexbox-container-bg', `rgb(${darkFlex.containerBackground})`);
      expect(mockSetProperty).toHaveBeenCalledWith('--component-flexbox-item-bg', `rgb(${darkFlex.itemBackground})`);
    });
  });

  describe('requestAnimationFrame usage', () => {
    it('uses requestAnimationFrame to batch DOM updates', () => {
      const mockRAF = global.requestAnimationFrame as ReturnType<typeof vi.fn>;
      mockRAF.mockClear();
      injectThemeVariables(DEFAULT_THEME, Mode.Light);
      expect(mockRAF).toHaveBeenCalledTimes(1);
      expect(mockRAF).toHaveBeenCalledWith(expect.any(Function));
    });
  });

  describe('complete theme injection', () => {
    it('calls setProperty many times for a complete theme', () => {
      injectThemeVariables(DEFAULT_THEME, Mode.Light);
      const colorScaleVars = 30; // 3 scales x 10 shades
      const statusVars = 20; // 4 statuses x 5 shades
      const borderRadiusVars = 8;
      const shadowVars = 7;
      const spacingVars = 18; // base unit + 17 multipliers
      const layoutVars = 4;
      const typographyVars = 2;
      const transitionVars = 4;
      const modeBackgroundVars = 5;
      const modeTextVars = 7;
      const modeBorderVars = 5;
      const minExpectedCalls = colorScaleVars + statusVars + borderRadiusVars +
        shadowVars + spacingVars + layoutVars + typographyVars + transitionVars +
        modeBackgroundVars + modeTextVars + modeBorderVars;
      expect(mockSetProperty.mock.calls.length).toBeGreaterThanOrEqual(minExpectedCalls);
    });

    it('injects different values for light and dark modes', () => {
      injectThemeVariables(DEFAULT_THEME, Mode.Light);
      const allLightCalls = mockSetProperty.mock.calls as Array<[string, string]>;
      const lightCalls = allLightCalls.filter((call) => call[0] === '--color-background');
      expect(lightCalls[0]?.[1]).toBe(DEFAULT_THEME.light.backgrounds.page);

      mockSetProperty.mockClear();
      injectThemeVariables(DEFAULT_THEME, Mode.Dark);
      const allDarkCalls = mockSetProperty.mock.calls as Array<[string, string]>;
      const darkCalls = allDarkCalls.filter((call) => call[0] === '--color-background');
      expect(darkCalls[0]?.[1]).toBe(DEFAULT_THEME.dark.backgrounds.page);
    });
  });
});
