using MockServer.UseCases.Products.Delete;

namespace MockServer.Web.Products;

public class Delete(IMediator mediator) : Endpoint<DeleteProductRequest>
{
  public override void Configure()
  {
    Verbs(Http.DELETE);
    Routes("/products/{Id}");
    AllowAnonymous();
  }

  public override async Task HandleAsync(DeleteProductRequest req, CancellationToken ct)
  {
    var result = await mediator.Send(new DeleteProductCommand(req.Id), ct);
    if (result.IsSuccess) await SendNoContentAsync(ct);
    else await SendNotFoundAsync(ct);
  }
}

public record DeleteProductRequest
{
  public int Id { get; init; }
}
