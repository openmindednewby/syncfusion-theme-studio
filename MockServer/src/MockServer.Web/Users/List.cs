using MockServer.UseCases.DTOs;
using MockServer.UseCases.Users.List;

namespace MockServer.Web.Users;

public class List(IMediator mediator) : Endpoint<ListUsersRequest, PaginatedList<UserDto>>
{
  public override void Configure()
  {
    Get("/users");
    AllowAnonymous();
  }

  public override async Task HandleAsync(ListUsersRequest req, CancellationToken ct)
  {
    var result = await mediator.Send(new ListUsersQuery(req.Skip, req.Limit), ct);
    if (result.IsSuccess) await SendOkAsync(result.Value, ct);
  }
}

public record ListUsersRequest
{
  [QueryParam] public int Skip { get; init; }
  [QueryParam] public int Limit { get; init; } = 30;
}
