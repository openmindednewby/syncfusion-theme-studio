import { describe, it, expect } from 'vitest';

import {
  KANBAN_COLUMNS,
  WIP_LIMITS,
  PRIORITY_OPTIONS,
  STATUS_OPTIONS,
  PRIORITY_COLORS,
  KANBAN_API_BASE,
} from './constants';
import { KanbanPriority } from './kanbanPriority';
import { KanbanStatus } from './kanbanStatus';

const COLUMN_COUNT = 4;
const PRIORITY_COUNT = 4;

describe('kanban constants', () => {
  describe('KANBAN_COLUMNS', () => {
    it('defines exactly 4 columns', () => {
      expect(KANBAN_COLUMNS).toHaveLength(COLUMN_COUNT);
    });

    it('columns follow the expected workflow order', () => {
      expect(KANBAN_COLUMNS[0].keyField).toBe(KanbanStatus.Backlog);
      expect(KANBAN_COLUMNS[1].keyField).toBe(KanbanStatus.InProgress);
      expect(KANBAN_COLUMNS[2].keyField).toBe(KanbanStatus.Review);
      expect(KANBAN_COLUMNS[3].keyField).toBe(KanbanStatus.Done);
    });

    it('each column has a headerText key for localization', () => {
      for (const col of KANBAN_COLUMNS) 
        expect(col.headerText).toContain('kanban.columns.');
      
    });
  });

  describe('WIP_LIMITS', () => {
    it('sets InProgress WIP limit to 5', () => {
      expect(WIP_LIMITS[KanbanStatus.InProgress]).toBe(5);
    });

    it('sets Review WIP limit to 3', () => {
      expect(WIP_LIMITS[KanbanStatus.Review]).toBe(3);
    });

    it('sets Backlog and Done to unlimited (0)', () => {
      expect(WIP_LIMITS[KanbanStatus.Backlog]).toBe(0);
      expect(WIP_LIMITS[KanbanStatus.Done]).toBe(0);
    });

    it('has limits defined for all statuses', () => {
      for (const status of STATUS_OPTIONS) 
        expect(WIP_LIMITS[status]).toBeDefined();
      
    });
  });

  describe('PRIORITY_OPTIONS', () => {
    it('contains all 4 priority levels', () => {
      expect(PRIORITY_OPTIONS).toHaveLength(PRIORITY_COUNT);
      expect([...PRIORITY_OPTIONS]).toContain(KanbanPriority.Low);
      expect([...PRIORITY_OPTIONS]).toContain(KanbanPriority.Normal);
      expect([...PRIORITY_OPTIONS]).toContain(KanbanPriority.High);
      expect([...PRIORITY_OPTIONS]).toContain(KanbanPriority.Critical);
    });

    it('is ordered from Low to Critical', () => {
      expect(PRIORITY_OPTIONS[0]).toBe(KanbanPriority.Low);
      expect(PRIORITY_OPTIONS[PRIORITY_COUNT - 1]).toBe(KanbanPriority.Critical);
    });
  });

  describe('STATUS_OPTIONS', () => {
    it('contains all 4 statuses', () => {
      expect(STATUS_OPTIONS).toHaveLength(COLUMN_COUNT);
    });

    it('matches the keyFields in KANBAN_COLUMNS', () => {
      const columnKeys = KANBAN_COLUMNS.map((c) => c.keyField);
      expect([...STATUS_OPTIONS]).toEqual(columnKeys);
    });
  });

  describe('PRIORITY_COLORS', () => {
    it('has a color class string for each priority', () => {
      for (const priority of PRIORITY_OPTIONS) {
        expect(PRIORITY_COLORS[priority]).toBeDefined();
        expect(PRIORITY_COLORS[priority]!.length).toBeGreaterThan(0);
      }
    });

    it('includes both light and dark mode Tailwind classes', () => {
      for (const classes of Object.values(PRIORITY_COLORS)) {
        expect(classes).toContain('bg-');
        expect(classes).toContain('text-');
        expect(classes).toContain('dark:');
      }
    });
  });

  describe('KANBAN_API_BASE', () => {
    it('points to the mock API kanban tasks endpoint', () => {
      expect(KANBAN_API_BASE).toBe('/mockapi/api/kanban/tasks');
    });
  });
});
