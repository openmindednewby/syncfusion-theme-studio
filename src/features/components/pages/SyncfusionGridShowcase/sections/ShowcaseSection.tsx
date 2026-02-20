/**
 * Reusable wrapper for each grid showcase section.
 * Provides consistent title, description, and card styling.
 */
import { memo } from 'react';

import { FM } from '@/localization/utils/helpers';

interface ShowcaseSectionProps {
  titleKey: string;
  descriptionKey: string;
  testId: string;
  children: React.ReactNode;
}

export const ShowcaseSection = memo(
  ({ titleKey, descriptionKey, testId, children }: ShowcaseSectionProps): JSX.Element => (
    <section className="card" data-testid={testId}>
      <h3 className="mb-2 text-lg font-semibold text-text-primary">{FM(titleKey)}</h3>
      <p className="mb-4 text-sm text-text-secondary">{FM(descriptionKey)}</p>
      {children}
    </section>
  ),
);

ShowcaseSection.displayName = 'ShowcaseSection';
