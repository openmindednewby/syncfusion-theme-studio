using MockServer.UseCases.DTOs;
using MockServer.UseCases.Mappers;

namespace MockServer.UseCases.Users.GetById;

public class GetUserByIdHandler(IRepository<User> repository)
  : IRequestHandler<GetUserByIdQuery, Result<UserDto>>
{
  public async Task<Result<UserDto>> Handle(
    GetUserByIdQuery request,
    CancellationToken cancellationToken)
  {
    var user = await repository.GetByIdAsync(request.Id, cancellationToken);
    if (user is null) return Result.NotFound($"User with id {request.Id} not found.");
    return Result.Success(DtoMapper.ToDto(user));
  }
}
