import { memo, useCallback, useState } from 'react';

import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

import { INPUT_CLASS, LABEL_CLASS, SAVE_BTN_CLASS, SECTION_HEADING_CLASS } from '../constants';

import type { MaintenanceFormData, SystemSettingsDto } from '../types';

interface MaintenanceSettingsProps {
  settings: SystemSettingsDto;
  onSave: (patch: Partial<SystemSettingsDto>) => void;
  isSaving: boolean;
}

function toFormData(s: SystemSettingsDto): MaintenanceFormData {
  return {
    maintenanceMode: s.maintenanceMode,
    maintenanceStart: s.maintenanceStart ?? '',
    maintenanceEnd: s.maintenanceEnd ?? '',
  };
}

const TOGGLE_CLASS =
  'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500';
const TOGGLE_ON_CLASS = 'bg-primary-600';
const TOGGLE_OFF_CLASS = 'bg-gray-300 dark:bg-gray-600';
const TOGGLE_DOT_BASE = 'inline-block h-4 w-4 rounded-full bg-white transition-transform';
const TRANSLATE_ON = 'translate-x-6';
const TRANSLATE_OFF = 'translate-x-1';

const WARNING_CLASS =
  'mt-2 rounded-md border border-warning-300 bg-warning-50 p-3 text-sm text-warning-800 dark:border-warning-700 dark:bg-warning-900/20 dark:text-warning-200';

const MaintenanceSettings = memo(
  ({ settings, onSave, isSaving }: MaintenanceSettingsProps): JSX.Element => {
    const [form, setForm] = useState<MaintenanceFormData>(() => toFormData(settings));

    const handleToggle = useCallback(() => {
      setForm((prev) => ({ ...prev, maintenanceMode: !prev.maintenanceMode }));
    }, []);

    const handleDateChange = useCallback(
      (field: 'maintenanceStart' | 'maintenanceEnd') =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
          setForm((prev) => ({ ...prev, [field]: e.target.value }));
        },
      [],
    );

    const handleSubmit = useCallback(
      (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
          maintenanceMode: form.maintenanceMode,
          maintenanceStart: form.maintenanceStart !== '' ? form.maintenanceStart : null,
          maintenanceEnd: form.maintenanceEnd !== '' ? form.maintenanceEnd : null,
        });
      },
      [form, onSave],
    );

    return (
      <form data-testid={TestIds.ADMIN_SETTINGS_TAB_MAINTENANCE} onSubmit={handleSubmit}>
        <h2 className={SECTION_HEADING_CLASS}>{FM('systemSettings.maintenance.title')}</h2>

        <div className="rounded-lg border border-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-medium text-text-primary">
                {FM('systemSettings.maintenance.modeLabel')}
              </span>
              <p className="text-xs text-text-muted">
                {FM('systemSettings.maintenance.modeDescription')}
              </p>
            </div>
            <button
              aria-checked={form.maintenanceMode}
              className={`${TOGGLE_CLASS} ${form.maintenanceMode ? TOGGLE_ON_CLASS : TOGGLE_OFF_CLASS}`}
              data-testid={TestIds.ADMIN_SETTINGS_MAINTENANCE_TOGGLE}
              role="switch"
              type="button"
              onClick={handleToggle}
            >
              <span
                className={`${TOGGLE_DOT_BASE} ${form.maintenanceMode ? TRANSLATE_ON : TRANSLATE_OFF}`}
              />
            </button>
          </div>
          {form.maintenanceMode ? (
            <p className={WARNING_CLASS}>{FM('systemSettings.maintenance.warning')}</p>
          ) : null}
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className={LABEL_CLASS} htmlFor="maintenanceStart">
              {FM('systemSettings.maintenance.startDate')}
            </label>
            <input
              className={INPUT_CLASS}
              data-testid={TestIds.ADMIN_SETTINGS_MAINTENANCE_START}
              id="maintenanceStart"
              type="datetime-local"
              value={form.maintenanceStart}
              onChange={handleDateChange('maintenanceStart')}
            />
          </div>
          <div>
            <label className={LABEL_CLASS} htmlFor="maintenanceEnd">
              {FM('systemSettings.maintenance.endDate')}
            </label>
            <input
              className={INPUT_CLASS}
              data-testid={TestIds.ADMIN_SETTINGS_MAINTENANCE_END}
              id="maintenanceEnd"
              type="datetime-local"
              value={form.maintenanceEnd}
              onChange={handleDateChange('maintenanceEnd')}
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            className={SAVE_BTN_CLASS}
            data-testid={TestIds.ADMIN_SETTINGS_SAVE_MAINTENANCE}
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

MaintenanceSettings.displayName = 'MaintenanceSettings';

export default MaintenanceSettings;
