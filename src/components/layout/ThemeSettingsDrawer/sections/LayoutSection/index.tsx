import { FM } from '@/localization/helpers';
import { useThemeStore } from '@/stores/useThemeStore';

import { BorderRadiusEditor } from './BorderRadiusEditor';
import { DimensionsEditor } from './DimensionsEditor';
import { ShadowsEditor } from './ShadowsEditor';


export const LayoutSection = (): JSX.Element => {
  const {
    theme,
    updateBorderRadius,
    updateLayoutDimension,
    updateShadow,
    updateSpacingBaseUnit,
  } = useThemeStore();

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

      <DimensionsEditor
        layout={theme.layout}
        spacing={theme.spacing}
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
    </section>
  );
};
