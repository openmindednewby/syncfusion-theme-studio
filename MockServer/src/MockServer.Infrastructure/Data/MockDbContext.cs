namespace MockServer.Infrastructure.Data;

public class MockDbContext(DbContextOptions<MockDbContext> options) : DbContext(options)
{
  public DbSet<Product> Products => Set<Product>();
  public DbSet<User> Users => Set<User>();
  public DbSet<Order> Orders => Set<Order>();
  public DbSet<Notification> Notifications => Set<Notification>();
  public DbSet<KanbanTask> KanbanTasks => Set<KanbanTask>();
  public DbSet<CalendarEvent> CalendarEvents => Set<CalendarEvent>();
  public DbSet<AuditEntry> AuditEntries => Set<AuditEntry>();
  public DbSet<Role> Roles => Set<Role>();
  public DbSet<ChatChannel> ChatChannels => Set<ChatChannel>();
  public DbSet<ChatMessage> ChatMessages => Set<ChatMessage>();
  public DbSet<SystemSettings> SystemSettings => Set<SystemSettings>();
  public DbSet<GanttTask> GanttTasks => Set<GanttTask>();
  public DbSet<Organization> Organizations => Set<Organization>();

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    base.OnModelCreating(modelBuilder);

    modelBuilder.Entity<User>(entity =>
    {
      entity.OwnsOne(u => u.Address);
    });

    modelBuilder.Entity<Order>(entity =>
    {
      entity.OwnsMany(o => o.Items);
    });

    modelBuilder.Entity<Product>(entity =>
    {
      entity.Property(p => p.Price).HasPrecision(18, 2);
      entity.Property(p => p.DiscountPercentage).HasPrecision(5, 2);
      entity.Property(p => p.Rating).HasPrecision(3, 2);
    });

    modelBuilder.Entity<Order>(entity =>
    {
      entity.Property(o => o.TotalAmount).HasPrecision(18, 2);
    });
  }
}
