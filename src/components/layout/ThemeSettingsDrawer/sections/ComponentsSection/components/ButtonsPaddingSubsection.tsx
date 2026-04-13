import { FM } from '@/localization/utils/helpers';
import type { ButtonPadding } from '@/stores/theme/types';

interface Props {
  padding: ButtonPadding;
  gap: string;
  onUpdatePadding: (updates: Partial<ButtonPadding>) => void;
  onUpdateGap: (gap: string) => void;
}

export const ButtonsPaddingSubsection = ({ padding, gap, onUpdatePadding, onUpdateGap }: Props): JSX.Element => (
  <div className="space-y-2">
    <p className="text-xs font-medium text-text-secondary">
      {FM('themeSettings.components.buttons.paddingTitle')}
    </p>
    <div className="grid grid-cols-2 gap-2 pl-2">
      <div className="space-y-1">
        <label className="text-xs text-text-muted">{FM('themeSettings.components.buttons.paddingTop')}</label>
        <input
          className="w-full rounded border border-border bg-surface px-2 py-1 text-xs text-text-primary"
          value={padding.paddingTop}
          onChange={(e) => onUpdatePadding({ paddingTop: e.target.value })}
        />
      </div>
      <div className="space-y-1">
        <label className="text-xs text-text-muted">{FM('themeSettings.components.buttons.paddingRight')}</label>
        <input
          className="w-full rounded border border-border bg-surface px-2 py-1 text-xs text-text-primary"
          value={padding.paddingRight}
          onChange={(e) => onUpdatePadding({ paddingRight: e.target.value })}
        />
      </div>
      <div className="space-y-1">
        <label className="text-xs text-text-muted">{FM('themeSettings.components.buttons.paddingBottom')}</label>
        <input
          className="w-full rounded border border-border bg-surface px-2 py-1 text-xs text-text-primary"
          value={padding.paddingBottom}
          onChange={(e) => onUpdatePadding({ paddingBottom: e.target.value })}
        />
      </div>
      <div className="space-y-1">
        <label className="text-xs text-text-muted">{FM('themeSettings.components.buttons.paddingLeft')}</label>
        <input
          className="w-full rounded border border-border bg-surface px-2 py-1 text-xs text-text-primary"
          value={padding.paddingLeft}
          onChange={(e) => onUpdatePadding({ paddingLeft: e.target.value })}
        />
      </div>
      <div className="space-y-1 col-span-2">
        <label className="text-xs text-text-muted">{FM('themeSettings.components.buttons.gap')}</label>
        <input
          className="w-full rounded border border-border bg-surface px-2 py-1 text-xs text-text-primary"
          value={gap}
          onChange={(e) => onUpdateGap(e.target.value)}
        />
      </div>
    </div>
  </div>
);
