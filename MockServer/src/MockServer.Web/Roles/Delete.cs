using MockServer.UseCases.Roles.Delete;

namespace MockServer.Web.Roles;

public class Delete(IMediator mediator) : Endpoint<DeleteRoleRequest>
{
  public override void Configure()
  {
    Verbs(Http.DELETE);
    Routes("/roles/{Id}");
    AllowAnonymous();
  }

  public override async Task HandleAsync(DeleteRoleRequest req, CancellationToken ct)
  {
    var result = await mediator.Send(new DeleteRoleCommand(req.Id), ct);
    if (result.IsSuccess) await SendNoContentAsync(ct);
    else if (result.Status == ResultStatus.NotFound) await SendNotFoundAsync(ct);
    else
    {
      foreach (var error in result.Errors) AddError(error);
      await SendErrorsAsync(cancellation: ct);
    }
  }
}

public record DeleteRoleRequest
{
  public int Id { get; init; }
}
