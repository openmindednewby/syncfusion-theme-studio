import { describe, it, expect } from 'vitest';

import {
  getSeverityClass,
  getSlaClass,
  getScoreClass,
} from '../AlertBadgeTemplates';

describe('AlertBadgeTemplates', () => {
  describe('getSeverityClass', () => {
    it('returns error badge for Critical', () => {
      expect(getSeverityClass('Critical')).toContain('badge-error');
    });

    it('returns warning badge for High', () => {
      expect(getSeverityClass('High')).toContain('badge-warning');
    });

    it('returns info badge for Medium', () => {
      expect(getSeverityClass('Medium')).toContain('badge-info');
    });

    it('returns success badge for Low', () => {
      expect(getSeverityClass('Low')).toContain('badge-success');
    });

    it('returns default badge for unknown severity', () => {
      expect(getSeverityClass('Unknown')).toContain('badge-info');
    });

    it('returns default badge for undefined', () => {
      expect(getSeverityClass(undefined)).toContain('badge-info');
    });
  });

  describe('getSlaClass', () => {
    it('returns success for Within SLA', () => {
      expect(getSlaClass('Within SLA')).toContain('badge-success');
    });

    it('returns error for At Risk', () => {
      expect(getSlaClass('At Risk')).toContain('badge-error');
    });

    it('returns error for Breached', () => {
      expect(getSlaClass('Breached')).toContain('badge-error');
    });

    it('returns default for unknown SLA', () => {
      expect(getSlaClass('Unknown')).toContain('badge-info');
    });
  });

  describe('getScoreClass', () => {
    it('returns error badge for high scores', () => {
      expect(getScoreClass(90)).toContain('badge-error');
    });

    it('returns warning badge for medium scores', () => {
      expect(getScoreClass(60)).toContain('badge-warning');
    });

    it('returns success badge for low scores', () => {
      expect(getScoreClass(30)).toContain('badge-success');
    });

    it('returns error badge at threshold of 80', () => {
      expect(getScoreClass(80)).toContain('badge-error');
    });

    it('returns warning badge at threshold of 50', () => {
      expect(getScoreClass(50)).toContain('badge-warning');
    });

    it('returns success badge for zero', () => {
      expect(getScoreClass(0)).toContain('badge-success');
    });

    it('returns success badge for undefined', () => {
      expect(getScoreClass(undefined)).toContain('badge-success');
    });
  });
});
