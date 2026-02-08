import { FM } from '@/localization/helpers';
import type { DataGridConfig } from '@/stores/theme/types';


import { CollapsibleSection } from './CollapsibleSection';
import { ColorPicker } from '../../ColorPicker';

interface DataGridEditorProps {
  config: DataGridConfig;
  onUpdate: (updates: Partial<DataGridConfig>) => void;
}

export const DataGridEditor = ({ config, onUpdate }: DataGridEditorProps): JSX.Element => {
  return (
    <CollapsibleSection title={FM('themeSettings.components.dataGrid.title')}>
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
    </CollapsibleSection>
  );
};
