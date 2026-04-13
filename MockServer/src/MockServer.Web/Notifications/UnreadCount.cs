using MockServer.UseCases.Notifications.UnreadCount;

namespace MockServer.Web.Notifications;

public class UnreadCount(IMediator mediator) : EndpointWithoutRequest<UnreadCountResponse>
{
  public override void Configure()
  {
    Get("/notifications/unread-count");
    AllowAnonymous();
  }

  public override async Task HandleAsync(CancellationToken ct)
  {
    var result = await mediator.Send(new UnreadNotificationCountQuery(), ct);
    if (result.IsSuccess) await SendOkAsync(new UnreadCountResponse(result.Value), ct);
  }
}

public record UnreadCountResponse(int Count);
