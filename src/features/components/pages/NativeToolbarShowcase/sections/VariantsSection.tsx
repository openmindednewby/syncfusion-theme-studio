/**
 * VariantsSection demonstrates different toolbar configurations:
 * icon-only, text-only, and a toolbar with disabled items.
 */
import { memo } from 'react';

import { ToolbarNative } from '@/components/ui/native';
import type { ToolbarItem } from '@/components/ui/native';
import { FM } from '@/localization/helpers';

/* ------------------------------------------------------------------ */
/*  Icons                                                             */
/* ------------------------------------------------------------------ */

const AlignLeftIcon = (): JSX.Element => (
  <svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M17 10H3M21 6H3M21 14H3M17 18H3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AlignCenterIcon = (): JSX.Element => (
  <svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M18 10H6M21 6H3M21 14H3M18 18H6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AlignRightIcon = (): JSX.Element => (
  <svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M21 10H7M21 6H3M21 14H3M21 18H7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BoldIcon = (): JSX.Element => (
  <svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6zM6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ItalicIcon = (): JSX.Element => (
  <svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M19 4h-9M14 20H5M15 4L9 20" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const UnderlineIcon = (): JSX.Element => (
  <svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M6 3v7a6 6 0 0012 0V3M4 21h16" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SearchIcon = (): JSX.Element => (
  <svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SettingsIcon = (): JSX.Element => (
  <svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path
      d="M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ShareIcon = (): JSX.Element => (
  <svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path
      d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DeleteIcon = (): JSX.Element => (
  <svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path
      d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

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
  { type: 'button', text: FM('components.toolbarShowcase.items.save'), icon: <SearchIcon />, tooltip: FM('components.toolbarShowcase.items.save') },
  { type: 'button', text: FM('components.toolbarShowcase.items.share'), icon: <ShareIcon />, tooltip: FM('components.toolbarShowcase.items.share') },
  { type: 'separator' },
  { type: 'button', text: FM('components.toolbarShowcase.items.settings'), icon: <SettingsIcon />, tooltip: FM('components.toolbarShowcase.items.settings'), disabled: true },
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
  </section>
));

VariantsSection.displayName = 'VariantsSection';
