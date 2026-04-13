import { FM } from '@/localization/utils/helpers';
import type { ImageConfig } from '@/stores/theme/types';

import { CollapsibleSection } from './CollapsibleSection';
import { ColorPicker } from '../../../components/ColorPicker';

interface ImageEditorProps {
  config: ImageConfig;
  onUpdate: (updates: Partial<ImageConfig>) => void;
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

export const ImageEditor = ({ config, onUpdate }: ImageEditorProps): JSX.Element => (
  <CollapsibleSection title={FM('themeSettings.components.image.title')}>
    <div className="space-y-4">
      <p className="text-xs text-text-muted">
        {FM('themeSettings.components.image.description')}
      </p>
      <div className="grid grid-cols-2 gap-2">
        <ColorPicker
          label={FM('themeSettings.components.image.background')}
          value={config.background}
          onChange={(value) => onUpdate({ background: value })}
        />
        <ColorPicker
          label={FM('themeSettings.components.image.borderColor')}
          value={config.borderColor}
          onChange={(value) => onUpdate({ borderColor: value })}
        />
        <ColorPicker
          label={FM('themeSettings.components.image.placeholderIconColor')}
          value={config.placeholderIconColor}
          onChange={(value) => onUpdate({ placeholderIconColor: value })}
        />
        <ColorPicker
          label={FM('themeSettings.components.image.hoverBorderColor')}
          value={config.hoverBorderColor}
          onChange={(value) => onUpdate({ hoverBorderColor: value })}
        />
      </div>
      <div className="grid grid-cols-3 gap-2">
        <Field
          label={FM('themeSettings.components.image.borderRadius')}
          value={config.borderRadius}
          onChange={(v) => onUpdate({ borderRadius: v })}
        />
        <Field
          label={FM('themeSettings.components.image.objectFit')}
          value={config.objectFit}
          onChange={(v) => onUpdate({ objectFit: v })}
        />
        <Field
          label={FM('themeSettings.components.image.transitionDuration')}
          value={config.transitionDuration}
          onChange={(v) => onUpdate({ transitionDuration: v })}
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Field
          label={FM('themeSettings.components.image.shadowDefault')}
          value={config.shadowDefault}
          onChange={(v) => onUpdate({ shadowDefault: v })}
        />
        <Field
          label={FM('themeSettings.components.image.shadowHover')}
          value={config.shadowHover}
          onChange={(v) => onUpdate({ shadowHover: v })}
        />
      </div>
    </div>
  </CollapsibleSection>
);
