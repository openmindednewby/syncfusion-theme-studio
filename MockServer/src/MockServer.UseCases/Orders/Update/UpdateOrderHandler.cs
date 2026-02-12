using MockServer.UseCases.DTOs;
using MockServer.UseCases.Mappers;

namespace MockServer.UseCases.Orders.Update;

public class UpdateOrderHandler(IRepository<Order> repository)
  : IRequestHandler<UpdateOrderCommand, Result<OrderDto>>
{
  public async Task<Result<OrderDto>> Handle(
    UpdateOrderCommand request,
    CancellationToken cancellationToken)
  {
    var order = await repository.GetByIdAsync(request.Id, cancellationToken);
    if (order is null) return Result.NotFound($"Order with id {request.Id} not found.");

    if (!Enum.TryParse<OrderStatus>(request.Status, ignoreCase: true, out var status))
      return Result.Invalid(new ValidationError($"Invalid order status: {request.Status}"));

    order.Status = status;
    order.UpdatedAt = DateTime.UtcNow;

    await repository.UpdateAsync(order, cancellationToken);
    return Result.Success(DtoMapper.ToDto(order));
  }
}
