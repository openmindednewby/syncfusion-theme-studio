namespace MockServer.Web.Ai;

public class Suggestions : EndpointWithoutRequest<List<AiSuggestionDto>>
{
  private static readonly List<AiSuggestionDto> SuggestionsList =
  [
    new() { Id = "revenue", Label = "Show revenue data", Icon = "chart" },
    new() { Id = "users", Label = "User statistics", Icon = "users" },
    new() { Id = "sales", Label = "Sales summary", Icon = "trending" },
    new() { Id = "help", Label = "Help me navigate", Icon = "help" },
    new() { Id = "settings", Label = "App settings guide", Icon = "settings" },
  ];

  public override void Configure()
  {
    Get("/ai/suggestions");
    AllowAnonymous();
  }

  public override async Task HandleAsync(CancellationToken ct)
  {
    await SendOkAsync(SuggestionsList, ct);
  }
}

public record AiSuggestionDto
{
  public string Id { get; init; } = string.Empty;
  public string Label { get; init; } = string.Empty;
  public string Icon { get; init; } = string.Empty;
}
