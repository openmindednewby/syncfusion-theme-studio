using MockServer.UseCases.DTOs;

namespace MockServer.UseCases.Users.GetById;

public record GetUserByIdQuery(int Id) : IRequest<Result<UserDto>>;
