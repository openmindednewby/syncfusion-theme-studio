// ThemeStudio Components — bridge combining light and dark

import { THEMESTUDIO_COMPONENTS_DARK } from './themeStudioComponentsDark';
import { THEMESTUDIO_COMPONENTS_LIGHT } from './themeStudioComponentsLight';

import type { ComponentsConfig } from '../types';

export const THEMESTUDIO_COMPONENTS: ComponentsConfig = {
  light: THEMESTUDIO_COMPONENTS_LIGHT,
  dark: THEMESTUDIO_COMPONENTS_DARK,
};
