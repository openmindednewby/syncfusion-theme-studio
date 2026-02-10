import { NavLink } from 'react-router-dom';

import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';
import { useSidebarStore } from '@/stores/useSidebarStore';
import { useThemeSettingsDrawerStore } from '@/stores/useThemeSettingsDrawerStore';

import { NavExpandableItem } from './NavExpandableItem';

const ICON_PALETTE = '\uD83C\uDFA8';
const ICON_LOCK = '\uD83D\uDD10';

interface NavItem {
  path: string;
  labelKey: string;
  icon: string;
  testId: string;
}

const NAV_ITEMS: NavItem[] = [
  { path: '/dashboard', labelKey: 'menu.dashboard', icon: '🏠', testId: TestIds.NAV_HOME },
  { path: '/dashboard/products', labelKey: 'menu.products', icon: '📦', testId: TestIds.NAV_PRODUCTS },
];

const COMPONENTS_CHILDREN = [
  { path: '/dashboard/components/native', labelKey: 'menu.componentsNative', testId: TestIds.NAV_COMPONENTS_NATIVE },
  { path: '/dashboard/components/syncfusion', labelKey: 'menu.componentsSyncfusion', testId: TestIds.NAV_COMPONENTS_SYNCFUSION },
];

const FORMS_CHILDREN = [
  { path: '/dashboard/forms/syncfusion', labelKey: 'menu.formsSyncfusion', testId: TestIds.NAV_FORMS_SYNCFUSION },
  { path: '/dashboard/forms/native', labelKey: 'menu.formsNative', testId: TestIds.NAV_FORMS_NATIVE },
];

export const Sidebar = (): JSX.Element => {
  const { isCollapsed, toggle } = useSidebarStore();
  const { open: openThemeSettings } = useThemeSettingsDrawerStore();

  const collapsedClass = isCollapsed ? 'collapsed' : '';
  const toggleLabel = isCollapsed ? FM('sidebar.expand') : FM('sidebar.collapse');

  return (
    <aside
      className={`sidebar ${collapsedClass} flex flex-col transition-all duration-normal`}
      data-collapsed={isCollapsed ? 'true' : 'false'}
      data-testid={TestIds.SIDEBAR}
    >
      {/* Logo */}
      <div className="flex h-header items-center justify-between border-b border-border px-4">
        {!isCollapsed && <span className="text-lg font-bold text-primary-600">{FM('app.title')}</span>}
        <button
          aria-label={toggleLabel}
          className="sidebar-item rounded p-2"
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
                  `sidebar-item flex items-center gap-3 rounded-md px-3 py-2 transition-colors ${
                    isActive ? 'active' : ''
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

          {/* Components - expandable sub-menu */}
          <NavExpandableItem
            expandTestId={TestIds.NAV_COMPONENTS_EXPAND}
            icon="🧩"
            isCollapsed={isCollapsed}
            labelKey="menu.components"
            pathPrefix="/dashboard/components"
          >
            {COMPONENTS_CHILDREN}
          </NavExpandableItem>

          {/* Forms - expandable sub-menu */}
          <NavExpandableItem
            expandTestId={TestIds.NAV_FORMS_EXPAND}
            icon="📝"
            isCollapsed={isCollapsed}
            labelKey="menu.forms"
            pathPrefix="/dashboard/forms"
          >
            {FORMS_CHILDREN}
          </NavExpandableItem>

          {/* Theme Editor - opens drawer */}
          <li>
            <button
              aria-label={FM('menu.themeEditorLabel')}
              className="sidebar-item flex w-full items-center gap-3 rounded-md px-3 py-2 transition-colors"
              data-testid={TestIds.NAV_THEME_EDITOR}
              type="button"
              onClick={openThemeSettings}
            >
              <span aria-hidden="true" className="text-lg">{ICON_PALETTE}</span>
              {!isCollapsed && <span>{FM('menu.themeEditor')}</span>}
            </button>
          </li>
        </ul>
      </nav>

      {/* Login link at bottom */}
      <div className="border-t border-border p-2">
        <NavLink
          aria-label={FM('menu.loginLabel')}
          className="sidebar-item flex items-center gap-3 rounded-md px-3 py-2"
          data-testid={TestIds.NAV_LOGIN}
          to="/"
        >
          <span aria-hidden="true" className="text-lg">{ICON_LOCK}</span>
          {!isCollapsed && <span>{FM('menu.login')}</span>}
        </NavLink>
      </div>
    </aside>
  );
};
