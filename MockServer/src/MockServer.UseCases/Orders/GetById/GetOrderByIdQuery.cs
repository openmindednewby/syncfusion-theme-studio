using MockServer.UseCases.DTOs;

namespace MockServer.UseCases.Orders.GetById;

public record GetOrderByIdQuery(int Id) : IRequest<Result<OrderDto>>;
