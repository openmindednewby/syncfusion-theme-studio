using MockServer.UseCases.Products.ListCategories;

namespace MockServer.Web.Products;

public class ListCategories(IMediator mediator) : EndpointWithoutRequest<List<string>>
{
  public override void Configure()
  {
    Get("/products/categories");
    AllowAnonymous();
  }

  public override async Task HandleAsync(CancellationToken ct)
  {
    var result = await mediator.Send(new ListProductCategoriesQuery(), ct);
    if (result.IsSuccess) await SendOkAsync(result.Value, ct);
  }
}
