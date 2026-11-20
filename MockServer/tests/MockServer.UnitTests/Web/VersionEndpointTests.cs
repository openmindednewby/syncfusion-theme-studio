using System.Net;
using FluentAssertions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.Hosting;
using MockServer.Web.Configurations;
using ServiceDefaults.HealthChecks;

namespace MockServer.UnitTests.Web;

public sealed class VersionEndpointTests : IAsyncLifetime
{
  private WebApplication _app = null!;

  public async Task InitializeAsync()
  {
    var builder = WebApplication.CreateBuilder(Array.Empty<string>());
    builder.WebHost.UseTestServer();
    builder.AddHealthCheckDefaults();

    _app = builder.Build();
    _app.MapPlatformEndpoints();
    await _app.StartAsync();
  }

  [Fact]
  public async Task Version_WhenRequestedAnonymously_Returns200()
  {
    var response = await _app.GetTestClient().GetAsync("/version");
    var body = await response.Content.ReadAsStringAsync();

    response.StatusCode.Should().Be(HttpStatusCode.OK);
    body.Should().Contain("commit");
  }

  public async Task DisposeAsync()
  {
    await _app.DisposeAsync();
  }
}
