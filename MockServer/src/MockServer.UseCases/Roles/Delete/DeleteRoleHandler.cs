namespace MockServer.UseCases.Roles.Delete;

public class DeleteRoleHandler(IRepository<Role> repository)
  : IRequestHandler<DeleteRoleCommand, Result>
{
  public async Task<Result> Handle(
    DeleteRoleCommand request,
    CancellationToken cancellationToken)
  {
    var role = await repository.GetByIdAsync(request.Id, cancellationToken);
    if (role is null) return Result.NotFound($"Role with id {request.Id} not found.");
    if (role.IsBuiltIn) return Result.Error("Cannot delete a built-in role.");

    await repository.DeleteAsync(role, cancellationToken);
    return Result.Success();
  }
}
