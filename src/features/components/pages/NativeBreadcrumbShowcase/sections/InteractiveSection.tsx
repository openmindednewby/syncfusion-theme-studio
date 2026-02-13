/**
 * InteractiveSection demonstrates dynamic breadcrumbs with click handlers.
 * Users can click breadcrumb items and a status badge shows the navigation target.
 * Also demonstrates building breadcrumb trails from a selectable path depth.
 */
import { memo, useCallback, useMemo, useState } from 'react';

import { BreadcrumbNative } from '@/components/ui/native';
import type { BreadcrumbItem } from '@/components/ui/native';
import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';
import { isValueDefined } from '@/utils/is';

const FULL_PATH_SEGMENTS = [
  { text: FM('components.nativeBreadcrumb.home'), url: '/' },
  { text: FM('components.breadcrumbShowcase.dashboard'), url: '/dashboard' },
  { text: FM('components.breadcrumbShowcase.analytics'), url: '/analytics' },
  { text: FM('components.breadcrumbShowcase.reports'), url: '/reports' },
  { text: FM('components.breadcrumbShowcase.monthly') },
];

const MIN_DEPTH = 2;
const DEPTH_BUTTON_STYLE = 'rounded-md border px-3 py-1.5 text-sm font-medium transition-colors';
const ACTIVE_DEPTH_STYLE = 'border-primary-500 bg-primary-500 text-white';
const INACTIVE_DEPTH_STYLE = 'border-border bg-surface text-text-secondary hover:bg-surface-hover';

function buildTrail(depth: number): BreadcrumbItem[] {
  const trail = FULL_PATH_SEGMENTS.slice(0, depth);
  return trail.map((segment, index) => {
    const isLast = index === trail.length - 1;
    if (isLast) return { text: segment.text };

    const item: BreadcrumbItem = { text: segment.text };
    if (isValueDefined(segment.url)) item.url = segment.url;
    return item;
  });
}

const InteractiveBreadcrumb = memo((): JSX.Element => {
  const [navigatedTo, setNavigatedTo] = useState<string | null>(null);
  const [depth, setDepth] = useState(FULL_PATH_SEGMENTS.length);

  const items = useMemo(() => buildTrail(depth), [depth]);

  const handleItemClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target;
    if (!(target instanceof HTMLElement)) return;

    const anchor = target.closest('a');
    if (!anchor) return;

    e.preventDefault();
    const label = anchor.textContent;
    if (isValueDefined(label)) setNavigatedTo(label);
  }, []);

  const statusText = isValueDefined(navigatedTo)
    ? FM('components.breadcrumbShowcase.navigatedTo', navigatedTo)
    : FM('components.breadcrumbShowcase.noneNavigated');

  const depthButtons = useMemo(
    () =>
      FULL_PATH_SEGMENTS.map((_segment, index) => {
        const segmentDepth = index + MIN_DEPTH;
        if (segmentDepth > FULL_PATH_SEGMENTS.length) return null;

        return (
          <button
            key={segmentDepth}
            className={`${DEPTH_BUTTON_STYLE} ${
              depth === segmentDepth ? ACTIVE_DEPTH_STYLE : INACTIVE_DEPTH_STYLE
            }`}
            data-testid={`breadcrumb-depth-${String(segmentDepth)}`}
            type="button"
            onClick={() => setDepth(segmentDepth)}
          >
            {String(segmentDepth)}
          </button>
        );
      }),
    [depth],
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-text-secondary">
          {FM('components.breadcrumbShowcase.fiveItems')}
        </span>
        {depthButtons}
      </div>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div onClick={handleItemClick}>
        <BreadcrumbNative
          ariaLabel={FM('components.breadcrumbShowcase.ariaLabel')}
          items={items}
          testId="breadcrumb-interactive"
        />
      </div>
      <div
        className="rounded-md border border-border bg-surface-variant px-4 py-2.5 text-sm"
        data-testid={TestIds.NATIVE_BREADCRUMB_NAV_STATUS}
      >
        {statusText}
      </div>
    </div>
  );
});

InteractiveBreadcrumb.displayName = 'InteractiveBreadcrumb';

export const InteractiveSection = memo((): JSX.Element => (
  <section className="card space-y-4" data-testid={TestIds.NATIVE_BREADCRUMB_INTERACTIVE}>
    <div>
      <h3 className="text-lg font-semibold text-text-primary">
        {FM('components.breadcrumbShowcase.sections.interactive')}
      </h3>
      <p className="mt-1 text-sm text-text-secondary">
        {FM('components.breadcrumbShowcase.sections.interactiveDesc')}
      </p>
    </div>
    <InteractiveBreadcrumb />
  </section>
));

InteractiveSection.displayName = 'InteractiveSection';
