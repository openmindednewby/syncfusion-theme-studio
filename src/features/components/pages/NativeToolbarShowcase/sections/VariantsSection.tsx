/**
 * VariantsSection demonstrates different toolbar configurations:
 * icon-only, text-only, and a toolbar with disabled items.
 */
import { memo } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import {
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  SearchDemoIcon,
  SettingsDemoIcon,
  ShareDemoIcon,
  DeleteIcon,
} from '@/components/icons';
import { ToolbarNative } from '@/components/ui/native';
import type { ToolbarItem } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';

/* ------------------------------------------------------------------ */
/*  Toolbar item builders                                             */
/* ------------------------------------------------------------------ */

const buildIconOnlyItems = (): ToolbarItem[] => [
  { type: 'button', icon: <AlignLeftIcon />, tooltip: FM('components.toolbarShowcase.items.alignLeft') },
  { type: 'button', icon: <AlignCenterIcon />, tooltip: FM('components.toolbarShowcase.items.alignCenter') },
  { type: 'button', icon: <AlignRightIcon />, tooltip: FM('components.toolbarShowcase.items.alignRight') },
  { type: 'separator' },
  { type: 'button', icon: <BoldIcon />, tooltip: FM('components.nativeToolbar.bold') },
  { type: 'button', icon: <ItalicIcon />, tooltip: FM('components.nativeToolbar.italic') },
  { type: 'button', icon: <UnderlineIcon />, tooltip: FM('components.nativeToolbar.underline') },
];

const buildTextOnlyItems = (): ToolbarItem[] => [
  { type: 'button', text: FM('components.nativeToolbar.cut') },
  { type: 'button', text: FM('components.nativeToolbar.copy') },
  { type: 'button', text: FM('components.nativeToolbar.paste') },
  { type: 'separator' },
  { type: 'button', text: FM('components.toolbarShowcase.items.search') },
  { type: 'button', text: FM('components.toolbarShowcase.items.share') },
];

const buildWithDisabledItems = (): ToolbarItem[] => [
  { type: 'button', text: FM('components.toolbarShowcase.items.save'), icon: <SearchDemoIcon />, tooltip: FM('components.toolbarShowcase.items.save') },
  { type: 'button', text: FM('components.toolbarShowcase.items.share'), icon: <ShareDemoIcon />, tooltip: FM('components.toolbarShowcase.items.share') },
  { type: 'separator' },
  { type: 'button', text: FM('components.toolbarShowcase.items.settings'), icon: <SettingsDemoIcon />, tooltip: FM('components.toolbarShowcase.items.settings'), disabled: true },
  { type: 'button', text: FM('components.toolbarShowcase.items.delete'), icon: <DeleteIcon />, tooltip: FM('components.toolbarShowcase.items.delete'), disabled: true },
];

/* ------------------------------------------------------------------ */
/*  Section                                                           */
/* ------------------------------------------------------------------ */

export const VariantsSection = memo((): JSX.Element => (
  <section className="card space-y-6">
    <div>
      <h3 className="text-lg font-semibold text-text-primary">
        {FM('components.toolbarShowcase.sections.variants')}
      </h3>
      <p className="mt-1 text-sm text-text-secondary">
        {FM('components.toolbarShowcase.sections.variantsDesc')}
      </p>
    </div>

    <div className="space-y-4">
      <div>
        <h4 className="mb-2 text-sm font-medium text-text-secondary">
          {FM('components.toolbarShowcase.sections.iconOnly')}
        </h4>
        <ToolbarNative
          ariaLabel={FM('components.toolbarShowcase.sections.iconOnly')}
          items={buildIconOnlyItems()}
          testId="toolbar-icon-only"
        />
      </div>

      <div>
        <h4 className="mb-2 text-sm font-medium text-text-secondary">
          {FM('components.toolbarShowcase.sections.textOnly')}
        </h4>
        <ToolbarNative
          ariaLabel={FM('components.toolbarShowcase.sections.textOnly')}
          items={buildTextOnlyItems()}
          testId="toolbar-text-only"
        />
      </div>

      <div>
        <h4 className="mb-2 text-sm font-medium text-text-secondary">
          {FM('components.toolbarShowcase.sections.withDisabled')}
        </h4>
        <ToolbarNative
          ariaLabel={FM('components.toolbarShowcase.sections.withDisabled')}
          items={buildWithDisabledItems()}
          testId="toolbar-with-disabled"
        />
      </div>
    </div>
    <CopyableCodeSnippet code={'<ToolbarNative\n  ariaLabel="Icon-only toolbar"\n  items={[\n    { type: "button", icon: <AlignLeftIcon />, tooltip: "Align Left" },\n    { type: "button", icon: <BoldIcon />, tooltip: "Bold" },\n    { type: "button", text: "Settings", disabled: true },\n  ]}\n/>'} />
  </section>
));

VariantsSection.displayName = 'VariantsSection';
