# ===============================================================================
# SYNCFUSION THEME STUDIO - TILTFILE
# ===============================================================================
#
# A standalone Tiltfile for the Syncfusion Theme Studio project.
# Run with: tilt up
#
# Resource Groups:
#   Dev       - Lint, unit tests, dev servers (4444 with Theme Studio, 4446/4447 without)
#   Build     - TypeCheck, production build, preview server (port 4445)
#   Testing   - Playwright E2E tests
#   Quality   - Lighthouse, bundle analysis, security, dependency health
#   CodeGen   - API hook generation (Orval)
#   Docker    - Docker Compose build, up, down (ports 4444, 5150)
#
# ===============================================================================

# ===============================================================================
# 1. DEVELOPMENT
# ===============================================================================

# --- Linter ---
local_resource(
    name='theme-studio-lint',
    labels=['Dev'],
    cmd='npm run lint',
    trigger_mode=TRIGGER_MODE_MANUAL,
    allow_parallel=True,
)

local_resource(
    name='theme-studio-lint-fix',
    labels=['Dev'],
    cmd='npm run lint:fix',
    trigger_mode=TRIGGER_MODE_MANUAL,
    auto_init=False,
    allow_parallel=True,
)

# --- Unit Tests (waits for Lint) ---
local_resource(
    name='theme-studio-unit-tests',
    labels=['Dev'],
    cmd='npm run test:coverage',
    resource_deps=['theme-studio-lint'],
    allow_parallel=True,
)

local_resource(
    name='theme-studio-unit-tests-watch',
    labels=['Dev'],
    serve_cmd='npm run test',
    trigger_mode=TRIGGER_MODE_MANUAL,
    auto_init=False,
    allow_parallel=True,
)

# --- Development Server Variants ---
#
# Port assignment:
#   4444  theme-studio-dev       With Theme Studio + mock server
#   4445  theme-studio-prod      Production preview build
#   4446  theme-studio-dev-pure  Without Theme Studio + mock server
#   4447  theme-studio-dev-real  Without Theme Studio + real backend
#
# Feature flags in .env control which sections are enabled:
#   VITE_ENABLE_THEME_STUDIO, VITE_ENABLE_COMPONENTS, VITE_ENABLE_FORMS, VITE_ENABLE_PRODUCTS
#
# All dev variants can run simultaneously on different ports.

# 4444 — With Theme Studio: all features enabled, mock server backend
local_resource(
    name='theme-studio-dev',
    labels=['Dev'],
    serve_cmd='npm run dev',
    resource_deps=['theme-studio-unit-tests'],
    links=[
        link('http://localhost:4444', 'Dashboard'),
        link('http://localhost:4444/products', 'Products (API Demo)'),
        link('http://localhost:4444/components/native', 'Native Components'),
        link('http://localhost:4444/components/syncfusion', 'Syncfusion Components'),
        link('http://localhost:4444/login', 'Login Page'),
    ],
)

# 4446 — Without Theme Studio: all feature flags off, mock server backend
local_resource(
    name='theme-studio-dev-pure',
    labels=['Dev'],
    serve_cmd='npx vite --port 4446',
    resource_deps=['theme-studio-unit-tests'],
    env={
        'VITE_ENABLE_THEME_STUDIO': 'false',
        'VITE_ENABLE_COMPONENTS': 'false',
        'VITE_ENABLE_FORMS': 'false',
        'VITE_ENABLE_PRODUCTS': 'false',
    },
    links=[
        link('http://localhost:4446', 'Dashboard'),
        link('http://localhost:4446/login', 'Login Page'),
    ],
)

# 4447 — Without Theme Studio: all feature flags off, real backend service
# Set VITE_BACKEND_URL below to your real backend (e.g. https://api.example.com)
local_resource(
    name='theme-studio-dev-real',
    labels=['Dev'],
    serve_cmd='npx vite --port 4447',
    resource_deps=['theme-studio-unit-tests'],
    env={
        'VITE_ENABLE_THEME_STUDIO': 'false',
        'VITE_ENABLE_COMPONENTS': 'false',
        'VITE_ENABLE_FORMS': 'false',
        'VITE_ENABLE_PRODUCTS': 'false',
        'VITE_BACKEND_URL': 'http://localhost:5000',
    },
    links=[
        link('http://localhost:4447', 'Dashboard'),
        link('http://localhost:4447/login', 'Login Page'),
    ],
)

# ===============================================================================
# 2. BUILD & PREVIEW
# ===============================================================================

# --- TypeCheck (manual) ---
local_resource(
    name='theme-studio-typecheck',
    labels=['Build'],
    cmd='npm run typecheck',
    trigger_mode=TRIGGER_MODE_MANUAL,
    allow_parallel=True,
)

# --- Production Build (manual) ---
local_resource(
    name='theme-studio-build',
    labels=['Build'],
    cmd='npm run build',
    resource_deps=['theme-studio-generate-hooks'],
    trigger_mode=TRIGGER_MODE_MANUAL,
    allow_parallel=True,
)

# --- Production Server (manual, builds then serves on port 4445) ---
local_resource(
    name='theme-studio-prod',
    labels=['Build'],
    serve_cmd='npm run preview',
    resource_deps=['theme-studio-build'],
    trigger_mode=TRIGGER_MODE_MANUAL,
    links=[
        link('http://localhost:4445', 'Prod - Dashboard'),
        link('http://localhost:4445/products', 'Prod - Products'),
        link('http://localhost:4445/components/native', 'Prod - Native Components'),
        link('http://localhost:4445/components/syncfusion', 'Prod - Syncfusion Components'),
        link('http://localhost:4445/login', 'Prod - Login Page'),
    ],
)

# ===============================================================================
# 3. TESTING
# ===============================================================================

# --- E2E Lint (manual) ---
local_resource(
    name='theme-studio-e2e-lint',
    labels=['Testing'],
    cmd='npm run e2e:lint',
    trigger_mode=TRIGGER_MODE_MANUAL,
    allow_parallel=True,
)

# --- E2E Test Suites (sequential pipeline) ---
# Each suite runs after the previous completes, keeping feedback fast
# and isolating failures to a specific domain.
#
# Suite order: auth → navigation → pages → components → theme → integration
# Rationale: auth/nav are fast smoke tests that catch blocking issues first,
# then heavier suites run in order of importance.

# Suite 1: Auth (login, RBAC) — ~13 tests, fast gate
# Uses theme-studio-prod (preview server on :4445) for fast static file serving.
local_resource(
    name='e2e-1-auth',
    labels=['Testing'],
    cmd='npm run test:e2e:auth',
    resource_deps=['theme-studio-e2e-lint', 'theme-studio-prod'],
    trigger_mode=TRIGGER_MODE_MANUAL,
)

# Suite 2: Navigation & routing — ~25 tests
local_resource(
    name='e2e-2-navigation',
    labels=['Testing'],
    cmd='npm run test:e2e:navigation',
    resource_deps=['e2e-1-auth'],
    trigger_mode=TRIGGER_MODE_MANUAL,
)

# Suite 3: Feature pages — ~246 tests, split into 3 parallel batches of ~82
# 3a: a-d files (99 tests) — accessibility, activity-log, admin, breadcrumb, calendar, chat, components, console, customers, dark-mode, dashboard
local_resource(
    name='e2e-3a-pages',
    labels=['Testing'],
    cmd='npm run test:e2e:pages-a',
    resource_deps=['e2e-2-navigation'],
    trigger_mode=TRIGGER_MODE_MANUAL,
)

# 3b: e-m files (72 tests) — error-pages, externallink, file-manager, gantt, inventory, invoices, kanban, landing-page, language, maps
local_resource(
    name='e2e-3b-pages',
    labels=['Testing'],
    cmd='npm run test:e2e:pages-b',
    resource_deps=['e2e-2-navigation'],
    trigger_mode=TRIGGER_MODE_MANUAL,
)

# 3c: n-z files (75 tests) — notifications, orders, org-switcher, pdf-viewer, pricing, rich-text, settings, system-settings, user-profile
local_resource(
    name='e2e-3c-pages',
    labels=['Testing'],
    cmd='npm run test:e2e:pages-c',
    resource_deps=['e2e-2-navigation'],
    trigger_mode=TRIGGER_MODE_MANUAL,
)

# Suite 4: UI components — ~178 tests
local_resource(
    name='e2e-4-components',
    labels=['Testing'],
    cmd='npm run test:e2e:components',
    resource_deps=['e2e-3a-pages', 'e2e-3b-pages', 'e2e-3c-pages'],
    trigger_mode=TRIGGER_MODE_MANUAL,
)

# Suite 5: Theme editor — ~50 tests
local_resource(
    name='e2e-5-theme',
    labels=['Testing'],
    cmd='npm run test:e2e:theme',
    resource_deps=['e2e-4-components'],
    trigger_mode=TRIGGER_MODE_MANUAL,
)

# Suite 6: Integration (PWA, sidebar, forms, visual QA) — ~50 tests
local_resource(
    name='e2e-6-integration',
    labels=['Testing'],
    cmd='npm run test:e2e:integration',
    resource_deps=['e2e-5-theme'],
    trigger_mode=TRIGGER_MODE_MANUAL,
)

# --- E2E All (runs everything at once, escape hatch) ---
# Uses theme-studio-prod (preview server on :4445) for fast static file serving.
local_resource(
    name='e2e-all',
    labels=['Testing'],
    cmd='npm run test:e2e',
    resource_deps=['theme-studio-e2e-lint', 'theme-studio-prod'],
    trigger_mode=TRIGGER_MODE_MANUAL,
    auto_init=False,
)

# ===============================================================================
# 4. QUALITY GATES
# ===============================================================================

# --- Lighthouse on Prod (manual, HTML report + JSON score assertion) ---
# Runs against production preview server (port 4445) for accurate performance metrics
local_resource(
    name='theme-studio-lighthouse-prod',
    labels=['Quality'],
    cmd='npm run lighthouse:prod:ci && npm run lighthouse:prod:assert && npm run lighthouse:prod && npm run lighthouse:prod:open',
    resource_deps=['theme-studio-prod'],
    trigger_mode=TRIGGER_MODE_MANUAL,
    allow_parallel=True,
    links=[
        link('http://localhost:4445/login', 'Prod - Login Page'),
    ],
)

# --- Bundle Analyzer (manual) ---
local_resource(
    name='theme-studio-bundle-analyze',
    labels=['Quality'],
    cmd='npm run analyze',
    trigger_mode=TRIGGER_MODE_MANUAL,
    allow_parallel=True,
)

# --- Security Audit (manual) ---
local_resource(
    name='theme-studio-security-audit',
    labels=['Quality'],
    cmd='npm audit --audit-level=high',
    trigger_mode=TRIGGER_MODE_MANUAL,
    allow_parallel=True,
)

# --- Dependency Health Check (manual) ---
# Note: npm outdated returns exit code 1 when packages are outdated
# Using PowerShell to always succeed regardless of outdated packages
local_resource(
    name='theme-studio-deps-health',
    labels=['Quality'],
    cmd='powershell -Command "npm outdated; exit 0"',
    trigger_mode=TRIGGER_MODE_MANUAL,
    allow_parallel=True,
)

# ===============================================================================
# 5. CODE GENERATION
# ===============================================================================

# --- API Hook Generation (manual) ---
local_resource(
    name='theme-studio-generate-hooks',
    labels=['CodeGen'],
    cmd='npm run api:generate',
    trigger_mode=TRIGGER_MODE_MANUAL,
    allow_parallel=True,
)

# ===============================================================================
# 6. MOCK SERVER
# ===============================================================================

# --- Mock Server (.NET API on port 5150) ---
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
        initial_delay_secs=10,
        period_secs=10,
    ),
)

# --- Export OpenAPI spec for Orval (manual, depends on mock-server) ---
local_resource(
    name='mock-server-export-spec',
    labels=['MockServer'],
    cmd='powershell -Command "Invoke-WebRequest -Uri http://localhost:5150/swagger/v1/swagger.json -OutFile src/api/swagger/mockserver.json; Write-Host \'OpenAPI spec exported to src/api/swagger/mockserver.json\'"',
    resource_deps=['mock-server'],
    trigger_mode=TRIGGER_MODE_MANUAL,
    allow_parallel=True,
)

# --- Fetch External Service Swagger Spec (manual) ---
local_resource(
    name='mock-fetch-external-spec',
    labels=['MockServer'],
    cmd='powershell -Command "Invoke-WebRequest -Uri https://external-service/swagger/v1/swagger.json -OutFile MockServer/swagger-sources/external-service.swagger.json; Write-Host \'External swagger spec saved to MockServer/swagger-sources/\'"',
    trigger_mode=TRIGGER_MODE_MANUAL,
    allow_parallel=True,
)

# --- Generate Mock Endpoints from Sample Swagger (manual) ---
local_resource(
    name='mock-generate-endpoints',
    labels=['MockServer'],
    cmd='dotnet run --project MockServer/tools/MockGenerator -- --input MockServer/swagger-sources/sample-external-api.swagger.json --output MockServer/src/MockServer.Web/Generated/SampleApi --namespace MockServer.Web.Generated.SampleApi --prefix /sample --seed-count 25',
    trigger_mode=TRIGGER_MODE_MANUAL,
    allow_parallel=True,
)

# ===============================================================================
# 7. DOCKER
# ===============================================================================

# --- Docker Compose Build (manual) ---
local_resource(
    name='theme-studio-docker-build',
    labels=['Docker'],
    cmd='docker compose build',
    trigger_mode=TRIGGER_MODE_MANUAL,
    auto_init=False,
    allow_parallel=True,
)

# --- Docker Compose Up (manual) ---
local_resource(
    name='theme-studio-docker-up',
    labels=['Docker'],
    cmd='docker compose up -d',
    trigger_mode=TRIGGER_MODE_MANUAL,
    auto_init=False,
    allow_parallel=True,
    links=[
        link('http://localhost:4444', 'Theme Studio (Docker)'),
        link('http://localhost:5150/swagger', 'MockServer Swagger (Docker)'),
    ],
)

# --- Docker Compose Down (manual) ---
local_resource(
    name='theme-studio-docker-down',
    labels=['Docker'],
    cmd='docker compose down',
    trigger_mode=TRIGGER_MODE_MANUAL,
    auto_init=False,
    allow_parallel=True,
)
