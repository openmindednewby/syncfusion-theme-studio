using System.Text.Json;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using MockServer.Infrastructure;
using MockServer.Infrastructure.Data;
using MockServer.Infrastructure.FileSystem;
using MockServer.UseCases;
using MockServer.Web.Hubs;

var builder = WebApplication.CreateBuilder(args);

// Serilog
var logger = Log.Logger = new LoggerConfiguration()
  .Enrich.FromLogContext()
  .WriteTo.Console()
  .CreateLogger();

logger.Information("Starting MockServer");
builder.Host.UseSerilog();

// CORS - allow all origins with credentials for SignalR
builder.Services.AddCors(options =>
{
  options.AddDefaultPolicy(policy =>
  {
    policy.AllowAnyHeader()
          .AllowAnyMethod()
          .AllowCredentials()
          .SetIsOriginAllowed(_ => true);
  });
});

// Infrastructure (EF Core InMemory + repositories)
builder.Services.AddMockInfrastructure();

// In-memory file system for FileManager
builder.Services.AddSingleton<InMemoryFileSystemService>();

// Health checks
builder.Services.AddHealthChecks()
  .AddDbContextCheck<MockDbContext>("database");

// MediatR (CQRS handlers)
builder.Services.AddMediatR(cfg =>
  cfg.RegisterServicesFromAssemblyContaining<AssemblyMarker>());

// FastEndpoints + Swagger
builder.Services.AddFastEndpoints()
  .SwaggerDocument(o =>
  {
    o.ShortSchemaNames = true;
    o.DocumentSettings = s =>
    {
      s.Title = "MockServer API";
      s.Version = "v1";
      s.Description = "Mock API server for SyncfusionThemeStudio dashboard";
    };
  });

// SignalR
builder.Services.AddSignalR();
builder.Services.AddHostedService<EventBroadcasterService>();

var app = builder.Build();

// Seed database
await app.Services.SeedDatabaseAsync();

app.UseCors();

// Liveness probe — returns 200 if the process is running
app.MapHealthChecks("/healthz", new HealthCheckOptions
{
  Predicate = _ => false,
  ResultStatusCodes =
  {
    [HealthStatus.Healthy] = StatusCodes.Status200OK,
    [HealthStatus.Degraded] = StatusCodes.Status200OK,
    [HealthStatus.Unhealthy] = StatusCodes.Status200OK
  }
});

// Readiness probe — checks DB, returns 200 when ready, 503 when not
app.MapHealthChecks("/readyz", new HealthCheckOptions
{
  Predicate = check => check.Name == "database",
  ResponseWriter = async (context, report) =>
  {
    context.Response.ContentType = "application/json";
    var response = new
    {
      status = report.Status.ToString(),
      checks = report.Entries.Select(e => new
      {
        name = e.Key,
        status = e.Value.Status.ToString(),
        description = e.Value.Description
      })
    };
    await context.Response.WriteAsync(
      JsonSerializer.Serialize(response, new JsonSerializerOptions { WriteIndented = true }));
  }
});

app.UseMiddleware<MockServer.Web.Middleware.ApiVersionRedirectMiddleware>();

app.UseFastEndpoints(c =>
{
  c.Endpoints.RoutePrefix = "api/v1";
})
.UseSwaggerGen();

app.MapHub<EventsHub>("/hubs/events");

logger.Information("MockServer started on port 5150");

await app.RunAsync();

// Make the implicit Program.cs class public for integration tests
#pragma warning disable S1118
public partial class Program;
#pragma warning restore S1118
