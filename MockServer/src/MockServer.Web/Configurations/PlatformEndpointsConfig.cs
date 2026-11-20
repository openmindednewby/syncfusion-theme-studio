using Microsoft.Extensions.Hosting;
using ServiceDefaults.HealthChecks;

namespace MockServer.Web.Configurations;

public static class PlatformEndpointsConfig
{
  public static WebApplication MapPlatformEndpoints(this WebApplication app)
  {
    app.MapPlatformHealthChecks();
    app.MapDefaultEndpoints();
    return app;
  }
}
