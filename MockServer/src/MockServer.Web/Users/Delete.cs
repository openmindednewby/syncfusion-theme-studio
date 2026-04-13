using MockServer.UseCases.Users.Delete;

namespace MockServer.Web.Users;

public class Delete(IMediator mediator) : Endpoint<DeleteUserRequest>
{
  public override void Configure()
  {
    Verbs(Http.DELETE);
    Routes("/users/{Id}");
    AllowAnonymous();
  }

  public override async Task HandleAsync(DeleteUserRequest req, CancellationToken ct)
  {
    var result = await mediator.Send(new DeleteUserCommand(req.Id), ct);
    if (result.IsSuccess) await SendNoContentAsync(ct);
    else await SendNotFoundAsync(ct);
  }
}

public record DeleteUserRequest
{
  public int Id { get; init; }
}
