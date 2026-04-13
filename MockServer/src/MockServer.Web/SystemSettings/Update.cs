using MockServer.UseCases.DTOs;
using MockServer.UseCases.SystemSettings.Update;

namespace MockServer.Web.SystemSettings;

public class Update(IMediator mediator) : Endpoint<UpdateSystemSettingsRequest, SystemSettingsDto>
{
  public override void Configure()
  {
    Put("/admin/settings");
    AllowAnonymous();
  }

  public override async Task HandleAsync(UpdateSystemSettingsRequest req, CancellationToken ct)
  {
    var result = await mediator.Send(
      new UpdateSystemSettingsCommand(
        req.AppName,
        req.Timezone,
        req.DefaultLanguage,
        req.DateFormat,
        req.CurrencyFormat,
        req.MinPasswordLength,
        req.RequireUppercase,
        req.RequireNumber,
        req.RequireSpecialChar,
        req.Enforce2FA,
        req.SessionTimeoutMinutes,
        req.MaxLoginAttempts,
        req.SmtpHost,
        req.SmtpPort,
        req.SmtpUsername,
        req.SmtpPassword,
        req.FromAddress,
        req.EnableTls,
        req.EnableEmailNotifications,
        req.EnableInAppNotifications,
        req.EnableSmsNotifications,
        req.AlertSeverityThreshold,
        req.MaintenanceMode,
        req.MaintenanceStart,
        req.MaintenanceEnd), ct);

    if (result.IsSuccess) await SendOkAsync(result.Value, ct);
    else await SendNotFoundAsync(ct);
  }
}

public record UpdateSystemSettingsRequest
{
  // General
  public string AppName { get; init; } = string.Empty;
  public string Timezone { get; init; } = string.Empty;
  public string DefaultLanguage { get; init; } = string.Empty;
  public string DateFormat { get; init; } = string.Empty;
  public string CurrencyFormat { get; init; } = string.Empty;

  // Security
  public int MinPasswordLength { get; init; }
  public bool RequireUppercase { get; init; }
  public bool RequireNumber { get; init; }
  public bool RequireSpecialChar { get; init; }
  public bool Enforce2FA { get; init; }
  public int SessionTimeoutMinutes { get; init; }
  public int MaxLoginAttempts { get; init; }

  // Email
  public string SmtpHost { get; init; } = string.Empty;
  public int SmtpPort { get; init; }
  public string SmtpUsername { get; init; } = string.Empty;
  public string SmtpPassword { get; init; } = string.Empty;
  public string FromAddress { get; init; } = string.Empty;
  public bool EnableTls { get; init; }

  // Notifications
  public bool EnableEmailNotifications { get; init; }
  public bool EnableInAppNotifications { get; init; }
  public bool EnableSmsNotifications { get; init; }
  public string AlertSeverityThreshold { get; init; } = string.Empty;

  // Maintenance
  public bool MaintenanceMode { get; init; }
  public DateTime? MaintenanceStart { get; init; }
  public DateTime? MaintenanceEnd { get; init; }
}
