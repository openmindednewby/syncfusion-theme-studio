import { FM } from '@/localization/utils/helpers';
import { ErrorAnimationType } from '@/stores/theme/types';
import type { ErrorMessagesConfig } from '@/stores/theme/types';

import { CollapsibleSection } from './CollapsibleSection';
import { ColorPicker } from '../../../components/ColorPicker';
import { TextInputRow } from '../../../components/TextInputRow';

interface ErrorMessagesEditorProps {
  config: ErrorMessagesConfig;
  onUpdate: (updates: Partial<ErrorMessagesConfig>) => void;
}

const ANIMATION_OPTIONS: Array<{ value: ErrorAnimationType; labelKey: string }> = [
  { value: ErrorAnimationType.None, labelKey: 'themeSettings.components.errorMessages.animationNone' },
  { value: ErrorAnimationType.FadeIn, labelKey: 'themeSettings.components.errorMessages.animationFadeIn' },
  { value: ErrorAnimationType.SlideDown, labelKey: 'themeSettings.components.errorMessages.animationSlideDown' },
  { value: ErrorAnimationType.Shake, labelKey: 'themeSettings.components.errorMessages.animationShake' },
];

const ANIMATION_MAP = new Map<string, ErrorAnimationType>(
  ANIMATION_OPTIONS.map((o) => [o.value, o.value]),
);

function toAnimation(value: string): ErrorAnimationType {
  return ANIMATION_MAP.get(value) ?? ErrorAnimationType.None;
}

export const ErrorMessagesEditor = ({ config, onUpdate }: ErrorMessagesEditorProps): JSX.Element => {
  return (
    <CollapsibleSection title={FM('themeSettings.components.errorMessages.title')}>
      <div className="space-y-4">
        {/* Colors Sub-section */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-text-secondary">
            {FM('themeSettings.components.errorMessages.colorsSection')}
          </p>
          <ColorPicker
            label={FM('themeSettings.components.errorMessages.textColor')}
            value={config.textColor}
            onChange={(value) => onUpdate({ textColor: value })}
          />
          <ColorPicker
            label={FM('themeSettings.components.errorMessages.iconColor')}
            value={config.iconColor}
            onChange={(value) => onUpdate({ iconColor: value })}
          />
        </div>

        {/* Size Sub-section */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-text-secondary">
            {FM('themeSettings.components.errorMessages.sizeSection')}
          </p>
          <TextInputRow
            label={FM('themeSettings.components.errorMessages.fontSize')}
            value={config.fontSize}
            onChange={(value) => onUpdate({ fontSize: value })}
          />
          <TextInputRow
            label={FM('themeSettings.components.errorMessages.fontWeight')}
            value={config.fontWeight}
            onChange={(value) => onUpdate({ fontWeight: value })}
          />
          <TextInputRow
            label={FM('themeSettings.components.errorMessages.iconSize')}
            value={config.iconSize}
            onChange={(value) => onUpdate({ iconSize: value })}
          />
        </div>

        {/* Animation Sub-section */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-text-secondary">
            {FM('themeSettings.components.errorMessages.animationSection')}
          </p>
          <div className="flex items-center justify-between gap-2 rounded bg-surface-sunken px-3 py-2">
            <span className="text-xs font-medium text-text-secondary">
              {FM('themeSettings.components.errorMessages.animation')}
            </span>
            <select
              aria-label={FM('themeSettings.components.errorMessages.animation')}
              className="w-32 rounded border border-border bg-surface px-2 py-1 text-xs text-text-primary focus:border-primary-500 focus:outline-none"
              value={config.animation}
              onChange={(e) => onUpdate({ animation: toAnimation(e.target.value) })}
            >
              {ANIMATION_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{FM(opt.labelKey)}</option>
              ))}
            </select>
          </div>
          <TextInputRow
            label={FM('themeSettings.components.errorMessages.animationDuration')}
            value={config.animationDuration}
            onChange={(value) => onUpdate({ animationDuration: value })}
          />
        </div>
      </div>
    </CollapsibleSection>
  );
};
