using System.Diagnostics;
using System.Reflection;
using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace MockServer.Web.Health;

public class GetDetails(HealthCheckService healthCheckService) : EndpointWithoutRequest<HealthDetailsResponse>
{
  private static readonly DateTime StartTime = Process.GetCurrentProcess().StartTime.ToUniversalTime();

  public override void Configure()
  {
    Get("/health");
    AllowAnonymous();
  }

  public override async Task HandleAsync(CancellationToken ct)
  {
    var report = await healthCheckService.CheckHealthAsync(ct);

    var version = Assembly.GetExecutingAssembly()
      .GetCustomAttribute<AssemblyInformationalVersionAttribute>()?.InformationalVersion
      ?? "unknown";

    var process = Process.GetCurrentProcess();
    var memoryBytes = process.WorkingSet64;
    const double bytesPerMb = 1_048_576.0;

    var response = new HealthDetailsResponse(
      Status: report.Status.ToString(),
      Version: version,
      Uptime: DateTime.UtcNow - StartTime,
      Database: new DatabaseHealthInfo(
        Status: report.Entries.TryGetValue("database", out var dbEntry)
          ? dbEntry.Status.ToString()
          : "Unknown",
        Description: dbEntry.Description),
      Memory: new MemoryInfo(
        WorkingSetMb: Math.Round(memoryBytes / bytesPerMb, 2),
        GcTotalMemoryMb: Math.Round(GC.GetTotalMemory(false) / bytesPerMb, 2)));

    if (report.Status == HealthStatus.Healthy)
      await SendOkAsync(response, ct);
    else
      await SendAsync(response, StatusCodes.Status503ServiceUnavailable, ct);
  }
}

public record HealthDetailsResponse(
  string Status,
  string Version,
  TimeSpan Uptime,
  DatabaseHealthInfo Database,
  MemoryInfo Memory);

public record DatabaseHealthInfo(
  string Status,
  string? Description);

public record MemoryInfo(
  double WorkingSetMb,
  double GcTotalMemoryMb);
