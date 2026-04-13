import { FM } from '@/localization/utils/helpers';
import type { MessageConfig } from '@/stores/theme/types';

import { CollapsibleSection } from './CollapsibleSection';
import { ColorPicker } from '../../../components/ColorPicker';

interface MessageEditorProps {
  config: MessageConfig;
  onUpdate: (updates: Partial<MessageConfig>) => void;
}

interface VariantGroupProps {
  label: string;
  bg: string;
  text: string;
  border: string;
  onBgChange: (v: string) => void;
  onTextChange: (v: string) => void;
  onBorderChange: (v: string) => void;
}

const VariantGroup = ({ label, bg, text, border, onBgChange, onTextChange, onBorderChange }: VariantGroupProps): JSX.Element => (
  <div className="space-y-2">
    <p className="text-xs font-medium text-text-secondary">{FM(label)}</p>
    <div className="grid grid-cols-2 gap-2 pl-2">
      <ColorPicker label={FM('themeSettings.components.message.background')} value={bg} onChange={onBgChange} />
      <ColorPicker label={FM('themeSettings.components.message.textColor')} value={text} onChange={onTextChange} />
      <ColorPicker label={FM('themeSettings.components.message.borderColor')} value={border} onChange={onBorderChange} />
    </div>
  </div>
);

export const MessageEditor = ({ config, onUpdate }: MessageEditorProps): JSX.Element => (
  <CollapsibleSection title={FM('themeSettings.components.message.title')}>
    <div className="space-y-4">
      <VariantGroup
        bg={config.normalBackground}
        border={config.normalBorderColor}
        label="themeSettings.components.message.normalSection"
        text={config.normalTextColor}
        onBgChange={(v) => onUpdate({ normalBackground: v })}
        onBorderChange={(v) => onUpdate({ normalBorderColor: v })}
        onTextChange={(v) => onUpdate({ normalTextColor: v })}
      />
      <VariantGroup
        bg={config.successBackground}
        border={config.successBorderColor}
        label="themeSettings.components.message.successSection"
        text={config.successTextColor}
        onBgChange={(v) => onUpdate({ successBackground: v })}
        onBorderChange={(v) => onUpdate({ successBorderColor: v })}
        onTextChange={(v) => onUpdate({ successTextColor: v })}
      />
      <VariantGroup
        bg={config.warningBackground}
        border={config.warningBorderColor}
        label="themeSettings.components.message.warningSection"
        text={config.warningTextColor}
        onBgChange={(v) => onUpdate({ warningBackground: v })}
        onBorderChange={(v) => onUpdate({ warningBorderColor: v })}
        onTextChange={(v) => onUpdate({ warningTextColor: v })}
      />
      <VariantGroup
        bg={config.errorBackground}
        border={config.errorBorderColor}
        label="themeSettings.components.message.errorSection"
        text={config.errorTextColor}
        onBgChange={(v) => onUpdate({ errorBackground: v })}
        onBorderChange={(v) => onUpdate({ errorBorderColor: v })}
        onTextChange={(v) => onUpdate({ errorTextColor: v })}
      />
      <VariantGroup
        bg={config.infoBackground}
        border={config.infoBorderColor}
        label="themeSettings.components.message.infoSection"
        text={config.infoTextColor}
        onBgChange={(v) => onUpdate({ infoBackground: v })}
        onBorderChange={(v) => onUpdate({ infoBorderColor: v })}
        onTextChange={(v) => onUpdate({ infoTextColor: v })}
      />
    </div>
  </CollapsibleSection>
);
