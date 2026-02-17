import { memo } from 'react';

import {
  CutIcon,
  CopyIcon,
  PasteIcon,
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
} from '@/components/icons';
import { ToolbarNative } from '@/components/ui/native';
import type { ToolbarItem } from '@/components/ui/native';
import { FM } from '@/localization/helpers';

const buildToolbarItems = (): ToolbarItem[] => [
  { type: 'button', text: FM('components.nativeToolbar.cut'), icon: <CutIcon />, tooltip: FM('components.nativeToolbar.cut') },
  { type: 'button', text: FM('components.nativeToolbar.copy'), icon: <CopyIcon />, tooltip: FM('components.nativeToolbar.copy') },
  { type: 'button', text: FM('components.nativeToolbar.paste'), icon: <PasteIcon />, tooltip: FM('components.nativeToolbar.paste') },
  { type: 'separator' },
  { type: 'button', icon: <BoldIcon />, tooltip: FM('components.nativeToolbar.bold') },
  { type: 'button', icon: <ItalicIcon />, tooltip: FM('components.nativeToolbar.italic') },
  { type: 'button', icon: <UnderlineIcon />, tooltip: FM('components.nativeToolbar.underline') },
];

export const NativeToolbarSection = memo((): JSX.Element => (
  <section className="card">
    <h3 className="mb-4 text-lg font-semibold text-text-primary">
      {FM('components.sections.nativeToolbar')}
    </h3>
    <ToolbarNative
      ariaLabel={FM('components.nativeToolbar.ariaLabel')}
      items={buildToolbarItems()}
      testId="native-toolbar"
    />
  </section>
));

NativeToolbarSection.displayName = 'NativeToolbarSection';
