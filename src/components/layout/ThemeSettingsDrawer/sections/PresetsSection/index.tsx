import { useEffect, useRef } from 'react';

import { FM } from '@/localization/utils/helpers';
import { buildDerivedComponents } from '@/stores/theme/actions';
import { DEFAULT_COMPONENTS_DARK, DEFAULT_COMPONENTS_LIGHT } from '@/stores/theme/defaults';
import type { ButtonsComponentConfig, ComponentsConfig } from '@/stores/theme/types';
import type { ThemePreset } from '@/stores/theme/utils/presets';
import { themePresets } from '@/stores/theme/utils/presets';
import { useThemeStore } from '@/stores/useThemeStore';

import { PresetCard } from './PresetCard';

export const PresetsSection = (): JSX.Element => {
  const { theme, updateTheme } = useThemeStore();
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const active = gridRef.current?.querySelector('[aria-pressed="true"]');
    active?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [theme.id]);

  const handleApplyPreset = (preset: ThemePreset): void => {
    const derivedComponents = buildDerivedComponents(preset.theme.components, preset.theme.primary);
    const sidebarFixed = withPresetSidebarOverrides(derivedComponents, preset.theme.components);
    const components = withPresetButtonOverrides(sidebarFixed, preset.theme.components);
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

      <div ref={gridRef} className="grid grid-cols-2 gap-3">
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

/** Re-apply explicit sidebar overrides from a preset after auto-derivation.
 * buildDerivedComponents overrides sidebar.activeItemBackground with primary['700'],
 * but presets define explicit sidebar colors (e.g., from Figma nav menu extraction).
 * Always restore the preset values — even when they match defaults — since auto-derivation
 * replaces them with palette-derived shades regardless. */
function withPresetSidebarOverrides(
  components: ComponentsConfig,
  presetComponents: ComponentsConfig,
): ComponentsConfig {
  const presetLight = presetComponents.light.sidebar;
  const presetDark = presetComponents.dark.sidebar;

  return {
    light: { ...components.light, sidebar: { ...components.light.sidebar, activeItemBackground: presetLight.activeItemBackground, activeItemTextColor: presetLight.activeItemTextColor } },
    dark: { ...components.dark, sidebar: { ...components.dark.sidebar, activeItemBackground: presetDark.activeItemBackground, activeItemTextColor: presetDark.activeItemTextColor } },
  };
}

const BUTTON_VARIANTS = ['primary', 'secondary', 'outline', 'ghost', 'danger'] as const;

/** Re-apply explicit button overrides from a preset after auto-derivation.
 * buildDerivedButtons overwrites primary button colors with palette-derived blue;
 * applyDisabledOverrides overwrites disabled states. This restores Figma-specific values. */
function withPresetButtonOverrides(
  components: ComponentsConfig,
  presetComponents: ComponentsConfig,
): ComponentsConfig {
  const applyMode = (
    derived: ButtonsComponentConfig,
    preset: ButtonsComponentConfig,
    defaults: ButtonsComponentConfig,
  ): ButtonsComponentConfig => {
    let result = derived;
    for (const v of BUTTON_VARIANTS) 
      if (preset[v].background !== defaults[v].background) 
        result = { ...result, [v]: { ...derived[v], ...preset[v] } };
      
    
    return result;
  };

  return {
    light: { ...components.light, buttons: applyMode(components.light.buttons, presetComponents.light.buttons, DEFAULT_COMPONENTS_LIGHT.buttons) },
    dark: { ...components.dark, buttons: applyMode(components.dark.buttons, presetComponents.dark.buttons, DEFAULT_COMPONENTS_DARK.buttons) },
  };
}
