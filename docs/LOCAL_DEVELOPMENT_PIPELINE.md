# Local Development Pipeline

> Back to [README](../README.md)

[Tilt](https://tilt.dev/) orchestrates the entire development workflow. It manages dependency ordering, runs quality checks before the dev server starts, and provides a dashboard to trigger manual actions.

```bash
# Start the pipeline (opens Tilt dashboard at http://localhost:10351)
tilt up

# Start on a specific port
tilt up --port=10351
```

---

## Automatic Startup Order

When you run `tilt up`, these resources execute automatically in dependency order:

```
theme-studio-lint          ESLint check (gate 1)
        │
        v
theme-studio-unit-tests    Jest with coverage (gate 2)
        │
        v
theme-studio-local         Vite local dev server on port 4444 (ready)
theme-studio-dev           Vite dev env server on port 4460 (ready)
```

The pipeline enforces that **lint must pass before tests run**, and **tests must pass before the dev server starts**.

---

## Resource Reference

### Local (automatic)

| Resource                         | Command                     | Trigger            | Why It Exists                                                                            |
| -------------------------------- | --------------------------- | ------------------ | ---------------------------------------------------------------------------------------- |
| `theme-studio-lint`              | `npm run lint`              | Auto               | Catches code style violations, unused imports, accessibility issues                      |
| `theme-studio-lint-fix`          | `npm run lint:fix`          | Manual             | Auto-fixes all fixable ESLint violations                                                 |
| `theme-studio-unit-tests`        | `npm run test:coverage`     | Auto (after lint)  | Runs the full Vitest suite with coverage. Blocks dev server on failure                   |
| `theme-studio-unit-tests-watch`  | `npm run test`              | Manual             | Starts Vitest in watch mode for TDD workflows                                            |
| `theme-studio-local`             | `npm run local`             | Auto (after tests) | **With Theme Studio** on **port 4444** — all features, mock server                       |
| `theme-studio-local-pure`        | `npm run local:pure`        | Auto (after tests) | **Without Theme Studio** on **port 4446** — all flags off, mock server                   |
| `theme-studio-local-real`        | `npm run local:real`        | Auto (after tests) | **Without Theme Studio** on **port 4447** — all flags off, real backend                  |
| `theme-studio-local-real-editor` | `npm run local:real:editor` | Auto (after tests) | **With Theme Studio** on **port 4448** — Theme Studio + Components + Forms, real backend |

### Dev Environment (automatic)

| Resource                       | Command                   | Trigger            | Why It Exists                                                                    |
| ------------------------------ | ------------------------- | ------------------ | -------------------------------------------------------------------------------- |
| `theme-studio-dev`             | `npm run dev`             | Auto (after tests) | **With Theme Studio** on **port 4460** — all features, Argosphere backend        |
| `theme-studio-dev-pure`        | `npm run dev:pure`        | Auto (after tests) | **Without Theme Studio** on **port 4461** — all flags off, Argosphere backend    |
| `theme-studio-dev-real`        | `npm run dev:real`        | Auto (after tests) | **Without Theme Studio** on **port 4462** — all flags off, real API              |
| `theme-studio-dev-real-editor` | `npm run dev:real:editor` | Auto (after tests) | **With Theme Studio** on **port 4463** — Theme Studio + Components + Forms, real |

### Build (manual)

| Resource                 | Command             | Trigger              | Why It Exists                                  |
| ------------------------ | ------------------- | -------------------- | ---------------------------------------------- |
| `theme-studio-typecheck` | `npm run typecheck` | Manual               | Full TypeScript type checking (`tsc --noEmit`) |
| `theme-studio-build`     | `npm run build`     | Manual (after hooks) | Optimized production bundle                    |
| `theme-studio-bundle`    | `npm run bundle`    | Manual (after build) | Zips `dist/` → `releases/dist.zip`             |
| `theme-studio-prod`      | `npm run preview`   | Manual (after build) | Serves production build on **port 4445**       |

### Testing (manual)

| Resource           | Command            | Trigger              | Why It Exists                                 |
| ------------------ | ------------------ | -------------------- | --------------------------------------------- |
| `theme-studio-e2e` | `npm run test:e2e` | Manual (after local) | Playwright E2E tests against local dev server |

### Quality (manual)

| Resource                       | Command                             | Trigger             | Why It Exists                             |
| ------------------------------ | ----------------------------------- | ------------------- | ----------------------------------------- |
| `theme-studio-lighthouse-prod` | `npm run lighthouse:prod:ci && ...` | Manual (after prod) | Lighthouse audit, score assertion, report |
| `theme-studio-bundle-analyze`  | `npm run analyze`                   | Manual              | Visual treemap of production bundle       |
| `theme-studio-security-audit`  | `npm audit --audit-level=high`      | Manual              | Known vulnerability check                 |
| `theme-studio-deps-health`     | `npm outdated`                      | Manual              | Lists outdated npm packages               |

### CodeGen (manual)

| Resource                      | Command                | Trigger | Why It Exists                                         |
| ----------------------------- | ---------------------- | ------- | ----------------------------------------------------- |
| `theme-studio-generate-hooks` | `npm run api:generate` | Manual  | Orval: generates typed React Query hooks from OpenAPI |

### Figma (manual)

All Figma resources require `FIGMA_API_TOKEN` / `FIGMA_FILE_KEY`. See [Figma Integration](FIGMA_INTEGRATION.md).

### MockServer

| Resource                   | Command                     | Trigger                         | Why It Exists                                                  |
| -------------------------- | --------------------------- | ------------------------------- | -------------------------------------------------------------- |
| `mock-server`              | `dotnet run MockServer.Web` | Auto                            | .NET mock API on **port 5150** (Products, Users, Orders)       |
| `mock-server-export-spec`  | Downloads `swagger.json`    | Manual (requires `mock-server`) | Exports OpenAPI spec to `src/api/swagger/mockserver.json`      |
| `mock-fetch-external-spec` | Downloads external swagger  | Manual                          | Fetches external service spec to `MockServer/swagger-sources/` |
| `mock-generate-endpoints`  | `dotnet run MockGenerator`  | Manual                          | Auto-generates FastEndpoints + DTOs + Bogus fakers from spec   |

**Workflow — mock a new external service:**

1. Edit `mock-fetch-external-spec` in Tiltfile to point at the target swagger URL
2. Trigger `mock-fetch-external-spec`
3. Edit `mock-generate-endpoints` with matching `--input`, `--output`, `--namespace`, `--prefix`
4. Trigger `mock-generate-endpoints`
5. Restart `mock-server`
6. Trigger `mock-server-export-spec` → `theme-studio-generate-hooks`

### Argosphere (auto + manual)

| Resource                           | Command                         | Trigger                        | Why It Exists                                               |
| ---------------------------------- | ------------------------------- | ------------------------------ | ----------------------------------------------------------- |
| `argosphere-server`                | `dotnet run Argosphere.Server`  | Auto                           | API gateway on **port 5076**, Swagger + YARP proxy          |
| `argosphere-sync-upstream-openapi` | `npm run sync:upstream-openapi` | Auto (after argosphere-server) | Pulls upstream OpenAPI specs into `SwaggerUpstream/`        |
| `argosphere-export-spec`           | Export swagger JSON             | Auto (after upstream sync)     | Exports merged OpenAPI to `src/api/swagger/argosphere.json` |
| `argosphere-verify-swagger`        | `npm run verify:yarp-swagger`   | Auto (after export)            | Verifies YARP routes exist in generated OpenAPI             |

---

## Port Summary

| Port      | Resource                         | Theme Studio | Backend                  | Auto-Start |
| --------- | -------------------------------- | :----------: | ------------------------ | :--------: |
| **4444**  | `theme-studio-local`             |     Yes      | Mock server              |    Yes     |
| **4445**  | `theme-studio-prod`              |     Yes      | Mock server (prod build) |     No     |
| **4446**  | `theme-studio-local-pure`        |      No      | Mock server              |    Yes     |
| **4447**  | `theme-studio-local-real`        |      No      | Real backend             |    Yes     |
| **4448**  | `theme-studio-local-real-editor` |     Yes      | Real backend             |    Yes     |
| **4460**  | `theme-studio-dev`               |     Yes      | Argosphere backend       |    Yes     |
| **4461**  | `theme-studio-dev-pure`          |      No      | Argosphere backend       |    Yes     |
| **4462**  | `theme-studio-dev-real`          |      No      | Argosphere (real API)    |    Yes     |
| **4463**  | `theme-studio-dev-real-editor`   |     Yes      | Argosphere (real API)    |    Yes     |
| **5076**  | `argosphere-server`              |      —       | —                        |    Yes     |
| **5150**  | `mock-server`                    |      —       | —                        |     No     |
| **10351** | Tilt dashboard                   |      —       | —                        |    Yes     |

---

## Common Workflows

**Normal development:** Just run `tilt up`. Lint, tests, and all dev servers start automatically.

**Before committing:** Trigger `theme-studio-typecheck` in the Tilt dashboard.

**Performance check:** Trigger `theme-studio-build` → `theme-studio-prod` → `theme-studio-lighthouse-prod`.

**After API changes:** Trigger `mock-server-export-spec` → `theme-studio-generate-hooks`.

**Figma sync:** Trigger `figma-sync` for the full pipeline, or individual section generators after `figma-extract`.
