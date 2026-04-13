namespace MockServer.UseCases.Users.Delete;

public class DeleteUserHandler(IRepository<User> repository)
  : IRequestHandler<DeleteUserCommand, Result>
{
  public async Task<Result> Handle(
    DeleteUserCommand request,
    CancellationToken cancellationToken)
  {
    var user = await repository.GetByIdAsync(request.Id, cancellationToken);
    if (user is null) return Result.NotFound($"User with id {request.Id} not found.");

    await repository.DeleteAsync(user, cancellationToken);
    return Result.Success();
  }
}
