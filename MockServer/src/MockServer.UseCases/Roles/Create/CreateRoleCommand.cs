using MockServer.UseCases.DTOs;

namespace MockServer.UseCases.Roles.Create;

public record CreateRoleCommand(
  string Name,
  string Description,
  List<string> Permissions) : IRequest<Result<RoleDto>>;
