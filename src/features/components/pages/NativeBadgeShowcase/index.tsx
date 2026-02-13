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
        <h3 className="text-lg font-semibold text-text-primary">Inline Badges</h3>
        <div className="flex flex-wrap gap-3">
          <BadgeNative testId="badge-success" variant={BadgeNativeVariant.Success}>Active</BadgeNative>
          <BadgeNative testId="badge-warning" variant={BadgeNativeVariant.Warning}>Pending</BadgeNative>
          <BadgeNative testId="badge-error" variant={BadgeNativeVariant.Error}>Error</BadgeNative>
          <BadgeNative testId="badge-info" variant={BadgeNativeVariant.Info}>Info</BadgeNative>
        </div>
      </section>
      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">Count Badges</h3>
        <div className="flex gap-6">
          <BadgeNative count={5} testId="badge-count-5" variant={BadgeNativeVariant.Error}>
            <span className="rounded bg-surface-elevated px-3 py-2 text-text-primary">Inbox</span>
          </BadgeNative>
          <BadgeNative count={120} testId="badge-count-120" variant={BadgeNativeVariant.Info}>
            <span className="rounded bg-surface-elevated px-3 py-2 text-text-primary">Notifications</span>
          </BadgeNative>
        </div>
      </section>
      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">Dot Badges</h3>
        <div className="flex gap-6">
          <BadgeNative dot testId="badge-dot-success" variant={BadgeNativeVariant.Success}>
            <span className="rounded bg-surface-elevated px-3 py-2 text-text-primary">Messages</span>
          </BadgeNative>
          <BadgeNative dot testId="badge-dot-error" variant={BadgeNativeVariant.Error}>
            <span className="rounded bg-surface-elevated px-3 py-2 text-text-primary">Alerts</span>
          </BadgeNative>
        </div>
      </section>
    </div>
  </div>
);

export default NativeBadgeShowcase;
