namespace MockServer.UseCases.DTOs;

public record AuditEntryDto(
  int Id,
  int UserId,
  string UserName,
  string Action,
  string EntityType,
  string EntityId,
  string Details,
  DateTime Timestamp,
  string IpAddress);
