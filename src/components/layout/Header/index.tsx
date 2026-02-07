import { FM } from '@/localization/helpers';
import { useThemeStore } from '@/stores/useThemeStore';

export const Header = (): JSX.Element => {
  const { mode, toggleMode } = useThemeStore();

  const themeLabel =
    mode === 'light' ? FM('header.themeSwitchDark') : FM('header.themeSwitchLight');

  return (
    <header className="flex h-header items-center justify-between border-b border-border bg-surface-elevated px-6">
      <h1 className="text-lg font-semibold text-text-primary">{FM('app.title')}</h1>

      <div className="flex items-center gap-4">
        {/* Theme toggle */}
        <button
          aria-label={themeLabel}
          className="rounded-md p-2 hover:bg-surface"
          type="button"
          onClick={toggleMode}
        >
          {mode === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  );
}
