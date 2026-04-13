using MockServer.UseCases.DTOs;

namespace MockServer.UseCases.SystemSettings.Update;

public record UpdateSystemSettingsCommand(
  // General
  string AppName,
  string Timezone,
  string DefaultLanguage,
  string DateFormat,
  string CurrencyFormat,

  // Security
  int MinPasswordLength,
  bool RequireUppercase,
  bool RequireNumber,
  bool RequireSpecialChar,
  bool Enforce2FA,
  int SessionTimeoutMinutes,
  int MaxLoginAttempts,

  // Email
  string SmtpHost,
  int SmtpPort,
  string SmtpUsername,
  string SmtpPassword,
  string FromAddress,
  bool EnableTls,

  // Notifications
  bool EnableEmailNotifications,
  bool EnableInAppNotifications,
  bool EnableSmsNotifications,
  string AlertSeverityThreshold,

  // Maintenance
  bool MaintenanceMode,
  DateTime? MaintenanceStart,
  DateTime? MaintenanceEnd) : IRequest<Result<SystemSettingsDto>>;
