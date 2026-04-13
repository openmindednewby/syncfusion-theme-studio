namespace MockServer.Core.Entities;

public class ChatMessage : BaseEntity
{
  public int ChannelId { get; set; }
  public string SenderName { get; set; } = string.Empty;
  public string SenderAvatar { get; set; } = string.Empty;
  public string Content { get; set; } = string.Empty;
  public DateTime Timestamp { get; set; } = DateTime.UtcNow;
}
