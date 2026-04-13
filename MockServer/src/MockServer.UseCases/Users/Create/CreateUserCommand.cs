using MockServer.UseCases.DTOs;

namespace MockServer.UseCases.Users.Create;

public record CreateUserCommand(
  string FirstName,
  string LastName,
  string Email,
  string Phone,
  string Username,
  DateTime BirthDate,
  string Image,
  AddressDto Address) : IRequest<Result<UserDto>>;
