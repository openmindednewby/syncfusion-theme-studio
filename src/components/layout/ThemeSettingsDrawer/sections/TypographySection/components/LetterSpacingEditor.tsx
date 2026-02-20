import { FM } from '@/localization/utils/helpers';
import type { LetterSpacingScale } from '@/stores/theme/types';

import { TextInputRow } from '../../../components/TextInputRow';


interface LetterSpacingEditorProps {
  letterSpacing: LetterSpacingScale;
  onUpdateLetterSpacing: (key: keyof LetterSpacingScale, value: string) => void;
}

export const LetterSpacingEditor = ({
  letterSpacing,
  onUpdateLetterSpacing,
}: LetterSpacingEditorProps): JSX.Element => (
  <div className="space-y-2">
    <h5 className="text-xs font-medium text-text-secondary">
      {FM('themeSettings.typography.letterSpacing')}
    </h5>
    <div className="space-y-2">
      <TextInputRow label="tight" placeholder="-0.025em" value={letterSpacing.tight} onChange={(v) => onUpdateLetterSpacing('tight', v)} />
      <TextInputRow label="normal" placeholder="0em" value={letterSpacing.normal} onChange={(v) => onUpdateLetterSpacing('normal', v)} />
      <TextInputRow label="wide" placeholder="0.025em" value={letterSpacing.wide} onChange={(v) => onUpdateLetterSpacing('wide', v)} />
    </div>
  </div>
);
