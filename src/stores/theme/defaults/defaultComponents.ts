// Default component configurations - combined export

import { DEFAULT_COMPONENTS_DARK } from './defaultComponentsDark';
import { DEFAULT_COMPONENTS_LIGHT } from './defaultComponentsLight';

import type { ComponentsConfig } from '../types';


/** Combined mode-aware components configuration */
export const DEFAULT_COMPONENTS: ComponentsConfig = {
  light: DEFAULT_COMPONENTS_LIGHT,
  dark: DEFAULT_COMPONENTS_DARK,
};

// Re-export individual mode defaults for direct access
export { DEFAULT_COMPONENTS_LIGHT, DEFAULT_COMPONENTS_DARK };
