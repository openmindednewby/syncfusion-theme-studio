using MockServer.UseCases.DTOs;
using MockServer.UseCases.Mappers;

namespace MockServer.UseCases.CalendarEvents.Update;

public class UpdateCalendarEventHandler(IRepository<CalendarEvent> repository)
  : IRequestHandler<UpdateCalendarEventCommand, Result<CalendarEventDto>>
{
  public async Task<Result<CalendarEventDto>> Handle(
    UpdateCalendarEventCommand request,
    CancellationToken cancellationToken)
  {
    var calendarEvent = await repository.GetByIdAsync(request.Id, cancellationToken);
    if (calendarEvent is null)
      return Result.NotFound($"Calendar event with id {request.Id} not found.");

    calendarEvent.Title = request.Title;
    calendarEvent.Description = request.Description;
    calendarEvent.StartTime = request.StartTime;
    calendarEvent.EndTime = request.EndTime;
    calendarEvent.Location = request.Location;
    calendarEvent.IsAllDay = request.IsAllDay;
    calendarEvent.RecurrenceRule = request.RecurrenceRule;
    calendarEvent.Category = request.Category;
    calendarEvent.Color = request.Color;
    calendarEvent.CreatedBy = request.CreatedBy;
    calendarEvent.UpdatedAt = DateTime.UtcNow;

    await repository.UpdateAsync(calendarEvent, cancellationToken);
    return Result.Success(DtoMapper.ToDto(calendarEvent));
  }
}
