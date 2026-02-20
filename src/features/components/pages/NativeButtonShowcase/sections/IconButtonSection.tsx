/**
 * IconButtonSection - Demonstrates IconButtonNative variants and states.
 */
import { memo } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { IconButtonNative, IconButtonVariant } from '@/components/ui/native';
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

export const IconButtonSection = memo((): JSX.Element => (
  <section className="card space-y-4" data-testid={TestIds.NATIVE_ICON_BUTTON_SECTION}>
    <div>
      <h3 className="text-lg font-semibold text-text-primary">
        {FM('components.buttonShowcase.sections.iconButtons')}
      </h3>
      <p className="mt-1 text-sm text-text-secondary">
        {FM('components.buttonShowcase.sections.iconButtonsDesc')}
      </p>
    </div>
    <div className="flex flex-wrap gap-4">
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
        disabled
        ariaLabel="Settings (disabled)"
        icon={<SettingsIcon />}
        testId="native-icon-btn-disabled"
        variant={IconButtonVariant.Primary}
      />
    </div>
    <CopyableCodeSnippet code='<IconButtonNative ariaLabel="Settings" icon={<SettingsIcon />} variant={IconButtonVariant.Primary} />' />
  </section>
));

IconButtonSection.displayName = 'IconButtonSection';
