using MockServer.UseCases.DTOs;

namespace MockServer.UseCases.Orders.Update;

public record UpdateOrderCommand(int Id, string Status) : IRequest<Result<OrderDto>>;
