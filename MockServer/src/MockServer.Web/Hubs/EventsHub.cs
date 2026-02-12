using Microsoft.AspNetCore.SignalR;

namespace MockServer.Web.Hubs;

public class EventsHub : Hub
{
  private readonly ILogger<EventsHub> _logger;

  public EventsHub(ILogger<EventsHub> logger)
  {
    _logger = logger;
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
}
