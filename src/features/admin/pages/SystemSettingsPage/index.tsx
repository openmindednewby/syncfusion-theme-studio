import { memo, useCallback, useState } from 'react';

import { useToast, ToastSeverity } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';
import { isValueDefined } from '@/utils/is';

import EmailSettings from './components/EmailSettings';
import GeneralSettings from './components/GeneralSettings';
import MaintenanceSettings from './components/MaintenanceSettings';
import NotificationSettings from './components/NotificationSettings';
import SecuritySettings from './components/SecuritySettings';
import SettingsTabs from './components/SettingsTabs';
import { useSystemSettings, useUpdateSystemSettings } from './hooks/useSystemSettings';
import { SettingsTab } from './utils/settingsTab';

import type { SystemSettingsDto } from './types';

const SystemSettingsPage = memo((): JSX.Element => {
  const [activeTab, setActiveTab] = useState<SettingsTab>(SettingsTab.General);
  const { data: response, isLoading, isError } = useSystemSettings();
  const updateMutation = useUpdateSystemSettings();
  const { addToast } = useToast();

  const settings = response?.data;

  const handleSave = useCallback(
    (patch: Partial<SystemSettingsDto>) => {
      if (!isValueDefined(settings)) return;

      const merged: SystemSettingsDto = { ...settings, ...patch };
      updateMutation.mutate(merged, {
        onSuccess: () => {
          addToast({
            severity: ToastSeverity.Success,
            title: FM('systemSettings.saved'),
            message: '',
          });
        },
        onError: () => {
          addToast({
            severity: ToastSeverity.Error,
            title: FM('systemSettings.saveError'),
            message: '',
          });
        },
      });
    },
    [settings, updateMutation, addToast],
  );

  const handleTestEmail = useCallback(() => {
    addToast({
      severity: ToastSeverity.Info,
      title: FM('systemSettings.email.testSent'),
      message: '',
    });
  }, [addToast]);

  if (isLoading)
    return (
      <div className="py-12 text-center text-text-muted" data-testid={TestIds.ADMIN_SETTINGS_PAGE}>
        {FM('common.loading')}
      </div>
    );

  if (isError || !isValueDefined(settings))
    return (
      <div className="py-12 text-center text-error-600" data-testid={TestIds.ADMIN_SETTINGS_PAGE}>
        {FM('common.error')}
      </div>
    );

  const renderTabContent = (): JSX.Element => {
    switch (activeTab) {
      case SettingsTab.General:
        return (
          <GeneralSettings
            isSaving={updateMutation.isPending}
            settings={settings}
            onSave={handleSave}
          />
        );
      case SettingsTab.Security:
        return (
          <SecuritySettings
            isSaving={updateMutation.isPending}
            settings={settings}
            onSave={handleSave}
          />
        );
      case SettingsTab.Email:
        return (
          <EmailSettings
            isSaving={updateMutation.isPending}
            settings={settings}
            onSave={handleSave}
            onTestEmail={handleTestEmail}
          />
        );
      case SettingsTab.Notifications:
        return (
          <NotificationSettings
            isSaving={updateMutation.isPending}
            settings={settings}
            onSave={handleSave}
          />
        );
      case SettingsTab.Maintenance:
        return (
          <MaintenanceSettings
            isSaving={updateMutation.isPending}
            settings={settings}
            onSave={handleSave}
          />
        );
      default:
        return (
          <GeneralSettings
            isSaving={updateMutation.isPending}
            settings={settings}
            onSave={handleSave}
          />
        );
    }
  };

  return (
    <div className="space-y-6" data-testid={TestIds.ADMIN_SETTINGS_PAGE}>
      <h1 className="text-2xl font-bold text-text-primary">{FM('systemSettings.title')}</h1>
      <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="rounded-lg border border-border bg-surface p-6">{renderTabContent()}</div>
    </div>
  );
});

SystemSettingsPage.displayName = 'SystemSettingsPage';

export default SystemSettingsPage;
