using System.Net;
using Dloizides.Testing.AspNetCore;
using FluentAssertions;
using Metrics.Client.Extensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using ServiceDefaults.HealthChecks;

namespace MockServer.UnitTests.Web;

public sealed class MetricsManagementPortTests : IAsyncLifetime
{
  private const int PublicPort = 8080;
  private const int ManagementPort = 8081;
  private const string MetricsPath = "/metrics";

  private WebApplication _app = null!;

  public async Task InitializeAsync()
  {
    var builder = WebApplication.CreateBuilder(Array.Empty<string>());
    builder.WebHost.UseTestServer();
    builder.Configuration.AddJsonFile(FindWebFile("appsettings.json"));
    builder.AddPrometheusMetrics(opts => opts.ServiceName = "MockServer");
    builder.AddHealthCheckDefaults();

    _app = builder.Build();
    _app.UsePrometheusMetrics();
    _app.MapPlatformHealthChecks();
    _app.MarkAsReady();
    await _app.StartAsync();
  }

  [Fact]
  public async Task Metrics_WhenRequestedOnPublicPort_Returns404()
  {
    var status = await GetAsync(PublicPort, MetricsPath);

    status.Should().Be(HttpStatusCode.NotFound);
  }

  [Fact]
  public async Task Metrics_WhenRequestedOnManagementPort_Returns200()
  {
    var status = await GetAsync(ManagementPort, MetricsPath);

    status.Should().Be(HttpStatusCode.OK);
  }

  [Fact]
  public async Task ManagementEndpoints_WhenProbedOnBothPorts_AnswerOnlyOnManagementPort()
  {
    var server = _app.GetTestServer();

    var failures = await ManagementPortProbe.FindFailuresAsync(server);

    failures.Should().BeEmpty();
  }

  public async Task DisposeAsync()
  {
    if (_app is not null)
    {
      await _app.DisposeAsync();
    }
  }

  private async Task<HttpStatusCode> GetAsync(int localPort, string path)
  {
    var context = await _app.GetTestServer().SendAsync(request =>
    {
      request.Connection.LocalPort = localPort;
      request.Request.Method = HttpMethods.Get;
      request.Request.Path = path;
      request.Request.Host = new HostString("localhost");
    });
    return (HttpStatusCode)context.Response.StatusCode;
  }

  private static string FindWebFile(string name)
  {
    for (var dir = new DirectoryInfo(AppContext.BaseDirectory); dir is not null; dir = dir.Parent)
    {
      var candidate = Path.Combine(dir.FullName, "src", "MockServer.Web", name);
      if (File.Exists(candidate))
      {
        return candidate;
      }
    }

    return Path.Combine(AppContext.BaseDirectory, name);
  }
}
