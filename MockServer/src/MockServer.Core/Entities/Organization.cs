namespace MockServer.Core.Entities;

public class Organization : BaseEntity
{
  public string Name { get; set; } = string.Empty;
  public string Slug { get; set; } = string.Empty;
  public string LogoUrl { get; set; } = string.Empty;
  public string Plan { get; set; } = string.Empty;
  public int MemberCount { get; set; }
}
