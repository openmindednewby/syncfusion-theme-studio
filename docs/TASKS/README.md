# Tasks

This folder contains task documentation for SyncfusionThemeStudio development.

## Folder Structure

```
docs/Tasks/
├── README.md           # This file
├── TODO/               # Tasks waiting to be started
├── IN_PROGRESS/        # Tasks currently being worked on
├── COMPLETED/          # Successfully finished tasks
└── BLOCKED/            # Tasks waiting on external input
```

## Current Tasks

### TODO — Culture Settings (14 tasks)

| # | Task | Agent | Status |
|---|------|-------|--------|
| - | [Master Plan](./TODO/culture-settings-master-plan.md) | — | TODO |
| CUL-01 | [Types & Enums](./TODO/CUL-01-culture-type-enums.md) | `frontend-dev` | TODO |
| CUL-02 | [Default Culture Presets](./TODO/CUL-02-default-culture-presets.md) | `frontend-dev` | TODO |
| CUL-03 | [Store Actions & Schema](./TODO/CUL-03-store-actions-schema.md) | `frontend-dev` | TODO |
| CUL-04 | [Culture Resolver](./TODO/CUL-04-culture-resolver.md) | `frontend-dev` | TODO |
| CUL-05 | [Syncfusion CLDR](./TODO/CUL-05-syncfusion-cldr.md) | `frontend-dev` | TODO |
| CUL-06 | [FD() & useCultureFormat](./TODO/CUL-06-fd-helper-culture-hook.md) | `frontend-dev` | TODO |
| CUL-07 | [Component Wrappers](./TODO/CUL-07-component-wrappers.md) | `frontend-dev` | TODO |
| CUL-08 | [i18n & Test IDs](./TODO/CUL-08-i18n-test-ids.md) | `frontend-dev` | TODO |
| CUL-09 | [Settings UI](./TODO/CUL-09-settings-ui.md) | `frontend-dev` | TODO |
| CUL-10 | [Unit Tests](./TODO/CUL-10-unit-tests.md) | `frontend-dev` | TODO |
| CUL-11 | [Quality Gate](./TODO/CUL-11-quality-gate.md) | `quality-gate` | TODO |
| CUL-12 | [Code Review](./TODO/CUL-12-code-review.md) | `code-reviewer` | TODO |
| CUL-13 | [E2E Tests](./TODO/CUL-13-e2e-tests.md) | `regression-tester` | TODO |
| CUL-14 | [Visual QA](./TODO/CUL-14-visual-qa.md) | `visual-qa` | TODO |

### COMPLETED — Forms Showcase API Integration (9 tasks)

| # | Task | Status |
|---|------|--------|
| - | [Master Plan](./COMPLETED/forms-api-master-plan.md) | Done |
| SF-01 | [Product CRUD](./COMPLETED/sf-01-product-crud.md) | Done |
| SF-02 | [User Management](./COMPLETED/sf-02-user-management.md) | Done |
| SF-03 | [Product Search](./COMPLETED/sf-03-product-search.md) | Done |
| SF-04 | [Page Layout](./COMPLETED/sf-04-page-layout.md) | Done |
| NF-05 | [User Lookup](./COMPLETED/nf-05-user-lookup.md) | Done |
| NF-06 | [User Creation](./COMPLETED/nf-06-user-creation.md) | Done |
| NF-07 | [Order Form](./COMPLETED/nf-07-order-form.md) | Done |
| NF-08 | [Page Layout](./COMPLETED/nf-08-page-layout.md) | Done |
| 09 | [Quality Gate + Review](./COMPLETED/09-quality-gate-review.md) | Done |

### COMPLETED — Forms Showcase (static, original)

| Task | Status |
|------|--------|
| [Syncfusion Forms Showcase](./COMPLETED/syncfusion-forms-showcase-page.md) | Done |
| [Native Forms Showcase](./COMPLETED/native-forms-showcase-page.md) | Done |

### COMPLETED — Mock Server (10 tasks)

| # | Task | Status |
|---|------|--------|
| - | [Master Plan](./COMPLETED/mock-server-master-plan.md) | Done |
| 1 | [Scaffold .NET solution](./COMPLETED/01-scaffold-dotnet-solution.md) | Done |
| 2 | [Core domain entities](./COMPLETED/02-core-domain-entities.md) | Done |
| 3 | [UseCases CQRS handlers](./COMPLETED/03-usecases-cqrs-handlers.md) | Done |
| 4 | [Infrastructure InMemory DB](./COMPLETED/04-infrastructure-inmemory-db.md) | Done |
| 5 | [Web FastEndpoints + Swagger](./COMPLETED/05-web-fastendpoints-swagger.md) | Done |
| 6 | [WebSocket hub](./COMPLETED/06-websocket-hub.md) | Done |
| 7 | [Unit tests](./COMPLETED/07-unit-tests.md) | Done |
| 8 | [Tiltfile integration](./COMPLETED/08-tiltfile-integration.md) | Done |
| 9 | [Orval + Vite proxy](./COMPLETED/09-orval-vite-integration.md) | Done |
| 10 | [Frontend mutator + hooks](./COMPLETED/10-frontend-mutator-hooks.md) | Done |

## Task Template

When creating new tasks, use the template in the main CLAUDE.md file.

## Workflow

1. Create task in `TODO/` folder
2. Move to `IN_PROGRESS/` when starting
3. Update task with findings and changes
4. Move to `COMPLETED/` when done
5. If blocked, move to `BLOCKED/` with explanation
