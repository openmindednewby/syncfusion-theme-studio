namespace MockServer.Web.Alerts;

public class ListAlerts : Endpoint<ListAlertsRequest, ListAlertsResponse>
{
  public override void Configure()
  {
    Post("/alert");
    AllowAnonymous();
  }

  public override async Task HandleAsync(ListAlertsRequest req, CancellationToken ct)
  {
    var filtered = AlertMockData.Alerts.AsEnumerable();

    if (req.FromDate.HasValue)
      filtered = filtered.Where(a => a.DateCreated >= req.FromDate.Value);

    if (req.ToDate.HasValue)
      filtered = filtered.Where(a => a.DateCreated <= req.ToDate.Value);

    var filteredList = filtered.ToList();
    var page = Math.Max(0, req.Page);
    var size = Math.Clamp(req.Size, 1, Math.Max(1, filteredList.Count));
    var skip = page * size;

    var slice = filteredList.Skip(skip).Take(size).ToList();

    await SendOkAsync(new ListAlertsResponse(slice, filteredList.Count), ct);
  }
}

// ─── Request / Response DTOs ────────────────────────────────────────────────

public record ListAlertsRequest
{
  public DateTime? FromDate { get; init; }
  public int Page { get; init; }
  public int Size { get; init; } = 50;
  public DateTime? ToDate { get; init; }
  public string? ManagedBy { get; init; }
  public string? SortBy { get; init; }
  public string? SortDir { get; init; }
}

public record ListAlertsResponse(
  List<AlertDto> Alerts,
  int TotalCount);

public record AlertDto(
  int AlertId,
  int ProjectId,
  int Severity,
  double Score,
  int Status,
  string CorrelationRuleName,
  DateTime DateCreated,
  string[] AffectedAssets,
  int AssetCount,
  string Tactic,
  string Technique,
  string Assignee,
  string? SocAnalystName,
  int SocAnalystType,
  SlaStatusDto SlaStatusVM,
  AutomationStatusDto AutomationStatusVM,
  string[] SourceIPs,
  int SourceIPCount,
  string[] DestinationIPs,
  int DestinationIPCount,
  string[] MessageIds,
  int MessageIdCount,
  string ManagedBy,
  int LogCount,
  int LimitedLogCount);

public record SlaStatusDto(
  int ExpirationMinutesFromCreation,
  double AtRiskPercentage,
  DateTime DateCreated);

public record AutomationStatusDto(
  int AutomationType,
  int AutomationStatus);

// ─── Static mock-data generator ─────────────────────────────────────────────

internal static class AlertMockData
{
  private const int AlertCount = 592;
  private const int IdOffset = 26077000;
  private const int ProjectId = 1;
  private const int HourMultiplier = 3;
  private const int DayModulo = 5;
  private const double ScoreCritical = 95.0;
  private const double ScoreRange = 80.0;
  private const int ScoreJitter = 7;
  private const double ScoreMin = 10.0;
  private const double ScoreMax = 100.0;
  private const double ScoreDecimalFactor = 0.1;
  private const int StatusOffset = 2;
  private const int AssetOffset = 1;
  private const int AssigneeOffset = 3;
  private const int AutomationOffset = 1;
  private const int SlaModulo = 6;
  private const int MinutesPerHour = 60;
  private const int LogCountBase = 10;
  private const int LogCountRange = 90;
  private const int LimitedLogCap = 50;
  private const int BrokerTypeInHouse = 1;
  private const int BrokerTypeExternal = 2;

  private static readonly DateTime BaseDate = DateTime.UtcNow;

  // Severity: 1=Informational, 2=Low, 3=Medium, 4=High, 5=Critical
  private static readonly int[] Severities = [5, 4, 3, 2, 1];

  // Status: 1=Open, 4=Filled, 8=Partial, 12=Cancelled, 16=Expired
  private static readonly int[] Statuses = [1, 4, 12, 8, 16];

  private static readonly string[] CorrelationNames =
  [
    "AAPL — Apple Inc.", "TSLA — Tesla Inc.",
    "GOOGL — Alphabet Inc.", "MSFT — Microsoft Corp.",
    "AMZN — Amazon.com Inc.", "NVDA — NVIDIA Corp.",
    "META — Meta Platforms", "JPM — JPMorgan Chase",
    "V — Visa Inc.", "BRK.B — Berkshire Hathaway",
    "JNJ — Johnson & Johnson", "WMT — Walmart Inc.",
  ];

  private static readonly string[] Assets =
  [
    "NYSE", "NASDAQ", "LSE", "TSE",
    "HKEX", "SSE", "Euronext", "ASX",
  ];

  private static readonly string[] Tactics =
  [
    "Day Trading", "Swing Trading", "Scalping", "Position Trading",
    "Momentum", "Value Investing", "Growth Investing", "Arbitrage",
    "Hedging", "Index Tracking", "Dividend Capture", "Pairs Trading",
  ];

  private static readonly string[] Techniques =
  [
    "Market Order", "Limit Order", "Stop-Loss Order",
    "Stop-Limit Order", "Trailing Stop", "Fill or Kill",
    "Good Till Cancelled", "Immediate or Cancel", "All or None",
    "Day Order", "At Market Open", "At Market Close",
  ];

  private static readonly string[] Assignees =
    ["Sarah Chen", "James Wilson", "Maria Garcia", "Alex Kumar", "Unassigned"];

  private static readonly string[] SourceAccountPrefixes =
    ["ACCT-US-", "ACCT-EU-", "ACCT-AP-", "ACCT-UK-"];

  private static readonly string[] DestAccountPrefixes =
    ["CLRH-US-", "CLRH-EU-", "CLRH-AP-", "CLRH-UK-"];

  // SLA hours per severity index (Critical=0..Informational=4)
  private static readonly int[] SlaHours = [1, 4, 8, 24, 72];

  // AutomationType: 0=Manual, 1=Auto-Executed, 2=Auto-Routed
  // AutomationStatus: 0=Pending, 1=Completed, 2=Failed
  private static readonly (int Type, int Status)[] AutomationValues =
    [(1, 1), (0, 0), (2, 1), (0, 0)];

  public static readonly List<AlertDto> Alerts = Generate();

  private static List<AlertDto> Generate()
  {
    var alerts = new List<AlertDto>(AlertCount);

    for (var i = 0; i < AlertCount; i++)
    {
      var sevIndex = i % Severities.Length;
      var severity = Severities[sevIndex];

      var scoreRaw = ScoreCritical
        - sevIndex * ScoreRange / Severities.Length
        + i % ScoreJitter * ScoreDecimalFactor;
      var score = Math.Round(
        Math.Clamp(scoreRaw, ScoreMin, ScoreMax), 1);

      var created = BaseDate
        .AddHours(-i * HourMultiplier)
        .AddDays(-(i % DayModulo));

      var slaHoursValue = SlaHours[sevIndex];
      var slaMinutes = slaHoursValue * MinutesPerHour;
      var atRisk = 0.75;

      var auto = AutomationValues[(i + AutomationOffset) % AutomationValues.Length];

      var asset = Assets[(i + AssetOffset) % Assets.Length];
      var srcIp = $"{SourceAccountPrefixes[i % SourceAccountPrefixes.Length]}{100 + i % 50}";
      var dstIp = $"{DestAccountPrefixes[i % DestAccountPrefixes.Length]}{200 + i % 50}";

      var assignee = Assignees[(i + AssigneeOffset) % Assignees.Length];
      var logCount = LogCountBase + i % LogCountRange;

      alerts.Add(new AlertDto(
        AlertId: IdOffset + i,
        ProjectId: ProjectId,
        Severity: severity,
        Score: score,
        Status: Statuses[(i + StatusOffset) % Statuses.Length],
        CorrelationRuleName: CorrelationNames[i % CorrelationNames.Length],
        DateCreated: created,
        AffectedAssets: [asset],
        AssetCount: 1,
        Tactic: Tactics[i % Tactics.Length],
        Technique: Techniques[i % Techniques.Length],
        Assignee: assignee,
        SocAnalystName: assignee == "Unassigned" ? null : assignee,
        SocAnalystType: i % 2 == 0 ? BrokerTypeInHouse : BrokerTypeExternal,
        SlaStatusVM: new SlaStatusDto(slaMinutes, atRisk, created),
        AutomationStatusVM: new AutomationStatusDto(auto.Type, auto.Status),
        SourceIPs: [srcIp],
        SourceIPCount: 1,
        DestinationIPs: [dstIp],
        DestinationIPCount: 1,
        MessageIds: [$"MSG-{IdOffset + i}"],
        MessageIdCount: 1,
        ManagedBy: i % 2 == 0 ? "Institutional" : "Retail",
        LogCount: logCount,
        LimitedLogCount: Math.Min(logCount, LimitedLogCap)));
    }

    return alerts;
  }
}
