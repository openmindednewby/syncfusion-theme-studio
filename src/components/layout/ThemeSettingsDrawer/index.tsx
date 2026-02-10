import { useState, lazy, Suspense } from 'react';

import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';
import { useThemeSettingsDrawerStore } from '@/stores/useThemeSettingsDrawerStore';
import { useThemeStore } from '@/stores/useThemeStore';

import { DrawerTabs } from './DrawerTabs';
import { ImportExportSection } from './ImportExportSection';
import { ThemeStudioLoader } from './ThemeStudioLoader';

import type { TabId } from './DrawerTabs';

const LOGO_LETTER = 'T';

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
const PANEL_WIDTH_PX = 520;
const COLLAPSED_WIDTH_PX = 52;

/**
 * Collapse/Expand toggle icon with smooth rotation animation
 */
const CollapseIcon = ({ isCollapsed }: { isCollapsed: boolean }): JSX.Element => (
  <svg
    aria-hidden="true"
    className={`h-5 w-5 transition-transform duration-200 ease-out ${isCollapsed ? '' : 'rotate-180'}`}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * App logo icon - gradient theme studio icon
 */
const LogoIcon = (): JSX.Element => (
  <svg
    aria-hidden="true"
    className="h-7 w-7"
    fill="none"
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="logo-gradient" x1="0%" x2="100%" y1="0%" y2="100%">
        <stop offset="0%" stopColor="rgb(var(--color-primary-500))" />
        <stop offset="100%" stopColor="rgb(var(--color-primary-700))" />
      </linearGradient>
    </defs>
    <rect fill="url(#logo-gradient)" height="32" rx="8" width="32" />
    <text
      fill="white"
      fontFamily="system-ui, sans-serif"
      fontSize="18"
      fontWeight="700"
      textAnchor="middle"
      x="16"
      y="22"
    >
      {LOGO_LETTER}
    </text>
  </svg>
);

/**
 * Reset icon
 */
const ResetIcon = (): JSX.Element => (
  <svg
    aria-hidden="true"
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Loading fallback for lazy-loaded sections.
// ThemeStudioLoader reserves 200px min-height by default, preventing the
// shrink→expand layout jump the old fixed-padding spinner caused.
const SectionLoader = (): JSX.Element => <ThemeStudioLoader />;

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
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Header with Logo and Title */}
          <header className="theme-panel-header flex items-center gap-3 border-b border-border bg-gradient-to-r from-surface to-surface-elevated px-5 py-4">
            <LogoIcon />
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
