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

# ===============================================================================
# 6. FIGMA PIPELINE
# ===============================================================================
# Architecture:
#   figma-extract  → Shared API call, saves data/figma-extract.json
#   figma-generate-<section> → Per-section generation (reads JSON, writes preset)
#   figma-generate → Main preset generator (imports section outputs)
#   figma-sync     → Full pipeline: extract → all generators → main generate
#
# Status key: [LIVE] = implemented, [STUB] = placeholder for future work

# --- Shared: Figma API Extraction (manual) ---
local_resource(
    name='figma-extract',
    labels=['Figma'],
    cmd='npm run figma:extract',
    trigger_mode=TRIGGER_MODE_MANUAL,
    allow_parallel=True,
)

# --- Shared: Figma Discovery (manual) ---
local_resource(
    name='figma-discover',
    labels=['Figma'],
    cmd='npm run figma:discover',
    trigger_mode=TRIGGER_MODE_MANUAL,
    allow_parallel=True,
)

# --- Foundation Generators ---
local_resource(
    name='figma-generate-typography',
    labels=['Figma'],
    cmd='npm run figma:generate:typography',
    resource_deps=['figma-extract'],
    trigger_mode=TRIGGER_MODE_MANUAL,
    auto_init=False,
    allow_parallel=True,
)

local_resource(
    name='figma-generate-colours',
    labels=['Figma'],
    cmd='npm run figma:generate:colours',
    resource_deps=['figma-extract'],
    trigger_mode=TRIGGER_MODE_MANUAL,
    auto_init=False,
    allow_parallel=True,
)

local_resource(
    name='figma-generate-layouts',
    labels=['Figma'],
    cmd='npm run figma:generate:layouts',
    resource_deps=['figma-extract'],
    trigger_mode=TRIGGER_MODE_MANUAL,
    auto_init=False,
    allow_parallel=True,
)

local_resource(
    name='figma-generate-icons',
    labels=['Figma'],
    cmd='npm run figma:generate:icons',
    resource_deps=['figma-extract'],
    trigger_mode=TRIGGER_MODE_MANUAL,
    auto_init=False,
    allow_parallel=True,
)

# --- Component Generators ---
local_resource(
    name='figma-generate-badges',
    labels=['Figma'],
    cmd='npm run figma:generate:badges',
    resource_deps=['figma-extract'],
    trigger_mode=TRIGGER_MODE_MANUAL,
    allow_parallel=True,
)

local_resource(
    name='figma-generate-buttons',
    labels=['Figma'],
    cmd='npm run figma:generate:buttons',
    resource_deps=['figma-extract'],
    trigger_mode=TRIGGER_MODE_MANUAL,
    auto_init=False,
    allow_parallel=True,
)

local_resource(
    name='figma-generate-description',
    labels=['Figma'],
    cmd='npm run figma:generate:description',
    resource_deps=['figma-extract'],
    trigger_mode=TRIGGER_MODE_MANUAL,
    auto_init=False,
    allow_parallel=True,
)

local_resource(
    name='figma-generate-input',
    labels=['Figma'],
    cmd='npm run figma:generate:input',
    resource_deps=['figma-extract'],
    trigger_mode=TRIGGER_MODE_MANUAL,
    auto_init=False,
    allow_parallel=True,
)

local_resource(
    name='figma-generate-drawer',
    labels=['Figma'],
    cmd='npm run figma:generate:drawer',
    resource_deps=['figma-extract'],
    trigger_mode=TRIGGER_MODE_MANUAL,
    auto_init=False,
    allow_parallel=True,
)

local_resource(
    name='figma-generate-external-link',
    labels=['Figma'],
    cmd='npm run figma:generate:external-link',
    resource_deps=['figma-extract'],
    trigger_mode=TRIGGER_MODE_MANUAL,
    auto_init=False,
    allow_parallel=True,
)

local_resource(
    name='figma-generate-notifications',
    labels=['Figma'],
    cmd='npm run figma:generate:notifications',
    resource_deps=['figma-extract'],
    trigger_mode=TRIGGER_MODE_MANUAL,
    auto_init=False,
    allow_parallel=True,
)

local_resource(
    name='figma-generate-image',
    labels=['Figma'],
    cmd='npm run figma:generate:image',
    resource_deps=['figma-extract'],
    trigger_mode=TRIGGER_MODE_MANUAL,
    auto_init=False,
    allow_parallel=True,
)

local_resource(
    name='figma-generate-nav-menus',
    labels=['Figma'],
    cmd='npm run figma:generate:nav-menus',
    resource_deps=['figma-extract'],
    trigger_mode=TRIGGER_MODE_MANUAL,
    auto_init=False,
    allow_parallel=True,
)

local_resource(
    name='figma-generate-dropdowns',
    labels=['Figma'],
    cmd='npm run figma:generate:dropdowns',
    resource_deps=['figma-extract'],
    trigger_mode=TRIGGER_MODE_MANUAL,
    auto_init=False,
    allow_parallel=True,
)

local_resource(
    name='figma-generate-breadcrumbs',
    labels=['Figma'],
    cmd='npm run figma:generate:breadcrumbs',
    resource_deps=['figma-extract'],
    trigger_mode=TRIGGER_MODE_MANUAL,
    auto_init=False,
    allow_parallel=True,
)

local_resource(
    name='figma-generate-data-grid',
    labels=['Figma'],
    cmd='npm run figma:generate:data-grid',
    resource_deps=['figma-extract'],
    trigger_mode=TRIGGER_MODE_MANUAL,
    auto_init=False,
    allow_parallel=True,
)

local_resource(
    name='figma-generate-combobox',
    labels=['Figma'],
    cmd='npm run figma:generate:combobox',
    resource_deps=['figma-extract'],
    trigger_mode=TRIGGER_MODE_MANUAL,
    auto_init=False,
    allow_parallel=True,
)

local_resource(
    name='figma-generate-filtering',
    labels=['Figma'],
    cmd='npm run figma:generate:filtering',
    resource_deps=['figma-extract'],
    trigger_mode=TRIGGER_MODE_MANUAL,
    auto_init=False,
    allow_parallel=True,
)

local_resource(
    name='figma-generate-pagination',
    labels=['Figma'],
    cmd='npm run figma:generate:pagination',
    resource_deps=['figma-extract'],
    trigger_mode=TRIGGER_MODE_MANUAL,
    auto_init=False,
    allow_parallel=True,
)

local_resource(
    name='figma-generate-progress',
    labels=['Figma'],
    cmd='npm run figma:generate:progress',
    resource_deps=['figma-extract'],
    trigger_mode=TRIGGER_MODE_MANUAL,
    auto_init=False,
    allow_parallel=True,
)

local_resource(
    name='figma-generate-skeleton',
    labels=['Figma'],
    cmd='npm run figma:generate:skeleton',
    resource_deps=['figma-extract'],
    trigger_mode=TRIGGER_MODE_MANUAL,
    auto_init=False,
    allow_parallel=True,
)

local_resource(
    name='figma-generate-slider',
    labels=['Figma'],
    cmd='npm run figma:generate:slider',
    resource_deps=['figma-extract'],
    trigger_mode=TRIGGER_MODE_MANUAL,
    auto_init=False,
    allow_parallel=True,
)

local_resource(
    name='figma-generate-subhead',
    labels=['Figma'],
    cmd='npm run figma:generate:subhead',
    resource_deps=['figma-extract'],
    trigger_mode=TRIGGER_MODE_MANUAL,
    auto_init=False,
    allow_parallel=True,
)

# --- Main Preset Generator (imports all section outputs) ---
local_resource(
    name='figma-generate',
    labels=['Figma'],
    cmd='npm run figma:generate',
    resource_deps=['figma-extract'],
    trigger_mode=TRIGGER_MODE_MANUAL,
    allow_parallel=True,
)

# --- Full Sync: extract → all generators → main generate ---
local_resource(
    name='figma-sync',
    labels=['Figma'],
    cmd='npm run figma:sync',
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
