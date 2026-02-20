import { useState, lazy, Suspense } from 'react';

import { CollapseIcon, DrawerLogoIcon, ResetIcon } from '@/components/icons';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';
import { useThemeSettingsDrawerStore } from '@/stores/useThemeSettingsDrawerStore';
import { useThemeStore } from '@/stores/useThemeStore';

import { DrawerTabs } from './components/DrawerTabs';
import { ImportExportSection } from './components/ImportExportSection';
import { ThemeStudioLoader } from './components/ThemeStudioLoader';
import { TabId } from './utils/tabId';

// Lazy load heavy tab sections for better initial load performance
const ColorsSection = lazy(async () => ({
  default: (await import('./components/ColorsSection')).ColorsSection,
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

const DEFAULT_TAB: TabId = TabId.Colors;
const PANEL_WIDTH_PX = 520;
const COLLAPSED_WIDTH_PX = 52;

// Loading fallback for lazy-loaded sections.
// ThemeStudioLoader reserves 200px min-height by default, preventing the
// shrink→expand layout jump the old fixed-padding spinner caused.
const SectionLoader = (): JSX.Element => <ThemeStudioLoader />;

const renderTabContent = (activeTab: TabId): JSX.Element | null => {
  const content = (() => {
    switch (activeTab) {
      case TabId.Colors:
        return <ColorsSection />;
      case TabId.Typography:
        return <TypographySection />;
      case TabId.Layout:
        return <LayoutSection />;
      case TabId.LightTheme:
        return <LightThemeSection />;
      case TabId.DarkTheme:
        return <DarkThemeSection />;
      case TabId.Components:
        return <ComponentsSection />;
      case TabId.Presets:
        return <PresetsSection />;
      default:
        return null;
    }
  })();

  if (!content) return null;

  return <Suspense fallback={<SectionLoader />}>{content}</Suspense>;
};

/**
 * Theme Settings Panel - A premium design tool sidebar for theme customization.
 * Features a modern Figma-inspired design with smooth animations and professional UX.
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
      className="theme-panel flex h-full flex-col border-l border-border bg-surface shadow-lg transition-all duration-300 ease-out"
      data-testid={TestIds.THEME_SETTINGS_DRAWER}
      style={{ width: isOpen ? `${PANEL_WIDTH_PX}px` : `${COLLAPSED_WIDTH_PX}px` }}
    >
      {/* Collapse/Expand Toggle */}
      <button
        aria-expanded={isOpen}
        aria-label={toggleLabel}
        className="theme-panel-toggle flex h-12 w-full items-center justify-center border-b border-border text-text-secondary transition-all duration-200 hover:bg-surface-elevated hover:text-primary-500"
        data-testid={TestIds.THEME_CLOSE_BTN}
        type="button"
        onClick={toggle}
      >
        <CollapseIcon isCollapsed={!isOpen} />
      </button>

      {isOpen ? (
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          {/* Header with Logo and Title */}
          <header className="theme-panel-header flex items-center gap-3 border-b border-border bg-gradient-to-r from-surface to-surface-elevated px-5 py-4">
            <DrawerLogoIcon />
            <div className="flex flex-col">
              <h2 className="text-base font-bold tracking-tight text-text-primary">
                {FM('themeSettings.title')}
              </h2>
              <span className="text-xs text-text-muted">{FM('themeSettings.subtitle')}</span>
            </div>
          </header>

          {/* Tabs */}
          <DrawerTabs activeTab={activeTab} onTabChange={handleTabChange} />

          {/* Content */}
          <div className="theme-panel-content flex-1 overflow-y-auto">
            <div className="space-y-6 p-5">
              {renderTabContent(activeTab)}

              {/* Import/Export Section */}
              <div className="theme-section">
                <ImportExportSection />
              </div>

              {/* Reset Button */}
              <div className="pt-2">
                <button
                  aria-label={FM('themeSettings.resetToDefault')}
                  className="theme-reset-btn flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-surface-elevated px-4 py-2.5 text-sm font-medium text-text-secondary transition-all duration-200 hover:border-error-500 hover:bg-error-50 hover:text-error-600"
                  data-testid={TestIds.THEME_RESET_BTN}
                  type="button"
                  onClick={handleReset}
                >
                  <ResetIcon />
                  {FM('themeSettings.resetToDefault')}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </aside>
  );
};
