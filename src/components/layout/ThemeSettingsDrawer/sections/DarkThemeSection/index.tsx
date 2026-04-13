import { FM } from '@/localization/utils/helpers';
import type { BackgroundColors, BorderColors, TextColors } from '@/stores/theme/types';
import { Mode } from '@/stores/theme/types';
import { useThemeStore } from '@/stores/useThemeStore';

import { ColorPicker } from '../../components/ColorPicker';

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

export const DarkThemeSection = (): JSX.Element => {
  const { theme, updateModeConfig } = useThemeStore();
  const darkConfig = theme.dark;

  const handleBackgroundChange = (key: keyof BackgroundColors, rgb: string): void => {
    updateModeConfig(Mode.Dark, { backgrounds: { ...darkConfig.backgrounds, [key]: rgb } });
  };

  const handleTextChange = (key: keyof TextColors, rgb: string): void => {
    updateModeConfig(Mode.Dark, { text: { ...darkConfig.text, [key]: rgb } });
  };

  const handleBorderChange = (key: keyof BorderColors, rgb: string): void => {
    updateModeConfig(Mode.Dark, { borders: { ...darkConfig.borders, [key]: rgb } });
  };

  return (
    <section className="space-y-4">
      <div>
        <h4 className="text-sm font-semibold text-text-primary">
          {FM('themeSettings.darkTheme.title')}
        </h4>
        <p className="mt-1 text-xs text-text-muted">
          {FM('themeSettings.darkTheme.description')}
        </p>
      </div>

      {/* Backgrounds */}
      <div className="space-y-2">
        <h5 className="text-xs font-medium text-text-secondary">
          {FM('themeSettings.darkTheme.backgrounds')}
        </h5>
        <div className="grid grid-cols-2 gap-2">
          {BACKGROUND_KEYS.map((key) => (
            <ColorPicker
              key={key}
              label={key}
              value={darkConfig.backgrounds[key]}
              onChange={(rgb) => handleBackgroundChange(key, rgb)}
            />
          ))}
        </div>
      </div>

      {/* Text Colors */}
      <div className="space-y-2">
        <h5 className="text-xs font-medium text-text-secondary">
          {FM('themeSettings.darkTheme.textColors')}
        </h5>
        <div className="grid grid-cols-2 gap-2">
          {TEXT_KEYS.map((key) => (
            <ColorPicker
              key={key}
              label={key}
              value={darkConfig.text[key]}
              onChange={(rgb) => handleTextChange(key, rgb)}
            />
          ))}
        </div>
      </div>

      {/* Border Colors */}
      <div className="space-y-2">
        <h5 className="text-xs font-medium text-text-secondary">
          {FM('themeSettings.darkTheme.borderColors')}
        </h5>
        <div className="grid grid-cols-2 gap-2">
          {BORDER_KEYS.map((key) => (
            <ColorPicker
              key={key}
              label={key}
              value={darkConfig.borders[key]}
              onChange={(rgb) => handleBorderChange(key, rgb)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
