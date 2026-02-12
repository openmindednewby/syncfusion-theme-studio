namespace MockServer.UseCases.DTOs;

public record OrderDto(
  int Id,
  int UserId,
  string Status,
  decimal TotalAmount,
  List<OrderItemDto> Items,
  DateTime CreatedAt);
