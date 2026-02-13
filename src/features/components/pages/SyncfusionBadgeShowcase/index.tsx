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
        <h3 className="text-lg font-semibold text-text-primary">Inline Badges</h3>
        <div className="flex flex-wrap gap-3">
          <SyncfusionBadge testId="sf-badge-success" variant={BadgeVariant.Success}>Active</SyncfusionBadge>
          <SyncfusionBadge testId="sf-badge-warning" variant={BadgeVariant.Warning}>Pending</SyncfusionBadge>
          <SyncfusionBadge testId="sf-badge-error" variant={BadgeVariant.Error}>Error</SyncfusionBadge>
          <SyncfusionBadge testId="sf-badge-info" variant={BadgeVariant.Info}>Info</SyncfusionBadge>
        </div>
      </section>
      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">With Content</h3>
        <div className="flex gap-6">
          <SyncfusionBadge count={8} testId="sf-badge-count" variant={BadgeVariant.Error}>
            <span className="rounded bg-surface-elevated px-3 py-2 text-text-primary">Inbox</span>
          </SyncfusionBadge>
          <SyncfusionBadge dot testId="sf-badge-dot" variant={BadgeVariant.Success}>
            <span className="rounded bg-surface-elevated px-3 py-2 text-text-primary">Status</span>
          </SyncfusionBadge>
        </div>
      </section>
    </div>
  </div>
);

export default SyncfusionBadgeShowcase;
