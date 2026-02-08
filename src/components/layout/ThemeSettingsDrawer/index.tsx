import { useState, lazy, Suspense } from 'react';

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

const DEFAULT_TAB: TabId = 'colors';
const PANEL_WIDTH_PX = 420;

/**
 * Collapse/Expand toggle icon - points right when collapsed, left when expanded
 */
const CollapseIcon = ({ isCollapsed }: { isCollapsed: boolean }): JSX.Element => (
  <svg
    aria-hidden="true"
    className={`h-5 w-5 transition-transform duration-normal ${isCollapsed ? '' : 'rotate-180'}`}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
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

/**
 * Theme Settings Panel - A fixed right sidebar for theme customization.
 * Replaces the previous modal-like drawer with a persistent panel that's
 * part of the layout grid. Panel state (expanded/collapsed) persists
 * across page reloads via Zustand persist middleware.
 */
export const ThemeSettingsDrawer = (): JSX.Element => {
  const { isOpen, toggle } = useThemeSettingsDrawerStore();
  const { resetTheme } = useThemeStore();
  const [activeTab, setActiveTab] = useState<TabId>(DEFAULT_TAB);

  const handleReset = (): void => {
    resetTheme();
  };

  const handleTabChange = (tab: TabId): void => {
    setActiveTab(tab);
  };

  const toggleLabel = isOpen ? FM('themeSettings.collapse') : FM('themeSettings.expand');

  return (
    <aside
      aria-label={FM('themeSettings.panelLabel')}
      className="flex h-full flex-col border-l border-border bg-surface transition-all duration-normal"
      data-testid={TestIds.THEME_SETTINGS_DRAWER}
      style={{ width: isOpen ? `${PANEL_WIDTH_PX}px` : '48px' }}
    >
      {/* Collapse/Expand Toggle */}
      <button
        aria-expanded={isOpen}
        aria-label={toggleLabel}
        className="flex h-12 w-full items-center justify-center border-b border-border text-text-secondary hover:bg-surface-elevated hover:text-text-primary"
        data-testid={TestIds.THEME_CLOSE_BTN}
        type="button"
        onClick={toggle}
      >
        <CollapseIcon isCollapsed={!isOpen} />
      </button>

      {isOpen ? <>
          {/* Header */}
          <header className="flex items-center justify-between border-b border-border px-4 py-3">
            <h3 className="text-lg font-semibold text-text-primary">{FM('themeSettings.title')}</h3>
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
        </> : null}
    </aside>
  );
};
