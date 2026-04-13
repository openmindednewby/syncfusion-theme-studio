# ENT-23: Admin Integrations + Plugins (Full)

## Status: TODO
## Priority: Low
## Depends on: None
## Agent: frontend-dev

## Objective

Replace the stub Admin Integrations and Plugins pages with full showcase pages — integration marketplace, installed integrations management, plugin system.

## Implementation Plan

### 1. Integrations Page

```
src/features/admin/pages/IntegrationsPage/
├── index.tsx
├── components/
│   ├── IntegrationCards.tsx      # Grid of available integrations
│   ├── IntegrationDetail.tsx    # Detail dialog/panel
│   ├── IntegrationConfig.tsx    # Configuration form per integration
│   ├── InstalledList.tsx        # List of active integrations with status
│   └── IntegrationSearch.tsx    # Search + category filter
├── data/
│   └── integrationsData.ts     # Mock integrations catalog
├── types.ts
└── constants.ts
```

**Content**: 12-15 mock integrations:
- Communication: Slack, Microsoft Teams, Discord
- Storage: AWS S3, Google Drive, Dropbox
- Payment: Stripe, PayPal
- Analytics: Google Analytics, Mixpanel
- Auth: Okta, Auth0, Azure AD
- Monitoring: Datadog, PagerDuty

Each has: icon, name, description, category, status (Connected/Disconnected), config fields.

### 2. Plugins Page

```
src/features/admin/pages/PluginsPage/
├── index.tsx
├── components/
│   ├── PluginCards.tsx          # Installed plugins grid
│   ├── PluginMarketplace.tsx   # Available plugins to install
│   ├── PluginDetail.tsx        # Detail view with version, changelog
│   └── PluginToggle.tsx        # Enable/disable switch
├── data/
│   └── pluginsData.ts         # Mock plugins catalog
├── types.ts
└── constants.ts
```

**Content**: 8-10 mock plugins:
- Advanced Analytics, Report Builder, PDF Generator, Bulk Import/Export
- Custom Fields, Workflow Automation, API Rate Limiter, Dark Mode Pro

Each has: name, version, author, description, enabled/disabled status, settings.

## Success Criteria

- [ ] Integrations page shows catalog with search + filter
- [ ] Can "connect" / "disconnect" integrations (mock)
- [ ] Configuration dialog per integration
- [ ] Plugins page shows installed + marketplace
- [ ] Can enable/disable plugins
- [ ] Admin-only access
