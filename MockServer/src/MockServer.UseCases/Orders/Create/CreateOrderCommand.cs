using MockServer.UseCases.DTOs;

namespace MockServer.UseCases.Orders.Create;

public record CreateOrderCommand(
  int UserId,
  List<OrderItemDto> Items) : IRequest<Result<OrderDto>>;
