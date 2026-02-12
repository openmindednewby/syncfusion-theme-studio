import { DEFAULT_THEME } from '../defaultTheme';
import { ARCTIC_THEME } from './arctic';
import { COPPER_THEME } from './copper';
import { EMERALD_THEME } from './emerald';
import { FOREST_GREEN_THEME } from './forestGreen';
import { FREMEN_THEME } from './fremen';
import { GOLD_THEME } from './gold';
import { LAVENDER_THEME } from './lavender';
import { MIDNIGHT_THEME } from './midnight';
import { OCEAN_BLUE_THEME } from './oceanBlue';
import { ODYSSEY_THEME } from './odyssey';
import { ROSE_PINK_THEME } from './rosePink';
import { ROYAL_PURPLE_THEME } from './royalPurple';
import { SLATE_THEME } from './slate';
import { SUNSET_ORANGE_THEME } from './sunsetOrange';

import type { ThemeConfig } from '../types';

export interface ThemePreset {
  id: string;
  name: string;
  description: string;
  previewColors: string[];
  theme: ThemeConfig;
}

export const themePresets: ThemePreset[] = [
  {
    id: 'fremen',
    name: 'Fremen',
    description: 'Cybersecurity-inspired teal with deep navy',
    previewColors: [
      FREMEN_THEME.primary['500'],
      FREMEN_THEME.secondary['500'],
      FREMEN_THEME.neutral['500'],
    ],
    theme: FREMEN_THEME,
  },
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
    description: 'Professional indigo with teal accents',
    previewColors: [
      ODYSSEY_THEME.primary['500'],
      ODYSSEY_THEME.secondary['500'],
      ODYSSEY_THEME.neutral['500'],
    ],
    theme: ODYSSEY_THEME,
  },
  {
    id: 'ocean-blue',
    name: 'Ocean Blue',
    description: 'Professional blue like Salesforce',
    previewColors: [
      OCEAN_BLUE_THEME.primary['500'],
      OCEAN_BLUE_THEME.secondary['500'],
      OCEAN_BLUE_THEME.neutral['500'],
    ],
    theme: OCEAN_BLUE_THEME,
  },
  {
    id: 'forest-green',
    name: 'Forest Green',
    description: 'Nature-inspired green with amber',
    previewColors: [
      FOREST_GREEN_THEME.primary['500'],
      FOREST_GREEN_THEME.secondary['500'],
      FOREST_GREEN_THEME.neutral['500'],
    ],
    theme: FOREST_GREEN_THEME,
  },
  {
    id: 'royal-purple',
    name: 'Royal Purple',
    description: 'Elegant purple with rose gold',
    previewColors: [
      ROYAL_PURPLE_THEME.primary['500'],
      ROYAL_PURPLE_THEME.secondary['500'],
      ROYAL_PURPLE_THEME.neutral['500'],
    ],
    theme: ROYAL_PURPLE_THEME,
  },
  {
    id: 'sunset-orange',
    name: 'Sunset Orange',
    description: 'Warm coral and orange tones',
    previewColors: [
      SUNSET_ORANGE_THEME.primary['500'],
      SUNSET_ORANGE_THEME.secondary['500'],
      SUNSET_ORANGE_THEME.neutral['500'],
    ],
    theme: SUNSET_ORANGE_THEME,
  },
  {
    id: 'rose-pink',
    name: 'Rose Pink',
    description: 'Soft pink with lavender accent',
    previewColors: [
      ROSE_PINK_THEME.primary['500'],
      ROSE_PINK_THEME.secondary['500'],
      ROSE_PINK_THEME.neutral['500'],
    ],
    theme: ROSE_PINK_THEME,
  },
  {
    id: 'midnight',
    name: 'Midnight',
    description: 'Deep dark blue, premium feel',
    previewColors: [
      MIDNIGHT_THEME.primary['500'],
      MIDNIGHT_THEME.secondary['500'],
      MIDNIGHT_THEME.neutral['500'],
    ],
    theme: MIDNIGHT_THEME,
  },
  {
    id: 'arctic',
    name: 'Arctic',
    description: 'Cool ice blue and white',
    previewColors: [
      ARCTIC_THEME.primary['500'],
      ARCTIC_THEME.secondary['500'],
      ARCTIC_THEME.neutral['500'],
    ],
    theme: ARCTIC_THEME,
  },
  {
    id: 'copper',
    name: 'Copper',
    description: 'Warm metallic copper tones',
    previewColors: [
      COPPER_THEME.primary['500'],
      COPPER_THEME.secondary['500'],
      COPPER_THEME.neutral['500'],
    ],
    theme: COPPER_THEME,
  },
  {
    id: 'emerald',
    name: 'Emerald',
    description: 'Rich jewel-toned green',
    previewColors: [
      EMERALD_THEME.primary['500'],
      EMERALD_THEME.secondary['500'],
      EMERALD_THEME.neutral['500'],
    ],
    theme: EMERALD_THEME,
  },
  {
    id: 'lavender',
    name: 'Lavender',
    description: 'Soft calming purple tones',
    previewColors: [
      LAVENDER_THEME.primary['500'],
      LAVENDER_THEME.secondary['500'],
      LAVENDER_THEME.neutral['500'],
    ],
    theme: LAVENDER_THEME,
  },
  {
    id: 'slate',
    name: 'Slate',
    description: 'Professional gray theme',
    previewColors: [
      SLATE_THEME.primary['500'],
      SLATE_THEME.secondary['500'],
      SLATE_THEME.neutral['500'],
    ],
    theme: SLATE_THEME,
  },
  {
    id: 'gold',
    name: 'Gold',
    description: 'Luxurious gold accents',
    previewColors: [
      GOLD_THEME.primary['500'],
      GOLD_THEME.secondary['500'],
      GOLD_THEME.neutral['500'],
    ],
    theme: GOLD_THEME,
  },
];
