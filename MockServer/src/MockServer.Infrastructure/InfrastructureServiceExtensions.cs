using Microsoft.Extensions.DependencyInjection;
using MockServer.Infrastructure.Data;

namespace MockServer.Infrastructure;

public static class InfrastructureServiceExtensions
{
  public static IServiceCollection AddMockInfrastructure(this IServiceCollection services)
  {
    services.AddDbContext<MockDbContext>(options =>
      options.UseInMemoryDatabase("MockServerDb"));

    services.AddScoped(typeof(IRepository<>), typeof(EfRepository<>));

    return services;
  }

  public static async Task SeedDatabaseAsync(this IServiceProvider serviceProvider)
  {
    using var scope = serviceProvider.CreateScope();
    var context = scope.ServiceProvider.GetRequiredService<MockDbContext>();
    await SeedData.SeedDatabaseAsync(context);
  }
}
