
import { FM } from '@/localization/helpers';
import type { BorderRadiusConfig } from '@/stores/theme/types';

import { TextInputRow } from '../../TextInputRow';

const BORDER_RADIUS_KEYS: Array<keyof BorderRadiusConfig> = [
  'none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full',
];

interface BorderRadiusEditorProps {
  borderRadius: BorderRadiusConfig;
  onChange: (key: keyof BorderRadiusConfig, value: string) => void;
}

export const BorderRadiusEditor = ({
  borderRadius,
  onChange,
}: BorderRadiusEditorProps): JSX.Element => {
  return (
    <div className="space-y-2">
      <h5 className="text-xs font-medium text-text-secondary">
        {FM('themeSettings.layout.borderRadius')}
      </h5>
      <div className="grid grid-cols-2 gap-2">
        {BORDER_RADIUS_KEYS.map((key) => (
          <TextInputRow
            key={key}
            label={key}
            placeholder="e.g., 0.5rem"
            value={borderRadius[key]}
            onChange={(value) => onChange(key, value)}
          />
        ))}
      </div>
    </div>
  );
};
