namespace MockServer.Core.Entities;

public class SystemSettings : BaseEntity
{
  // General
  public string AppName { get; set; } = string.Empty;
  public string Timezone { get; set; } = string.Empty;
  public string DefaultLanguage { get; set; } = string.Empty;
  public string DateFormat { get; set; } = string.Empty;
  public string CurrencyFormat { get; set; } = string.Empty;

  // Security
  public int MinPasswordLength { get; set; }
  public bool RequireUppercase { get; set; }
  public bool RequireNumber { get; set; }
  public bool RequireSpecialChar { get; set; }
  public bool Enforce2FA { get; set; }
  public int SessionTimeoutMinutes { get; set; }
  public int MaxLoginAttempts { get; set; }

  // Email
  public string SmtpHost { get; set; } = string.Empty;
  public int SmtpPort { get; set; }
  public string SmtpUsername { get; set; } = string.Empty;
  public string SmtpPassword { get; set; } = string.Empty;
  public string FromAddress { get; set; } = string.Empty;
  public bool EnableTls { get; set; }

  // Notifications
  public bool EnableEmailNotifications { get; set; }
  public bool EnableInAppNotifications { get; set; }
  public bool EnableSmsNotifications { get; set; }
  public string AlertSeverityThreshold { get; set; } = string.Empty;

  // Maintenance
  public bool MaintenanceMode { get; set; }
  public DateTime? MaintenanceStart { get; set; }
  public DateTime? MaintenanceEnd { get; set; }
}
