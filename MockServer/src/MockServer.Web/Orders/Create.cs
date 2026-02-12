using MockServer.UseCases.DTOs;
using MockServer.UseCases.Orders.Create;

namespace MockServer.Web.Orders;

public class Create(IMediator mediator) : Endpoint<CreateOrderRequest, OrderDto>
{
  public override void Configure()
  {
    Post("/orders");
    AllowAnonymous();
  }

  public override async Task HandleAsync(CreateOrderRequest req, CancellationToken ct)
  {
    var result = await mediator.Send(new CreateOrderCommand(req.UserId, req.Items), ct);
    if (result.IsSuccess) await SendCreatedAtAsync<GetById>(new { result.Value.Id }, result.Value, cancellation: ct);
  }
}

public record CreateOrderRequest(int UserId, List<OrderItemDto> Items);
