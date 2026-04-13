using MockServer.UseCases.DTOs;
using MockServer.UseCases.Mappers;

namespace MockServer.UseCases.Chat.ListChannels;

public class ListChannelsHandler(IRepository<ChatChannel> repository)
  : IRequestHandler<ListChannelsQuery, Result<List<ChatChannelDto>>>
{
  public async Task<Result<List<ChatChannelDto>>> Handle(
    ListChannelsQuery request,
    CancellationToken cancellationToken)
  {
    var channels = await repository.ListAsync(cancellationToken);
    var dtos = channels.Select(DtoMapper.ToDto).ToList();
    return Result.Success(dtos);
  }
}
