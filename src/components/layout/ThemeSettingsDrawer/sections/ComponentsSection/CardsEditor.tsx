import { FM } from '@/localization/helpers';
import type { CardsConfig } from '@/stores/theme/types';

import { AnimationSubsection } from './AnimationSubsection';
import { CollapsibleSection } from './CollapsibleSection';
import { ColorPicker } from '../../ColorPicker';

interface CardsEditorProps {
  config: CardsConfig;
  onUpdate: (updates: Partial<CardsConfig>) => void;
}

const TextInput = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}): JSX.Element => (
  <div className="space-y-1">
    <label className="text-xs text-text-muted">{label}</label>
    <input
      className="w-full rounded border border-border bg-surface px-2 py-1 text-xs text-text-primary"
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

const SectionLabel = ({ label }: { label: string }): JSX.Element => (
  <p className="text-xs font-medium text-text-secondary">{label}</p>
);

export const CardsEditor = ({ config, onUpdate }: CardsEditorProps): JSX.Element => (
  <CollapsibleSection title={FM('themeSettings.components.cards.title')}>
    <div className="space-y-4">
      {/* Surface */}
      <div className="space-y-2">
        <SectionLabel label={FM('themeSettings.components.cards.surfaceSection')} />
        <div className="grid grid-cols-2 gap-2 pl-2">
          <ColorPicker
            label={FM('themeSettings.components.cards.background')}
            value={config.background}
            onChange={(value) => onUpdate({ background: value })}
          />
          <ColorPicker
            label={FM('themeSettings.components.cards.textColor')}
            value={config.textColor}
            onChange={(value) => onUpdate({ textColor: value })}
          />
          <ColorPicker
            label={FM('themeSettings.components.cards.borderColor')}
            value={config.borderColor}
            onChange={(value) => onUpdate({ borderColor: value })}
          />
          <ColorPicker
            label={FM('themeSettings.components.cards.hoverBorderColor')}
            value={config.hoverBorderColor}
            onChange={(value) => onUpdate({ hoverBorderColor: value })}
          />
        </div>
        <div className="pl-2">
          <TextInput
            label={FM('themeSettings.components.cards.borderWidth')}
            value={config.borderWidth}
            onChange={(value) => onUpdate({ borderWidth: value })}
          />
        </div>
      </div>

      {/* Header */}
      <div className="space-y-2">
        <SectionLabel label={FM('themeSettings.components.cards.headerSection')} />
        <div className="grid grid-cols-2 gap-2 pl-2">
          <ColorPicker
            label={FM('themeSettings.components.cards.headerBackground')}
            value={config.headerBackground}
            onChange={(value) => onUpdate({ headerBackground: value })}
          />
          <ColorPicker
            label={FM('themeSettings.components.cards.headerTextColor')}
            value={config.headerTextColor}
            onChange={(value) => onUpdate({ headerTextColor: value })}
          />
          <ColorPicker
            label={FM('themeSettings.components.cards.headerBorderColor')}
            value={config.headerBorderColor}
            onChange={(value) => onUpdate({ headerBorderColor: value })}
          />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <SectionLabel label={FM('themeSettings.components.cards.contentSection')} />
        <div className="grid grid-cols-2 gap-2 pl-2">
          <ColorPicker
            label={FM('themeSettings.components.cards.titleColor')}
            value={config.titleColor}
            onChange={(value) => onUpdate({ titleColor: value })}
          />
          <ColorPicker
            label={FM('themeSettings.components.cards.subtitleColor')}
            value={config.subtitleColor}
            onChange={(value) => onUpdate({ subtitleColor: value })}
          />
        </div>
        <div className="pl-2">
          <TextInput
            label={FM('themeSettings.components.cards.contentPadding')}
            value={config.contentPadding}
            onChange={(value) => onUpdate({ contentPadding: value })}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="space-y-2">
        <SectionLabel label={FM('themeSettings.components.cards.footerSection')} />
        <div className="grid grid-cols-2 gap-2 pl-2">
          <ColorPicker
            label={FM('themeSettings.components.cards.footerBackground')}
            value={config.footerBackground}
            onChange={(value) => onUpdate({ footerBackground: value })}
          />
          <ColorPicker
            label={FM('themeSettings.components.cards.footerBorderColor')}
            value={config.footerBorderColor}
            onChange={(value) => onUpdate({ footerBorderColor: value })}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-2">
        <SectionLabel label={FM('themeSettings.components.cards.actionsSection')} />
        <div className="grid grid-cols-2 gap-2 pl-2">
          <ColorPicker
            label={FM('themeSettings.components.cards.actionTextColor')}
            value={config.actionTextColor}
            onChange={(value) => onUpdate({ actionTextColor: value })}
          />
          <ColorPicker
            label={FM('themeSettings.components.cards.actionHoverColor')}
            value={config.actionHoverColor}
            onChange={(value) => onUpdate({ actionHoverColor: value })}
          />
        </div>
      </div>

      {/* Effects */}
      <div className="space-y-2">
        <SectionLabel label={FM('themeSettings.components.cards.effectsSection')} />
        <div className="grid grid-cols-2 gap-2 pl-2">
          <ColorPicker
            label={FM('themeSettings.components.cards.imageOverlayColor')}
            value={config.imageOverlayColor}
            onChange={(value) => onUpdate({ imageOverlayColor: value })}
          />
        </div>
      </div>

      <AnimationSubsection
        animationDuration={config.transitionDuration}
        showEffectSelector={false}
        onDurationChange={(duration) => onUpdate({ transitionDuration: duration })}
      />
    </div>
  </CollapsibleSection>
);
