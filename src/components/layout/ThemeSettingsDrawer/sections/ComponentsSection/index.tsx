import { FM } from '@/localization/helpers';
import type { ComponentsConfig } from '@/stores/theme/types';
import { useThemeStore } from '@/stores/useThemeStore';
import { isValueDefined } from '@/utils/is';

const COMPONENT_KEYS: Array<keyof ComponentsConfig> = [
  'header',
  'sidebar',
  'buttons',
  'inputs',
  'dataGrid',
  'cards',
  'modals',
  'badges',
];

export const ComponentsSection = (): JSX.Element => {
  const { theme } = useThemeStore();

  const getComponentPropCount = (componentKey: keyof ComponentsConfig): number => {
    const component = theme.components[componentKey];
    const isObject = typeof component === 'object';
    if (!isObject || !isValueDefined(component)) return 0;
    return Object.keys(component).length;
  };

  return (
    <section className="space-y-4">
      <div>
        <h4 className="text-sm font-semibold text-text-primary">
          {FM('themeSettings.components.title')}
        </h4>
        <p className="mt-1 text-xs text-text-muted">
          {FM('themeSettings.components.description')}
        </p>
      </div>

      {/* Component List */}
      <div className="space-y-2">
        {COMPONENT_KEYS.map((key) => (
          <div
            key={key}
            className="flex items-center justify-between rounded border border-border bg-surface-sunken px-3 py-2 transition-colors hover:bg-surface"
          >
            <span className="text-xs font-medium capitalize text-text-primary">{key}</span>
            <span className="text-xs text-text-muted">
              {getComponentPropCount(key)} {FM('themeSettings.components.properties')}
            </span>
          </div>
        ))}
      </div>

      <p className="text-xs italic text-text-muted">
        {FM('themeSettings.components.editHint')}
      </p>
    </section>
  );
};
