import { FM } from '@/localization/utils/helpers';
import type { TextDescriptionConfig } from '@/stores/theme/types';

import { CollapsibleSection } from './CollapsibleSection';
import { ColorPicker } from '../../../components/ColorPicker';

interface TextDescriptionEditorProps {
  config: TextDescriptionConfig;
  onUpdate: (updates: Partial<TextDescriptionConfig>) => void;
}

const inputClasses = 'w-full rounded border border-border bg-surface px-2 py-1 text-xs text-text-primary';

interface FieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const Field = ({ label, value, onChange }: FieldProps): JSX.Element => (
  <div className="space-y-1">
    <span className="text-[10px] text-text-muted">{label}</span>
    <input
      className={inputClasses}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export const TextDescriptionEditor = ({ config, onUpdate }: TextDescriptionEditorProps): JSX.Element => (
  <CollapsibleSection title={FM('themeSettings.components.textDescription.title')}>
    <div className="space-y-3">
      <ColorPicker
        label={FM('themeSettings.components.textDescription.textColor')}
        value={config.textColor}
        onChange={(value) => onUpdate({ textColor: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.textDescription.seeMoreTextColor')}
        value={config.seeMoreTextColor}
        onChange={(value) => onUpdate({ seeMoreTextColor: value })}
      />
      <div className="grid grid-cols-2 gap-2">
        <Field
          label={FM('themeSettings.components.textDescription.fontFamily')}
          value={config.fontFamily}
          onChange={(v) => onUpdate({ fontFamily: v })}
        />
        <Field
          label={FM('themeSettings.components.textDescription.fontSize')}
          value={config.fontSize}
          onChange={(v) => onUpdate({ fontSize: v })}
        />
        <Field
          label={FM('themeSettings.components.textDescription.fontWeight')}
          value={config.fontWeight}
          onChange={(v) => onUpdate({ fontWeight: v })}
        />
        <Field
          label={FM('themeSettings.components.textDescription.lineHeight')}
          value={config.lineHeight}
          onChange={(v) => onUpdate({ lineHeight: v })}
        />
        <Field
          label={FM('themeSettings.components.textDescription.letterSpacing')}
          value={config.letterSpacing}
          onChange={(v) => onUpdate({ letterSpacing: v })}
        />
      </div>
      <span className="text-xs font-medium text-text-secondary">
        {FM('themeSettings.components.textDescription.seeMoreHeading')}
      </span>
      <div className="grid grid-cols-2 gap-2">
        <Field
          label={FM('themeSettings.components.textDescription.seeMoreFontSize')}
          value={config.seeMoreFontSize}
          onChange={(v) => onUpdate({ seeMoreFontSize: v })}
        />
        <Field
          label={FM('themeSettings.components.textDescription.seeMoreFontWeight')}
          value={config.seeMoreFontWeight}
          onChange={(v) => onUpdate({ seeMoreFontWeight: v })}
        />
        <Field
          label={FM('themeSettings.components.textDescription.seeMoreLineHeight')}
          value={config.seeMoreLineHeight}
          onChange={(v) => onUpdate({ seeMoreLineHeight: v })}
        />
        <Field
          label={FM('themeSettings.components.textDescription.seeMoreHeight')}
          value={config.seeMoreHeight}
          onChange={(v) => onUpdate({ seeMoreHeight: v })}
        />
      </div>
      <div className="grid grid-cols-4 gap-2">
        <Field
          label={FM('themeSettings.components.textDescription.seeMorePaddingTop')}
          value={config.seeMorePadding.paddingTop}
          onChange={(v) => onUpdate({ seeMorePadding: { ...config.seeMorePadding, paddingTop: v } })}
        />
        <Field
          label={FM('themeSettings.components.textDescription.seeMorePaddingRight')}
          value={config.seeMorePadding.paddingRight}
          onChange={(v) => onUpdate({ seeMorePadding: { ...config.seeMorePadding, paddingRight: v } })}
        />
        <Field
          label={FM('themeSettings.components.textDescription.seeMorePaddingBottom')}
          value={config.seeMorePadding.paddingBottom}
          onChange={(v) => onUpdate({ seeMorePadding: { ...config.seeMorePadding, paddingBottom: v } })}
        />
        <Field
          label={FM('themeSettings.components.textDescription.seeMorePaddingLeft')}
          value={config.seeMorePadding.paddingLeft}
          onChange={(v) => onUpdate({ seeMorePadding: { ...config.seeMorePadding, paddingLeft: v } })}
        />
      </div>
      <div className="grid grid-cols-4 gap-2">
        <Field
          label={FM('themeSettings.components.textDescription.seeMoreMarginTop')}
          value={config.seeMoreMargin.marginTop}
          onChange={(v) => onUpdate({ seeMoreMargin: { ...config.seeMoreMargin, marginTop: v } })}
        />
        <Field
          label={FM('themeSettings.components.textDescription.seeMoreMarginRight')}
          value={config.seeMoreMargin.marginRight}
          onChange={(v) => onUpdate({ seeMoreMargin: { ...config.seeMoreMargin, marginRight: v } })}
        />
        <Field
          label={FM('themeSettings.components.textDescription.seeMoreMarginBottom')}
          value={config.seeMoreMargin.marginBottom}
          onChange={(v) => onUpdate({ seeMoreMargin: { ...config.seeMoreMargin, marginBottom: v } })}
        />
        <Field
          label={FM('themeSettings.components.textDescription.seeMoreMarginLeft')}
          value={config.seeMoreMargin.marginLeft}
          onChange={(v) => onUpdate({ seeMoreMargin: { ...config.seeMoreMargin, marginLeft: v } })}
        />
      </div>
    </div>
  </CollapsibleSection>
);
