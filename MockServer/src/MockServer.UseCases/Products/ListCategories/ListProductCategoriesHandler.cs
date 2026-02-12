namespace MockServer.UseCases.Products.ListCategories;

public class ListProductCategoriesHandler(IRepository<Product> repository)
  : IRequestHandler<ListProductCategoriesQuery, Result<List<string>>>
{
  public async Task<Result<List<string>>> Handle(
    ListProductCategoriesQuery request,
    CancellationToken cancellationToken)
  {
    var all = await repository.ListAsync(cancellationToken);
    var categories = all.Select(p => p.Category).Distinct().OrderBy(c => c).ToList();
    return Result.Success(categories);
  }
}
