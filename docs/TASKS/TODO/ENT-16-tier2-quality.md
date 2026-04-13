# ENT-16: Tier 2 Quality Gate + E2E Tests

## Status: TODO
## Priority: Medium
## Depends on: ENT-09, ENT-10, ENT-11, ENT-12, ENT-13, ENT-14, ENT-15
## Agent: quality-gate + code-reviewer + regression-tester

## Objective

Run the full lifecycle pipeline on all Tier 2 features.

## Implementation Plan

### 1. Quality Gate

- `npm run lint` — zero errors
- `npm run test:coverage` — all tests pass
- `npm run build` — build succeeds
- YAGNI check

### 2. Code Review

- Module structure convention compliance
- No magic numbers, all strings via `t()`
- File/component/function length limits
- Proper a11y attributes

### 3. E2E Tests

New test specs:

- **Calendar**: View switches, create event, drag event, delete event
- **Kanban**: Drag card between columns, create task, edit task
- **File Manager**: Navigate folders, upload file, rename, delete
- **Rich Text Editor**: Format text, insert image, switch modes, save document
- **Chat**: Switch channel, send message, receive message
- **Data Export**: Export grid to CSV, verify download
- **Gantt**: View timeline, drag task, zoom levels

### 4. Visual QA

- All new pages in light + dark mode
- Responsive at 1920px, 1366px, 768px

## Success Criteria

- [ ] All quality checks pass
- [ ] All E2E specs pass
- [ ] Visual QA: no regressions
- [ ] Code review: REVIEW_PASSED
