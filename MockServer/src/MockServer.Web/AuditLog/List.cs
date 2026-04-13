using MockServer.UseCases.AuditLog.List;
using MockServer.UseCases.DTOs;

namespace MockServer.Web.AuditLog;

public class List(IMediator mediator) : Endpoint<ListAuditLogRequest, PaginatedList<AuditEntryDto>>
{
  public override void Configure()
  {
    Get("/audit-log");
    AllowAnonymous();
  }

  public override async Task HandleAsync(ListAuditLogRequest req, CancellationToken ct)
  {
    var result = await mediator.Send(
      new ListAuditLogQuery(req.Skip, req.Limit, req.Action, req.EntityType, req.UserId, req.From, req.To), ct);
    if (result.IsSuccess) await SendOkAsync(result.Value, ct);
  }
}

public record ListAuditLogRequest
{
  [QueryParam] public int Skip { get; init; }
  [QueryParam] public int Limit { get; init; } = 30;
  [QueryParam] public string? Action { get; init; }
  [QueryParam] public string? EntityType { get; init; }
  [QueryParam] public int? UserId { get; init; }
  [QueryParam] public DateTime? From { get; init; }
  [QueryParam] public DateTime? To { get; init; }
}
