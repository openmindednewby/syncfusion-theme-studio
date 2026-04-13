# ENT-21: Health Check Endpoints

## Status: TODO
## Priority: Low
## Depends on: None
## Agent: backend-dev

## Objective

Add standard health check endpoints to MockServer for Docker/Kubernetes readiness and liveness probes.

## Implementation Plan

### 1. Health Check Endpoints

- `GET /healthz` — liveness probe (always returns 200 if the process is running)
- `GET /readyz` — readiness probe (checks DB connection, returns 200 when ready, 503 when not)
- `GET /api/health` — detailed health info (version, uptime, database status, memory usage)

### 2. Implementation

- Use ASP.NET Core built-in health checks: `builder.Services.AddHealthChecks()`
- Add EF Core health check: `.AddDbContextCheck<AppDbContext>()`
- Map endpoints: `app.MapHealthChecks("/healthz")`, `app.MapHealthChecks("/readyz")`
- Custom `/api/health` endpoint with detailed JSON response

### 3. Update Docker Compose

Add health check to `mock-server` service:
```yaml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:8080/healthz"]
  interval: 10s
  timeout: 3s
  retries: 3
  start_period: 10s
```

Add `depends_on` condition to `theme-studio`:
```yaml
depends_on:
  mock-server:
    condition: service_healthy
```

## Success Criteria

- [ ] `/healthz` returns 200
- [ ] `/readyz` returns 200 when DB is connected
- [ ] `/api/health` returns version, uptime, DB status
- [ ] Docker Compose uses health check for service ordering
