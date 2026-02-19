/**
 * InteractiveSection - Controlled checkbox group with live state display.
 */
import { memo, useCallback, useState } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { CheckboxNative } from '@/components/ui/native';
import { FM } from '@/localization/helpers';

const INITIAL_STATE = {
  emails: false,
  sms: false,
  notifications: false,
};

const TOTAL_OPTIONS = 3;

export const InteractiveSection = memo((): JSX.Element => {
  const [selections, setSelections] = useState(INITIAL_STATE);

  const handleEmailsChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSelections((prev) => ({ ...prev, emails: e.target.checked }));
  }, []);

  const handleSmsChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSelections((prev) => ({ ...prev, sms: e.target.checked }));
  }, []);

  const handleNotificationsChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSelections((prev) => ({ ...prev, notifications: e.target.checked }));
  }, []);

  const selectedCount = Object.values(selections).filter(Boolean).length;
  const hasSelections = selectedCount > 0;

  const statusText = hasSelections
    ? FM('components.checkboxShowcase.selectedCount', String(selectedCount), String(TOTAL_OPTIONS))
    : FM('components.checkboxShowcase.noneSelected');

  return (
    <section className="card space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-text-primary">
          {FM('components.checkboxShowcase.sections.interactive')}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          {FM('components.checkboxShowcase.sections.interactiveDesc')}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <CheckboxNative
          checked={selections.emails}
          helperText={FM('components.checkboxShowcase.labels.receiveEmailsHelper')}
          label={FM('components.checkboxShowcase.labels.receiveEmails')}
          testId="native-cb-showcase-emails"
          onChange={handleEmailsChange}
        />
        <CheckboxNative
          checked={selections.sms}
          helperText={FM('components.checkboxShowcase.labels.receiveSmsHelper')}
          label={FM('components.checkboxShowcase.labels.receiveSms')}
          testId="native-cb-showcase-sms"
          onChange={handleSmsChange}
        />
        <CheckboxNative
          checked={selections.notifications}
          helperText={FM('components.checkboxShowcase.labels.receiveNotificationsHelper')}
          label={FM('components.checkboxShowcase.labels.receiveNotifications')}
          testId="native-cb-showcase-notifications"
          onChange={handleNotificationsChange}
        />
      </div>

      {/* State display */}
      <div
        className="rounded-md border border-border bg-surface-secondary p-3"
        data-testid="native-cb-showcase-status"
      >
        <span className="text-sm font-medium text-text-primary">{statusText}</span>
      </div>
      <CopyableCodeSnippet code='<CheckboxNative checked={isChecked} label="Option" onChange={handleChange} />' />
    </section>
  );
});

InteractiveSection.displayName = 'InteractiveSection';
