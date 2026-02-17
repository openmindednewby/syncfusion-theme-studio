import { ProgressBarNative, ProgressBarVariant } from '@/components/ui/native';
import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';

const NativeProgressBarShowcase = (): JSX.Element => (
  <div className="h-full overflow-y-auto p-6" data-testid={TestIds.NATIVE_PROGRESSBAR_SHOWCASE}>
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">{FM('components.progressBarShowcase.nativeTitle')}</h2>
        <p className="mt-1 text-text-secondary">{FM('components.progressBarShowcase.nativeDescription')}</p>
      </div>
      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">{FM('showcase.sections.variants')}</h3>
        <div className="space-y-3">
          <ProgressBarNative showLabel label="Default" testId="progress-default" value={60} />
          <ProgressBarNative showLabel label="Success" testId="progress-success" value={80} variant={ProgressBarVariant.Success} />
          <ProgressBarNative showLabel label="Warning" testId="progress-warning" value={45} variant={ProgressBarVariant.Warning} />
          <ProgressBarNative showLabel label="Danger" testId="progress-danger" value={20} variant={ProgressBarVariant.Danger} />
        </div>
      </section>
      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">{FM('showcase.sections.sizes')}</h3>
        <div className="space-y-3">
          <ProgressBarNative size="sm" testId="progress-sm" value={70} />
          <ProgressBarNative size="md" testId="progress-md" value={70} />
          <ProgressBarNative size="lg" testId="progress-lg" value={70} />
        </div>
      </section>
      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">{FM('showcase.sections.indeterminate')}</h3>
        <ProgressBarNative indeterminate testId="progress-indeterminate" value={0} />
      </section>
    </div>
  </div>
);

export default NativeProgressBarShowcase;
