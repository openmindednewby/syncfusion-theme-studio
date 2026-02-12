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

### TODO

| Task | Description | Priority |
|------|-------------|----------|
| [Syncfusion Forms Showcase](./TODO/syncfusion-forms-showcase-page.md) | Create forms page with Syncfusion components | High |
| [Native Forms Showcase](./TODO/native-forms-showcase-page.md) | Create lightweight forms page with native HTML | Medium |

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
