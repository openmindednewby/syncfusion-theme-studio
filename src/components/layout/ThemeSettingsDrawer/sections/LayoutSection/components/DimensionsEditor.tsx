
import CheckboxNative from '@/components/ui/native/CheckboxNative';
import { FM } from '@/localization/utils/helpers';
import type { LayoutConfig, SpacingConfig } from '@/stores/theme/types';

import { NumberInputRow } from '../../../components/NumberInputRow';
import { TextInputRow } from '../../../components/TextInputRow';

interface DimensionsEditorProps {
  layout: LayoutConfig;
  spacing: SpacingConfig;
  onLayoutChange: (key: keyof LayoutConfig, value: string) => void;
  onFullWidthChange: (value: boolean) => void;
  onSpacingChange: (value: number) => void;
}

export const DimensionsEditor = ({
  layout,
  onFullWidthChange,
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
        <div className="flex items-center justify-between gap-2 rounded bg-surface-sunken px-3 py-2">
          <CheckboxNative
            checked={layout.contentFullWidth}
            label={FM('themeSettings.layout.contentFullWidth')}
            testId="layout-full-width-checkbox"
            onChange={(e) => onFullWidthChange(e.target.checked)}
          />
        </div>
        {!layout.contentFullWidth && (
          <TextInputRow
            label={FM('themeSettings.layout.contentMaxWidth')}
            placeholder="e.g., 1440px"
            value={layout.contentMaxWidth}
            onChange={(value) => onLayoutChange('contentMaxWidth', value)}
          />
        )}
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
