using MockServer.UseCases.DTOs;
using MockServer.UseCases.Roles.Create;

namespace MockServer.Web.Roles;

public class Create(IMediator mediator) : Endpoint<CreateRoleRequest, RoleDto>
{
  public override void Configure()
  {
    Post("/roles");
    AllowAnonymous();
  }

  public override async Task HandleAsync(CreateRoleRequest req, CancellationToken ct)
  {
    var result = await mediator.Send(
      new CreateRoleCommand(req.Name, req.Description, req.Permissions), ct);

    if (result.IsSuccess) await SendCreatedAtAsync<GetById>(new { result.Value.Id }, result.Value, cancellation: ct);
  }
}

public record CreateRoleRequest(
  string Name,
  string Description,
  List<string> Permissions);
