import { CopyableCodeSnippet } from '@/components/common';
import SyncfusionTooltip, { TooltipPlacement } from '@/components/ui/syncfusion/Tooltip';
import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';

const SyncfusionTooltipShowcase = (): JSX.Element => (
  <div className="h-full overflow-y-auto p-6" data-testid={TestIds.SYNCFUSION_TOOLTIP_SHOWCASE}>
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">{FM('components.tooltipShowcase.syncfusionTitle')}</h2>
        <p className="mt-1 text-text-secondary">{FM('components.tooltipShowcase.syncfusionDescription')}</p>
      </div>
      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">{FM('showcase.sections.positions')}</h3>
        <div className="flex flex-wrap items-center gap-6 py-8">
          <SyncfusionTooltip content="Top tooltip" placement={TooltipPlacement.Top} testId="sf-tooltip-top">
            <button className="rounded bg-surface-elevated px-4 py-2 text-text-primary" type="button">{FM('showcase.labels.top')}</button>
          </SyncfusionTooltip>
          <SyncfusionTooltip content="Bottom tooltip" placement={TooltipPlacement.Bottom} testId="sf-tooltip-bottom">
            <button className="rounded bg-surface-elevated px-4 py-2 text-text-primary" type="button">{FM('showcase.labels.bottom')}</button>
          </SyncfusionTooltip>
          <SyncfusionTooltip content="Left tooltip" placement={TooltipPlacement.Left} testId="sf-tooltip-left">
            <button className="rounded bg-surface-elevated px-4 py-2 text-text-primary" type="button">{FM('showcase.labels.left')}</button>
          </SyncfusionTooltip>
          <SyncfusionTooltip content="Right tooltip" placement={TooltipPlacement.Right} testId="sf-tooltip-right">
            <button className="rounded bg-surface-elevated px-4 py-2 text-text-primary" type="button">{FM('showcase.labels.right')}</button>
          </SyncfusionTooltip>
        </div>
        <CopyableCodeSnippet code='<SyncfusionTooltip content="Tooltip text" placement={TooltipPlacement.Top}><button>Hover me</button></SyncfusionTooltip>' />
      </section>
    </div>
  </div>
);

export default SyncfusionTooltipShowcase;
