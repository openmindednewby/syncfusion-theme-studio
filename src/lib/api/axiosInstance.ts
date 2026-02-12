/**
 * Clean Axios instance with base configuration.
 *
 * No interceptors are registered here. They are registered
 * separately via registerInterceptors() from the interceptors module.
 *
 * No baseURL is set — each mutator provides its own URL/baseURL
 * so the same instance can serve multiple backend services.
 */

import axios from 'axios';

import type { AxiosInstance } from 'axios';

const HTTP_TIMEOUT_MS = 30000;

export const apiClient: AxiosInstance = axios.create({
  timeout: HTTP_TIMEOUT_MS,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});
