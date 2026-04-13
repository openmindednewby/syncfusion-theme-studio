using MockServer.UseCases.DTOs;
using MockServer.UseCases.Mappers;

namespace MockServer.UseCases.AuditLog.List;

public class ListAuditLogHandler(IRepository<AuditEntry> repository)
  : IRequestHandler<ListAuditLogQuery, Result<PaginatedList<AuditEntryDto>>>
{
  public async Task<Result<PaginatedList<AuditEntryDto>>> Handle(
    ListAuditLogQuery request,
    CancellationToken cancellationToken)
  {
    // Get all entries then filter in-memory (InMemory provider doesn't support complex LINQ)
    var allEntries = await repository.ListAsync(cancellationToken);
    var query = allEntries.AsQueryable();

    if (!string.IsNullOrWhiteSpace(request.Action))
    {
      if (Enum.TryParse<AuditAction>(request.Action, ignoreCase: true, out var action))
        query = query.Where(e => e.Action == action);
    }

    if (!string.IsNullOrWhiteSpace(request.EntityType))
      query = query.Where(e => e.EntityType == request.EntityType);

    if (request.UserId.HasValue)
      query = query.Where(e => e.UserId == request.UserId.Value);

    if (request.From.HasValue)
      query = query.Where(e => e.Timestamp >= request.From.Value);

    if (request.To.HasValue)
      query = query.Where(e => e.Timestamp <= request.To.Value);

    var total = query.Count();
    var items = query
      .OrderByDescending(e => e.Timestamp)
      .Skip(request.Skip)
      .Take(request.Limit)
      .Select(DtoMapper.ToDto)
      .ToList();

    return Result.Success(new PaginatedList<AuditEntryDto>(items, total, request.Skip, request.Limit));
  }
}
