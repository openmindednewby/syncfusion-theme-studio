namespace MockServer.Core.Entities;

public class KanbanTask : BaseEntity
{
  public string Title { get; set; } = string.Empty;
  public string Summary { get; set; } = string.Empty;
  public string Status { get; set; } = string.Empty;
  public string Priority { get; set; } = string.Empty;
  public string Assignee { get; set; } = string.Empty;
  public string Tags { get; set; } = string.Empty;
  public string Color { get; set; } = string.Empty;
  public DateTime? DueDate { get; set; }
}
