/**
 * Error matching engine.
 *
 * Checks a ClassifiedError against the error registry rules in priority order.
 * All fields in a matcher are AND conditions (all must match).
 * Unspecified fields match anything. First matching rule wins.
 */

import { isValueDefined } from '@/utils/is';

import { getErrorRules } from './errorRegistry';

import type {
  ClassifiedError,
  ErrorMatchResult,
  ErrorMatcher,
  ErrorRule,
  HttpMethod,
  StatusRange,
} from './errorTypes';

function isStatusRange(value: unknown): value is StatusRange {
  if (typeof value !== 'object') return false;
  if (!isValueDefined(value)) return false;
  return 'min' in value && 'max' in value;
}

function matchesStatus(errorStatus: number, matcherStatus: number | number[] | StatusRange): boolean {
  if (typeof matcherStatus === 'number')
    return errorStatus === matcherStatus;

  if (Array.isArray(matcherStatus))
    return matcherStatus.includes(errorStatus);

  if (isStatusRange(matcherStatus))
    return errorStatus >= matcherStatus.min && errorStatus <= matcherStatus.max;

  return false;
}

function matchesPath(errorUrl: string, matcherPath: string | RegExp): boolean {
  if (typeof matcherPath === 'string')
    return errorUrl.includes(matcherPath);

  return matcherPath.test(errorUrl);
}

function matchesMethod(errorMethod: HttpMethod, matcherMethod: HttpMethod | HttpMethod[]): boolean {
  const normalizedError = errorMethod.toUpperCase();

  if (typeof matcherMethod === 'string')
    return normalizedError === matcherMethod.toUpperCase();

  return matcherMethod.some((m) => normalizedError === m.toUpperCase());
}

function matchesErrorCode(errorCode: string | undefined, matcherCode: string | string[]): boolean {
  if (!isValueDefined(errorCode)) return false;

  if (typeof matcherCode === 'string')
    return errorCode === matcherCode;

  return matcherCode.includes(errorCode);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return isValueDefined(value) && typeof value === 'object';
}

function matchesBodyField(body: unknown, field: { key: string; value: unknown }): boolean {
  if (!isRecord(body)) return false;

  const actual: unknown = body[field.key];
  return JSON.stringify(actual) === JSON.stringify(field.value);
}

/**
 * Check if a classified error satisfies all conditions in a matcher.
 * All specified fields must match (AND logic). Unspecified fields are ignored.
 */
function matchesRule(error: ClassifiedError, matcher: ErrorMatcher): boolean {
  if (isValueDefined(matcher.status) && !matchesStatus(error.status, matcher.status))
    return false;

  if (isValueDefined(matcher.path) && !matchesPath(error.url, matcher.path))
    return false;

  if (isValueDefined(matcher.method) && !matchesMethod(error.method, matcher.method))
    return false;

  if (isValueDefined(matcher.errorCode) && !matchesErrorCode(error.errorCode, matcher.errorCode))
    return false;

  if (isValueDefined(matcher.bodyField) && !matchesBodyField(error.body, matcher.bodyField))
    return false;

  return true;
}

/**
 * Match a classified error against the error registry.
 * Rules are checked in priority order (highest first).
 * First matching rule wins.
 */
function matchError(error: ClassifiedError): ErrorMatchResult {
  const rules: readonly ErrorRule[] = getErrorRules();

  for (const rule of rules) {
    if (isValueDefined(rule.skipIf) && rule.skipIf(error)) continue;
    if (matchesRule(error, rule.match))
      return { matched: true, rule, error };
  }

  return { matched: false, error };
}

export { matchError, matchesRule, matchesStatus, matchesPath, matchesMethod };
