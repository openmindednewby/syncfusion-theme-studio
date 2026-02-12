# Mock Server — Master Plan

> **Project**: SyncfusionThemeStudio Mock Server
> **Status**: TODO
> **Priority**: High
> **Created**: 2026-02-12

---

## Overview

Create a .NET mock API server that lives inside the SyncfusionThemeStudio repo. The server replaces the external DummyJSON dependency with a local, in-memory service that follows the **same Clean Architecture + FastEndpoints + MediatR + CQRS** patterns used by IdentityService, QuestionerService, and OnlineMenuSaaS. It provides full CRUD operations, paginated list endpoints, search, form-based POST/PUT/DELETE, and a WebSocket hub for real-time event streaming.

The mock server:
- Uses **EF Core InMemoryDatabase** (no Postgres, no Redis)
- Exposes an **OpenAPI/Swagger spec** that Orval consumes to generate React Query hooks
- Runs on **port 5150** and is started by the Tiltfile
- Serves as a realistic API surface for developing and testing the frontend

---

## Architecture (mirroring existing services)

```
SyncfusionThemeStudio/
└── MockServer/
    └── src/
        ├── MockServer.Core/           # Domain entities, interfaces, aggregates
        ├── MockServer.UseCases/       # CQRS commands/queries + MediatR handlers
        ├── MockServer.Infrastructure/ # EF Core InMemory DbContext, seed data
        └── MockServer.Web/            # FastEndpoints, Swagger, Program.cs, WebSocket hub
    └── tests/
        └── MockServer.UnitTests/      # xUnit tests for handlers
```

### Technology Stack (matching existing services)
- .NET 9 (matching QuestionerService/OnlineMenuSaaS target)
- FastEndpoints + FastEndpoints.Swagger (NSwag)
- MediatR for CQRS
- Ardalis.Result for Result<T> patterns
- EF Core with InMemory provider (no external DB)
- Serilog for logging
- SignalR for WebSocket hub

### Key Differences from Real Services
- **No authentication** — endpoints are anonymous (mock server)
- **No multi-tenancy** — single shared in-memory database
- **No RabbitMQ / Keycloak / Redis** — zero external dependencies
- **Seed data on startup** — pre-populated with realistic mock data
- **CORS wide open** — allows all origins for dev convenience

---

## Domain Entities (Mock Data)

### 1. Products (full CRUD + pagination + search)
Mirrors the current DummyJSON products but with write operations:
- `GET /api/products` — paginated list (limit, skip, sortBy, order)
- `GET /api/products/{id}` — get by ID
- `GET /api/products/search?q=` — text search
- `GET /api/products/categories` — list categories
- `GET /api/products/category/{name}` — filter by category
- `POST /api/products` — create (form body)
- `PUT /api/products/{id}` — update (form body)
- `DELETE /api/products/{id}` — delete

### 2. Users (list + CRUD)
- `GET /api/users` — paginated list
- `GET /api/users/{id}` — get by ID
- `GET /api/users/search?q=` — search
- `POST /api/users` — create
- `PUT /api/users/{id}` — update
- `DELETE /api/users/{id}` — delete

### 3. Orders (list + CRUD, demonstrates nested data)
- `GET /api/orders` — paginated list
- `GET /api/orders/{id}` — get by ID (includes order items)
- `POST /api/orders` — create
- `PUT /api/orders/{id}` — update status
- `DELETE /api/orders/{id}` — delete

### 4. Notifications (read-only list, used by WebSocket demo)
- `GET /api/notifications` — list recent
- `GET /api/notifications/unread-count` — count

### 5. WebSocket Hub (`/hubs/events`)
- Broadcasts random events every few seconds:
  - `NewOrder` — simulated order created
  - `StockUpdate` — product stock change
  - `UserActivity` — login/logout events
  - `SystemLog` — info/warning/error log lines
  - `Notification` — push notification simulation

---

## Task Breakdown

| # | Task | File | Agent |
|---|------|------|-------|
| 1 | [Scaffold .NET solution structure](./01-scaffold-dotnet-solution.md) | MockServer/**/*.csproj | `backend-dev` |
| 2 | [Create Core domain entities](./02-core-domain-entities.md) | MockServer.Core/ | `backend-dev` |
| 3 | [Create UseCases (CQRS handlers)](./03-usecases-cqrs-handlers.md) | MockServer.UseCases/ | `backend-dev` |
| 4 | [Create Infrastructure (InMemory DB + seed)](./04-infrastructure-inmemory-db.md) | MockServer.Infrastructure/ | `backend-dev` |
| 5 | [Create Web layer (FastEndpoints + Swagger)](./05-web-fastendpoints-swagger.md) | MockServer.Web/ | `backend-dev` |
| 6 | [Add WebSocket hub for real-time events](./06-websocket-hub.md) | MockServer.Web/ | `backend-dev` |
| 7 | [Write unit tests](./07-unit-tests.md) | MockServer.UnitTests/ | `backend-dev` |
| 8 | [Update Tiltfile to start mock server](./08-tiltfile-integration.md) | Tiltfile | `frontend-dev` |
| 9 | [Update Orval config + Vite proxy](./09-orval-vite-integration.md) | orval.config.ts, vite.config.ts | `frontend-dev` |
| 10 | [Create mock server mutator + regenerate hooks](./10-frontend-mutator-hooks.md) | src/api/ | `frontend-dev` |

---

## Agent Orchestration Strategy

### Phase 1 — Backend (sequential, Tasks 1-7)
Spawn a **single `backend-dev` agent** to execute tasks 1 through 7 sequentially. Each task builds on the previous one (Core → UseCases → Infrastructure → Web → WebSocket → Tests).

```
backend-dev: Tasks 1-7 (sequential, ~45 min)
```

### Phase 2 — Frontend Integration (parallel, Tasks 8-10)
Once the backend builds and the OpenAPI spec is available, spawn **parallel agents**:

```
frontend-dev (agent A): Task 8 — Tiltfile
frontend-dev (agent B): Task 9 — Orval + Vite proxy
frontend-dev (agent C): Task 10 — Mutator + hook regeneration (depends on Task 9)
```

Task 10 depends on Task 9 (needs the orval config updated first), so agent C runs after B completes.

### Phase 3 — Quality Gate + Code Review (parallel)
After all code is written, run quality verification:

```
quality-gate (backend):  dotnet build + dotnet test on MockServer
quality-gate (frontend): npm run lint:fix + npm run test:coverage + npx expo export --platform web
code-reviewer (backend): Review MockServer/ for patterns compliance
code-reviewer (frontend): Review orval.config.ts, vite.config.ts, mutator changes
```

### Launch Commands

**Phase 1 — Backend build:**
```
Task(subagent_type="backend-dev", prompt="Execute tasks 1-7 from mock-server-master-plan.md...")
```

**Phase 2 — Frontend integration (2 parallel agents):**
```
Task(subagent_type="frontend-dev", prompt="Execute task 8: Update Tiltfile...")
Task(subagent_type="frontend-dev", prompt="Execute tasks 9-10: Orval + Vite + mutator...")
```

**Phase 3 — Verification (4 parallel agents):**
```
Task(subagent_type="quality-gate", prompt="Run quality gate on MockServer: dotnet build && dotnet test")
Task(subagent_type="quality-gate", prompt="Run quality gate on frontend: lint, tests, build")
Task(subagent_type="code-reviewer", prompt="Review MockServer/ for Clean Architecture compliance")
Task(subagent_type="code-reviewer", prompt="Review frontend integration changes")
```

---

## Success Criteria

- [ ] `dotnet build` succeeds for all MockServer projects
- [ ] `dotnet test` passes all unit tests
- [ ] Mock server starts on port 5150 via Tiltfile
- [ ] Swagger UI accessible at `http://localhost:5150/swagger`
- [ ] OpenAPI spec exported to `src/api/swagger/mockserver.json`
- [ ] Orval generates React Query hooks from mock server spec
- [ ] `npm run api:generate` succeeds
- [ ] `npm run lint:fix` — no errors
- [ ] `npm run test:coverage` — all tests pass
- [ ] Vite proxy routes `/mockapi` to `http://localhost:5150`
- [ ] WebSocket hub streams events at `/hubs/events`
- [ ] Products CRUD works end-to-end (create, read, update, delete, list, search, paginate)
