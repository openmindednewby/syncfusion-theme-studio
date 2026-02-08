import { FM } from '@/localization/helpers';
import type { BackgroundColors, BorderColors, TextColors } from '@/stores/theme/types';
import { useThemeStore } from '@/stores/useThemeStore';

import { ColorPicker } from '../../ColorPicker';

const BACKGROUND_KEYS: Array<keyof BackgroundColors> = [
  'page',
  'surface',
  'surfaceElevated',
  'surfaceSunken',
  'overlay',
];

const TEXT_KEYS: Array<keyof TextColors> = [
  'primary',
  'secondary',
  'muted',
  'disabled',
  'inverse',
  'link',
  'linkHover',
];

const BORDER_KEYS: Array<keyof BorderColors> = ['default', 'strong', 'subtle', 'focus', 'divider'];

export const LightThemeSection = (): JSX.Element => {
  const { theme, updateModeConfig } = useThemeStore();
  const lightConfig = theme.light;

  const handleBackgroundChange = (key: keyof BackgroundColors, rgb: string): void => {
    updateModeConfig('light', { backgrounds: { ...lightConfig.backgrounds, [key]: rgb } });
  };

  const handleTextChange = (key: keyof TextColors, rgb: string): void => {
    updateModeConfig('light', { text: { ...lightConfig.text, [key]: rgb } });
  };

  const handleBorderChange = (key: keyof BorderColors, rgb: string): void => {
    updateModeConfig('light', { borders: { ...lightConfig.borders, [key]: rgb } });
  };

  return (
    <section className="space-y-4">
      <div>
        <h4 className="text-sm font-semibold text-text-primary">
          {FM('themeSettings.lightTheme.title')}
        </h4>
        <p className="mt-1 text-xs text-text-muted">
          {FM('themeSettings.lightTheme.description')}
        </p>
      </div>

      {/* Backgrounds */}
      <div className="space-y-2">
        <h5 className="text-xs font-medium text-text-secondary">
          {FM('themeSettings.lightTheme.backgrounds')}
        </h5>
        <div className="grid grid-cols-2 gap-2">
          {BACKGROUND_KEYS.map((key) => (
            <ColorPicker
              key={key}
              label={key}
              value={lightConfig.backgrounds[key]}
              onChange={(rgb) => handleBackgroundChange(key, rgb)}
            />
          ))}
        </div>
      </div>

      {/* Text Colors */}
      <div className="space-y-2">
        <h5 className="text-xs font-medium text-text-secondary">
          {FM('themeSettings.lightTheme.textColors')}
        </h5>
        <div className="grid grid-cols-2 gap-2">
          {TEXT_KEYS.map((key) => (
            <ColorPicker
              key={key}
              label={key}
              value={lightConfig.text[key]}
              onChange={(rgb) => handleTextChange(key, rgb)}
            />
          ))}
        </div>
      </div>

      {/* Border Colors */}
      <div className="space-y-2">
        <h5 className="text-xs font-medium text-text-secondary">
          {FM('themeSettings.lightTheme.borderColors')}
        </h5>
        <div className="grid grid-cols-2 gap-2">
          {BORDER_KEYS.map((key) => (
            <ColorPicker
              key={key}
              label={key}
              value={lightConfig.borders[key]}
              onChange={(rgb) => handleBorderChange(key, rgb)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
