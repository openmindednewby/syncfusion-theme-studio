namespace MockServer.Core.Entities;

public class ChatChannel : BaseEntity
{
  public string Name { get; set; } = string.Empty;
  public string Description { get; set; } = string.Empty;
  public string Icon { get; set; } = string.Empty;
  public List<ChatMessage> Messages { get; set; } = [];
}
