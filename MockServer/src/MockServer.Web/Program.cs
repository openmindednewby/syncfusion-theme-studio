using Metrics.Client.Extensions;
using MockServer.Infrastructure;
using MockServer.Infrastructure.Data;
using MockServer.Infrastructure.FileSystem;
using MockServer.UseCases;
using MockServer.Web.Configurations;
using MockServer.Web.Hubs;
using ServiceDefaults.HealthChecks;

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
builder.AddHealthCheckDefaults();
builder.Services.AddHealthChecks()
  .AddDbContextCheck<MockDbContext>("database", tags: [HealthCheckExtensions.ReadyTag]);
builder.AddPrometheusMetrics(opts => opts.ServiceName = "MockServer");

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

app.UsePrometheusMetrics();
app.MapPlatformEndpoints();

app.UseMiddleware<MockServer.Web.Middleware.ApiVersionRedirectMiddleware>();

app.UseFastEndpoints(c =>
{
  c.Endpoints.RoutePrefix = "api/v1";
})
.UseSwaggerGen();

app.MapHub<EventsHub>("/hubs/events");

logger.Information("MockServer started on port 5150");

app.MarkAsReady();

await app.RunAsync();

// Make the implicit Program.cs class public for integration tests
#pragma warning disable S1118
public partial class Program;
#pragma warning restore S1118
