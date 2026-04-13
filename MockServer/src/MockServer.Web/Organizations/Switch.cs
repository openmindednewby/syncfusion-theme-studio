using MockServer.UseCases.DTOs;
using MockServer.UseCases.Organizations.GetById;

namespace MockServer.Web.Organizations;

public class Switch(IMediator mediator) : Endpoint<SwitchRequest, OrganizationDto>
{
  public override void Configure()
  {
    Post("/organizations/{Id}/switch");
    AllowAnonymous();
  }

  public override async Task HandleAsync(SwitchRequest req, CancellationToken ct)
  {
    var result = await mediator.Send(new GetOrganizationByIdQuery(req.Id), ct);
    if (result.IsSuccess)
      await SendOkAsync(result.Value, ct);
    else
      await SendNotFoundAsync(ct);
  }
}

public record SwitchRequest
{
  public int Id { get; init; }
}
