using MockServer.UseCases.DTOs;

namespace MockServer.UseCases.AuditLog.Stats;

public record GetAuditLogStatsQuery : IRequest<Result<AuditLogStatsDto>>;
