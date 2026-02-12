/**
 * Request interceptor: auth header stub.
 *
 * No-op for now. The auth mechanism (JWT bearer tokens vs httpOnly
 * cookies) is TBD. When decided, wire this to read the token from
 * the appropriate source and attach the Authorization header.
 *
 * TODO: Implement when auth backend is available
 * - JWT approach: read token from auth store, set Bearer header
 * - httpOnly approach: rely on withCredentials (no header needed)
 */

import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

/**
 * No-op: returns config unchanged.
 * Will be wired to attach auth headers when auth is implemented.
 */
function attachAuthHeader(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
  // TODO: Attach Authorization header when auth mechanism is decided
  return config;
}

/**
 * Registers the auth request interceptor on an Axios instance.
 * @returns The interceptor ID for potential ejection.
 */
function registerAuthInterceptor(instance: AxiosInstance): number {
  return instance.interceptors.request.use(attachAuthHeader);
}

export { registerAuthInterceptor, attachAuthHeader };
