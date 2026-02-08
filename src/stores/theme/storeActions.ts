// Theme store actions - assembled from split action files

import {
  createColorUpdateActions,
  createComponentConfigActions,
  createExportImportActions,
  createModeActions,
  createModeConfigActions,
  createThemeUpdateActions,
} from './actions';
import { DEFAULT_THEME } from './defaultTheme';

import type { GetState, SetState } from './actions';
import type { ThemeState } from './types';


export function createThemeActions(set: SetState, get: GetState): ThemeState {
  return {
    mode: 'light',
    theme: DEFAULT_THEME,
    ...createModeActions(set, get),
    ...createColorUpdateActions(set, get),
    ...createModeConfigActions(set, get),
    ...createThemeUpdateActions(set, get),
    ...createExportImportActions(set, get),
    ...createComponentConfigActions(set, get),
  };
}
