import { FM } from '@/localization/helpers';
import { useThemeStore } from '@/stores/useThemeStore';

const BORDER_RADIUS_KEYS = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full'] as const;
const SHADOW_KEYS = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;

export const LayoutSection = (): JSX.Element => {
  const { theme } = useThemeStore();

  return (
    <section className="space-y-4">
      <div>
        <h4 className="text-sm font-semibold text-text-primary">
          {FM('themeSettings.layout.title')}
        </h4>
        <p className="mt-1 text-xs text-text-muted">
          {FM('themeSettings.layout.description')}
        </p>
      </div>

      {/* Layout Dimensions */}
      <div className="space-y-2">
        <h5 className="text-xs font-medium text-text-secondary">
          {FM('themeSettings.layout.dimensions')}
        </h5>
        <div className="space-y-2">
          <div className="flex items-center justify-between rounded bg-surface-sunken px-3 py-2">
            <span className="text-xs text-text-secondary">
              {FM('themeSettings.layout.sidebarWidth')}
            </span>
            <span className="text-xs text-text-muted">{theme.layout.sidebarWidth}</span>
          </div>
          <div className="flex items-center justify-between rounded bg-surface-sunken px-3 py-2">
            <span className="text-xs text-text-secondary">
              {FM('themeSettings.layout.sidebarCollapsed')}
            </span>
            <span className="text-xs text-text-muted">{theme.layout.sidebarCollapsedWidth}</span>
          </div>
          <div className="flex items-center justify-between rounded bg-surface-sunken px-3 py-2">
            <span className="text-xs text-text-secondary">
              {FM('themeSettings.layout.headerHeight')}
            </span>
            <span className="text-xs text-text-muted">{theme.layout.headerHeight}</span>
          </div>
          <div className="flex items-center justify-between rounded bg-surface-sunken px-3 py-2">
            <span className="text-xs text-text-secondary">
              {FM('themeSettings.layout.spacing')}
            </span>
            <span className="text-xs text-text-muted">{theme.spacing.baseUnit}px base</span>
          </div>
        </div>
      </div>

      {/* Border Radius */}
      <div className="space-y-2">
        <h5 className="text-xs font-medium text-text-secondary">
          {FM('themeSettings.layout.borderRadius')}
        </h5>
        <div className="grid grid-cols-2 gap-2">
          {BORDER_RADIUS_KEYS.map((key) => (
            <div key={key} className="flex items-center justify-between rounded bg-surface-sunken px-3 py-2">
              <span className="text-xs font-medium text-text-secondary">{key}</span>
              <span className="text-xs text-text-muted">{theme.borderRadius[key]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Shadows */}
      <div className="space-y-2">
        <h5 className="text-xs font-medium text-text-secondary">
          {FM('themeSettings.layout.shadows')}
        </h5>
        <div className="grid grid-cols-2 gap-2">
          {SHADOW_KEYS.map((key) => (
            <div key={key} className="flex items-center justify-between rounded bg-surface-sunken px-3 py-2">
              <span className="text-xs font-medium text-text-secondary">{key}</span>
              <div
                className="h-4 w-12 rounded border border-border bg-surface"
                style={{ boxShadow: theme.shadows[key] }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
