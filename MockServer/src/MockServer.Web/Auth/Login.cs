using MockServer.Core.Entities;
using MockServer.Core.Interfaces;

namespace MockServer.Web.Auth;

public class Login : Endpoint<LoginRequest, LoginResponse>
{
  private readonly IRepository<User> _userRepo;

  public Login(IRepository<User> userRepo)
  {
    _userRepo = userRepo;
  }

  public override void Configure()
  {
    Post("/auth/login");
    AllowAnonymous();
  }

  public override async Task HandleAsync(LoginRequest req, CancellationToken ct)
  {
    if (string.IsNullOrWhiteSpace(req.Username) || string.IsNullOrWhiteSpace(req.Password))
    {
      AddError("Invalid username or password");
      await SendErrorsAsync(cancellation: ct);
      return;
    }

    var users = await _userRepo.ListAsync(ct);
    var user = users.FirstOrDefault(u =>
      u.Email.Equals(req.Username, StringComparison.OrdinalIgnoreCase));

    if (user is null || user.PasswordHash != req.Password)
    {
      AddError("Invalid username or password");
      await SendErrorsAsync(cancellation: ct);
      return;
    }

    var response = new LoginResponse(
      Token: $"mock-jwt-{Guid.NewGuid()}",
      Username: user.Username,
      FirstName: user.FirstName,
      LastName: user.LastName,
      Email: user.Email,
      Role: user.Role);

    await SendOkAsync(response, ct);
  }
}

public record LoginRequest(
  string PublicIp,
  string Username,
  string Password,
  string RecaptchaToken);

public record LoginResponse(
  string Token,
  string Username,
  string FirstName,
  string LastName,
  string Email,
  string Role);
