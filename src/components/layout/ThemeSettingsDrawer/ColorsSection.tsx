import { FM } from '@/localization/helpers';
import { useThemeStore } from '@/stores/useThemeStore';

import { ColorPicker } from './ColorPicker';

const COLOR_SHADES = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'] as const;

export const ColorsSection = (): JSX.Element => {
  const { theme, updatePrimaryColor } = useThemeStore();

  return (
    <section className="space-y-3">
      <h4 className="text-sm font-semibold text-text-primary">
        {FM('themeSettings.primaryColors')}
      </h4>
      <div className="grid grid-cols-2 gap-2">
        {COLOR_SHADES.map((shade) => (
          <ColorPicker
            key={shade}
            label={shade}
            value={theme.primary[shade]}
            onChange={(rgb) => updatePrimaryColor(shade, rgb)}
          />
        ))}
      </div>
    </section>
  );
};
