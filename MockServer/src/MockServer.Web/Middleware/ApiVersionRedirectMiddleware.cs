namespace MockServer.Web.Middleware;

/// <summary>
/// Redirects unversioned /api/ requests to /api/v1/ using 308 Permanent Redirect.
/// Preserves the HTTP method and request body (unlike 301 which may change POST to GET).
/// Must be registered BEFORE UseFastEndpoints() in the middleware pipeline.
/// </summary>
public class ApiVersionRedirectMiddleware(RequestDelegate next)
{
  public async Task InvokeAsync(HttpContext context)
  {
    var path = context.Request.Path.Value;
    var isUnversionedApiPath = path != null
      && path.StartsWith("/api/", StringComparison.OrdinalIgnoreCase)
      && !path.StartsWith("/api/v", StringComparison.OrdinalIgnoreCase);

    if (isUnversionedApiPath)
    {
      var newPath = "/api/v1" + path![4..];
      var query = context.Request.QueryString.Value;
      context.Response.StatusCode = 308;
      context.Response.Headers.Location = newPath + query;
      return;
    }

    await next(context);
  }
}
