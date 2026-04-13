import { FM } from '@/localization/utils/helpers';
import type { RadioConfig } from '@/stores/theme/types';

import { CollapsibleSection } from './CollapsibleSection';
import { ColorPicker } from '../../../components/ColorPicker';
import { EditorTextInput } from '../../../components/EditorTextInput';

interface RadioEditorProps {
  config: RadioConfig;
  onUpdate: (updates: Partial<RadioConfig>) => void;
}

const L = (key: string): string => FM(`themeSettings.components.radio.${key}`);

export const RadioEditor = ({ config, onUpdate }: RadioEditorProps): JSX.Element => (
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
        <p className="text-xs font-medium text-text-secondary">{L('selectedSection')}</p>
        <div className="grid grid-cols-2 gap-2 pl-2">
          <ColorPicker label={L('background')} value={config.selectedBackground} onChange={(v) => onUpdate({ selectedBackground: v })} />
          <ColorPicker label={L('borderColor')} value={config.selectedBorderColor} onChange={(v) => onUpdate({ selectedBorderColor: v })} />
          <ColorPicker label={L('dotColor')} value={config.dotColor} onChange={(v) => onUpdate({ dotColor: v })} />
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-xs font-medium text-text-secondary">{L('statesSection')}</p>
        <div className="grid grid-cols-2 gap-2 pl-2">
          <ColorPicker label={L('hoverBorder')} value={config.hoverBorderColor} onChange={(v) => onUpdate({ hoverBorderColor: v })} />
          <ColorPicker label={L('focusRing')} value={config.focusRingColor} onChange={(v) => onUpdate({ focusRingColor: v })} />
          <ColorPicker label={L('labelColor')} value={config.labelColor} onChange={(v) => onUpdate({ labelColor: v })} />
          <ColorPicker label={L('labelDisabledColor')} value={config.labelDisabledColor} onChange={(v) => onUpdate({ labelDisabledColor: v })} />
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-xs font-medium text-text-secondary">{L('dimensionsSection')}</p>
        <div className="grid grid-cols-2 gap-2 pl-2">
          <EditorTextInput label={L('size')} value={config.size} onChange={(v) => onUpdate({ size: v })} />
          <EditorTextInput label={L('borderWidth')} value={config.borderWidth} onChange={(v) => onUpdate({ borderWidth: v })} />
          <EditorTextInput label={L('dotSize')} value={config.dotSize} onChange={(v) => onUpdate({ dotSize: v })} />
          <EditorTextInput label={L('disabledOpacity')} value={config.disabledOpacity} onChange={(v) => onUpdate({ disabledOpacity: v })} />
        </div>
      </div>
    </div>
  </CollapsibleSection>
);
