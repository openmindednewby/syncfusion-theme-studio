namespace MockServer.Core.Entities;

public class AuditEntry : BaseEntity
{
  public int UserId { get; set; }
  public string UserName { get; set; } = string.Empty;
  public AuditAction Action { get; set; }
  public string EntityType { get; set; } = string.Empty;
  public string EntityId { get; set; } = string.Empty;
  public string Details { get; set; } = string.Empty;
  public DateTime Timestamp { get; set; } = DateTime.UtcNow;
  public string IpAddress { get; set; } = string.Empty;
}
