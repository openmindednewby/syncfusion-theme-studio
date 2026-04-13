namespace MockServer.UseCases.DTOs;

public record OrderItemDto(
  int ProductId,
  string ProductTitle,
  int Quantity,
  decimal UnitPrice);
