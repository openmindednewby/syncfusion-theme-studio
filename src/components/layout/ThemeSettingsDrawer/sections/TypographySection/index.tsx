import { FM } from '@/localization/helpers';
import { useThemeStore } from '@/stores/useThemeStore';

export const TypographySection = (): JSX.Element => {
  const { theme } = useThemeStore();

  return (
    <section className="space-y-4">
      <div>
        <h4 className="text-sm font-semibold text-text-primary">
          {FM('themeSettings.typography.title')}
        </h4>
        <p className="mt-1 text-xs text-text-muted">
          {FM('themeSettings.typography.description')}
        </p>
      </div>

      {/* Font Families */}
      <div className="space-y-2">
        <h5 className="text-xs font-medium text-text-secondary">
          {FM('themeSettings.typography.fontFamily')}
        </h5>
        <div className="space-y-2">
          <div className="flex items-center justify-between rounded bg-surface-sunken px-3 py-2">
            <span className="text-xs font-medium text-text-secondary">Sans</span>
            <span className="max-w-[200px] truncate text-xs text-text-muted">
              {theme.typography.fontSans}
            </span>
          </div>
          <div className="flex items-center justify-between rounded bg-surface-sunken px-3 py-2">
            <span className="text-xs font-medium text-text-secondary">Mono</span>
            <span className="max-w-[200px] truncate text-xs text-text-muted">
              {theme.typography.fontMono}
            </span>
          </div>
        </div>
      </div>

      {/* Transitions */}
      <div className="space-y-2">
        <h5 className="text-xs font-medium text-text-secondary">
          {FM('themeSettings.layout.transitions')}
        </h5>
        <div className="space-y-2">
          <div className="flex items-center justify-between rounded bg-surface-sunken px-3 py-2">
            <span className="text-xs font-medium text-text-secondary">Fast</span>
            <span className="text-xs text-text-muted">{theme.transitions.fast}</span>
          </div>
          <div className="flex items-center justify-between rounded bg-surface-sunken px-3 py-2">
            <span className="text-xs font-medium text-text-secondary">Normal</span>
            <span className="text-xs text-text-muted">{theme.transitions.normal}</span>
          </div>
          <div className="flex items-center justify-between rounded bg-surface-sunken px-3 py-2">
            <span className="text-xs font-medium text-text-secondary">Slow</span>
            <span className="text-xs text-text-muted">{theme.transitions.slow}</span>
          </div>
          <div className="flex items-center justify-between rounded bg-surface-sunken px-3 py-2">
            <span className="text-xs font-medium text-text-secondary">Easing</span>
            <span className="max-w-[180px] truncate text-xs text-text-muted">
              {theme.transitions.easing}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
