using MockServer.UseCases.DTOs;
using MockServer.UseCases.Orders.GetById;

namespace MockServer.Web.Orders;

public class GetById(IMediator mediator) : Endpoint<GetOrderByIdRequest, OrderDto>
{
  public override void Configure()
  {
    Get("/orders/{Id}");
    AllowAnonymous();
  }

  public override async Task HandleAsync(GetOrderByIdRequest req, CancellationToken ct)
  {
    var result = await mediator.Send(new GetOrderByIdQuery(req.Id), ct);
    if (result.IsSuccess) await SendOkAsync(result.Value, ct);
    else await SendNotFoundAsync(ct);
  }
}

public record GetOrderByIdRequest
{
  public int Id { get; init; }
}
