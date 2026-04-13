using MockServer.UseCases.DTOs;

namespace MockServer.UseCases.CalendarEvents.List;

public record ListCalendarEventsQuery(DateTime? StartDate = null, DateTime? EndDate = null)
  : IRequest<Result<List<CalendarEventDto>>>;
