/**
 * Converts raw AxiosError objects into structured ClassifiedError instances.
 *
 * This is pure classification logic with no side effects. The classifier
 * extracts all relevant context from the error so downstream consumers
 * (matcher, actions, reporting) work with a clean, normalized shape.
 */

import { isValueDefined } from '@/utils/is';

import type { ClassifiedError, HttpMethod } from './errorTypes';
import type { AxiosError, AxiosResponse } from 'axios';

/** Error code Axios uses for request timeouts */
const TIMEOUT_ERROR_CODE = 'ECONNABORTED';

/** Status code representing a network error (no response received) */
const NETWORK_ERROR_STATUS = 0;

/** Common header names for request correlation IDs */
const CORRELATION_HEADERS = ['x-request-id', 'x-correlation-id'];

function isRecord(value: unknown): value is Record<string, unknown> {
  return isValueDefined(value) && typeof value === 'object';
}

function extractErrorCode(data: unknown): string | undefined {
  if (!isRecord(data)) return undefined;

  if (typeof data['code'] === 'string') return data['code'];
  if (typeof data['errorCode'] === 'string') return data['errorCode'];
  if (typeof data['error'] === 'string') return data['error'];

  return undefined;
}

function extractErrorMessage(error: AxiosError): string {
  const data = error.response?.data;
  if (isRecord(data)) {
    if (typeof data['message'] === 'string' && data['message'] !== '')
      return data['message'];
    if (typeof data['detail'] === 'string' && data['detail'] !== '')
      return data['detail'];
    if (typeof data['error'] === 'string' && data['error'] !== '')
      return data['error'];
    if (typeof data['title'] === 'string' && data['title'] !== '')
      return data['title'];
  }

  return error.message;
}

function extractRequestId(response: AxiosResponse | undefined): string | undefined {
  if (!isValueDefined(response)) return undefined;

  const headers: unknown = response.headers;
  if (!isRecord(headers)) return undefined;

  for (const headerName of CORRELATION_HEADERS) {
    const headerValue: unknown = headers[headerName];
    if (typeof headerValue === 'string' && headerValue !== '') return headerValue;
  }

  return undefined;
}

const VALID_HTTP_METHODS: Record<string, HttpMethod | undefined> = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
};

function resolveHttpMethod(error: AxiosError): HttpMethod {
  const method = error.config?.method?.toUpperCase() ?? '';
  return VALID_HTTP_METHODS[method] ?? 'GET';
}

function resolveStatus(error: AxiosError): number {
  if (isValueDefined(error.response))
    return error.response.status;

  if (error.code === TIMEOUT_ERROR_CODE)
    return NETWORK_ERROR_STATUS;

  return NETWORK_ERROR_STATUS;
}

/**
 * Convert an AxiosError into a ClassifiedError with all context extracted.
 */
function classifyError(error: AxiosError): ClassifiedError {
  const errorCode = extractErrorCode(error.response?.data);
  const resolvedCode = errorCode ?? (error.code === TIMEOUT_ERROR_CODE ? TIMEOUT_ERROR_CODE : undefined);
  const requestId = extractRequestId(error.response);

  return {
    status: resolveStatus(error),
    url: error.config?.url ?? '',
    method: resolveHttpMethod(error),
    message: extractErrorMessage(error),
    body: error.response?.data,
    originalError: error,
    timestamp: Date.now(),
    ...(isValueDefined(resolvedCode) ? { errorCode: resolvedCode } : {}),
    ...(isValueDefined(requestId) ? { requestId } : {}),
  };
}

export { classifyError, extractErrorCode, extractErrorMessage, extractRequestId };
