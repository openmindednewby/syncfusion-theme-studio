import { FM } from '@/localization/helpers';
import type { AccordionConfig } from '@/stores/theme/types';

import { CollapsibleSection } from './CollapsibleSection';
import { ColorPicker } from '../../ColorPicker';

interface AccordionEditorProps {
  config: AccordionConfig;
  onUpdate: (updates: Partial<AccordionConfig>) => void;
}

export const AccordionEditor = ({ config, onUpdate }: AccordionEditorProps): JSX.Element => {
  return (
    <CollapsibleSection title={FM('themeSettings.components.accordion.title')}>
      <ColorPicker
        label={FM('themeSettings.components.accordion.background')}
        value={config.background}
        onChange={(value) => onUpdate({ background: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.accordion.headerBackground')}
        value={config.headerBackground}
        onChange={(value) => onUpdate({ headerBackground: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.accordion.headerTextColor')}
        value={config.headerTextColor}
        onChange={(value) => onUpdate({ headerTextColor: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.accordion.headerHoverBackground')}
        value={config.headerHoverBackground}
        onChange={(value) => onUpdate({ headerHoverBackground: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.accordion.borderColor')}
        value={config.borderColor}
        onChange={(value) => onUpdate({ borderColor: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.accordion.expandedBackground')}
        value={config.expandedBackground}
        onChange={(value) => onUpdate({ expandedBackground: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.accordion.expandedTextColor')}
        value={config.expandedTextColor}
        onChange={(value) => onUpdate({ expandedTextColor: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.accordion.textColor')}
        value={config.textColor}
        onChange={(value) => onUpdate({ textColor: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.accordion.iconColor')}
        value={config.iconColor}
        onChange={(value) => onUpdate({ iconColor: value })}
      />
    </CollapsibleSection>
  );
};
