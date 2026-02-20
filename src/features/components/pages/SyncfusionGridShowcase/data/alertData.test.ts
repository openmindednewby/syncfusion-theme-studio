import { describe, it, expect } from 'vitest';

import { SECURITY_ALERTS, ALERT_COLUMNS } from './alertData';

const EXPECTED_ALERT_COUNT = 592;
const MIN_SCORE = 10;
const MAX_SCORE = 100;

describe('Alert Data', () => {
  it('generates the expected number of alerts', () => {
    expect(SECURITY_ALERTS).toHaveLength(EXPECTED_ALERT_COUNT);
  });

  it('has no duplicate IDs', () => {
    const ids = SECURITY_ALERTS.map((a) => a.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('has valid severity values', () => {
    const validSeverities = ['Critical', 'High', 'Medium', 'Low', 'Informational'];
    SECURITY_ALERTS.forEach((alert) => {
      expect(validSeverities).toContain(alert.severity);
    });
  });

  it('has scores between 10 and 100', () => {
    SECURITY_ALERTS.forEach((alert) => {
      expect(alert.score).toBeGreaterThanOrEqual(MIN_SCORE);
      expect(alert.score).toBeLessThanOrEqual(MAX_SCORE);
    });
  });

  it('defines column models for all data fields', () => {
    const columnFields = ALERT_COLUMNS.map((c) => c.field);
    expect(columnFields).toContain('id');
    expect(columnFields).toContain('severity');
    expect(columnFields).toContain('score');
    expect(columnFields).toContain('status');
    expect(columnFields).toContain('correlationName');
    expect(columnFields).toContain('actions');
  });

  it('formats dates as DD/MM/YYYY', () => {
    const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
    SECURITY_ALERTS.forEach((alert) => {
      expect(alert.dateCreated).toMatch(datePattern);
    });
  });
});
