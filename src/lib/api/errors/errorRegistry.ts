/**
 * Declarative error-to-action mapping table.
 *
 * The error registry is the core "routing table" that maps HTTP error
 * conditions to UI actions. Rules are matched in priority order
 * (highest first). The first matching rule wins.
 *
 * To add a new error handler, simply add an entry to DEFAULT_ERROR_RULES
 * or call registerErrorRule() at runtime for feature-specific rules.
 */

import { ErrorActionType, ErrorSeverity } from './errorTypes';

import type { ClassifiedError, ErrorRule } from './errorTypes';

/** Priority levels for error rules (higher = checked first) */
const PRIORITY_ROUTE_SPECIFIC = 20;
const PRIORITY_FEATURE_GATED = 10;
const PRIORITY_MAINTENANCE = 5;
const PRIORITY_DEFAULT = 0;

/** Auth endpoint patterns that should not trigger session-expired redirects */
const AUTH_PATTERNS = ['/auth/login', '/auth/refresh', '/auth/verify-otp'];

/** Login redirect path */
const LOGIN_PATH = '/';

/** Error code for connection abort / timeout */
const ERROR_CODE_TIMEOUT = 'ECONNABORTED';
/** Error code for feature gating */
const ERROR_CODE_FEATURE_GATED = 'FEATURE_GATED';

/** HTTP status codes used in matching rules */
const STATUS_UNAUTHORIZED = 401;
const STATUS_PAYMENT_REQUIRED = 402;
const STATUS_FORBIDDEN = 403;
const STATUS_BAD_REQUEST = 400;
const STATUS_UNPROCESSABLE = 422;
const STATUS_CONFLICT = 409;
const STATUS_TOO_MANY_REQUESTS = 429;
const STATUS_SERVER_ERROR_MIN = 500;
const STATUS_SERVER_ERROR_MAX = 599;
const STATUS_BAD_GATEWAY = 502;
const STATUS_SERVICE_UNAVAILABLE = 503;
const STATUS_GATEWAY_TIMEOUT = 504;
const STATUS_NETWORK_ERROR = 0;

function isAuthEndpoint(url: string): boolean {
  return AUTH_PATTERNS.some((pattern) => url.includes(pattern));
}

/**
 * Default error rules covering all common HTTP error scenarios.
 * Rules are listed in logical grouping order; priority determines
 * actual evaluation order at runtime.
 */
const DEFAULT_ERROR_RULES: ErrorRule[] = [
  // --- Feature-Gated (must be checked before generic 403) ---
  {
    name: 'feature-gated',
    match: { status: STATUS_FORBIDDEN, errorCode: ERROR_CODE_FEATURE_GATED },
    action: {
      type: ErrorActionType.Modal,
      severity: ErrorSeverity.Info,
      modalComponent: 'FeatureGateModal',
    },
    messageKey: 'errors.featureNotAvailable',
    priority: PRIORITY_FEATURE_GATED,
  },

  // --- Maintenance Mode (must be checked before generic 5xx) ---
  {
    name: 'maintenance-mode',
    match: { status: STATUS_SERVICE_UNAVAILABLE },
    action: {
      type: ErrorActionType.Modal,
      severity: ErrorSeverity.Warning,
      modalComponent: 'MaintenanceModal',
    },
    messageKey: 'errors.maintenance',
    priority: PRIORITY_MAINTENANCE,
  },

  // --- Auth Errors ---
  {
    name: 'session-expired',
    match: { status: STATUS_UNAUTHORIZED },
    action: {
      type: ErrorActionType.Redirect,
      target: LOGIN_PATH,
      suppressError: true,
    },
    messageKey: 'errors.sessionExpired',
    priority: PRIORITY_DEFAULT,
    skipIf: (error: ClassifiedError) => isAuthEndpoint(error.url),
  },
  {
    name: 'forbidden',
    match: { status: STATUS_FORBIDDEN },
    action: { type: ErrorActionType.Toast, severity: ErrorSeverity.Error },
    messageKey: 'errors.forbidden',
    priority: PRIORITY_DEFAULT,
  },

  // --- Subscription/Payment ---
  {
    name: 'subscription-required',
    match: { status: STATUS_PAYMENT_REQUIRED },
    action: {
      type: ErrorActionType.Modal,
      severity: ErrorSeverity.Warning,
      modalComponent: 'UpgradePrompt',
    },
    messageKey: 'errors.subscriptionRequired',
    priority: PRIORITY_DEFAULT,
  },

  // --- Validation Errors ---
  {
    name: 'validation-error',
    match: { status: [STATUS_BAD_REQUEST, STATUS_UNPROCESSABLE] },
    action: { type: ErrorActionType.Toast, severity: ErrorSeverity.Warning },
    messageKey: 'errors.validationFailed',
    priority: PRIORITY_DEFAULT,
  },

  // --- Conflict ---
  {
    name: 'conflict',
    match: { status: STATUS_CONFLICT },
    action: { type: ErrorActionType.Toast, severity: ErrorSeverity.Warning },
    messageKey: 'errors.conflict',
    priority: PRIORITY_DEFAULT,
  },

  // --- Rate Limiting ---
  {
    name: 'rate-limited',
    match: { status: STATUS_TOO_MANY_REQUESTS },
    action: { type: ErrorActionType.Toast, severity: ErrorSeverity.Warning },
    messageKey: 'errors.tooManyRequests',
    priority: PRIORITY_DEFAULT,
  },

  // --- Server Errors ---
  {
    name: 'bad-gateway',
    match: { status: [STATUS_BAD_GATEWAY, STATUS_GATEWAY_TIMEOUT] },
    action: { type: ErrorActionType.Toast, severity: ErrorSeverity.Error },
    messageKey: 'errors.badGateway',
    priority: PRIORITY_DEFAULT,
  },
  {
    name: 'server-error',
    match: { status: { min: STATUS_SERVER_ERROR_MIN, max: STATUS_SERVER_ERROR_MAX } },
    action: {
      type: ErrorActionType.Toast,
      severity: ErrorSeverity.Error,
      reportToMonitoring: true,
    },
    messageKey: 'errors.serverError',
    priority: PRIORITY_DEFAULT,
  },

  // --- Network Errors ---
  {
    name: 'network-offline',
    match: { status: STATUS_NETWORK_ERROR },
    action: { type: ErrorActionType.Toast, severity: ErrorSeverity.Warning },
    messageKey: 'errors.networkOffline',
    priority: PRIORITY_DEFAULT,
  },
  {
    name: 'request-timeout',
    match: { errorCode: ERROR_CODE_TIMEOUT },
    action: { type: ErrorActionType.Toast, severity: ErrorSeverity.Warning },
    messageKey: 'errors.requestTimeout',
    priority: PRIORITY_DEFAULT,
  },
];

/** Internal mutable copy of rules, sorted by priority descending */
let sortedRules: ErrorRule[] = sortByPriority([...DEFAULT_ERROR_RULES]);

function sortByPriority(rules: ErrorRule[]): ErrorRule[] {
  return rules.sort((a, b) => (b.priority ?? PRIORITY_DEFAULT) - (a.priority ?? PRIORITY_DEFAULT));
}

/**
 * Returns the current set of error rules, sorted by priority (highest first).
 */
function getErrorRules(): readonly ErrorRule[] {
  return sortedRules;
}

/**
 * Register a new error rule at runtime.
 * Useful for feature modules that need their own error handling.
 * Rules are re-sorted by priority after registration.
 */
function registerErrorRule(rule: ErrorRule): void {
  sortedRules = sortByPriority([...sortedRules, rule]);
}

/**
 * Reset the registry to the default rules.
 * Primarily intended for testing.
 */
function resetErrorRules(): void {
  sortedRules = sortByPriority([...DEFAULT_ERROR_RULES]);
}

export {
  getErrorRules,
  registerErrorRule,
  resetErrorRules,
  DEFAULT_ERROR_RULES,
  isAuthEndpoint,
  PRIORITY_ROUTE_SPECIFIC,
  PRIORITY_FEATURE_GATED,
  PRIORITY_MAINTENANCE,
  PRIORITY_DEFAULT,
};
