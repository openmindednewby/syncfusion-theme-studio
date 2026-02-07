import { useEffect, useCallback, useRef } from 'react';

import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';
import { useThemeSettingsDrawerStore } from '@/stores/useThemeSettingsDrawerStore';
import { useThemeStore } from '@/stores/useThemeStore';

import { ColorsSection } from './ColorsSection';
import { ImportExportSection } from './ImportExportSection';

const ESCAPE_KEY = 'Escape';
const BACKDROP_OPACITY = 'rgba(0, 0, 0, 0.5)';

const CloseIcon = (): JSX.Element => (
  <svg
    aria-hidden="true"
    className="h-5 w-5"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ThemeSettingsDrawer = (): JSX.Element | null => {
  const { isOpen, close } = useThemeSettingsDrawerStore();
  const { resetTheme } = useThemeStore();
  const drawerRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === ESCAPE_KEY) close();
    },
    [close]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      drawerRef.current?.focus();
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  const handleBackdropClick = (): void => {
    close();
  };

  const handleReset = (): void => {
    resetTheme();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-40 transition-opacity duration-normal"
        style={{ backgroundColor: BACKDROP_OPACITY }}
        onClick={handleBackdropClick}
      />

      {/* Drawer */}
      <aside
        ref={drawerRef}
        aria-label={FM('themeSettings.drawerLabel')}
        aria-modal="true"
        className="fixed right-0 top-0 z-50 flex h-full w-80 flex-col bg-surface shadow-lg transition-transform duration-normal"
        data-testid={TestIds.THEME_SETTINGS_DRAWER}
        role="dialog"
        tabIndex={-1}
      >
        {/* Header */}
        <header className="flex items-center justify-between border-b border-border px-4 py-3">
          <h3 className="text-lg font-semibold text-text-primary">{FM('themeSettings.title')}</h3>
          <button
            aria-label={FM('themeSettings.closeDrawer')}
            className="rounded p-1 text-text-secondary hover:bg-surface-elevated hover:text-text-primary"
            type="button"
            onClick={close}
          >
            <CloseIcon />
          </button>
        </header>

        {/* Content */}
        <div className="flex-1 space-y-6 overflow-y-auto p-4">
          <ColorsSection />
          <ImportExportSection />

          {/* Reset Button */}
          <section className="pt-4">
            <button
              aria-label={FM('themeSettings.resetToDefault')}
              className="btn btn-secondary w-full text-xs"
              data-testid={TestIds.THEME_RESET_BTN}
              type="button"
              onClick={handleReset}
            >
              {FM('themeSettings.resetToDefault')}
            </button>
          </section>
        </div>
      </aside>
    </>
  );
};
