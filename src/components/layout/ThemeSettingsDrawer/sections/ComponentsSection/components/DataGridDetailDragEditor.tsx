import { FM } from '@/localization/utils/helpers';
import type { DataGridConfig } from '@/stores/theme/types';

import { CollapsibleSection } from './CollapsibleSection';
import { ColorPicker } from '../../../components/ColorPicker';

interface DataGridDetailDragEditorProps {
  config: DataGridConfig;
  onUpdate: (updates: Partial<DataGridConfig>) => void;
}

export const DataGridDetailDragEditor = ({
  config,
  onUpdate,
}: DataGridDetailDragEditorProps): JSX.Element => (
  <CollapsibleSection title={FM('themeSettings.components.dataGrid.detailDragSection')}>
    <div className="grid grid-cols-2 gap-2">
      <ColorPicker
        label={FM('themeSettings.components.dataGrid.detailRowBackground')}
        value={config.detailRowBackground}
        onChange={(value) => onUpdate({ detailRowBackground: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.dataGrid.dragHandleColor')}
        value={config.dragHandleColor}
        onChange={(value) => onUpdate({ dragHandleColor: value })}
      />
    </div>
  </CollapsibleSection>
);
