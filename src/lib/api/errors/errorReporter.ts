/**
 * Monitoring reporter stub.
 *
 * Logs classified errors to the application logger.
 * This module is the integration point for external error
 * tracking services (Sentry, Datadog, etc.).
 */

import { logger } from '@/utils/logger';

import type { ClassifiedError } from './errorTypes';

// TODO: Integrate with Sentry or similar monitoring service
// import * as Sentry from '@sentry/react';

/**
 * Report an error to external monitoring.
 * Currently logs via the application logger.
 * Replace with Sentry.captureException() when monitoring is configured.
 */
function reportToMonitoring(error: ClassifiedError): void {
  logger.error('errorReporter', 'Reported to monitoring', {
    status: error.status,
    url: error.url,
    method: error.method,
    errorCode: error.errorCode,
    message: error.message,
    requestId: error.requestId,
  });
}

export { reportToMonitoring };
