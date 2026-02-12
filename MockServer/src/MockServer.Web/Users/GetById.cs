using MockServer.UseCases.DTOs;
using MockServer.UseCases.Users.GetById;

namespace MockServer.Web.Users;

public class GetById(IMediator mediator) : Endpoint<GetUserByIdRequest, UserDto>
{
  public override void Configure()
  {
    Get("/users/{Id}");
    AllowAnonymous();
  }

  public override async Task HandleAsync(GetUserByIdRequest req, CancellationToken ct)
  {
    var result = await mediator.Send(new GetUserByIdQuery(req.Id), ct);
    if (result.IsSuccess) await SendOkAsync(result.Value, ct);
    else await SendNotFoundAsync(ct);
  }
}

public record GetUserByIdRequest
{
  public int Id { get; init; }
}
