import SyncfusionProgressBar, { ProgressBarVariant } from '@/components/ui/syncfusion/ProgressBar';
import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';

const SyncfusionProgressBarShowcase = (): JSX.Element => (
  <div className="h-full overflow-y-auto p-6" data-testid={TestIds.SYNCFUSION_PROGRESSBAR_SHOWCASE}>
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">{FM('components.progressBarShowcase.syncfusionTitle')}</h2>
        <p className="mt-1 text-text-secondary">{FM('components.progressBarShowcase.syncfusionDescription')}</p>
      </div>
      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">{FM('showcase.sections.variants')}</h3>
        <div className="space-y-3">
          <SyncfusionProgressBar showLabel testId="sf-progress-default" value={60} />
          <SyncfusionProgressBar showLabel testId="sf-progress-success" value={80} variant={ProgressBarVariant.Success} />
          <SyncfusionProgressBar showLabel testId="sf-progress-warning" value={45} variant={ProgressBarVariant.Warning} />
          <SyncfusionProgressBar showLabel testId="sf-progress-danger" value={20} variant={ProgressBarVariant.Danger} />
        </div>
      </section>
    </div>
  </div>
);

export default SyncfusionProgressBarShowcase;
