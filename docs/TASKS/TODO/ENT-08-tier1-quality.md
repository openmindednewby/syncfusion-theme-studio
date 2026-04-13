# ENT-08: Tier 1 Quality Gate + E2E Tests

## Status: TODO
## Priority: High
## Depends on: ENT-01, ENT-02, ENT-03, ENT-04, ENT-05, ENT-06, ENT-07
## Agent: quality-gate + code-reviewer + regression-tester

## Objective

Run the full lifecycle pipeline on all Tier 1 features to ensure everything meets quality standards before moving to Tier 2.

## Implementation Plan

### 1. Quality Gate (per domain)

- `npm run lint` — zero errors
- `npm run test:coverage` — all tests pass, coverage thresholds met
- `npx expo export --platform web` (or `npm run build`) — build succeeds
- YAGNI check — no unused exports or dead code introduced

### 2. Code Review

- Verify all new files follow module structure convention (4+ files → subdirs)
- No magic numbers, all strings via `t()`
- Files under 300 lines, components under 200, functions under 50
- `const enum` in own files, proper a11y attributes

### 3. E2E Tests (Playwright)

New test specs needed:

- **Auth flow**: Login → dashboard redirect, logout → login redirect, protected route redirect, 401 handling
- **RBAC**: Admin sees all nav items, Viewer sees subset, Viewer gets 403 on admin routes
- **Dashboard charts**: Charts render, respond to theme toggle
- **Orders page**: CRUD flow — list, create, edit, delete order
- **User management**: List users, create user, assign role, delete
- **Role management**: View permissions matrix, create custom role
- **Language switcher**: Switch language, verify text changes, verify persistence

### 4. Visual QA

- Browser test all new pages in light + dark mode
- Verify responsiveness at 1920px, 1366px, 768px

## Success Criteria

- [ ] Lint: zero errors
- [ ] Unit tests: all pass
- [ ] Build: succeeds
- [ ] E2E: all new specs pass
- [ ] Visual QA: no regressions
- [ ] Code review: REVIEW_PASSED
