/**
 * FormResult Component
 *
 * Displays submitted form data in a formatted JSON panel.
 */
import { FM } from '@/localization/helpers';
import { isValueDefined } from '@/utils/is';

interface Props {
  data: Record<string, unknown> | null;
}

export const FormResult = ({ data }: Props): JSX.Element => {
  if (!isValueDefined(data)) return (
    <div className="rounded-md border border-border bg-surface-elevated p-4">
      <p className="text-sm italic text-text-muted">{FM('forms.common.noSubmissionYet')}</p>
    </div>
  );

  return (
    <div className="rounded-md border border-border bg-surface-elevated p-4">
      <h4 className="mb-2 text-sm font-medium text-text-primary">
        {FM('forms.common.submittedData')}
      </h4>
      <pre className="overflow-x-auto text-xs text-text-secondary">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
