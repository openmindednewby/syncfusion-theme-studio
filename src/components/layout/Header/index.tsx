import { useNavigate } from 'react-router-dom';

import { IconCogDetailed } from '@/components/icons';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';
import { Mode } from '@/stores/mode';
import { useThemeSettingsDrawerStore } from '@/stores/useThemeSettingsDrawerStore';
import { useThemeStore } from '@/stores/useThemeStore';

import { HeaderBreadcrumb } from './components/HeaderBreadcrumb';
import { useHeaderBreadcrumbs } from './hooks/useHeaderBreadcrumbs';

export const Header = (): JSX.Element => {
  const { mode, toggleMode } = useThemeStore();
  const { open: openThemeSettings } = useThemeSettingsDrawerStore();
  const navigate = useNavigate();
  const breadcrumbItems = useHeaderBreadcrumbs();

  const themeLabel =
    mode === Mode.Light ? FM('header.themeSwitchDark') : FM('header.themeSwitchLight');

  return (
    <header className="header flex items-center justify-between px-6">
      <HeaderBreadcrumb items={breadcrumbItems} onNavigate={navigate} />

      <div className="flex items-center gap-2">
        {/* Theme settings cog */}
        <button
          aria-label={FM('header.themeSettings')}
          className="rounded-md p-2 text-text-secondary hover:bg-surface hover:text-text-primary"
          data-testid={TestIds.THEME_SETTINGS_BUTTON}
          type="button"
          onClick={openThemeSettings}
        >
          <IconCogDetailed />
        </button>

        {/* Theme toggle */}
        <button
          aria-label={themeLabel}
          className="rounded-md p-2 text-text-secondary hover:bg-surface"
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
      </div>
    </header>
  );
};
