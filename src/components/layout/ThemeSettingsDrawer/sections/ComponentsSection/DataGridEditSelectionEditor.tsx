import { FM } from '@/localization/helpers';
import type { DataGridConfig } from '@/stores/theme/types';

import { CollapsibleSection } from './CollapsibleSection';
import { ColorPicker } from '../../ColorPicker';

interface DataGridEditSelectionEditorProps {
  config: DataGridConfig;
  onUpdate: (updates: Partial<DataGridConfig>) => void;
}

export const DataGridEditSelectionEditor = ({
  config,
  onUpdate,
}: DataGridEditSelectionEditorProps): JSX.Element => (
  <CollapsibleSection title={FM('themeSettings.components.dataGrid.editSelectionSection')}>
    <div className="grid grid-cols-2 gap-2">
      <ColorPicker
        label={FM('themeSettings.components.dataGrid.editCellBackground')}
        value={config.editCellBackground}
        onChange={(value) => onUpdate({ editCellBackground: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.dataGrid.editCellBorderColor')}
        value={config.editCellBorderColor}
        onChange={(value) => onUpdate({ editCellBorderColor: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.dataGrid.editDirtyIndicatorColor')}
        value={config.editDirtyIndicatorColor}
        onChange={(value) => onUpdate({ editDirtyIndicatorColor: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.dataGrid.rowSelectedTextColor')}
        value={config.rowSelectedTextColor}
        onChange={(value) => onUpdate({ rowSelectedTextColor: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.dataGrid.cellSelectedBackground')}
        value={config.cellSelectedBackground}
        onChange={(value) => onUpdate({ cellSelectedBackground: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.dataGrid.sortIconColor')}
        value={config.sortIconColor}
        onChange={(value) => onUpdate({ sortIconColor: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.dataGrid.resizeHandleColor')}
        value={config.resizeHandleColor}
        onChange={(value) => onUpdate({ resizeHandleColor: value })}
      />
    </div>
  </CollapsibleSection>
);
