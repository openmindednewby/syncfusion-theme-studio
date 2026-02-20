import { describe, it, expect } from 'vitest';

import { BadgeNativeVariant as BadgeVariant } from '@/components/ui/native';

import {
  getSeverityVariant,
  getSlaVariant,
  getScoreVariant,
} from './AlertBadgeTemplates';

describe('AlertBadgeTemplates', () => {
  describe('getSeverityVariant', () => {
    it('returns Error for Critical', () => {
      expect(getSeverityVariant('Critical')).toBe(BadgeVariant.Error);
    });

    it('returns Warning for High', () => {
      expect(getSeverityVariant('High')).toBe(BadgeVariant.Warning);
    });

    it('returns Info for Medium', () => {
      expect(getSeverityVariant('Medium')).toBe(BadgeVariant.Info);
    });

    it('returns Success for Low', () => {
      expect(getSeverityVariant('Low')).toBe(BadgeVariant.Success);
    });

    it('returns Info for unknown severity', () => {
      expect(getSeverityVariant('Unknown')).toBe(BadgeVariant.Info);
    });

    it('returns Info for undefined', () => {
      expect(getSeverityVariant(undefined)).toBe(BadgeVariant.Info);
    });
  });

  describe('getSlaVariant', () => {
    it('returns Success for Within SLA', () => {
      expect(getSlaVariant('Within SLA')).toBe(BadgeVariant.Success);
    });

    it('returns Error for At Risk', () => {
      expect(getSlaVariant('At Risk')).toBe(BadgeVariant.Error);
    });

    it('returns Error for Breached', () => {
      expect(getSlaVariant('Breached')).toBe(BadgeVariant.Error);
    });

    it('returns Info for unknown SLA', () => {
      expect(getSlaVariant('Unknown')).toBe(BadgeVariant.Info);
    });
  });

  describe('getScoreVariant', () => {
    it('returns Error for high scores', () => {
      expect(getScoreVariant(90)).toBe(BadgeVariant.Error);
    });

    it('returns Warning for medium scores', () => {
      expect(getScoreVariant(60)).toBe(BadgeVariant.Warning);
    });

    it('returns Success for low scores', () => {
      expect(getScoreVariant(30)).toBe(BadgeVariant.Success);
    });

    it('returns Error at threshold of 80', () => {
      expect(getScoreVariant(80)).toBe(BadgeVariant.Error);
    });

    it('returns Warning at threshold of 50', () => {
      expect(getScoreVariant(50)).toBe(BadgeVariant.Warning);
    });

    it('returns Success for zero', () => {
      expect(getScoreVariant(0)).toBe(BadgeVariant.Success);
    });

    it('returns Success for undefined', () => {
      expect(getScoreVariant(undefined)).toBe(BadgeVariant.Success);
    });
  });
});
