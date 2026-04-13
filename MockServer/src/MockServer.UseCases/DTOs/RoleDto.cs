namespace MockServer.UseCases.DTOs;

public record RoleDto(
  int Id,
  string Name,
  string Description,
  bool IsBuiltIn,
  List<string> Permissions);
