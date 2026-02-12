namespace MockServer.UseCases.DTOs;

public record AddressDto(
  string Street,
  string City,
  string State,
  string PostalCode,
  string Country);
