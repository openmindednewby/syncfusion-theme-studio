import { useState } from 'react';

import { FM } from '@/localization/helpers';
import { useThemeStore } from '@/stores/useThemeStore';
import { rgbStringToHex, hexToRgbString } from '@/utils';

import { ColorPicker } from './ColorPicker';
import { InfoIcon, PaletteIcon, SlidersIcon, WandIcon } from './ColorsSectionIcons';

const COLOR_SHADES = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'] as const;
const DARK_SHADE_THRESHOLD = 500;

type PaletteMode = 'auto' | 'manual';

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
  const [paletteMode, setPaletteMode] = useState<PaletteMode>('auto');

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
          <p className="text-xs text-text-muted">Define your brand color palette</p>
        </div>
      </div>

      {/* Mode Toggle */}
      <div className="flex rounded-lg border border-border bg-surface p-1">
        <ModeButton
          active={paletteMode === 'auto'}
          icon={<WandIcon />}
          label="Auto Palette"
          onClick={() => setPaletteMode('auto')}
        />
        <ModeButton
          active={paletteMode === 'manual'}
          icon={<SlidersIcon />}
          label="Manual"
          onClick={() => setPaletteMode('manual')}
        />
      </div>

      {/* Auto Mode */}
      {paletteMode === 'auto' && (
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-surface-elevated/30 p-4">
            <label className="text-sm font-medium text-text-primary" htmlFor="base-color">Base Color (500)</label>
            <p className="mt-0.5 mb-3 text-xs text-text-muted">Choose your brand color - shades generate automatically</p>
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

          <div className="flex items-start gap-2 rounded-lg border border-info-500/20 bg-info-50/50 p-3">
            <InfoIcon />
            <div>
              <p className="text-xs font-medium text-info-700">Auto-updates components</p>
              <p className="mt-0.5 text-[11px] text-info-700/80">
                Updates: Buttons (primary), Sidebar (active), Input (focus)
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-surface-elevated/30 p-4">
            <p className="mb-3 text-xs font-medium text-text-secondary">Generated Palette</p>
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
      {paletteMode === 'manual' && (
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
            Tip: In manual mode, each shade is independent. Changes won&apos;t cascade to components.
          </p>
        </div>
      )}
    </section>
  );
};
