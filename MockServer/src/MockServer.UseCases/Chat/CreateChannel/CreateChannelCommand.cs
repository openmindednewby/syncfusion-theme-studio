using MockServer.UseCases.DTOs;

namespace MockServer.UseCases.Chat.CreateChannel;

public record CreateChannelCommand(string Name, string Description) : IRequest<Result<ChatChannelDto>>;
