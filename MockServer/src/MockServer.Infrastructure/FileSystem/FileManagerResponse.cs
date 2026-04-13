using System.Text.Json.Serialization;

namespace MockServer.Infrastructure.FileSystem;

/// <summary>
/// Response contract that matches the Syncfusion FileManager expected format.
/// </summary>
public class FileManagerResponse
{
  [JsonPropertyName("cwd")]
  public FileManagerResponseItem? Cwd { get; set; }

  [JsonPropertyName("files")]
  public List<FileManagerResponseItem> Files { get; set; } = [];

  [JsonPropertyName("error")]
  public FileManagerError? Error { get; set; }
}

public class FileManagerResponseItem
{
  [JsonPropertyName("name")]
  public string Name { get; set; } = string.Empty;

  [JsonPropertyName("size")]
  public long Size { get; set; }

  [JsonPropertyName("isFile")]
  public bool IsFile { get; set; }

  [JsonPropertyName("dateCreated")]
  public DateTime DateCreated { get; set; }

  [JsonPropertyName("dateModified")]
  public DateTime DateModified { get; set; }

  [JsonPropertyName("type")]
  public string Type { get; set; } = string.Empty;

  [JsonPropertyName("hasChild")]
  public bool HasChild { get; set; }

  [JsonPropertyName("filterPath")]
  public string FilterPath { get; set; } = string.Empty;
}

public class FileManagerError
{
  [JsonPropertyName("code")]
  public string Code { get; set; } = string.Empty;

  [JsonPropertyName("message")]
  public string Message { get; set; } = string.Empty;

  [JsonPropertyName("fileExists")]
  public List<string> FileExists { get; set; } = [];
}
