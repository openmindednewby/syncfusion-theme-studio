using MockServer.UseCases.DTOs;

namespace MockServer.UseCases.Orders.List;

public record ListOrdersQuery(int Skip = 0, int Limit = 30)
  : IRequest<Result<PaginatedList<OrderDto>>>;
