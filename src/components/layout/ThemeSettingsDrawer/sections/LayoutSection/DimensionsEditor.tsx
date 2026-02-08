
import { FM } from '@/localization/helpers';
import type { LayoutConfig, SpacingConfig } from '@/stores/theme/types';

import { NumberInputRow } from '../../NumberInputRow';
import { TextInputRow } from '../../TextInputRow';

interface DimensionsEditorProps {
  layout: LayoutConfig;
  spacing: SpacingConfig;
  onLayoutChange: (key: keyof LayoutConfig, value: string) => void;
  onSpacingChange: (value: number) => void;
}

export const DimensionsEditor = ({
  layout,
  onLayoutChange,
  onSpacingChange,
  spacing,
}: DimensionsEditorProps): JSX.Element => {
  return (
    <div className="space-y-2">
      <h5 className="text-xs font-medium text-text-secondary">
        {FM('themeSettings.layout.dimensions')}
      </h5>
      <div className="space-y-2">
        <TextInputRow
          label={FM('themeSettings.layout.sidebarWidth')}
          placeholder="e.g., 280px"
          value={layout.sidebarWidth}
          onChange={(value) => onLayoutChange('sidebarWidth', value)}
        />
        <TextInputRow
          label={FM('themeSettings.layout.sidebarCollapsed')}
          placeholder="e.g., 72px"
          value={layout.sidebarCollapsedWidth}
          onChange={(value) => onLayoutChange('sidebarCollapsedWidth', value)}
        />
        <TextInputRow
          label={FM('themeSettings.layout.headerHeight')}
          placeholder="e.g., 64px"
          value={layout.headerHeight}
          onChange={(value) => onLayoutChange('headerHeight', value)}
        />
        <NumberInputRow
          label={FM('themeSettings.layout.spacing')}
          max={16}
          min={1}
          step={1}
          suffix="px base"
          value={spacing.baseUnit}
          onChange={onSpacingChange}
        />
      </div>
    </div>
  );
};
