# Task 04: Create Infrastructure (InMemory DB + Seed Data)

> **Parent**: [mock-server-master-plan.md](./mock-server-master-plan.md)
> **Status**: TODO
> **Agent**: `backend-dev`
> **Depends on**: Task 02
> **Blocks**: Task 5

---

## Objective

Implement the EF Core InMemory database context, repository implementations, and seed data. This replaces the Postgres/Redis infrastructure used by real services with a zero-dependency in-memory store.

## Implementation

### DbContext

```csharp
// MockDbContext.cs
public class MockDbContext : DbContext
{
    public MockDbContext(DbContextOptions<MockDbContext> options) : base(options) { }

    public DbSet<Product> Products => Set<Product>();
    public DbSet<User> Users => Set<User>();
    public DbSet<Order> Orders => Set<Order>();
    public DbSet<Notification> Notifications => Set<Notification>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Configure Order -> OrderItems as owned types
        // Configure User -> Address as owned type
        // Configure indexes, etc.
    }
}
```

### Repository Implementation

```csharp
// EfRepository<T>.cs — implements IRepository<T>
// Follows the same pattern as QuestionerService's EfRepository
```

### Seed Data

Create `SeedData.cs` with static methods to populate realistic mock data on startup:

**Products (30 items):**
- Electronics: Laptop, Smartphone, Tablet, Headphones, Monitor, Keyboard, Mouse, Camera
- Clothing: T-Shirt, Jeans, Sneakers, Jacket, Dress, Hoodie
- Home: Coffee Maker, Blender, Desk Lamp, Bookshelf, Pillow, Candle
- Food: Olive Oil, Chocolate, Coffee Beans, Honey, Pasta
- Sports: Yoga Mat, Dumbbells, Running Shoes, Water Bottle, Fitness Tracker

Each with: realistic title, description, price (5-2000), discount (0-30%), rating (3.0-5.0), stock (0-500), brand, category, thumbnail URL (placeholder)

**Users (20 items):**
- Realistic first/last names, emails (firstname.lastname@example.com), phone numbers
- Addresses with real city/state/country combos

**Orders (15 items):**
- Random user assignments, mixed statuses, 1-5 items each
- Calculated totals from item prices

**Notifications (25 items):**
- Mix of Info/Warning/Error/Success types
- Realistic messages: "New order received", "Low stock alert", "Payment processed", etc.
- Some read, some unread

### Infrastructure Registration Extension

```csharp
// InfrastructureServiceExtensions.cs
public static class InfrastructureServiceExtensions
{
    public static IServiceCollection AddMockInfrastructure(this IServiceCollection services)
    {
        services.AddDbContext<MockDbContext>(options =>
            options.UseInMemoryDatabase("MockServerDb"));

        services.AddScoped(typeof(IRepository<>), typeof(EfRepository<>));

        return services;
    }

    public static async Task SeedDatabaseAsync(this IServiceProvider services)
    {
        using var scope = services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<MockDbContext>();
        await SeedData.InitializeAsync(context);
    }
}
```

## File Structure

```
MockServer.Infrastructure/
├── Data/
│   ├── MockDbContext.cs
│   ├── EfRepository.cs
│   ├── SeedData.cs
│   └── Config/
│       ├── ProductConfiguration.cs
│       ├── UserConfiguration.cs
│       ├── OrderConfiguration.cs
│       └── NotificationConfiguration.cs
├── InfrastructureServiceExtensions.cs
└── GlobalUsings.cs
```

## Verification

```bash
cd SyncfusionThemeStudio/MockServer
dotnet build src/MockServer.Infrastructure/MockServer.Infrastructure.csproj
```

## Success Criteria

- [ ] MockDbContext configures all 4 entity sets
- [ ] EfRepository<T> implements all IRepository<T> methods
- [ ] SeedData populates 30 products, 20 users, 15 orders, 25 notifications
- [ ] Owned types configured correctly (Address, OrderItem)
- [ ] No external DB connection strings needed
- [ ] Extension method registers all services in DI
