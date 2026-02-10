# ===============================================================================
# SYNCFUSION THEME STUDIO - TILTFILE
# ===============================================================================
#
# A standalone Tiltfile for the Syncfusion Theme Studio project.
# Run with: tilt up
#
# Resources:
#   - theme-studio-lint: ESLint check
#   - theme-studio-unit-tests: Vitest unit tests
#   - theme-studio-dev: Development server (port 4444)
#   - theme-studio-e2e: Playwright E2E tests (manual)
#   - theme-studio-build: Production build (manual)
#
# Port: 4444 (different from BaseClient which uses 8082)
# ===============================================================================

# --- Linter ---
local_resource(
    name='theme-studio-lint',
    labels=['ThemeStudio'],
    cmd='npm run lint',
    allow_parallel=True,
)

local_resource(
    name='theme-studio-lint-fix',
    labels=['ThemeStudio'],
    cmd='npm run lint:fix',
    trigger_mode=TRIGGER_MODE_MANUAL,
    allow_parallel=True,
)

# --- Unit Tests (waits for Lint) ---
local_resource(
    name='theme-studio-unit-tests',
    labels=['ThemeStudio'],
    cmd='npm run test:coverage',
    resource_deps=['theme-studio-lint'],
    allow_parallel=True,
)

local_resource(
    name='theme-studio-unit-tests-watch',
    labels=['ThemeStudio'],
    serve_cmd='npm run test',
    trigger_mode=TRIGGER_MODE_MANUAL,
    allow_parallel=True,
)

# --- Development Server (waits for Unit Tests) ---
local_resource(
    name='theme-studio-dev',
    labels=['ThemeStudio'],
    serve_cmd='npm run dev -- --port 4444',
    resource_deps=['theme-studio-unit-tests'],
    links=[
        link('http://localhost:4444', 'Dashboard'),
        link('http://localhost:4444/products', 'Products (API Demo)'),
        link('http://localhost:4444/components/native', 'Native Components'),
        link('http://localhost:4444/components/syncfusion', 'Syncfusion Components'),
        link('http://localhost:4444/login', 'Login Page'),
    ],
)

# --- Production Build (manual) ---
local_resource(
    name='theme-studio-build',
    labels=['ThemeStudio'],
    cmd='npm run build',
    trigger_mode=TRIGGER_MODE_MANUAL,
    allow_parallel=True,
)

# --- TypeCheck (manual) ---
local_resource(
    name='theme-studio-typecheck',
    labels=['ThemeStudio'],
    cmd='npm run typecheck',
    trigger_mode=TRIGGER_MODE_MANUAL,
    allow_parallel=True,
)

# --- E2E Tests (manual, depends on dev server) ---
local_resource(
    name='theme-studio-e2e',
    labels=['ThemeStudio'],
    cmd='npm run test:e2e',
    resource_deps=['theme-studio-dev'],
    trigger_mode=TRIGGER_MODE_MANUAL,
)

# local_resource(
#     name='theme-studio-e2e-ui',
#     labels=['ThemeStudio'],
#     serve_cmd='npm run test:e2e:ui',
#     resource_deps=['theme-studio-dev'],
#     trigger_mode=TRIGGER_MODE_MANUAL,
# )

# --- API Hook Generation (manual) ---
local_resource(
    name='theme-studio-generate-hooks',
    labels=['ThemeStudio'],
    cmd='npm run api:generate',
    trigger_mode=TRIGGER_MODE_MANUAL,
    allow_parallel=True,
)

# --- Preview Production Build (manual) ---
local_resource(
    name='theme-studio-preview',
    labels=['ThemeStudio'],
    serve_cmd='npm run preview -- --port 4445',
    resource_deps=['theme-studio-build'],
    trigger_mode=TRIGGER_MODE_MANUAL,
    links=[
        link('http://localhost:4445', 'Preview - Dashboard'),
        link('http://localhost:4445/products', 'Preview - Products'),
        link('http://localhost:4445/components/native', 'Preview - Native Components'),
        link('http://localhost:4445/components/syncfusion', 'Preview - Syncfusion Components'),
    ],
)
# ===============================================================================
# QUALITY GATES - Performance & Bundle Analysis
# ===============================================================================

# --- Lighthouse Performance Audit (manual, runs after E2E tests) ---
# Enforces 100% scores for performance, accessibility, best practices, SEO
local_resource(
    name='theme-studio-lighthouse',
    labels=['ThemeStudio', 'QualityGate'],
    cmd='npm run lighthouse:ci',
    resource_deps=['theme-studio-e2e'],
    trigger_mode=TRIGGER_MODE_MANUAL,
    allow_parallel=True,
)

# --- Lighthouse Audit with HTML Report (manual) ---
# NOTE: This runs against DEV server (unoptimized). For accurate metrics, use theme-studio-lighthouse-prod
local_resource(
    name='theme-studio-lighthouse-dev',
    labels=['ThemeStudio', 'QualityGate'],
    cmd='npm run lighthouse && npm run lighthouse:open',
    resource_deps=['theme-studio-dev'],
    trigger_mode=TRIGGER_MODE_MANUAL,
    allow_parallel=True,
)

# --- Lighthouse on Production Build (manual) ---
# Runs against production preview server for accurate performance metrics
local_resource(
    name='theme-studio-lighthouse-prod',
    labels=['ThemeStudio', 'QualityGate'],
    cmd='npm run build && powershell -Command "Start-Process -NoNewWindow npm -ArgumentList \'run\',\'preview\',\'--\',\'--port\',\'4446\'; Start-Sleep -Seconds 3; npx lighthouse http://localhost:4446 --output html --output-path ./reports/lighthouse-prod.html; Start-Process ./reports/lighthouse-prod.html"',
    trigger_mode=TRIGGER_MODE_MANUAL,
    allow_parallel=True,
    links=[
        link('http://localhost:4446', 'Preview - Dashboard Prod'),
        link('http://localhost:4446/products', 'Preview - Products Prod'),
        link('http://localhost:4446/components/native', 'Preview - Native Components Prod')
    ],
)

# --- Bundle Analyzer (manual) ---
# Opens interactive visualization of bundle sizes
local_resource(
    name='theme-studio-bundle-analyze',
    labels=['ThemeStudio', 'QualityGate'],
    cmd='npm run analyze',
    trigger_mode=TRIGGER_MODE_MANUAL,
    allow_parallel=True,
)

# --- Security Audit (manual) ---
local_resource(
    name='theme-studio-security-audit',
    labels=['ThemeStudio', 'QualityGate'],
    cmd='npm audit --audit-level=high',
    trigger_mode=TRIGGER_MODE_MANUAL,
    allow_parallel=True,
)

# --- Dependency Health Check (manual) ---
# Note: npm outdated returns exit code 1 when packages are outdated
# Using PowerShell to always succeed regardless of outdated packages
local_resource(
    name='theme-studio-deps-health',
    labels=['ThemeStudio', 'QualityGate'],
    cmd='powershell -Command "npm outdated; exit 0"',
    trigger_mode=TRIGGER_MODE_MANUAL,
    allow_parallel=True,
)
