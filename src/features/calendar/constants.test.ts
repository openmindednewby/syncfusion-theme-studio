import { describe, it, expect } from 'vitest';

import {
  CATEGORY_COLORS,
  DEFAULT_EVENT_COLOR,
  CALENDAR_API_URL,
  CALENDAR_EVENTS_QUERY_KEY,
} from './constants';

const HEX_COLOR_REGEX = /^#[0-9a-f]{6}$/i;

describe('calendar constants', () => {
  describe('CATEGORY_COLORS', () => {
    it('contains colors for Meeting, Task, Reminder, and Holiday', () => {
      expect(CATEGORY_COLORS['Meeting']).toBeDefined();
      expect(CATEGORY_COLORS['Task']).toBeDefined();
      expect(CATEGORY_COLORS['Reminder']).toBeDefined();
      expect(CATEGORY_COLORS['Holiday']).toBeDefined();
    });

    it('all values are valid hex color strings', () => {
      for (const color of Object.values(CATEGORY_COLORS)) 
        expect(color).toMatch(HEX_COLOR_REGEX);
      
    });

    it('each category has a unique color', () => {
      const colors = Object.values(CATEGORY_COLORS);
      const uniqueColors = new Set(colors);
      expect(uniqueColors.size).toBe(colors.length);
    });
  });

  describe('DEFAULT_EVENT_COLOR', () => {
    it('is a valid hex color', () => {
      expect(DEFAULT_EVENT_COLOR).toMatch(HEX_COLOR_REGEX);
    });

    it('is distinct from all category colors', () => {
      const categoryColors = Object.values(CATEGORY_COLORS);
      expect(categoryColors).not.toContain(DEFAULT_EVENT_COLOR);
    });
  });

  describe('CALENDAR_API_URL', () => {
    it('points to the mock API calendar events endpoint', () => {
      expect(CALENDAR_API_URL).toBe('/mockapi/api/calendar/events');
    });
  });

  describe('CALENDAR_EVENTS_QUERY_KEY', () => {
    it('is a readonly tuple with the expected key', () => {
      expect(CALENDAR_EVENTS_QUERY_KEY).toEqual(['calendar-events']);
    });
  });
});
