/**
 * Response interceptor: normalizes successful API responses.
 *
 * For successful mutation requests (POST/PUT/PATCH/DELETE), emits
 * a toast event via the apiEventBus so the UI can display a success
 * notification without coupling to Axios internals.
 */

import { isValueDefined } from '@/utils/is';
import { logger } from '@/utils/logger';

import { ErrorSeverity } from '../errors/errorTypes';
import { apiEventBus } from '../events/apiEventBus';

import type { AxiosInstance, AxiosResponse } from 'axios';

function isRecord(value: unknown): value is Record<string, unknown> {
  return isValueDefined(value) && typeof value === 'object';
}

function extractMessageFromBody(data: unknown): string | undefined {
  if (!isRecord(data)) return undefined;

  const message = data['message'];
  if (typeof message === 'string' && message.length > 0) return message;

  const detail = data['detail'];
  if (typeof detail === 'string' && detail.length > 0) return detail;

  return undefined;
}

/**
 * Registers the response normalizer interceptor on an Axios instance.
 * @returns The interceptor ID for potential ejection.
 */
function registerResponseNormalizer(instance: AxiosInstance): number {
  return instance.interceptors.response.use(handleSuccessResponse);
}

const MUTATING_METHODS = ['POST', 'PUT', 'PATCH', 'DELETE'];

/**
 * POST endpoints that fetch data rather than mutate it.
 * These should not trigger a success toast notification.
 */
// Keep these patterns lowercase; matching is case-insensitive.
const TOAST_EXCLUDED_URLS = ['/api/alert', '/api/auth/login', '/api/auth/portallogin'];

function isMutatingMethod(method: string | undefined): boolean {
  if (typeof method !== 'string') return false;
  return MUTATING_METHODS.includes(method.toUpperCase());
}

function isToastExcluded(url: string | undefined): boolean {
  if (typeof url !== 'string') return false;
  const normalizedUrl = url.toLowerCase();
  return TOAST_EXCLUDED_URLS.some((excluded) => normalizedUrl.endsWith(excluded));
}

const DEFAULT_SUCCESS_MESSAGE = 'errors.savedSuccessfully';
const LOG_CONTEXT = 'responseNormalizer';

/**
 * Handles a successful response by emitting a toast for mutations.
 * Skips endpoints listed in TOAST_EXCLUDED_URLS (data-fetching POSTs).
 */
function handleSuccessResponse(response: AxiosResponse): AxiosResponse {
  try {
    const method = response.config.method;
    if (!isMutatingMethod(method)) return response;
    if (isToastExcluded(response.config.url)) return response;

    const message = extractMessageFromBody(response.data) ?? DEFAULT_SUCCESS_MESSAGE;
    apiEventBus.emit({
      type: 'toast',
      severity: ErrorSeverity.Info,
      message: String(message),
    });
  } catch (emitError) {
    logger.warn(LOG_CONTEXT, 'Failed to emit success notification', emitError);
  }

  return response;
}

export { registerResponseNormalizer, handleSuccessResponse, extractMessageFromBody };
