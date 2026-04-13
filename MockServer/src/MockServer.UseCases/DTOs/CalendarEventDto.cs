namespace MockServer.UseCases.DTOs;

public record CalendarEventDto(
  int Id,
  string Title,
  string Description,
  DateTime StartTime,
  DateTime EndTime,
  string Location,
  bool IsAllDay,
  string? RecurrenceRule,
  string Category,
  string Color,
  string CreatedBy,
  DateTime CreatedAt);
