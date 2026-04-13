import { useMemo } from 'react';

import { useDialog } from '@/hooks/useDialog';
import { FM } from '@/localization/utils/helpers';
import { isValueDefined } from '@/utils/is';

import { INTEGRATION_TEST_PREFIX } from '../constants';
import { IntegrationStatus } from '../types';

import type { IntegrationDto } from '../types';

interface IntegrationDetailProps {
  integration: IntegrationDto | null;
  onClose: () => void;
}

const INPUT_CLASS =
  'w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500';

/** Detail dialog showing integration information and config fields. */
export const IntegrationDetail = ({
  integration,
  onClose,
}: IntegrationDetailProps): JSX.Element | null => {
  const isOpen = isValueDefined(integration);
  const dialogOptions = useMemo(() => ({ isOpen, onClose }), [isOpen, onClose]);
  const { backdropProps, dialogProps, titleId } = useDialog(dialogOptions);

  if (!isOpen) return null;

  const isConnected =
    integration.status === IntegrationStatus.Connected;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      data-testid={`${INTEGRATION_TEST_PREFIX}-detail-dialog`}
      {...backdropProps}
    >
      <div
        className="mx-4 w-full max-w-lg rounded-lg border border-border bg-surface-primary p-6 shadow-xl"
        {...dialogProps}
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{integration.icon}</span>
            <div>
              <h2
                className="text-lg font-bold text-text-primary"
                id={titleId}
              >
                {integration.name}
              </h2>
              <span className="text-xs text-text-secondary">
                {FM(`integrations.categories.${integration.category}`)}
              </span>
            </div>
          </div>
          <button
            aria-label="Close"
            className="text-text-muted hover:text-text-primary"
            data-testid={`${INTEGRATION_TEST_PREFIX}-detail-close`}
            type="button"
            onClick={onClose}
          >
            {'\u2715'}
          </button>
        </div>

        <p className="mb-4 text-sm text-text-secondary">
          {integration.description}
        </p>

        <div className="mb-4 rounded-md bg-surface-secondary p-3">
          <span className="text-xs font-medium text-text-secondary">
            {FM('integrations.status')}:{' '}
          </span>
          <span
            className={
              isConnected
                ? 'text-xs font-semibold text-success-500'
                : 'text-xs font-semibold text-text-muted'
            }
          >
            {FM(
              isConnected
                ? 'integrations.connected'
                : 'integrations.disconnected',
            )}
          </span>
        </div>

        {integration.configFields.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-text-primary">
              {FM('integrations.configuration')}
            </h3>
            {integration.configFields.map((field) => (
              <div key={field.key}>
                <label className="mb-1 block text-xs font-medium text-text-secondary">
                  {field.label}
                </label>
                <input
                  className={INPUT_CLASS}
                  data-testid={`${INTEGRATION_TEST_PREFIX}-config-${field.key}`}
                  disabled={!isConnected}
                  placeholder={field.placeholder}
                  type={field.type}
                />
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            className="rounded-md bg-brand-primary px-4 py-2 text-sm font-medium text-white hover:bg-brand-primary-hover"
            data-testid={`${INTEGRATION_TEST_PREFIX}-detail-done`}
            type="button"
            onClick={onClose}
          >
            {FM('common.close')}
          </button>
        </div>
      </div>
    </div>
  );
};
