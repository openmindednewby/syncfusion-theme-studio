import { FM } from '@/localization/helpers';
import { buildDerivedComponents } from '@/stores/theme/actions';
import { DEFAULT_COMPONENTS_DARK, DEFAULT_COMPONENTS_LIGHT } from '@/stores/theme/defaults';
import type { ThemePreset } from '@/stores/theme/presets';
import { themePresets } from '@/stores/theme/presets';
import type { ButtonsComponentConfig, ComponentsConfig } from '@/stores/theme/types';
import { useThemeStore } from '@/stores/useThemeStore';
import { generateDerivedColors } from '@/utils';

import { PresetCard } from './PresetCard';

/** Re-apply explicit sidebar overrides from a preset after auto-derivation.
 * buildDerivedComponents overrides sidebar.activeItemBackground with primary['700'],
 * but presets may define explicit sidebar colors (e.g., from Figma nav menu extraction). */
function withPresetSidebarOverrides(
  components: ComponentsConfig,
  presetComponents: ComponentsConfig,
): ComponentsConfig {
  const defaultLight = DEFAULT_COMPONENTS_LIGHT.sidebar;
  const defaultDark = DEFAULT_COMPONENTS_DARK.sidebar;
  const presetLight = presetComponents.light.sidebar;
  const presetDark = presetComponents.dark.sidebar;

  const lightSidebar = presetLight.activeItemBackground !== defaultLight.activeItemBackground
    ? { ...components.light.sidebar, activeItemBackground: presetLight.activeItemBackground, activeItemTextColor: presetLight.activeItemTextColor }
    : components.light.sidebar;

  const darkSidebar = presetDark.activeItemBackground !== defaultDark.activeItemBackground
    ? { ...components.dark.sidebar, activeItemBackground: presetDark.activeItemBackground, activeItemTextColor: presetDark.activeItemTextColor }
    : components.dark.sidebar;

  return {
    light: { ...components.light, sidebar: lightSidebar },
    dark: { ...components.dark, sidebar: darkSidebar },
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

export const PresetsSection = (): JSX.Element => {
  const { theme, updateTheme } = useThemeStore();

  const handleApplyPreset = (preset: ThemePreset): void => {
    const derived = generateDerivedColors(preset.theme.primary);
    const derivedComponents = buildDerivedComponents(preset.theme.components, derived);
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
