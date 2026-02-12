// Typography and transition update actions

import { injectThemeVariables } from '../themeInjector';
import { FontFamilyType, type TransitionType , type FontSizeScale, type FontWeightScale, type LetterSpacingScale, type LineHeightScale } from '../types';


import type { GetState, SetState, TypographyActions } from './types';

export type { FontFamilyType, TransitionType } from '../types';

const enum TypographySubfield {
  FontSize = 'fontSize',
  FontWeight = 'fontWeight',
  LetterSpacing = 'letterSpacing',
  LineHeight = 'lineHeight',
}

interface TypographySubfieldUpdate {
  field: TypographySubfield;
  get: GetState;
  key: string;
  set: SetState;
  value: string;
}

function applyTypographyUpdate(params: TypographySubfieldUpdate): void {
  const { theme, mode } = params.get();
  const existing = { ...theme.typography[params.field] };
  const updated = { ...existing, [params.key]: params.value };
  const newTheme = {
    ...theme,
    typography: { ...theme.typography, [params.field]: updated },
  };
  params.set({ theme: newTheme });
  injectThemeVariables(newTheme, mode);
}

function createFontFamilyAction(set: SetState, get: GetState) {
  return (type: FontFamilyType, value: string): void => {
    const { theme, mode } = get();
    const fontKey = type === FontFamilyType.Sans ? 'fontSans' : 'fontMono';
    const newTheme = {
      ...theme,
      typography: { ...theme.typography, [fontKey]: value },
    };
    set({ theme: newTheme });
    injectThemeVariables(newTheme, mode);
  };
}

function createTransitionAction(set: SetState, get: GetState) {
  return (type: TransitionType, value: string): void => {
    const { theme, mode } = get();
    const newTheme = {
      ...theme,
      transitions: { ...theme.transitions, [type]: value },
    };
    set({ theme: newTheme });
    injectThemeVariables(newTheme, mode);
  };
}

export function createTypographyActions(set: SetState, get: GetState): TypographyActions {
  return {
    updateFontFamily: createFontFamilyAction(set, get),

    updateFontSize: (key: keyof FontSizeScale, value: string): void => {
      applyTypographyUpdate({ set, get, field: TypographySubfield.FontSize, key, value });
    },

    updateFontWeight: (key: keyof FontWeightScale, value: string): void => {
      applyTypographyUpdate({ set, get, field: TypographySubfield.FontWeight, key, value });
    },

    updateLineHeight: (key: keyof LineHeightScale, value: string): void => {
      applyTypographyUpdate({ set, get, field: TypographySubfield.LineHeight, key, value });
    },

    updateLetterSpacing: (key: keyof LetterSpacingScale, value: string): void => {
      applyTypographyUpdate({ set, get, field: TypographySubfield.LetterSpacing, key, value });
    },

    updateTransition: createTransitionAction(set, get),
  };
}
