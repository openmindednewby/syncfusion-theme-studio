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
import { OCEANUS_THEME } from './oceanus';
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

function previewColors(theme: ThemeConfig): string[] {
  return [theme.primary['500'], theme.secondary['500'], theme.neutral['500']];
}

export const themePresets: ThemePreset[] = [
  { id: 'fremen', name: 'Fremen', description: 'Cybersecurity-inspired teal with deep navy', previewColors: previewColors(FREMEN_THEME), theme: FREMEN_THEME },
  { id: 'oceanus', name: 'Oceanus', description: 'SOAR/SIEM dark navy with teal accents', previewColors: previewColors(OCEANUS_THEME), theme: OCEANUS_THEME },
  { id: 'default', name: 'Default Blue', description: 'Classic blue theme with purple accents', previewColors: previewColors(DEFAULT_THEME), theme: DEFAULT_THEME },
  { id: 'odyssey', name: 'Odyssey', description: 'Professional indigo with teal accents', previewColors: previewColors(ODYSSEY_THEME), theme: ODYSSEY_THEME },
  { id: 'ocean-blue', name: 'Ocean Blue', description: 'Professional blue like Salesforce', previewColors: previewColors(OCEAN_BLUE_THEME), theme: OCEAN_BLUE_THEME },
  { id: 'forest-green', name: 'Forest Green', description: 'Nature-inspired green with amber', previewColors: previewColors(FOREST_GREEN_THEME), theme: FOREST_GREEN_THEME },
  { id: 'royal-purple', name: 'Royal Purple', description: 'Elegant purple with rose gold', previewColors: previewColors(ROYAL_PURPLE_THEME), theme: ROYAL_PURPLE_THEME },
  { id: 'sunset-orange', name: 'Sunset Orange', description: 'Warm coral and orange tones', previewColors: previewColors(SUNSET_ORANGE_THEME), theme: SUNSET_ORANGE_THEME },
  { id: 'rose-pink', name: 'Rose Pink', description: 'Soft pink with lavender accent', previewColors: previewColors(ROSE_PINK_THEME), theme: ROSE_PINK_THEME },
  { id: 'midnight', name: 'Midnight', description: 'Deep dark blue, premium feel', previewColors: previewColors(MIDNIGHT_THEME), theme: MIDNIGHT_THEME },
  { id: 'arctic', name: 'Arctic', description: 'Cool ice blue and white', previewColors: previewColors(ARCTIC_THEME), theme: ARCTIC_THEME },
  { id: 'copper', name: 'Copper', description: 'Warm metallic copper tones', previewColors: previewColors(COPPER_THEME), theme: COPPER_THEME },
  { id: 'emerald', name: 'Emerald', description: 'Rich jewel-toned green', previewColors: previewColors(EMERALD_THEME), theme: EMERALD_THEME },
  { id: 'lavender', name: 'Lavender', description: 'Soft calming purple tones', previewColors: previewColors(LAVENDER_THEME), theme: LAVENDER_THEME },
  { id: 'slate', name: 'Slate', description: 'Professional gray theme', previewColors: previewColors(SLATE_THEME), theme: SLATE_THEME },
  { id: 'gold', name: 'Gold', description: 'Luxurious gold accents', previewColors: previewColors(GOLD_THEME), theme: GOLD_THEME },
];
