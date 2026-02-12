import { apiClient } from '@/lib/api/axiosInstance';

import type { AxiosRequestConfig, AxiosResponse, RawAxiosResponseHeaders } from 'axios';

// Use relative path so requests go through the Vite dev/preview proxy (avoids CORS)
const MOCKSERVER_BASE_URL = '/mockapi';

/**
 * Convert axios headers to web-standard Headers object
 */
function convertHeaders(axiosHeaders: RawAxiosResponseHeaders): Headers {
  const headers = new Headers();
  Object.entries(axiosHeaders).forEach(([key, value]) => {
    if (typeof value === 'string') headers.append(key, value);
  });
  return headers;
}

/**
 * Orval 8.x compatible mutator for the MockServer local API.
 *
 * Accepts a URL + optional RequestInit (from generated hooks) and returns
 * the { data, status, headers } shape that orval 8.x response types expect.
 *
 * Uses the shared apiClient so all interceptors (logging, error handling,
 * success toasts, etc.) apply automatically.
 */
export const mockserverInstance = async <T>(
  url: string,
  options?: RequestInit,
): Promise<T> => {
  const method = options?.method ?? 'GET';
  const headersRecord: Record<string, string> = {};

  if (options?.headers instanceof Headers)
    options.headers.forEach((value, key) => {
      headersRecord[key] = value;
    });
  else if (options?.headers) Object.assign(headersRecord, options.headers);

  const config: AxiosRequestConfig = {
    url,
    method,
    baseURL: MOCKSERVER_BASE_URL,
    headers: headersRecord,
    data: options?.body,
  };

  if (options?.signal) config.signal = options.signal;

  const response: AxiosResponse<unknown> = await apiClient(config);

  const result: unknown = {
    data: response.data,
    status: response.status,
    headers: convertHeaders(response.headers),
  };

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return result as T;
};

export default mockserverInstance;
