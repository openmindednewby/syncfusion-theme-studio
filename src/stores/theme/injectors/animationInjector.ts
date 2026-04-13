// Global animation CSS variable injection

import { toKeyframeName } from '@/utils/animationUtils';

import type { AnimationConfig } from '../types';

export function injectAnimationVariables(root: HTMLElement, animations: AnimationConfig): void {
  const enabledValue = animations.enabled ? '1' : '0';
  root.style.setProperty('--animation-enabled', enabledValue);
  root.style.setProperty('--animation-default-effect', toKeyframeName(animations.defaultEffect));
  root.style.setProperty('--animation-default-duration', animations.defaultDuration);
  root.style.setProperty('--animation-default-easing', animations.defaultEasing);
  root.style.setProperty('--animation-intensity', animations.intensity);
  root.style.setProperty(
    '--animation-respect-reduced-motion',
    animations.respectReducedMotion ? '1' : '0',
  );
}
