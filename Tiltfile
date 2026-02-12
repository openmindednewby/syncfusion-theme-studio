# ===============================================================================
# SYNCFUSION THEME STUDIO - TILTFILE
# ===============================================================================
#
# A standalone Tiltfile for the Syncfusion Theme Studio project.
# Run with: tilt up
#
# Resource Groups:
#   Dev       - Lint, unit tests, dev server (port 4444)
#   Build     - TypeCheck, production build, preview server (port 4445)
#   Testing   - Playwright E2E tests
#   Quality   - Lighthouse, bundle analysis, security, dependency health
#   CodeGen   - API hook generation (Orval)
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
    allow_parallel=True,
)

# --- Development Server (waits for Unit Tests) ---
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
    ],
)

# ===============================================================================
# 3. TESTING
# ===============================================================================

# --- E2E Tests (manual, depends on dev server) ---
local_resource(
    name='theme-studio-e2e',
    labels=['Testing'],
    cmd='npm run test:e2e',
    resource_deps=['theme-studio-dev'],
    trigger_mode=TRIGGER_MODE_MANUAL,
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
