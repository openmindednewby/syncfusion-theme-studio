using MockServer.UseCases.DTOs;
using MockServer.UseCases.Products.ListByCategory;

namespace MockServer.Web.Products;

public class ListByCategory(IMediator mediator)
  : Endpoint<ListByCategoryRequest, List<ProductDto>>
{
  public override void Configure()
  {
    Get("/products/category/{Category}");
    AllowAnonymous();
  }

  public override async Task HandleAsync(ListByCategoryRequest req, CancellationToken ct)
  {
    var result = await mediator.Send(new ListProductsByCategoryQuery(req.Category), ct);
    if (result.IsSuccess) await SendOkAsync(result.Value, ct);
  }
}

public record ListByCategoryRequest
{
  public string Category { get; init; } = string.Empty;
}
