using MockServer.UseCases.DTOs;
using MockServer.UseCases.Mappers;

namespace MockServer.UseCases.CalendarEvents.Create;

public class CreateCalendarEventHandler(IRepository<CalendarEvent> repository)
  : IRequestHandler<CreateCalendarEventCommand, Result<CalendarEventDto>>
{
  public async Task<Result<CalendarEventDto>> Handle(
    CreateCalendarEventCommand request,
    CancellationToken cancellationToken)
  {
    var calendarEvent = new CalendarEvent
    {
      Title = request.Title,
      Description = request.Description,
      StartTime = request.StartTime,
      EndTime = request.EndTime,
      Location = request.Location,
      IsAllDay = request.IsAllDay,
      RecurrenceRule = request.RecurrenceRule,
      Category = request.Category,
      Color = request.Color,
      CreatedBy = request.CreatedBy
    };

    var created = await repository.AddAsync(calendarEvent, cancellationToken);
    return Result.Success(DtoMapper.ToDto(created));
  }
}
