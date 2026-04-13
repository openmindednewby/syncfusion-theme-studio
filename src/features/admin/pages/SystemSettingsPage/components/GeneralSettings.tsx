import { memo, useCallback, useState } from 'react';

import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

import { INPUT_CLASS, LABEL_CLASS, SAVE_BTN_CLASS, SECTION_HEADING_CLASS } from '../constants';

import type { GeneralFormData, SystemSettingsDto } from '../types';

interface GeneralSettingsProps {
  settings: SystemSettingsDto;
  onSave: (patch: Partial<SystemSettingsDto>) => void;
  isSaving: boolean;
}

function toFormData(s: SystemSettingsDto): GeneralFormData {
  return {
    appName: s.appName,
    timezone: s.timezone,
    defaultLanguage: s.defaultLanguage,
    dateFormat: s.dateFormat,
    currencyFormat: s.currencyFormat,
  };
}

const GeneralSettings = memo(({ settings, onSave, isSaving }: GeneralSettingsProps): JSX.Element => {
  const [form, setForm] = useState<GeneralFormData>(() => toFormData(settings));

  const handleChange = useCallback(
    (field: keyof GeneralFormData) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
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

  return (
    <form data-testid={TestIds.ADMIN_SETTINGS_TAB_GENERAL} onSubmit={handleSubmit}>
      <h2 className={SECTION_HEADING_CLASS}>{FM('systemSettings.general.title')}</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={LABEL_CLASS} htmlFor="appName">
            {FM('systemSettings.general.appName')}
          </label>
          <input
            className={INPUT_CLASS}
            data-testid={TestIds.ADMIN_SETTINGS_APP_NAME}
            id="appName"
            type="text"
            value={form.appName}
            onChange={handleChange('appName')}
          />
        </div>

        <div>
          <label className={LABEL_CLASS} htmlFor="timezone">
            {FM('systemSettings.general.timezone')}
          </label>
          <input
            className={INPUT_CLASS}
            data-testid={TestIds.ADMIN_SETTINGS_TIMEZONE}
            id="timezone"
            type="text"
            value={form.timezone}
            onChange={handleChange('timezone')}
          />
        </div>

        <div>
          <label className={LABEL_CLASS} htmlFor="defaultLanguage">
            {FM('systemSettings.general.language')}
          </label>
          <input
            className={INPUT_CLASS}
            data-testid={TestIds.ADMIN_SETTINGS_LANGUAGE}
            id="defaultLanguage"
            type="text"
            value={form.defaultLanguage}
            onChange={handleChange('defaultLanguage')}
          />
        </div>

        <div>
          <label className={LABEL_CLASS} htmlFor="dateFormat">
            {FM('systemSettings.general.dateFormat')}
          </label>
          <input
            className={INPUT_CLASS}
            data-testid={TestIds.ADMIN_SETTINGS_DATE_FORMAT}
            id="dateFormat"
            type="text"
            value={form.dateFormat}
            onChange={handleChange('dateFormat')}
          />
        </div>

        <div>
          <label className={LABEL_CLASS} htmlFor="currencyFormat">
            {FM('systemSettings.general.currencyFormat')}
          </label>
          <input
            className={INPUT_CLASS}
            data-testid={TestIds.ADMIN_SETTINGS_CURRENCY_FORMAT}
            id="currencyFormat"
            type="text"
            value={form.currencyFormat}
            onChange={handleChange('currencyFormat')}
          />
        </div>
      </div>

      <div className="mt-6">
        <button
          className={SAVE_BTN_CLASS}
          data-testid={TestIds.ADMIN_SETTINGS_SAVE_GENERAL}
          disabled={isSaving}
          type="submit"
        >
          {FM('common.save')}
        </button>
      </div>
    </form>
  );
});

GeneralSettings.displayName = 'GeneralSettings';

export default GeneralSettings;
