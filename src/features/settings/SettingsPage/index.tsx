import { memo, useCallback, useState } from 'react';

import { useTabNavigation } from '@/hooks/useTabNavigation';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

import { AccountSettings, AppearanceSettings, NotificationSettings } from './sections';

const enum SettingsTab {
  Account = 'account',
  Appearance = 'appearance',
  Notifications = 'notifications',
}

const TAB_IDS = [
  SettingsTab.Account,
  SettingsTab.Appearance,
  SettingsTab.Notifications,
] as const;

const TABS: Array<{ id: SettingsTab; labelKey: string; testId: string }> = [
  { id: SettingsTab.Account, labelKey: 'settings.tabs.account', testId: TestIds.SETTINGS_TAB_ACCOUNT },
  {
    id: SettingsTab.Appearance,
    labelKey: 'settings.tabs.appearance',
    testId: TestIds.SETTINGS_TAB_APPEARANCE,
  },
  {
    id: SettingsTab.Notifications,
    labelKey: 'settings.tabs.notifications',
    testId: TestIds.SETTINGS_TAB_NOTIFICATIONS,
  },
];

export function getTabCount(): number {
  return TABS.length;
}

const SettingsPage = memo((): JSX.Element => {
  const [activeTab, setActiveTab] = useState<SettingsTab>(SettingsTab.Account);

  const handleTabChange = useCallback((tab: SettingsTab) => {
    setActiveTab(tab);
  }, []);

  const { tabListProps, getTabProps, tabPanelProps } = useTabNavigation<SettingsTab>({
    tabs: TAB_IDS,
    activeTab,
    onTabChange: handleTabChange,
  });

  return (
    <div className="space-y-6" data-testid={TestIds.SETTINGS_PAGE}>
      <h1 className="text-2xl font-bold text-text-primary">{FM('settings.title')}</h1>
      <div
        className="flex gap-1 border-b border-border"
        {...tabListProps}
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`relative px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'text-primary-600'
                : 'text-text-secondary hover:text-text-primary'
            }`}
            data-testid={tab.testId}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            {...getTabProps(tab.id)}
          >
            {FM(tab.labelKey)}
            {activeTab === tab.id ? (
              <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-primary-600" />
            ) : null}
          </button>
        ))}
      </div>
      <div
        className="rounded-lg border border-border bg-surface p-6"
        {...tabPanelProps}
      >
        {activeTab === SettingsTab.Account && <AccountSettings />}
        {activeTab === SettingsTab.Appearance && <AppearanceSettings />}
        {activeTab === SettingsTab.Notifications && <NotificationSettings />}
      </div>
    </div>
  );
});

SettingsPage.displayName = 'SettingsPage';

export default SettingsPage;
