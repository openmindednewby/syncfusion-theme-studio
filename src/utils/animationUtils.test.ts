import { describe, expect, it } from 'vitest';

import { AnimationEffect } from '@/stores/theme/types/animationEffect';
import { AnimationIntensity } from '@/stores/theme/types/animationIntensity';

import {
  parseDurationMs,
  scaleDuration,
  toKeyframeName,
  toSyncfusionEffect,
} from './animationUtils';

describe('parseDurationMs', () => {
  it('parses millisecond strings', () => {
    expect(parseDurationMs('300ms')).toBe(300);
    expect(parseDurationMs('0ms')).toBe(0);
    expect(parseDurationMs('1500ms')).toBe(1500);
  });

  it('parses second strings and converts to ms', () => {
    expect(parseDurationMs('0.3s')).toBe(300);
    expect(parseDurationMs('1s')).toBe(1000);
    expect(parseDurationMs('2.5s')).toBe(2500);
  });

  it('parses bare numeric strings as ms', () => {
    expect(parseDurationMs('300')).toBe(300);
    expect(parseDurationMs('0')).toBe(0);
  });

  it('handles whitespace around values', () => {
    expect(parseDurationMs('  300ms  ')).toBe(300);
    expect(parseDurationMs(' 0.5s ')).toBe(500);
  });

  it('returns NaN for invalid strings', () => {
    expect(parseDurationMs('')).toBeNaN();
    expect(parseDurationMs('abc')).toBeNaN();
    expect(parseDurationMs('ms')).toBeNaN();
  });

  it('handles negative numbers', () => {
    expect(parseDurationMs('-100ms')).toBe(-100);
    expect(parseDurationMs('-0.5s')).toBe(-500);
  });
});

describe('scaleDuration', () => {
  it('scales by None intensity (multiplier 0)', () => {
    expect(scaleDuration('300ms', AnimationIntensity.None)).toBe('0ms');
  });

  it('scales by Subtle intensity (multiplier 0.6)', () => {
    expect(scaleDuration('300ms', AnimationIntensity.Subtle)).toBe('180ms');
  });

  it('scales by Normal intensity (multiplier 1)', () => {
    expect(scaleDuration('300ms', AnimationIntensity.Normal)).toBe('300ms');
  });

  it('scales by Playful intensity (multiplier 1.5)', () => {
    expect(scaleDuration('300ms', AnimationIntensity.Playful)).toBe('450ms');
  });

  it('rounds to nearest integer', () => {
    expect(scaleDuration('333ms', AnimationIntensity.Subtle)).toBe('200ms');
  });

  it('handles second-based input', () => {
    expect(scaleDuration('0.5s', AnimationIntensity.Playful)).toBe('750ms');
  });

  it('always returns ms suffix', () => {
    const result = scaleDuration('1s', AnimationIntensity.Normal);
    expect(result).toBe('1000ms');
    expect(result.endsWith('ms')).toBe(true);
  });
});

describe('toSyncfusionEffect', () => {
  it('maps all known effects correctly', () => {
    expect(toSyncfusionEffect(AnimationEffect.None)).toBe('None');
    expect(toSyncfusionEffect(AnimationEffect.Fade)).toBe('FadeIn');
    expect(toSyncfusionEffect(AnimationEffect.SlideUp)).toBe('SlideBottom');
    expect(toSyncfusionEffect(AnimationEffect.SlideDown)).toBe('SlideTop');
    expect(toSyncfusionEffect(AnimationEffect.SlideLeft)).toBe('SlideRight');
    expect(toSyncfusionEffect(AnimationEffect.SlideRight)).toBe('SlideLeft');
    expect(toSyncfusionEffect(AnimationEffect.Zoom)).toBe('ZoomIn');
    expect(toSyncfusionEffect(AnimationEffect.FadeZoom)).toBe('FadeZoom');
  });

  it('returns None for unknown values', () => {
    expect(toSyncfusionEffect('unknown' as AnimationEffect)).toBe('None');
  });
});

describe('toKeyframeName', () => {
  it('maps all known effects to keyframe names', () => {
    expect(toKeyframeName(AnimationEffect.None)).toBe('none');
    expect(toKeyframeName(AnimationEffect.Fade)).toBe('anim-fade');
    expect(toKeyframeName(AnimationEffect.SlideUp)).toBe('anim-slide-up');
    expect(toKeyframeName(AnimationEffect.SlideDown)).toBe('anim-slide-down');
    expect(toKeyframeName(AnimationEffect.SlideLeft)).toBe('anim-slide-left');
    expect(toKeyframeName(AnimationEffect.SlideRight)).toBe('anim-slide-right');
    expect(toKeyframeName(AnimationEffect.Zoom)).toBe('anim-zoom');
    expect(toKeyframeName(AnimationEffect.FadeZoom)).toBe('anim-fade-zoom');
  });

  it('returns none for unknown values', () => {
    expect(toKeyframeName('bogus' as AnimationEffect)).toBe('none');
  });
});
