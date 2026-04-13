/**
 * Core type definitions for the HTTP error handling system.
 *
 * These types define the shape of classified errors, matching rules,
 * and actions that the error registry uses to declaratively map
 * HTTP errors to UI feedback.
 */

/** HTTP methods supported by the error handling system */
// eslint-disable-next-line prefer-const-enum/prefer-const-enum -- const enum causes tsc issues with isolatedModules
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/** Action types the system can take in response to errors */
const enum ErrorActionType {
  Toast = 'toast',
  Modal = 'modal',
  Redirect = 'redirect',
  Silent = 'silent',
  Retry = 'retry',
  Custom = 'custom',
}

/** Severity levels for UI feedback */
const enum ErrorSeverity {
  Info = 'info',
  Warning = 'warning',
  Error = 'error',
}

/** A classified error with all context extracted from AxiosError */
interface ClassifiedError {
  /** HTTP status code (0 for network errors) */
  status: number;
  /** Request URL */
  url: string;
  /** Request HTTP method */
  method: HttpMethod;
  /** API-specific error code from response body */
  errorCode?: string;
  /** Extracted error message */
  message: string;
  /** Raw response body */
  body?: unknown;
  /** Original AxiosError reference */
  originalError: unknown;
  /** Timestamp when the error occurred */
  timestamp: number;
  /** Correlation ID if available */
  requestId?: string;
}

/** Status match: a single code, array of codes, or a range */
interface StatusRange {
  min: number;
  max: number;
}

/** Conditions to match against an error */
interface ErrorMatcher {
  /** HTTP status code, array of codes, or min/max range */
  status?: number | number[] | StatusRange;
  /** URL path pattern (string prefix or RegExp) */
  path?: string | RegExp;
  /** HTTP method filter */
  method?: HttpMethod | HttpMethod[];
  /** Match on API-specific error codes from response body */
  errorCode?: string | string[];
  /** Match on a specific field in the error response body */
  bodyField?: { key: string; value: unknown };
}

/** What to do when an error matches a rule */
interface ErrorAction {
  /** The type of action to take */
  type: ErrorActionType;
  /** Severity level for toast/modal display */
  severity?: ErrorSeverity;
  /** Target path for redirect actions */
  target?: string;
  /** Modal component name to render */
  modalComponent?: string;
  /** Maximum retry count for retry actions */
  maxRetries?: number;
  /** Handler function name for custom actions */
  handler?: string;
  /** Whether to report this error to monitoring (Sentry, etc.) */
  reportToMonitoring?: boolean;
  /** Whether to suppress error propagation to React Query */
  suppressError?: boolean;
}

/** A single rule in the error registry */
interface ErrorRule {
  /** Human-readable name for debugging */
  name: string;
  /** Conditions to match against the error */
  match: ErrorMatcher;
  /** UI action to take when matched */
  action: ErrorAction;
  /** i18n key for the user-facing message */
  messageKey?: string;
  /** Fallback message if i18n key is not found */
  fallbackMessage?: string;
  /** Priority (higher = checked first). Default: 0 */
  priority?: number;
  /** Skip this rule if the predicate returns true */
  skipIf?: (error: ClassifiedError) => boolean;
}

/** Result of matching an error against the registry */
interface ErrorMatchResult {
  /** Whether a matching rule was found */
  matched: boolean;
  /** The matched rule, if any */
  rule?: ErrorRule;
  /** The classified error that was matched */
  error: ClassifiedError;
}

export type {
  ClassifiedError,
  StatusRange,
  ErrorMatcher,
  ErrorAction,
  ErrorRule,
  ErrorMatchResult,
};

export { ErrorActionType, ErrorSeverity };
export type { HttpMethod };
