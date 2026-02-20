import { FM } from '@/localization/utils/helpers';
import type { ModalsConfig } from '@/stores/theme/types';


import { CollapsibleSection } from './CollapsibleSection';
import { ColorPicker } from '../../../components/ColorPicker';

interface ModalsEditorProps {
  config: ModalsConfig;
  onUpdate: (updates: Partial<ModalsConfig>) => void;
}

export const ModalsEditor = ({ config, onUpdate }: ModalsEditorProps): JSX.Element => {
  return (
    <CollapsibleSection title={FM('themeSettings.components.modals.title')}>
      <ColorPicker
        label={FM('themeSettings.components.modals.contentBackground')}
        value={config.contentBackground}
        onChange={(value) => onUpdate({ contentBackground: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.modals.borderColor')}
        value={config.borderColor}
        onChange={(value) => onUpdate({ borderColor: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.modals.headerBackground')}
        value={config.headerBackground}
        onChange={(value) => onUpdate({ headerBackground: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.modals.footerBackground')}
        value={config.footerBackground}
        onChange={(value) => onUpdate({ footerBackground: value })}
      />
    </CollapsibleSection>
  );
};
