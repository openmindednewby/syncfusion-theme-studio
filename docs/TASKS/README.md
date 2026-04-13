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

### TODO — ESLint Debt Remediation (7 tasks)

| # | Task | Agent | Priority | Status |
|---|------|-------|----------|--------|
| - | [Master Plan](./TODO/eslint-debt-master-plan.md) | — | — | TODO |
| ELD-01 | [Decompose DataGrid](./TODO/ELD-01-decompose-datagrid.md) | `frontend-dev` | Critical | TODO |
| ELD-02 | [Split componentTypes](./TODO/ELD-02-split-component-types.md) | `frontend-dev` | Low | TODO |
| ELD-03 | [Fix Form Schema Typing](./TODO/ELD-03-fix-form-schema-typing.md) | `frontend-dev` | Medium | TODO |
| ELD-04 | [Reduce TableContent Complexity](./TODO/ELD-04-reduce-table-content-complexity.md) | `frontend-dev` | Medium | TODO |
| ELD-05 | [Reduce DataRow Complexity](./TODO/ELD-05-reduce-datarow-complexity.md) | `frontend-dev` | Medium | TODO |
| ELD-06 | [Fix Breadcrumb a11y](./TODO/ELD-06-fix-breadcrumb-a11y.md) | `frontend-dev` | Low | TODO |
| ELD-07 | [Split Product Mutations](./TODO/ELD-07-split-product-mutations.md) | `frontend-dev` | Low | TODO |

### TODO — Feature Flags: Per-Section Page Gating

| Task | Agent | Priority | Status |
|------|-------|----------|--------|
| [Feature Flags: Page Sections](./TODO/feature-flags-page-sections.md) | `frontend-dev` | High | TODO |

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

### TODO — Enterprise Admin Platform (30 tasks, 4 tiers)

[Master Plan](./TODO/enterprise-admin-master-plan.md)

#### Tier 1: Must-Have (8 tasks)

| # | Task | Agent | Priority | Depends on | Status |
|---|------|-------|----------|------------|--------|
| ENT-01 | [Auth Guards + Protected Routes](./TODO/ENT-01-auth-guards.md) | `frontend-dev` | Critical | None | TODO |
| ENT-02 | [RBAC — Role-Based Access Control](./TODO/ENT-02-rbac.md) | `frontend-dev` + `backend-dev` | Critical | ENT-01 | TODO |
| ENT-03 | [Dashboard Charts](./TODO/ENT-03-dashboard-charts.md) | `frontend-dev` | High | None | TODO |
| ENT-04 | [Orders Page](./TODO/ENT-04-orders-page.md) | `frontend-dev` | High | None | TODO |
| ENT-05 | [Admin User Management (Full)](./TODO/ENT-05-admin-user-management.md) | `frontend-dev` | High | ENT-02 | TODO |
| ENT-06 | [Admin Role Management (Full)](./TODO/ENT-06-admin-role-management.md) | `frontend-dev` | High | ENT-02 | TODO |
| ENT-07 | [Language Switcher + Locales](./TODO/ENT-07-language-switcher.md) | `frontend-dev` | Medium | None | TODO |
| ENT-08 | [Tier 1 Quality Gate + E2E](./TODO/ENT-08-tier1-quality.md) | `quality-gate` + `regression-tester` | High | ENT-01→07 | TODO |

#### Tier 2: High-Value Differentiators (8 tasks)

| # | Task | Agent | Priority | Depends on | Status |
|---|------|-------|----------|------------|--------|
| ENT-09 | [Calendar / Scheduler Page](./TODO/ENT-09-calendar-page.md) | `frontend-dev` + `backend-dev` | Medium | None | TODO |
| ENT-10 | [Kanban Board Page](./TODO/ENT-10-kanban-page.md) | `frontend-dev` + `backend-dev` | Medium | None | TODO |
| ENT-11 | [File Manager Page](./TODO/ENT-11-file-manager-page.md) | `frontend-dev` + `backend-dev` | Medium | None | TODO |
| ENT-12 | [Rich Text Editor Page](./TODO/ENT-12-rich-text-editor-page.md) | `frontend-dev` | Medium | None | TODO |
| ENT-13 | [Chat / Messaging Page](./TODO/ENT-13-chat-page.md) | `frontend-dev` + `backend-dev` | Medium | None | TODO |
| ENT-14 | [Data Export (CSV/Excel/PDF)](./TODO/ENT-14-data-export.md) | `frontend-dev` | Medium | None | TODO |
| ENT-15 | [Gantt Chart Page](./TODO/ENT-15-gantt-page.md) | `frontend-dev` + `backend-dev` | Low | None | TODO |
| ENT-16 | [Tier 2 Quality Gate + E2E](./TODO/ENT-16-tier2-quality.md) | `quality-gate` + `regression-tester` | Medium | ENT-09→15 | TODO |

#### Tier 3: Polish & Infrastructure (8 tasks)

| # | Task | Agent | Priority | Depends on | Status |
|---|------|-------|----------|------------|--------|
| ENT-17 | [GitHub Actions CI/CD](./TODO/ENT-17-github-actions.md) | `chief-architect` | Medium | None | TODO |
| ENT-18 | [Pricing Page](./TODO/ENT-18-pricing-page.md) | `frontend-dev` | Low | None | TODO |
| ENT-19 | [Landing / Marketing Page](./TODO/ENT-19-landing-page.md) | `frontend-dev` | Low | ENT-01 | TODO |
| ENT-20 | [Audit Log Wired to API](./TODO/ENT-20-audit-log-api.md) | `frontend-dev` + `backend-dev` | Medium | None | TODO |
| ENT-21 | [Health Check Endpoints](./TODO/ENT-21-health-checks.md) | `backend-dev` | Low | None | TODO |
| ENT-22 | [Admin System Settings (Full)](./TODO/ENT-22-admin-system-settings.md) | `frontend-dev` | Low | None | TODO |
| ENT-23 | [Admin Integrations + Plugins](./TODO/ENT-23-admin-integrations-plugins.md) | `frontend-dev` | Low | None | TODO |
| ENT-24 | [README + Screenshots + Demo](./TODO/ENT-24-readme-oss.md) | — | Medium | All | TODO |

#### Tier 4: Wow Factor (6 tasks)

| # | Task | Agent | Priority | Depends on | Status |
|---|------|-------|----------|------------|--------|
| ENT-25 | [Maps / Geolocation Page](./TODO/ENT-25-maps-page.md) | `frontend-dev` | Low | None | TODO |
| ENT-26 | [PDF Viewer Page](./TODO/ENT-26-pdf-viewer-page.md) | `frontend-dev` | Low | None | TODO |
| ENT-27 | [Spreadsheet Page](./TODO/ENT-27-spreadsheet-page.md) | `frontend-dev` | Low | None | TODO |
| ENT-28 | [Diagram Editor Page](./TODO/ENT-28-diagram-page.md) | `frontend-dev` | Low | None | TODO |
| ENT-29 | [AI Assistant Panel](./TODO/ENT-29-ai-assistant.md) | `frontend-dev` + `backend-dev` | Low | None | TODO |
| ENT-30 | [Multi-Tenant Org Switcher](./TODO/ENT-30-multi-tenant.md) | `frontend-dev` + `backend-dev` | Low | ENT-02 | TODO |

---

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
