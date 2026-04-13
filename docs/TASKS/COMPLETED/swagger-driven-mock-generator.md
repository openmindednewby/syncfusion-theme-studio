# Swagger-Driven Mock Endpoint Generator

## Status: COMPLETED
## Priority: P2 (Infrastructure / DX)
## Depends on: None
## Agent: backend-dev

## Goal

Build a CLI tool that reads an external .NET service's `swagger.json` file, then auto-generates FastEndpoints + DTOs + Bogus fakers in the MockServer. The generated code is committed to git so the mock server runs standalone — no runtime dependency on the external service.

## Motivation

- **Offline development**: Frontend and integration work continues even when the external service is down
- **Fast onboarding**: Clone → build → run, no external service access needed
- **Automatic coverage**: Every endpoint in the external spec gets a mock — no manual endpoint-by-endpoint work
- **Reproducible**: Re-run the generator when the external spec changes to pick up new endpoints/schema changes

## Current MockServer Architecture

```
MockServer/
├── src/
│   ├── MockServer.Web/              # FastEndpoints + Hubs (port 5150)
│   ├── MockServer.UseCases/         # CQRS handlers (MediatR)
│   ├── MockServer.Infrastructure/   # EF Core InMemory + Seeding
│   └── MockServer.Core/             # Domain entities + IRepository
└── tests/
    └── MockServer.UnitTests/
```

- **Framework**: ASP.NET Core + FastEndpoints 5.33.0 + MediatR + EF Core InMemory
- **Existing endpoints**: Hand-crafted Products, Users, Orders, Notifications (CRUD + Search)
- **Swagger**: Already configured via `FastEndpoints.Swagger` 5.33.0

The generated endpoints will coexist alongside existing hand-crafted ones.

## Design

### Input

A `swagger.json` file (OpenAPI 3.x) stored locally in the repo:

```
MockServer/
  swagger-sources/
    external-service.swagger.json    # Checked into git, fetched manually or via script
```

The developer fetches this file from the external service once:
```bash
curl https://external-service/swagger/v1/swagger.json -o swagger-sources/external-service.swagger.json
```

### Output

Generated C# files committed to git:

```
MockServer/src/MockServer.Web/
  Generated/
    ExternalService/
      Dtos/
        ProductDto.g.cs
        OrderDto.g.cs
        PaginatedListOfProductDto.g.cs
        ...
      Endpoints/
        GetProducts.g.cs
        GetProductById.g.cs
        CreateProduct.g.cs
        ...
      Fakers/
        ProductDtoFaker.g.cs
        OrderDtoFaker.g.cs
        ...
      SeedData.g.cs              # Pre-generated static fake data
      ServiceRegistration.g.cs   # DI registration for generated fakers/stores
```

All generated files use the `.g.cs` suffix convention to distinguish from hand-crafted code.

### Generator CLI

```
MockServer/
  tools/
    MockGenerator/
      MockGenerator.csproj       # Console app / dotnet tool
      Program.cs
      SchemaParser.cs            # OpenAPI → internal model
      DtoGenerator.cs            # Schema → C# record DTOs
      FakerGenerator.cs          # Schema → Bogus faker classes
      EndpointGenerator.cs       # Operation → FastEndpoints classes
      SeedDataGenerator.cs       # Fakers → static seed data
```

Usage:
```bash
dotnet run --project tools/MockGenerator -- \
  --input swagger-sources/external-service.swagger.json \
  --output src/MockServer.Web/Generated/ExternalService \
  --namespace MockServer.Web.Generated.ExternalService \
  --prefix /ext \
  --seed-count 25
```

### Generation Pipeline

```
swagger.json
    │
    ▼
┌──────────────────────┐
│ 1. Parse OpenAPI doc │  Microsoft.OpenApi.Readers
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ 2. Generate DTOs     │  For each schema → C# record with properties
└──────────┬───────────┘  Handles: primitives, arrays, nested objects,
           │               enums, nullable, $ref resolution
           ▼
┌──────────────────────┐
│ 3. Generate Fakers   │  For each DTO → Bogus Faker<T> class
└──────────┬───────────┘  Property-aware: emails, names, prices, dates,
           │               URLs get contextual fakes based on property name
           ▼
┌──────────────────────┐
│ 4. Generate Endpoints│  For each path+operation → FastEndpoints class
└──────────┬───────────┘  GET list → returns collection from in-memory store
           │               GET by id → lookup by id parameter
           ▼               POST → accept body, return 201 with generated id
┌──────────────────────┐   PUT → accept body, return 200
│ 5. Generate Seed     │   DELETE → return 204
└──────────────────────┘
  Use fakers to pre-generate N items per entity, serialize as static data
```

## Detailed Design

### Step 1: Parse OpenAPI

```csharp
// NuGet: Microsoft.OpenApi.Readers
var reader = new OpenApiStreamReader();
var document = reader.Read(File.OpenRead(inputPath), out var diagnostic);

// document.Paths → Dictionary<string, OpenApiPathItem>
// document.Components.Schemas → Dictionary<string, OpenApiSchema>
```

### Step 2: Generate DTOs

For each schema in `document.Components.Schemas`, generate a C# record:

```csharp
// Input schema: { "type": "object", "properties": { "id": { "type": "integer" }, "name": { "type": "string" } } }
// Output:
namespace MockServer.Web.Generated.ExternalService.Dtos;

public record ProductDto
{
    public int Id { get; init; }
    public string Name { get; init; } = string.Empty;
}
```

Type mapping:

| OpenAPI Type | Format | C# Type |
|-------------|--------|---------|
| `string` | — | `string` |
| `string` | `date-time` | `DateTime` |
| `string` | `date` | `DateOnly` |
| `string` | `uuid` | `Guid` |
| `string` | `email` | `string` |
| `string` | `uri` | `string` |
| `integer` | `int32` | `int` |
| `integer` | `int64` | `long` |
| `number` | `float` | `float` |
| `number` | `double` | `double` |
| `number` | `decimal` | `decimal` |
| `boolean` | — | `bool` |
| `array` | items: T | `List<T>` |
| `object` | $ref | Referenced DTO type |

Nullable properties → `T?` suffix.

### Step 3: Generate Fakers

For each DTO, generate a `Bogus.Faker<T>` with property-aware rules:

```csharp
// NuGet: Bogus
namespace MockServer.Web.Generated.ExternalService.Fakers;

public sealed class ProductDtoFaker : Faker<ProductDto>
{
    public ProductDtoFaker()
    {
        RuleFor(x => x.Id, f => f.IndexFaker + 1);
        RuleFor(x => x.Name, f => f.Commerce.ProductName());
        RuleFor(x => x.Price, f => f.Finance.Amount(1, 500));
        RuleFor(x => x.Description, f => f.Commerce.ProductDescription());
        RuleFor(x => x.CreatedAt, f => f.Date.Recent(30));
    }
}
```

Property name heuristics for contextual faking:

| Property name pattern | Bogus rule |
|-----------------------|------------|
| `*Id` (non-primary) | `f.Random.Guid()` or `f.Random.Int(1, 1000)` |
| `*Name`, `*name` | `f.Name.FullName()` or `f.Commerce.ProductName()` |
| `*Email`, `*email` | `f.Internet.Email()` |
| `*Phone`, `*phone` | `f.Phone.PhoneNumber()` |
| `*Price`, `*Amount`, `*Cost` | `f.Finance.Amount()` |
| `*Date*`, `*At`, `*Time` | `f.Date.Recent()` |
| `*Url*`, `*Image*` | `f.Internet.Url()` |
| `*Description*` | `f.Lorem.Sentence()` |
| `*Address*` | `f.Address.FullAddress()` |
| `*Status*` | `f.PickRandom(...)` from enum values |
| `bool` type | `f.Random.Bool()` |
| Fallback `string` | `f.Lorem.Word()` |
| Fallback `int` | `f.Random.Int(1, 1000)` |

### Step 4: Generate Endpoints

For each path + HTTP operation, generate a FastEndpoints class:

**GET collection** (`GET /products`):
```csharp
public class GetProducts : EndpointWithoutRequest<List<ProductDto>>
{
    public override void Configure()
    {
        Get("/ext/products");
        AllowAnonymous();
        Tags("ExternalService", "Products");
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        await SendOkAsync(GeneratedStore.Products, ct);
    }
}
```

**GET by ID** (`GET /products/{id}`):
```csharp
public class GetProductById : Endpoint<GetProductByIdRequest, ProductDto>
{
    public override void Configure()
    {
        Get("/ext/products/{Id}");
        AllowAnonymous();
        Tags("ExternalService", "Products");
    }

    public override async Task HandleAsync(GetProductByIdRequest req, CancellationToken ct)
    {
        var item = GeneratedStore.Products.FirstOrDefault(x => x.Id == req.Id);
        if (item is null) { await SendNotFoundAsync(ct); return; }
        await SendOkAsync(item, ct);
    }
}
```

**POST** (`POST /products`):
```csharp
public class CreateProduct : Endpoint<ProductDto, ProductDto>
{
    public override void Configure()
    {
        Post("/ext/products");
        AllowAnonymous();
        Tags("ExternalService", "Products");
    }

    public override async Task HandleAsync(ProductDto req, CancellationToken ct)
    {
        GeneratedStore.Products.Add(req);
        await SendCreatedAtAsync<GetProductById>(new { req.Id }, req, cancellation: ct);
    }
}
```

**DELETE** (`DELETE /products/{id}`):
```csharp
public class DeleteProduct : Endpoint<DeleteProductRequest, EmptyResponse>
{
    public override void Configure()
    {
        Delete("/ext/products/{Id}");
        AllowAnonymous();
        Tags("ExternalService", "Products");
    }

    public override async Task HandleAsync(DeleteProductRequest req, CancellationToken ct)
    {
        GeneratedStore.Products.RemoveAll(x => x.Id == req.Id);
        await SendNoContentAsync(ct);
    }
}
```

### Step 5: Generate Seed Data

Use fakers to pre-generate a static in-memory store:

```csharp
public static class GeneratedStore
{
    public static List<ProductDto> Products { get; } = new ProductDtoFaker().Generate(25);
    public static List<OrderDto> Orders { get; } = new OrderDtoFaker().Generate(25);
    // ...
}
```

The `--seed-count` CLI argument controls how many items per entity.

## Route prefix strategy

All generated endpoints get a configurable prefix (e.g., `/ext`) to avoid collisions with existing hand-crafted endpoints:

| External spec route | Generated mock route |
|--------------------|---------------------|
| `GET /api/products` | `GET /ext/products` |
| `POST /api/orders` | `POST /ext/orders` |

The prefix is set via the `--prefix` CLI argument.

## Multi-service support

Multiple external services can be mocked by running the generator multiple times with different inputs/outputs/prefixes:

```bash
# Service A
dotnet run --project tools/MockGenerator -- \
  --input swagger-sources/auth-service.swagger.json \
  --output src/MockServer.Web/Generated/AuthService \
  --namespace MockServer.Web.Generated.AuthService \
  --prefix /auth

# Service B
dotnet run --project tools/MockGenerator -- \
  --input swagger-sources/billing-service.swagger.json \
  --output src/MockServer.Web/Generated/BillingService \
  --namespace MockServer.Web.Generated.BillingService \
  --prefix /billing
```

## Tiltfile Integration (manual trigger)

The generator is triggered manually via Tilt, following the same pattern as existing CodeGen resources (Orval, Figma).

### Step 1: Fetch external swagger spec

A manual-trigger resource fetches the external service's `swagger.json` into the `swagger-sources/` directory. Requires the external service to be running (or accessible at the configured URL).

```python
# --- Fetch External Service Swagger Spec (manual) ---
local_resource(
    name='mock-fetch-external-spec',
    labels=['MockServer'],
    cmd='powershell -Command "Invoke-WebRequest -Uri https://external-service/swagger/v1/swagger.json -OutFile MockServer/swagger-sources/external-service.swagger.json; Write-Host \'External swagger spec saved to MockServer/swagger-sources/external-service.swagger.json\'"',
    trigger_mode=TRIGGER_MODE_MANUAL,
    allow_parallel=True,
)
```

### Step 2: Run the generator

A separate manual-trigger resource runs the MockGenerator CLI against the fetched spec. Depends on the fetch step having been run at least once (the spec file must exist).

```python
# --- Generate Mock Endpoints from External Swagger (manual) ---
local_resource(
    name='mock-generate-endpoints',
    labels=['MockServer'],
    cmd='dotnet run --project MockServer/tools/MockGenerator -- --input MockServer/swagger-sources/external-service.swagger.json --output MockServer/src/MockServer.Web/Generated/ExternalService --namespace MockServer.Web.Generated.ExternalService --prefix /ext --seed-count 25',
    trigger_mode=TRIGGER_MODE_MANUAL,
    allow_parallel=True,
)
```

### Workflow in Tilt UI

1. Click **mock-fetch-external-spec** → downloads the latest `swagger.json` from the external service
2. Click **mock-generate-endpoints** → generates DTOs, Fakers, Endpoints, SeedData
3. Click **mock-server** → restart to pick up the newly generated endpoints
4. Verify at `http://localhost:5150/swagger` — generated endpoints appear alongside hand-crafted ones

Both resources live in the `MockServer` label group, visible alongside the existing `mock-server` and `mock-server-export-spec` resources.

For multi-service support, add additional fetch + generate resource pairs per external service (e.g., `mock-fetch-auth-spec` / `mock-generate-auth-endpoints`).

## NuGet dependencies (new)

| Package | Project | Purpose |
|---------|---------|---------|
| `Microsoft.OpenApi.Readers` | MockGenerator | Parse swagger.json |
| `Bogus` | MockServer.Web | Runtime faker for seed data |

Both are lightweight. `Bogus` is ~500KB, no transitive dependencies.

## Files to create

| File | Purpose |
|------|---------|
| `tools/MockGenerator/MockGenerator.csproj` | Console app project |
| `tools/MockGenerator/Program.cs` | CLI entry point with argument parsing |
| `tools/MockGenerator/SchemaParser.cs` | OpenAPI document → internal model |
| `tools/MockGenerator/DtoGenerator.cs` | Schema → C# record source code |
| `tools/MockGenerator/FakerGenerator.cs` | Schema → Bogus faker source code |
| `tools/MockGenerator/EndpointGenerator.cs` | Operation → FastEndpoints source code |
| `tools/MockGenerator/SeedDataGenerator.cs` | Static store generation |
| `swagger-sources/` | Directory for external swagger.json files |
| `src/MockServer.Web/Generated/` | Output directory for generated code |

## Files to modify

| File | Change |
|------|--------|
| `MockServer.slnx` | Add `MockGenerator` project |
| `src/MockServer.Web/MockServer.Web.csproj` | Add `Bogus` NuGet dependency |
| `Tiltfile` | Add `mock-fetch-external-spec` and `mock-generate-endpoints` manual-trigger resources |

## Edge cases to handle

- **Circular $ref**: Detect cycles in schema references, generate `null` for circular properties
- **allOf / oneOf / anyOf**: Flatten `allOf` into a single DTO; for `oneOf`/`anyOf`, pick the first variant
- **Enum schemas**: Generate `const enum` string values or C# enums depending on the schema type
- **Pagination wrappers**: Detect common patterns like `{ items: T[], total: int, skip: int }` and generate appropriate list responses
- **Path parameters**: Extract `{id}`, `{slug}`, etc. from path and generate request DTOs with matching properties
- **Query parameters**: Map to `[QueryParam]`-annotated request DTO properties
- **Empty response body**: Operations returning 204 → `EndpointWithoutRequest<EmptyResponse>`
- **File upload / multipart**: Skip — log a warning, don't generate

## Acceptance criteria

- [ ] Generator CLI parses a valid OpenAPI 3.x `swagger.json` without errors
- [ ] DTOs generated for all schemas in `components/schemas`
- [ ] Bogus fakers generated with property-name-aware rules
- [ ] FastEndpoints generated for all paths/operations (GET, POST, PUT, DELETE, PATCH)
- [ ] Generated endpoints registered under configurable prefix
- [ ] Static seed data pre-generated via fakers
- [ ] Generated `.g.cs` files compile without errors alongside existing code
- [ ] Generated endpoints appear in MockServer's own Swagger UI
- [ ] Existing hand-crafted endpoints unaffected
- [ ] `dotnet build` succeeds for entire solution
- [ ] `dotnet test` — all existing unit tests pass
- [ ] Multi-service support: generator can be run multiple times for different services
- [ ] Generated files committed to git with `.g.cs` suffix convention
- [ ] Tiltfile has manual-trigger resources for fetching spec and running generator
- [ ] Tilt UI workflow: fetch spec → generate → restart mock-server works end-to-end

## Verification

1. Obtain a real `swagger.json` from an external .NET service
2. Run the generator
3. Build the solution — no compile errors
4. Start MockServer — all generated endpoints respond with fake data
5. Verify in Swagger UI at `http://localhost:5150/swagger`
6. Stop the external service — MockServer continues to work independently
7. Run existing unit tests — no regressions
