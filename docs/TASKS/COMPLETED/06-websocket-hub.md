# Task 06: Add WebSocket Hub for Real-Time Events

> **Parent**: [mock-server-master-plan.md](./mock-server-master-plan.md)
> **Status**: TODO
> **Agent**: `backend-dev`
> **Depends on**: Task 05
> **Blocks**: None

---

## Objective

Add a SignalR hub that broadcasts simulated real-time events (orders, stock updates, user activity, system logs, notifications) at random intervals. This provides a realistic WebSocket data source for building real-time UI features.

## Implementation

### EventsHub

```csharp
// Hubs/EventsHub.cs
public class EventsHub : Hub
{
    public override async Task OnConnectedAsync()
    {
        await Clients.Caller.SendAsync("Connected",
            new { Message = "Connected to MockServer events hub", Timestamp = DateTime.UtcNow });
        await base.OnConnectedAsync();
    }
}
```

### EventBroadcasterService (Background Service)

```csharp
// Services/EventBroadcasterService.cs
public class EventBroadcasterService : BackgroundService
{
    // Injects IHubContext<EventsHub>
    // Runs in a loop with random delays (2-8 seconds)
    // Picks a random event type and broadcasts mock data
}
```

### Event Types

```csharp
// Events/MockEvent.cs
public record MockEvent(string Type, string Title, object Payload, DateTime Timestamp);
```

**Event generators:**

1. **NewOrder** — random user places an order with 1-3 items
   ```json
   { "type": "NewOrder", "title": "New order #1042", "payload": { "orderId": 1042, "userName": "John Doe", "total": 149.99, "itemCount": 2 } }
   ```

2. **StockUpdate** — random product stock change
   ```json
   { "type": "StockUpdate", "title": "Stock updated: Wireless Mouse", "payload": { "productId": 5, "productTitle": "Wireless Mouse", "previousStock": 150, "newStock": 147 } }
   ```

3. **UserActivity** — login/logout/signup events
   ```json
   { "type": "UserActivity", "title": "User logged in", "payload": { "userId": 3, "userName": "jane.smith", "action": "login", "ip": "192.168.1.42" } }
   ```

4. **SystemLog** — server log entries (info, warning, error)
   ```json
   { "type": "SystemLog", "title": "High memory usage", "payload": { "level": "warning", "message": "Memory usage at 85%", "source": "HealthMonitor" } }
   ```

5. **Notification** — push notification simulation
   ```json
   { "type": "Notification", "title": "Payment processed", "payload": { "notificationId": 99, "severity": "success", "message": "Payment of $249.99 processed for order #1041" } }
   ```

### Registration in Program.cs

```csharp
// Add to existing Program.cs
builder.Services.AddSignalR();
builder.Services.AddHostedService<EventBroadcasterService>();

// After app.UseFastEndpoints():
app.MapHub<EventsHub>("/hubs/events");
```

### CORS for SignalR
SignalR with `AllowAnyOrigin()` doesn't work when credentials are needed. Use:
```csharp
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.SetIsOriginAllowed(_ => true)  // Allow any origin
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();  // Required for SignalR
    });
});
```

## File Structure

```
MockServer.Web/
├── Hubs/
│   └── EventsHub.cs
├── Services/
│   ├── EventBroadcasterService.cs
│   └── EventGenerators/
│       ├── OrderEventGenerator.cs
│       ├── StockEventGenerator.cs
│       ├── UserActivityEventGenerator.cs
│       ├── SystemLogEventGenerator.cs
│       └── NotificationEventGenerator.cs
└── Events/
    └── MockEvent.cs
```

## Verification

```bash
# Start the server
cd SyncfusionThemeStudio/MockServer
dotnet run --project src/MockServer.Web

# Test with a quick SignalR client or wscat
# Events should appear in console every 2-8 seconds
```

## Success Criteria

- [ ] SignalR hub accessible at `/hubs/events`
- [ ] Events broadcast every 2-8 seconds (random interval)
- [ ] 5 event types with realistic mock data
- [ ] Multiple simultaneous clients receive events
- [ ] Connection/disconnection messages logged
- [ ] CORS configured for SignalR with credentials
