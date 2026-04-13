import { describe, it, expect } from 'vitest';

import { BadgeNativeVariant as BadgeVariant } from '@/components/ui/native';

import {
  getPriorityVariant,
  getSettlementVariant,
  getValueVariant,
} from './AlertBadgeTemplates';

describe('AlertBadgeTemplates', () => {
  describe('getPriorityVariant', () => {
    it('returns Error for Critical', () => {
      expect(getPriorityVariant('Critical')).toBe(BadgeVariant.Error);
    });

    it('returns Warning for High', () => {
      expect(getPriorityVariant('High')).toBe(BadgeVariant.Warning);
    });

    it('returns Info for Medium', () => {
      expect(getPriorityVariant('Medium')).toBe(BadgeVariant.Info);
    });

    it('returns Success for Low', () => {
      expect(getPriorityVariant('Low')).toBe(BadgeVariant.Success);
    });

    it('returns Info for unknown priority', () => {
      expect(getPriorityVariant('Unknown')).toBe(BadgeVariant.Info);
    });

    it('returns Info for undefined', () => {
      expect(getPriorityVariant(undefined)).toBe(BadgeVariant.Info);
    });
  });

  describe('getSettlementVariant', () => {
    it('returns Success for On Schedule', () => {
      expect(getSettlementVariant('On Schedule')).toBe(BadgeVariant.Success);
    });

    it('returns Error for Delayed', () => {
      expect(getSettlementVariant('Delayed')).toBe(BadgeVariant.Error);
    });

    it('returns Error for Overdue', () => {
      expect(getSettlementVariant('Overdue')).toBe(BadgeVariant.Error);
    });

    it('returns Info for unknown settlement status', () => {
      expect(getSettlementVariant('Unknown')).toBe(BadgeVariant.Info);
    });
  });

  describe('getValueVariant', () => {
    it('returns Error for high values', () => {
      expect(getValueVariant(90)).toBe(BadgeVariant.Error);
    });

    it('returns Warning for medium values', () => {
      expect(getValueVariant(60)).toBe(BadgeVariant.Warning);
    });

    it('returns Success for low values', () => {
      expect(getValueVariant(30)).toBe(BadgeVariant.Success);
    });

    it('returns Error at threshold of 80', () => {
      expect(getValueVariant(80)).toBe(BadgeVariant.Error);
    });

    it('returns Warning at threshold of 50', () => {
      expect(getValueVariant(50)).toBe(BadgeVariant.Warning);
    });

    it('returns Success for zero', () => {
      expect(getValueVariant(0)).toBe(BadgeVariant.Success);
    });

    it('returns Success for undefined', () => {
      expect(getValueVariant(undefined)).toBe(BadgeVariant.Success);
    });
  });
});
