/**
 * InteractiveSection demonstrates a controlled toggle with live state
 * display and a settings panel pattern with multiple toggles.
 */
import { memo, useCallback, useState } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { ToggleNative } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

interface SettingsState {
  notifications: boolean;
  darkMode: boolean;
  autoSave: boolean;
}

const INITIAL_SETTINGS: SettingsState = {
  notifications: true,
  darkMode: false,
  autoSave: true,
};

const SETTING_ITEMS: ReadonlyArray<{
  key: keyof SettingsState;
  labelKey: string;
  testId: string;
}> = [
  {
    key: 'notifications',
    labelKey: 'components.toggleShowcase.labels.notifications',
    testId: TestIds.NATIVE_TOGGLE_NOTIFICATIONS,
  },
  {
    key: 'darkMode',
    labelKey: 'components.toggleShowcase.labels.darkMode',
    testId: TestIds.NATIVE_TOGGLE_DARK_MODE,
  },
  {
    key: 'autoSave',
    labelKey: 'components.toggleShowcase.labels.autoSave',
    testId: TestIds.NATIVE_TOGGLE_AUTO_SAVE,
  },
];

export const InteractiveSection = memo((): JSX.Element => {
  const [isActive, setIsActive] = useState(false);
  const [settings, setSettings] = useState<SettingsState>(INITIAL_SETTINGS);

  const handleActiveChange = useCallback((checked: boolean) => {
    setIsActive(checked);
  }, []);

  const handleSettingChange = useCallback((key: keyof SettingsState, checked: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: checked }));
  }, []);

  const stateLabel = isActive
    ? FM('components.toggleShowcase.labels.on')
    : FM('components.toggleShowcase.labels.off');

  return (
    <section className="card space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-text-primary">
          {FM('components.toggleShowcase.sections.interactive')}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          {FM('components.toggleShowcase.sections.interactiveDesc')}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <ToggleNative
          checked={isActive}
          label={FM('components.toggleShowcase.sections.interactive')}
          testId={TestIds.NATIVE_TOGGLE_INTERACTIVE}
          onChange={handleActiveChange}
        />
        <span
          className="text-sm font-medium text-text-primary"
          data-testid={TestIds.NATIVE_TOGGLE_STATE_LABEL}
        >
          {FM('components.toggleShowcase.labels.currentState', stateLabel)}
        </span>
      </div>

      <div className="border-t border-border pt-4">
        <h4 className="mb-1 text-base font-medium text-text-primary">
          {FM('components.toggleShowcase.labels.settingsPanel')}
        </h4>
        <p className="mb-4 text-sm text-text-secondary">
          {FM('components.toggleShowcase.labels.settingsPanelDesc')}
        </p>
        <div className="space-y-3">
          {SETTING_ITEMS.map(({ key, labelKey, testId }) => (
            <div
              key={key}
              className="flex items-center justify-between rounded-lg border border-border px-4 py-3"
            >
              <span className="text-sm text-text-primary">{FM(labelKey)}</span>
              <ToggleNative
                checked={settings[key]}
                label={FM(labelKey)}
                testId={testId}
                onChange={(checked) => handleSettingChange(key, checked)}
              />
            </div>
          ))}
        </div>
      </div>
      <CopyableCodeSnippet code={'<ToggleNative\n  checked={settings.notifications}\n  label="Notifications"\n  onChange={(checked) => handleSettingChange("notifications", checked)}\n/>'} />
    </section>
  );
});

InteractiveSection.displayName = 'InteractiveSection';
