using MockServer.UseCases.DTOs;
using MockServer.UseCases.Users.Update;

namespace MockServer.Web.Users;

public class Update(IMediator mediator) : Endpoint<UpdateUserRequest, UserDto>
{
  public override void Configure()
  {
    Put("/users/{Id}");
    AllowAnonymous();
  }

  public override async Task HandleAsync(UpdateUserRequest req, CancellationToken ct)
  {
    var result = await mediator.Send(new UpdateUserCommand(
      req.Id, req.FirstName, req.LastName, req.Email, req.Phone,
      req.Username, req.BirthDate, req.Image, req.Address), ct);

    if (result.IsSuccess) await SendOkAsync(result.Value, ct);
    else await SendNotFoundAsync(ct);
  }
}

public record UpdateUserRequest
{
  public int Id { get; init; }
  public string FirstName { get; init; } = string.Empty;
  public string LastName { get; init; } = string.Empty;
  public string Email { get; init; } = string.Empty;
  public string Phone { get; init; } = string.Empty;
  public string Username { get; init; } = string.Empty;
  public DateTime BirthDate { get; init; }
  public string Image { get; init; } = string.Empty;
  public AddressDto Address { get; init; } = new(string.Empty, string.Empty, string.Empty, string.Empty, string.Empty);
}
