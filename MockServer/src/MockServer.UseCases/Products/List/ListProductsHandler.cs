using MockServer.UseCases.DTOs;
using MockServer.UseCases.Mappers;

namespace MockServer.UseCases.Products.List;

public class ListProductsHandler(IRepository<Product> repository)
  : IRequestHandler<ListProductsQuery, Result<PaginatedList<ProductDto>>>
{
  public async Task<Result<PaginatedList<ProductDto>>> Handle(
    ListProductsQuery request,
    CancellationToken cancellationToken)
  {
    var total = await repository.CountAsync(cancellationToken);
    var items = await repository.ListAsync(request.Skip, request.Limit, cancellationToken);
    var dtos = items.Select(DtoMapper.ToDto).ToList();
    return Result.Success(new PaginatedList<ProductDto>(dtos, total, request.Skip, request.Limit));
  }
}
