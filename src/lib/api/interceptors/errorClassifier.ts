/**
 * Response error interceptor: classifies and routes Axios errors.
 *
 * Converts raw AxiosError objects into ClassifiedError instances,
 * matches them against the error registry, and executes the
 * appropriate UI action (toast, modal, redirect, etc.).
 */

import { isValueDefined } from '@/utils/is';
import { logger } from '@/utils/logger';

import { executeErrorAction } from '../errors/errorActions';
import { classifyError } from '../errors/errorClassifier';
import { matchError } from '../errors/errorMatcher';

import type { AxiosError, AxiosInstance } from 'axios';

const LOG_CONTEXT = 'errorClassifierInterceptor';

function isAxiosError(value: unknown): value is AxiosError {
  if (typeof value !== 'object') return false;
  if (!isValueDefined(value)) return false;
  return 'isAxiosError' in value;
}

/**
 * Handles response errors by classifying, matching, and executing actions.
 */
async function handleResponseError(error: unknown): Promise<never> {
  if (!isAxiosError(error)) return Promise.reject(error);

  const classified = classifyError(error);

  logger.warn(LOG_CONTEXT, `HTTP ${classified.method} ${classified.url} failed`, {
    status: classified.status,
    errorCode: classified.errorCode,
    message: classified.message,
  });

  const result = matchError(classified);
  if (result.matched && isValueDefined(result.rule))
    executeErrorAction(result.rule, classified);

  return Promise.reject(error);
}

/**
 * Registers the error classifier interceptor on an Axios instance.
 * @returns The interceptor ID for potential ejection.
 */
function registerErrorClassifier(instance: AxiosInstance): number {
  return instance.interceptors.response.use(
    (response) => response,
    handleResponseError,
  );
}

export { registerErrorClassifier, handleResponseError };
