using MockServer.UseCases.DTOs;

namespace MockServer.UseCases.Users.Update;

public record UpdateUserCommand(
  int Id,
  string FirstName,
  string LastName,
  string Email,
  string Phone,
  string Username,
  DateTime BirthDate,
  string Image,
  AddressDto Address) : IRequest<Result<UserDto>>;
