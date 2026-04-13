import { FM } from '@/localization/utils/helpers';
import type { SearchPanelConfig } from '@/stores/theme/types';

import { CollapsibleSection } from './CollapsibleSection';
import { ColorPicker } from '../../../components/ColorPicker';

interface SearchPanelEditorProps {
  config: SearchPanelConfig;
  onUpdate: (updates: Partial<SearchPanelConfig>) => void;
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

export const SearchPanelEditor = ({ config, onUpdate }: SearchPanelEditorProps): JSX.Element => (
  <CollapsibleSection title={FM('themeSettings.components.searchPanel.title')}>
    <div className="space-y-4">
      <p className="text-xs text-text-muted">
        {FM('themeSettings.components.searchPanel.description')}
      </p>
      <div className="grid grid-cols-2 gap-2">
        <ColorPicker
          label={FM('themeSettings.components.searchPanel.background')}
          value={config.background}
          onChange={(value) => onUpdate({ background: value })}
        />
        <ColorPicker
          label={FM('themeSettings.components.searchPanel.borderColor')}
          value={config.borderColor}
          onChange={(value) => onUpdate({ borderColor: value })}
        />
        <ColorPicker
          label={FM('themeSettings.components.searchPanel.labelColor')}
          value={config.labelColor}
          onChange={(value) => onUpdate({ labelColor: value })}
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Field
          label={FM('themeSettings.components.searchPanel.gap')}
          value={config.gap}
          onChange={(v) => onUpdate({ gap: v })}
        />
        <Field
          label={FM('themeSettings.components.searchPanel.padding')}
          value={config.padding}
          onChange={(v) => onUpdate({ padding: v })}
        />
        <Field
          label={FM('themeSettings.components.searchPanel.filterRowGap')}
          value={config.filterRowGap}
          onChange={(v) => onUpdate({ filterRowGap: v })}
        />
        <Field
          label={FM('themeSettings.components.searchPanel.labelFontSize')}
          value={config.labelFontSize}
          onChange={(v) => onUpdate({ labelFontSize: v })}
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Field
          label={FM('themeSettings.components.searchPanel.searchWidth')}
          value={config.searchWidth}
          onChange={(v) => onUpdate({ searchWidth: v })}
        />
        <Field
          label={FM('themeSettings.components.searchPanel.filterWidth')}
          value={config.filterWidth}
          onChange={(v) => onUpdate({ filterWidth: v })}
        />
        <Field
          label={FM('themeSettings.components.searchPanel.borderRadius')}
          value={config.borderRadius}
          onChange={(v) => onUpdate({ borderRadius: v })}
        />
        <Field
          label={FM('themeSettings.components.searchPanel.labelFontWeight')}
          value={config.labelFontWeight}
          onChange={(v) => onUpdate({ labelFontWeight: v })}
        />
      </div>
    </div>
  </CollapsibleSection>
);
