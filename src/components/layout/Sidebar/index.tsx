import { NavLink } from 'react-router-dom';

import { FM } from '@/localization/helpers';
import { useSidebarStore } from '@/stores/useSidebarStore';

interface NavItem {
  path: string;
  labelKey: string;
  icon: string;
}

const NAV_ITEMS: NavItem[] = [
  { path: '/', labelKey: 'menu.dashboard', icon: '🏠' },
  { path: '/pets', labelKey: 'menu.pets', icon: '🐾' },
  { path: '/components', labelKey: 'menu.components', icon: '🧩' },
  { path: '/theme-editor', labelKey: 'menu.themeEditor', icon: '🎨' },
];

export const Sidebar = (): JSX.Element => {
  const { isCollapsed, toggle } = useSidebarStore();

  const sidebarWidth = isCollapsed ? 'w-16' : 'w-sidebar';
  const toggleLabel = isCollapsed ? FM('sidebar.expand') : FM('sidebar.collapse');

  return (
    <aside
      className={`${sidebarWidth} flex flex-col border-r border-border bg-surface transition-all duration-normal`}
    >
      {/* Logo */}
      <div className="flex h-header items-center justify-between border-b border-border px-4">
        {!isCollapsed && <span className="text-lg font-bold text-primary-600">Theme Studio</span>}
        <button
          aria-label={toggleLabel}
          className="rounded p-2 hover:bg-surface-elevated"
          type="button"
          onClick={toggle}
        >
          {isCollapsed ? '→' : '←'}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          {NAV_ITEMS.map((item) => (
            <li key={item.path}>
              <NavLink
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-md px-3 py-2 transition-colors ${
                    isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-text-secondary hover:bg-surface-elevated hover:text-text-primary'
                  }`
                }
                to={item.path}
              >
                <span className="text-lg">{item.icon}</span>
                {!isCollapsed && <span>{FM(item.labelKey)}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Login link at bottom */}
      <div className="border-t border-border p-2">
        <NavLink
          className="flex items-center gap-3 rounded-md px-3 py-2 text-text-secondary hover:bg-surface-elevated hover:text-text-primary"
          to="/login"
        >
          <span className="text-lg">🔐</span>
          {!isCollapsed && <span>{FM('menu.login')}</span>}
        </NavLink>
      </div>
    </aside>
  );
}
