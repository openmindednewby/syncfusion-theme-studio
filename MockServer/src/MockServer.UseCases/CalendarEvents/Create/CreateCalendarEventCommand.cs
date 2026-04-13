using MockServer.UseCases.DTOs;

namespace MockServer.UseCases.CalendarEvents.Create;

public record CreateCalendarEventCommand(
  string Title,
  string Description,
  DateTime StartTime,
  DateTime EndTime,
  string Location,
  bool IsAllDay,
  string? RecurrenceRule,
  string Category,
  string Color,
  string CreatedBy) : IRequest<Result<CalendarEventDto>>;
