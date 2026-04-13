import { memo, useCallback, useState } from 'react';

import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

import { INPUT_CLASS, LABEL_CLASS, SAVE_BTN_CLASS, SECTION_HEADING_CLASS } from '../constants';
import { NotifToggleField } from '../utils/notifToggleField';

import type { NotificationFormData, SystemSettingsDto } from '../types';

interface NotificationSettingsProps {
  settings: SystemSettingsDto;
  onSave: (patch: Partial<SystemSettingsDto>) => void;
  isSaving: boolean;
}

function toFormData(s: SystemSettingsDto): NotificationFormData {
  return {
    enableEmailNotifications: s.enableEmailNotifications,
    enableInAppNotifications: s.enableInAppNotifications,
    enableSmsNotifications: s.enableSmsNotifications,
    alertSeverityThreshold: s.alertSeverityThreshold,
  };
}

const TOGGLE_CLASS =
  'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500';
const TOGGLE_ON_CLASS = 'bg-primary-600';
const TOGGLE_OFF_CLASS = 'bg-surface-200 dark:bg-surface-700';
const TOGGLE_DOT_BASE = 'inline-block h-4 w-4 rounded-full bg-white transition-transform';
const TRANSLATE_ON = 'translate-x-6';
const TRANSLATE_OFF = 'translate-x-1';

const NotificationSettings = memo(
  ({ settings, onSave, isSaving }: NotificationSettingsProps): JSX.Element => {
    const [form, setForm] = useState<NotificationFormData>(() => toFormData(settings));

    const handleToggle = useCallback(
      (field: NotifToggleField) => () => {
        setForm((prev) => ({ ...prev, [field]: !prev[field] }));
      },
      [],
    );

    const handleThresholdChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, alertSeverityThreshold: e.target.value }));
    }, []);

    const handleSubmit = useCallback(
      (e: React.FormEvent) => {
        e.preventDefault();
        onSave(form);
      },
      [form, onSave],
    );

    const renderToggle = (
      field: NotifToggleField,
      label: string,
      testId: string,
    ): JSX.Element => (
      <div className="flex items-center justify-between">
        <span className="text-sm text-text-primary">{label}</span>
        <button
          aria-checked={form[field]}
          className={`${TOGGLE_CLASS} ${form[field] ? TOGGLE_ON_CLASS : TOGGLE_OFF_CLASS}`}
          data-testid={testId}
          role="switch"
          type="button"
          onClick={handleToggle(field)}
        >
          <span className={`${TOGGLE_DOT_BASE} ${form[field] ? TRANSLATE_ON : TRANSLATE_OFF}`} />
        </button>
      </div>
    );

    return (
      <form data-testid={TestIds.ADMIN_SETTINGS_TAB_NOTIFICATIONS} onSubmit={handleSubmit}>
        <h2 className={SECTION_HEADING_CLASS}>{FM('systemSettings.notifications.title')}</h2>

        <div className="space-y-3 rounded-lg border border-border p-4">
          {renderToggle(
            NotifToggleField.Email,
            FM('systemSettings.notifications.email'),
            TestIds.ADMIN_SETTINGS_NOTIF_EMAIL,
          )}
          {renderToggle(
            NotifToggleField.InApp,
            FM('systemSettings.notifications.inApp'),
            TestIds.ADMIN_SETTINGS_NOTIF_IN_APP,
          )}
          {renderToggle(
            NotifToggleField.Sms,
            FM('systemSettings.notifications.sms'),
            TestIds.ADMIN_SETTINGS_NOTIF_SMS,
          )}
        </div>

        <div className="mt-4">
          <label className={LABEL_CLASS} htmlFor="alertSeverity">
            {FM('systemSettings.notifications.severity')}
          </label>
          <select
            className={INPUT_CLASS}
            data-testid={TestIds.ADMIN_SETTINGS_SEVERITY}
            id="alertSeverity"
            value={form.alertSeverityThreshold}
            onChange={handleThresholdChange}
          >
            <option value="low">{FM('systemSettings.notifications.low')}</option>
            <option value="medium">{FM('systemSettings.notifications.medium')}</option>
            <option value="high">{FM('systemSettings.notifications.high')}</option>
            <option value="critical">{FM('systemSettings.notifications.critical')}</option>
          </select>
        </div>

        <div className="mt-6">
          <button
            className={SAVE_BTN_CLASS}
            data-testid={TestIds.ADMIN_SETTINGS_SAVE_NOTIFICATIONS}
            disabled={isSaving}
            type="submit"
          >
            {FM('common.save')}
          </button>
        </div>
      </form>
    );
  },
);

NotificationSettings.displayName = 'NotificationSettings';

export default NotificationSettings;
