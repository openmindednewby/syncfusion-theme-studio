import { memo, useState, useCallback } from 'react';
import type { CSSProperties } from 'react';

import { ComponentTestIds } from '@/shared/testIds.components';
import { isValueDefined, isNotEmptyString } from '@/utils';

interface NavMenuItem {
  text: string;
  icon?: string;
  active?: boolean;
  children?: NavMenuItem[];
}

interface NavMenuProps {
  items: NavMenuItem[];
  testId?: string;
}

const CONTAINER_STYLE: CSSProperties = {
  background: 'var(--component-menu-bg)',
  color: 'var(--component-menu-text)',
  borderRight: '1px solid var(--component-menu-border)',
  width: '260px',
  minHeight: '400px',
  borderRadius: '8px',
  overflow: 'hidden',
  fontFamily: 'inherit',
};

const ITEM_BASE_STYLE: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '8px 12px',
  borderRadius: '6px',
  margin: '2px 8px',
  cursor: 'pointer',
  transition: 'background-color 150ms, color 150ms',
  fontSize: '14px',
  lineHeight: '20px',
  border: 'none',
  width: 'calc(100% - 16px)',
  textAlign: 'left',
  background: 'transparent',
  color: 'inherit',
};

/** Active menu item text defaults to white for contrast against the themed active background. */
const ACTIVE_TEXT_COLOR = 'rgb(255, 255, 255)';

const ACTIVE_ITEM_STYLE: CSSProperties = {
  ...ITEM_BASE_STYLE,
  background: 'var(--component-menu-active-bg)',
  color: ACTIVE_TEXT_COLOR,
};

const ICON_STYLE: CSSProperties = {
  width: '16px',
  height: '16px',
  color: 'var(--component-menu-icon)',
  flexShrink: 0,
};

const NavMenuItemRow = memo(({ item }: { item: NavMenuItem }): JSX.Element => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  const style: CSSProperties = item.active === true
    ? ACTIVE_ITEM_STYLE
    : {
      ...ITEM_BASE_STYLE,
      ...(isHovered ? { background: 'var(--component-menu-hover-bg)', color: 'var(--component-menu-hover-text)' } : {}),
    };

  return (
    <li role="none">
      <button
        role="menuitem"
        style={style}
        type="button"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {isNotEmptyString(item.icon) ? <span style={ICON_STYLE}>{item.icon}</span> : null}
        <span>{item.text}</span>
        {isValueDefined(item.children) ? <span style={{ marginLeft: 'auto', opacity: 0.5 }}>{'>'}</span> : null}
      </button>
    </li>
  );
});

NavMenuItemRow.displayName = 'NavMenuItemRow';

const NavMenu = memo(({ items, testId }: NavMenuProps): JSX.Element => (
  <nav
    aria-label="Navigation menu"
    data-testid={testId ?? ComponentTestIds.NAV_MENU_SHOWCASE}
    style={CONTAINER_STYLE}
  >
    <div role="menu" style={{ listStyle: 'none', margin: 0, padding: '8px 0' }}>
      {items.map((item) => (
        <NavMenuItemRow key={item.text} item={item} />
      ))}
    </div>
  </nav>
));

NavMenu.displayName = 'NavMenu';

export { NavMenu };
export type { NavMenuProps, NavMenuItem };
