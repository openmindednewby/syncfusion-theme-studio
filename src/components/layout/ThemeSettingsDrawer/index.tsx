import { useState, useEffect, lazy, Suspense } from 'react';

import { CollapseIcon, DrawerLogoIcon, ResetIcon } from '@/components/icons';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';
import { useThemeSettingsDrawerStore } from '@/stores/useThemeSettingsDrawerStore';
import { useThemeStore } from '@/stores/useThemeStore';

import { DrawerTabs } from './components/DrawerTabs';
import { ImportExportSection } from './components/ImportExportSection';
import { ThemeStudioLoader } from './components/ThemeStudioLoader';
import { TabId } from './utils/tabId';

// Loading fallback for lazy-loaded sections.
const SectionLoader = (): JSX.Element => <ThemeStudioLoader />;

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

const DEFAULT_TAB: TabId = TabId.Colors;
const PANEL_WIDTH_PX = 520;
const COLLAPSED_WIDTH_PX = 52;

interface ThemeSettingsDrawerProps {
  isMobile?: boolean;
}

/**
 * Theme Settings Panel - A premium design tool sidebar for theme customization.
 * On mobile, auto-closes and renders as a full-screen overlay when opened.
 */
export const ThemeSettingsDrawer = ({ isMobile = false }: ThemeSettingsDrawerProps): JSX.Element | null => {
  const { isOpen, toggle, close } = useThemeSettingsDrawerStore();
  const { resetTheme } = useThemeStore();
  const [activeTab, setActiveTab] = useState<TabId>(DEFAULT_TAB);

  // Auto-close theme panel when entering mobile viewport
  useEffect(() => {
    if (isMobile && isOpen) close();
  }, [isMobile]); // eslint-disable-line react-hooks/exhaustive-deps -- only trigger on breakpoint change

  const handleReset = (): void => {
    resetTheme();
  };

  const handleTabChange = (tab: TabId): void => {
    setActiveTab(tab);
  };

  const handleBackdropClick = (): void => {
    close();
  };

  const toggleLabel = isOpen ? FM('themeSettings.collapse') : FM('themeSettings.expand');

  const panelElement = (
    <aside
      aria-label={FM('themeSettings.panelLabel')}
      className={`theme-panel flex h-full flex-col border-l border-border bg-surface shadow-lg transition-all duration-300 ease-out ${isMobile && isOpen ? 'mobile-theme-panel-overlay' : ''}`}
      data-testid={TestIds.THEME_SETTINGS_DRAWER}
      style={isMobile && isOpen ? undefined : { width: isOpen ? `${PANEL_WIDTH_PX}px` : `${COLLAPSED_WIDTH_PX}px` }}
    >
      {/* Collapse/Expand Toggle */}
      <button
        aria-expanded={isOpen}
        aria-label={toggleLabel}
        className="theme-panel-toggle flex h-16 w-full items-center justify-center border-b border-border text-text-secondary transition-all duration-200 hover:bg-surface-elevated hover:text-primary-500"
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
          <div className="theme-panel-content min-h-0 flex-1 overflow-y-auto">
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

  // On mobile when open, render as overlay with backdrop
  if (isMobile && isOpen)
    return (
      <div className="mobile-panel-container" role="dialog">
        <button
          aria-label={FM('themeSettings.closeOverlay')}
          className="mobile-panel-backdrop"
          data-testid={TestIds.THEME_BACKDROP}
          tabIndex={-1}
          type="button"
          onClick={handleBackdropClick}
        />
        {panelElement}
      </div>
    );

  // On mobile when closed, hide entirely from the grid
  if (isMobile && !isOpen) return null;

  return panelElement;
};
