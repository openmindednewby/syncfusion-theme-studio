using MockServer.UseCases.DTOs;
using MockServer.UseCases.Notifications.List;

namespace MockServer.Web.Notifications;

public class List(IMediator mediator) : EndpointWithoutRequest<List<NotificationDto>>
{
  public override void Configure()
  {
    Get("/notifications");
    AllowAnonymous();
  }

  public override async Task HandleAsync(CancellationToken ct)
  {
    var result = await mediator.Send(new ListNotificationsQuery(), ct);
    if (result.IsSuccess) await SendOkAsync(result.Value, ct);
  }
}
