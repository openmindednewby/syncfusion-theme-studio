import { FM } from '@/localization/helpers';
import type { DataGridConfig } from '@/stores/theme/types';

import { CollapsibleSection } from './CollapsibleSection';
import { ColorPicker } from '../../ColorPicker';

interface DataGridGroupAggregateEditorProps {
  config: DataGridConfig;
  onUpdate: (updates: Partial<DataGridConfig>) => void;
}

export const DataGridGroupAggregateEditor = ({
  config,
  onUpdate,
}: DataGridGroupAggregateEditorProps): JSX.Element => (
  <CollapsibleSection title={FM('themeSettings.components.dataGrid.groupAggregateSection')}>
    <div className="grid grid-cols-2 gap-2">
      <ColorPicker
        label={FM('themeSettings.components.dataGrid.groupHeaderBackground')}
        value={config.groupHeaderBackground}
        onChange={(value) => onUpdate({ groupHeaderBackground: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.dataGrid.groupHeaderTextColor')}
        value={config.groupHeaderTextColor}
        onChange={(value) => onUpdate({ groupHeaderTextColor: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.dataGrid.groupDropAreaBackground')}
        value={config.groupDropAreaBackground}
        onChange={(value) => onUpdate({ groupDropAreaBackground: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.dataGrid.footerBackground')}
        value={config.footerBackground}
        onChange={(value) => onUpdate({ footerBackground: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.dataGrid.footerTextColor')}
        value={config.footerTextColor}
        onChange={(value) => onUpdate({ footerTextColor: value })}
      />
    </div>
  </CollapsibleSection>
);
