/**
 * InteractiveSection - A form-like demo where checking/unchecking Syncfusion
 * CheckBoxComponent updates state with live display.
 */
import { memo, useCallback, useState } from 'react';

import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import type { ChangeEventArgs } from '@syncfusion/ej2-react-buttons';

import { CopyableCodeSnippet } from '@/components/common';
import { FM } from '@/localization/utils/helpers';

const INITIAL_STATE = {
  emails: false,
  sms: false,
  notifications: false,
};

const TOTAL_OPTIONS = 3;

export const InteractiveSection = memo((): JSX.Element => {
  const [selections, setSelections] = useState(INITIAL_STATE);

  const handleEmailsChange = useCallback((args: ChangeEventArgs) => {
    setSelections((prev) => ({ ...prev, emails: args.checked ?? false }));
  }, []);

  const handleSmsChange = useCallback((args: ChangeEventArgs) => {
    setSelections((prev) => ({ ...prev, sms: args.checked ?? false }));
  }, []);

  const handleNotificationsChange = useCallback((args: ChangeEventArgs) => {
    setSelections((prev) => ({ ...prev, notifications: args.checked ?? false }));
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
        <CheckBoxComponent
          change={handleEmailsChange}
          checked={selections.emails}
          label={FM('components.checkboxShowcase.labels.receiveEmails')}
        />
        <CheckBoxComponent
          change={handleSmsChange}
          checked={selections.sms}
          label={FM('components.checkboxShowcase.labels.receiveSms')}
        />
        <CheckBoxComponent
          change={handleNotificationsChange}
          checked={selections.notifications}
          label={FM('components.checkboxShowcase.labels.receiveNotifications')}
        />
      </div>

      {/* State display */}
      <div
        className="rounded-md border border-border bg-surface-secondary p-3"
        data-testid="sf-cb-showcase-status"
      >
        <span className="text-sm font-medium text-text-primary">{statusText}</span>
      </div>
      <CopyableCodeSnippet code='<CheckBoxComponent checked={value} change={handleChange} label="Subscribe" />' />
    </section>
  );
});

InteractiveSection.displayName = 'InteractiveSection';
