using MockServer.UseCases.DTOs;
using MockServer.UseCases.Products.Search;

namespace MockServer.Web.Products;

public class Search(IMediator mediator) : Endpoint<SearchProductsRequest, List<ProductDto>>
{
  public override void Configure()
  {
    Get("/products/search");
    AllowAnonymous();
  }

  public override async Task HandleAsync(SearchProductsRequest req, CancellationToken ct)
  {
    var result = await mediator.Send(new SearchProductsQuery(req.Q), ct);
    if (result.IsSuccess) await SendOkAsync(result.Value, ct);
  }
}

public record SearchProductsRequest
{
  [QueryParam] public string Q { get; init; } = string.Empty;
}
