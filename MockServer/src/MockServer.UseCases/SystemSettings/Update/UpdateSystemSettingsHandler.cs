using MockServer.UseCases.DTOs;
using MockServer.UseCases.Mappers;

namespace MockServer.UseCases.SystemSettings.Update;

public class UpdateSystemSettingsHandler(IRepository<Core.Entities.SystemSettings> repository)
  : IRequestHandler<UpdateSystemSettingsCommand, Result<SystemSettingsDto>>
{
  public async Task<Result<SystemSettingsDto>> Handle(
    UpdateSystemSettingsCommand request,
    CancellationToken cancellationToken)
  {
    var all = await repository.ListAsync(cancellationToken);
    var settings = all.FirstOrDefault();
    if (settings is null) return Result.NotFound("System settings not found.");

    // General
    settings.AppName = request.AppName;
    settings.Timezone = request.Timezone;
    settings.DefaultLanguage = request.DefaultLanguage;
    settings.DateFormat = request.DateFormat;
    settings.CurrencyFormat = request.CurrencyFormat;

    // Security
    settings.MinPasswordLength = request.MinPasswordLength;
    settings.RequireUppercase = request.RequireUppercase;
    settings.RequireNumber = request.RequireNumber;
    settings.RequireSpecialChar = request.RequireSpecialChar;
    settings.Enforce2FA = request.Enforce2FA;
    settings.SessionTimeoutMinutes = request.SessionTimeoutMinutes;
    settings.MaxLoginAttempts = request.MaxLoginAttempts;

    // Email
    settings.SmtpHost = request.SmtpHost;
    settings.SmtpPort = request.SmtpPort;
    settings.SmtpUsername = request.SmtpUsername;
    settings.SmtpPassword = request.SmtpPassword;
    settings.FromAddress = request.FromAddress;
    settings.EnableTls = request.EnableTls;

    // Notifications
    settings.EnableEmailNotifications = request.EnableEmailNotifications;
    settings.EnableInAppNotifications = request.EnableInAppNotifications;
    settings.EnableSmsNotifications = request.EnableSmsNotifications;
    settings.AlertSeverityThreshold = request.AlertSeverityThreshold;

    // Maintenance
    settings.MaintenanceMode = request.MaintenanceMode;
    settings.MaintenanceStart = request.MaintenanceStart;
    settings.MaintenanceEnd = request.MaintenanceEnd;

    settings.UpdatedAt = DateTime.UtcNow;

    await repository.UpdateAsync(settings, cancellationToken);
    return Result.Success(DtoMapper.ToDto(settings));
  }
}
