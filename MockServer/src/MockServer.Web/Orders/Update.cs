using MockServer.UseCases.DTOs;
using MockServer.UseCases.Orders.Update;

namespace MockServer.Web.Orders;

public class Update(IMediator mediator) : Endpoint<UpdateOrderRequest, OrderDto>
{
  public override void Configure()
  {
    Put("/orders/{Id}");
    AllowAnonymous();
  }

  public override async Task HandleAsync(UpdateOrderRequest req, CancellationToken ct)
  {
    var result = await mediator.Send(new UpdateOrderCommand(req.Id, req.Status), ct);
    if (result.IsSuccess) await SendOkAsync(result.Value, ct);
    else await SendNotFoundAsync(ct);
  }
}

public record UpdateOrderRequest
{
  public int Id { get; init; }
  public string Status { get; init; } = string.Empty;
}
