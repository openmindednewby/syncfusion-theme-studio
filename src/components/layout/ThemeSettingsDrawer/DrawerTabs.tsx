import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';

export type TabId = 'colors' | 'typography' | 'layout' | 'lightTheme' | 'darkTheme' | 'components' | 'presets';

const TAB_TEST_ID_MAP: Record<TabId, string> = {
  colors: TestIds.THEME_TAB_COLORS,
  typography: TestIds.THEME_TAB_TYPOGRAPHY,
  layout: TestIds.THEME_TAB_LAYOUT,
  lightTheme: TestIds.THEME_TAB_LIGHT,
  darkTheme: TestIds.THEME_TAB_DARK,
  components: TestIds.THEME_TAB_COMPONENTS,
  presets: TestIds.THEME_TAB_PRESETS,
};

interface Tab {
  id: TabId;
  labelKey: string;
  icon: JSX.Element;
}

const PaletteIcon = (): JSX.Element => (
  <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.38 0 2.5-1.12 2.5-2.5 0-.61-.23-1.17-.62-1.59-.35-.36-.57-.86-.57-1.41 0-1.1.9-2 2-2h2.34c2.87 0 5.35-2.34 5.35-5.21C22 5.67 17.52 2 12 2z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="8" cy="10" fill="currentColor" r="1.5" />
    <circle cx="12" cy="7" fill="currentColor" r="1.5" />
    <circle cx="16" cy="10" fill="currentColor" r="1.5" />
  </svg>
);

const TextIcon = (): JSX.Element => (
  <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M4 7V4h16v3M9 20h6M12 4v16" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const GridIcon = (): JSX.Element => (
  <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <rect height="7" rx="1" width="7" x="3" y="3" />
    <rect height="7" rx="1" width="7" x="14" y="3" />
    <rect height="7" rx="1" width="7" x="14" y="14" />
    <rect height="7" rx="1" width="7" x="3" y="14" />
  </svg>
);

const SunIcon = (): JSX.Element => (
  <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="5" />
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" strokeLinecap="round" />
  </svg>
);

const MoonIcon = (): JSX.Element => (
  <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PuzzleIcon = (): JSX.Element => (
  <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path
      d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 01-.837.276c-.47-.07-.802-.48-.743-.95.059-.47-.01-.932-.265-1.328A2.5 2.5 0 0015 12.5a2.5 2.5 0 00-2.5 2.5c0 .883.51 1.652 1.25 2.039.371.194.654.485.761.878.107.392.054.822-.161 1.182l-1.65 2.201a2.405 2.405 0 01-3.4 0l-1.568-1.568a.98.98 0 01-.276-.837c.07-.47.48-.802.95-.743.47.059.932-.01 1.328-.265A2.5 2.5 0 0010.5 15a2.5 2.5 0 00-2.5-2.5c-.883 0-1.652.51-2.039 1.25-.194.371-.485.654-.878.761-.392.107-.822.054-1.182-.161L1.7 12.7a2.405 2.405 0 010-3.4l1.568-1.568c.23-.23.556-.338.878-.289.47.07.802.48.743.95-.059.47.01.932.265 1.328A2.5 2.5 0 007.5 10.5 2.5 2.5 0 0010 8c0-.883-.51-1.652-1.25-2.039-.371-.194-.654-.485-.761-.878-.107-.392-.054-.822.161-1.182l1.65-2.201a2.405 2.405 0 013.4 0l1.568 1.568c.23.23.338.556.289.878-.07.47-.48.802-.95.743-.47-.059-.932.01-1.328.265A2.5 2.5 0 0012 7.5a2.5 2.5 0 002.5 2.5c.883 0 1.652-.51 2.039-1.25.194-.371.485-.654.878-.761.392-.107.822-.054 1.182.161l1.84 1.35z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SwatchesIcon = (): JSX.Element => (
  <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path
      d="M4 7h4v10H4V7zm6-3h4v16h-4V4zm6 6h4v7h-4v-7z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TABS: Tab[] = [
  { id: 'colors', labelKey: 'themeSettings.tabs.colors', icon: <PaletteIcon /> },
  { id: 'typography', labelKey: 'themeSettings.tabs.typography', icon: <TextIcon /> },
  { id: 'layout', labelKey: 'themeSettings.tabs.layout', icon: <GridIcon /> },
  { id: 'lightTheme', labelKey: 'themeSettings.tabs.lightTheme', icon: <SunIcon /> },
  { id: 'darkTheme', labelKey: 'themeSettings.tabs.darkTheme', icon: <MoonIcon /> },
  { id: 'components', labelKey: 'themeSettings.tabs.components', icon: <PuzzleIcon /> },
  { id: 'presets', labelKey: 'themeSettings.tabs.presets', icon: <SwatchesIcon /> },
];

interface DrawerTabsProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export const DrawerTabs = ({ activeTab, onTabChange }: DrawerTabsProps): JSX.Element => {
  return (
    <nav aria-label={FM('themeSettings.tabs.navigation')} className="flex flex-wrap border-b border-border">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        const baseClasses = 'flex items-center justify-center gap-1 px-2 py-2 text-[10px] font-medium transition-colors';
        const activeClasses = isActive
          ? 'border-b-2 border-primary-500 text-primary-600'
          : 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated';

        return (
          <button
            key={tab.id}
            aria-current={isActive ? 'page' : undefined}
            aria-label={FM(tab.labelKey)}
            className={`${baseClasses} ${activeClasses}`}
            data-testid={TAB_TEST_ID_MAP[tab.id]}
            type="button"
            onClick={() => onTabChange(tab.id)}
          >
            {tab.icon}
            <span className="hidden sm:inline">{FM(tab.labelKey)}</span>
          </button>
        );
      })}
    </nav>
  );
};
