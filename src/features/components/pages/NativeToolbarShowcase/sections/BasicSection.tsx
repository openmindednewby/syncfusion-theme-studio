/**
 * BasicSection demonstrates a standard toolbar with text-and-icon
 * action buttons, separators dividing logical groups.
 */
import { memo } from 'react';

import { CutIcon, CopyIcon, PasteIcon, UndoIcon, RedoIcon, SaveIcon } from '@/components/icons';
import { ToolbarNative } from '@/components/ui/native';
import type { ToolbarItem } from '@/components/ui/native';
import { FM } from '@/localization/helpers';

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
