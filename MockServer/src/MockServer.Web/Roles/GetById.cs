using MockServer.UseCases.DTOs;
using MockServer.UseCases.Roles.GetById;

namespace MockServer.Web.Roles;

public class GetById(IMediator mediator) : Endpoint<GetRoleByIdRequest, RoleDto>
{
  public override void Configure()
  {
    Get("/roles/{Id}");
    AllowAnonymous();
  }

  public override async Task HandleAsync(GetRoleByIdRequest req, CancellationToken ct)
  {
    var result = await mediator.Send(new GetRoleByIdQuery(req.Id), ct);
    if (result.IsSuccess) await SendOkAsync(result.Value, ct);
    else await SendNotFoundAsync(ct);
  }
}

public record GetRoleByIdRequest
{
  public int Id { get; init; }
}
