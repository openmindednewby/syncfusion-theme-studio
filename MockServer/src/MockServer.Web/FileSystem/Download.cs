using MockServer.Infrastructure.FileSystem;

namespace MockServer.Web.FileSystem;

/// <summary>
/// GET /api/files/download — handles file download requests.
/// Returns a placeholder file since this is an in-memory mock.
/// </summary>
public class Download(InMemoryFileSystemService fileSystem) : EndpointWithoutRequest
{
  public override void Configure()
  {
    Get("/files/download");
    AllowAnonymous();
  }

  public override async Task HandleAsync(CancellationToken ct)
  {
    var path = Query<string>("path") ?? "/";
    var names = Query<string>("downloadInput");

    if (string.IsNullOrEmpty(names))
    {
      await SendNotFoundAsync(ct);
      return;
    }

    // Return a placeholder byte array since we don't store actual file content
    var content = System.Text.Encoding.UTF8.GetBytes($"Mock file content for: {names}");
    await SendBytesAsync(content, names, "application/octet-stream", cancellation: ct);
  }
}
