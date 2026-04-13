using MockServer.UseCases.DTOs;

namespace MockServer.UseCases.Products.List;

public record ListProductsQuery(int Skip = 0, int Limit = 30)
  : IRequest<Result<PaginatedList<ProductDto>>>;
