/**
 * IconsSection - Demonstrates ButtonNative left and right icon slots.
 */
import { memo } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { ButtonNative, ButtonVariant } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

const ArrowIcon = (): JSX.Element => (
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
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const PlusIcon = (): JSX.Element => (
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
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const IconsSection = memo((): JSX.Element => (
  <section className="card space-y-4" data-testid={TestIds.NATIVE_ICONS_SECTION}>
    <div>
      <h3 className="text-lg font-semibold text-text-primary">
        {FM('components.buttonShowcase.sections.icons')}
      </h3>
      <p className="mt-1 text-sm text-text-secondary">
        {FM('components.buttonShowcase.sections.iconsDesc')}
      </p>
    </div>
    <div className="flex flex-wrap gap-4">
      <ButtonNative
        leftIcon={<PlusIcon />}
        testId="native-btn-left-icon"
        variant={ButtonVariant.Primary}
      >
        {FM('components.buttonShowcase.withLeftIcon')}
      </ButtonNative>
      <ButtonNative
        rightIcon={<ArrowIcon />}
        testId="native-btn-right-icon"
        variant={ButtonVariant.Primary}
      >
        {FM('components.buttonShowcase.withRightIcon')}
      </ButtonNative>
      <ButtonNative
        leftIcon={<PlusIcon />}
        rightIcon={<ArrowIcon />}
        testId="native-btn-both-icons"
        variant={ButtonVariant.Primary}
      >
        {FM('components.buttonShowcase.withIcons')}
      </ButtonNative>
    </div>
    <CopyableCodeSnippet code="<ButtonNative leftIcon={<PlusIcon />} variant={ButtonVariant.Primary}>Label</ButtonNative>" />
  </section>
));

IconsSection.displayName = 'IconsSection';
