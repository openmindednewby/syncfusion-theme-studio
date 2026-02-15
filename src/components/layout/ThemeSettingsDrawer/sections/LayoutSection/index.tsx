import { FM } from '@/localization/helpers';
import { useThemeStore } from '@/stores/useThemeStore';

import { AnimationsEditor } from './AnimationsEditor';
import { BorderRadiusEditor } from './BorderRadiusEditor';
import { DimensionsEditor } from './DimensionsEditor';
import { ShadowsEditor } from './ShadowsEditor';

/**
 * Layout grid icon for section header
 */
const LayoutIcon = (): JSX.Element => (
  <svg
    aria-hidden="true"
    className="h-5 w-5 text-primary-500"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.75}
    viewBox="0 0 24 24"
  >
    <rect height="7" rx="1" width="7" x="3" y="3" />
    <rect height="7" rx="1" width="7" x="14" y="3" />
    <rect height="7" rx="1" width="7" x="14" y="14" />
    <rect height="7" rx="1" width="7" x="3" y="14" />
  </svg>
);


export const LayoutSection = (): JSX.Element => {
  const {
    theme,
    updateAnimationConfig,
    updateBorderRadius,
    updateLayoutDimension,
    updateLayoutFullWidth,
    updateShadow,
    updateSpacingBaseUnit,
  } = useThemeStore();

  return (
    <section className="theme-section space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50">
          <LayoutIcon />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-text-primary">
            {FM('themeSettings.layout.title')}
          </h4>
          <p className="text-xs text-text-muted">
            {FM('themeSettings.layout.description')}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4">
        <DimensionsEditor
          layout={theme.layout}
          spacing={theme.spacing}
          onFullWidthChange={updateLayoutFullWidth}
          onLayoutChange={updateLayoutDimension}
          onSpacingChange={updateSpacingBaseUnit}
        />

        <BorderRadiusEditor
          borderRadius={theme.borderRadius}
          onChange={updateBorderRadius}
        />

        <ShadowsEditor
          shadows={theme.shadows}
          onChange={updateShadow}
        />

        <AnimationsEditor
          animations={theme.animations}
          onUpdate={updateAnimationConfig}
        />
      </div>
    </section>
  );
};
