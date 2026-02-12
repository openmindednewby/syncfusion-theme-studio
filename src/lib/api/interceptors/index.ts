/**
 * Interceptor registration module.
 *
 * Registers all interceptors on an Axios instance in the correct order.
 *
 * Request interceptors run in REVERSE order of registration, so:
 *   1. logging (registered first, runs last = logs the FINAL config)
 *   2. tenant  (registered second, runs second = injects tenant header)
 *   3. auth    (registered third, runs first = injects auth header)
 *
 * Response interceptors run in ORDER of registration, so:
 *   1. logging    (logs response/error first)
 *   2. normalizer (emits success toast)
 *   3. error classifier (classifies remaining errors)
 */

import { registerAuthInterceptor } from './authInterceptor';
import { registerErrorClassifier } from './errorClassifier';
import { registerLoggingInterceptor } from './loggingInterceptor';
import { registerResponseNormalizer } from './responseNormalizer';
import { registerTenantInterceptor } from './tenantInterceptor';

import type { AxiosInstance } from 'axios';

/**
 * Registers all interceptors on the provided Axios instance.
 *
 * Call this once during application bootstrap after creating the
 * axios instance.
 */
function registerInterceptors(instance: AxiosInstance): void {
  // Request interceptors (registered order = reverse execution order)
  registerLoggingInterceptor(instance);
  registerTenantInterceptor(instance);
  registerAuthInterceptor(instance);

  // Response interceptors (registered order = execution order)
  registerResponseNormalizer(instance);
  registerErrorClassifier(instance);
}

export { registerInterceptors };

// Re-export individual registrations for selective use
export { registerAuthInterceptor } from './authInterceptor';
export { registerTenantInterceptor } from './tenantInterceptor';
export { registerResponseNormalizer } from './responseNormalizer';
export { registerErrorClassifier } from './errorClassifier';
export { registerLoggingInterceptor } from './loggingInterceptor';
