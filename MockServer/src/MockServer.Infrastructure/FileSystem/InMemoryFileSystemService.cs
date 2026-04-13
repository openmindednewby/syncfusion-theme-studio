using System.Text.RegularExpressions;

namespace MockServer.Infrastructure.FileSystem;

/// <summary>
/// In-memory file system service that implements the Syncfusion FileManager API contract.
/// </summary>
public class InMemoryFileSystemService
{
  private readonly FileSystemItem _root;
  private readonly Lock _lock = new();

  public InMemoryFileSystemService()
  {
    _root = BuildDefaultFileSystem();
  }

  /// <summary>Reads the contents of a folder at the given path.</summary>
  public FileManagerResponse Read(string path, string[]? data = null)
  {
    lock (_lock)
    {
      var folder = NavigateToFolder(path);
      if (folder is null)
        return ErrorResponse(path, "Folder not found");

      var items = folder.Children.Select(ToResponseItem).ToList();
      var cwd = ToResponseItem(folder);
      cwd.HasChild = folder.Children.Exists(c => !c.IsFile);

      return new FileManagerResponse { Cwd = cwd, Files = items };
    }
  }

  /// <summary>Creates a new folder at the given path.</summary>
  public FileManagerResponse CreateFolder(string path, string name)
  {
    lock (_lock)
    {
      var parent = NavigateToFolder(path);
      if (parent is null)
        return ErrorResponse(path, "Parent folder not found");

      if (parent.Children.Exists(c => c.Name == name && !c.IsFile))
        return ErrorResponse(path, $"A folder with the name '{name}' already exists");

      var newFolder = new FileSystemItem
      {
        Name = name,
        IsFile = false,
        Type = "",
        Size = 0,
        DateCreated = DateTime.UtcNow,
        DateModified = DateTime.UtcNow,
        FilterPath = path,
        HasChild = false,
      };

      parent.Children.Add(newFolder);
      parent.HasChild = true;

      return new FileManagerResponse
      {
        Files = [ToResponseItem(newFolder)],
      };
    }
  }

  /// <summary>Renames a file or folder.</summary>
  public FileManagerResponse Rename(string path, string name, string newName)
  {
    lock (_lock)
    {
      var parent = NavigateToFolder(path);
      if (parent is null)
        return ErrorResponse(path, "Folder not found");

      var item = parent.Children.Find(c => c.Name == name);
      if (item is null)
        return ErrorResponse(path, $"Item '{name}' not found");

      if (parent.Children.Exists(c => c.Name == newName))
        return ErrorResponse(path, $"An item with the name '{newName}' already exists");

      item.Name = newName;
      item.DateModified = DateTime.UtcNow;
      if (item.IsFile)
        item.Type = Path.GetExtension(newName);

      return new FileManagerResponse
      {
        Files = [ToResponseItem(item)],
      };
    }
  }

  /// <summary>Deletes one or more files/folders.</summary>
  public FileManagerResponse Delete(string path, string[] names)
  {
    lock (_lock)
    {
      var parent = NavigateToFolder(path);
      if (parent is null)
        return ErrorResponse(path, "Folder not found");

      var deleted = new List<FileManagerResponseItem>();
      foreach (var name in names)
      {
        var item = parent.Children.Find(c => c.Name == name);
        if (item is null) continue;
        deleted.Add(ToResponseItem(item));
        parent.Children.Remove(item);
      }

      parent.HasChild = parent.Children.Exists(c => !c.IsFile);

      return new FileManagerResponse { Files = deleted };
    }
  }

  /// <summary>Moves files/folders to a target path.</summary>
  public FileManagerResponse Move(string path, string targetPath, string[] names)
  {
    lock (_lock)
    {
      var source = NavigateToFolder(path);
      var target = NavigateToFolder(targetPath);
      if (source is null || target is null)
        return ErrorResponse(path, "Source or target folder not found");

      var moved = new List<FileManagerResponseItem>();
      foreach (var name in names)
      {
        var item = source.Children.Find(c => c.Name == name);
        if (item is null) continue;

        if (target.Children.Exists(c => c.Name == name))
          return ErrorResponse(targetPath, $"An item with the name '{name}' already exists in the target");

        source.Children.Remove(item);
        item.FilterPath = targetPath;
        target.Children.Add(item);
        moved.Add(ToResponseItem(item));
      }

      source.HasChild = source.Children.Exists(c => !c.IsFile);
      target.HasChild = true;

      return new FileManagerResponse { Files = moved };
    }
  }

  /// <summary>Copies files/folders to a target path.</summary>
  public FileManagerResponse Copy(string path, string targetPath, string[] names)
  {
    lock (_lock)
    {
      var source = NavigateToFolder(path);
      var target = NavigateToFolder(targetPath);
      if (source is null || target is null)
        return ErrorResponse(path, "Source or target folder not found");

      var copied = new List<FileManagerResponseItem>();
      foreach (var name in names)
      {
        var item = source.Children.Find(c => c.Name == name);
        if (item is null) continue;

        if (target.Children.Exists(c => c.Name == name))
          return ErrorResponse(targetPath, $"An item with the name '{name}' already exists in the target");

        var clone = CloneItem(item, targetPath);
        target.Children.Add(clone);
        copied.Add(ToResponseItem(clone));
      }

      target.HasChild = true;

      return new FileManagerResponse { Files = copied };
    }
  }

  /// <summary>Searches for files/folders matching a pattern.</summary>
  public FileManagerResponse Search(string path, string searchString, bool caseSensitive = false)
  {
    lock (_lock)
    {
      var folder = NavigateToFolder(path);
      if (folder is null)
        return ErrorResponse(path, "Folder not found");

      var results = new List<FileManagerResponseItem>();
      SearchRecursive(folder, path, searchString, caseSensitive, results);

      var cwd = ToResponseItem(folder);
      return new FileManagerResponse { Cwd = cwd, Files = results };
    }
  }

  /// <summary>Handles file upload to the given path.</summary>
  public void Upload(string path, string fileName, long size)
  {
    lock (_lock)
    {
      var folder = NavigateToFolder(path);
      if (folder is null) return;

      var existing = folder.Children.Find(c => c.Name == fileName && c.IsFile);
      if (existing is not null)
      {
        existing.Size = size;
        existing.DateModified = DateTime.UtcNow;
        return;
      }

      folder.Children.Add(new FileSystemItem
      {
        Name = fileName,
        IsFile = true,
        Size = size,
        Type = Path.GetExtension(fileName),
        DateCreated = DateTime.UtcNow,
        DateModified = DateTime.UtcNow,
        FilterPath = path,
        HasChild = false,
      });
    }
  }

  /// <summary>Checks whether a file exists at the given path.</summary>
  public bool FileExists(string path, string fileName)
  {
    lock (_lock)
    {
      var folder = NavigateToFolder(path);
      return folder?.Children.Exists(c => c.Name == fileName && c.IsFile) == true;
    }
  }

  private FileSystemItem? NavigateToFolder(string path)
  {
    if (path == "/") return _root;

    var segments = path.Trim('/').Split('/');
    var current = _root;

    foreach (var segment in segments)
    {
      var child = current.Children.Find(c => c.Name == segment && !c.IsFile);
      if (child is null) return null;
      current = child;
    }

    return current;
  }

  private void SearchRecursive(
    FileSystemItem folder, string currentPath,
    string searchString, bool caseSensitive,
    List<FileManagerResponseItem> results)
  {
    var comparison = caseSensitive
      ? StringComparison.Ordinal
      : StringComparison.OrdinalIgnoreCase;

    var pattern = WildcardToRegex(searchString, caseSensitive);

    foreach (var child in folder.Children)
    {
      var childPath = currentPath == "/" ? $"/{child.Name}" : $"{currentPath}/{child.Name}";
      if (pattern.IsMatch(child.Name))
      {
        var item = ToResponseItem(child);
        item.FilterPath = currentPath.EndsWith('/') ? currentPath : currentPath + "/";
        results.Add(item);
      }

      if (!child.IsFile)
      {
        var subPath = currentPath == "/" ? $"/{child.Name}/" : $"{currentPath}/{child.Name}/";
        SearchRecursive(child, subPath, searchString, caseSensitive, results);
      }
    }
  }

  private static Regex WildcardToRegex(string pattern, bool caseSensitive)
  {
    var escaped = Regex.Escape(pattern).Replace("\\*", ".*").Replace("\\?", ".");
    var options = caseSensitive ? RegexOptions.None : RegexOptions.IgnoreCase;
    return new Regex($"^{escaped}$", options);
  }

  private static FileManagerResponseItem ToResponseItem(FileSystemItem item) => new()
  {
    Name = item.Name,
    IsFile = item.IsFile,
    Size = item.Size,
    DateCreated = item.DateCreated,
    DateModified = item.DateModified,
    Type = item.Type,
    HasChild = item.HasChild,
    FilterPath = item.FilterPath,
  };

  private static FileSystemItem CloneItem(FileSystemItem source, string newFilterPath)
  {
    var clone = new FileSystemItem
    {
      Name = source.Name,
      IsFile = source.IsFile,
      Size = source.Size,
      Type = source.Type,
      DateCreated = DateTime.UtcNow,
      DateModified = DateTime.UtcNow,
      FilterPath = newFilterPath,
      HasChild = source.HasChild,
    };

    foreach (var child in source.Children)
    {
      var childPath = newFilterPath.EndsWith('/')
        ? $"{newFilterPath}{source.Name}/"
        : $"{newFilterPath}/{source.Name}/";
      clone.Children.Add(CloneItem(child, childPath));
    }

    return clone;
  }

  private static FileManagerResponse ErrorResponse(string path, string message) => new()
  {
    Error = new FileManagerError
    {
      Code = "404",
      Message = message,
      FileExists = [],
    },
  };

  private static FileSystemItem BuildDefaultFileSystem()
  {
    var root = new FileSystemItem
    {
      Name = "Files",
      IsFile = false,
      FilterPath = "",
      HasChild = true,
    };

    var documents = NewFolder("Documents", "/");
    documents.Children.AddRange([
      NewFile("Annual Report 2025.pdf", 2_456_000, ".pdf"),
      NewFile("Meeting Notes.docx", 45_000, ".docx"),
      NewFile("Project Plan.xlsx", 128_000, ".xlsx"),
      NewFile("Budget Summary.pdf", 890_000, ".pdf"),
      NewFile("Team Roster.csv", 12_000, ".csv"),
    ]);

    var images = NewFolder("Images", "/");
    images.Children.AddRange([
      NewFile("company-logo.png", 156_000, ".png"),
      NewFile("team-photo.jpg", 3_200_000, ".jpg"),
      NewFile("product-banner.png", 890_000, ".png"),
      NewFile("icon-set.svg", 24_000, ".svg"),
      NewFile("office-panorama.jpg", 5_400_000, ".jpg"),
    ]);

    var downloads = NewFolder("Downloads", "/");
    downloads.Children.AddRange([
      NewFile("setup-installer.exe", 45_000_000, ".exe"),
      NewFile("user-manual.pdf", 5_600_000, ".pdf"),
      NewFile("sample-data.zip", 12_000_000, ".zip"),
      NewFile("release-notes.txt", 8_000, ".txt"),
    ]);

    var projects = NewFolder("Projects", "/");
    var webApp = NewFolder("WebApp", "/Projects/");
    webApp.Children.AddRange([
      NewFile("index.html", 4_500, ".html"),
      NewFile("styles.css", 12_000, ".css"),
      NewFile("app.js", 34_000, ".js"),
      NewFile("README.md", 6_000, ".md"),
    ]);
    projects.HasChild = true;
    projects.Children.Add(webApp);

    var mobileApp = NewFolder("MobileApp", "/Projects/");
    mobileApp.Children.AddRange([
      NewFile("App.tsx", 8_000, ".tsx"),
      NewFile("package.json", 2_000, ".json"),
    ]);
    projects.Children.Add(mobileApp);

    projects.Children.Add(NewFile("architecture-diagram.png", 450_000, ".png"));

    root.Children.AddRange([documents, images, downloads, projects]);

    return root;
  }

  private static FileSystemItem NewFolder(string name, string filterPath) => new()
  {
    Name = name,
    IsFile = false,
    Type = "",
    Size = 0,
    DateCreated = DateTime.UtcNow.AddDays(-Random.Shared.Next(1, 90)),
    DateModified = DateTime.UtcNow.AddDays(-Random.Shared.Next(0, 30)),
    FilterPath = filterPath,
    HasChild = false,
  };

  private static FileSystemItem NewFile(string name, long size, string type) => new()
  {
    Name = name,
    IsFile = true,
    Type = type,
    Size = size,
    DateCreated = DateTime.UtcNow.AddDays(-Random.Shared.Next(1, 180)),
    DateModified = DateTime.UtcNow.AddDays(-Random.Shared.Next(0, 60)),
    FilterPath = "/",
    HasChild = false,
  };
}
