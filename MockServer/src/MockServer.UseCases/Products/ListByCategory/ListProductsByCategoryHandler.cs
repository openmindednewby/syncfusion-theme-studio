using MockServer.UseCases.DTOs;
using MockServer.UseCases.Mappers;

namespace MockServer.UseCases.Products.ListByCategory;

public class ListProductsByCategoryHandler(IRepository<Product> repository)
  : IRequestHandler<ListProductsByCategoryQuery, Result<List<ProductDto>>>
{
  public async Task<Result<List<ProductDto>>> Handle(
    ListProductsByCategoryQuery request,
    CancellationToken cancellationToken)
  {
    var all = await repository.ListAsync(cancellationToken);
    var filtered = all
      .Where(p => p.Category.Equals(request.Category, StringComparison.OrdinalIgnoreCase))
      .Select(DtoMapper.ToDto)
      .ToList();
    return Result.Success(filtered);
  }
}
