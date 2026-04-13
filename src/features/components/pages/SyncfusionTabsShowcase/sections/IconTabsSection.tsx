/**
 * IconTabsSection demonstrates Syncfusion tabs with SVG icons
 * rendered alongside the tab labels.
 */
import { memo } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import SyncfusionTabs from '@/components/ui/syncfusion/Tabs';
import { FM } from '@/localization/utils/helpers';

const ICON_CLASS = 'h-4 w-4';

const HomeIcon = (): JSX.Element => (
  <svg className={ICON_CLASS} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
  </svg>
);

const SearchIcon = (): JSX.Element => (
  <svg className={ICON_CLASS} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
  </svg>
);

const UserIcon = (): JSX.Element => (
  <svg className={ICON_CLASS} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
  </svg>
);

const ICON_TABS = [
  { id: 'home', label: 'Home', icon: <HomeIcon />, content: <p className="text-text-secondary">{FM('showcase.content.sfHomePanel')}</p> },
  { id: 'search', label: 'Search', icon: <SearchIcon />, content: <p className="text-text-secondary">{FM('showcase.content.sfSearchPanel')}</p> },
  { id: 'profile', label: 'Profile', icon: <UserIcon />, content: <p className="text-text-secondary">{FM('showcase.content.sfProfilePanel')}</p> },
];

const CODE_SNIPPET = `<SyncfusionTabs
  items={[
    { id: "home", label: "Home", icon: <HomeIcon />, content: <p>Home</p> },
    { id: "search", label: "Search", icon: <SearchIcon />, content: <p>Search</p> },
  ]}
/>`;

export const IconTabsSection = memo((): JSX.Element => (
  <section className="card space-y-4">
    <h3 className="text-lg font-semibold text-text-primary">{FM('showcase.sections.iconTabs')}</h3>
    <SyncfusionTabs items={ICON_TABS} testId="sf-tabs-icon" />
    <CopyableCodeSnippet code={CODE_SNIPPET} />
  </section>
));

IconTabsSection.displayName = 'IconTabsSection';
