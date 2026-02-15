# CUL-08: Localization Strings & Test IDs

## Status: TODO
## Priority: Medium
## Depends on: CUL-01
## Agent: frontend-dev

## Objective

Add all localization keys for the Culture settings UI and add test IDs for the new Culture tab and its sub-editors.

## Implementation Plan

### 1. Add Localization Keys
**File to modify**: `src/localization/locales/en.json`

Add under the `themeSettings` namespace:

```json
{
  "themeSettings": {
    "tabs": {
      "culture": "Culture"
    },
    "culture": {
      "sectionTitle": "Culture & Date/Time Settings",
      "sectionDescription": "Configure locale, date format, time format, and regional preferences",

      "mode": {
        "label": "Culture Mode",
        "auto": "Auto (Browser)",
        "autoDescription": "Uses your browser's language setting",
        "manual": "Manual",
        "manualDescription": "Choose a specific locale"
      },
      "locale": {
        "label": "Locale",
        "placeholder": "Select a locale"
      },
      "dateFormat": {
        "label": "Date Format",
        "auto": "Auto",
        "short": "Short",
        "medium": "Medium",
        "long": "Long",
        "full": "Full",
        "iso": "ISO 8601",
        "custom": "Custom"
      },
      "customDateFormat": {
        "label": "Custom Date Format",
        "placeholder": "e.g. yyyy-MM-dd",
        "helper": "Syncfusion date format string"
      },
      "timeFormat": {
        "label": "Time Format",
        "auto": "Auto",
        "twelveHour": "12-hour",
        "twentyFourHour": "24-hour"
      },
      "showSeconds": {
        "label": "Show Seconds"
      },
      "firstDayOfWeek": {
        "label": "First Day of Week",
        "auto": "Auto (from locale)",
        "sunday": "Sunday",
        "monday": "Monday",
        "saturday": "Saturday"
      },
      "preview": {
        "label": "Preview",
        "dateLabel": "Date",
        "timeLabel": "Time",
        "dateTimeLabel": "Date & Time"
      }
    }
  }
}
```

**Note**: These keys should be merged into the existing `themeSettings` object. The `tabs` key may already exist — add `culture` to it.

### 2. Add Test IDs
**File to modify**: `src/shared/testIds.ts`

Add under the `THEME_SETTINGS` namespace (or create a new `CULTURE` namespace if that fits the existing pattern better):

```ts
// Culture tab
THEME_TAB_CULTURE: 'theme-tab-culture',

// Culture section editors
CULTURE_MODE_EDITOR: 'culture-mode-editor',
CULTURE_MODE_AUTO: 'culture-mode-auto',
CULTURE_MODE_MANUAL: 'culture-mode-manual',
CULTURE_LOCALE_SELECT: 'culture-locale-select',
CULTURE_DATE_FORMAT_SELECT: 'culture-date-format-select',
CULTURE_CUSTOM_DATE_INPUT: 'culture-custom-date-input',
CULTURE_TIME_FORMAT_SELECT: 'culture-time-format-select',
CULTURE_SHOW_SECONDS_TOGGLE: 'culture-show-seconds-toggle',
CULTURE_FIRST_DAY_SELECT: 'culture-first-day-select',
CULTURE_PREVIEW: 'culture-preview',
CULTURE_PREVIEW_DATE: 'culture-preview-date',
CULTURE_PREVIEW_TIME: 'culture-preview-time',
CULTURE_PREVIEW_DATETIME: 'culture-preview-datetime',
```

**Note**: Check the existing `testIds.ts` structure and naming conventions. Test IDs should use kebab-case strings and PascalCase or SCREAMING_SNAKE_CASE keys (match existing pattern).

## Files to Modify

- `src/localization/locales/en.json`
- `src/shared/testIds.ts`

## Acceptance Criteria

- [ ] All culture UI strings added to `en.json`
- [ ] Keys follow existing `themeSettings.*` namespace pattern
- [ ] `tabs.culture` key exists for the tab label
- [ ] All sub-editor labels, options, and descriptions have i18n keys
- [ ] Preview section has its own keys
- [ ] All test IDs added to `testIds.ts`
- [ ] Test IDs follow existing naming convention
- [ ] Every interactive element in the Culture section has a corresponding test ID
- [ ] `npm run lint:fix` — no new errors
- [ ] `npx tsc --noEmit` — passes
