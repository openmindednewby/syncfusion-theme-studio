// Lavender Theme Preset
// Soft purple/lavender theme with calming undertones
// Serene and gentle, perfect for wellness, meditation, or creative applications

import {
  DEFAULT_ANIMATIONS,
  DEFAULT_BORDER_RADIUS,
  DEFAULT_COMPONENTS,
  DEFAULT_LAYOUT,
  DEFAULT_SHADOWS,
  DEFAULT_SPACING,
  DEFAULT_TRANSITIONS,
  DEFAULT_TYPOGRAPHY,
  DEFAULT_TYPOGRAPHY_COMPONENTS,
} from '../defaults';
import { AnimationIntensity } from '../types/animationIntensity';


import type { ThemeConfig } from '../types';

// Lavender primary - soft, calming purple
const LAVENDER_PRIMARY = {
  '50': '245 243 255',
  '100': '237 233 254',
  '200': '221 214 254',
  '300': '196 181 253',
  '400': '167 139 250',
  '500': '139 92 246',
  '600': '124 58 237',
  '700': '109 40 217',
  '800': '91 33 182',
  '900': '76 29 149',
};

// Soft Pink secondary - complementary gentle tone
const LAVENDER_SECONDARY = {
  '50': '253 242 248',
  '100': '252 231 243',
  '200': '251 207 232',
  '300': '249 168 212',
  '400': '244 114 182',
  '500': '236 72 153',
  '600': '219 39 119',
  '700': '190 24 93',
  '800': '157 23 77',
  '900': '131 24 67',
};

// Soft Violet neutral - gentle, refined
const LAVENDER_NEUTRAL = {
  '50': '252 251 254',
  '100': '248 247 252',
  '200': '240 238 248',
  '300': '228 224 240',
  '400': '188 182 210',
  '500': '145 138 173',
  '600': '107 100 134',
  '700': '83 77 106',
  '800': '52 48 68',
  '900': '35 32 48',
};

const LAVENDER_STATUS = {
  success: {
    '50': '236 253 245',
    '100': '209 250 229',
    '200': '167 243 208',
    '500': '16 185 129',
    '700': '4 120 87',
  },
  warning: {
    '50': '255 251 235',
    '100': '254 243 199',
    '200': '253 230 138',
    '500': '245 158 11',
    '700': '180 83 9',
  },
  error: {
    '50': '254 242 242',
    '100': '254 226 226',
    '200': '254 202 202',
    '500': '239 68 68',
    '700': '185 28 28',
  },
  info: {
    '50': '245 243 255',
    '100': '237 233 254',
    '200': '221 214 254',
    '500': '139 92 246',
    '700': '109 40 217',
  },
};

const LAVENDER_LIGHT_MODE = {
  backgrounds: {
    page: '255 255 255',
    surface: '252 251 254',
    surfaceElevated: '255 255 255',
    surfaceSunken: '248 247 252',
    overlay: '35 32 48',
  },
  text: {
    primary: '35 32 48',
    secondary: '107 100 134',
    muted: '145 138 173',
    disabled: '188 182 210',
    inverse: '255 255 255',
    link: '124 58 237',
    linkHover: '109 40 217',
  },
  borders: {
    default: '240 238 248',
    strong: '188 182 210',
    subtle: '248 247 252',
    focus: '139 92 246',
    divider: '240 238 248',
  },
};

const LAVENDER_DARK_MODE = {
  backgrounds: {
    page: '35 32 48',
    surface: '52 48 68',
    surfaceElevated: '83 77 106',
    surfaceSunken: '35 32 48',
    overlay: '0 0 0',
  },
  text: {
    primary: '252 251 254',
    secondary: '188 182 210',
    muted: '145 138 173',
    disabled: '107 100 134',
    inverse: '35 32 48',
    link: '167 139 250',
    linkHover: '196 181 253',
  },
  borders: {
    default: '107 100 134',
    strong: '145 138 173',
    subtle: '83 77 106',
    focus: '167 139 250',
    divider: '83 77 106',
  },
};

export const LAVENDER_THEME: ThemeConfig = {
  id: 'lavender',
  name: 'Lavender',
  primary: LAVENDER_PRIMARY,
  secondary: LAVENDER_SECONDARY,
  neutral: LAVENDER_NEUTRAL,
  status: LAVENDER_STATUS,
  layout: DEFAULT_LAYOUT,
  spacing: DEFAULT_SPACING,
  borderRadius: DEFAULT_BORDER_RADIUS,
  shadows: DEFAULT_SHADOWS,
  typography: DEFAULT_TYPOGRAPHY,
  transitions: DEFAULT_TRANSITIONS,
  animations: { ...DEFAULT_ANIMATIONS, intensity: AnimationIntensity.Playful },
  light: LAVENDER_LIGHT_MODE,
  dark: LAVENDER_DARK_MODE,
  components: DEFAULT_COMPONENTS,
  typographyComponents: DEFAULT_TYPOGRAPHY_COMPONENTS,
};
