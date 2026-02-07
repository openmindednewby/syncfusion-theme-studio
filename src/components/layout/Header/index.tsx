import { useThemeStore } from '@/stores/useThemeStore';

export function Header(): JSX.Element {
  const { mode, toggleMode } = useThemeStore();

  return (
    <header className="flex h-header items-center justify-between border-b border-border bg-surface-elevated px-6">
      <h1 className="text-lg font-semibold text-text-primary">Syncfusion Theme Studio</h1>

      <div className="flex items-center gap-4">
        {/* Theme toggle */}
        <button
          type="button"
          onClick={toggleMode}
          className="rounded-md p-2 hover:bg-surface"
          aria-label={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
        >
          {mode === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  );
}
