using MockServer.UseCases.DTOs;
using MockServer.UseCases.Organizations.GetById;

namespace MockServer.Web.Organizations;

public class GetById(IMediator mediator) : Endpoint<GetByIdRequest, OrganizationDto>
{
  public override void Configure()
  {
    Get("/organizations/{Id}");
    AllowAnonymous();
  }

  public override async Task HandleAsync(GetByIdRequest req, CancellationToken ct)
  {
    var result = await mediator.Send(new GetOrganizationByIdQuery(req.Id), ct);
    if (result.IsSuccess)
      await SendOkAsync(result.Value, ct);
    else
      await SendNotFoundAsync(ct);
  }
}

public record GetByIdRequest
{
  public int Id { get; init; }
}
