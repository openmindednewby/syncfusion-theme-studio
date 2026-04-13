using MockServer.UseCases.DTOs;
using MockServer.UseCases.Mappers;

namespace MockServer.UseCases.Chat.SendMessage;

public class SendMessageHandler(IRepository<ChatMessage> repository)
  : IRequestHandler<SendMessageCommand, Result<ChatMessageDto>>
{
  public async Task<Result<ChatMessageDto>> Handle(
    SendMessageCommand request,
    CancellationToken cancellationToken)
  {
    var message = new ChatMessage
    {
      ChannelId = request.ChannelId,
      SenderName = request.SenderName,
      SenderAvatar = request.SenderAvatar,
      Content = request.Content,
      Timestamp = DateTime.UtcNow
    };

    await repository.AddAsync(message, cancellationToken);
    return Result.Success(DtoMapper.ToDto(message));
  }
}
