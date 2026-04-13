
import { useAuthStore } from '@/stores/useAuthStore';
import { isValueDefined } from '@/utils/is';

import type { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

function registerAuthInterceptor(instance: AxiosInstance): number {
  return instance.interceptors.request.use(attachAuthHeader);
}

function registerAuthResponseInterceptor(instance: AxiosInstance): number {
  return instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    handleUnauthorizedResponse,
  );
}

const BEARER_PREFIX = 'Bearer ';
const AUTH_HEADER = 'Authorization';
const HTTP_UNAUTHORIZED = 401;

function attachAuthHeader(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
  const token = useAuthStore.getState().token;
  if (isValueDefined(token)) config.headers.set(AUTH_HEADER, `${BEARER_PREFIX}${token}`);
  return config;
}

async function handleUnauthorizedResponse(error: AxiosError): Promise<never> {
  const status = error.response?.status;
  if (status === HTTP_UNAUTHORIZED) useAuthStore.getState().logout();
  return Promise.reject(error);
}

export {
  registerAuthInterceptor,
  registerAuthResponseInterceptor,
  attachAuthHeader,
  handleUnauthorizedResponse,
};
