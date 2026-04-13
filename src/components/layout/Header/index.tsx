import { useCallback } from 'react';

import { useNavigate } from 'react-router-dom';

import { IconCogDetailed, IconMenu } from '@/components/icons';
import { BreadcrumbNative } from '@/components/ui/native';
import type { BreadcrumbItem } from '@/components/ui/native';
import { useIsMobile } from '@/hooks/useIsMobile';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';
import { Mode } from '@/stores/mode';
import { useSidebarStore } from '@/stores/useSidebarStore';
import { useThemeSettingsDrawerStore } from '@/stores/useThemeSettingsDrawerStore';
import { useThemeStore } from '@/stores/useThemeStore';
import { isValueDefined } from '@/utils';

import { HeaderUserMenu } from './components/HeaderUserMenu';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { useAutoCollapse } from './hooks/useAutoCollapse';
import { useHeaderBreadcrumbs } from './hooks/useHeaderBreadcrumbs';

export const Header = (): JSX.Element => {
  const { mode, toggleMode } = useThemeStore();
  const { open: openThemeSettings } = useThemeSettingsDrawerStore();
  const { setCollapsed } = useSidebarStore();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const breadcrumbItems = useHeaderBreadcrumbs();
  const { containerRef, maxItems, isHidden } = useAutoCollapse(breadcrumbItems.length);

  const handleItemClick = useCallback((item: BreadcrumbItem) => {
    if (isValueDefined(item.url))
      Promise.resolve(navigate(item.url)).catch(() => undefined);
  }, [navigate]);

  const handleOpenSidebar = (): void => {
    setCollapsed(false);
  };

  const themeLabel =
    mode === Mode.Light ? FM('header.themeSwitchDark') : FM('header.themeSwitchLight');

  return (
    <header className="header flex items-center justify-between px-6">
      <div className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden">
        {/* Mobile hamburger menu button */}
        {isMobile ? (
          <button
            aria-label={FM('header.openSidebar')}
            className="flex shrink-0 items-center justify-center rounded-md p-2 text-text-secondary hover:bg-surface hover:text-text-primary"
            data-testid={TestIds.MOBILE_MENU_BUTTON}
            type="button"
            onClick={handleOpenSidebar}
          >
            <IconMenu className="h-5 w-5" />
          </button>
        ) : null}

        <div ref={containerRef} className="min-w-0 flex-1 overflow-hidden">
          {isHidden ? null : (
            <BreadcrumbNative
              ariaLabel={FM('header.breadcrumb')}
              items={breadcrumbItems}
              maxItems={maxItems}
              testId={TestIds.HEADER_BREADCRUMB_NAV}
              onItemClick={handleItemClick}
            />
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Theme settings cog */}
        <button
          aria-label={FM('header.themeSettings')}
          className="flex items-center justify-center rounded-md p-2 text-text-secondary hover:bg-surface hover:text-text-primary"
          data-testid={TestIds.THEME_SETTINGS_BUTTON}
          type="button"
          onClick={openThemeSettings}
        >
          <IconCogDetailed />
        </button>

        {/* Theme toggle */}
        <button
          aria-label={themeLabel}
          className="flex items-center justify-center rounded-md p-2 text-text-secondary hover:bg-surface"
          data-testid={TestIds.THEME_TOGGLE}
          type="button"
          onClick={toggleMode}
        >
          {mode === Mode.Light ? (
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          ) : (
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          )}
        </button>

        {/* Language switcher */}
        <LanguageSwitcher />

        {/* User menu with logout */}
        <HeaderUserMenu />
      </div>
    </header>
  );
};
