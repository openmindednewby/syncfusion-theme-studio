import { TableIcon } from '@/components/icons';
import { FM } from '@/localization/utils/helpers';
import type { DataGridConfig } from '@/stores/theme/types';

import { CollapsibleSection } from './CollapsibleSection';
import { DataGridColumnMenuEditor } from './DataGridColumnMenuEditor';
import { DataGridColumnRowEditor } from './DataGridColumnRowEditor';
import { DataGridDetailDragEditor } from './DataGridDetailDragEditor';
import { DataGridEditSelectionEditor } from './DataGridEditSelectionEditor';
import { DataGridGroupAggregateEditor } from './DataGridGroupAggregateEditor';
import { DataGridPaginationActionsEditor } from './DataGridPaginationActionsEditor';
import { DataGridToolbarFilterEditor } from './DataGridToolbarFilterEditor';
import { ColorPicker } from '../../../components/ColorPicker';

interface DataGridEditorProps {
  config: DataGridConfig;
  onUpdate: (updates: Partial<DataGridConfig>) => void;
}

const DATAGRID_PROPERTY_COUNT = 57;

const HeaderRowsSubSection = ({ config, onUpdate }: DataGridEditorProps): JSX.Element => (
  <CollapsibleSection title={FM('themeSettings.components.dataGrid.headerRowsSection')}>
    <div className="grid grid-cols-2 gap-2">
      <ColorPicker
        label={FM('themeSettings.components.dataGrid.headerBackground')}
        value={config.headerBackground}
        onChange={(value) => onUpdate({ headerBackground: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.dataGrid.headerTextColor')}
        value={config.headerTextColor}
        onChange={(value) => onUpdate({ headerTextColor: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.dataGrid.headerBorder')}
        value={config.headerBorder}
        onChange={(value) => onUpdate({ headerBorder: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.dataGrid.rowEvenBackground')}
        value={config.rowEvenBackground}
        onChange={(value) => onUpdate({ rowEvenBackground: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.dataGrid.rowOddBackground')}
        value={config.rowOddBackground}
        onChange={(value) => onUpdate({ rowOddBackground: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.dataGrid.rowHoverBackground')}
        value={config.rowHoverBackground}
        onChange={(value) => onUpdate({ rowHoverBackground: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.dataGrid.rowSelectedBackground')}
        value={config.rowSelectedBackground}
        onChange={(value) => onUpdate({ rowSelectedBackground: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.dataGrid.cellBorderColor')}
        value={config.cellBorderColor}
        onChange={(value) => onUpdate({ cellBorderColor: value })}
      />
    </div>
  </CollapsibleSection>
);

export const DataGridEditor = ({ config, onUpdate }: DataGridEditorProps): JSX.Element => (
  <CollapsibleSection
    icon={<TableIcon />}
    propertyCount={DATAGRID_PROPERTY_COUNT}
    title={FM('themeSettings.components.dataGrid.title')}
  >
    <div className="space-y-2">
      <HeaderRowsSubSection config={config} onUpdate={onUpdate} />
      <DataGridColumnRowEditor config={config} onUpdate={onUpdate} />
      <DataGridToolbarFilterEditor config={config} onUpdate={onUpdate} />
      <DataGridColumnMenuEditor config={config} onUpdate={onUpdate} />
      <DataGridGroupAggregateEditor config={config} onUpdate={onUpdate} />
      <DataGridEditSelectionEditor config={config} onUpdate={onUpdate} />
      <DataGridPaginationActionsEditor config={config} onUpdate={onUpdate} />
      <DataGridDetailDragEditor config={config} onUpdate={onUpdate} />
    </div>
  </CollapsibleSection>
);
