// Default animation configuration

import { AnimationEffect } from '../types/animationEffect';
import { AnimationIntensity } from '../types/animationIntensity';

import type { AnimationConfig } from '../types/animationTypes';

export const DEFAULT_ANIMATIONS: AnimationConfig = {
  enabled: true,
  defaultEffect: AnimationEffect.FadeZoom,
  defaultDuration: '200ms',
  defaultEasing: 'ease-out',
  intensity: AnimationIntensity.Normal,
  respectReducedMotion: true,
};
