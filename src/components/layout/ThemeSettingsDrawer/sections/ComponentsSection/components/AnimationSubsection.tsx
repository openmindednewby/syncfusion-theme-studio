import { FM } from '@/localization/utils/helpers';
import { AnimationEffect } from '@/stores/theme/types/animationEffect';
import { isValueDefined } from '@/utils/is';

const EFFECT_OPTIONS = [
  { value: AnimationEffect.None, label: 'themeSettings.layout.animations.effectNone' },
  { value: AnimationEffect.Fade, label: 'themeSettings.layout.animations.effectFade' },
  { value: AnimationEffect.SlideUp, label: 'themeSettings.layout.animations.effectSlideUp' },
  { value: AnimationEffect.SlideDown, label: 'themeSettings.layout.animations.effectSlideDown' },
  { value: AnimationEffect.SlideLeft, label: 'themeSettings.layout.animations.effectSlideLeft' },
  { value: AnimationEffect.SlideRight, label: 'themeSettings.layout.animations.effectSlideRight' },
  { value: AnimationEffect.Zoom, label: 'themeSettings.layout.animations.effectZoom' },
  { value: AnimationEffect.FadeZoom, label: 'themeSettings.layout.animations.effectFadeZoom' },
];

const EFFECT_VALUES = new Set<string>(EFFECT_OPTIONS.map((opt) => opt.value));

interface AnimationSubsectionProps {
  animationEffect?: AnimationEffect;
  animationDuration?: string;
  onEffectChange?: (effect: AnimationEffect) => void;
  onDurationChange?: (duration: string) => void;
  /** Set false for transition-only components (Button, Input, etc.) */
  showEffectSelector?: boolean;
}

interface EffectProps {
  effect: AnimationEffect;
  onChange: (effect: AnimationEffect) => void;
}

interface DurationProps {
  duration: string;
  onChange: (duration: string) => void;
}

function isAnimationEffect(value: string): value is AnimationEffect {
  return EFFECT_VALUES.has(value);
}

function narrowEffect(show: boolean, effect?: AnimationEffect, onChange?: (e: AnimationEffect) => void): EffectProps | null {
  if (!show) return null;
  if (!isValueDefined(effect) || !isValueDefined(onChange)) return null;
  return { effect, onChange };
}

function narrowDuration(duration?: string, onChange?: (d: string) => void): DurationProps | null {
  if (!isValueDefined(duration) || !isValueDefined(onChange)) return null;
  return { duration, onChange };
}

const handleEffectSelect = (e: React.ChangeEvent<HTMLSelectElement>, onChange: (effect: AnimationEffect) => void): void => {
  const val = e.target.value;
  if (isAnimationEffect(val)) onChange(val);
};

export const AnimationSubsection = ({
  animationDuration,
  animationEffect,
  onDurationChange,
  onEffectChange,
  showEffectSelector = true,
}: AnimationSubsectionProps): JSX.Element => {
  const effectProps = narrowEffect(showEffectSelector, animationEffect, onEffectChange);
  const durationProps = narrowDuration(animationDuration, onDurationChange);

  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-text-secondary">
        {FM('themeSettings.layout.animations.title')}
      </p>
      <div className="space-y-2 pl-2">
        {isValueDefined(effectProps) && (
          <div className="space-y-1">
            <label className="text-xs text-text-muted">
              {FM('themeSettings.layout.animations.animationEffect')}
            </label>
            <select
              className="w-full rounded border border-border bg-surface px-2 py-1 text-xs text-text-primary"
              value={effectProps.effect}
              onChange={(e) => handleEffectSelect(e, effectProps.onChange)}
            >
              {EFFECT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{FM(opt.label)}</option>
              ))}
            </select>
          </div>
        )}

        {isValueDefined(durationProps) && (
          <div className="space-y-1">
            <label className="text-xs text-text-muted">
              {FM('themeSettings.layout.animations.animationDuration')}
            </label>
            <input
              className="w-full rounded border border-border bg-surface px-2 py-1 text-xs text-text-primary"
              placeholder="200ms"
              type="text"
              value={durationProps.duration}
              onChange={(e) => durationProps.onChange(e.target.value)}
            />
          </div>
        )}
      </div>
    </div>
  );
};
