using MockServer.UseCases.DTOs;
using MockServer.UseCases.Mappers;

namespace MockServer.UseCases.Chat.GetMessages;

public class GetMessagesHandler(IRepository<ChatMessage> repository)
  : IRequestHandler<GetMessagesQuery, Result<List<ChatMessageDto>>>
{
  public async Task<Result<List<ChatMessageDto>>> Handle(
    GetMessagesQuery request,
    CancellationToken cancellationToken)
  {
    var all = await repository.ListAsync(cancellationToken);
    var messages = all
      .Where(m => m.ChannelId == request.ChannelId)
      .OrderBy(m => m.Timestamp)
      .TakeLast(50)
      .Select(DtoMapper.ToDto)
      .ToList();
    return Result.Success(messages);
  }
}
