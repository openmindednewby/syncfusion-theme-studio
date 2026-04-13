import { memo, useCallback, useState } from 'react';

import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

import { INPUT_CLASS, LABEL_CLASS, SAVE_BTN_CLASS, SECTION_HEADING_CLASS } from '../constants';

import type { EmailFormData, SystemSettingsDto } from '../types';

interface EmailSettingsProps {
  settings: SystemSettingsDto;
  onSave: (patch: Partial<SystemSettingsDto>) => void;
  isSaving: boolean;
  onTestEmail: () => void;
}

function toFormData(s: SystemSettingsDto): EmailFormData {
  return {
    smtpHost: s.smtpHost,
    smtpPort: s.smtpPort,
    smtpUsername: s.smtpUsername,
    smtpPassword: s.smtpPassword,
    fromAddress: s.fromAddress,
    enableTls: s.enableTls,
  };
}

const TOGGLE_CLASS =
  'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500';
const TOGGLE_ON_CLASS = 'bg-primary-600';
const TOGGLE_OFF_CLASS = 'bg-gray-300 dark:bg-gray-600';
const TOGGLE_DOT_BASE = 'inline-block h-4 w-4 rounded-full bg-white transition-transform';
const TRANSLATE_ON = 'translate-x-6';
const TRANSLATE_OFF = 'translate-x-1';

const TEST_EMAIL_BTN_CLASS =
  'rounded-md border border-primary-600 px-4 py-2 text-sm font-medium text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20';

const EmailSettings = memo(
  ({ settings, onSave, isSaving, onTestEmail }: EmailSettingsProps): JSX.Element => {
    const [form, setForm] = useState<EmailFormData>(() => toFormData(settings));

    const handleChange = useCallback(
      (field: keyof EmailFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = field === 'smtpPort' ? Number(e.target.value) : e.target.value;
        setForm((prev) => ({ ...prev, [field]: value }));
      },
      [],
    );

    const handleTlsToggle = useCallback(() => {
      setForm((prev) => ({ ...prev, enableTls: !prev.enableTls }));
    }, []);

    const handleSubmit = useCallback(
      (e: React.FormEvent) => {
        e.preventDefault();
        onSave(form);
      },
      [form, onSave],
    );

    return (
      <form data-testid={TestIds.ADMIN_SETTINGS_TAB_EMAIL} onSubmit={handleSubmit}>
        <h2 className={SECTION_HEADING_CLASS}>{FM('systemSettings.email.title')}</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={LABEL_CLASS} htmlFor="smtpHost">
              {FM('systemSettings.email.smtpHost')}
            </label>
            <input
              className={INPUT_CLASS}
              data-testid={TestIds.ADMIN_SETTINGS_SMTP_HOST}
              id="smtpHost"
              type="text"
              value={form.smtpHost}
              onChange={handleChange('smtpHost')}
            />
          </div>

          <div>
            <label className={LABEL_CLASS} htmlFor="smtpPort">
              {FM('systemSettings.email.smtpPort')}
            </label>
            <input
              className={INPUT_CLASS}
              data-testid={TestIds.ADMIN_SETTINGS_SMTP_PORT}
              id="smtpPort"
              min={1}
              type="number"
              value={form.smtpPort}
              onChange={handleChange('smtpPort')}
            />
          </div>

          <div>
            <label className={LABEL_CLASS} htmlFor="smtpUsername">
              {FM('systemSettings.email.smtpUsername')}
            </label>
            <input
              className={INPUT_CLASS}
              data-testid={TestIds.ADMIN_SETTINGS_SMTP_USER}
              id="smtpUsername"
              type="text"
              value={form.smtpUsername}
              onChange={handleChange('smtpUsername')}
            />
          </div>

          <div>
            <label className={LABEL_CLASS} htmlFor="smtpPassword">
              {FM('systemSettings.email.smtpPassword')}
            </label>
            <input
              className={INPUT_CLASS}
              data-testid={TestIds.ADMIN_SETTINGS_SMTP_PASS}
              id="smtpPassword"
              type="password"
              value={form.smtpPassword}
              onChange={handleChange('smtpPassword')}
            />
          </div>

          <div>
            <label className={LABEL_CLASS} htmlFor="fromAddress">
              {FM('systemSettings.email.fromAddress')}
            </label>
            <input
              className={INPUT_CLASS}
              data-testid={TestIds.ADMIN_SETTINGS_FROM_ADDRESS}
              id="fromAddress"
              type="email"
              value={form.fromAddress}
              onChange={handleChange('fromAddress')}
            />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between rounded-lg border border-border p-4">
          <span className="text-sm text-text-primary">
            {FM('systemSettings.email.enableTls')}
          </span>
          <button
            aria-checked={form.enableTls}
            className={`${TOGGLE_CLASS} ${form.enableTls ? TOGGLE_ON_CLASS : TOGGLE_OFF_CLASS}`}
            data-testid={TestIds.ADMIN_SETTINGS_ENABLE_TLS}
            role="switch"
            type="button"
            onClick={handleTlsToggle}
          >
            <span
              className={`${TOGGLE_DOT_BASE} ${form.enableTls ? TRANSLATE_ON : TRANSLATE_OFF}`}
            />
          </button>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            className={SAVE_BTN_CLASS}
            data-testid={TestIds.ADMIN_SETTINGS_SAVE_EMAIL}
            disabled={isSaving}
            type="submit"
          >
            {FM('common.save')}
          </button>
          <button
            className={TEST_EMAIL_BTN_CLASS}
            data-testid={TestIds.ADMIN_SETTINGS_TEST_EMAIL}
            type="button"
            onClick={onTestEmail}
          >
            {FM('systemSettings.email.testEmail')}
          </button>
        </div>
      </form>
    );
  },
);

EmailSettings.displayName = 'EmailSettings';

export default EmailSettings;
