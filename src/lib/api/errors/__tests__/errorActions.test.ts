import { vi, describe, it, expect, beforeEach } from 'vitest';

import type { ClassifiedError, ErrorRule } from '../errorTypes';

// Use const enum values inline since they're erased at compile time
const ACTION_TYPE_TOAST = 'toast';
const ACTION_TYPE_MODAL = 'modal';
const ACTION_TYPE_REDIRECT = 'redirect';
const ACTION_TYPE_SILENT = 'silent';
const ACTION_TYPE_CUSTOM = 'custom';

const SEVERITY_ERROR = 'error';
const SEVERITY_WARNING = 'warning';

const mockEmit = vi.fn();
const mockReportToMonitoring = vi.fn();
const mockLoggerWarn = vi.fn();
const mockLoggerError = vi.fn();
const mockLoggerInfo = vi.fn();

vi.mock('@/lib/api/events/apiEventBus', () => ({
  apiEventBus: { emit: mockEmit },
}));
vi.mock('@/lib/api/errors/errorReporter', () => ({
  reportToMonitoring: mockReportToMonitoring,
}));
vi.mock('@/utils/logger', () => ({
  logger: {
    warn: mockLoggerWarn,
    error: mockLoggerError,
    info: mockLoggerInfo,
    debug: vi.fn(),
  },
}));

function createClassifiedError(overrides: Partial<ClassifiedError> = {}): ClassifiedError {
  return {
    status: 500,
    url: '/api/test',
    method: 'GET',
    message: 'Server error occurred',
    originalError: new Error('test'),
    timestamp: Date.now(),
    ...overrides,
  };
}

describe('errorActions', () => {
  beforeEach(() => {
    mockEmit.mockClear();
    mockReportToMonitoring.mockClear();
    mockLoggerWarn.mockClear();
    mockLoggerError.mockClear();
    mockLoggerInfo.mockClear();
  });

  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  let errorActions: typeof import('../errorActions');

  beforeEach(async () => {
    errorActions = await import('../errorActions');
  });

  describe('executeErrorAction', () => {
    it('emits toast event for toast action type', () => {
      const error = createClassifiedError();
      const rule: ErrorRule = {
        name: 'test-toast',
        match: { status: 500 },
        action: { type: ACTION_TYPE_TOAST as never, severity: SEVERITY_ERROR as never },
        messageKey: 'errors.serverError',
      };

      errorActions.executeErrorAction(rule, error);

      expect(mockEmit).toHaveBeenCalledWith({
        type: 'toast',
        severity: SEVERITY_ERROR,
        message: 'errors.serverError',
      });
    });

    it('emits modal event for modal action type', () => {
      const error = createClassifiedError();
      const rule: ErrorRule = {
        name: 'test-modal',
        match: { status: 503 },
        action: {
          type: ACTION_TYPE_MODAL as never,
          severity: SEVERITY_WARNING as never,
          modalComponent: 'MaintenanceModal',
        },
        messageKey: 'errors.maintenance',
      };

      errorActions.executeErrorAction(rule, error);

      expect(mockEmit).toHaveBeenCalledWith({
        type: 'modal',
        modalComponent: 'MaintenanceModal',
        message: 'errors.maintenance',
        severity: SEVERITY_WARNING,
      });
    });

    it('emits redirect event for redirect action type', () => {
      const error = createClassifiedError();
      const rule: ErrorRule = {
        name: 'test-redirect',
        match: { status: 401 },
        action: { type: ACTION_TYPE_REDIRECT as never, target: '/' },
        messageKey: 'errors.sessionExpired',
      };

      errorActions.executeErrorAction(rule, error);

      expect(mockEmit).toHaveBeenCalledWith({
        type: 'redirect',
        target: '/',
        message: 'errors.sessionExpired',
      });
    });

    it('does not emit event for silent action type', () => {
      const error = createClassifiedError();
      const rule: ErrorRule = {
        name: 'test-silent',
        match: { status: 404 },
        action: { type: ACTION_TYPE_SILENT as never },
        messageKey: 'errors.notFound',
      };

      errorActions.executeErrorAction(rule, error);

      expect(mockEmit).not.toHaveBeenCalled();
      expect(mockLoggerInfo).toHaveBeenCalledWith(
        'errorActions',
        expect.stringContaining('Silent error: test-silent'),
        expect.any(Object),
      );
    });

    it('calls reportToMonitoring when reportToMonitoring is true', () => {
      const error = createClassifiedError();
      const rule: ErrorRule = {
        name: 'test-report',
        match: { status: 500 },
        action: {
          type: ACTION_TYPE_TOAST as never,
          severity: SEVERITY_ERROR as never,
          reportToMonitoring: true,
        },
        messageKey: 'errors.serverError',
      };

      errorActions.executeErrorAction(rule, error);

      expect(mockReportToMonitoring).toHaveBeenCalledWith(error);
    });

    it('does not call reportToMonitoring when not specified', () => {
      const error = createClassifiedError();
      const rule: ErrorRule = {
        name: 'test-no-report',
        match: { status: 400 },
        action: { type: ACTION_TYPE_TOAST as never, severity: SEVERITY_WARNING as never },
        messageKey: 'errors.validation',
      };

      errorActions.executeErrorAction(rule, error);

      expect(mockReportToMonitoring).not.toHaveBeenCalled();
    });
  });

  describe('resolveMessage', () => {
    it('returns messageKey when provided', () => {
      const error = createClassifiedError();
      const rule: ErrorRule = {
        name: 'test',
        match: {},
        action: { type: ACTION_TYPE_TOAST as never },
        messageKey: 'errors.test',
      };

      const message = errorActions.resolveMessage(rule, error);

      expect(message).toBe('errors.test');
    });

    it('returns fallbackMessage when no messageKey', () => {
      const error = createClassifiedError();
      const rule: ErrorRule = {
        name: 'test',
        match: {},
        action: { type: ACTION_TYPE_TOAST as never },
        fallbackMessage: 'Something went wrong',
      };

      const message = errorActions.resolveMessage(rule, error);

      expect(message).toBe('Something went wrong');
    });

    it('returns error.message when no messageKey and no fallbackMessage', () => {
      const error = createClassifiedError({ message: 'Original error message' });
      const rule: ErrorRule = {
        name: 'test',
        match: {},
        action: { type: ACTION_TYPE_TOAST as never },
      };

      const message = errorActions.resolveMessage(rule, error);

      expect(message).toBe('Original error message');
    });

    it('returns generic message when error.message is empty', () => {
      const error = createClassifiedError({ message: '' });
      const rule: ErrorRule = {
        name: 'test',
        match: {},
        action: { type: ACTION_TYPE_TOAST as never },
      };

      const message = errorActions.resolveMessage(rule, error);

      expect(message).toBe('An error occurred');
    });
  });

  describe('custom handlers', () => {
    it('executes registered custom handler', () => {
      const mockHandler = vi.fn();
      errorActions.registerCustomHandler('my-handler', mockHandler);

      const error = createClassifiedError();
      const rule: ErrorRule = {
        name: 'test-custom',
        match: {},
        action: { type: ACTION_TYPE_CUSTOM as never, handler: 'my-handler' },
      };

      errorActions.executeErrorAction(rule, error);

      expect(mockHandler).toHaveBeenCalledWith(error);
    });

    it('logs warning when custom handler is not found', () => {
      const error = createClassifiedError();
      const rule: ErrorRule = {
        name: 'test-not-found',
        match: {},
        action: { type: ACTION_TYPE_CUSTOM as never, handler: 'nonexistent' },
      };

      errorActions.executeErrorAction(rule, error);

      expect(mockLoggerWarn).toHaveBeenCalledWith(
        'errorActions',
        expect.stringContaining('Custom handler not found: nonexistent'),
      );
    });

    it('catches and logs errors thrown by custom handlers', () => {
      errorActions.registerCustomHandler('throwing-handler', () => {
        throw new Error('handler error');
      });

      const error = createClassifiedError();
      const rule: ErrorRule = {
        name: 'test-throwing',
        match: {},
        action: { type: ACTION_TYPE_CUSTOM as never, handler: 'throwing-handler' },
      };

      expect(() => errorActions.executeErrorAction(rule, error)).not.toThrow();
      expect(mockLoggerError).toHaveBeenCalledWith(
        'errorActions',
        expect.stringContaining('Custom handler "throwing-handler" threw'),
        expect.any(Error),
      );
    });
  });
});
