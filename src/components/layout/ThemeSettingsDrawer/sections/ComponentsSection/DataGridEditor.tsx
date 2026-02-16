import { FM } from '@/localization/helpers';
import type { DataGridConfig } from '@/stores/theme/types';

import { CollapsibleSection } from './CollapsibleSection';
import { DataGridColumnMenuEditor } from './DataGridColumnMenuEditor';
import { DataGridColumnRowEditor } from './DataGridColumnRowEditor';
import { DataGridDetailDragEditor } from './DataGridDetailDragEditor';
import { DataGridEditSelectionEditor } from './DataGridEditSelectionEditor';
import { DataGridGroupAggregateEditor } from './DataGridGroupAggregateEditor';
import { DataGridPaginationActionsEditor } from './DataGridPaginationActionsEditor';
import { DataGridToolbarFilterEditor } from './DataGridToolbarFilterEditor';
import { ColorPicker } from '../../ColorPicker';

interface DataGridEditorProps {
  config: DataGridConfig;
  onUpdate: (updates: Partial<DataGridConfig>) => void;
}

const DATAGRID_PROPERTY_COUNT = 53;

const TableIcon = (): JSX.Element => (
  <svg
    aria-hidden="true"
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    viewBox="0 0 24 24"
  >
    <path
      d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M10.875 12c-.621 0-1.125.504-1.125 1.125M12 12c.621 0 1.125.504 1.125 1.125m0 0v1.5c0 .621-.504 1.125-1.125 1.125M12 13.125c0 .621.504 1.125 1.125 1.125m1.125 2.625h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M12 15.75c0-.621.504-1.125 1.125-1.125m-1.125 2.25c0 .621.504 1.125 1.125 1.125m0 0c.621 0 1.125-.504 1.125-1.125m0 0c0-.621.504-1.125 1.125-1.125"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

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
