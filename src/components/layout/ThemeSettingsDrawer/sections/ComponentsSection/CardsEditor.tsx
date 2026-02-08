import { FM } from '@/localization/helpers';
import type { CardsConfig } from '@/stores/theme/types';


import { CollapsibleSection } from './CollapsibleSection';
import { ColorPicker } from '../../ColorPicker';

interface CardsEditorProps {
  config: CardsConfig;
  onUpdate: (updates: Partial<CardsConfig>) => void;
}

export const CardsEditor = ({ config, onUpdate }: CardsEditorProps): JSX.Element => {
  return (
    <CollapsibleSection title={FM('themeSettings.components.cards.title')}>
      <ColorPicker
        label={FM('themeSettings.components.cards.background')}
        value={config.background}
        onChange={(value) => onUpdate({ background: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.cards.borderColor')}
        value={config.borderColor}
        onChange={(value) => onUpdate({ borderColor: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.cards.headerBackground')}
        value={config.headerBackground}
        onChange={(value) => onUpdate({ headerBackground: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.cards.footerBackground')}
        value={config.footerBackground}
        onChange={(value) => onUpdate({ footerBackground: value })}
      />
    </CollapsibleSection>
  );
};
