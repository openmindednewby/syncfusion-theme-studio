
import { FM } from '@/localization/helpers';
import type { LayoutConfig, SpacingConfig } from '@/stores/theme/types';

import { NumberInputRow } from '../../NumberInputRow';
import { TextInputRow } from '../../TextInputRow';

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
          <span className="text-xs font-medium text-text-secondary">
            {FM('themeSettings.layout.contentFullWidth')}
          </span>
          <button
            aria-checked={layout.contentFullWidth}
            aria-label={FM('themeSettings.layout.contentFullWidth')}
            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ${
              layout.contentFullWidth ? 'bg-primary-500' : 'bg-neutral-300'
            }`}
            role="switch"
            type="button"
            onClick={() => onFullWidthChange(!layout.contentFullWidth)}
          >
            <span
              className={`pointer-events-none inline-block h-4 w-4 translate-y-0.5 rounded-full bg-white shadow transition-transform duration-200 ${
                layout.contentFullWidth ? 'translate-x-4' : 'translate-x-0.5'
              }`}
            />
          </button>
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
