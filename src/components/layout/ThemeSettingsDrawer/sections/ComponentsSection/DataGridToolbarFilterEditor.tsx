import { FM } from '@/localization/helpers';
import type { DataGridConfig } from '@/stores/theme/types';

import { CollapsibleSection } from './CollapsibleSection';
import { ColorPicker } from '../../ColorPicker';

interface DataGridToolbarFilterEditorProps {
  config: DataGridConfig;
  onUpdate: (updates: Partial<DataGridConfig>) => void;
}

export const DataGridToolbarFilterEditor = ({
  config,
  onUpdate,
}: DataGridToolbarFilterEditorProps): JSX.Element => (
  <CollapsibleSection title={FM('themeSettings.components.dataGrid.toolbarFilterSection')}>
    <div className="grid grid-cols-2 gap-2">
      <ColorPicker
        label={FM('themeSettings.components.dataGrid.toolbarBackground')}
        value={config.toolbarBackground}
        onChange={(value) => onUpdate({ toolbarBackground: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.dataGrid.toolbarTextColor')}
        value={config.toolbarTextColor}
        onChange={(value) => onUpdate({ toolbarTextColor: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.dataGrid.toolbarBorderColor')}
        value={config.toolbarBorderColor}
        onChange={(value) => onUpdate({ toolbarBorderColor: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.dataGrid.filterRowBackground')}
        value={config.filterRowBackground}
        onChange={(value) => onUpdate({ filterRowBackground: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.dataGrid.filterRowBorderColor')}
        value={config.filterRowBorderColor}
        onChange={(value) => onUpdate({ filterRowBorderColor: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.dataGrid.filterInputBackground')}
        value={config.filterInputBackground}
        onChange={(value) => onUpdate({ filterInputBackground: value })}
      />
    </div>
  </CollapsibleSection>
);
