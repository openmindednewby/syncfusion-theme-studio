/**
 * BasicSection demonstrates a standard toolbar with text-and-icon
 * action buttons, separators dividing logical groups.
 */
import { memo } from 'react';

import { ToolbarNative } from '@/components/ui/native';
import type { ToolbarItem } from '@/components/ui/native';
import { FM } from '@/localization/helpers';

/* ------------------------------------------------------------------ */
/*  Icons                                                             */
/* ------------------------------------------------------------------ */

const CutIcon = (): JSX.Element => (
  <svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path
      d="M6 9a3 3 0 100-6 3 3 0 000 6zM6 21a3 3 0 100-6 3 3 0 000 6zM20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CopyIcon = (): JSX.Element => (
  <svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path
      d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2v-2M16 4h2a2 2 0 012 2v6a2 2 0 01-2 2h-8a2 2 0 01-2-2V6a2 2 0 012-2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PasteIcon = (): JSX.Element => (
  <svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const UndoIcon = (): JSX.Element => (
  <svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M3 10h10a5 5 0 015 5v0a5 5 0 01-5 5H3M3 10l5-5M3 10l5 5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const RedoIcon = (): JSX.Element => (
  <svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M21 10H11a5 5 0 00-5 5v0a5 5 0 005 5h10M21 10l-5-5M21 10l-5 5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SaveIcon = (): JSX.Element => (
  <svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path
      d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2zM17 21v-8H7v8M7 3v5h8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Toolbar items                                                     */
/* ------------------------------------------------------------------ */

const buildBasicItems = (): ToolbarItem[] => [
  { type: 'button', text: FM('components.nativeToolbar.cut'), icon: <CutIcon />, tooltip: FM('components.nativeToolbar.cut') },
  { type: 'button', text: FM('components.nativeToolbar.copy'), icon: <CopyIcon />, tooltip: FM('components.nativeToolbar.copy') },
  { type: 'button', text: FM('components.nativeToolbar.paste'), icon: <PasteIcon />, tooltip: FM('components.nativeToolbar.paste') },
  { type: 'separator' },
  { type: 'button', text: FM('components.toolbarShowcase.items.undo'), icon: <UndoIcon />, tooltip: FM('components.toolbarShowcase.items.undo') },
  { type: 'button', text: FM('components.toolbarShowcase.items.redo'), icon: <RedoIcon />, tooltip: FM('components.toolbarShowcase.items.redo') },
  { type: 'separator' },
  { type: 'button', text: FM('components.toolbarShowcase.items.save'), icon: <SaveIcon />, tooltip: FM('components.toolbarShowcase.items.save') },
];

/* ------------------------------------------------------------------ */
/*  Section                                                           */
/* ------------------------------------------------------------------ */

export const BasicSection = memo((): JSX.Element => (
  <section className="card space-y-4">
    <div>
      <h3 className="text-lg font-semibold text-text-primary">
        {FM('components.toolbarShowcase.sections.basic')}
      </h3>
      <p className="mt-1 text-sm text-text-secondary">
        {FM('components.toolbarShowcase.sections.basicDesc')}
      </p>
    </div>
    <ToolbarNative
      ariaLabel={FM('components.toolbarShowcase.sections.basic')}
      items={buildBasicItems()}
      testId="toolbar-basic"
    />
  </section>
));

BasicSection.displayName = 'BasicSection';
