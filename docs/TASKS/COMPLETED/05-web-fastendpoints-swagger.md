# Task 05: Create Web Layer (FastEndpoints + Swagger)

> **Parent**: [mock-server-master-plan.md](./mock-server-master-plan.md)
> **Status**: TODO
> **Agent**: `backend-dev`
> **Depends on**: Tasks 03, 04
> **Blocks**: Tasks 6, 8, 9

---

## Objective

Create the ASP.NET Web host with FastEndpoints, Swagger/OpenAPI generation, and all REST endpoints. Follow the same Program.cs structure as QuestionerService/OnlineMenuSaaS but **without** authentication, multi-tenancy, or message bus.

## Program.cs Structure

```csharp
var builder = WebApplication.CreateBuilder(args);

// Serilog
var logger = Log.Logger = new LoggerConfiguration()
    .Enrich.FromLogContext()
    .WriteTo.Console()
    .CreateLogger();

// CORS (allow all for dev)
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// FastEndpoints + Swagger
builder.Services.AddFastEndpoints()
    .SwaggerDocument(o =>
    {
        o.ShortSchemaNames = true;
        o.DocumentSettings = s =>
        {
            s.Title = "MockServer API";
            s.Version = "v1";
            s.Description = "In-memory mock API for SyncfusionThemeStudio development";
        };
    });

// MediatR (scan UseCases assembly)
builder.Services.AddMediatR(cfg =>
    cfg.RegisterServicesFromAssembly(typeof(MockServer.UseCases.AssemblyMarker).Assembly));

// Infrastructure (InMemory DB + repos)
builder.Services.AddMockInfrastructure();

// SignalR for WebSocket hub
builder.Services.AddSignalR();

var app = builder.Build();

// Seed database
await app.Services.SeedDatabaseAsync();

app.UseCors();
app.UseFastEndpoints();
app.UseSwaggerGen();

// Port 5150
await app.RunAsync();
```

### launchSettings.json
```json
{
  "profiles": {
    "MockServer.Web": {
      "commandName": "Project",
      "launchBrowser": false,
      "applicationUrl": "http://localhost:5150",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    }
  }
}
```

## Endpoints

### Products Endpoints

| File | Method | Route | Handler |
|------|--------|-------|---------|
| `Products/List.cs` | GET | `/api/products` | `ListProductsQuery` |
| `Products/GetById.cs` | GET | `/api/products/{id}` | `GetProductQuery` |
| `Products/Search.cs` | GET | `/api/products/search` | `SearchProductsQuery` |
| `Products/ListCategories.cs` | GET | `/api/products/categories` | `ListCategoriesQuery` |
| `Products/ListByCategory.cs` | GET | `/api/products/category/{category}` | `ListByCategoryQuery` |
| `Products/Create.cs` | POST | `/api/products` | `CreateProductCommand` |
| `Products/Update.cs` | PUT | `/api/products/{id}` | `UpdateProductCommand` |
| `Products/Delete.cs` | DELETE | `/api/products/{id}` | `DeleteProductCommand` |

### Users Endpoints

| File | Method | Route | Handler |
|------|--------|-------|---------|
| `Users/List.cs` | GET | `/api/users` | `ListUsersQuery` |
| `Users/GetById.cs` | GET | `/api/users/{id}` | `GetUserQuery` |
| `Users/Search.cs` | GET | `/api/users/search` | `SearchUsersQuery` |
| `Users/Create.cs` | POST | `/api/users` | `CreateUserCommand` |
| `Users/Update.cs` | PUT | `/api/users/{id}` | `UpdateUserCommand` |
| `Users/Delete.cs` | DELETE | `/api/users/{id}` | `DeleteUserCommand` |

### Orders Endpoints

| File | Method | Route | Handler |
|------|--------|-------|---------|
| `Orders/List.cs` | GET | `/api/orders` | `ListOrdersQuery` |
| `Orders/GetById.cs` | GET | `/api/orders/{id}` | `GetOrderQuery` |
| `Orders/Create.cs` | POST | `/api/orders` | `CreateOrderCommand` |
| `Orders/Update.cs` | PUT | `/api/orders/{id}` | `UpdateOrderCommand` |
| `Orders/Delete.cs` | DELETE | `/api/orders/{id}` | `DeleteOrderCommand` |

### Notifications Endpoints

| File | Method | Route | Handler |
|------|--------|-------|---------|
| `Notifications/List.cs` | GET | `/api/notifications` | `ListNotificationsQuery` |
| `Notifications/UnreadCount.cs` | GET | `/api/notifications/unread-count` | `UnreadCountQuery` |

### Endpoint Pattern (matching QuestionerService)

```csharp
// Example: Products/List.cs
public class List(IMediator mediator)
    : EndpointWithoutRequest<ListProductsResponse>
{
    public override void Configure()
    {
        Get("/api/products");
        AllowAnonymous();
        Summary(s =>
        {
            s.Summary = "Get all products with pagination";
            s.Description = "Returns a paginated list of products";
        });
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        var skip = Query<int>("skip", isRequired: false);
        var limit = Query<int>("limit", isRequired: false);
        var sortBy = Query<string>("sortBy", isRequired: false);
        var order = Query<string>("order", isRequired: false);

        var result = await mediator.Send(
            new ListProductsQuery(skip, limit == 0 ? 30 : limit, sortBy, order), ct);

        if (result.IsSuccess) Response = new ListProductsResponse(result.Value);
    }
}
```

## File Structure

```
MockServer.Web/
├── Products/
│   ├── List.cs
│   ├── GetById.cs
│   ├── Search.cs
│   ├── ListCategories.cs
│   ├── ListByCategory.cs
│   ├── Create.cs
│   ├── Update.cs
│   └── Delete.cs
├── Users/
│   ├── List.cs, GetById.cs, Search.cs, Create.cs, Update.cs, Delete.cs
├── Orders/
│   ├── List.cs, GetById.cs, Create.cs, Update.cs, Delete.cs
├── Notifications/
│   ├── List.cs, UnreadCount.cs
├── Properties/
│   └── launchSettings.json
├── Program.cs
├── GlobalUsings.cs
└── appsettings.json
```

## Post-build: Export OpenAPI spec

After building, export the Swagger JSON for Orval consumption:

```bash
# In the Tiltfile or as a post-build step
dotnet run --project src/MockServer.Web -- --urls http://localhost:5150 &
sleep 5
curl http://localhost:5150/swagger/v1/swagger.json -o ../src/api/swagger/mockserver.json
```

Alternatively, use NSwag CLI or FastEndpoints' built-in spec generation.

## Verification

```bash
cd SyncfusionThemeStudio/MockServer
dotnet build src/MockServer.Web/MockServer.Web.csproj
dotnet run --project src/MockServer.Web
# Then: curl http://localhost:5150/api/products
# Then: curl http://localhost:5150/swagger/v1/swagger.json
```

## Success Criteria

- [ ] All 22 endpoints defined and compile
- [ ] All endpoints are `AllowAnonymous()`
- [ ] Swagger UI available at `/swagger`
- [ ] OpenAPI spec includes all request/response schemas
- [ ] Pagination parameters (skip, limit, sortBy, order) work on list endpoints
- [ ] Search endpoints filter by query string `q`
- [ ] CORS allows all origins
- [ ] Server starts on port 5150
