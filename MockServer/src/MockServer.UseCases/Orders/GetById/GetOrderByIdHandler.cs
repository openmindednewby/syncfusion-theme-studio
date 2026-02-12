using MockServer.UseCases.DTOs;
using MockServer.UseCases.Mappers;

namespace MockServer.UseCases.Orders.GetById;

public class GetOrderByIdHandler(IRepository<Order> repository)
  : IRequestHandler<GetOrderByIdQuery, Result<OrderDto>>
{
  public async Task<Result<OrderDto>> Handle(
    GetOrderByIdQuery request,
    CancellationToken cancellationToken)
  {
    var order = await repository.GetByIdAsync(request.Id, cancellationToken);
    if (order is null) return Result.NotFound($"Order with id {request.Id} not found.");
    return Result.Success(DtoMapper.ToDto(order));
  }
}
