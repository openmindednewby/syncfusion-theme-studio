# 09: Quality Gate + Code Review

## Status: TODO
## Priority: High
## Depends on: sf-04, nf-08
## Agent: quality-gate + code-reviewer (parallel)

## Objective

Run the full verification suite and code standards review after all forms showcase pages are upgraded.

## Quality Gate Checks

### Frontend (SyncfusionThemeStudio)
1. **Lint**: `npm run lint:fix` — zero errors
2. **Unit Tests**: `npm run test:coverage` — all pass
3. **Build**: `npx expo export --platform web` — succeeds
4. **YAGNI**: No unused imports, no dead code from old forms

### Backend (MockServer)
1. **Build**: `dotnet build MockServer/MockServer.slnx` — 0 errors, 0 warnings
2. **Tests**: `dotnet test MockServer/MockServer.slnx` — all pass
3. **Format**: `dotnet format MockServer/MockServer.slnx --verify-no-changes` — clean

## Code Review Checks

### Standards Compliance
- [ ] All files under 300 lines
- [ ] All components under 200 lines
- [ ] All functions under 50 lines
- [ ] No magic numbers
- [ ] No hardcoded color literals
- [ ] `const enum` used correctly (each in own file)
- [ ] All user-facing text via `FM()` or `t()`
- [ ] Interactive elements have `testID` + `accessibilityLabel` + `accessibilityHint`

### Architecture Patterns
- [ ] Section components encapsulate CRUD logic (form + list + mutations)
- [ ] Orval hooks used correctly (query invalidation, mutation options)
- [ ] Form schemas use shared schemas from `@/lib/forms/schemas`
- [ ] No direct API calls — everything through generated hooks
- [ ] Proper loading/error states
- [ ] No Syncfusion components on Native Forms page

## Agent Delegation

Launch 2 agents in parallel:
```
quality-gate agent: Run lint, tests, build for SyncfusionThemeStudio
code-reviewer agent: Review all changed files against standards
```

## Acceptance Criteria

- [ ] GATE_PASSED from quality-gate agent
- [ ] REVIEW_PASSED from code-reviewer agent
- [ ] All issues fixed if either fails
