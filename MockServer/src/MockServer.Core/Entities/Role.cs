namespace MockServer.Core.Entities;

public class Role : BaseEntity
{
  public string Name { get; set; } = string.Empty;
  public string Description { get; set; } = string.Empty;
  public bool IsBuiltIn { get; set; }
  public List<string> Permissions { get; set; } = [];
}
