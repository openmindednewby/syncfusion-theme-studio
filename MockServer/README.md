# MockServer

Standalone mock API server for SyncfusionThemeStudio. Provides fake REST endpoints and real-time SignalR events so the frontend can run without any external service dependencies.

## Architecture

```
MockServer/
├── src/
│   ├── MockServer.Core/             # Domain entities + IRepository interface
│   ├── MockServer.Infrastructure/   # EF Core InMemory + seed data
│   ├── MockServer.UseCases/         # CQRS commands/queries (MediatR)
│   └── MockServer.Web/              # FastEndpoints + SignalR hub + Generated endpoints
│       └── Generated/               # Auto-generated endpoints from external specs
├── tools/
│   └── MockGenerator/               # CLI tool: swagger.json -> endpoints + DTOs + fakers
├── swagger-sources/                 # External OpenAPI specs (checked into git)
├── tests/
│   └── MockServer.UnitTests/
└── MockServer.slnx                  # Solution file (XML format)
```

**Stack:** ASP.NET Core 9 / FastEndpoints 5.33 / MediatR / EF Core InMemory / Bogus / SignalR

## Getting Started

### Prerequisites

- [.NET 9 SDK](https://dotnet.microsoft.com/download/dotnet/9.0)
- (Optional) [Tilt](https://tilt.dev/) for the dev environment workflow

### Run Manually

```bash
# From the MockServer/ directory
dotnet restore MockServer.slnx
dotnet build MockServer.slnx
dotnet run --project src/MockServer.Web --urls http://localhost:5150
```

### Run with Tilt

MockServer is integrated into the SyncfusionThemeStudio Tiltfile at [`../Tiltfile`](../Tiltfile). From the `SyncfusionThemeStudio/` root:

```bash
tilt up
# MockServer starts automatically as the 'mock-server' resource on port 5150
```

### Verify

| URL | What to expect |
|-----|----------------|
| http://localhost:5150/swagger | Swagger UI with all endpoints |
| http://localhost:5150/api/products | JSON list of 30 seeded products |
| http://localhost:5150/api/users | JSON list of seeded users |
| http://localhost:5150/api/orders | JSON list of seeded orders |

---

## Existing Hand-Crafted Endpoints

These endpoints use the full Clean Architecture stack (Entity -> Repository -> MediatR Handler -> FastEndpoint). They are seeded on startup via EF Core InMemory.

| Endpoint | Methods | Description |
|----------|---------|-------------|
| `/api/products` | GET, POST | Product catalog with search and category filtering |
| `/api/products/{id}` | GET, PUT, DELETE | Single product CRUD |
| `/api/users` | GET, POST | User management with search |
| `/api/users/{id}` | GET, PUT, DELETE | Single user CRUD |
| `/api/orders` | GET, POST | Order management |
| `/api/orders/{id}` | GET, PUT, DELETE | Single order CRUD |
| `/api/notifications` | GET | Notification list and unread count |

All list endpoints support pagination via `?skip=0&limit=30` query parameters. Responses use `PaginatedList<T>` with `items`, `total`, `skip`, `limit` fields.

## SignalR Hub

The `EventsHub` at `/hubs/events` broadcasts real-time events via `EventBroadcasterService`. Connect from the frontend:

```typescript
const connection = new HubConnectionBuilder()
  .withUrl('http://localhost:5150/hubs/events')
  .build();
```

---

## Mock Generator

The MockGenerator is a CLI tool that reads an external service's `swagger.json` (OpenAPI 3.x) and auto-generates:

- **DTOs** — C# records with `init` properties (`.g.cs`)
- **Fakers** — Bogus `Faker<T>` classes with smart property-name heuristics
- **Endpoints** — FastEndpoints classes (GET list, GET by ID, POST, PUT, DELETE)
- **Seed store** — Static in-memory `GeneratedStore` pre-populated via Fakers

Generated endpoints are intentionally simpler than hand-crafted ones: no MediatR, no EF Core, no repository. They use static `List<T>` with Bogus-generated seed data. This keeps the generator straightforward while still producing working mock endpoints that coexist alongside the hand-crafted ones.

### Step-by-Step: Mock a New External Service

Follow these steps end-to-end to add a new mocked external API.

#### Step 1 — Obtain the swagger spec

Get the external service's OpenAPI spec and save it into `swagger-sources/`:

```bash
# Option A: curl from a running service
curl https://external-service.example.com/swagger/v1/swagger.json \
  -o swagger-sources/my-service.swagger.json

# Option B: copy a file you already have
cp /path/to/spec.json swagger-sources/my-service.swagger.json
```

The file must be a valid OpenAPI 3.x JSON document. A sample spec is included at `swagger-sources/sample-external-api.swagger.json` for reference.

#### Step 2 — Run the generator

```bash
# From the MockServer/ directory
dotnet run --project tools/MockGenerator -- \
  --input  swagger-sources/my-service.swagger.json \
  --output src/MockServer.Web/Generated/MyService \
  --namespace MockServer.Web.Generated.MyService \
  --prefix /my-service \
  --seed-count 25
```

> **Git Bash on Windows:** Prefix the command with `MSYS_NO_PATHCONV=1` to prevent Git Bash from mangling the `--prefix` value (it interprets `/my-service` as a filesystem path).

This creates the following under `src/MockServer.Web/Generated/MyService/`:

```
Generated/MyService/
├── Dtos/                    # C# records with init properties
│   ├── Customer.g.cs
│   ├── InvoiceStatus.g.cs   # Enums
│   └── ...
├── Fakers/                  # Bogus Faker<T> with smart property heuristics
│   ├── CustomerFaker.g.cs
│   └── ...
├── Endpoints/               # FastEndpoints (GET list, GET by ID, POST, PUT, DELETE)
│   ├── GetCustomers.g.cs
│   ├── CreateCustomer.g.cs
│   └── ...
└── GeneratedStore.g.cs      # Static in-memory store seeded via Fakers
```

All generated files use the `.g.cs` suffix to distinguish from hand-crafted code.

#### Step 3 — Build and verify

```bash
dotnet build MockServer.slnx
dotnet test  MockServer.slnx
```

Both should succeed with zero errors. The generated endpoints are automatically discovered by FastEndpoints at startup (no registration code needed).

#### Step 4 — Start the server and test

```bash
dotnet run --project src/MockServer.Web --urls http://localhost:5150
```

Open http://localhost:5150/swagger. Generated endpoints appear under the `"Generated"` tag alongside the existing hand-crafted endpoints. Each entity also has its own tag for filtering.

Test a generated endpoint:

```bash
# List customers (paginated)
curl http://localhost:5150/my-service/customers?skip=0&limit=10

# Get a single customer
curl http://localhost:5150/my-service/customers/1

# Create a customer
curl -X POST http://localhost:5150/my-service/customers \
  -H "Content-Type: application/json" \
  -d '{"id": 100, "firstName": "Jane", "lastName": "Doe", "email": "jane@example.com"}'

# Delete a customer
curl -X DELETE http://localhost:5150/my-service/customers/1
```

#### Step 5 — Commit the generated files

The generated `.g.cs` files are meant to be committed to git. This makes the mock server fully standalone — clone, build, run, no external service needed.

```bash
git add swagger-sources/my-service.swagger.json
git add src/MockServer.Web/Generated/MyService/
git commit -m "Add generated mock endpoints for MyService"
```

#### Step 6 — Re-generate when the spec changes

When the external service updates its API, repeat from Step 1. The generator cleans the output directory before writing, so stale files are removed automatically.

### CLI Arguments Reference

| Argument | Required | Default | Description |
|----------|----------|---------|-------------|
| `--input` | Yes | — | Path to OpenAPI 3.x swagger.json |
| `--output` | Yes | — | Output directory for generated `.g.cs` files |
| `--namespace` | Yes | — | Root namespace for generated code |
| `--prefix` | Yes | — | Route prefix for all generated endpoints (e.g. `/sample`, `/ext`) |
| `--seed-count` | No | `25` | Number of Bogus-generated seed items per entity |

### Generation Pipeline

```
swagger.json
    │
    ▼
┌──────────────────────┐
│ 1. SchemaParser       │  Reads OpenAPI doc, resolves $ref, allOf, enums,
│                       │  detects pagination wrappers, extracts path/query params
└──────────┬────────────┘
           │
           ▼
┌──────────────────────┐
│ 2. DtoGenerator       │  Schema → C# record with init properties
│                       │  Enums → separate .g.cs files
└──────────┬────────────┘
           │
           ▼
┌──────────────────────┐
│ 3. FakerGenerator     │  DTO → Bogus Faker<T> class
│                       │  Smart heuristics: email, phone, name, price, date, URL, etc.
└──────────┬────────────┘
           │
           ▼
┌──────────────────────┐
│ 4. EndpointGenerator  │  Path+operation → FastEndpoints class
│                       │  GET list (pagination-aware), GET by ID, POST 201,
└──────────┬────────────┘  PUT 200, DELETE 204, all AllowAnonymous
           │
           ▼
┌──────────────────────┐
│ 5. SeedDataGenerator  │  Generates static GeneratedStore with List<T> per entity
└───────────────────────┘  populated via Fakers at startup
```

### Faker Property Heuristics

The FakerGenerator inspects each property's name and C# type to pick contextual Bogus rules:

| Property name pattern | C# type | Bogus rule |
|-----------------------|---------|------------|
| `Id` (primary) | `int` | `f.IndexFaker + 1` |
| `*Id` (foreign key) | `int` | `f.Random.Int(1, 1000)` |
| `*Email*` | `string` | `f.Internet.Email()` |
| `*Phone*` | `string` | `f.Phone.PhoneNumber()` |
| `FirstName` | `string` | `f.Name.FirstName()` |
| `LastName` | `string` | `f.Name.LastName()` |
| `*Name*` + `*Company*` | `string` | `f.Company.CompanyName()` |
| `*Name*` | `string` | `f.Commerce.ProductName()` |
| `*Price*`, `*Amount*`, `*Cost*` | numeric | `f.Finance.Amount(1, 500)` |
| `*Rate*` | `double` | `f.Random.Double(0, 0.25)` |
| `*Date*`, `*At`, `*Time` | `DateTime` | `f.Date.Recent(90)` |
| `*Description*` | `string` | `f.Lorem.Sentence()` |
| `*Url*`, `*Image*` | `string` | `f.Internet.Url()` |
| `*City*` | `string` | `f.Address.City()` |
| `*Country*` | `string` | `f.Address.Country()` |
| `*Sku*` | `string` | `f.Commerce.Ean8()` |
| `*Quantity*`, `*Stock*` | `int` | `f.Random.Int(0, 500)` |
| Enum property | enum | `f.PickRandom<T>()` |
| Nullable property | any | 80% chance of value, 20% null |
| Fallback `string` | `string` | `f.Lorem.Word()` |
| Fallback `bool` | `bool` | `f.Random.Bool()` |

### Multi-Service Support

Run the generator multiple times with different inputs, outputs, and prefixes. Each service gets its own isolated namespace, route prefix, and `GeneratedStore`:

```bash
# Service A — Auth
dotnet run --project tools/MockGenerator -- \
  --input swagger-sources/auth-service.swagger.json \
  --output src/MockServer.Web/Generated/AuthService \
  --namespace MockServer.Web.Generated.AuthService \
  --prefix /auth

# Service B — Billing
dotnet run --project tools/MockGenerator -- \
  --input swagger-sources/billing-service.swagger.json \
  --output src/MockServer.Web/Generated/BillingService \
  --namespace MockServer.Web.Generated.BillingService \
  --prefix /billing
```

All generated endpoints appear in the same Swagger UI, grouped by their tags.

### Supported OpenAPI Features

| Feature | Support |
|---------|---------|
| `$ref` schema references | Fully resolved |
| `allOf` (inheritance/composition) | Flattened into single DTO |
| `enum` (string) | Generates C# `enum` |
| Nullable properties | `T?` with default value handling |
| Nested objects | Referenced DTO type |
| Arrays | `List<T>` |
| Pagination wrappers (`items` + `total`) | Auto-detected, generates paginated GET |
| Path parameters (`{id}`) | Extracted into request DTO |
| Query parameters (`?skip`, `?limit`) | `[QueryParam]` annotated properties |
| `multipart/form-data` (file upload) | Skipped with warning |

### Known Limitations

- **`oneOf` / `anyOf`**: Not supported (picks first variant or skips)
- **Circular `$ref`**: No cycle detection (will stack overflow on deeply circular schemas)
- **PATCH**: Not generated (only GET, POST, PUT, DELETE)
- **Authentication**: All generated endpoints are `AllowAnonymous()`
- **Validation**: No request validation on generated endpoints

---

## Tilt Integration

MockServer resources are defined in the SyncfusionThemeStudio Tiltfile at [`../Tiltfile`](../Tiltfile). All resources are in the `MockServer` label group.

### Resources

| Resource | Trigger | Description |
|----------|---------|-------------|
| `mock-server` | Auto (on startup) | Runs MockServer.Web on port 5150 |
| `mock-server-export-spec` | Manual | Exports MockServer's own swagger.json for Orval codegen |
| `mock-fetch-external-spec` | Manual | Downloads an external service's swagger.json into `swagger-sources/` |
| `mock-generate-endpoints` | Manual | Runs MockGenerator against the fetched spec |

### Tilt UI Workflow

To mock a new external service via the Tilt UI:

1. **Edit the `mock-fetch-external-spec` resource** in [`../Tiltfile`](../Tiltfile) — update the URL to point to the external service's swagger endpoint
2. **Click `mock-fetch-external-spec`** in the Tilt UI — downloads the spec into `swagger-sources/`
3. **Edit the `mock-generate-endpoints` resource** in [`../Tiltfile`](../Tiltfile) — update `--input`, `--output`, `--namespace`, `--prefix` as needed
4. **Click `mock-generate-endpoints`** in the Tilt UI — generates DTOs, Fakers, Endpoints, SeedData
5. **Click `mock-server` restart** — the server restarts and picks up the new generated endpoints
6. **Verify** at http://localhost:5150/swagger — generated endpoints appear alongside hand-crafted ones

For adding permanent new services, add dedicated fetch + generate resource pairs in the Tiltfile (e.g. `mock-fetch-auth-spec` / `mock-generate-auth-endpoints`).

---

## Running Tests

```bash
# All tests
dotnet test MockServer.slnx

# With output dir to avoid lock conflicts if MockServer is running
dotnet test MockServer.slnx -o /tmp/mockserver-test-build
```

---

## Project Structure

| Project | Location | Purpose |
|---------|----------|---------|
| `MockServer.Core` | `src/MockServer.Core/` | Domain entities (`Product`, `User`, `Order`, `Notification`), `IRepository<T>` |
| `MockServer.Infrastructure` | `src/MockServer.Infrastructure/` | `EfRepository<T>`, `MockDbContext` (InMemory), `SeedData` |
| `MockServer.UseCases` | `src/MockServer.UseCases/` | MediatR commands/queries, DTOs, `DtoMapper` |
| `MockServer.Web` | `src/MockServer.Web/` | FastEndpoints HTTP layer, SignalR hub, Swagger config, Generated endpoints |
| `MockGenerator` | `tools/MockGenerator/` | CLI tool for swagger-to-endpoint generation |
| `MockServer.UnitTests` | `tests/MockServer.UnitTests/` | xUnit tests for use cases |

### Key Files

| File | Purpose |
|------|---------|
| `MockServer.slnx` | Solution file (XML format, includes all projects) |
| `src/MockServer.Web/Program.cs` | App startup, DI, middleware, route prefix (`api`), SignalR hub mapping |
| `src/MockServer.Infrastructure/Data/SeedData.cs` | Hand-crafted seed data (products, users, orders, notifications) |
| `tools/MockGenerator/Program.cs` | Generator CLI entry point with argument parsing |
| `tools/MockGenerator/SchemaParser.cs` | OpenAPI document parsing and internal model extraction |
| [`../Tiltfile`](../Tiltfile) | Tilt dev environment config (MockServer resources at the bottom) |
