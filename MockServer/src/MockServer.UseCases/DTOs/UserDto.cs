namespace MockServer.UseCases.DTOs;

public record UserDto(
  int Id,
  string FirstName,
  string LastName,
  string Email,
  string Phone,
  string Username,
  DateTime BirthDate,
  string Image,
  AddressDto Address);
