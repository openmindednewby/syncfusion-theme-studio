import { describe, it, expect } from 'vitest';

import { GANTT_API_BASE, PRIORITY_COLORS, PRIORITY_OPTIONS } from './constants';
import { GanttPriority } from './ganttPriority';

describe('Gantt constants', () => {
  it('defines gantt API base path', () => {
    expect(GANTT_API_BASE).toBe('/mockapi/api/gantt/tasks');
  });
});

describe('PRIORITY_OPTIONS', () => {
  it('contains exactly four priority levels', () => {
    expect(PRIORITY_OPTIONS).toHaveLength(4);
  });

  it('lists priorities in ascending order: Low, Normal, High, Critical', () => {
    expect(PRIORITY_OPTIONS[0]).toBe(GanttPriority.Low);
    expect(PRIORITY_OPTIONS[1]).toBe(GanttPriority.Normal);
    expect(PRIORITY_OPTIONS[2]).toBe(GanttPriority.High);
    expect(PRIORITY_OPTIONS[3]).toBe(GanttPriority.Critical);
  });
});

describe('PRIORITY_COLORS', () => {
  it('maps every priority option to a CSS class string', () => {
    for (const priority of PRIORITY_OPTIONS) {
      expect(PRIORITY_COLORS[priority]).toBeDefined();
      expect(typeof PRIORITY_COLORS[priority]).toBe('string');
    }
  });

  it('includes dark mode variants for each priority', () => {
    for (const priority of PRIORITY_OPTIONS) 
      expect(PRIORITY_COLORS[priority]).toContain('dark:');
    
  });

  it('assigns distinct color schemes per priority level', () => {
    const colors = new Set(PRIORITY_OPTIONS.map((p) => PRIORITY_COLORS[p]));
    expect(colors.size).toBe(PRIORITY_OPTIONS.length);
  });

  it('uses blue for Low priority', () => {
    expect(PRIORITY_COLORS[GanttPriority.Low]).toContain('blue');
  });

  it('uses red for Critical priority', () => {
    expect(PRIORITY_COLORS[GanttPriority.Critical]).toContain('red');
  });
});
