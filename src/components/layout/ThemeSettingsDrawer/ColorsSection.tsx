import { FM } from '@/localization/helpers';
import { useThemeStore } from '@/stores/useThemeStore';

import { ColorPicker } from './ColorPicker';

const COLOR_SHADES = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'] as const;

/**
 * Palette icon for section header
 */
const PaletteIcon = (): JSX.Element => (
  <svg
    aria-hidden="true"
    className="h-5 w-5 text-primary-500"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.75}
    viewBox="0 0 24 24"
  >
    <path
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.38 0 2.5-1.12 2.5-2.5 0-.61-.23-1.17-.62-1.59-.35-.36-.57-.86-.57-1.41 0-1.1.9-2 2-2h2.34c2.87 0 5.35-2.34 5.35-5.21C22 5.67 17.52 2 12 2z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="8" cy="10" fill="currentColor" r="1.5" />
    <circle cx="12" cy="7" fill="currentColor" r="1.5" />
    <circle cx="16" cy="10" fill="currentColor" r="1.5" />
  </svg>
);

export const ColorsSection = (): JSX.Element => {
  const { theme, updatePrimaryColor } = useThemeStore();

  return (
    <section className="theme-section space-y-4">
      {/* Section Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50">
          <PaletteIcon />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-text-primary">
            {FM('themeSettings.primaryColors')}
          </h3>
          <p className="text-xs text-text-muted">
            Define your brand color palette
          </p>
        </div>
      </div>

      {/* Color Swatches Grid */}
      <div className="color-palette rounded-xl border border-border bg-surface-elevated/30 p-4">
        {/* Primary gradient preview bar */}
        <div className="mb-4 flex h-8 overflow-hidden rounded-lg shadow-sm">
          {COLOR_SHADES.map((shade) => (
            <div
              key={shade}
              className="flex-1 transition-transform duration-200 first:rounded-l-lg last:rounded-r-lg hover:scale-y-110"
              style={{ backgroundColor: `rgb(${theme.primary[shade]})` }}
              title={`Primary ${shade}`}
            />
          ))}
        </div>

        {/* Compact color pickers */}
        <div className="grid grid-cols-5 gap-3">
          {COLOR_SHADES.map((shade) => (
            <ColorPicker
              key={shade}
              compact
              label={shade}
              value={theme.primary[shade]}
              onChange={(rgb) => updatePrimaryColor(shade, rgb)}
            />
          ))}
        </div>
      </div>

      {/* Helper text */}
      <p className="text-[11px] italic text-text-muted">
        Tip: Start with 500 shade and adjust others for contrast
      </p>
    </section>
  );
};
