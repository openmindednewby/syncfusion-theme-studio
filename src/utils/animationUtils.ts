// Animation utility functions

import { AnimationEffect } from '@/stores/theme/types/animationEffect';
import { AnimationIntensity } from '@/stores/theme/types/animationIntensity';

const MS_PER_SECOND = 1000;

/** Maps AnimationEffect to Syncfusion's animationSettings effect string */
export function toSyncfusionEffect(effect: AnimationEffect): string {
  switch (effect) {
    case AnimationEffect.None: return 'None';
    case AnimationEffect.Fade: return 'FadeIn';
    case AnimationEffect.SlideUp: return 'SlideBottom';
    case AnimationEffect.SlideDown: return 'SlideTop';
    case AnimationEffect.SlideLeft: return 'SlideRight';
    case AnimationEffect.SlideRight: return 'SlideLeft';
    case AnimationEffect.Zoom: return 'ZoomIn';
    case AnimationEffect.FadeZoom: return 'FadeZoom';
    default: return 'None';
  }
}

/** Maps AnimationEffect to its CSS keyframe name */
export function toKeyframeName(effect: AnimationEffect): string {
  switch (effect) {
    case AnimationEffect.None: return 'none';
    case AnimationEffect.Fade: return 'anim-fade';
    case AnimationEffect.SlideUp: return 'anim-slide-up';
    case AnimationEffect.SlideDown: return 'anim-slide-down';
    case AnimationEffect.SlideLeft: return 'anim-slide-left';
    case AnimationEffect.SlideRight: return 'anim-slide-right';
    case AnimationEffect.Zoom: return 'anim-zoom';
    case AnimationEffect.FadeZoom: return 'anim-fade-zoom';
    default: return 'none';
  }
}

/** Parses a CSS duration string to milliseconds */
export function parseDurationMs(duration: string): number {
  const trimmed = duration.trim().toLowerCase();
  if (trimmed.endsWith('ms')) return parseFloat(trimmed);
  if (trimmed.endsWith('s')) return parseFloat(trimmed) * MS_PER_SECOND;
  return parseFloat(trimmed);
}

/** Duration multipliers per intensity level */
const INTENSITY_MULTIPLIERS: Record<AnimationIntensity, number> = {
  [AnimationIntensity.None]: 0,
  [AnimationIntensity.Subtle]: 0.6,
  [AnimationIntensity.Normal]: 1,
  [AnimationIntensity.Playful]: 1.5,
};

/** Scales a duration string by the given intensity */
export function scaleDuration(duration: string, intensity: AnimationIntensity): string {
  const ms = parseDurationMs(duration);
  const scaled = Math.round(ms * INTENSITY_MULTIPLIERS[intensity]);
  return `${scaled}ms`;
}
