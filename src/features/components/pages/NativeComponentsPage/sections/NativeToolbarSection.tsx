import { memo } from 'react';

import { ToolbarNative } from '@/components/ui/native';
import type { ToolbarItem } from '@/components/ui/native';
import { FM } from '@/localization/helpers';

const CutIcon = (): JSX.Element => (
  <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M6 9a3 3 0 100-6 3 3 0 000 6zM6 21a3 3 0 100-6 3 3 0 000 6zM20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CopyIcon = (): JSX.Element => (
  <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2v-2M16 4h2a2 2 0 012 2v6a2 2 0 01-2 2h-8a2 2 0 01-2-2V6a2 2 0 012-2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PasteIcon = (): JSX.Element => (
  <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BoldIcon = (): JSX.Element => (
  <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6zM6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ItalicIcon = (): JSX.Element => (
  <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M19 4h-9M14 20H5M15 4L9 20" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const UnderlineIcon = (): JSX.Element => (
  <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M6 3v7a6 6 0 0012 0V3M4 21h16" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

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
