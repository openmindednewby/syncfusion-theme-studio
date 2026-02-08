import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';
import type { ThemePreset } from '@/stores/theme/presets';
import { isValueDefined } from '@/utils/is';


const RGB_SEPARATOR = ' ';

function rgbToStyle(rgb: string): string {
  const parts = rgb.split(RGB_SEPARATOR);
  return `rgb(${parts.join(', ')})`;
}

interface PresetCardProps {
  preset: ThemePreset;
  isActive: boolean;
  onApply: (preset: ThemePreset) => void;
}

export const PresetCard = ({ isActive, onApply, preset }: PresetCardProps): JSX.Element => {
  const handleClick = (): void => {
    onApply(preset);
  };

  const activeClass = isActive ? 'ring-2 ring-primary-500 ring-offset-2' : '';
  const hoverClass = 'hover:shadow-md hover:border-primary-300';

  return (
    <button
      aria-label={FM('themeSettings.presets.applyPreset', preset.name)}
      aria-pressed={isActive}
      className={`flex w-full flex-col rounded-lg border border-border bg-surface p-3 transition-all duration-fast ${hoverClass} ${activeClass}`}
      data-preset-id={preset.id}
      data-testid={TestIds.THEME_PRESET_CARD}
      type="button"
      onClick={handleClick}
    >
      {/* Color Preview Strip */}
      <div className="mb-2 flex h-6 w-full overflow-hidden rounded">
        {preset.previewColors.map((color) => (
          <div
            key={color}
            className="flex-1"
            style={{ backgroundColor: rgbToStyle(color) }}
          />
        ))}
      </div>

      {/* Preset Name */}
      <span className="text-sm font-medium text-text-primary">{preset.name}</span>

      {/* Description */}
      {isValueDefined(preset.description) && preset.description !== '' ? (
        <span className="mt-0.5 text-xs text-text-muted">{preset.description}</span>
      ) : null}

      {/* Active Indicator */}
      {isActive ? <span className="mt-1 text-xs text-primary-500">{FM('themeSettings.presets.active')}</span> : null}
    </button>
  );
};
