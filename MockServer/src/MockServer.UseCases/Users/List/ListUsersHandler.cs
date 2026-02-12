using MockServer.UseCases.DTOs;
using MockServer.UseCases.Mappers;

namespace MockServer.UseCases.Users.List;

public class ListUsersHandler(IRepository<User> repository)
  : IRequestHandler<ListUsersQuery, Result<PaginatedList<UserDto>>>
{
  public async Task<Result<PaginatedList<UserDto>>> Handle(
    ListUsersQuery request,
    CancellationToken cancellationToken)
  {
    var total = await repository.CountAsync(cancellationToken);
    var items = await repository.ListAsync(request.Skip, request.Limit, cancellationToken);
    var dtos = items.Select(DtoMapper.ToDto).ToList();
    return Result.Success(new PaginatedList<UserDto>(dtos, total, request.Skip, request.Limit));
  }
}
