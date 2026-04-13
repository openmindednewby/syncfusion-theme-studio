using MockServer.UseCases.DTOs;

namespace MockServer.UseCases.Roles.GetById;

public record GetRoleByIdQuery(int Id) : IRequest<Result<RoleDto>>;
