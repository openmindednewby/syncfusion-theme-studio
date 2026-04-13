using MockServer.UseCases.DTOs;

namespace MockServer.UseCases.Chat.ListChannels;

public record ListChannelsQuery : IRequest<Result<List<ChatChannelDto>>>;
