// Main theme injector - orchestrates CSS variable injection

import {
  injectAnimationVariables,
  injectBorderRadius,
  injectColorScale,
  injectComponentVariables,
  injectLayoutVariables,
  injectModeColors,
  injectShadowVariables,
  injectSpacingVariables,
  injectStatusColors,
  injectTransitionVariables,
  injectTypographyVariables,
} from './injectors';
import { Mode } from './types';

import type { ThemeConfig } from './types';


export function injectThemeVariables(theme: ThemeConfig, mode: Mode): void {
  const root = document.documentElement;

  requestAnimationFrame(() => {
    // Inject color scales
    injectColorScale(root, 'primary', theme.primary);
    injectColorScale(root, 'secondary', theme.secondary);
    injectColorScale(root, 'neutral', theme.neutral);
    injectStatusColors(root, theme.status);

    // Inject layout and typography
    injectBorderRadius(root, theme.borderRadius);
    injectSpacingVariables(root, theme.spacing);
    injectShadowVariables(root, theme.shadows);
    injectLayoutVariables(root, theme);
    injectTypographyVariables(root, theme);
    injectTransitionVariables(root, theme);
    injectAnimationVariables(root, theme.animations);

    // Inject mode-specific colors
    const modeConfig = mode === Mode.Dark ? theme.dark : theme.light;
    injectModeColors(root, modeConfig);

    // Inject mode-specific component variables
    const componentConfig = mode === Mode.Dark ? theme.components.dark : theme.components.light;
    injectComponentVariables(root, componentConfig);

    // Toggle dark class
    if (mode === Mode.Dark) root.classList.add('dark');
    else root.classList.remove('dark');
  });
}
