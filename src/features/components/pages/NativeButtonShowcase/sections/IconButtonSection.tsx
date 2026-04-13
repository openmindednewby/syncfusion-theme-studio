/**
 * IconButtonSection - Demonstrates IconButtonNative variants, sizes, and outline style.
 */
import { memo } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { IconRefreshLast24 } from '@/components/icons';
import { ButtonSize, IconButtonNative, IconButtonVariant } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

const SettingsIcon = (): JSX.Element => (
  <svg
    fill="none"
    height="16"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const RefreshIcon = (): JSX.Element => (
  <svg
    fill="none"
    height="14"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="14"
    xmlns="http://www.w3.org/2000/svg"
  >
    <polyline points="23 4 23 10 17 10" />
    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
  </svg>
);

const VARIANT_SNIPPET = `<IconButtonNative
  ariaLabel="Settings"
  icon={<SettingsIcon />}
  variant={IconButtonVariant.Primary}
/>`;

const OUTLINE_SNIPPET = `<IconButtonNative
  ariaLabel="Refresh"
  icon={<RefreshIcon />}
  variant={IconButtonVariant.Outline}
  size={ButtonSize.Sm}
/>`;

export const IconButtonSection = memo((): JSX.Element => (
  <section className="card space-y-6" data-testid={TestIds.NATIVE_ICON_BUTTON_SECTION}>
    <div>
      <h3 className="text-lg font-semibold text-text-primary">
        {FM('components.buttonShowcase.sections.iconButtons')}
      </h3>
      <p className="mt-1 text-sm text-text-secondary">
        {FM('components.buttonShowcase.sections.iconButtonsDesc')}
      </p>
    </div>

    {/* Variants */}
    <div className="space-y-2">
      <p className="text-xs font-medium uppercase tracking-wide text-text-secondary">{FM('components.buttonShowcase.sections.iconVariants')}</p>
      <div className="flex flex-wrap items-center gap-4">
        <IconButtonNative
          ariaLabel="Settings (primary)"
          icon={<SettingsIcon />}
          testId="native-icon-btn-primary"
          variant={IconButtonVariant.Primary}
        />
        <IconButtonNative
          ariaLabel="Settings (secondary)"
          icon={<SettingsIcon />}
          testId="native-icon-btn-secondary"
          variant={IconButtonVariant.Secondary}
        />
        <IconButtonNative
          ariaLabel="Settings (tertiary)"
          icon={<SettingsIcon />}
          testId="native-icon-btn-tertiary"
          variant={IconButtonVariant.Tertiary}
        />
        <IconButtonNative
          ariaLabel="Settings (outline)"
          icon={<SettingsIcon />}
          testId="native-icon-btn-outline"
          variant={IconButtonVariant.Outline}
        />
        <IconButtonNative
          disabled
          ariaLabel="Settings (disabled)"
          icon={<SettingsIcon />}
          testId="native-icon-btn-disabled"
          variant={IconButtonVariant.Primary}
        />
      </div>
    </div>

    {/* Sizes */}
    <div className="space-y-2">
      <p className="text-xs font-medium uppercase tracking-wide text-text-secondary">
        {FM('components.buttonShowcase.sections.iconSizes')}
      </p>
      <div className="flex flex-wrap items-center gap-4">
        <IconButtonNative
          ariaLabel="Small"
          icon={<SettingsIcon />}
          size={ButtonSize.Sm}
          testId="native-icon-btn-size-sm"
          variant={IconButtonVariant.Primary}
        />
        <IconButtonNative
          ariaLabel="Medium"
          icon={<SettingsIcon />}
          size={ButtonSize.Md}
          testId="native-icon-btn-size-md"
          variant={IconButtonVariant.Primary}
        />
        <IconButtonNative
          ariaLabel="Large"
          icon={<SettingsIcon />}
          size={ButtonSize.Lg}
          testId="native-icon-btn-size-lg"
          variant={IconButtonVariant.Primary}
        />
      </div>
    </div>

    {/* Outline sizes */}
    <div className="space-y-2">
      <p className="text-xs font-medium uppercase tracking-wide text-text-secondary">
        {FM('components.buttonShowcase.sections.iconOutlineSizes')}
      </p>
      <div className="flex flex-wrap items-center gap-4">
        <IconButtonNative
          ariaLabel="Outline small"
          icon={<RefreshIcon />}
          size={ButtonSize.Sm}
          testId="native-icon-btn-outline-sm"
          variant={IconButtonVariant.Outline}
        />
        <IconButtonNative
          ariaLabel="Outline medium"
          icon={<RefreshIcon />}
          size={ButtonSize.Md}
          testId="native-icon-btn-outline-md"
          variant={IconButtonVariant.Outline}
        />
        <IconButtonNative
          ariaLabel="Outline large"
          icon={<RefreshIcon />}
          size={ButtonSize.Lg}
          testId="native-icon-btn-outline-lg"
          variant={IconButtonVariant.Outline}
        />
      </div>
    </div>

    {/* Refresh Last 24h */}
    <div className="space-y-2">
      <p className="text-xs font-medium uppercase tracking-wide text-text-secondary">
        {FM('components.buttonShowcase.sections.iconRefreshLast24')}
      </p>
      <div className="flex flex-wrap items-center gap-4">
        <IconButtonNative
          ariaLabel="Refresh last 24 hours"
          icon={<IconRefreshLast24 />}
          size={ButtonSize.Sm}
          testId="native-icon-btn-refresh-last24"
          variant={IconButtonVariant.Outline}
        />
      </div>
    </div>

    <CopyableCodeSnippet code={VARIANT_SNIPPET} />
    <CopyableCodeSnippet code={OUTLINE_SNIPPET} />
  </section>
));

IconButtonSection.displayName = 'IconButtonSection';
