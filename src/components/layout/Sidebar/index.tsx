import { NavLink } from 'react-router-dom';
import { useSidebarStore } from '@/stores/useSidebarStore';

interface NavItem {
  path: string;
  label: string;
  icon: string;
}

const NAV_ITEMS: NavItem[] = [
  { path: '/', label: 'Dashboard', icon: '🏠' },
  { path: '/pets', label: 'Pets', icon: '🐾' },
  { path: '/components', label: 'Components', icon: '🧩' },
  { path: '/theme-editor', label: 'Theme Editor', icon: '🎨' },
];

export function Sidebar(): JSX.Element {
  const { isCollapsed, toggle } = useSidebarStore();

  const sidebarWidth = isCollapsed ? 'w-16' : 'w-sidebar';

  return (
    <aside
      className={`${sidebarWidth} flex flex-col border-r border-border bg-surface transition-all duration-normal`}
    >
      {/* Logo */}
      <div className="flex h-header items-center justify-between border-b border-border px-4">
        {!isCollapsed && <span className="text-lg font-bold text-primary-600">Theme Studio</span>}
        <button
          type="button"
          onClick={toggle}
          className="rounded p-2 hover:bg-surface-elevated"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
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
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-md px-3 py-2 transition-colors ${
                    isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-text-secondary hover:bg-surface-elevated hover:text-text-primary'
                  }`
                }
              >
                <span className="text-lg">{item.icon}</span>
                {!isCollapsed && <span>{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Login link at bottom */}
      <div className="border-t border-border p-2">
        <NavLink
          to="/login"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-text-secondary hover:bg-surface-elevated hover:text-text-primary"
        >
          <span className="text-lg">🔐</span>
          {!isCollapsed && <span>Login</span>}
        </NavLink>
      </div>
    </aside>
  );
}
