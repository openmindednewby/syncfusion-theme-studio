import { FM } from '@/localization/utils/helpers';
import type { CheckboxConfig } from '@/stores/theme/types';

import { CollapsibleSection } from './CollapsibleSection';
import { ColorPicker } from '../../../components/ColorPicker';
import { EditorTextInput } from '../../../components/EditorTextInput';

interface CheckboxEditorProps {
  config: CheckboxConfig;
  onUpdate: (updates: Partial<CheckboxConfig>) => void;
}

const L = (key: string): string => FM(`themeSettings.components.checkbox.${key}`);

export const CheckboxEditor = ({ config, onUpdate }: CheckboxEditorProps): JSX.Element => (
  <CollapsibleSection title={L('title')}>
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-xs font-medium text-text-secondary">{L('uncheckedSection')}</p>
        <div className="grid grid-cols-2 gap-2 pl-2">
          <ColorPicker label={L('background')} value={config.uncheckedBackground} onChange={(v) => onUpdate({ uncheckedBackground: v })} />
          <ColorPicker label={L('borderColor')} value={config.uncheckedBorderColor} onChange={(v) => onUpdate({ uncheckedBorderColor: v })} />
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-xs font-medium text-text-secondary">{L('checkedSection')}</p>
        <div className="grid grid-cols-2 gap-2 pl-2">
          <ColorPicker label={L('background')} value={config.checkedBackground} onChange={(v) => onUpdate({ checkedBackground: v })} />
          <ColorPicker label={L('borderColor')} value={config.checkedBorderColor} onChange={(v) => onUpdate({ checkedBorderColor: v })} />
          <ColorPicker label={L('checkmark')} value={config.checkmarkColor} onChange={(v) => onUpdate({ checkmarkColor: v })} />
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-xs font-medium text-text-secondary">{L('statesSection')}</p>
        <div className="grid grid-cols-2 gap-2 pl-2">
          <ColorPicker label={L('hoverBorder')} value={config.hoverBorderColor} onChange={(v) => onUpdate({ hoverBorderColor: v })} />
          <ColorPicker label={L('focusRing')} value={config.focusRingColor} onChange={(v) => onUpdate({ focusRingColor: v })} />
          <ColorPicker label={L('indeterminate')} value={config.indeterminateBackground} onChange={(v) => onUpdate({ indeterminateBackground: v })} />
          <ColorPicker label={L('labelColor')} value={config.labelColor} onChange={(v) => onUpdate({ labelColor: v })} />
          <ColorPicker label={L('labelDisabledColor')} value={config.labelDisabledColor} onChange={(v) => onUpdate({ labelDisabledColor: v })} />
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-xs font-medium text-text-secondary">{L('dimensionsSection')}</p>
        <div className="grid grid-cols-2 gap-2 pl-2">
          <EditorTextInput label={L('size')} value={config.size} onChange={(v) => onUpdate({ size: v })} />
          <EditorTextInput label={L('borderWidth')} value={config.borderWidth} onChange={(v) => onUpdate({ borderWidth: v })} />
          <EditorTextInput label={L('borderRadius')} value={config.borderRadius} onChange={(v) => onUpdate({ borderRadius: v })} />
          <EditorTextInput label={L('checkmarkStrokeWidth')} value={config.checkmarkStrokeWidth} onChange={(v) => onUpdate({ checkmarkStrokeWidth: v })} />
          <EditorTextInput label={L('checkmarkBorderRadius')} value={config.checkmarkBorderRadius} onChange={(v) => onUpdate({ checkmarkBorderRadius: v })} />
          <EditorTextInput label={L('disabledOpacity')} value={config.disabledOpacity} onChange={(v) => onUpdate({ disabledOpacity: v })} />
        </div>
      </div>
    </div>
  </CollapsibleSection>
);
