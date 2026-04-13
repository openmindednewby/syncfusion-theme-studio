using MockServer.UseCases.DTOs;

namespace MockServer.UseCases.AuditLog.List;

public record ListAuditLogQuery(
  int Skip = 0,
  int Limit = 30,
  string? Action = null,
  string? EntityType = null,
  int? UserId = null,
  DateTime? From = null,
  DateTime? To = null)
  : IRequest<Result<PaginatedList<AuditEntryDto>>>;
