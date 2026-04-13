using MockServer.UseCases.DTOs;

namespace MockServer.UseCases.Roles.List;

public record ListRolesQuery : IRequest<Result<List<RoleDto>>>;
