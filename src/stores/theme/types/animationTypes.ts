// Global animation configuration types

import type { AnimationEffect } from './animationEffect';
import type { AnimationIntensity } from './animationIntensity';

export interface AnimationConfig {
  /** Master toggle to enable/disable all animations */
  enabled: boolean;
  /** Default animation effect for show/hide components */
  defaultEffect: AnimationEffect;
  /** Default animation duration (CSS value, e.g. '200ms') */
  defaultDuration: string;
  /** Default easing function */
  defaultEasing: string;
  /** Preset intensity level that scales all durations */
  intensity: AnimationIntensity;
  /** Whether to disable animations when OS prefers-reduced-motion is set */
  respectReducedMotion: boolean;
}
