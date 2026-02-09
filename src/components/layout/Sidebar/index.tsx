import { useState, useCallback } from 'react';

import { NavLink, useLocation } from 'react-router-dom';

import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';
import { useSidebarStore } from '@/stores/useSidebarStore';
import { useThemeSettingsDrawerStore } from '@/stores/useThemeSettingsDrawerStore';

interface NavItem {
  path: string;
  labelKey: string;
  icon: string;
  testId: string;
}

interface SubNavItem {
  path: string;
  labelKey: string;
  testId: string;
}

interface NavItemWithChildren {
  labelKey: string;
  icon: string;
  testId: string;
  expandTestId: string;
  children: SubNavItem[];
}

const NAV_ITEMS: NavItem[] = [
  { path: '/dashboard', labelKey: 'menu.dashboard', icon: '🏠', testId: TestIds.NAV_HOME },
  { path: '/dashboard/products', labelKey: 'menu.products', icon: '📦', testId: TestIds.NAV_PRODUCTS },
];

const COMPONENTS_NAV: NavItemWithChildren = {
  labelKey: 'menu.components',
  icon: '🧩',
  testId: TestIds.NAV_COMPONENTS,
  expandTestId: TestIds.NAV_COMPONENTS_EXPAND,
  children: [
    { path: '/dashboard/components/native', labelKey: 'menu.componentsNative', testId: TestIds.NAV_COMPONENTS_NATIVE },
    { path: '/dashboard/components/syncfusion', labelKey: 'menu.componentsSyncfusion', testId: TestIds.NAV_COMPONENTS_SYNCFUSION },
  ],
};

export const Sidebar = (): JSX.Element => {
  const { isCollapsed, toggle } = useSidebarStore();
  const { open: openThemeSettings } = useThemeSettingsDrawerStore();
  const location = useLocation();

  // Check if we're on a components sub-page
  const isComponentsActive = location.pathname.startsWith('/dashboard/components');
  const [isComponentsExpanded, setIsComponentsExpanded] = useState(isComponentsActive);

  const collapsedClass = isCollapsed ? 'collapsed' : '';
  const toggleLabel = isCollapsed ? FM('sidebar.expand') : FM('sidebar.collapse');

  const handleComponentsToggle = useCallback(() => {
    setIsComponentsExpanded((prev) => !prev);
  }, []);

  const expandLabel = isComponentsExpanded
    ? FM('accessibility.collapseSection', 'Components')
    : FM('accessibility.expandSection', 'Components');

  return (
    <aside
      className={`sidebar ${collapsedClass} flex flex-col transition-all duration-normal`}
      data-collapsed={isCollapsed ? 'true' : 'false'}
      data-testid={TestIds.SIDEBAR}
    >
      {/* Logo */}
      <div className="flex h-header items-center justify-between border-b border-border px-4">
        {!isCollapsed && <span className="text-lg font-bold text-primary-600">Theme Studio</span>}
        <button
          aria-label={toggleLabel}
          className="rounded p-2 hover:bg-surface-elevated"
          data-testid={TestIds.SIDEBAR_TOGGLE}
          type="button"
          onClick={toggle}
        >
          <span aria-hidden="true">{isCollapsed ? '→' : '←'}</span>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          {NAV_ITEMS.map((item) => (
            <li key={item.path}>
              <NavLink
                aria-label={FM(item.labelKey)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-md px-3 py-2 transition-colors ${
                    isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-text-secondary hover:bg-surface-elevated hover:text-text-primary'
                  }`
                }
                data-testid={item.testId}
                to={item.path}
              >
                <span aria-hidden="true" className="text-lg">{item.icon}</span>
                {!isCollapsed && <span>{FM(item.labelKey)}</span>}
              </NavLink>
            </li>
          ))}

          {/* Components with expandable sub-menu */}
          <li>
            <button
              aria-expanded={isComponentsExpanded}
              aria-label={expandLabel}
              className={`flex w-full items-center gap-3 rounded-md px-3 py-2 transition-colors ${
                isComponentsActive
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-text-secondary hover:bg-surface-elevated hover:text-text-primary'
              }`}
              data-testid={COMPONENTS_NAV.expandTestId}
              type="button"
              onClick={handleComponentsToggle}
            >
              <span aria-hidden="true" className="text-lg">{COMPONENTS_NAV.icon}</span>
              {!isCollapsed && (
                <>
                  <span className="flex-1 text-left">{FM(COMPONENTS_NAV.labelKey)}</span>
                  <span
                    aria-hidden="true"
                    className={`text-xs transition-transform ${isComponentsExpanded ? 'rotate-180' : ''}`}
                  >
                    ▼
                  </span>
                </>
              )}
            </button>

            {/* Sub-menu items */}
            {isComponentsExpanded && !isCollapsed ? <ul className="ml-6 mt-1 space-y-1">
                {COMPONENTS_NAV.children.map((child) => (
                  <li key={child.path}>
                    <NavLink
                      aria-label={FM(child.labelKey)}
                      className={({ isActive }) =>
                        `flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors ${
                          isActive
                            ? 'bg-primary-50 text-primary-700'
                            : 'text-text-secondary hover:bg-surface-elevated hover:text-text-primary'
                        }`
                      }
                      data-testid={child.testId}
                      to={child.path}
                    >
                      <span aria-hidden="true" className="text-xs">•</span>
                      <span>{FM(child.labelKey)}</span>
                    </NavLink>
                  </li>
                ))}
              </ul> : null}
          </li>

          {/* Theme Editor - opens drawer */}
          <li>
            <button
              aria-label={FM('menu.themeEditorLabel')}
              className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-text-secondary transition-colors hover:bg-surface-elevated hover:text-text-primary"
              data-testid={TestIds.NAV_THEME_EDITOR}
              type="button"
              onClick={openThemeSettings}
            >
              <span aria-hidden="true" className="text-lg">🎨</span>
              {!isCollapsed && <span>{FM('menu.themeEditor')}</span>}
            </button>
          </li>
        </ul>
      </nav>

      {/* Login link at bottom */}
      <div className="border-t border-border p-2">
        <NavLink
          aria-label={FM('menu.loginLabel')}
          className="flex items-center gap-3 rounded-md px-3 py-2 text-text-secondary hover:bg-surface-elevated hover:text-text-primary"
          data-testid={TestIds.NAV_LOGIN}
          to="/"
        >
          <span aria-hidden="true" className="text-lg">🔐</span>
          {!isCollapsed && <span>{FM('menu.login')}</span>}
        </NavLink>
      </div>
    </aside>
  );
};
