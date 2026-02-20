import { FM } from '@/localization/utils/helpers';
import type { FontWeightScale } from '@/stores/theme/types';

import { TextInputRow } from '../../../components/TextInputRow';


interface FontWeightEditorProps {
  fontWeight: FontWeightScale;
  onUpdateFontWeight: (key: keyof FontWeightScale, value: string) => void;
}

export const FontWeightEditor = ({
  fontWeight,
  onUpdateFontWeight,
}: FontWeightEditorProps): JSX.Element => (
  <div className="space-y-2">
    <h5 className="text-xs font-medium text-text-secondary">
      {FM('themeSettings.typography.fontWeight')}
    </h5>
    <div className="space-y-2">
      <TextInputRow label="light" placeholder="300" value={fontWeight.light} onChange={(v) => onUpdateFontWeight('light', v)} />
      <TextInputRow label="normal" placeholder="400" value={fontWeight.normal} onChange={(v) => onUpdateFontWeight('normal', v)} />
      <TextInputRow label="medium" placeholder="500" value={fontWeight.medium} onChange={(v) => onUpdateFontWeight('medium', v)} />
      <TextInputRow label="semibold" placeholder="600" value={fontWeight.semibold} onChange={(v) => onUpdateFontWeight('semibold', v)} />
      <TextInputRow label="bold" placeholder="700" value={fontWeight.bold} onChange={(v) => onUpdateFontWeight('bold', v)} />
    </div>
  </div>
);
