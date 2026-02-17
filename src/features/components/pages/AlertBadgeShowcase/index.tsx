import { BadgeNativeVariant as BadgeVariant } from '@/components/ui/native';
import { AlertBadge } from '@/features/components/shared/AlertBadge';
import { AlertBadgeAppearance } from '@/features/components/shared/alertBadgeAppearance';
import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';

const AlertBadgeShowcase = (): JSX.Element => (
  <div className="h-full overflow-y-auto p-6" data-testid={TestIds.ALERT_BADGE_SHOWCASE}>
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">{FM('components.alertBadgeShowcase.title')}</h2>
        <p className="mt-1 text-text-secondary">{FM('components.alertBadgeShowcase.description')}</p>
      </div>
      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">Solid Variants</h3>
        <div className="flex flex-wrap gap-3">
          <AlertBadge appearance={AlertBadgeAppearance.Solid} testId="alert-badge-success" text="Success" variant={BadgeVariant.Success} />
          <AlertBadge appearance={AlertBadgeAppearance.Solid} testId="alert-badge-warning" text="Warning" variant={BadgeVariant.Warning} />
          <AlertBadge appearance={AlertBadgeAppearance.Solid} testId="alert-badge-error" text="Error" variant={BadgeVariant.Error} />
          <AlertBadge appearance={AlertBadgeAppearance.Solid} testId="alert-badge-info" text="Info" variant={BadgeVariant.Info} />
        </div>
      </section>
      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">Outline Variants</h3>
        <div className="flex flex-wrap gap-3">
          <AlertBadge appearance={AlertBadgeAppearance.Outline} testId="alert-badge-outline-success" text="Success" variant={BadgeVariant.Success} />
          <AlertBadge appearance={AlertBadgeAppearance.Outline} testId="alert-badge-outline-warning" text="Warning" variant={BadgeVariant.Warning} />
          <AlertBadge appearance={AlertBadgeAppearance.Outline} testId="alert-badge-outline-error" text="Error" variant={BadgeVariant.Error} />
          <AlertBadge appearance={AlertBadgeAppearance.Outline} testId="alert-badge-outline-info" text="Info" variant={BadgeVariant.Info} />
        </div>
      </section>
      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">Security Alert Examples</h3>
        <div className="flex flex-wrap gap-3">
          <AlertBadge testId="alert-badge-critical" text="Critical" variant={BadgeVariant.Error} />
          <AlertBadge testId="alert-badge-high" text="High" variant={BadgeVariant.Warning} />
          <AlertBadge testId="alert-badge-medium" text="Medium" variant={BadgeVariant.Info} />
          <AlertBadge testId="alert-badge-low" text="Low" variant={BadgeVariant.Success} />
        </div>
      </section>
      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">SLA Status</h3>
        <div className="flex flex-wrap gap-3">
          <AlertBadge appearance={AlertBadgeAppearance.Outline} testId="alert-badge-sla-ok" text="Within SLA" variant={BadgeVariant.Success} />
          <AlertBadge appearance={AlertBadgeAppearance.Outline} testId="alert-badge-sla-risk" text="At Risk" variant={BadgeVariant.Error} />
          <AlertBadge appearance={AlertBadgeAppearance.Outline} testId="alert-badge-sla-breached" text="Breached" variant={BadgeVariant.Error} />
        </div>
      </section>
      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">Risk Scores</h3>
        <div className="flex flex-wrap gap-3">
          <AlertBadge testId="alert-badge-score-high" text="92" variant={BadgeVariant.Error} />
          <AlertBadge testId="alert-badge-score-med" text="65" variant={BadgeVariant.Warning} />
          <AlertBadge testId="alert-badge-score-low" text="30" variant={BadgeVariant.Success} />
        </div>
      </section>
    </div>
  </div>
);

export default AlertBadgeShowcase;
