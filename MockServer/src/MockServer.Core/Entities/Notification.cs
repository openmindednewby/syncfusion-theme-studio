namespace MockServer.Core.Entities;

public class Notification : BaseEntity
{
  public NotificationType Type { get; set; }
  public string Title { get; set; } = string.Empty;
  public string Message { get; set; } = string.Empty;
  public bool IsRead { get; set; }
}
