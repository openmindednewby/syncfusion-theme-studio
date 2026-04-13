# Enterprise Admin Platform — Master Plan

## Vision

Transform SyncfusionThemeStudio from a component showcase into a production-grade, open-source enterprise admin template with fully working pages, real auth flows, and comprehensive Syncfusion component integration — all backed by the MockServer.

## Tiers

### Tier 1: Must-Have (ENT-01 → ENT-08)

Core features that close the gap between "demo" and "usable enterprise template."

| # | Task | Agent | Priority | Depends on |
|---|------|-------|----------|------------|
| ENT-01 | [Auth Guards + Protected Routes](./ENT-01-auth-guards.md) | `frontend-dev` | Critical | None |
| ENT-02 | [RBAC — Role-Based Access Control](./ENT-02-rbac.md) | `frontend-dev` + `backend-dev` | Critical | ENT-01 |
| ENT-03 | [Dashboard Charts](./ENT-03-dashboard-charts.md) | `frontend-dev` | High | None |
| ENT-04 | [Orders Page](./ENT-04-orders-page.md) | `frontend-dev` | High | None |
| ENT-05 | [Admin User Management (Full)](./ENT-05-admin-user-management.md) | `frontend-dev` | High | ENT-02 |
| ENT-06 | [Admin Role Management (Full)](./ENT-06-admin-role-management.md) | `frontend-dev` | High | ENT-02 |
| ENT-07 | [Language Switcher + Locales](./ENT-07-language-switcher.md) | `frontend-dev` | Medium | None |
| ENT-08 | [Tier 1 Quality Gate + E2E](./ENT-08-tier1-quality.md) | `quality-gate` + `regression-tester` | High | ENT-01 → ENT-07 |

### Tier 2: High-Value Differentiators (ENT-09 → ENT-16)

Features that make the template competitive with commercial offerings.

| # | Task | Agent | Priority | Depends on |
|---|------|-------|----------|------------|
| ENT-09 | [Calendar / Scheduler Page](./ENT-09-calendar-page.md) | `frontend-dev` + `backend-dev` | Medium | None |
| ENT-10 | [Kanban Board Page](./ENT-10-kanban-page.md) | `frontend-dev` + `backend-dev` | Medium | None |
| ENT-11 | [File Manager Page](./ENT-11-file-manager-page.md) | `frontend-dev` + `backend-dev` | Medium | None |
| ENT-12 | [Rich Text Editor Page](./ENT-12-rich-text-editor-page.md) | `frontend-dev` | Medium | None |
| ENT-13 | [Chat / Messaging Page](./ENT-13-chat-page.md) | `frontend-dev` + `backend-dev` | Medium | None |
| ENT-14 | [Data Export (CSV/Excel/PDF)](./ENT-14-data-export.md) | `frontend-dev` | Medium | None |
| ENT-15 | [Gantt Chart Page](./ENT-15-gantt-page.md) | `frontend-dev` + `backend-dev` | Low | None |
| ENT-16 | [Tier 2 Quality Gate + E2E](./ENT-16-tier2-quality.md) | `quality-gate` + `regression-tester` | Medium | ENT-09 → ENT-15 |

### Tier 3: Polish & Infrastructure (ENT-17 → ENT-24)

OSS-readiness, CI/CD, documentation.

| # | Task | Agent | Priority | Depends on |
|---|------|-------|----------|------------|
| ENT-17 | [GitHub Actions CI/CD](./ENT-17-github-actions.md) | `chief-architect` | Medium | None |
| ENT-18 | [Pricing Page](./ENT-18-pricing-page.md) | `frontend-dev` | Low | None |
| ENT-19 | [Landing / Marketing Page](./ENT-19-landing-page.md) | `frontend-dev` | Low | ENT-01 |
| ENT-20 | [Audit Log Wired to API](./ENT-20-audit-log-api.md) | `frontend-dev` + `backend-dev` | Medium | None |
| ENT-21 | [Health Check Endpoints](./ENT-21-health-checks.md) | `backend-dev` | Low | None |
| ENT-22 | [Admin System Settings (Full)](./ENT-22-admin-system-settings.md) | `frontend-dev` | Low | None |
| ENT-23 | [Admin Integrations + Plugins (Full)](./ENT-23-admin-integrations-plugins.md) | `frontend-dev` | Low | None |
| ENT-24 | [README + Screenshots + Demo](./ENT-24-readme-oss.md) | — | Medium | All Tiers |

### Tier 4: Wow Factor (ENT-25 → ENT-30)

Premium features that elevate beyond typical admin templates.

| # | Task | Agent | Priority | Depends on |
|---|------|-------|----------|------------|
| ENT-25 | [Maps / Geolocation Page](./ENT-25-maps-page.md) | `frontend-dev` | Low | None |
| ENT-26 | [PDF Viewer Page](./ENT-26-pdf-viewer-page.md) | `frontend-dev` | Low | None |
| ENT-27 | [Spreadsheet Page](./ENT-27-spreadsheet-page.md) | `frontend-dev` | Low | None |
| ENT-28 | [Diagram Editor Page](./ENT-28-diagram-page.md) | `frontend-dev` | Low | None |
| ENT-29 | [AI Assistant Panel](./ENT-29-ai-assistant.md) | `frontend-dev` + `backend-dev` | Low | None |
| ENT-30 | [Multi-Tenant Org Switcher](./ENT-30-multi-tenant.md) | `frontend-dev` + `backend-dev` | Low | ENT-02 |
