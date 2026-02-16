import { FM } from '@/localization/helpers';
import type { TypographyLevelConfig , FontSizeScale, FontWeightScale, LetterSpacingScale, LineHeightScale } from '@/stores/theme/types';


interface TypographyLevelEditorProps {
  label: string;
  config: TypographyLevelConfig;
  onUpdate: (updates: Record<string, string>) => void;
}

const FONT_SIZE_OPTIONS: Array<keyof FontSizeScale> = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl'];
const FONT_WEIGHT_OPTIONS: Array<keyof FontWeightScale> = ['light', 'normal', 'medium', 'semibold', 'bold'];
const LINE_HEIGHT_OPTIONS: Array<keyof LineHeightScale> = ['tight', 'normal', 'relaxed'];
const LETTER_SPACING_OPTIONS: Array<keyof LetterSpacingScale> = ['tight', 'normal', 'wide'];
const COLOR_OPTIONS = ['primary', 'secondary', 'muted'] as const;

const selectClasses = 'rounded border border-border bg-surface px-2 py-1 text-xs text-text-primary';

export const TypographyLevelEditor = ({ label, config, onUpdate }: TypographyLevelEditorProps): JSX.Element => (
  <div className="space-y-2">
    <p className="text-xs font-medium capitalize text-text-secondary">{label}</p>
    <div className="grid grid-cols-2 gap-2 pl-2">
      <label className="flex flex-col gap-1">
        <span className="text-[10px] text-text-muted">{FM('themeSettings.components.typographyComponents.fontSize')}</span>
        <select
          className={selectClasses}
          value={config.fontSize}
          onChange={(e) => onUpdate({ fontSize: e.target.value })}
        >
          {FONT_SIZE_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-[10px] text-text-muted">{FM('themeSettings.components.typographyComponents.fontWeight')}</span>
        <select
          className={selectClasses}
          value={config.fontWeight}
          onChange={(e) => onUpdate({ fontWeight: e.target.value })}
        >
          {FONT_WEIGHT_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-[10px] text-text-muted">{FM('themeSettings.components.typographyComponents.lineHeight')}</span>
        <select
          className={selectClasses}
          value={config.lineHeight}
          onChange={(e) => onUpdate({ lineHeight: e.target.value })}
        >
          {LINE_HEIGHT_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-[10px] text-text-muted">{FM('themeSettings.components.typographyComponents.letterSpacing')}</span>
        <select
          className={selectClasses}
          value={config.letterSpacing}
          onChange={(e) => onUpdate({ letterSpacing: e.target.value })}
        >
          {LETTER_SPACING_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-[10px] text-text-muted">{FM('themeSettings.components.typographyComponents.color')}</span>
        <select
          className={selectClasses}
          value={config.color}
          onChange={(e) => onUpdate({ color: e.target.value })}
        >
          {COLOR_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      </label>
    </div>
  </div>
);
