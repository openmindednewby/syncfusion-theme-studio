import { memo } from 'react';

import { FM } from '@/localization/utils/helpers';

const PULSE_CLASS = 'animate-pulse rounded bg-border/50';

/**
 * Skeleton loader for the Theme Studio panel sections.
 *
 * Renders pulsing placeholder bars that approximate the layout of a
 * typical settings section (heading, description, input row, palette strip,
 * and additional fields). This provides better perceived performance than
 * a generic spinner by matching the shape of the real content.
 */
const ThemeStudioLoaderComponent = (): JSX.Element => (
  <div aria-label={FM('accessibility.loadingSection')} className="space-y-4" role="status">
    {/* Section heading */}
    <div className="space-y-2">
      <div className={`${PULSE_CLASS} h-4 w-32`} />
      <div className={`${PULSE_CLASS} h-3 w-48`} />
    </div>

    {/* Card with input row */}
    <div className="rounded-xl border border-border/30 p-4 space-y-3">
      <div className={`${PULSE_CLASS} h-3 w-24`} />
      <div className="flex items-center gap-3">
        <div className={`${PULSE_CLASS} h-12 w-20 rounded-lg`} />
        <div className={`${PULSE_CLASS} h-10 flex-1`} />
      </div>
    </div>

    {/* Palette strip */}
    <div className="rounded-xl border border-border/30 p-4 space-y-3">
      <div className={`${PULSE_CLASS} h-3 w-28`} />
      <div className="flex gap-1">
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} className={`${PULSE_CLASS} h-8 flex-1 rounded-md`} />
        ))}
      </div>
    </div>

    {/* Additional fields */}
    <div className="space-y-3">
      <div className={`${PULSE_CLASS} h-3 w-20`} />
      <div className={`${PULSE_CLASS} h-10 w-full`} />
      <div className={`${PULSE_CLASS} h-3 w-20`} />
      <div className={`${PULSE_CLASS} h-10 w-full`} />
    </div>
  </div>
);

export const ThemeStudioLoader = memo(ThemeStudioLoaderComponent);
