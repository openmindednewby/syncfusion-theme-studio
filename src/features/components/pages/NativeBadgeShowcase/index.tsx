import { BadgeNative, BadgeNativeVariant } from '@/components/ui/native';
import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';

const NativeBadgeShowcase = (): JSX.Element => (
  <div className="h-full overflow-y-auto p-6" data-testid={TestIds.NATIVE_BADGE_SHOWCASE}>
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">{FM('components.badgeShowcase.nativeTitle')}</h2>
        <p className="mt-1 text-text-secondary">{FM('components.badgeShowcase.nativeDescription')}</p>
      </div>
      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">{FM('showcase.sections.inlineBadges')}</h3>
        <div className="flex flex-wrap gap-3">
          <BadgeNative testId="badge-success" variant={BadgeNativeVariant.Success}>{FM('showcase.labels.active')}</BadgeNative>
          <BadgeNative testId="badge-warning" variant={BadgeNativeVariant.Warning}>{FM('showcase.labels.pending')}</BadgeNative>
          <BadgeNative testId="badge-error" variant={BadgeNativeVariant.Error}>{FM('showcase.labels.error')}</BadgeNative>
          <BadgeNative testId="badge-info" variant={BadgeNativeVariant.Info}>{FM('showcase.labels.info')}</BadgeNative>
        </div>
      </section>
      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">{FM('showcase.sections.countBadges')}</h3>
        <div className="flex gap-6">
          <BadgeNative count={5} testId="badge-count-5" variant={BadgeNativeVariant.Error}>
            <span className="rounded bg-surface-elevated px-3 py-2 text-text-primary">{FM('showcase.labels.inbox')}</span>
          </BadgeNative>
          <BadgeNative count={120} testId="badge-count-120" variant={BadgeNativeVariant.Info}>
            <span className="rounded bg-surface-elevated px-3 py-2 text-text-primary">{FM('showcase.labels.notifications')}</span>
          </BadgeNative>
        </div>
      </section>
      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">{FM('showcase.sections.dotBadges')}</h3>
        <div className="flex gap-6">
          <BadgeNative dot testId="badge-dot-success" variant={BadgeNativeVariant.Success}>
            <span className="rounded bg-surface-elevated px-3 py-2 text-text-primary">{FM('showcase.labels.messages')}</span>
          </BadgeNative>
          <BadgeNative dot testId="badge-dot-error" variant={BadgeNativeVariant.Error}>
            <span className="rounded bg-surface-elevated px-3 py-2 text-text-primary">{FM('showcase.labels.alerts')}</span>
          </BadgeNative>
        </div>
      </section>
    </div>
  </div>
);

export default NativeBadgeShowcase;
