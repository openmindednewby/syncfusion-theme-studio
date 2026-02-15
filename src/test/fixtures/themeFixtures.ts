/**
 * Test fixtures for theme-related tests.
 */

import { createPrimaryColors, createSecondaryColors, createNeutralColors, createStatusColors } from './themeColorFixtures';
import { createComponents } from './themeComponentFixtures';
import { createLightMode, createDarkMode } from './themeModeFixtures';
import { AnimationEffect } from '../../stores/theme/types/animationEffect';
import { AnimationIntensity } from '../../stores/theme/types/animationIntensity';

import type { ThemeConfig, BorderRadiusConfig, ShadowConfig, AnimationConfig } from '../../stores/theme/types';

const createBorderRadius = (): BorderRadiusConfig => ({
  none: '0px',
  xs: '0.125rem',
  sm: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  full: '9999px',
});

const createShadows = (): ShadowConfig => ({
  none: 'none',
  xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  sm: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
});

export const createCustomTheme = (): ThemeConfig => ({
  id: 'custom',
  name: 'Custom Imported',
  primary: createPrimaryColors(),
  secondary: createSecondaryColors(),
  neutral: createNeutralColors(),
  status: createStatusColors(),
  layout: { sidebarWidth: '300px', sidebarCollapsedWidth: '80px', headerHeight: '72px', contentMaxWidth: '1440px', contentFullWidth: false },
  spacing: { baseUnit: 4 },
  borderRadius: createBorderRadius(),
  shadows: createShadows(),
  typography: {
    fontSans: 'Arial, sans-serif',
    fontMono: 'monospace',
    fontSize: { xs: '0.75rem', sm: '0.875rem', base: '1rem', lg: '1.125rem', xl: '1.25rem', '2xl': '1.5rem', '3xl': '1.875rem' },
    fontWeight: { light: '300', normal: '400', medium: '500', semibold: '600', bold: '700' },
    lineHeight: { tight: '1.25', normal: '1.5', relaxed: '1.75' },
    letterSpacing: { tight: '-0.025em', normal: '0em', wide: '0.025em' },
  },
  transitions: { fast: '100ms', normal: '200ms', slow: '400ms', easing: 'ease-in-out' },
  animations: {
    enabled: true,
    defaultEffect: AnimationEffect.Fade,
    defaultDuration: '200ms',
    defaultEasing: 'ease-out',
    intensity: AnimationIntensity.Normal,
    respectReducedMotion: true,
  } satisfies AnimationConfig,
  light: createLightMode(),
  dark: createDarkMode(),
  components: createComponents(),
});

export const createIncompleteTheme = (): { name: string } => ({
  name: 'Incomplete Theme',
});
