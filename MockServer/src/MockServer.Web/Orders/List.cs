using MockServer.UseCases.DTOs;
using MockServer.UseCases.Orders.List;

namespace MockServer.Web.Orders;

public class List(IMediator mediator) : Endpoint<ListOrdersRequest, PaginatedList<OrderDto>>
{
  public override void Configure()
  {
    Get("/orders");
    AllowAnonymous();
  }

  public override async Task HandleAsync(ListOrdersRequest req, CancellationToken ct)
  {
    var result = await mediator.Send(new ListOrdersQuery(req.Skip, req.Limit), ct);
    if (result.IsSuccess) await SendOkAsync(result.Value, ct);
  }
}

public record ListOrdersRequest
{
  [QueryParam] public int Skip { get; init; }
  [QueryParam] public int Limit { get; init; } = 30;
}
