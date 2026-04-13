// Default theme configuration
// Uses the Fremen preset colors as the application default

import { FREMEN_THEME } from '../presets/fremen';

import type { ThemeConfig } from '../types';


export const DEFAULT_THEME: ThemeConfig = {
  ...FREMEN_THEME,
  id: 'default',
  name: 'Default Blue',
};
