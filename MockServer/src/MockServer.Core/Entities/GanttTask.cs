namespace MockServer.Core.Entities;

public class GanttTask : BaseEntity
{
  public string TaskName { get; set; } = string.Empty;
  public DateTime StartDate { get; set; }
  public DateTime EndDate { get; set; }
  public int Duration { get; set; }
  public int Progress { get; set; }
  public int? ParentTaskId { get; set; }
  public string? Dependencies { get; set; }
  public string Assignee { get; set; } = string.Empty;
  public string Priority { get; set; } = string.Empty;
}
