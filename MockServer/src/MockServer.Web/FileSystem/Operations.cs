using System.Text.Json;
using MockServer.Infrastructure.FileSystem;

namespace MockServer.Web.FileSystem;

/// <summary>
/// POST /api/files/operations — handles all Syncfusion FileManager operations:
/// Read, Create, Delete, Rename, Move, Copy, Search, Details.
/// </summary>
public class Operations(InMemoryFileSystemService fileSystem)
  : Endpoint<FileOperationsRequest, FileManagerResponse>
{
  public override void Configure()
  {
    Post("/files/operations");
    AllowAnonymous();
  }

  public override async Task HandleAsync(FileOperationsRequest req, CancellationToken ct)
  {
    var response = req.Action?.ToLowerInvariant() switch
    {
      "read" => fileSystem.Read(req.Path ?? "/"),
      "create" => fileSystem.CreateFolder(req.Path ?? "/", req.Name ?? "New Folder"),
      "rename" => fileSystem.Rename(req.Path ?? "/", req.Name ?? "", req.NewName ?? ""),
      "delete" => HandleDelete(req),
      "move" => HandleMove(req),
      "copy" => HandleCopy(req),
      "search" => fileSystem.Search(
        req.Path ?? "/",
        req.SearchString ?? "",
        req.CaseSensitive),
      "details" => fileSystem.Read(req.Path ?? "/"),
      _ => new FileManagerResponse
      {
        Error = new FileManagerError
        {
          Code = "400",
          Message = $"Unknown action: {req.Action}",
          FileExists = [],
        },
      },
    };

    await SendOkAsync(response, ct);
  }

  private FileManagerResponse HandleDelete(FileOperationsRequest req)
  {
    var names = ParseNames(req.Names ?? req.Data);
    return fileSystem.Delete(req.Path ?? "/", names);
  }

  private FileManagerResponse HandleMove(FileOperationsRequest req)
  {
    var names = ParseNames(req.Names ?? req.Data);
    return fileSystem.Move(req.Path ?? "/", req.TargetPath ?? "/", names);
  }

  private FileManagerResponse HandleCopy(FileOperationsRequest req)
  {
    var names = ParseNames(req.Names ?? req.Data);
    return fileSystem.Copy(req.Path ?? "/", req.TargetPath ?? "/", names);
  }

  private static string[] ParseNames(object? data)
  {
    if (data is null) return [];
    if (data is string[] arr) return arr;
    if (data is JsonElement element)
    {
      if (element.ValueKind == JsonValueKind.Array)
        return element.EnumerateArray()
          .Select(e => e.GetProperty("name").GetString() ?? "")
          .Where(n => n != "")
          .ToArray();
    }
    return [];
  }
}

public class FileOperationsRequest
{
  public string? Action { get; set; }
  public string? Path { get; set; }
  public string? Name { get; set; }
  public string? NewName { get; set; }
  public string[]? Names { get; set; }
  public string? TargetPath { get; set; }
  public string? SearchString { get; set; }
  public bool CaseSensitive { get; set; }
  public object? Data { get; set; }
}
