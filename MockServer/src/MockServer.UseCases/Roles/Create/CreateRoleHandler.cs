using MockServer.UseCases.DTOs;
using MockServer.UseCases.Mappers;

namespace MockServer.UseCases.Roles.Create;

public class CreateRoleHandler(IRepository<Role> repository)
  : IRequestHandler<CreateRoleCommand, Result<RoleDto>>
{
  public async Task<Result<RoleDto>> Handle(
    CreateRoleCommand request,
    CancellationToken cancellationToken)
  {
    var role = new Role
    {
      Name = request.Name,
      Description = request.Description,
      IsBuiltIn = false,
      Permissions = request.Permissions
    };

    var created = await repository.AddAsync(role, cancellationToken);
    return Result.Success(DtoMapper.ToDto(created));
  }
}
