# Task 08: Update Tiltfile to Start Mock Server

> **Parent**: [mock-server-master-plan.md](./mock-server-master-plan.md)
> **Status**: TODO
> **Agent**: `frontend-dev`
> **Depends on**: Task 05
> **Blocks**: None

---

## Objective

Add the mock server as a Tilt resource so it starts automatically with the dev environment. Add it to a new `MockServer` resource group.

## Changes to Tiltfile

Add a new section between the existing sections:

```python
# ===============================================================================
# 6. MOCK SERVER
# ===============================================================================

# --- Mock Server (.NET) ---
local_resource(
    name='mock-server',
    labels=['MockServer'],
    serve_cmd='dotnet run --project MockServer/src/MockServer.Web/MockServer.Web.csproj --urls http://localhost:5150',
    links=[
        link('http://localhost:5150/swagger', 'Swagger UI'),
        link('http://localhost:5150/api/products', 'Products API'),
        link('http://localhost:5150/api/users', 'Users API'),
        link('http://localhost:5150/api/orders', 'Orders API'),
    ],
    readiness_probe=probe(
        http_get=http_get_action(port=5150, path='/api/products'),
        initial_delay_secs=5,
        period_secs=10,
    ),
)

# --- Mock Server OpenAPI Spec Export (manual, depends on mock-server) ---
local_resource(
    name='mock-server-export-spec',
    labels=['MockServer'],
    cmd='powershell -Command "Invoke-WebRequest -Uri http://localhost:5150/swagger/v1/swagger.json -OutFile src/api/swagger/mockserver.json; Write-Host \'OpenAPI spec exported to src/api/swagger/mockserver.json\'"',
    resource_deps=['mock-server'],
    trigger_mode=TRIGGER_MODE_MANUAL,
    allow_parallel=True,
)
```

### Make dev server depend on mock-server (optional)

If you want the dev server to wait for the mock server:

```python
# Update existing theme-studio-dev resource_deps
# resource_deps=['theme-studio-unit-tests', 'mock-server'],
```

This is optional — the Vite proxy will retry connections anyway.

### Update generate-hooks to depend on spec export

```python
# Update theme-studio-generate-hooks to optionally depend on spec export
# resource_deps=['mock-server-export-spec'],
```

## Verification

```bash
cd SyncfusionThemeStudio
tilt up
# Verify 'mock-server' resource appears in Tilt UI
# Verify readiness probe passes (green status)
# Verify swagger link works
```

## Success Criteria

- [ ] `mock-server` resource appears in Tilt UI under `MockServer` group
- [ ] Server starts on port 5150
- [ ] Readiness probe passes (health check via products endpoint)
- [ ] Swagger UI link works from Tilt dashboard
- [ ] `mock-server-export-spec` exports OpenAPI JSON when triggered
- [ ] No impact on existing Tilt resources
