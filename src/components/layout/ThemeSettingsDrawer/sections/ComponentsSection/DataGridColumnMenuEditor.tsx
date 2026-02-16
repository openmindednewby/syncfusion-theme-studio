import { FM } from '@/localization/helpers';
import type { DataGridConfig } from '@/stores/theme/types';

import { CollapsibleSection } from './CollapsibleSection';
import { ColorPicker } from '../../ColorPicker';

interface DataGridColumnMenuEditorProps {
  config: DataGridConfig;
  onUpdate: (updates: Partial<DataGridConfig>) => void;
}

export const DataGridColumnMenuEditor = ({
  config,
  onUpdate,
}: DataGridColumnMenuEditorProps): JSX.Element => (
  <CollapsibleSection title={FM('themeSettings.components.dataGrid.columnMenuSection')}>
    <div className="grid grid-cols-2 gap-2">
      <ColorPicker
        label={FM('themeSettings.components.dataGrid.columnMenuBackground')}
        value={config.columnMenuBackground}
        onChange={(value) => onUpdate({ columnMenuBackground: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.dataGrid.columnMenuTextColor')}
        value={config.columnMenuTextColor}
        onChange={(value) => onUpdate({ columnMenuTextColor: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.dataGrid.columnMenuBorderColor')}
        value={config.columnMenuBorderColor}
        onChange={(value) => onUpdate({ columnMenuBorderColor: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.dataGrid.columnMenuHoverBackground')}
        value={config.columnMenuHoverBackground}
        onChange={(value) => onUpdate({ columnMenuHoverBackground: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.dataGrid.columnMenuSeparatorColor')}
        value={config.columnMenuSeparatorColor}
        onChange={(value) => onUpdate({ columnMenuSeparatorColor: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.dataGrid.columnMenuTriggerColor')}
        value={config.columnMenuTriggerColor}
        onChange={(value) => onUpdate({ columnMenuTriggerColor: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.dataGrid.columnMenuTriggerHoverColor')}
        value={config.columnMenuTriggerHoverColor}
        onChange={(value) => onUpdate({ columnMenuTriggerHoverColor: value })}
      />
    </div>
  </CollapsibleSection>
);
