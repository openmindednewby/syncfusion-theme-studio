import { LayoutSectionIcon } from '@/components/icons';
import { FM } from '@/localization/utils/helpers';
import { useThemeStore } from '@/stores/useThemeStore';

import { AnimationsEditor } from './components/AnimationsEditor';
import { BorderRadiusEditor } from './components/BorderRadiusEditor';
import { DimensionsEditor } from './components/DimensionsEditor';
import { ShadowsEditor } from './components/ShadowsEditor';


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
          <LayoutSectionIcon />
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
