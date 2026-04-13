namespace MockServer.UseCases.CalendarEvents.Delete;

public class DeleteCalendarEventHandler(IRepository<CalendarEvent> repository)
  : IRequestHandler<DeleteCalendarEventCommand, Result>
{
  public async Task<Result> Handle(
    DeleteCalendarEventCommand request,
    CancellationToken cancellationToken)
  {
    var calendarEvent = await repository.GetByIdAsync(request.Id, cancellationToken);
    if (calendarEvent is null)
      return Result.NotFound($"Calendar event with id {request.Id} not found.");

    await repository.DeleteAsync(calendarEvent, cancellationToken);
    return Result.Success();
  }
}
