using MockServer.UseCases.DTOs;
using MockServer.UseCases.Mappers;

namespace MockServer.UseCases.Chat.CreateChannel;

public class CreateChannelHandler(IRepository<ChatChannel> repository)
  : IRequestHandler<CreateChannelCommand, Result<ChatChannelDto>>
{
  public async Task<Result<ChatChannelDto>> Handle(
    CreateChannelCommand request,
    CancellationToken cancellationToken)
  {
    var channel = new ChatChannel
    {
      Name = request.Name,
      Description = request.Description,
      Icon = "#"
    };

    await repository.AddAsync(channel, cancellationToken);
    return Result.Success(DtoMapper.ToDto(channel));
  }
}
