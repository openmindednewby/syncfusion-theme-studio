namespace MockServer.Infrastructure.FileSystem;

/// <summary>
/// Represents a file or folder in the in-memory file system.
/// </summary>
public class FileSystemItem
{
  public string Name { get; set; } = string.Empty;
  public bool IsFile { get; set; }
  public long Size { get; set; }
  public DateTime DateCreated { get; set; } = DateTime.UtcNow;
  public DateTime DateModified { get; set; } = DateTime.UtcNow;
  public string Type { get; set; } = string.Empty;
  public bool HasChild { get; set; }
  public string FilterPath { get; set; } = string.Empty;
  public string? ImageUrl { get; set; }
  public List<FileSystemItem> Children { get; set; } = [];
}
