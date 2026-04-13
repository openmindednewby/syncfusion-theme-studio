import { memo, useCallback } from 'react';

import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

import { SettingsTab } from '../utils/settingsTab';

interface SettingsTabsProps {
  activeTab: SettingsTab;
  onTabChange: (tab: SettingsTab) => void;
}

interface TabDef {
  tab: SettingsTab;
  labelKey: string;
  testId: string;
}

const TABS: readonly TabDef[] = [
  { tab: SettingsTab.General, labelKey: 'systemSettings.tabs.general', testId: TestIds.ADMIN_SETTINGS_TAB_GENERAL_BTN },
  { tab: SettingsTab.Security, labelKey: 'systemSettings.tabs.security', testId: TestIds.ADMIN_SETTINGS_TAB_SECURITY_BTN },
  { tab: SettingsTab.Email, labelKey: 'systemSettings.tabs.email', testId: TestIds.ADMIN_SETTINGS_TAB_EMAIL_BTN },
  { tab: SettingsTab.Notifications, labelKey: 'systemSettings.tabs.notifications', testId: TestIds.ADMIN_SETTINGS_TAB_NOTIFICATIONS_BTN },
  { tab: SettingsTab.Maintenance, labelKey: 'systemSettings.tabs.maintenance', testId: TestIds.ADMIN_SETTINGS_TAB_MAINTENANCE_BTN },
];

const ACTIVE_CLASS =
  'border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400';
const INACTIVE_CLASS =
  'border-transparent text-text-muted hover:border-border hover:text-text-primary';
const BASE_TAB_CLASS =
  'shrink-0 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors';

const SettingsTabs = memo(({ activeTab, onTabChange }: SettingsTabsProps): JSX.Element => {
  const handleClick = useCallback(
    (tab: SettingsTab) => () => onTabChange(tab),
    [onTabChange],
  );

  return (
    <div
      className="border-b border-border"
      data-testid={TestIds.ADMIN_SETTINGS_TABS}
      role="tablist"
    >
      <nav className="-mb-px flex space-x-2 overflow-x-auto">
        {TABS.map(({ tab, labelKey, testId }) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              aria-selected={isActive}
              className={`${BASE_TAB_CLASS} ${isActive ? ACTIVE_CLASS : INACTIVE_CLASS}`}
              data-testid={testId}
              role="tab"
              type="button"
              onClick={handleClick(tab)}
            >
              {FM(labelKey)}
            </button>
          );
        })}
      </nav>
    </div>
  );
});

SettingsTabs.displayName = 'SettingsTabs';

export default SettingsTabs;
