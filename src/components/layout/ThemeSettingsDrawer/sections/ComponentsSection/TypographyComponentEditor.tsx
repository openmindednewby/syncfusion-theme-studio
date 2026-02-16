import { FM } from '@/localization/helpers';
import type { TypographyComponentsConfig } from '@/stores/theme/types';

import { CollapsibleSection } from './CollapsibleSection';
import { TypographyLevelEditor } from './TypographyLevelEditor';

interface TypographyComponentEditorProps {
  config: TypographyComponentsConfig;
  onUpdate: (level: keyof TypographyComponentsConfig, updates: Record<string, string>) => void;
}

const LEVELS: Array<{ key: keyof TypographyComponentsConfig; label: string }> = [
  { key: 'h1', label: 'H1' },
  { key: 'h2', label: 'H2' },
  { key: 'h3', label: 'H3' },
  { key: 'h4', label: 'H4' },
  { key: 'body', label: 'Body' },
  { key: 'bodySmall', label: 'Body Small' },
  { key: 'secondary', label: 'Secondary' },
  { key: 'muted', label: 'Muted' },
  { key: 'caption', label: 'Caption' },
  { key: 'label', label: 'Label' },
];

export const TypographyComponentEditor = ({ config, onUpdate }: TypographyComponentEditorProps): JSX.Element => (
  <CollapsibleSection title={FM('themeSettings.components.typographyComponents.title')}>
    <div className="space-y-4">
      {LEVELS.map(({ key, label }) => (
        <TypographyLevelEditor
          key={key}
          config={config[key]}
          label={label}
          onUpdate={(updates) => onUpdate(key, updates)}
        />
      ))}
    </div>
  </CollapsibleSection>
);
