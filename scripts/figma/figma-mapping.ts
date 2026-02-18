// Figma-to-Theme mapping configuration
// Populate after running `npm run figma:discover` to see available Figma paths.
//
// Each rule maps a Figma node path to a ThemeConfig dot-notation path.
// The `property` field defaults to 'fill' if not specified.

import type { FigmaMappingConfig } from './types';

export const FIGMA_MAPPING: FigmaMappingConfig = {
  lightFrameSelector: 'Light Theme',
  darkFrameSelector: 'Dark Theme',

  // Color scales shared between light and dark
  sharedMappings: [
    // { figmaPath: 'Colors/Primary/500', themePath: 'primary.500' },
  ],

  // Light-mode-specific mappings
  lightMappings: [
    // { figmaPath: 'Page Background', themePath: 'light.backgrounds.page' },
    // { figmaPath: 'Button Primary/BG', themePath: 'components.light.buttons.primary.background' },
  ],

  // Dark-mode-specific mappings
  darkMappings: [
    // { figmaPath: 'Page Background', themePath: 'dark.backgrounds.page' },
  ],
};
