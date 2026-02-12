import { useState } from 'react';

import AlertNative, { AlertVariant } from '@/components/ui/AlertNative';
import { FM } from '@/localization/helpers';
import { useThemeStore } from '@/stores/useThemeStore';
import { rgbStringToHex, hexToRgbString } from '@/utils';

import { ColorPicker } from './ColorPicker';
import { PaletteIcon, SlidersIcon, WandIcon } from './ColorsSectionIcons';

const COLOR_SHADES = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'] as const;
const DARK_SHADE_THRESHOLD = 500;

const enum PaletteMode {
  Auto = 'auto',
  Manual = 'manual',
}

interface ModeButtonProps {
  active: boolean;
  icon: JSX.Element;
  label: string;
  onClick: () => void;
}

const ModeButton = ({ active, icon, label, onClick }: ModeButtonProps): JSX.Element => (
  <button
    className={`flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2 text-xs font-medium transition-colors ${
      active ? 'bg-primary-500 text-white' : 'text-text-secondary hover:bg-surface-elevated'
    }`}
    type="button"
    onClick={onClick}
  >
    {icon}
    {label}
  </button>
);

export const ColorsSection = (): JSX.Element => {
  const { theme, updatePrimaryColor, updatePrimaryPalette } = useThemeStore();
  const [paletteMode, setPaletteMode] = useState<PaletteMode>(PaletteMode.Auto);

  const baseColorHex = rgbStringToHex(theme.primary['500']);

  const handleBaseColorChange = (hexColor: string): void => {
    const rgbString = hexToRgbString(hexColor);
    updatePrimaryPalette(rgbString, true);
  };

  const handleHexInputChange = (value: string): void => {
    const isValidHex = /^#[0-9A-Fa-f]{6}$/.test(value);
    if (isValidHex) handleBaseColorChange(value);
  };

  return (
    <section className="theme-section space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50">
          <PaletteIcon />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-text-primary">{FM('themeSettings.primaryColors')}</h3>
          <p className="text-xs text-text-muted">{FM('themeSettings.brandPaletteDesc')}</p>
        </div>
      </div>

      {/* Mode Toggle */}
      <div className="flex rounded-lg border border-border bg-surface p-1">
        <ModeButton
          active={paletteMode === PaletteMode.Auto}
          icon={<WandIcon />}
          label={FM('themeSettings.autoPalette')}
          onClick={() => setPaletteMode(PaletteMode.Auto)}
        />
        <ModeButton
          active={paletteMode === PaletteMode.Manual}
          icon={<SlidersIcon />}
          label={FM('themeSettings.manual')}
          onClick={() => setPaletteMode(PaletteMode.Manual)}
        />
      </div>

      {/* Auto Mode */}
      {paletteMode === PaletteMode.Auto && (
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-surface-elevated/30 p-4">
            <label className="text-sm font-medium text-text-primary" htmlFor="base-color">{FM('themeSettings.baseColor')}</label>
            <p className="mt-0.5 mb-3 text-xs text-text-muted">{FM('themeSettings.baseColorDesc')}</p>
            <div className="flex items-center gap-3">
              <input
                className="h-12 w-20 cursor-pointer rounded-lg border border-border"
                id="base-color"
                type="color"
                value={baseColorHex}
                onChange={(e) => handleBaseColorChange(e.target.value)}
              />
              <input
                className="flex-1 rounded-md border border-border bg-surface px-3 py-2 text-sm font-mono text-text-primary"
                placeholder="#3b82f6"
                type="text"
                value={baseColorHex}
                onChange={(e) => handleHexInputChange(e.target.value)}
              />
            </div>
          </div>

          <AlertNative title={FM('themeSettings.autoUpdatesTitle')} variant={AlertVariant.Info}>
            {FM('themeSettings.autoUpdatesDesc')}
          </AlertNative>

          <div className="rounded-xl border border-border bg-surface-elevated/30 p-4">
            <p className="mb-3 text-xs font-medium text-text-secondary">{FM('themeSettings.generatedPalette')}</p>
            <div className="flex h-10 overflow-hidden rounded-lg shadow-sm">
              {COLOR_SHADES.map((shade) => {
                const isDark = Number(shade) >= DARK_SHADE_THRESHOLD;
                return (
                  <div
                    key={shade}
                    className="flex flex-1 items-center justify-center text-[10px] font-medium first:rounded-l-lg last:rounded-r-lg hover:scale-y-110"
                    style={{ backgroundColor: `rgb(${theme.primary[shade]})`, color: isDark ? 'white' : 'rgb(17 24 39)' }}
                    title={`Primary ${shade}`}
                  >
                    {shade}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Manual Mode */}
      {paletteMode === PaletteMode.Manual && (
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-surface-elevated/30 p-4">
            <div className="mb-4 flex h-8 overflow-hidden rounded-lg shadow-sm">
              {COLOR_SHADES.map((shade) => (
                <div
                  key={shade}
                  className="flex-1 first:rounded-l-lg last:rounded-r-lg hover:scale-y-110"
                  style={{ backgroundColor: `rgb(${theme.primary[shade]})` }}
                  title={`Primary ${shade}`}
                />
              ))}
            </div>
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
          <p className="text-[11px] italic text-text-muted">
            {FM('themeSettings.manualTip')}
          </p>
        </div>
      )}
    </section>
  );
};
