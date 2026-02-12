using MockServer.UseCases.DTOs;
using MockServer.UseCases.Mappers;

namespace MockServer.UseCases.Orders.List;

public class ListOrdersHandler(IRepository<Order> repository)
  : IRequestHandler<ListOrdersQuery, Result<PaginatedList<OrderDto>>>
{
  public async Task<Result<PaginatedList<OrderDto>>> Handle(
    ListOrdersQuery request,
    CancellationToken cancellationToken)
  {
    var total = await repository.CountAsync(cancellationToken);
    var items = await repository.ListAsync(request.Skip, request.Limit, cancellationToken);
    var dtos = items.Select(DtoMapper.ToDto).ToList();
    return Result.Success(new PaginatedList<OrderDto>(dtos, total, request.Skip, request.Limit));
  }
}
