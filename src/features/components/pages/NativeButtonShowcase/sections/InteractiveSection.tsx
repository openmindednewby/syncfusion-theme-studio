/**
 * InteractiveSection - Click counter and toggle state demonstrations.
 */
import { memo, useCallback, useState } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { ButtonNative, ButtonVariant } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';

const INITIAL_COUNT = 0;

export const InteractiveSection = memo((): JSX.Element => {
  const [count, setCount] = useState(INITIAL_COUNT);
  const [isActive, setIsActive] = useState(false);

  const handleIncrement = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  const handleReset = useCallback(() => {
    setCount(INITIAL_COUNT);
  }, []);

  const handleToggle = useCallback(() => {
    setIsActive((prev) => !prev);
  }, []);

  return (
    <section className="card space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-text-primary">
          {FM('components.buttonShowcase.sections.interactive')}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          {FM('components.buttonShowcase.sections.interactiveDesc')}
        </p>
      </div>

      {/* Click counter */}
      <h4 className="font-medium text-text-primary">
        {FM('components.buttonShowcase.clickCounter')}
      </h4>
      <div className="flex items-center gap-4">
        <ButtonNative
          testId="native-btn-showcase-counter"
          variant={ButtonVariant.Primary}
          onClick={handleIncrement}
        >
          {FM('components.buttonShowcase.clickCounter')}
        </ButtonNative>
        <ButtonNative
          testId="native-btn-showcase-reset"
          variant={ButtonVariant.Outline}
          onClick={handleReset}
        >
          {FM('common.reset')}
        </ButtonNative>
        <span className="text-sm text-text-secondary" data-testid="native-btn-showcase-count">
          {FM('components.buttonShowcase.clickedTimes', String(count))}
        </span>
      </div>

      {/* Toggle state */}
      <div className="flex items-center gap-4">
        <ButtonNative
          testId="native-btn-showcase-toggle"
          variant={isActive ? ButtonVariant.Primary : ButtonVariant.Outline}
          onClick={handleToggle}
        >
          {isActive
            ? FM('components.buttonShowcase.toggleActive')
            : FM('components.buttonShowcase.toggleInactive')}
        </ButtonNative>
      </div>
      <CopyableCodeSnippet code='<ButtonNative variant={ButtonVariant.Primary} onClick={handleClick}>Click me</ButtonNative>' />
    </section>
  );
});

InteractiveSection.displayName = 'InteractiveSection';
