using MockServer.UseCases.DTOs;
using MockServer.UseCases.Roles.List;

namespace MockServer.Web.Roles;

public class List(IMediator mediator) : EndpointWithoutRequest<List<RoleDto>>
{
  public override void Configure()
  {
    Get("/roles");
    AllowAnonymous();
  }

  public override async Task HandleAsync(CancellationToken ct)
  {
    var result = await mediator.Send(new ListRolesQuery(), ct);
    if (result.IsSuccess) await SendOkAsync(result.Value, ct);
  }
}
