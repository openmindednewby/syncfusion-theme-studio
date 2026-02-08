import { DEFAULT_THEME } from './defaultTheme';

import type { ThemeConfig } from './types';


export interface ThemePreset {
  id: string;
  name: string;
  previewColors: string[];
  theme: ThemeConfig;
}

export const themePresets: ThemePreset[] = [
  {
    id: 'default',
    name: 'Default Blue',
    previewColors: [
      DEFAULT_THEME.primary['500'],
      DEFAULT_THEME.secondary['500'],
      DEFAULT_THEME.neutral['500'],
    ],
    theme: DEFAULT_THEME,
  },
];
