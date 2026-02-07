/**
 * Test fixtures for theme-related tests.
 */

type StatusColor = Record<string, string>;

interface ThemeConfig {
  id: string;
  name: string;
  primary: Record<string, string>;
  status: { success: StatusColor; warning: StatusColor; error: StatusColor; info: StatusColor };
  layout: { sidebarWidth: string; sidebarCollapsedWidth: string; headerHeight: string };
  borderRadius: Record<string, string>;
  typography: { fontSans: string; fontMono: string };
  transitions: { fast: string; normal: string; slow: string };
  light: Record<string, string>;
  dark: Record<string, string>;
}

const createPrimaryColors = (): Record<string, string> => ({
  '50': '255 255 255',
  '100': '200 200 200',
  '200': '150 150 150',
  '300': '100 100 100',
  '400': '80 80 80',
  '500': '60 60 60',
  '600': '40 40 40',
  '700': '30 30 30',
  '800': '20 20 20',
  '900': '10 10 10',
});

const createStatusColors = (): ThemeConfig['status'] => ({
  success: { '50': '240 253 244', '500': '34 197 94', '700': '21 128 61' },
  warning: { '50': '254 252 232', '500': '234 179 8', '700': '161 98 7' },
  error: { '50': '254 242 242', '500': '239 68 68', '700': '185 28 28' },
  info: { '50': '239 246 255', '500': '59 130 246', '700': '29 78 216' },
});

const createBorderRadius = (): Record<string, string> => ({
  none: '0px',
  sm: '0.125rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  full: '9999px',
});

const createModeColors = (): { light: Record<string, string>; dark: Record<string, string> } => ({
  light: {
    background: '255 255 255',
    surface: '249 250 251',
    surfaceElevated: '255 255 255',
    border: '229 231 235',
    textPrimary: '17 24 39',
    textSecondary: '107 114 128',
    textMuted: '156 163 175',
  },
  dark: {
    background: '17 24 39',
    surface: '31 41 55',
    surfaceElevated: '55 65 81',
    border: '75 85 99',
    textPrimary: '249 250 251',
    textSecondary: '156 163 175',
    textMuted: '107 114 128',
  },
});

export const createCustomTheme = (): ThemeConfig => {
  const modeColors = createModeColors();
  return {
    id: 'custom',
    name: 'Custom Imported',
    primary: createPrimaryColors(),
    status: createStatusColors(),
    layout: { sidebarWidth: '300px', sidebarCollapsedWidth: '80px', headerHeight: '72px' },
    borderRadius: createBorderRadius(),
    typography: { fontSans: 'Arial, sans-serif', fontMono: 'monospace' },
    transitions: { fast: '100ms', normal: '200ms', slow: '400ms' },
    light: modeColors.light,
    dark: modeColors.dark,
  };
};

export const createIncompleteTheme = (): { name: string } => ({
  name: 'Incomplete Theme',
});
