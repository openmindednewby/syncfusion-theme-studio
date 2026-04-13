using MockServer.UseCases.DTOs;
using MockServer.UseCases.Chat.GetMessages;

namespace MockServer.Web.Chat;

public class GetMessages(IMediator mediator) : Endpoint<GetMessagesRequest, List<ChatMessageDto>>
{
  public override void Configure()
  {
    Get("/chat/channels/{ChannelId}/messages");
    AllowAnonymous();
  }

  public override async Task HandleAsync(GetMessagesRequest req, CancellationToken ct)
  {
    var result = await mediator.Send(new GetMessagesQuery(req.ChannelId), ct);
    if (result.IsSuccess) await SendOkAsync(result.Value, ct);
  }
}

public record GetMessagesRequest
{
  public int ChannelId { get; init; }
}
