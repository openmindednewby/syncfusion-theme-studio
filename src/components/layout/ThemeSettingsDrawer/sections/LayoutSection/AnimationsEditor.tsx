import { FM } from '@/localization/helpers';
import type { AnimationConfig } from '@/stores/theme/types';
import { AnimationEffect } from '@/stores/theme/types/animationEffect';
import { AnimationIntensity } from '@/stores/theme/types/animationIntensity';

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

const INTENSITY_OPTIONS = [
  { value: AnimationIntensity.None, label: 'themeSettings.layout.animations.intensityNone' },
  { value: AnimationIntensity.Subtle, label: 'themeSettings.layout.animations.intensitySubtle' },
  { value: AnimationIntensity.Normal, label: 'themeSettings.layout.animations.intensityNormal' },
  { value: AnimationIntensity.Playful, label: 'themeSettings.layout.animations.intensityPlayful' },
];

const INTENSITY_VALUES = new Set<string>(INTENSITY_OPTIONS.map((opt) => opt.value));

function isAnimationEffect(value: string): value is AnimationEffect {
  return EFFECT_VALUES.has(value);
}

function isAnimationIntensity(value: string): value is AnimationIntensity {
  return INTENSITY_VALUES.has(value);
}

interface AnimationsEditorProps {
  animations: AnimationConfig;
  onUpdate: (updates: Partial<AnimationConfig>) => void;
}

export const AnimationsEditor = ({ animations, onUpdate }: AnimationsEditorProps): JSX.Element => {
  return (
    <div className="space-y-3">
      <h5 className="text-xs font-medium text-text-secondary">
        {FM('themeSettings.layout.animations.title')}
      </h5>

      {/* Enable toggle */}
      <label className="flex items-center justify-between gap-2">
        <span className="text-xs text-text-muted">
          {FM('themeSettings.layout.animations.enabled')}
        </span>
        <button
          aria-checked={animations.enabled}
          className="toggle-track h-5 w-9"
          role="switch"
          type="button"
          onClick={() => onUpdate({ enabled: !animations.enabled })}
        >
          <span
            className={`toggle-thumb h-4 w-4 ${animations.enabled ? 'translate-x-4' : 'translate-x-0.5'}`}
          />
        </button>
      </label>

      {/* Default Effect */}
      <div className="space-y-1">
        <label className="text-xs text-text-muted">
          {FM('themeSettings.layout.animations.defaultEffect')}
        </label>
        <select
          className="w-full rounded border border-border bg-surface px-2 py-1 text-xs text-text-primary"
          value={animations.defaultEffect}
          onChange={(e) => { const val = e.target.value; if (isAnimationEffect(val)) onUpdate({ defaultEffect: val }); }}
        >
          {EFFECT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{FM(opt.label)}</option>
          ))}
        </select>
      </div>

      {/* Default Duration */}
      <div className="space-y-1">
        <label className="text-xs text-text-muted">
          {FM('themeSettings.layout.animations.defaultDuration')}
        </label>
        <input
          className="w-full rounded border border-border bg-surface px-2 py-1 text-xs text-text-primary"
          placeholder="200ms"
          type="text"
          value={animations.defaultDuration}
          onChange={(e) => onUpdate({ defaultDuration: e.target.value })}
        />
      </div>

      {/* Default Easing */}
      <div className="space-y-1">
        <label className="text-xs text-text-muted">
          {FM('themeSettings.layout.animations.defaultEasing')}
        </label>
        <input
          className="w-full rounded border border-border bg-surface px-2 py-1 text-xs text-text-primary"
          placeholder="ease-out"
          type="text"
          value={animations.defaultEasing}
          onChange={(e) => onUpdate({ defaultEasing: e.target.value })}
        />
      </div>

      {/* Intensity */}
      <div className="space-y-1">
        <label className="text-xs text-text-muted">
          {FM('themeSettings.layout.animations.intensity')}
        </label>
        <select
          className="w-full rounded border border-border bg-surface px-2 py-1 text-xs text-text-primary"
          value={animations.intensity}
          onChange={(e) => { const val = e.target.value; if (isAnimationIntensity(val)) onUpdate({ intensity: val }); }}
        >
          {INTENSITY_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{FM(opt.label)}</option>
          ))}
        </select>
      </div>

      {/* Respect Reduced Motion */}
      <label className="flex items-center justify-between gap-2">
        <span className="text-xs text-text-muted">
          {FM('themeSettings.layout.animations.respectReducedMotion')}
        </span>
        <button
          aria-checked={animations.respectReducedMotion}
          className="toggle-track h-5 w-9"
          role="switch"
          type="button"
          onClick={() => onUpdate({ respectReducedMotion: !animations.respectReducedMotion })}
        >
          <span
            className={`toggle-thumb h-4 w-4 ${animations.respectReducedMotion ? 'translate-x-4' : 'translate-x-0.5'}`}
          />
        </button>
      </label>
    </div>
  );
};
