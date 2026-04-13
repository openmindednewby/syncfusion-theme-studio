using MockServer.UseCases.DTOs;
using MockServer.UseCases.Chat.CreateChannel;

namespace MockServer.Web.Chat;

public class Create(IMediator mediator) : Endpoint<CreateChannelRequest, ChatChannelDto>
{
  public override void Configure()
  {
    Post("/chat/channels");
    AllowAnonymous();
  }

  public override async Task HandleAsync(CreateChannelRequest req, CancellationToken ct)
  {
    var result = await mediator.Send(
      new CreateChannelCommand(req.Name, req.Description), ct);
    if (result.IsSuccess) await SendOkAsync(result.Value, ct);
  }
}

public record CreateChannelRequest(string Name, string Description);
