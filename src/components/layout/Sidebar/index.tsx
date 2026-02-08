import { NavLink } from 'react-router-dom';

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

const NAV_ITEMS: NavItem[] = [
  { path: '/dashboard', labelKey: 'menu.dashboard', icon: '🏠', testId: TestIds.NAV_HOME },
  { path: '/dashboard/products', labelKey: 'menu.products', icon: '📦', testId: TestIds.NAV_PRODUCTS },
  { path: '/dashboard/components', labelKey: 'menu.components', icon: '🧩', testId: TestIds.NAV_COMPONENTS },
];

export const Sidebar = (): JSX.Element => {
  const { isCollapsed, toggle } = useSidebarStore();
  const { open: openThemeSettings } = useThemeSettingsDrawerStore();

  const sidebarWidth = isCollapsed ? 'w-16' : 'w-sidebar';
  const toggleLabel = isCollapsed ? FM('sidebar.expand') : FM('sidebar.collapse');

  return (
    <aside
      className={`${sidebarWidth} sidebar flex flex-col transition-all duration-normal`}
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
