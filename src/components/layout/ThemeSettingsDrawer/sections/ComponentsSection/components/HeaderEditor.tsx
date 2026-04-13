import { FM } from '@/localization/utils/helpers';
import type { HeaderComponentConfig } from '@/stores/theme/types';


import { CollapsibleSection } from './CollapsibleSection';
import { ColorPicker } from '../../../components/ColorPicker';

interface HeaderEditorProps {
  config: HeaderComponentConfig;
  onUpdate: (updates: Partial<HeaderComponentConfig>) => void;
}

export const HeaderEditor = ({ config, onUpdate }: HeaderEditorProps): JSX.Element => {
  return (
    <CollapsibleSection title={FM('themeSettings.components.header.title')}>
      <ColorPicker
        label={FM('themeSettings.components.header.background')}
        value={config.background}
        onChange={(value) => onUpdate({ background: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.header.textColor')}
        value={config.textColor}
        onChange={(value) => onUpdate({ textColor: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.header.borderBottom')}
        value={config.borderBottom}
        onChange={(value) => onUpdate({ borderBottom: value })}
      />
    </CollapsibleSection>
  );
};
