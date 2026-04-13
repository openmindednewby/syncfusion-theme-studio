namespace MockServer.UseCases.DTOs;

public record AuditLogStatsDto(
  int Created,
  int Updated,
  int Deleted,
  int Viewed,
  int LoggedIn,
  int LoggedOut,
  int Total);
