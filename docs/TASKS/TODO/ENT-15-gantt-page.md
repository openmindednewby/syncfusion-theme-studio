# ENT-15: Gantt Chart Page

## Status: TODO
## Priority: Low
## Depends on: None
## Agent: frontend-dev + backend-dev

## Objective

Add a Gantt chart page for project timeline visualization using Syncfusion's Gantt component.

## Syncfusion Package

- `@syncfusion/ej2-react-gantt`

## Implementation Plan

### Backend (MockServer)

1. **Project/Task entities**:
   - `GanttProject` — Id, Name, StartDate, EndDate
   - `GanttTask` — Id, ProjectId, TaskName, StartDate, EndDate, Duration, Progress (%), ParentTaskId, Dependencies, Assignee, Priority
2. **Endpoints**:
   - `GET /api/gantt/projects` — list projects
   - `GET /api/gantt/projects/{id}/tasks` — tasks for project
   - `PUT /api/gantt/tasks/{id}` — update task (drag-to-reschedule)
3. **Seed data**: 1-2 projects, 15-20 tasks with subtasks, dependencies, varied progress

### Frontend

### 1. Page Structure

```
src/features/gantt/
├── pages/
│   └── GanttPage/
│       ├── index.tsx
│       ├── components/
│       │   ├── GanttView.tsx         # Syncfusion Gantt wrapper
│       │   ├── GanttToolbar.tsx      # Project selector, zoom, view options
│       │   └── TaskDialog.tsx        # Edit task details
│       └── hooks/
│           └── useGanttTasks.ts
├── types.ts
└── constants.ts
```

### 2. Gantt Features

- Timeline: Day, Week, Month zoom levels
- Task bars with progress indicators
- Dependency arrows (finish-to-start, etc.)
- Drag-and-drop to reschedule tasks
- Resize task bars to change duration
- Critical path highlighting
- Resource assignments (assignee names)
- Milestone markers
- Column editing in the left tree-grid

### 3. Route + Navigation

- Add `/gantt` route
- Add "Gantt" to sidebar under "Productivity" section

## Success Criteria

- [ ] Gantt chart renders with tasks and timeline
- [ ] Dependency arrows display correctly
- [ ] Drag-and-drop rescheduling works
- [ ] Progress bars show completion percentage
- [ ] Zoom levels (Day/Week/Month) work
- [ ] Respects dark/light theme
