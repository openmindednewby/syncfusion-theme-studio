import { FM } from '@/localization/utils/helpers';
import type { InputsConfig } from '@/stores/theme/types';


import { AnimationSubsection } from './AnimationSubsection';
import { CollapsibleSection } from './CollapsibleSection';
import { ColorPicker } from '../../../components/ColorPicker';

interface InputsEditorProps {
  config: InputsConfig;
  onUpdate: (updates: Partial<InputsConfig>) => void;
}

export const InputsEditor = ({ config, onUpdate }: InputsEditorProps): JSX.Element => {
  return (
    <CollapsibleSection title={FM('themeSettings.components.inputs.title')}>
      <ColorPicker
        label={FM('themeSettings.components.inputs.background')}
        value={config.background}
        onChange={(value) => onUpdate({ background: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.inputs.borderDefault')}
        value={config.borderDefault}
        onChange={(value) => onUpdate({ borderDefault: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.inputs.borderFocus')}
        value={config.borderFocus}
        onChange={(value) => onUpdate({ borderFocus: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.inputs.textColor')}
        value={config.textColor}
        onChange={(value) => onUpdate({ textColor: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.inputs.placeholderColor')}
        value={config.placeholderColor}
        onChange={(value) => onUpdate({ placeholderColor: value })}
      />
      <AnimationSubsection
        animationDuration={config.transitionDuration}
        showEffectSelector={false}
        onDurationChange={(duration) => onUpdate({ transitionDuration: duration })}
      />
    </CollapsibleSection>
  );
};
