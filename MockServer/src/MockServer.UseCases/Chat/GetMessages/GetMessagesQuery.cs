using MockServer.UseCases.DTOs;

namespace MockServer.UseCases.Chat.GetMessages;

public record GetMessagesQuery(int ChannelId) : IRequest<Result<List<ChatMessageDto>>>;
