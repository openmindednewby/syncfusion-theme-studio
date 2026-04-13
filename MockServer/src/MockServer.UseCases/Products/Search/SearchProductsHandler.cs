using MockServer.UseCases.DTOs;
using MockServer.UseCases.Mappers;

namespace MockServer.UseCases.Products.Search;

public class SearchProductsHandler(IRepository<Product> repository)
  : IRequestHandler<SearchProductsQuery, Result<List<ProductDto>>>
{
  public async Task<Result<List<ProductDto>>> Handle(
    SearchProductsQuery request,
    CancellationToken cancellationToken)
  {
    var all = await repository.ListAsync(cancellationToken);
    var query = request.Query.ToLowerInvariant();
    var filtered = all
      .Where(p => p.Title.Contains(query, StringComparison.OrdinalIgnoreCase)
                  || p.Description.Contains(query, StringComparison.OrdinalIgnoreCase)
                  || p.Brand.Contains(query, StringComparison.OrdinalIgnoreCase)
                  || p.Category.Contains(query, StringComparison.OrdinalIgnoreCase))
      .Select(DtoMapper.ToDto)
      .ToList();
    return Result.Success(filtered);
  }
}
