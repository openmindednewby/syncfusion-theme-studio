using MockServer.UseCases.DTOs;
using MockServer.UseCases.Mappers;

namespace MockServer.UseCases.CalendarEvents.List;

public class ListCalendarEventsHandler(IRepository<CalendarEvent> repository)
  : IRequestHandler<ListCalendarEventsQuery, Result<List<CalendarEventDto>>>
{
  public async Task<Result<List<CalendarEventDto>>> Handle(
    ListCalendarEventsQuery request,
    CancellationToken cancellationToken)
  {
    var items = await repository.ListAsync(cancellationToken);

    if (request.StartDate.HasValue)
      items = items.Where(e => e.EndTime >= request.StartDate.Value).ToList();

    if (request.EndDate.HasValue)
      items = items.Where(e => e.StartTime <= request.EndDate.Value).ToList();

    var dtos = items.Select(DtoMapper.ToDto).ToList();
    return Result.Success(dtos);
  }
}
