import { DEFAULT_THEME } from './defaultTheme';
import { ODYSSEY_THEME } from './presets/index';

import type { ThemeConfig } from './types';

export interface ThemePreset {
  id: string;
  name: string;
  description: string;
  previewColors: string[];
  theme: ThemeConfig;
}

export const themePresets: ThemePreset[] = [
  {
    id: 'default',
    name: 'Default Blue',
    description: 'Classic blue theme with purple accents',
    previewColors: [
      DEFAULT_THEME.primary['500'],
      DEFAULT_THEME.secondary['500'],
      DEFAULT_THEME.neutral['500'],
    ],
    theme: DEFAULT_THEME,
  },
  {
    id: 'odyssey',
    name: 'Odyssey',
    description: 'Professional indigo theme with teal accents',
    previewColors: [
      ODYSSEY_THEME.primary['500'],
      ODYSSEY_THEME.secondary['500'],
      ODYSSEY_THEME.neutral['500'],
    ],
    theme: ODYSSEY_THEME,
  },
];
