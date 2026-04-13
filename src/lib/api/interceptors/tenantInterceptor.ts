/**
 * Request interceptor: tenant header stub.
 *
 * No-op for now. When multi-tenancy is implemented, this interceptor
 * will read the tenant ID from the appropriate source and attach
 * the X-Tenant-Id header to every outgoing request.
 *
 * TODO: Implement when multi-tenant backend is available
 */

import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

/**
 * No-op: returns config unchanged.
 * Will be wired to attach tenant headers when multi-tenancy is implemented.
 */
function attachTenantHeader(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
  // TODO: Attach X-Tenant-Id header when tenant source is available
  return config;
}

/**
 * Registers the tenant request interceptor on an Axios instance.
 * @returns The interceptor ID for potential ejection.
 */
function registerTenantInterceptor(instance: AxiosInstance): number {
  return instance.interceptors.request.use(attachTenantHeader);
}

export { registerTenantInterceptor, attachTenantHeader };
