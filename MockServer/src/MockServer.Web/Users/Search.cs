using MockServer.UseCases.DTOs;
using MockServer.UseCases.Users.Search;

namespace MockServer.Web.Users;

public class Search(IMediator mediator) : Endpoint<SearchUsersRequest, List<UserDto>>
{
  public override void Configure()
  {
    Get("/users/search");
    AllowAnonymous();
  }

  public override async Task HandleAsync(SearchUsersRequest req, CancellationToken ct)
  {
    var result = await mediator.Send(new SearchUsersQuery(req.Q), ct);
    if (result.IsSuccess) await SendOkAsync(result.Value, ct);
  }
}

public record SearchUsersRequest
{
  [QueryParam] public string Q { get; init; } = string.Empty;
}
