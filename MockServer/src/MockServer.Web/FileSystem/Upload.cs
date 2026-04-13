using MockServer.Infrastructure.FileSystem;

namespace MockServer.Web.FileSystem;

/// <summary>
/// POST /api/files/upload — handles file uploads for Syncfusion FileManager.
/// </summary>
public class Upload(InMemoryFileSystemService fileSystem)
  : EndpointWithoutRequest
{
  public override void Configure()
  {
    Post("/files/upload");
    AllowAnonymous();
    AllowFileUploads();
  }

  public override async Task HandleAsync(CancellationToken ct)
  {
    var path = Query<string>("path") ?? "/";
    var files = Files;

    foreach (var file in files)
    {
      fileSystem.Upload(path, file.FileName, file.Length);
    }

    await SendOkAsync(ct);
  }
}
