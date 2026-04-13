using MockServer.UseCases.DTOs;

namespace MockServer.UseCases.Users.Search;

public record SearchUsersQuery(string Query) : IRequest<Result<List<UserDto>>>;
