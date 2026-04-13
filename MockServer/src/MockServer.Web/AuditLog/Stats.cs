using MockServer.UseCases.AuditLog.Stats;
using MockServer.UseCases.DTOs;

namespace MockServer.Web.AuditLog;

public class Stats(IMediator mediator) : EndpointWithoutRequest<AuditLogStatsDto>
{
  public override void Configure()
  {
    Get("/audit-log/stats");
    AllowAnonymous();
  }

  public override async Task HandleAsync(CancellationToken ct)
  {
    var result = await mediator.Send(new GetAuditLogStatsQuery(), ct);
    if (result.IsSuccess) await SendOkAsync(result.Value, ct);
  }
}
