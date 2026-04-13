# ENT-17: GitHub Actions CI/CD

## Status: TODO
## Priority: Medium
## Depends on: None
## Agent: chief-architect

## Objective

Add GitHub Actions workflows for automated CI/CD — lint, test, build, Docker image push. Essential for any open-source project.

## Implementation Plan

### 1. CI Workflow (`.github/workflows/ci.yml`)

Triggers: push to `main`, pull requests

**Jobs** (parallel where possible):

- **lint**: `npm run lint` (SyncfusionThemeStudio)
- **typecheck**: `npm run typecheck`
- **unit-tests**: `npm run test:coverage` — upload coverage report as artifact
- **build-frontend**: `npm run build` — upload dist as artifact
- **build-mockserver**: `dotnet build MockServer/src/MockServer.Web/MockServer.Web.csproj`
- **mockserver-tests**: `dotnet test MockServer/tests/MockServer.UnitTests/`
- **docker-build**: `docker compose build` — verify images build (depends on lint + tests)

### 2. E2E Workflow (`.github/workflows/e2e.yml`)

Triggers: push to `main`, manual dispatch

- Start MockServer + frontend (via Docker Compose)
- Wait for health checks
- Run Playwright tests
- Upload test report + screenshots as artifacts

### 3. Docker Publish Workflow (`.github/workflows/docker-publish.yml`)

Triggers: tag push (`v*`)

- Build and push to GitHub Container Registry (ghcr.io)
- Tag images with version and `latest`
- Both `theme-studio` and `mock-server` images

### 4. Dependabot Config (`.github/dependabot.yml`)

- npm ecosystem (weekly)
- NuGet ecosystem (weekly)
- GitHub Actions (monthly)

## Success Criteria

- [ ] CI runs on every PR and blocks merge on failure
- [ ] Unit tests + lint + build all green
- [ ] E2E workflow runs against Docker containers
- [ ] Docker images published on tag push
- [ ] Dependabot keeps dependencies updated
