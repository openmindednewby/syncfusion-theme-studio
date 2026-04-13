using MockServer.UseCases.DTOs;
using MockServer.UseCases.Organizations.List;

namespace MockServer.Web.Organizations;

public class List(IMediator mediator) : EndpointWithoutRequest<List<OrganizationDto>>
{
  public override void Configure()
  {
    Get("/organizations");
    AllowAnonymous();
  }

  public override async Task HandleAsync(CancellationToken ct)
  {
    var result = await mediator.Send(new ListOrganizationsQuery(), ct);
    if (result.IsSuccess) await SendOkAsync(result.Value, ct);
  }
}
