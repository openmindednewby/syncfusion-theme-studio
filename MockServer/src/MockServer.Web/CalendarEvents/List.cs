using MockServer.UseCases.CalendarEvents.List;
using MockServer.UseCases.DTOs;

namespace MockServer.Web.CalendarEvents;

public class List(IMediator mediator) : Endpoint<ListCalendarEventsRequest, List<CalendarEventDto>>
{
  public override void Configure()
  {
    Get("/calendar/events");
    AllowAnonymous();
  }

  public override async Task HandleAsync(ListCalendarEventsRequest req, CancellationToken ct)
  {
    var result = await mediator.Send(
      new ListCalendarEventsQuery(req.StartDate, req.EndDate), ct);
    if (result.IsSuccess) await SendOkAsync(result.Value, ct);
  }
}

public record ListCalendarEventsRequest
{
  [QueryParam] public DateTime? StartDate { get; init; }
  [QueryParam] public DateTime? EndDate { get; init; }
}
