using MockServer.UseCases.DTOs;
using MockServer.UseCases.Users.Create;

namespace MockServer.Web.Users;

public class Create(IMediator mediator) : Endpoint<CreateUserRequest, UserDto>
{
  public override void Configure()
  {
    Post("/users");
    AllowAnonymous();
  }

  public override async Task HandleAsync(CreateUserRequest req, CancellationToken ct)
  {
    var result = await mediator.Send(new CreateUserCommand(
      req.FirstName, req.LastName, req.Email, req.Phone,
      req.Username, req.BirthDate, req.Image, req.Address), ct);

    if (result.IsSuccess) await SendCreatedAtAsync<GetById>(new { result.Value.Id }, result.Value, cancellation: ct);
  }
}

public record CreateUserRequest(
  string FirstName,
  string LastName,
  string Email,
  string Phone,
  string Username,
  DateTime BirthDate,
  string Image,
  AddressDto Address);
