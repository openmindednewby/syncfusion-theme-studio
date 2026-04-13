using MockServer.UseCases.CalendarEvents.Delete;

namespace MockServer.Web.CalendarEvents;

public class Delete(IMediator mediator) : Endpoint<DeleteCalendarEventRequest>
{
  public override void Configure()
  {
    Verbs(Http.DELETE);
    Routes("/calendar/events/{Id}");
    AllowAnonymous();
  }

  public override async Task HandleAsync(DeleteCalendarEventRequest req, CancellationToken ct)
  {
    var result = await mediator.Send(new DeleteCalendarEventCommand(req.Id), ct);
    if (result.IsSuccess) await SendNoContentAsync(ct);
    else await SendNotFoundAsync(ct);
  }
}

public record DeleteCalendarEventRequest
{
  public int Id { get; init; }
}
