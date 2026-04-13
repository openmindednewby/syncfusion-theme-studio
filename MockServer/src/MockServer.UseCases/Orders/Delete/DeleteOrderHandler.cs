namespace MockServer.UseCases.Orders.Delete;

public class DeleteOrderHandler(IRepository<Order> repository)
  : IRequestHandler<DeleteOrderCommand, Result>
{
  public async Task<Result> Handle(
    DeleteOrderCommand request,
    CancellationToken cancellationToken)
  {
    var order = await repository.GetByIdAsync(request.Id, cancellationToken);
    if (order is null) return Result.NotFound($"Order with id {request.Id} not found.");

    await repository.DeleteAsync(order, cancellationToken);
    return Result.Success();
  }
}
