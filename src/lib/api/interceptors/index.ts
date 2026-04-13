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
 *   1. auth       (logout on 401)
 *   2. normalizer (emits success toast)
 *   3. error classifier (classifies remaining errors)
 */

import { registerAuthInterceptor, registerAuthResponseInterceptor } from './authInterceptor';
import { registerErrorClassifier } from './errorClassifier';
import { registerLoggingInterceptor } from './loggingInterceptor';
import { registerResponseNormalizer } from './responseNormalizer';
import { registerTenantInterceptor } from './tenantInterceptor';

import type { AxiosInstance } from 'axios';

/** Tracks registered instances across Vite HMR reloads (WeakSet allows GC of discarded instances) */
const registeredInstances = new WeakSet<AxiosInstance>();

/**
 * Registers all interceptors on the provided Axios instance.
 *
 * Idempotent — safe to call multiple times (e.g. during Vite HMR).
 * Without this guard, each HMR reload of App.tsx stacks duplicate
 * interceptors, causing every request to log N times.
 */
function registerInterceptors(instance: AxiosInstance): void {
  if (registeredInstances.has(instance)) return;
  registeredInstances.add(instance);

  // Request interceptors (registered order = reverse execution order)
  registerLoggingInterceptor(instance);
  registerTenantInterceptor(instance);
  registerAuthInterceptor(instance);

  // Response interceptors (registered order = execution order)
  registerAuthResponseInterceptor(instance);
  registerResponseNormalizer(instance);
  registerErrorClassifier(instance);
}

export { registerInterceptors };

// Re-export individual registrations for selective use
export { registerAuthInterceptor, registerAuthResponseInterceptor } from './authInterceptor';
export { registerTenantInterceptor } from './tenantInterceptor';
export { registerResponseNormalizer } from './responseNormalizer';
export { registerErrorClassifier } from './errorClassifier';
export { registerLoggingInterceptor } from './loggingInterceptor';
