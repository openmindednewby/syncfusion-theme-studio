using MockServer.UseCases.DTOs;
using MockServer.UseCases.Mappers;

namespace MockServer.UseCases.Users.Search;

public class SearchUsersHandler(IRepository<User> repository)
  : IRequestHandler<SearchUsersQuery, Result<List<UserDto>>>
{
  public async Task<Result<List<UserDto>>> Handle(
    SearchUsersQuery request,
    CancellationToken cancellationToken)
  {
    var all = await repository.ListAsync(cancellationToken);
    var filtered = all
      .Where(u => u.FirstName.Contains(request.Query, StringComparison.OrdinalIgnoreCase)
                  || u.LastName.Contains(request.Query, StringComparison.OrdinalIgnoreCase)
                  || u.Email.Contains(request.Query, StringComparison.OrdinalIgnoreCase)
                  || u.Username.Contains(request.Query, StringComparison.OrdinalIgnoreCase))
      .Select(DtoMapper.ToDto)
      .ToList();
    return Result.Success(filtered);
  }
}
