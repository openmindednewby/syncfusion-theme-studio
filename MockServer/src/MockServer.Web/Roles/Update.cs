using MockServer.UseCases.DTOs;
using MockServer.UseCases.Roles.Update;

namespace MockServer.Web.Roles;

public class Update(IMediator mediator) : Endpoint<UpdateRoleRequest, RoleDto>
{
  public override void Configure()
  {
    Put("/roles/{Id}");
    AllowAnonymous();
  }

  public override async Task HandleAsync(UpdateRoleRequest req, CancellationToken ct)
  {
    var result = await mediator.Send(
      new UpdateRoleCommand(req.Id, req.Name, req.Description, req.Permissions), ct);

    if (result.IsSuccess) await SendOkAsync(result.Value, ct);
    else await SendNotFoundAsync(ct);
  }
}

public record UpdateRoleRequest
{
  public int Id { get; init; }
  public string Name { get; init; } = string.Empty;
  public string Description { get; init; } = string.Empty;
  public List<string> Permissions { get; init; } = [];
}
