using MockServer.UseCases.DTOs;

namespace MockServer.UseCases.Chat.SendMessage;

public record SendMessageCommand(
  int ChannelId,
  string SenderName,
  string SenderAvatar,
  string Content) : IRequest<Result<ChatMessageDto>>;
