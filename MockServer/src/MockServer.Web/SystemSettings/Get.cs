using MockServer.UseCases.DTOs;
using MockServer.UseCases.SystemSettings.Get;

namespace MockServer.Web.SystemSettings;

public class Get(IMediator mediator) : EndpointWithoutRequest<SystemSettingsDto>
{
  public override void Configure()
  {
    Verbs(Http.GET);
    Routes("/admin/settings");
    AllowAnonymous();
  }

  public override async Task HandleAsync(CancellationToken ct)
  {
    var result = await mediator.Send(new GetSystemSettingsQuery(), ct);
    if (result.IsSuccess) await SendOkAsync(result.Value, ct);
    else await SendNotFoundAsync(ct);
  }
}
