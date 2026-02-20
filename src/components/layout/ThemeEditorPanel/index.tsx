import { useState, lazy, Suspense } from 'react';

import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';
import { useThemeStore } from '@/stores/useThemeStore';

import { DrawerTabs } from '../ThemeSettingsDrawer/components/DrawerTabs';
import { ImportExportSection } from '../ThemeSettingsDrawer/components/ImportExportSection';
import { TabId } from '../ThemeSettingsDrawer/utils/tabId';

// Lazy load heavy tab sections for better initial load performance
const ColorsSection = lazy(async () => ({
  default: (await import('../ThemeSettingsDrawer/components/ColorsSection')).ColorsSection,
}));
const TypographySection = lazy(async () => ({
  default: (await import('../ThemeSettingsDrawer/sections/TypographySection')).TypographySection,
}));
const LayoutSection = lazy(async () => ({
  default: (await import('../ThemeSettingsDrawer/sections/LayoutSection')).LayoutSection,
}));
const LightThemeSection = lazy(async () => ({
  default: (await import('../ThemeSettingsDrawer/sections/LightThemeSection')).LightThemeSection,
}));
const DarkThemeSection = lazy(async () => ({
  default: (await import('../ThemeSettingsDrawer/sections/DarkThemeSection')).DarkThemeSection,
}));
const ComponentsSection = lazy(async () => ({
  default: (await import('../ThemeSettingsDrawer/sections/ComponentsSection')).ComponentsSection,
}));
const PresetsSection = lazy(async () => ({
  default: (await import('../ThemeSettingsDrawer/sections/PresetsSection')).PresetsSection,
}));

const DEFAULT_TAB: TabId = TabId.Colors;

// Loading fallback for lazy-loaded sections
const SectionLoader = (): JSX.Element => (
  <div className="flex items-center justify-center py-8">
    <div className="h-6 w-6 animate-spin rounded-full border-2 border-border border-t-primary-500" />
  </div>
);

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

export const ThemeEditorPanel = (): JSX.Element => {
  const { resetTheme } = useThemeStore();
  const [activeTab, setActiveTab] = useState<TabId>(DEFAULT_TAB);

  const handleReset = (): void => {
    resetTheme();
  };

  const handleTabChange = (tab: TabId): void => {
    setActiveTab(tab);
  };

  return (
    <div
      className="flex h-full flex-col bg-surface"
      data-testid={TestIds.THEME_EDITOR_PANEL}
    >
      {/* Header */}
      <header className="flex items-center justify-between border-b border-border px-4 py-3">
        <h2 className="text-lg font-semibold text-text-primary">{FM('themeSettings.title')}</h2>
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
    </div>
  );
};
