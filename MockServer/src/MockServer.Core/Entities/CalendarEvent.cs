namespace MockServer.Core.Entities;

public class CalendarEvent : BaseEntity
{
  public string Title { get; set; } = string.Empty;
  public string Description { get; set; } = string.Empty;
  public DateTime StartTime { get; set; }
  public DateTime EndTime { get; set; }
  public string Location { get; set; } = string.Empty;
  public bool IsAllDay { get; set; }
  public string? RecurrenceRule { get; set; }
  public string Category { get; set; } = string.Empty;
  public string Color { get; set; } = string.Empty;
  public string CreatedBy { get; set; } = string.Empty;
}
