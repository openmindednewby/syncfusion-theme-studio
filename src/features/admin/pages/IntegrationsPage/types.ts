/* eslint-disable enum-file-isolation/enum-file-isolation */

/** Category grouping for integrations. */
export const enum IntegrationCategory {
  Communication = 'communication',
  Storage = 'storage',
  Payment = 'payment',
  Analytics = 'analytics',
  Auth = 'auth',
  Monitoring = 'monitoring',
}

/** Connection status of an integration. */
export const enum IntegrationStatus {
  Connected = 'connected',
  Disconnected = 'disconnected',
}

/** A single configuration field for an integration. */
export interface IntegrationConfigField {
  key: string;
  label: string;
  type: 'text' | 'password' | 'url';
  placeholder: string;
}

/** Shape of a single integration entry. */
export interface IntegrationDto {
  id: string;
  name: string;
  description: string;
  category: IntegrationCategory;
  icon: string;
  status: IntegrationStatus;
  configFields: IntegrationConfigField[];
}
