using MockServer.UseCases.DTOs;
using MockServer.UseCases.Mappers;

namespace MockServer.UseCases.Roles.GetById;

public class GetRoleByIdHandler(IRepository<Role> repository)
  : IRequestHandler<GetRoleByIdQuery, Result<RoleDto>>
{
  public async Task<Result<RoleDto>> Handle(
    GetRoleByIdQuery request,
    CancellationToken cancellationToken)
  {
    var role = await repository.GetByIdAsync(request.Id, cancellationToken);
    if (role is null) return Result.NotFound($"Role with id {request.Id} not found.");
    return Result.Success(DtoMapper.ToDto(role));
  }
}
