# Task 02: Create Core Domain Entities

> **Parent**: [mock-server-master-plan.md](./mock-server-master-plan.md)
> **Status**: TODO
> **Agent**: `backend-dev`
> **Depends on**: Task 01
> **Blocks**: Tasks 3, 4

---

## Objective

Define domain entities, interfaces, and value objects in `MockServer.Core` following the same aggregate root pattern used by QuestionerService (Ardalis.Specification + IAggregateRoot).

## Entities

### Product
```csharp
// Properties: Id, Title, Description, Price, DiscountPercentage, Rating, Stock,
//   Brand, Category, Thumbnail, Images (List<string>),
//   CreatedAt, UpdatedAt
```

### User
```csharp
// Properties: Id, FirstName, LastName, Email, Phone, Username,
//   BirthDate, Image, Address (value object),
//   CreatedAt, UpdatedAt
```

### Address (Value Object)
```csharp
// Properties: Street, City, State, PostalCode, Country
```

### Order
```csharp
// Properties: Id, UserId, Status (enum: Pending/Processing/Shipped/Delivered/Cancelled),
//   TotalAmount, Items (List<OrderItem>),
//   CreatedAt, UpdatedAt
```

### OrderItem (Value Object)
```csharp
// Properties: ProductId, ProductTitle, Quantity, UnitPrice
```

### Notification
```csharp
// Properties: Id, Type (enum: Info/Warning/Error/Success), Title, Message,
//   IsRead, CreatedAt
```

## Interfaces

### IRepository<T>
Follow the existing `IBaseRepository<T>` pattern from QuestionerService but simplified (no tenant/user filtering):

```csharp
public interface IRepository<T> where T : BaseEntity
{
    Task<T?> GetByIdAsync(int id, CancellationToken ct = default);
    Task<List<T>> ListAsync(CancellationToken ct = default);
    Task<List<T>> ListAsync(int skip, int limit, CancellationToken ct = default);
    Task<int> CountAsync(CancellationToken ct = default);
    Task<T> AddAsync(T entity, CancellationToken ct = default);
    Task UpdateAsync(T entity, CancellationToken ct = default);
    Task DeleteAsync(T entity, CancellationToken ct = default);
}
```

### BaseEntity
```csharp
public abstract class BaseEntity
{
    public int Id { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
```

## File Structure

```
MockServer.Core/
├── Common/
│   ├── BaseEntity.cs
│   └── IRepository.cs
├── ProductAggregate/
│   └── Product.cs
├── UserAggregate/
│   ├── User.cs
│   └── Address.cs
├── OrderAggregate/
│   ├── Order.cs
│   ├── OrderItem.cs
│   └── OrderStatus.cs  (enum)
├── NotificationAggregate/
│   ├── Notification.cs
│   └── NotificationType.cs  (enum)
└── GlobalUsings.cs
```

## Verification

```bash
cd SyncfusionThemeStudio/MockServer
dotnet build src/MockServer.Core/MockServer.Core.csproj
```

## Success Criteria

- [ ] All entities compile with zero errors
- [ ] BaseEntity establishes common Id/CreatedAt/UpdatedAt pattern
- [ ] IRepository<T> interface matches the simplified mock pattern
- [ ] Enum types defined in their own files
- [ ] No dependencies on external DB, auth, or messaging packages
