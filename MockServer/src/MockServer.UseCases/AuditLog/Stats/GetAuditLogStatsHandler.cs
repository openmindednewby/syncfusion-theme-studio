using MockServer.UseCases.DTOs;

namespace MockServer.UseCases.AuditLog.Stats;

public class GetAuditLogStatsHandler(IRepository<AuditEntry> repository)
  : IRequestHandler<GetAuditLogStatsQuery, Result<AuditLogStatsDto>>
{
  public async Task<Result<AuditLogStatsDto>> Handle(
    GetAuditLogStatsQuery request,
    CancellationToken cancellationToken)
  {
    var entries = await repository.ListAsync(cancellationToken);

    var stats = new AuditLogStatsDto(
      Created: entries.Count(e => e.Action == AuditAction.Created),
      Updated: entries.Count(e => e.Action == AuditAction.Updated),
      Deleted: entries.Count(e => e.Action == AuditAction.Deleted),
      Viewed: entries.Count(e => e.Action == AuditAction.Viewed),
      LoggedIn: entries.Count(e => e.Action == AuditAction.LoggedIn),
      LoggedOut: entries.Count(e => e.Action == AuditAction.LoggedOut),
      Total: entries.Count);

    return Result.Success(stats);
  }
}
