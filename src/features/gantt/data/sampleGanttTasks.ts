import { GanttPriority } from '../ganttPriority';

import type { GanttTaskItem } from '../types';

/** Sample Gantt tasks used as fallback when the API is unavailable. */
export const SAMPLE_GANTT_TASKS: GanttTaskItem[] = [
  {
    id: 1, taskName: 'Project Kickoff', startDate: '2026-03-02', endDate: '2026-03-02',
    duration: 1, progress: 100, parentTaskId: null, dependencies: null,
    assignee: 'Alice', priority: GanttPriority.High,
  },
  {
    id: 2, taskName: 'Requirements Gathering', startDate: '2026-03-03', endDate: '2026-03-07',
    duration: 5, progress: 100, parentTaskId: null, dependencies: '1',
    assignee: 'Bob', priority: GanttPriority.Critical,
  },
  {
    id: 3, taskName: 'UI/UX Design', startDate: '2026-03-10', endDate: '2026-03-21',
    duration: 10, progress: 80, parentTaskId: null, dependencies: '2',
    assignee: 'Carol', priority: GanttPriority.High,
  },
  {
    id: 4, taskName: 'Wireframes', startDate: '2026-03-10', endDate: '2026-03-14',
    duration: 5, progress: 100, parentTaskId: 3, dependencies: null,
    assignee: 'Carol', priority: GanttPriority.Normal,
  },
  {
    id: 5, taskName: 'Visual Design', startDate: '2026-03-17', endDate: '2026-03-21',
    duration: 5, progress: 60, parentTaskId: 3, dependencies: '4',
    assignee: 'Carol', priority: GanttPriority.High,
  },
  {
    id: 6, taskName: 'Backend Development', startDate: '2026-03-10', endDate: '2026-04-04',
    duration: 20, progress: 45, parentTaskId: null, dependencies: '2',
    assignee: 'Dave', priority: GanttPriority.Critical,
  },
  {
    id: 7, taskName: 'Database Schema', startDate: '2026-03-10', endDate: '2026-03-14',
    duration: 5, progress: 100, parentTaskId: 6, dependencies: null,
    assignee: 'Dave', priority: GanttPriority.High,
  },
  {
    id: 8, taskName: 'API Endpoints', startDate: '2026-03-17', endDate: '2026-03-28',
    duration: 10, progress: 30, parentTaskId: 6, dependencies: '7',
    assignee: 'Dave', priority: GanttPriority.Normal,
  },
  {
    id: 9, taskName: 'Authentication', startDate: '2026-03-31', endDate: '2026-04-04',
    duration: 5, progress: 0, parentTaskId: 6, dependencies: '8',
    assignee: 'Eve', priority: GanttPriority.Critical,
  },
  {
    id: 10, taskName: 'Frontend Development', startDate: '2026-03-24', endDate: '2026-04-11',
    duration: 15, progress: 20, parentTaskId: null, dependencies: '5',
    assignee: 'Frank', priority: GanttPriority.High,
  },
  {
    id: 11, taskName: 'Component Library', startDate: '2026-03-24', endDate: '2026-03-28',
    duration: 5, progress: 50, parentTaskId: 10, dependencies: null,
    assignee: 'Frank', priority: GanttPriority.Normal,
  },
  {
    id: 12, taskName: 'Page Integration', startDate: '2026-03-31', endDate: '2026-04-11',
    duration: 10, progress: 0, parentTaskId: 10, dependencies: '11,8',
    assignee: 'Frank', priority: GanttPriority.High,
  },
  {
    id: 13, taskName: 'Testing & QA', startDate: '2026-04-14', endDate: '2026-04-25',
    duration: 10, progress: 0, parentTaskId: null, dependencies: '10,6',
    assignee: 'Grace', priority: GanttPriority.Normal,
  },
  {
    id: 14, taskName: 'Deployment', startDate: '2026-04-28', endDate: '2026-04-30',
    duration: 3, progress: 0, parentTaskId: null, dependencies: '13',
    assignee: 'Alice', priority: GanttPriority.Low,
  },
];
