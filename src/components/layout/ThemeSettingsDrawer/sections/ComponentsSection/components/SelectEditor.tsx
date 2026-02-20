import { FM } from '@/localization/utils/helpers';
import type { SelectConfig } from '@/stores/theme/types';

import { AnimationSubsection } from './AnimationSubsection';
import { CollapsibleSection } from './CollapsibleSection';
import { SelectBorderSection } from '../SelectEditorSections/SelectBorderSection';
import { SelectInputSection } from '../SelectEditorSections/SelectInputSection';
import { SelectInteractionSection } from '../SelectEditorSections/SelectInteractionSection';
import { SelectItemSection } from '../SelectEditorSections/SelectItemSection';
import { SelectPopupLayoutSection } from '../SelectEditorSections/SelectPopupLayoutSection';
import { SelectPopupSection } from '../SelectEditorSections/SelectPopupSection';
import { SelectSearchSection } from '../SelectEditorSections/SelectSearchSection';

interface SelectEditorProps {
  config: SelectConfig;
  onUpdate: (updates: Partial<SelectConfig>) => void;
}

export const SelectEditor = ({ config, onUpdate }: SelectEditorProps): JSX.Element => (
  <CollapsibleSection title={FM('themeSettings.components.select.title')}>
    <div className="space-y-4">
      <SelectInputSection config={config} onUpdate={onUpdate} />
      <SelectBorderSection config={config} onUpdate={onUpdate} />
      <SelectPopupSection config={config} onUpdate={onUpdate} />
      <SelectItemSection config={config} onUpdate={onUpdate} />
      <SelectPopupLayoutSection config={config} onUpdate={onUpdate} />
      <SelectSearchSection config={config} onUpdate={onUpdate} />
      <SelectInteractionSection config={config} onUpdate={onUpdate} />
      <AnimationSubsection
        animationDuration={config.animationDuration}
        animationEffect={config.animationEffect}
        onDurationChange={(duration) => onUpdate({ animationDuration: duration })}
        onEffectChange={(effect) => onUpdate({ animationEffect: effect })}
      />
    </div>
  </CollapsibleSection>
);
