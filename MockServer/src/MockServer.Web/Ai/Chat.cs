namespace MockServer.Web.Ai;

public class Chat : Endpoint<AiChatRequest>
{
  private static readonly Dictionary<string, string> CannedResponses = new(StringComparer.OrdinalIgnoreCase)
  {
    ["revenue"] = "Based on the latest data, **total revenue** this quarter is **$2.4M**, up **12%** from last quarter.\n\n- **Monthly Recurring Revenue**: $820K\n- **Average Deal Size**: $15,200\n- **Top Region**: North America (42%)\n- **Growth Rate**: 12% QoQ\n\nWould you like me to break this down by product line or region?",
    ["sales"] = "Here is the **sales summary** for this period:\n\n1. **New Deals Closed**: 47\n2. **Pipeline Value**: $3.1M\n3. **Win Rate**: 34%\n4. **Average Sales Cycle**: 28 days\n\nThe sales team exceeded targets by **8%** this month. Top performers are in the Enterprise segment.",
    ["users"] = "Current **user statistics**:\n\n| Metric | Value |\n|--------|-------|\n| Total Users | 12,847 |\n| Active (30d) | 9,231 |\n| New This Month | 1,204 |\n| Churn Rate | 2.1% |\n\n**Key Insights:**\n- User engagement is up **15%** week-over-week\n- Mobile users grew **22%** this quarter\n- Average session duration: **8.5 minutes**",
    ["help"] = "I can help you navigate the application! Here is a quick guide:\n\n- **Dashboard** - Overview of key metrics and charts\n- **Products** - Manage your product catalog\n- **Orders** - Track and manage customer orders\n- **Customers** - Customer relationship management\n- **Calendar** - Schedule and manage events\n- **Kanban** - Project task management board\n- **Chat** - Team messaging\n- **Settings** - Configure your preferences\n\nYou can also ask me about **revenue**, **users**, **sales data**, or any feature in the app.",
    ["settings"] = "Here are the **settings** you can configure:\n\n1. **Theme** - Switch between light/dark mode, customize colors\n2. **Language** - Choose from English, Spanish, German, Hebrew\n3. **Notifications** - Configure alert preferences\n4. **Profile** - Update your personal information\n5. **Layout** - Adjust sidebar, content width, and spacing\n\nUse the **gear icon** in the header to access the Theme Settings panel.",
    ["hello"] = "Hello! I am your AI assistant. I can help you with:\n\n- **Data queries** - Ask about revenue, users, or sales\n- **Navigation** - Find features and pages\n- **Settings** - Configure the application\n- **General help** - Tips and best practices\n\nWhat would you like to know?",
    ["hi"] = "Hello! I am your AI assistant. I can help you with:\n\n- **Data queries** - Ask about revenue, users, or sales\n- **Navigation** - Find features and pages\n- **Settings** - Configure the application\n- **General help** - Tips and best practices\n\nWhat would you like to know?"
  };

  private const string FallbackResponse =
    "I can help you with various tasks! Try asking about:\n\n- **Revenue** or **sales** data\n- **User** statistics\n- **App navigation** and features\n- **Settings** and configuration\n\nJust type your question and I will do my best to assist you.";

  private const int MinTokenDelayMs = 50;
  private const int MaxTokenDelayMs = 100;

  public override void Configure()
  {
    Post("/ai/chat");
    AllowAnonymous();
  }

  public override async Task HandleAsync(AiChatRequest req, CancellationToken ct)
  {
    HttpContext.Response.ContentType = "text/event-stream";
    HttpContext.Response.Headers.CacheControl = "no-cache";
    HttpContext.Response.Headers.Connection = "keep-alive";

    var lastMessage = req.Messages.LastOrDefault()?.Content ?? string.Empty;
    var response = FindCannedResponse(lastMessage);
    var tokens = TokenizeResponse(response);
    var random = new Random();

    foreach (var token in tokens)
    {
      if (ct.IsCancellationRequested) break;

      var data = System.Text.Json.JsonSerializer.Serialize(new { token });
      await HttpContext.Response.WriteAsync($"data: {data}\n\n", ct);
      await HttpContext.Response.Body.FlushAsync(ct);

      var delay = random.Next(MinTokenDelayMs, MaxTokenDelayMs);
      await Task.Delay(delay, ct);
    }

    await HttpContext.Response.WriteAsync("data: [DONE]\n\n", ct);
    await HttpContext.Response.Body.FlushAsync(ct);
  }

  private static string FindCannedResponse(string message)
  {
    var lower = message.ToLowerInvariant();

    foreach (var kvp in CannedResponses)
    {
      if (lower.Contains(kvp.Key, StringComparison.OrdinalIgnoreCase))
        return kvp.Value;
    }

    return FallbackResponse;
  }

  private static List<string> TokenizeResponse(string text)
  {
    var tokens = new List<string>();
    var words = text.Split(' ');

    foreach (var word in words)
    {
      tokens.Add(word + " ");
    }

    return tokens;
  }
}

public record AiChatMessage
{
  public string Role { get; init; } = string.Empty;
  public string Content { get; init; } = string.Empty;
}

public record AiChatRequest
{
  public List<AiChatMessage> Messages { get; init; } = [];
}
