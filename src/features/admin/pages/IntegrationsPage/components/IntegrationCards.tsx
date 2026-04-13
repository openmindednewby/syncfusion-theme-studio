import { FM } from '@/localization/utils/helpers';

import { INTEGRATION_TEST_PREFIX } from '../constants';
import { IntegrationStatus } from '../types';

import type { IntegrationDto } from '../types';

interface IntegrationCardsProps {
  integrations: IntegrationDto[];
  onToggle: (id: string) => void;
  onViewDetails: (integration: IntegrationDto) => void;
}

const CONNECTED_BADGE_CLASS =
  'inline-flex items-center rounded-full bg-success-50 px-2.5 py-0.5 text-xs font-medium text-success-700';
const DISCONNECTED_BADGE_CLASS =
  'inline-flex items-center rounded-full bg-surface-200 px-2.5 py-0.5 text-xs font-medium text-text-muted';

/** Grid of integration cards showing status and action buttons. */
export const IntegrationCards = ({
  integrations,
  onToggle,
  onViewDetails,
}: IntegrationCardsProps): JSX.Element => (
  <div className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {integrations.map((integration) => {
      const isConnected =
        integration.status === IntegrationStatus.Connected;

      return (
        <div
          key={integration.id}
          className="card flex h-full flex-col gap-3 p-5 transition-all duration-200 hover:border-primary-500/50 hover:shadow-md"
          data-testid={`${INTEGRATION_TEST_PREFIX}-card-${integration.id}`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{integration.icon}</span>
              <div>
                <h3 className="text-sm font-semibold text-text-primary">
                  {integration.name}
                </h3>
                <span
                  className={
                    isConnected
                      ? CONNECTED_BADGE_CLASS
                      : DISCONNECTED_BADGE_CLASS
                  }
                >
                  {FM(
                    isConnected
                      ? 'integrations.connected'
                      : 'integrations.disconnected',
                  )}
                </span>
              </div>
            </div>
          </div>
          <p className="flex-1 text-xs text-text-secondary">
            {integration.description}
          </p>
          <div className="flex items-center gap-2">
            <button
              aria-label={
                isConnected
                  ? FM('integrations.disconnectAriaLabel', integration.name)
                  : FM('integrations.connectAriaLabel', integration.name)
              }
              className={
                isConnected
                  ? 'rounded-md border border-error-500 px-3 py-1.5 text-xs font-medium text-error-500 hover:bg-error-50'
                  : 'rounded-md bg-brand-primary px-3 py-1.5 text-xs font-medium text-white hover:bg-brand-primary-hover'
              }
              data-testid={`${INTEGRATION_TEST_PREFIX}-toggle-${integration.id}`}
              type="button"
              onClick={() => onToggle(integration.id)}
            >
              {FM(
                isConnected
                  ? 'integrations.disconnect'
                  : 'integrations.connect',
              )}
            </button>
            <button
              aria-label={FM('integrations.viewDetailsAriaLabel', integration.name)}
              className="rounded-md border border-border px-3 py-1.5 text-xs font-medium text-text-secondary hover:bg-surface-secondary"
              data-testid={`${INTEGRATION_TEST_PREFIX}-details-${integration.id}`}
              type="button"
              onClick={() => onViewDetails(integration)}
            >
              {FM('integrations.details')}
            </button>
          </div>
        </div>
      );
    })}
  </div>
);
