using Microsoft.AspNetCore.SignalR;
using MockServer.Core.Interfaces;
using MockServer.Core.Entities;
using MockServer.UseCases.Mappers;

namespace MockServer.Web.Hubs;

public class EventsHub : Hub
{
  private readonly ILogger<EventsHub> _logger;
  private readonly IRepository<ChatMessage> _messageRepository;

  public EventsHub(ILogger<EventsHub> logger, IRepository<ChatMessage> messageRepository)
  {
    _logger = logger;
    _messageRepository = messageRepository;
  }

  public override Task OnConnectedAsync()
  {
    _logger.LogInformation("Client connected: {ConnectionId}", Context.ConnectionId);
    return base.OnConnectedAsync();
  }

  public override Task OnDisconnectedAsync(Exception? exception)
  {
    _logger.LogInformation("Client disconnected: {ConnectionId}", Context.ConnectionId);
    return base.OnDisconnectedAsync(exception);
  }

  public async Task JoinChannel(int channelId)
  {
    var groupName = $"chat-{channelId}";
    await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
    _logger.LogInformation("Connection {ConnectionId} joined channel {ChannelId}",
      Context.ConnectionId, channelId);
  }

  public async Task LeaveChannel(int channelId)
  {
    var groupName = $"chat-{channelId}";
    await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
    _logger.LogInformation("Connection {ConnectionId} left channel {ChannelId}",
      Context.ConnectionId, channelId);
  }

  public async Task SendMessage(int channelId, string senderName, string senderAvatar, string content)
  {
    var message = new ChatMessage
    {
      ChannelId = channelId,
      SenderName = senderName,
      SenderAvatar = senderAvatar,
      Content = content,
      Timestamp = DateTime.UtcNow
    };

    await _messageRepository.AddAsync(message);
    var dto = DtoMapper.ToDto(message);

    await Clients.Group($"chat-{channelId}").SendAsync("ReceiveChatMessage", dto);
    _logger.LogDebug("Message sent to channel {ChannelId} by {SenderName}", channelId, senderName);
  }
}
