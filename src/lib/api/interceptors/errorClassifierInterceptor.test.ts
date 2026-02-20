import { vi, describe, it, expect, beforeEach } from 'vitest';

const mockLoggerWarn = vi.fn();

vi.mock('@/utils/is', () => ({
  isValueDefined: (v: unknown) => v !== null && v !== undefined,
}));
vi.mock('@/utils/logger', () => ({
  logger: {
    warn: mockLoggerWarn,
    error: vi.fn(),
    info: vi.fn(),
    debug: vi.fn(),
  },
}));

// Mock the error system modules
const mockClassifyError = vi.fn();
const mockMatchError = vi.fn();
const mockExecuteErrorAction = vi.fn();

vi.mock('@/lib/api/errors/errorClassifier', () => ({
  classifyError: mockClassifyError,
}));
vi.mock('@/lib/api/errors/errorMatcher', () => ({
  matchError: mockMatchError,
}));
vi.mock('@/lib/api/errors/errorActions', () => ({
  executeErrorAction: mockExecuteErrorAction,
}));

describe('errorClassifierInterceptor', () => {
  beforeEach(() => {
    mockLoggerWarn.mockClear();
    mockClassifyError.mockClear();
    mockMatchError.mockClear();
    mockExecuteErrorAction.mockClear();
  });

  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  let interceptorModule: typeof import('./errorClassifier');

  beforeEach(async () => {
    interceptorModule = await import('./errorClassifier');
  });

  describe('handleResponseError', () => {
    it('rejects with the original error for AxiosErrors', async () => {
      const classified = { status: 400, url: '/api/test', method: 'GET', message: 'Bad Request' };
      mockClassifyError.mockReturnValue(classified);
      mockMatchError.mockReturnValue({ matched: false, error: classified });

      const error = {
        isAxiosError: true,
        message: 'Request failed',
        config: { url: '/api/test', method: 'get' },
        response: { status: 400, data: {}, headers: {} },
      };

      await expect(interceptorModule.handleResponseError(error)).rejects.toBe(error);
    });

    it('rejects non-Axios errors without classification', async () => {
      const error = new Error('Non-axios error');

      await expect(interceptorModule.handleResponseError(error)).rejects.toBe(error);
      expect(mockClassifyError).not.toHaveBeenCalled();
    });

    it('logs a warning for classified errors', async () => {
      const classified = { status: 400, url: '/api/test', method: 'POST', message: 'Validation failed' };
      mockClassifyError.mockReturnValue(classified);
      mockMatchError.mockReturnValue({ matched: false, error: classified });

      const error = {
        isAxiosError: true,
        message: 'Bad request',
        config: { url: '/api/test', method: 'post' },
        response: { status: 400, data: { message: 'Validation failed' }, headers: {} },
      };

      await expect(interceptorModule.handleResponseError(error)).rejects.toBe(error);

      expect(mockLoggerWarn).toHaveBeenCalledWith(
        'errorClassifierInterceptor',
        expect.stringContaining('HTTP POST /api/test failed'),
        expect.objectContaining({ status: 400 }),
      );
    });

    it('executes error action when a rule matches', async () => {
      const classified = { status: 500, url: '/api/test', method: 'GET', message: 'Server error' };
      const mockRule = { name: 'server-error', match: { status: 500 }, action: { type: 'toast' } };
      mockClassifyError.mockReturnValue(classified);
      mockMatchError.mockReturnValue({ matched: true, rule: mockRule, error: classified });

      const error = {
        isAxiosError: true,
        message: 'Server error',
        config: { url: '/api/test', method: 'get' },
        response: { status: 500, data: {}, headers: {} },
      };

      await expect(interceptorModule.handleResponseError(error)).rejects.toBe(error);

      expect(mockExecuteErrorAction).toHaveBeenCalledWith(mockRule, classified);
    });

    it('does not execute error action when no rule matches', async () => {
      const classified = { status: 418, url: '/api/test', method: 'GET', message: 'Teapot' };
      mockClassifyError.mockReturnValue(classified);
      mockMatchError.mockReturnValue({ matched: false, error: classified });

      const error = {
        isAxiosError: true,
        message: 'Teapot',
        config: { url: '/api/test', method: 'get' },
        response: { status: 418, data: {}, headers: {} },
      };

      await expect(interceptorModule.handleResponseError(error)).rejects.toBe(error);

      expect(mockExecuteErrorAction).not.toHaveBeenCalled();
    });

    it('passes through non-object errors', async () => {
      await expect(interceptorModule.handleResponseError('string error')).rejects.toBe('string error');
      expect(mockLoggerWarn).not.toHaveBeenCalled();
    });
  });

  describe('registerErrorClassifier', () => {
    it('registers response interceptor on the axios instance', () => {
      const mockUse = vi.fn().mockReturnValue(5);
      const instance = {
        interceptors: { response: { use: mockUse } },
      };

      const id = interceptorModule.registerErrorClassifier(instance as never);

      expect(mockUse).toHaveBeenCalledTimes(1);
      expect(id).toBe(5);
    });

    it('passes response through on success', () => {
      const mockUse = vi.fn().mockReturnValue(0);
      const instance = {
        interceptors: { response: { use: mockUse } },
      };

      interceptorModule.registerErrorClassifier(instance as never);

      const onFulfilled = mockUse.mock.calls[0]?.[0];
      const response = { data: { ok: true }, status: 200 };
      const result = onFulfilled(response);

      expect(result).toBe(response);
    });
  });
});
