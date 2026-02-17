import {
  SettingsPaletteIcon,
  TextIcon,
  GridIcon,
  DrawerSunIcon,
  DrawerMoonIcon,
  PuzzleIcon,
  SwatchesIcon,
} from '@/components/icons';
import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';

import { TabId } from './tabId';

const TAB_TEST_ID_MAP: Record<TabId, string> = {
  [TabId.Colors]: TestIds.THEME_TAB_COLORS,
  [TabId.Typography]: TestIds.THEME_TAB_TYPOGRAPHY,
  [TabId.Layout]: TestIds.THEME_TAB_LAYOUT,
  [TabId.LightTheme]: TestIds.THEME_TAB_LIGHT,
  [TabId.DarkTheme]: TestIds.THEME_TAB_DARK,
  [TabId.Components]: TestIds.THEME_TAB_COMPONENTS,
  [TabId.Presets]: TestIds.THEME_TAB_PRESETS,
};

interface Tab {
  id: TabId;
  labelKey: string;
  icon: JSX.Element;
}

const TABS: Tab[] = [
  { id: TabId.Colors, labelKey: 'themeSettings.tabs.colors', icon: <SettingsPaletteIcon /> },
  { id: TabId.Typography, labelKey: 'themeSettings.tabs.typography', icon: <TextIcon /> },
  { id: TabId.Layout, labelKey: 'themeSettings.tabs.layout', icon: <GridIcon /> },
  { id: TabId.LightTheme, labelKey: 'themeSettings.tabs.lightTheme', icon: <DrawerSunIcon /> },
  { id: TabId.DarkTheme, labelKey: 'themeSettings.tabs.darkTheme', icon: <DrawerMoonIcon /> },
  { id: TabId.Components, labelKey: 'themeSettings.tabs.components', icon: <PuzzleIcon /> },
  { id: TabId.Presets, labelKey: 'themeSettings.tabs.presets', icon: <SwatchesIcon /> },
];

interface DrawerTabsProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export const DrawerTabs = ({ activeTab, onTabChange }: DrawerTabsProps): JSX.Element => {
  return (
    <nav
      aria-label={FM('themeSettings.tabs.navigation')}
      className="theme-tabs flex flex-wrap border-b border-border bg-surface-elevated/50 px-2 py-2"
    >
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            aria-current={isActive ? 'page' : undefined}
            aria-label={FM(tab.labelKey)}
            className={`
              theme-tab group relative flex items-center justify-center gap-1.5 rounded-md px-2.5 py-2
              text-[11px] font-medium transition-all duration-200
              ${
                isActive
                  ? 'bg-primary-700 text-white shadow-sm'
                  : 'text-text-secondary hover:bg-surface-elevated hover:text-text-primary'
              }
            `}
            data-testid={TAB_TEST_ID_MAP[tab.id]}
            type="button"
            onClick={() => onTabChange(tab.id)}
          >
            <span className={`transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}>
              {tab.icon}
            </span>
            <span className="hidden whitespace-nowrap sm:inline">{FM(tab.labelKey)}</span>
          </button>
        );
      })}
    </nav>
  );
};
