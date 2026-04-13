namespace MockServer.UseCases.CalendarEvents.Delete;

public record DeleteCalendarEventCommand(int Id) : IRequest<Result>;
