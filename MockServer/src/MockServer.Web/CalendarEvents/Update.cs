using MockServer.UseCases.CalendarEvents.Update;
using MockServer.UseCases.DTOs;

namespace MockServer.Web.CalendarEvents;

public class Update(IMediator mediator) : Endpoint<UpdateCalendarEventRequest, CalendarEventDto>
{
  public override void Configure()
  {
    Put("/calendar/events/{Id}");
    AllowAnonymous();
  }

  public override async Task HandleAsync(UpdateCalendarEventRequest req, CancellationToken ct)
  {
    var result = await mediator.Send(new UpdateCalendarEventCommand(
      req.Id,
      req.Title,
      req.Description,
      req.StartTime,
      req.EndTime,
      req.Location,
      req.IsAllDay,
      req.RecurrenceRule,
      req.Category,
      req.Color,
      req.CreatedBy), ct);

    if (result.IsSuccess) await SendOkAsync(result.Value, ct);
    else await SendNotFoundAsync(ct);
  }
}

public record UpdateCalendarEventRequest
{
  public int Id { get; init; }
  public string Title { get; init; } = string.Empty;
  public string Description { get; init; } = string.Empty;
  public DateTime StartTime { get; init; }
  public DateTime EndTime { get; init; }
  public string Location { get; init; } = string.Empty;
  public bool IsAllDay { get; init; }
  public string? RecurrenceRule { get; init; }
  public string Category { get; init; } = string.Empty;
  public string Color { get; init; } = string.Empty;
  public string CreatedBy { get; init; } = string.Empty;
}
