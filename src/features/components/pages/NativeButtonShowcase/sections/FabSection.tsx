/**
 * FabSection - Demonstrates FabNative icon-only and extended variants.
 */
import { memo } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { FabNative } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

const PlusIcon = (): JSX.Element => (
  <svg
    fill="none"
    height="20"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const EditIcon = (): JSX.Element => (
  <svg
    fill="none"
    height="20"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

export const FabSection = memo((): JSX.Element => (
  <section className="card space-y-4" data-testid={TestIds.NATIVE_FAB_SECTION}>
    <div>
      <h3 className="text-lg font-semibold text-text-primary">
        {FM('components.buttonShowcase.sections.fab')}
      </h3>
      <p className="mt-1 text-sm text-text-secondary">
        {FM('components.buttonShowcase.sections.fabDesc')}
      </p>
    </div>
    <div className="flex flex-wrap gap-8">
      {/* Icon-only FAB */}
      <div className="relative h-40 w-40 rounded-lg border border-border bg-surface">
        <FabNative
          ariaLabel="Add item"
          className="!absolute"
          icon={<PlusIcon />}
          testId="fab-showcase-default"
        />
      </div>

      {/* Extended FAB with label */}
      <div className="relative h-40 w-56 rounded-lg border border-border bg-surface">
        <FabNative
          ariaLabel="Edit document"
          className="!absolute"
          icon={<EditIcon />}
          label={FM('components.buttonShowcase.fabEdit')}
          testId="fab-showcase-extended"
        />
      </div>
    </div>
    <CopyableCodeSnippet code='<FabNative ariaLabel="Add item" icon={<PlusIcon />} />' />
  </section>
));

FabSection.displayName = 'FabSection';
