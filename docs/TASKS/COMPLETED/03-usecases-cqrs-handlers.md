# Task 03: Create UseCases (CQRS Handlers)

> **Parent**: [mock-server-master-plan.md](./mock-server-master-plan.md)
> **Status**: TODO
> **Agent**: `backend-dev`
> **Depends on**: Task 02
> **Blocks**: Task 5

---

## Objective

Implement MediatR commands and queries for all CRUD operations, following the exact same CQRS pattern used in `Questioner.UseCases/` — one folder per use case, each containing a Command/Query record and a Handler class.

## Use Cases to Implement

### Products
```
Products/
├── Create/
│   ├── CreateProductCommand.cs    — record : IRequest<Result<int>>
│   └── CreateProductHandler.cs
├── Update/
│   ├── UpdateProductCommand.cs    — record : IRequest<Result>
│   └── UpdateProductHandler.cs
├── Delete/
│   ├── DeleteProductCommand.cs    — record(int Id) : IRequest<Result>
│   └── DeleteProductHandler.cs
├── GetById/
│   ├── GetProductQuery.cs         — record(int Id) : IRequest<Result<ProductDto>>
│   └── GetProductHandler.cs
├── List/
│   ├── ListProductsQuery.cs       — record(int Skip, int Limit, string? SortBy, string? Order) : IRequest<Result<PaginatedList<ProductDto>>>
│   └── ListProductsHandler.cs
├── Search/
│   ├── SearchProductsQuery.cs     — record(string Q, int Skip, int Limit) : IRequest<Result<PaginatedList<ProductDto>>>
│   └── SearchProductsHandler.cs
├── ListCategories/
│   ├── ListCategoriesQuery.cs     — record : IRequest<Result<List<string>>>
│   └── ListCategoriesHandler.cs
└── ListByCategory/
    ├── ListByCategoryQuery.cs     — record(string Category, int Skip, int Limit) : IRequest<Result<PaginatedList<ProductDto>>>
    └── ListByCategoryHandler.cs
```

### Users
```
Users/
├── Create/   (CreateUserCommand + Handler)
├── Update/   (UpdateUserCommand + Handler)
├── Delete/   (DeleteUserCommand + Handler)
├── GetById/  (GetUserQuery + Handler)
├── List/     (ListUsersQuery + Handler)
└── Search/   (SearchUsersQuery + Handler)
```

### Orders
```
Orders/
├── Create/   (CreateOrderCommand + Handler)
├── Update/   (UpdateOrderCommand + Handler — status change)
├── Delete/   (DeleteOrderCommand + Handler)
├── GetById/  (GetOrderQuery + Handler)
└── List/     (ListOrdersQuery + Handler)
```

### Notifications
```
Notifications/
├── List/         (ListNotificationsQuery + Handler)
└── UnreadCount/  (UnreadCountQuery + Handler)
```

## Shared DTOs

```
DTOs/
├── ProductDto.cs
├── UserDto.cs
├── OrderDto.cs
├── NotificationDto.cs
└── PaginatedList.cs       — generic wrapper { Items, Total, Skip, Limit }
```

## Patterns to Follow

- All commands return `Result<T>` or `Result` (Ardalis.Result)
- All queries return `Result<T>` with a DTO (never expose domain entities)
- Handlers take `IRepository<T>` through constructor injection
- Use records for commands/queries (immutable, concise)
- Each handler should validate input and return `Result.NotFound()` / `Result.Invalid()` as appropriate

## Verification

```bash
cd SyncfusionThemeStudio/MockServer
dotnet build src/MockServer.UseCases/MockServer.UseCases.csproj
```

## Success Criteria

- [ ] All ~20 command/query + handler pairs compile
- [ ] PaginatedList<T> generic wrapper implemented
- [ ] DTOs defined for each entity
- [ ] No direct DB references (handlers use IRepository<T> only)
- [ ] Consistent naming: `{Verb}{Entity}Command/Query` + `{Verb}{Entity}Handler`
