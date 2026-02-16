import { FM } from '@/localization/helpers';
import type { DataGridConfig } from '@/stores/theme/types';

import { CollapsibleSection } from './CollapsibleSection';
import { ColorPicker } from '../../ColorPicker';

interface DataGridPaginationActionsEditorProps {
  config: DataGridConfig;
  onUpdate: (updates: Partial<DataGridConfig>) => void;
}

export const DataGridPaginationActionsEditor = ({
  config,
  onUpdate,
}: DataGridPaginationActionsEditorProps): JSX.Element => (
  <CollapsibleSection title={FM('themeSettings.components.dataGrid.paginationActionsSection')}>
    <div className="grid grid-cols-2 gap-2">
      <ColorPicker
        label={FM('themeSettings.components.dataGrid.paginationBackground')}
        value={config.paginationBackground}
        onChange={(value) => onUpdate({ paginationBackground: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.dataGrid.paginationTextColor')}
        value={config.paginationTextColor}
        onChange={(value) => onUpdate({ paginationTextColor: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.dataGrid.paginationActiveBackground')}
        value={config.paginationActiveBackground}
        onChange={(value) => onUpdate({ paginationActiveBackground: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.dataGrid.paginationActiveTextColor')}
        value={config.paginationActiveTextColor}
        onChange={(value) => onUpdate({ paginationActiveTextColor: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.dataGrid.paginationHoverBackground')}
        value={config.paginationHoverBackground}
        onChange={(value) => onUpdate({ paginationHoverBackground: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.dataGrid.paginationBorderColor')}
        value={config.paginationBorderColor}
        onChange={(value) => onUpdate({ paginationBorderColor: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.dataGrid.pagerContainerBorderColor')}
        value={config.pagerContainerBorderColor}
        onChange={(value) => onUpdate({ pagerContainerBorderColor: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.dataGrid.paginationNavColor')}
        value={config.paginationNavColor}
        onChange={(value) => onUpdate({ paginationNavColor: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.dataGrid.paginationNavDisabledColor')}
        value={config.paginationNavDisabledColor}
        onChange={(value) => onUpdate({ paginationNavDisabledColor: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.dataGrid.paginationInfoTextColor')}
        value={config.paginationInfoTextColor}
        onChange={(value) => onUpdate({ paginationInfoTextColor: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.dataGrid.actionButtonColor')}
        value={config.actionButtonColor}
        onChange={(value) => onUpdate({ actionButtonColor: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.dataGrid.actionButtonHoverColor')}
        value={config.actionButtonHoverColor}
        onChange={(value) => onUpdate({ actionButtonHoverColor: value })}
      />
    </div>
  </CollapsibleSection>
);
