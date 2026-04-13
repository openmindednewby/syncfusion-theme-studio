import { memo, useCallback, useState } from 'react';

import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

import { INPUT_CLASS, LABEL_CLASS, SAVE_BTN_CLASS, SECTION_HEADING_CLASS } from '../constants';

import type { SecurityFormData, SystemSettingsDto } from '../types';

interface SecuritySettingsProps {
  settings: SystemSettingsDto;
  onSave: (patch: Partial<SystemSettingsDto>) => void;
  isSaving: boolean;
}

function toFormData(s: SystemSettingsDto): SecurityFormData {
  return {
    minPasswordLength: s.minPasswordLength,
    requireUppercase: s.requireUppercase,
    requireNumber: s.requireNumber,
    requireSpecialChar: s.requireSpecialChar,
    enforce2FA: s.enforce2FA,
    sessionTimeoutMinutes: s.sessionTimeoutMinutes,
    maxLoginAttempts: s.maxLoginAttempts,
  };
}

const TOGGLE_CLASS =
  'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500';
const TOGGLE_ON_CLASS = 'bg-primary-600';
const TOGGLE_OFF_CLASS = 'bg-gray-300 dark:bg-gray-600';
const TOGGLE_DOT_BASE = 'inline-block h-4 w-4 rounded-full bg-white transition-transform';
const TRANSLATE_ON = 'translate-x-6';
const TRANSLATE_OFF = 'translate-x-1';

const SecuritySettings = memo(
  ({ settings, onSave, isSaving }: SecuritySettingsProps): JSX.Element => {
    const [form, setForm] = useState<SecurityFormData>(() => toFormData(settings));

    const handleNumberChange = useCallback(
      (field: 'minPasswordLength' | 'sessionTimeoutMinutes' | 'maxLoginAttempts') =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
          setForm((prev) => ({ ...prev, [field]: Number(e.target.value) }));
        },
      [],
    );

    const handleToggle = useCallback(
      (field: 'requireUppercase' | 'requireNumber' | 'requireSpecialChar' | 'enforce2FA') =>
        () => {
          setForm((prev) => ({ ...prev, [field]: !prev[field] }));
        },
      [],
    );

    const handleSubmit = useCallback(
      (e: React.FormEvent) => {
        e.preventDefault();
        onSave(form);
      },
      [form, onSave],
    );

    const renderToggle = (
      field: 'requireUppercase' | 'requireNumber' | 'requireSpecialChar' | 'enforce2FA',
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
      <form data-testid={TestIds.ADMIN_SETTINGS_TAB_SECURITY} onSubmit={handleSubmit}>
        <h2 className={SECTION_HEADING_CLASS}>{FM('systemSettings.security.title')}</h2>

        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={LABEL_CLASS} htmlFor="minPasswordLength">
                {FM('systemSettings.security.minPasswordLength')}
              </label>
              <input
                className={INPUT_CLASS}
                data-testid={TestIds.ADMIN_SETTINGS_MIN_PASSWORD}
                id="minPasswordLength"
                min={1}
                type="number"
                value={form.minPasswordLength}
                onChange={handleNumberChange('minPasswordLength')}
              />
            </div>

            <div>
              <label className={LABEL_CLASS} htmlFor="sessionTimeout">
                {FM('systemSettings.security.sessionTimeout')}
              </label>
              <input
                className={INPUT_CLASS}
                data-testid={TestIds.ADMIN_SETTINGS_SESSION_TIMEOUT}
                id="sessionTimeout"
                min={1}
                type="number"
                value={form.sessionTimeoutMinutes}
                onChange={handleNumberChange('sessionTimeoutMinutes')}
              />
            </div>

            <div>
              <label className={LABEL_CLASS} htmlFor="maxLoginAttempts">
                {FM('systemSettings.security.maxAttempts')}
              </label>
              <input
                className={INPUT_CLASS}
                data-testid={TestIds.ADMIN_SETTINGS_MAX_ATTEMPTS}
                id="maxLoginAttempts"
                min={1}
                type="number"
                value={form.maxLoginAttempts}
                onChange={handleNumberChange('maxLoginAttempts')}
              />
            </div>
          </div>

          <div className="space-y-3 rounded-lg border border-border p-4">
            {renderToggle(
              'requireUppercase',
              FM('systemSettings.security.requireUppercase'),
              TestIds.ADMIN_SETTINGS_REQUIRE_UPPER,
            )}
            {renderToggle(
              'requireNumber',
              FM('systemSettings.security.requireNumber'),
              TestIds.ADMIN_SETTINGS_REQUIRE_NUMBER,
            )}
            {renderToggle(
              'requireSpecialChar',
              FM('systemSettings.security.requireSpecial'),
              TestIds.ADMIN_SETTINGS_REQUIRE_SPECIAL,
            )}
            {renderToggle(
              'enforce2FA',
              FM('systemSettings.security.enforce2FA'),
              TestIds.ADMIN_SETTINGS_ENFORCE_2FA,
            )}
          </div>
        </div>

        <div className="mt-6">
          <button
            className={SAVE_BTN_CLASS}
            data-testid={TestIds.ADMIN_SETTINGS_SAVE_SECURITY}
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

SecuritySettings.displayName = 'SecuritySettings';

export default SecuritySettings;
