using MockServer.UseCases.DTOs;
using MockServer.UseCases.Mappers;

namespace MockServer.UseCases.Roles.List;

public class ListRolesHandler(IRepository<Role> repository)
  : IRequestHandler<ListRolesQuery, Result<List<RoleDto>>>
{
  public async Task<Result<List<RoleDto>>> Handle(
    ListRolesQuery request,
    CancellationToken cancellationToken)
  {
    var roles = await repository.ListAsync(cancellationToken);
    var dtos = roles.Select(DtoMapper.ToDto).ToList();
    return Result.Success(dtos);
  }
}
