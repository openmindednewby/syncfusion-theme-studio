import { CopyableCodeSnippet } from '@/components/common';
import SyncfusionBadge, { BadgeVariant } from '@/components/ui/syncfusion/Badge';
import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';

const SyncfusionBadgeShowcase = (): JSX.Element => (
  <div className="h-full overflow-y-auto p-6" data-testid={TestIds.SYNCFUSION_BADGE_SHOWCASE}>
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">{FM('components.badgeShowcase.syncfusionTitle')}</h2>
        <p className="mt-1 text-text-secondary">{FM('components.badgeShowcase.syncfusionDescription')}</p>
      </div>
      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">{FM('showcase.sections.inlineBadges')}</h3>
        <div className="flex flex-wrap gap-3">
          <SyncfusionBadge testId="sf-badge-success" variant={BadgeVariant.Success}>{FM('showcase.labels.active')}</SyncfusionBadge>
          <SyncfusionBadge testId="sf-badge-warning" variant={BadgeVariant.Warning}>{FM('showcase.labels.pending')}</SyncfusionBadge>
          <SyncfusionBadge testId="sf-badge-error" variant={BadgeVariant.Error}>{FM('showcase.labels.error')}</SyncfusionBadge>
          <SyncfusionBadge testId="sf-badge-info" variant={BadgeVariant.Info}>{FM('showcase.labels.info')}</SyncfusionBadge>
        </div>
        <CopyableCodeSnippet code='<SyncfusionBadge variant={BadgeVariant.Success}>Active</SyncfusionBadge>' />
      </section>
      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">{FM('showcase.sections.withContent')}</h3>
        <div className="flex gap-6">
          <SyncfusionBadge count={8} testId="sf-badge-count" variant={BadgeVariant.Error}>
            <span className="rounded bg-surface-elevated px-3 py-2 text-text-primary">{FM('showcase.labels.inbox')}</span>
          </SyncfusionBadge>
          <SyncfusionBadge dot testId="sf-badge-dot" variant={BadgeVariant.Success}>
            <span className="rounded bg-surface-elevated px-3 py-2 text-text-primary">{FM('showcase.labels.status')}</span>
          </SyncfusionBadge>
        </div>
        <CopyableCodeSnippet code='<SyncfusionBadge count={8} variant={BadgeVariant.Error}><span>Inbox</span></SyncfusionBadge>' />
      </section>
    </div>
  </div>
);

export default SyncfusionBadgeShowcase;
