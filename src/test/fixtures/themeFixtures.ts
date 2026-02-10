/**
 * Test fixtures for theme-related tests.
 */

import { createPrimaryColors, createSecondaryColors, createNeutralColors, createStatusColors } from './themeColorFixtures';
import { createComponents } from './themeComponentFixtures';
import { createLightMode, createDarkMode } from './themeModeFixtures';

import type { ThemeConfig, BorderRadiusConfig, ShadowConfig } from '../../stores/theme/types';

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
  typography: { fontSans: 'Arial, sans-serif', fontMono: 'monospace' },
  transitions: { fast: '100ms', normal: '200ms', slow: '400ms', easing: 'ease-in-out' },
  light: createLightMode(),
  dark: createDarkMode(),
  components: createComponents(),
});

export const createIncompleteTheme = (): { name: string } => ({
  name: 'Incomplete Theme',
});
