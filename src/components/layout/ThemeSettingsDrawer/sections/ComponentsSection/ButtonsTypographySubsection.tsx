import { FM } from '@/localization/helpers';
import type { ButtonTypography } from '@/stores/theme/types';

interface Props {
  typography: ButtonTypography;
  onUpdate: (updates: Partial<ButtonTypography>) => void;
}

export const ButtonsTypographySubsection = ({ typography, onUpdate }: Props): JSX.Element => (
  <div className="space-y-2">
    <p className="text-xs font-medium text-text-secondary">
      {FM('themeSettings.components.buttons.typography')}
    </p>
    <div className="grid grid-cols-2 gap-2 pl-2">
      <div className="space-y-1">
        <label className="text-xs text-text-muted">{FM('themeSettings.components.buttons.fontFamily')}</label>
        <input
          className="w-full rounded border border-border bg-surface px-2 py-1 text-xs text-text-primary"
          value={typography.fontFamily}
          onChange={(e) => onUpdate({ fontFamily: e.target.value })}
        />
      </div>
      <div className="space-y-1">
        <label className="text-xs text-text-muted">{FM('themeSettings.components.buttons.fontSize')}</label>
        <input
          className="w-full rounded border border-border bg-surface px-2 py-1 text-xs text-text-primary"
          value={typography.fontSize}
          onChange={(e) => onUpdate({ fontSize: e.target.value })}
        />
      </div>
      <div className="space-y-1">
        <label className="text-xs text-text-muted">{FM('themeSettings.components.buttons.fontWeight')}</label>
        <input
          className="w-full rounded border border-border bg-surface px-2 py-1 text-xs text-text-primary"
          value={typography.fontWeight}
          onChange={(e) => onUpdate({ fontWeight: e.target.value })}
        />
      </div>
      <div className="space-y-1">
        <label className="text-xs text-text-muted">{FM('themeSettings.components.buttons.lineHeight')}</label>
        <input
          className="w-full rounded border border-border bg-surface px-2 py-1 text-xs text-text-primary"
          value={typography.lineHeight}
          onChange={(e) => onUpdate({ lineHeight: e.target.value })}
        />
      </div>
      <div className="space-y-1 col-span-2">
        <label className="text-xs text-text-muted">{FM('themeSettings.components.buttons.letterSpacing')}</label>
        <input
          className="w-full rounded border border-border bg-surface px-2 py-1 text-xs text-text-primary"
          value={typography.letterSpacing}
          onChange={(e) => onUpdate({ letterSpacing: e.target.value })}
        />
      </div>
    </div>
  </div>
);
