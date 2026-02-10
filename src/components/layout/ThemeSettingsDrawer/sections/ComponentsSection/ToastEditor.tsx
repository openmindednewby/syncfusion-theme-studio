import { FM } from '@/localization/helpers';
import type { ToastConfig } from '@/stores/theme/types';

import { CollapsibleSection } from './CollapsibleSection';
import { ColorPicker } from '../../ColorPicker';

interface ToastEditorProps {
  config: ToastConfig;
  onUpdate: (updates: Partial<ToastConfig>) => void;
}

interface SeverityGroupProps {
  label: string;
  bg: string;
  text: string;
  icon: string;
  onBgChange: (v: string) => void;
  onTextChange: (v: string) => void;
  onIconChange: (v: string) => void;
}

const SeverityGroup = ({ label, bg, text, icon, onBgChange, onTextChange, onIconChange }: SeverityGroupProps): JSX.Element => (
  <div className="space-y-1 pl-2">
    <p className="text-xs capitalize text-text-muted">{label}</p>
    <div className="grid grid-cols-2 gap-2 pl-2">
      <ColorPicker label={FM('themeSettings.components.toast.background')} value={bg} onChange={onBgChange} />
      <ColorPicker label={FM('themeSettings.components.toast.textColor')} value={text} onChange={onTextChange} />
      <ColorPicker label={FM('themeSettings.components.toast.iconColor')} value={icon} onChange={onIconChange} />
    </div>
  </div>
);

export const ToastEditor = ({ config, onUpdate }: ToastEditorProps): JSX.Element => (
  <CollapsibleSection title={FM('themeSettings.components.toast.title')}>
    <div className="space-y-4">
      {/* Container */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-text-secondary">
          {FM('themeSettings.components.toast.containerSection')}
        </p>
        <div className="grid grid-cols-2 gap-2 pl-2">
          <ColorPicker
            label={FM('themeSettings.components.toast.background')}
            value={config.background}
            onChange={(v) => onUpdate({ background: v })}
          />
          <ColorPicker
            label={FM('themeSettings.components.toast.textColor')}
            value={config.textColor}
            onChange={(v) => onUpdate({ textColor: v })}
          />
          <ColorPicker
            label={FM('themeSettings.components.toast.titleColor')}
            value={config.titleColor}
            onChange={(v) => onUpdate({ titleColor: v })}
          />
          <ColorPicker
            label={FM('themeSettings.components.toast.borderColor')}
            value={config.borderColor}
            onChange={(v) => onUpdate({ borderColor: v })}
          />
        </div>
      </div>

      {/* Close Button */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-text-secondary">
          {FM('themeSettings.components.toast.closeButtonSection')}
        </p>
        <div className="grid grid-cols-2 gap-2 pl-2">
          <ColorPicker
            label={FM('themeSettings.components.toast.closeButtonColor')}
            value={config.closeButtonColor}
            onChange={(v) => onUpdate({ closeButtonColor: v })}
          />
          <ColorPicker
            label={FM('themeSettings.components.toast.closeButtonHoverColor')}
            value={config.closeButtonHoverColor}
            onChange={(v) => onUpdate({ closeButtonHoverColor: v })}
          />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-text-secondary">
          {FM('themeSettings.components.toast.progressBarSection')}
        </p>
        <div className="pl-2">
          <ColorPicker
            label={FM('themeSettings.components.toast.progressBarColor')}
            value={config.progressBarColor}
            onChange={(v) => onUpdate({ progressBarColor: v })}
          />
        </div>
      </div>

      {/* Severity Variants */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-text-secondary">
          {FM('themeSettings.components.toast.severitySection')}
        </p>
        <SeverityGroup
          bg={config.successBackground}
          icon={config.successIconColor}
          label="success"
          text={config.successTextColor}
          onBgChange={(v) => onUpdate({ successBackground: v })}
          onIconChange={(v) => onUpdate({ successIconColor: v })}
          onTextChange={(v) => onUpdate({ successTextColor: v })}
        />
        <SeverityGroup
          bg={config.warningBackground}
          icon={config.warningIconColor}
          label="warning"
          text={config.warningTextColor}
          onBgChange={(v) => onUpdate({ warningBackground: v })}
          onIconChange={(v) => onUpdate({ warningIconColor: v })}
          onTextChange={(v) => onUpdate({ warningTextColor: v })}
        />
        <SeverityGroup
          bg={config.errorBackground}
          icon={config.errorIconColor}
          label="error"
          text={config.errorTextColor}
          onBgChange={(v) => onUpdate({ errorBackground: v })}
          onIconChange={(v) => onUpdate({ errorIconColor: v })}
          onTextChange={(v) => onUpdate({ errorTextColor: v })}
        />
        <SeverityGroup
          bg={config.infoBackground}
          icon={config.infoIconColor}
          label="info"
          text={config.infoTextColor}
          onBgChange={(v) => onUpdate({ infoBackground: v })}
          onIconChange={(v) => onUpdate({ infoIconColor: v })}
          onTextChange={(v) => onUpdate({ infoTextColor: v })}
        />
      </div>
    </div>
  </CollapsibleSection>
);
