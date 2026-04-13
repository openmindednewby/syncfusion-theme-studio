/** Shape returned by GET /api/admin/settings and sent via PUT. */
export interface SystemSettingsDto {
  // General
  appName: string;
  timezone: string;
  defaultLanguage: string;
  dateFormat: string;
  currencyFormat: string;

  // Security
  minPasswordLength: number;
  requireUppercase: boolean;
  requireNumber: boolean;
  requireSpecialChar: boolean;
  enforce2FA: boolean;
  sessionTimeoutMinutes: number;
  maxLoginAttempts: number;

  // Email
  smtpHost: string;
  smtpPort: number;
  smtpUsername: string;
  smtpPassword: string;
  fromAddress: string;
  enableTls: boolean;

  // Notifications
  enableEmailNotifications: boolean;
  enableInAppNotifications: boolean;
  enableSmsNotifications: boolean;
  alertSeverityThreshold: string;

  // Maintenance
  maintenanceMode: boolean;
  maintenanceStart: string | null;
  maintenanceEnd: string | null;
}

/** Form data for the General settings tab. */
export interface GeneralFormData {
  appName: string;
  timezone: string;
  defaultLanguage: string;
  dateFormat: string;
  currencyFormat: string;
}

/** Form data for the Security settings tab. */
export interface SecurityFormData {
  minPasswordLength: number;
  requireUppercase: boolean;
  requireNumber: boolean;
  requireSpecialChar: boolean;
  enforce2FA: boolean;
  sessionTimeoutMinutes: number;
  maxLoginAttempts: number;
}

/** Form data for the Email settings tab. */
export interface EmailFormData {
  smtpHost: string;
  smtpPort: number;
  smtpUsername: string;
  smtpPassword: string;
  fromAddress: string;
  enableTls: boolean;
}

/** Form data for the Notification settings tab. */
export interface NotificationFormData {
  enableEmailNotifications: boolean;
  enableInAppNotifications: boolean;
  enableSmsNotifications: boolean;
  alertSeverityThreshold: string;
}

/** Form data for the Maintenance settings tab. */
export interface MaintenanceFormData {
  maintenanceMode: boolean;
  maintenanceStart: string;
  maintenanceEnd: string;
}
