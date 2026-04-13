import { FM } from '@/localization/utils/helpers';
import type { PillBadgeConfig } from '@/stores/theme/types';

import { CollapsibleSection } from './CollapsibleSection';
import { TextInputRow } from '../../../components/TextInputRow';

const PROPERTY_COUNT = 5;

interface PillBadgeEditorProps {
  config: PillBadgeConfig;
  onUpdate: (updates: Partial<PillBadgeConfig>) => void;
}

export const PillBadgeEditor = ({ config, onUpdate }: PillBadgeEditorProps): JSX.Element => (
  <CollapsibleSection propertyCount={PROPERTY_COUNT} title={FM('themeSettings.components.pillBadge.title')}>
    <div className="space-y-3">
      <TextInputRow
        label={FM('themeSettings.components.pillBadge.borderRadius')}
        value={config.borderRadius}
        onChange={(value) => onUpdate({ borderRadius: value })}
      />
      <TextInputRow
        label={FM('themeSettings.components.pillBadge.paddingX')}
        value={config.paddingX}
        onChange={(value) => onUpdate({ paddingX: value })}
      />
      <TextInputRow
        label={FM('themeSettings.components.pillBadge.paddingY')}
        value={config.paddingY}
        onChange={(value) => onUpdate({ paddingY: value })}
      />
      <TextInputRow
        label={FM('themeSettings.components.pillBadge.fontSize')}
        value={config.fontSize}
        onChange={(value) => onUpdate({ fontSize: value })}
      />
      <TextInputRow
        label={FM('themeSettings.components.pillBadge.fontWeight')}
        value={config.fontWeight}
        onChange={(value) => onUpdate({ fontWeight: value })}
      />
    </div>
  </CollapsibleSection>
);
