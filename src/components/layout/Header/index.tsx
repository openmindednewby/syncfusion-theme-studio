import { useCallback } from 'react';

import { IconCogDetailed } from '@/components/icons';
import { ThemeToggleNative, ThemeToggleSize } from '@/components/ui/native';
import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';
import { Mode } from '@/stores/mode';
import { useThemeSettingsDrawerStore } from '@/stores/useThemeSettingsDrawerStore';
import { useThemeStore } from '@/stores/useThemeStore';

export const Header = (): JSX.Element => {
  const { mode, toggleMode } = useThemeStore();
  const { open: openThemeSettings } = useThemeSettingsDrawerStore();

  const themeLabel =
    mode === Mode.Light ? FM('header.themeSwitchDark') : FM('header.themeSwitchLight');

  const handleToggle = useCallback(() => {
    toggleMode();
  }, [toggleMode]);

  return (
    <header className="header flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold text-text-primary">{FM('app.title')}</h1>

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
        <ThemeToggleNative
          checked={mode === Mode.Dark}
          label={themeLabel}
          size={ThemeToggleSize.Sm}
          testId={TestIds.THEME_TOGGLE}
          onChange={handleToggle}
        />
      </div>
    </header>
  );
};
