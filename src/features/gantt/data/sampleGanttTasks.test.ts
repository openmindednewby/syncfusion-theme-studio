import { describe, expect, it } from 'vitest';

import { SAMPLE_GANTT_TASKS } from './sampleGanttTasks';

describe('sampleGanttTasks', () => {
  it('contains tasks', () => {
    expect(SAMPLE_GANTT_TASKS.length).toBeGreaterThan(0);
  });

  it('every task has required fields', () => {
    for (const task of SAMPLE_GANTT_TASKS) {
      expect(task.id).toBeGreaterThan(0);
      expect(task.taskName).toBeTruthy();
      expect(task.startDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(task.endDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(task.duration).toBeGreaterThan(0);
      expect(task.assignee).toBeTruthy();
      expect(task.priority).toBeTruthy();
    }
  });

  it('has parent-child relationships', () => {
    const childTasks = SAMPLE_GANTT_TASKS.filter((t) => t.parentTaskId !== null);
    expect(childTasks.length).toBeGreaterThan(0);

    const ids = new Set(SAMPLE_GANTT_TASKS.map((t) => t.id));
    for (const child of childTasks)
      expect(ids.has(child.parentTaskId as number)).toBe(true);
  });

  it('has unique IDs', () => {
    const ids = SAMPLE_GANTT_TASKS.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
