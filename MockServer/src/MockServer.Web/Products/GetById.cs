using MockServer.UseCases.DTOs;
using MockServer.UseCases.Products.GetById;

namespace MockServer.Web.Products;

public class GetById(IMediator mediator) : Endpoint<GetProductByIdRequest, ProductDto>
{
  public override void Configure()
  {
    Get("/products/{Id}");
    AllowAnonymous();
  }

  public override async Task HandleAsync(GetProductByIdRequest req, CancellationToken ct)
  {
    var result = await mediator.Send(new GetProductByIdQuery(req.Id), ct);
    if (result.IsSuccess) await SendOkAsync(result.Value, ct);
    else await SendNotFoundAsync(ct);
  }
}

public record GetProductByIdRequest
{
  public int Id { get; init; }
}
