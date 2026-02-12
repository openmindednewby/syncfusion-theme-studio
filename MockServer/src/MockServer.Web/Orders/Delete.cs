using MockServer.UseCases.Orders.Delete;

namespace MockServer.Web.Orders;

public class Delete(IMediator mediator) : Endpoint<DeleteOrderRequest>
{
  public override void Configure()
  {
    Verbs(Http.DELETE);
    Routes("/orders/{Id}");
    AllowAnonymous();
  }

  public override async Task HandleAsync(DeleteOrderRequest req, CancellationToken ct)
  {
    var result = await mediator.Send(new DeleteOrderCommand(req.Id), ct);
    if (result.IsSuccess) await SendNoContentAsync(ct);
    else await SendNotFoundAsync(ct);
  }
}

public record DeleteOrderRequest
{
  public int Id { get; init; }
}
