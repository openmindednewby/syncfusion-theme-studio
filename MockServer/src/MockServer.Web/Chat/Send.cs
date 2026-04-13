using Microsoft.AspNetCore.SignalR;
using MockServer.UseCases.DTOs;
using MockServer.UseCases.Chat.SendMessage;
using MockServer.Web.Hubs;

namespace MockServer.Web.Chat;

public class Send(IMediator mediator, IHubContext<EventsHub> hubContext)
  : Endpoint<SendMessageRequest, ChatMessageDto>
{
  public override void Configure()
  {
    Post("/chat/channels/{ChannelId}/messages");
    AllowAnonymous();
  }

  public override async Task HandleAsync(SendMessageRequest req, CancellationToken ct)
  {
    var result = await mediator.Send(
      new SendMessageCommand(req.ChannelId, req.SenderName, req.SenderAvatar, req.Content), ct);

    if (result.IsSuccess)
    {
      // Broadcast via SignalR to the channel group
      await hubContext.Clients.Group($"chat-{req.ChannelId}")
        .SendAsync("ReceiveChatMessage", result.Value, ct);

      await SendOkAsync(result.Value, ct);
    }
  }
}

public record SendMessageRequest
{
  public int ChannelId { get; init; }
  public string SenderName { get; init; } = string.Empty;
  public string SenderAvatar { get; init; } = string.Empty;
  public string Content { get; init; } = string.Empty;
}
