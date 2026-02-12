import { FM } from '@/localization/helpers';
import type { LineHeightScale } from '@/stores/theme/types';

import { TextInputRow } from '../../TextInputRow';


interface LineHeightEditorProps {
  lineHeight: LineHeightScale;
  onUpdateLineHeight: (key: keyof LineHeightScale, value: string) => void;
}

export const LineHeightEditor = ({
  lineHeight,
  onUpdateLineHeight,
}: LineHeightEditorProps): JSX.Element => (
  <div className="space-y-2">
    <h5 className="text-xs font-medium text-text-secondary">
      {FM('themeSettings.typography.lineHeight')}
    </h5>
    <div className="space-y-2">
      <TextInputRow label="tight" placeholder="1.25" value={lineHeight.tight} onChange={(v) => onUpdateLineHeight('tight', v)} />
      <TextInputRow label="normal" placeholder="1.5" value={lineHeight.normal} onChange={(v) => onUpdateLineHeight('normal', v)} />
      <TextInputRow label="relaxed" placeholder="1.75" value={lineHeight.relaxed} onChange={(v) => onUpdateLineHeight('relaxed', v)} />
    </div>
  </div>
);
