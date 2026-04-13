using Microsoft.AspNetCore.SignalR;

namespace MockServer.Web.Hubs;

public class EventBroadcasterService(
  IHubContext<EventsHub> hubContext,
  ILogger<EventBroadcasterService> logger) : BackgroundService
{
  private static readonly string[] EventTypes =
    ["NewOrder", "StockUpdate", "UserActivity", "SystemLog", "Notification"];

  private static readonly string[] ProductNames =
    ["iPhone 15 Pro", "MacBook Pro", "Sony WH-1000XM5", "Dyson V15", "KitchenAid Mixer"];

  private static readonly string[] UserNames =
    ["James Wilson", "Sarah Chen", "Michael Brown", "Emma Davis", "Daniel Martinez"];

  private static readonly string[] LogLevels = ["INFO", "WARN", "DEBUG"];

  private static readonly string[] NotificationMessages =
  [
    "New user registration completed",
    "Payment processed successfully",
    "Low stock alert triggered",
    "System backup completed",
    "API rate limit warning"
  ];

  protected override async Task ExecuteAsync(CancellationToken stoppingToken)
  {
    logger.LogInformation("EventBroadcasterService started");

    while (!stoppingToken.IsCancellationRequested)
    {
      var delayMs = Random.Shared.Next(2000, 8001);
      await Task.Delay(delayMs, stoppingToken);

      var eventType = EventTypes[Random.Shared.Next(EventTypes.Length)];
      var payload = CreateEventPayload(eventType);

      await hubContext.Clients.All.SendAsync("ReceiveEvent", payload, stoppingToken);
      logger.LogDebug("Broadcasted event: {EventType}", eventType);
    }
  }

  private static object CreateEventPayload(string eventType)
  {
    return eventType switch
    {
      "NewOrder" => new
      {
        Type = eventType,
        Timestamp = DateTime.UtcNow,
        Data = new
        {
          OrderId = Random.Shared.Next(1000, 9999),
          Customer = UserNames[Random.Shared.Next(UserNames.Length)],
          Total = Math.Round((decimal)(Random.Shared.NextDouble() * 500 + 10), 2)
        }
      },
      "StockUpdate" => new
      {
        Type = eventType,
        Timestamp = DateTime.UtcNow,
        Data = (object)new
        {
          Product = ProductNames[Random.Shared.Next(ProductNames.Length)],
          PreviousStock = Random.Shared.Next(10, 100),
          NewStock = Random.Shared.Next(0, 50)
        }
      },
      "UserActivity" => new
      {
        Type = eventType,
        Timestamp = DateTime.UtcNow,
        Data = (object)new
        {
          User = UserNames[Random.Shared.Next(UserNames.Length)],
          Action = Random.Shared.Next(3) switch
          {
            0 => "login",
            1 => "page_view",
            _ => "purchase"
          },
          Page = Random.Shared.Next(4) switch
          {
            0 => "/dashboard",
            1 => "/products",
            2 => "/orders",
            _ => "/settings"
          }
        }
      },
      "SystemLog" => new
      {
        Type = eventType,
        Timestamp = DateTime.UtcNow,
        Data = (object)new
        {
          Level = LogLevels[Random.Shared.Next(LogLevels.Length)],
          Service = Random.Shared.Next(3) switch
          {
            0 => "api-gateway",
            1 => "order-service",
            _ => "notification-service"
          },
          Message = $"Request processed in {Random.Shared.Next(5, 500)}ms"
        }
      },
      _ => new
      {
        Type = eventType,
        Timestamp = DateTime.UtcNow,
        Data = (object)new
        {
          Message = NotificationMessages[Random.Shared.Next(NotificationMessages.Length)],
          Severity = Random.Shared.Next(3) switch
          {
            0 => "info",
            1 => "warning",
            _ => "success"
          }
        }
      }
    };
  }
}
