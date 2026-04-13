using MockServer.UseCases.CalendarEvents.Create;
using MockServer.UseCases.DTOs;

namespace MockServer.Web.CalendarEvents;

public class Create(IMediator mediator) : Endpoint<CreateCalendarEventRequest, CalendarEventDto>
{
  public override void Configure()
  {
    Post("/calendar/events");
    AllowAnonymous();
  }

  public override async Task HandleAsync(CreateCalendarEventRequest req, CancellationToken ct)
  {
    var result = await mediator.Send(new CreateCalendarEventCommand(
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

    if (result.IsSuccess)
      await SendCreatedAtAsync<Create>(new { result.Value.Id }, result.Value, cancellation: ct);
  }
}

public record CreateCalendarEventRequest(
  string Title,
  string Description,
  DateTime StartTime,
  DateTime EndTime,
  string Location,
  bool IsAllDay,
  string? RecurrenceRule,
  string Category,
  string Color,
  string CreatedBy);
