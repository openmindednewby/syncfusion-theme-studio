import { FM } from '@/localization/helpers';
import type { FontSizeScale } from '@/stores/theme/types';

import { TextInputRow } from '../../TextInputRow';


interface FontSizeEditorProps {
  fontSize: FontSizeScale;
  onUpdateFontSize: (key: keyof FontSizeScale, value: string) => void;
}

export const FontSizeEditor = ({
  fontSize,
  onUpdateFontSize,
}: FontSizeEditorProps): JSX.Element => (
  <div className="space-y-2">
    <h5 className="text-xs font-medium text-text-secondary">
      {FM('themeSettings.typography.fontSize')}
    </h5>
    <div className="space-y-2">
      <TextInputRow label="xs" placeholder="0.75rem" value={fontSize.xs} onChange={(v) => onUpdateFontSize('xs', v)} />
      <TextInputRow label="sm" placeholder="0.875rem" value={fontSize.sm} onChange={(v) => onUpdateFontSize('sm', v)} />
      <TextInputRow label="base" placeholder="1rem" value={fontSize.base} onChange={(v) => onUpdateFontSize('base', v)} />
      <TextInputRow label="lg" placeholder="1.125rem" value={fontSize.lg} onChange={(v) => onUpdateFontSize('lg', v)} />
      <TextInputRow label="xl" placeholder="1.25rem" value={fontSize.xl} onChange={(v) => onUpdateFontSize('xl', v)} />
      <TextInputRow label="2xl" placeholder="1.5rem" value={fontSize['2xl']} onChange={(v) => onUpdateFontSize('2xl', v)} />
      <TextInputRow label="3xl" placeholder="1.875rem" value={fontSize['3xl']} onChange={(v) => onUpdateFontSize('3xl', v)} />
    </div>
  </div>
);
