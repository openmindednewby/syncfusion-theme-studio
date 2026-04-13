namespace MockServer.Web.Alerts;

public class GetIndicators : EndpointWithoutRequest<AlertIndicatorsResponse>
{
  public override void Configure()
  {
    Get("/alert/indicators");
    AllowAnonymous();
  }

  public override async Task HandleAsync(CancellationToken ct)
  {
    await SendOkAsync(AlertIndicatorData.Response, ct);
  }
}

// ─── Response DTOs ──────────────────────────────────────────────────────────

public record AlertIndicatorsResponse(
  List<AlertIndicator> AlertIndicators,
  DateTime LastUpdated);

public record AlertIndicator(
  int Value,
  string Title,
  int AlertIndicatorTrend,
  double AlertTrendPercentage,
  bool IsFilterable,
  FilterDescriptor? FilterDescriptor);

public record FilterDescriptor(
  string Property,
  int Operator,
  object? Value,
  List<int>? Values);

// ─── Static mock data ───────────────────────────────────────────────────────

internal static class AlertIndicatorData
{
  public static readonly AlertIndicatorsResponse Response = new(
    AlertIndicators:
    [
      new(4, "Critical", 1, 12.5, true,
        new("Severity", 0, null, [5])),
      new(18, "High", -1, 8.3, true,
        new("Severity", 0, null, [4])),
      new(45, "Medium", 1, 3.2, true,
        new("Severity", 0, null, [3])),
      new(127, "Low", 0, 0.0, true,
        new("Severity", 0, null, [2])),
      new(398, "Informational", -1, 1.7, true,
        new("Severity", 0, null, [1])),
      new(12, "Awaiting Broker", 1, 15.0, false, null),
      new(87, "Auto-Executed", -1, 5.4, false, null),
      new(3, "Overdue Settlement", 1, 25.0, false, null),
    ],
    LastUpdated: new DateTime(2026, 1, 12, 8, 0, 0, DateTimeKind.Utc));
}
