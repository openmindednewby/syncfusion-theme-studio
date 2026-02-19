import { FM } from '@/localization/helpers';
import type { FabConfig } from '@/stores/theme/types';

import { CollapsibleSection } from './CollapsibleSection';
import { ColorPicker } from '../../ColorPicker';
import { EditorTextInput } from '../../EditorTextInput';

interface FabEditorProps {
  config: FabConfig;
  onUpdate: (updates: Partial<FabConfig>) => void;
}

const L = (key: string): string => FM(`themeSettings.components.fab.${key}`);

export const FabEditor = ({ config, onUpdate }: FabEditorProps): JSX.Element => (
  <CollapsibleSection title={L('title')}>
    <div className="space-y-4">
      {/* Colors */}
      <div className="grid grid-cols-2 gap-2">
        <ColorPicker label={L('background')} value={config.background} onChange={(v) => onUpdate({ background: v })} />
        <ColorPicker
          label={L('backgroundHover')}
          value={config.backgroundHover}
          onChange={(v) => onUpdate({ backgroundHover: v })}
        />
        <ColorPicker
          label={L('backgroundActive')}
          value={config.backgroundActive}
          onChange={(v) => onUpdate({ backgroundActive: v })}
        />
        <ColorPicker label={L('iconColor')} value={config.iconColor} onChange={(v) => onUpdate({ iconColor: v })} />
        <ColorPicker label={L('textColor')} value={config.textColor} onChange={(v) => onUpdate({ textColor: v })} />
        <ColorPicker
          label={L('disabledBackground')}
          value={config.disabledBackground}
          onChange={(v) => onUpdate({ disabledBackground: v })}
        />
      </div>

      {/* Sizing & Effects */}
      <div className="grid grid-cols-2 gap-2">
        <EditorTextInput label={L('borderRadius')} value={config.borderRadius} onChange={(v) => onUpdate({ borderRadius: v })} />
        <EditorTextInput label={L('size')} value={config.size} onChange={(v) => onUpdate({ size: v })} />
        <EditorTextInput label={L('iconSize')} value={config.iconSize} onChange={(v) => onUpdate({ iconSize: v })} />
        <EditorTextInput label={L('shadow')} value={config.shadow} onChange={(v) => onUpdate({ shadow: v })} />
        <EditorTextInput label={L('shadowHover')} value={config.shadowHover} onChange={(v) => onUpdate({ shadowHover: v })} />
        <EditorTextInput
          label={L('disabledOpacity')}
          value={config.disabledOpacity}
          onChange={(v) => onUpdate({ disabledOpacity: v })}
        />
        <EditorTextInput
          label={L('transitionDuration')}
          value={config.transitionDuration}
          onChange={(v) => onUpdate({ transitionDuration: v })}
        />
      </div>
    </div>
  </CollapsibleSection>
);
