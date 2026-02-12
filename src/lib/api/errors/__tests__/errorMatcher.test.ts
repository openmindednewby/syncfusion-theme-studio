import { describe, it, expect, afterEach } from 'vitest';

import { matchError, matchesRule, matchesStatus, matchesPath, matchesMethod } from '../errorMatcher';
import { resetErrorRules, registerErrorRule, PRIORITY_ROUTE_SPECIFIC } from '../errorRegistry';
import { ErrorActionType } from '../errorTypes';

import type { ClassifiedError, ErrorMatcher, ErrorRule } from '../errorTypes';

function createClassifiedError(overrides: Partial<ClassifiedError> = {}): ClassifiedError {
  return {
    status: 500,
    url: '/api/test',
    method: 'GET',
    message: 'Test error',
    originalError: new Error('test'),
    timestamp: Date.now(),
    ...overrides,
  };
}

describe('errorMatcher', () => {
  afterEach(() => {
    resetErrorRules();
  });

  describe('matchesStatus', () => {
    it('matches exact status code', () => {
      expect(matchesStatus(401, 401)).toBe(true);
    });

    it('does not match different status code', () => {
      expect(matchesStatus(401, 403)).toBe(false);
    });

    it('matches status in array', () => {
      expect(matchesStatus(400, [400, 422])).toBe(true);
      expect(matchesStatus(422, [400, 422])).toBe(true);
    });

    it('does not match status not in array', () => {
      expect(matchesStatus(500, [400, 422])).toBe(false);
    });

    it('matches status in range', () => {
      expect(matchesStatus(500, { min: 500, max: 599 })).toBe(true);
      expect(matchesStatus(503, { min: 500, max: 599 })).toBe(true);
      expect(matchesStatus(599, { min: 500, max: 599 })).toBe(true);
    });

    it('does not match status outside range', () => {
      expect(matchesStatus(499, { min: 500, max: 599 })).toBe(false);
      expect(matchesStatus(600, { min: 500, max: 599 })).toBe(false);
    });
  });

  describe('matchesPath', () => {
    it('matches path as substring', () => {
      expect(matchesPath('/api/templates/123', '/templates')).toBe(true);
    });

    it('does not match when path is not a substring', () => {
      expect(matchesPath('/api/users/123', '/templates')).toBe(false);
    });

    it('matches path with regex', () => {
      expect(matchesPath('/api/templates/123', /\/templates\/\d+/)).toBe(true);
    });

    it('does not match when regex does not match', () => {
      expect(matchesPath('/api/templates/abc', /\/templates\/\d+$/)).toBe(false);
    });
  });

  describe('matchesMethod', () => {
    it('matches exact method', () => {
      expect(matchesMethod('POST', 'POST')).toBe(true);
    });

    it('does not match different method', () => {
      expect(matchesMethod('POST', 'GET')).toBe(false);
    });

    it('matches method in array', () => {
      expect(matchesMethod('POST', ['POST', 'PUT'])).toBe(true);
      expect(matchesMethod('PUT', ['POST', 'PUT'])).toBe(true);
    });

    it('does not match method not in array', () => {
      expect(matchesMethod('DELETE', ['POST', 'PUT'])).toBe(false);
    });
  });

  describe('matchesRule', () => {
    it('matches when all specified fields match', () => {
      const error = createClassifiedError({ status: 400, url: '/api/users', method: 'POST' });
      const matcher: ErrorMatcher = { status: 400, path: '/users', method: 'POST' };

      expect(matchesRule(error, matcher)).toBe(true);
    });

    it('does not match when status does not match', () => {
      const error = createClassifiedError({ status: 500 });
      const matcher: ErrorMatcher = { status: 400 };

      expect(matchesRule(error, matcher)).toBe(false);
    });

    it('does not match when path does not match', () => {
      const error = createClassifiedError({ url: '/api/templates' });
      const matcher: ErrorMatcher = { path: '/users' };

      expect(matchesRule(error, matcher)).toBe(false);
    });

    it('matches when errorCode matches', () => {
      const error = createClassifiedError({ errorCode: 'FEATURE_GATED' });
      const matcher: ErrorMatcher = { errorCode: 'FEATURE_GATED' };

      expect(matchesRule(error, matcher)).toBe(true);
    });

    it('matches empty matcher (matches anything)', () => {
      const error = createClassifiedError();
      const matcher: ErrorMatcher = {};

      expect(matchesRule(error, matcher)).toBe(true);
    });

    it('matches bodyField when key and value match', () => {
      const error = createClassifiedError({ body: { type: 'validation' } });
      const matcher: ErrorMatcher = { bodyField: { key: 'type', value: 'validation' } };

      expect(matchesRule(error, matcher)).toBe(true);
    });

    it('does not match bodyField when value differs', () => {
      const error = createClassifiedError({ body: { type: 'other' } });
      const matcher: ErrorMatcher = { bodyField: { key: 'type', value: 'validation' } };

      expect(matchesRule(error, matcher)).toBe(false);
    });
  });

  describe('matchError', () => {
    it('matches against default rules', () => {
      const error = createClassifiedError({ status: 401, url: '/api/test' });
      const result = matchError(error);

      expect(result.matched).toBe(true);
      expect(result.rule?.name).toBe('session-expired');
    });

    it('returns no match for unregistered status code', () => {
      const error = createClassifiedError({ status: 418 });
      const result = matchError(error);

      expect(result.matched).toBe(false);
      expect(result.rule).toBeUndefined();
    });

    it('respects priority ordering - higher priority wins', () => {
      const error = createClassifiedError({ status: 403, errorCode: 'FEATURE_GATED' });
      const result = matchError(error);

      expect(result.matched).toBe(true);
      expect(result.rule?.name).toBe('feature-gated');
    });

    it('respects skipIf - skips rule when skipIf returns true', () => {
      const error = createClassifiedError({ status: 401, url: '/auth/login' });
      const result = matchError(error);

      expect(result.matched).toBe(false);
    });

    it('custom rule with higher priority wins over defaults', () => {
      const customRule: ErrorRule = {
        name: 'custom-high-priority',
        match: { status: 403 },
        action: { type: ErrorActionType.Silent },
        priority: PRIORITY_ROUTE_SPECIFIC,
      };

      registerErrorRule(customRule);

      const error = createClassifiedError({ status: 403 });
      const result = matchError(error);

      expect(result.matched).toBe(true);
      expect(result.rule?.name).toBe('custom-high-priority');
    });

    it('matches validation errors (400 and 422)', () => {
      const error400 = createClassifiedError({ status: 400 });
      const result400 = matchError(error400);
      expect(result400.matched).toBe(true);
      expect(result400.rule?.name).toBe('validation-error');

      const error422 = createClassifiedError({ status: 422 });
      const result422 = matchError(error422);
      expect(result422.matched).toBe(true);
      expect(result422.rule?.name).toBe('validation-error');
    });

    it('matches network error (status 0)', () => {
      const error = createClassifiedError({ status: 0 });
      const result = matchError(error);

      expect(result.matched).toBe(true);
      expect(result.rule?.name).toBe('network-offline');
    });
  });
});
