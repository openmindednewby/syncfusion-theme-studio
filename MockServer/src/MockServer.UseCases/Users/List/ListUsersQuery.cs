using MockServer.UseCases.DTOs;

namespace MockServer.UseCases.Users.List;

public record ListUsersQuery(int Skip = 0, int Limit = 30)
  : IRequest<Result<PaginatedList<UserDto>>>;
