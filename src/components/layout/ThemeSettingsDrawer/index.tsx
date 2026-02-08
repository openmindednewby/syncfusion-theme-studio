import { useEffect, useCallback, useRef, useState, lazy, Suspense } from 'react';

import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';
import { useThemeSettingsDrawerStore } from '@/stores/useThemeSettingsDrawerStore';
import { useThemeStore } from '@/stores/useThemeStore';

import { DrawerTabs } from './DrawerTabs';
import { ImportExportSection } from './ImportExportSection';

import type { TabId } from './DrawerTabs';

// Lazy load heavy tab sections for better initial load performance
const ColorsSection = lazy(async () => ({
  default: (await import('./ColorsSection')).ColorsSection,
}));
const TypographySection = lazy(async () => ({
  default: (await import('./sections/TypographySection')).TypographySection,
}));
const LayoutSection = lazy(async () => ({
  default: (await import('./sections/LayoutSection')).LayoutSection,
}));
const LightThemeSection = lazy(async () => ({
  default: (await import('./sections/LightThemeSection')).LightThemeSection,
}));
const DarkThemeSection = lazy(async () => ({
  default: (await import('./sections/DarkThemeSection')).DarkThemeSection,
}));
const ComponentsSection = lazy(async () => ({
  default: (await import('./sections/ComponentsSection')).ComponentsSection,
}));
const PresetsSection = lazy(async () => ({
  default: (await import('./sections/PresetsSection')).PresetsSection,
}));

const ESCAPE_KEY = 'Escape';
const BACKDROP_OPACITY = 'rgba(0, 0, 0, 0.5)';
const DEFAULT_TAB: TabId = 'colors';

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

// Loading fallback for lazy-loaded sections
const SectionLoader = (): JSX.Element => (
  <div className="flex items-center justify-center py-8">
    <div className="h-6 w-6 animate-spin rounded-full border-2 border-border border-t-primary-500" />
  </div>
);

const renderTabContent = (activeTab: TabId): JSX.Element | null => {
  const content = (() => {
    switch (activeTab) {
      case 'colors':
        return <ColorsSection />;
      case 'typography':
        return <TypographySection />;
      case 'layout':
        return <LayoutSection />;
      case 'lightTheme':
        return <LightThemeSection />;
      case 'darkTheme':
        return <DarkThemeSection />;
      case 'components':
        return <ComponentsSection />;
      case 'presets':
        return <PresetsSection />;
      default:
        return null;
    }
  })();

  if (!content) return null;

  return <Suspense fallback={<SectionLoader />}>{content}</Suspense>;
};

export const ThemeSettingsDrawer = (): JSX.Element | null => {
  const { isOpen, close } = useThemeSettingsDrawerStore();
  const { resetTheme } = useThemeStore();
  const drawerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<TabId>(DEFAULT_TAB);

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

  const handleTabChange = (tab: TabId): void => {
    setActiveTab(tab);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-40 transition-opacity duration-normal"
        data-testid={TestIds.THEME_BACKDROP}
        style={{ backgroundColor: BACKDROP_OPACITY }}
        onClick={handleBackdropClick}
      />

      {/* Drawer */}
      <aside
        ref={drawerRef}
        aria-label={FM('themeSettings.drawerLabel')}
        aria-modal="true"
        className="fixed right-0 top-0 z-50 flex h-full w-[420px] flex-col bg-surface shadow-lg transition-transform duration-normal"
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
            data-testid={TestIds.THEME_CLOSE_BTN}
            type="button"
            onClick={close}
          >
            <CloseIcon />
          </button>
        </header>

        {/* Tabs */}
        <DrawerTabs activeTab={activeTab} onTabChange={handleTabChange} />

        {/* Content */}
        <div className="flex-1 space-y-6 overflow-y-auto p-4">
          {renderTabContent(activeTab)}

          {/* Import/Export in all tabs for convenience */}
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
