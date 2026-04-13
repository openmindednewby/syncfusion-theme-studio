using MockServer.UseCases.DTOs;
using MockServer.UseCases.Mappers;

namespace MockServer.UseCases.Roles.Update;

public class UpdateRoleHandler(IRepository<Role> repository)
  : IRequestHandler<UpdateRoleCommand, Result<RoleDto>>
{
  public async Task<Result<RoleDto>> Handle(
    UpdateRoleCommand request,
    CancellationToken cancellationToken)
  {
    var role = await repository.GetByIdAsync(request.Id, cancellationToken);
    if (role is null) return Result.NotFound($"Role with id {request.Id} not found.");

    role.Name = request.Name;
    role.Description = request.Description;
    role.Permissions = request.Permissions;
    role.UpdatedAt = DateTime.UtcNow;

    await repository.UpdateAsync(role, cancellationToken);
    return Result.Success(DtoMapper.ToDto(role));
  }
}
