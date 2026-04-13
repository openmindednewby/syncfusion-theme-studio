using MockServer.UseCases.DTOs;
using MockServer.UseCases.Products.List;

namespace MockServer.Web.Products;

public class List(IMediator mediator) : Endpoint<ListProductsRequest, PaginatedList<ProductDto>>
{
  public override void Configure()
  {
    Get("/products");
    AllowAnonymous();
  }

  public override async Task HandleAsync(ListProductsRequest req, CancellationToken ct)
  {
    var result = await mediator.Send(new ListProductsQuery(req.Skip, req.Limit), ct);
    if (result.IsSuccess) await SendOkAsync(result.Value, ct);
  }
}

public record ListProductsRequest
{
  [QueryParam] public int Skip { get; init; }
  [QueryParam] public int Limit { get; init; } = 30;
}
