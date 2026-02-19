import { CopyableCodeSnippet } from '@/components/common';
import { TooltipNative, TooltipPlacement } from '@/components/ui/native';
import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';

const NativeTooltipShowcase = (): JSX.Element => (
  <div className="h-full overflow-y-auto p-6" data-testid={TestIds.NATIVE_TOOLTIP_SHOWCASE}>
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">{FM('components.tooltipShowcase.nativeTitle')}</h2>
        <p className="mt-1 text-text-secondary">{FM('components.tooltipShowcase.nativeDescription')}</p>
      </div>
      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">{FM('showcase.sections.placements')}</h3>
        <div className="flex flex-wrap items-center gap-6 py-8">
          <TooltipNative content="Tooltip on top" placement={TooltipPlacement.Top} testId="tooltip-top">
            <button className="rounded bg-surface-elevated px-4 py-2 text-text-primary" type="button">{FM('showcase.labels.top')}</button>
          </TooltipNative>
          <TooltipNative content="Tooltip on bottom" placement={TooltipPlacement.Bottom} testId="tooltip-bottom">
            <button className="rounded bg-surface-elevated px-4 py-2 text-text-primary" type="button">{FM('showcase.labels.bottom')}</button>
          </TooltipNative>
          <TooltipNative content="Tooltip on left" placement={TooltipPlacement.Left} testId="tooltip-left">
            <button className="rounded bg-surface-elevated px-4 py-2 text-text-primary" type="button">{FM('showcase.labels.left')}</button>
          </TooltipNative>
          <TooltipNative content="Tooltip on right" placement={TooltipPlacement.Right} testId="tooltip-right">
            <button className="rounded bg-surface-elevated px-4 py-2 text-text-primary" type="button">{FM('showcase.labels.right')}</button>
          </TooltipNative>
        </div>
        <CopyableCodeSnippet code={'<TooltipNative\n  content="Tooltip on top"\n  placement={TooltipPlacement.Top}\n>\n  <button>Hover me</button>\n</TooltipNative>'} />
      </section>
    </div>
  </div>
);

export default NativeTooltipShowcase;
