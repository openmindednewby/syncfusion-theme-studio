import { IntegrationCategory, IntegrationStatus } from '../types';

import type { IntegrationDto } from '../types';

/** Static catalog of mock integrations for the showcase page. */
export const INTEGRATIONS: IntegrationDto[] = [
  {
    id: 'slack',
    name: 'Slack',
    description: 'Send notifications and updates to Slack channels.',
    category: IntegrationCategory.Communication,
    icon: '\uD83D\uDCAC',
    status: IntegrationStatus.Connected,
    configFields: [
      { key: 'webhookUrl', label: 'Webhook URL', type: 'url', placeholder: 'https://hooks.slack.com/...' },
      { key: 'channel', label: 'Default Channel', type: 'text', placeholder: '#general' },
    ],
  },
  {
    id: 'teams',
    name: 'Microsoft Teams',
    description: 'Post messages and alerts to Microsoft Teams channels.',
    category: IntegrationCategory.Communication,
    icon: '\uD83D\uDFE6',
    status: IntegrationStatus.Disconnected,
    configFields: [
      { key: 'webhookUrl', label: 'Webhook URL', type: 'url', placeholder: 'https://outlook.office.com/...' },
    ],
  },
  {
    id: 'discord',
    name: 'Discord',
    description: 'Deliver real-time notifications to Discord servers.',
    category: IntegrationCategory.Communication,
    icon: '\uD83C\uDFAE',
    status: IntegrationStatus.Disconnected,
    configFields: [
      { key: 'botToken', label: 'Bot Token', type: 'password', placeholder: 'Enter bot token' },
      { key: 'channelId', label: 'Channel ID', type: 'text', placeholder: '123456789' },
    ],
  },
  {
    id: 'aws-s3',
    name: 'AWS S3',
    description: 'Store and retrieve files from Amazon S3 buckets.',
    category: IntegrationCategory.Storage,
    icon: '\u2601\uFE0F',
    status: IntegrationStatus.Connected,
    configFields: [
      { key: 'accessKey', label: 'Access Key ID', type: 'password', placeholder: 'AKIA...' },
      { key: 'secretKey', label: 'Secret Access Key', type: 'password', placeholder: 'Enter secret key' },
      { key: 'bucket', label: 'Bucket Name', type: 'text', placeholder: 'my-bucket' },
    ],
  },
  {
    id: 'google-drive',
    name: 'Google Drive',
    description: 'Sync documents and files with Google Drive.',
    category: IntegrationCategory.Storage,
    icon: '\uD83D\uDCC1',
    status: IntegrationStatus.Disconnected,
    configFields: [
      { key: 'clientId', label: 'Client ID', type: 'text', placeholder: 'Enter client ID' },
      { key: 'clientSecret', label: 'Client Secret', type: 'password', placeholder: 'Enter client secret' },
    ],
  },
  {
    id: 'dropbox',
    name: 'Dropbox',
    description: 'Connect to Dropbox for file storage and sharing.',
    category: IntegrationCategory.Storage,
    icon: '\uD83D\uDCE6',
    status: IntegrationStatus.Disconnected,
    configFields: [
      { key: 'apiKey', label: 'API Key', type: 'password', placeholder: 'Enter API key' },
    ],
  },
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Process payments and manage subscriptions with Stripe.',
    category: IntegrationCategory.Payment,
    icon: '\uD83D\uDCB3',
    status: IntegrationStatus.Connected,
    configFields: [
      { key: 'publishableKey', label: 'Publishable Key', type: 'text', placeholder: 'pk_...' },
      { key: 'secretKey', label: 'Secret Key', type: 'password', placeholder: 'sk_...' },
    ],
  },
  {
    id: 'paypal',
    name: 'PayPal',
    description: 'Accept PayPal payments from customers worldwide.',
    category: IntegrationCategory.Payment,
    icon: '\uD83C\uDFE6',
    status: IntegrationStatus.Disconnected,
    configFields: [
      { key: 'clientId', label: 'Client ID', type: 'text', placeholder: 'Enter client ID' },
      { key: 'clientSecret', label: 'Client Secret', type: 'password', placeholder: 'Enter client secret' },
    ],
  },
  {
    id: 'google-analytics',
    name: 'Google Analytics',
    description: 'Track user behavior and application performance.',
    category: IntegrationCategory.Analytics,
    icon: '\uD83D\uDCCA',
    status: IntegrationStatus.Disconnected,
    configFields: [
      { key: 'trackingId', label: 'Tracking ID', type: 'text', placeholder: 'G-XXXXXXXXXX' },
    ],
  },
  {
    id: 'mixpanel',
    name: 'Mixpanel',
    description: 'Product analytics for tracking user engagement.',
    category: IntegrationCategory.Analytics,
    icon: '\uD83D\uDD0D',
    status: IntegrationStatus.Disconnected,
    configFields: [
      { key: 'projectToken', label: 'Project Token', type: 'text', placeholder: 'Enter project token' },
    ],
  },
  {
    id: 'okta',
    name: 'Okta',
    description: 'Enterprise identity management and single sign-on.',
    category: IntegrationCategory.Auth,
    icon: '\uD83D\uDD10',
    status: IntegrationStatus.Connected,
    configFields: [
      { key: 'domain', label: 'Okta Domain', type: 'url', placeholder: 'https://dev-xxxxx.okta.com' },
      { key: 'clientId', label: 'Client ID', type: 'text', placeholder: 'Enter client ID' },
    ],
  },
  {
    id: 'auth0',
    name: 'Auth0',
    description: 'Flexible authentication and authorization platform.',
    category: IntegrationCategory.Auth,
    icon: '\uD83D\uDEE1\uFE0F',
    status: IntegrationStatus.Disconnected,
    configFields: [
      { key: 'domain', label: 'Auth0 Domain', type: 'url', placeholder: 'https://your-tenant.auth0.com' },
      { key: 'clientId', label: 'Client ID', type: 'text', placeholder: 'Enter client ID' },
      { key: 'clientSecret', label: 'Client Secret', type: 'password', placeholder: 'Enter client secret' },
    ],
  },
  {
    id: 'azure-ad',
    name: 'Azure AD',
    description: 'Microsoft Azure Active Directory for enterprise SSO.',
    category: IntegrationCategory.Auth,
    icon: '\uD83D\uDD35',
    status: IntegrationStatus.Disconnected,
    configFields: [
      { key: 'tenantId', label: 'Tenant ID', type: 'text', placeholder: 'Enter tenant ID' },
      { key: 'clientId', label: 'Application ID', type: 'text', placeholder: 'Enter application ID' },
    ],
  },
  {
    id: 'datadog',
    name: 'Datadog',
    description: 'Infrastructure monitoring and application performance.',
    category: IntegrationCategory.Monitoring,
    icon: '\uD83D\uDC36',
    status: IntegrationStatus.Disconnected,
    configFields: [
      { key: 'apiKey', label: 'API Key', type: 'password', placeholder: 'Enter API key' },
      { key: 'appKey', label: 'Application Key', type: 'password', placeholder: 'Enter app key' },
    ],
  },
  {
    id: 'pagerduty',
    name: 'PagerDuty',
    description: 'Incident management and on-call scheduling.',
    category: IntegrationCategory.Monitoring,
    icon: '\uD83D\uDEA8',
    status: IntegrationStatus.Disconnected,
    configFields: [
      { key: 'routingKey', label: 'Routing Key', type: 'password', placeholder: 'Enter routing key' },
    ],
  },
];
