import { FM } from '@/localization/helpers';
import type { BadgesConfig, BadgeVariant } from '@/stores/theme/types';

import { CollapsibleSection } from './CollapsibleSection';
import { ColorPicker } from '../../ColorPicker';

interface BadgesEditorProps {
  config: BadgesConfig;
  onUpdate: (updates: Partial<BadgesConfig>) => void;
}

const enum BadgeKey {
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
  Info = 'info',
}

const BADGE_VARIANTS: BadgeKey[] = [BadgeKey.Success, BadgeKey.Warning, BadgeKey.Error, BadgeKey.Info];

interface BadgeVariantEditorProps {
  config: BadgeVariant;
  variant: BadgeKey;
  onUpdate: (updates: Partial<BadgeVariant>) => void;
}

const BadgeVariantEditor = ({ config, onUpdate, variant }: BadgeVariantEditorProps): JSX.Element => (
  <div className="space-y-2">
    <p className="text-xs font-medium capitalize text-text-secondary">{variant}</p>
    <div className="grid grid-cols-2 gap-2 pl-2">
      <ColorPicker
        label={FM('themeSettings.components.badges.background')}
        value={config.background}
        onChange={(value) => onUpdate({ background: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.badges.textColor')}
        value={config.textColor}
        onChange={(value) => onUpdate({ textColor: value })}
      />
    </div>
  </div>
);

export const BadgesEditor = ({ config, onUpdate }: BadgesEditorProps): JSX.Element => {
  const handleVariantUpdate = (variant: BadgeKey, updates: Partial<BadgeVariant>): void => {
    onUpdate({
      [variant]: { ...config[variant], ...updates },
    });
  };

  return (
    <CollapsibleSection title={FM('themeSettings.components.badges.title')}>
      <div className="space-y-4">
        {BADGE_VARIANTS.map((variant) => (
          <BadgeVariantEditor
            key={variant}
            config={config[variant]}
            variant={variant}
            onUpdate={(updates) => handleVariantUpdate(variant, updates)}
          />
        ))}
      </div>
    </CollapsibleSection>
  );
};
