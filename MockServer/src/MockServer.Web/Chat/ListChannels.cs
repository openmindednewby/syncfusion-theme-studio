using MockServer.UseCases.DTOs;
using MockServer.UseCases.Chat.ListChannels;

namespace MockServer.Web.Chat;

public class ListChannels(IMediator mediator) : EndpointWithoutRequest<List<ChatChannelDto>>
{
  public override void Configure()
  {
    Get("/chat/channels");
    AllowAnonymous();
  }

  public override async Task HandleAsync(CancellationToken ct)
  {
    var result = await mediator.Send(new ListChannelsQuery(), ct);
    if (result.IsSuccess) await SendOkAsync(result.Value, ct);
  }
}
