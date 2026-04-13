import { useState } from 'react';

import { FM } from '@/localization/utils/helpers';

const SAVED_TIMEOUT_MS = 2000;

interface ToggleRowProps {
  checked: boolean;
  labelKey: string;
  onChange: (val: boolean) => void;
}

const ToggleRow = ({ checked, labelKey, onChange }: ToggleRowProps): JSX.Element => (
  <label className="flex cursor-pointer items-center justify-between rounded-md py-2">
    <span className="text-sm text-text-primary">{FM(labelKey)}</span>
    <input
      checked={checked}
      className="accent-primary-600 h-4 w-4"
      type="checkbox"
      onChange={(e) => onChange(e.target.checked)}
    />
  </label>
);

const NotificationSettings = (): JSX.Element => {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (): void => {
    setSaved(true);
    setTimeout(() => setSaved(false), SAVED_TIMEOUT_MS);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-text-primary">
        {FM('settings.notifications.title')}
      </h2>
      <div className="divide-y divide-border">
        <ToggleRow
          checked={emailAlerts}
          labelKey="settings.notifications.emailAlerts"
          onChange={setEmailAlerts}
        />
        <ToggleRow
          checked={pushNotifications}
          labelKey="settings.notifications.pushNotifications"
          onChange={setPushNotifications}
        />
        <ToggleRow
          checked={weeklyDigest}
          labelKey="settings.notifications.weeklyDigest"
          onChange={setWeeklyDigest}
        />
      </div>
      <div className="flex items-center gap-3 pt-2">
        <button
          aria-label={FM('settings.notifications.saveLabel')}
          className="rounded-md bg-primary-600 px-4 py-2 text-sm text-white hover:bg-primary-700"
          data-testid="settings-save-notifications"
          type="button"
          onClick={handleSave}
        >
          {FM('common.save')}
        </button>
        {saved ? (
          <span className="text-sm text-success-500">
            {FM('settings.notifications.saved')}
            <span className="ml-1 text-xs text-text-muted">{FM('settings.demoHint')}</span>
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default NotificationSettings;
