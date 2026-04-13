using MockServer.UseCases.DTOs;
using MockServer.UseCases.Mappers;

namespace MockServer.UseCases.Orders.Create;

public class CreateOrderHandler(IRepository<Order> repository)
  : IRequestHandler<CreateOrderCommand, Result<OrderDto>>
{
  public async Task<Result<OrderDto>> Handle(
    CreateOrderCommand request,
    CancellationToken cancellationToken)
  {
    var orderItems = request.Items.Select(i => new OrderItem
    {
      ProductId = i.ProductId,
      ProductTitle = i.ProductTitle,
      Quantity = i.Quantity,
      UnitPrice = i.UnitPrice
    }).ToList();

    var order = new Order
    {
      UserId = request.UserId,
      Status = OrderStatus.Pending,
      TotalAmount = orderItems.Sum(i => i.Quantity * i.UnitPrice),
      Items = orderItems
    };

    var created = await repository.AddAsync(order, cancellationToken);
    return Result.Success(DtoMapper.ToDto(created));
  }
}
