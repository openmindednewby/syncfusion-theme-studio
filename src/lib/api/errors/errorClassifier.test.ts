import { describe, it, expect } from 'vitest';

import { classifyError, extractErrorCode, extractErrorMessage, extractRequestId } from './errorClassifier';

import type { AxiosError, AxiosHeaders, AxiosResponse } from 'axios';

/** Minimal headers shape that satisfies AxiosError['config']['headers'] */
const EMPTY_HEADERS: AxiosHeaders = Object.create(null);

function createAxiosError(overrides: Partial<AxiosError> = {}): AxiosError {
  // @ts-expect-error - minimal AxiosError mock for testing
  const base: AxiosError = Object.assign(new Error('Request failed'), {
    config: { url: '/api/test', method: 'get', headers: EMPTY_HEADERS },
    response: undefined,
    isAxiosError: true,
    name: 'AxiosError',
    code: undefined,
    toJSON: () => ({}),
  });

  return Object.assign(base, overrides);
}

function createAxiosResponse(overrides: Partial<AxiosResponse> = {}): AxiosResponse {
  const base: AxiosResponse = {
    data: {},
    status: 200,
    statusText: 'OK',
    headers: {},
    config: { headers: EMPTY_HEADERS },
  };
  return Object.assign(base, overrides);
}

describe('errorClassifier', () => {
  describe('extractErrorCode', () => {
    it('extracts code from data.code', () => {
      expect(extractErrorCode({ code: 'VALIDATION_ERROR' })).toBe('VALIDATION_ERROR');
    });

    it('extracts code from data.errorCode', () => {
      expect(extractErrorCode({ errorCode: 'FEATURE_GATED' })).toBe('FEATURE_GATED');
    });

    it('extracts code from data.error', () => {
      expect(extractErrorCode({ error: 'UNAUTHORIZED' })).toBe('UNAUTHORIZED');
    });

    it('returns undefined for non-object data', () => {
      expect(extractErrorCode(null)).toBeUndefined();
      expect(extractErrorCode(undefined)).toBeUndefined();
      expect(extractErrorCode('string')).toBeUndefined();
    });

    it('returns undefined when no code fields present', () => {
      expect(extractErrorCode({ message: 'error' })).toBeUndefined();
    });
  });

  describe('extractErrorMessage', () => {
    it('extracts message from response.data.message', () => {
      const error = createAxiosError({
        response: createAxiosResponse({ data: { message: 'Validation failed' } }),
      });
      expect(extractErrorMessage(error)).toBe('Validation failed');
    });

    it('extracts message from response.data.detail', () => {
      const error = createAxiosError({
        response: createAxiosResponse({ data: { detail: 'Detailed error info' } }),
      });
      expect(extractErrorMessage(error)).toBe('Detailed error info');
    });

    it('falls back to error.message when no response', () => {
      const error = createAxiosError({
        message: 'Network error',
      });
      expect(extractErrorMessage(error)).toBe('Network error');
    });
  });

  describe('extractRequestId', () => {
    it('extracts x-request-id header', () => {
      const response = createAxiosResponse({
        headers: { 'x-request-id': 'req-123' },
      });
      expect(extractRequestId(response)).toBe('req-123');
    });

    it('extracts x-correlation-id header', () => {
      const response = createAxiosResponse({
        headers: { 'x-correlation-id': 'corr-456' },
      });
      expect(extractRequestId(response)).toBe('corr-456');
    });

    it('returns undefined when no correlation headers', () => {
      const response = createAxiosResponse({
        headers: { 'content-type': 'application/json' },
      });
      expect(extractRequestId(response)).toBeUndefined();
    });

    it('returns undefined when response is undefined', () => {
      expect(extractRequestId(undefined)).toBeUndefined();
    });
  });

  describe('classifyError', () => {
    it('extracts status from response', () => {
      const error = createAxiosError({
        response: createAxiosResponse({ status: 404, data: {} }),
      });
      const classified = classifyError(error);
      expect(classified.status).toBe(404);
    });

    it('sets status to 0 for network errors (no response)', () => {
      const error = createAxiosError();
      const classified = classifyError(error);
      expect(classified.status).toBe(0);
    });

    it('sets status to 0 for timeout errors', () => {
      const error = createAxiosError({
        code: 'ECONNABORTED',
      });
      const classified = classifyError(error);
      expect(classified.status).toBe(0);
    });

    it('extracts url from config', () => {
      const error = createAxiosError({
        config: { url: '/api/templates/123', method: 'get', headers: EMPTY_HEADERS },
      });
      const classified = classifyError(error);
      expect(classified.url).toBe('/api/templates/123');
    });

    it('resolves HTTP method from config', () => {
      const error = createAxiosError({
        config: { url: '/api/test', method: 'post', headers: EMPTY_HEADERS },
      });
      const classified = classifyError(error);
      expect(classified.method).toBe('POST');
    });

    it('defaults method to GET when not specified', () => {
      const error = createAxiosError({
        config: { url: '/api/test', headers: EMPTY_HEADERS },
      } as Partial<AxiosError>);
      const classified = classifyError(error);
      expect(classified.method).toBe('GET');
    });

    it('sets errorCode to ECONNABORTED for timeout errors', () => {
      const error = createAxiosError({
        code: 'ECONNABORTED',
      });
      const classified = classifyError(error);
      expect(classified.errorCode).toBe('ECONNABORTED');
    });

    it('includes timestamp', () => {
      const before = Date.now();
      const error = createAxiosError({
        response: createAxiosResponse({ status: 500 }),
      });
      const classified = classifyError(error);
      const after = Date.now();

      expect(classified.timestamp).toBeGreaterThanOrEqual(before);
      expect(classified.timestamp).toBeLessThanOrEqual(after);
    });

    it('preserves original error reference', () => {
      const error = createAxiosError();
      const classified = classifyError(error);
      expect(classified.originalError).toBe(error);
    });
  });
});
