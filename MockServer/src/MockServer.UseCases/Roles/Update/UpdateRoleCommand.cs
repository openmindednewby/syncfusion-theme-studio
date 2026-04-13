using MockServer.UseCases.DTOs;

namespace MockServer.UseCases.Roles.Update;

public record UpdateRoleCommand(
  int Id,
  string Name,
  string Description,
  List<string> Permissions) : IRequest<Result<RoleDto>>;
