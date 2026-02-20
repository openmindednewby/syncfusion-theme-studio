import { useCallback, useState } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import {
  IconDashboard,
  IconShieldAlert,
  IconBell,
  IconBarChart,
  IconSettings,
  IconSearch,
  IconStore,
  CyberWatchLogo,
} from '@/components/icons';
import { FM } from '@/localization/helpers';
import { ComponentTestIds } from '@/shared/testIds.components';

type IconComponent = (props: { className?: string }) => JSX.Element;

interface DemoNavItem {
  label: string;
  icon: IconComponent;
}

const MAIN_ITEMS: DemoNavItem[] = [
  { label: 'Dashboard', icon: IconDashboard },
  { label: 'Threat Detection', icon: IconShieldAlert },
  { label: 'Analytics', icon: IconBarChart },
];

const BOTTOM_ITEMS: DemoNavItem[] = [
  { label: 'Administration', icon: IconSettings },
  { label: 'Marketplace', icon: IconStore },
];

const EXPAND_CHILDREN = ['Alert Management', 'Incident Response'];

const BRAND_NAME = 'CyberWatch';

const STRUCTURE_CODE = [
  '.sidebar {',
  '  background: var(--component-sidebar-background);',
  '  border-right: 1px solid var(--component-sidebar-border-right);',
  '  width: var(--sidebar-width);',
  '}',
  '',
  '.sidebar-item {',
  '  color: var(--component-sidebar-text-color);',
  '  font-size: var(--component-sidebar-font-size);',
  '  font-weight: var(--component-sidebar-font-weight);',
  '}',
  '',
  '.sidebar-item:hover { background: var(--component-sidebar-hover-bg); }',
  '.sidebar-item.active {',
  '  background: var(--component-sidebar-active-bg);',
  '  color: var(--component-sidebar-active-text);',
  '}',
  '',
  '.sidebar-nav-icon {',
  '  width: var(--component-sidebar-icon-size, 18px);',
  '  height: var(--component-sidebar-icon-size, 18px);',
  '}',
  '',
  '.sidebar-search-input {',
  '  background: var(--component-sidebar-search-bg);',
  '  border: 1px solid var(--component-sidebar-search-border);',
  '  color: var(--component-sidebar-search-text);',
  '}',
  '.sidebar-search-input:focus {',
  '  background: var(--component-sidebar-search-focus-bg);',
  '  border-color: var(--component-sidebar-search-focus-border);',
  '}',
].join('\n');

const Chevron = ({ rotated }: { rotated?: boolean }): JSX.Element => (
  <svg
    aria-hidden="true"
    className={`size-3.5 shrink-0 transition-transform ${rotated === true ? 'rotate-90' : ''}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 16 16"
  >
    <path
      d="M6 4l4 4-4 4"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

const SimpleItem = ({ label, icon }: DemoNavItem): JSX.Element => {
  const NavIcon = icon;
  return (
    <li>
      <span className="sidebar-item flex items-center gap-3 rounded-md py-2 pl-[38px] pr-3 text-sm">
        <NavIcon className="sidebar-nav-icon shrink-0" />
        <span>{label}</span>
      </span>
    </li>
  );
};

const ExpandableGroup = (): JSX.Element => {
  const [expanded, setExpanded] = useState(true);
  const toggle = useCallback(() => setExpanded((p) => !p), []);

  return (
    <li>
      <button
        className="sidebar-item flex w-full items-center gap-3 rounded-md px-3 py-2 transition-colors"
        type="button"
        onClick={toggle}
      >
        <Chevron rotated={expanded} />
        <span aria-hidden="true" className="shrink-0">
          <IconBell className="sidebar-nav-icon shrink-0" />
        </span>
        <span className="flex-1 text-left">{EXPAND_CHILDREN[0]?.replace('Management', '& Incidents')}</span>
      </button>
      <div className={`sidebar-expandable-children ${expanded ? 'expanded' : 'collapsed'}`}>
        <ul className="ml-6 mt-1 space-y-1">
          {EXPAND_CHILDREN.map((child, i) => (
            <li key={child}>
              <span
                className={`sidebar-item flex items-center gap-2 rounded-md px-3 py-1.5 text-sm ${
                  i === 0 ? 'active' : ''
                }`}
              >
                {child}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
};

const SidebarShowcase = (): JSX.Element => (
  <div className="h-full overflow-y-auto p-6" data-testid={ComponentTestIds.SIDEBAR_SHOWCASE}>
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">
          {FM('components.sidebarShowcase.title')}
        </h2>
        <p className="mt-1 text-text-secondary">
          {FM('components.sidebarShowcase.description')}
        </p>
      </div>

      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">
          {FM('components.sidebarShowcase.navigationTitle')}
        </h3>
        <p className="text-sm text-text-secondary">
          {FM('components.sidebarShowcase.navigationDescription')}
        </p>

        {/* Mini sidebar replica */}
        <div className="sidebar flex w-64 flex-col overflow-hidden rounded-lg">
          {/* Header */}
          <div className="flex h-12 items-center justify-between border-b border-border px-4">
            <div className="flex items-center gap-2">
              <CyberWatchLogo />
              <span className="text-lg font-bold text-primary-500">{BRAND_NAME}</span>
            </div>
            <span className="sidebar-item rounded p-1.5">
              <Chevron />
            </span>
          </div>

          {/* Search */}
          <div className="px-3 py-2">
            <div className="relative">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-2.5 flex items-center !text-[color:var(--component-sidebar-text-color)]"
              >
                <IconSearch />
              </span>
              <input
                className="sidebar-search-input w-full rounded-md py-1.5 pl-9 pr-3 text-sm"
                placeholder={FM('sidebar.searchNavigation')}
                type="text"
              />
            </div>
          </div>

          {/* Main nav */}
          <nav className="sidebar-main-nav flex-1 overflow-y-auto p-2">
            <ul className="space-y-0.5">
              {MAIN_ITEMS.map((item) => (
                <SimpleItem key={item.label} icon={item.icon} label={item.label} />
              ))}
              <ExpandableGroup />
            </ul>
          </nav>

          {/* Bottom items */}
          <div className="sidebar-bottom-items border-t border-border p-2">
            <ul className="space-y-0.5">
              {BOTTOM_ITEMS.map((item) => (
                <SimpleItem key={item.label} icon={item.icon} label={item.label} />
              ))}
            </ul>
          </div>
        </div>

        <CopyableCodeSnippet code={STRUCTURE_CODE} />
      </section>
    </div>
  </div>
);

export default SidebarShowcase;
