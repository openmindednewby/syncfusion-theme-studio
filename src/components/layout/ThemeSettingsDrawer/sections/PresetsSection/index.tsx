import { FM } from '@/localization/helpers';
import { buildDerivedComponents } from '@/stores/theme/actions';
import type { ThemePreset } from '@/stores/theme/presets';
import { themePresets } from '@/stores/theme/presets';
import { useThemeStore } from '@/stores/useThemeStore';
import { generateDerivedColors } from '@/utils';

import { PresetCard } from './PresetCard';

export const PresetsSection = (): JSX.Element => {
  const { theme, updateTheme } = useThemeStore();

  const handleApplyPreset = (preset: ThemePreset): void => {
    const derived = generateDerivedColors(preset.theme.primary);
    const components = buildDerivedComponents(preset.theme.components, derived);
    updateTheme({ ...preset.theme, components });
  };

  return (
    <section className="space-y-4">
      <div>
        <h4 className="text-sm font-semibold text-text-primary">
          {FM('themeSettings.presets.title')}
        </h4>
        <p className="mt-1 text-xs text-text-muted">
          {FM('themeSettings.presets.description')}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {themePresets.map((preset: ThemePreset) => (
          <PresetCard
            key={preset.id}
            isActive={theme.id === preset.id}
            preset={preset}
            onApply={handleApplyPreset}
          />
        ))}
      </div>
    </section>
  );
};
