import { useState } from 'react';

import { FM } from '@/localization/utils/helpers';

const SAVED_TIMEOUT_MS = 2000;

const enum ThemeOption {
  Light = 'light',
  Dark = 'dark',
  System = 'system',
}

const enum DensityOption {
  Comfortable = 'comfortable',
  Compact = 'compact',
}

const THEME_OPTIONS: Array<{ value: ThemeOption; labelKey: string }> = [
  { value: ThemeOption.Light, labelKey: 'settings.appearance.themes.light' },
  { value: ThemeOption.Dark, labelKey: 'settings.appearance.themes.dark' },
  { value: ThemeOption.System, labelKey: 'settings.appearance.themes.system' },
];

const DENSITY_OPTIONS: Array<{ value: DensityOption; labelKey: string }> = [
  { value: DensityOption.Comfortable, labelKey: 'settings.appearance.densities.comfortable' },
  { value: DensityOption.Compact, labelKey: 'settings.appearance.densities.compact' },
];

const AppearanceSettings = (): JSX.Element => {
  const [theme, setTheme] = useState<ThemeOption>(ThemeOption.System);
  const [density, setDensity] = useState<DensityOption>(DensityOption.Comfortable);
  const [saved, setSaved] = useState(false);

  const handleSave = (): void => {
    setSaved(true);
    setTimeout(() => setSaved(false), SAVED_TIMEOUT_MS);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-text-primary">
        {FM('settings.appearance.title')}
      </h2>
      <div>
        <p className="mb-2 text-sm font-medium text-text-secondary">
          {FM('settings.appearance.theme')}
        </p>
        <div className="flex gap-4">
          {THEME_OPTIONS.map((opt) => (
            <label key={opt.value} className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                checked={theme === opt.value}
                className="accent-primary-600"
                name="theme"
                type="radio"
                value={opt.value}
                onChange={() => setTheme(opt.value)}
              />
              <span className="text-text-primary">{FM(opt.labelKey)}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-text-secondary">
          {FM('settings.appearance.density')}
        </p>
        <div className="flex gap-4">
          {DENSITY_OPTIONS.map((opt) => (
            <label key={opt.value} className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                checked={density === opt.value}
                className="accent-primary-600"
                name="density"
                type="radio"
                value={opt.value}
                onChange={() => setDensity(opt.value)}
              />
              <span className="text-text-primary">{FM(opt.labelKey)}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3 pt-2">
        <button
          aria-label={FM('settings.appearance.saveLabel')}
          className="rounded-md bg-primary-600 px-4 py-2 text-sm text-white hover:bg-primary-700"
          data-testid="settings-save-appearance"
          type="button"
          onClick={handleSave}
        >
          {FM('common.save')}
        </button>
        {saved ? (
          <span className="text-sm text-success-500">
            {FM('settings.appearance.saved')}
            <span className="ml-1 text-xs text-text-muted">{FM('settings.demoHint')}</span>
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default AppearanceSettings;
