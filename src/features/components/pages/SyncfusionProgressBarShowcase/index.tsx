import { SfProgressBarShape, SyncfusionProgressBar, SyncfusionProgressRing } from '@/components/ui/syncfusion';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

const PERCENT_100 = 100;
const PERCENT_75 = 75;
const PERCENT_50 = 50;
const PERCENT_25 = 25;
const PERCENT_0 = 0;
const PERCENT_33 = 33;
const PERCENT_66 = 66;

const BAR_VALUES = [PERCENT_100, PERCENT_75, PERCENT_50, PERCENT_25, PERCENT_0] as const;
const RING_VALUES = [PERCENT_0, PERCENT_33, PERCENT_66, PERCENT_100] as const;

const LABEL_STYLE = {
  fontFamily: 'Fira Sans, sans-serif',
  fontSize: '12px',
  color: 'var(--component-progress-text)',
} as const;

const SyncfusionProgressBarShowcase = (): JSX.Element => (
  <div className="h-full overflow-y-auto p-6" data-testid={TestIds.SYNCFUSION_PROGRESSBAR_SHOWCASE}>
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">{FM('components.progressBarShowcase.syncfusionTitle')}</h2>
        <p className="mt-1 text-text-secondary">{FM('components.progressBarShowcase.syncfusionDescription')}</p>
      </div>

      <section className="card space-y-6">
        <h3 className="text-lg font-semibold text-text-primary">{FM('showcase.sections.progressBar')}</h3>
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-text-secondary">{FM('showcase.sections.sharp')}</h4>
            {BAR_VALUES.map((v) => (
              <div key={`sharp-${v}`} className="space-y-1">
                <SyncfusionProgressBar shape={SfProgressBarShape.Sharp} size="sm" testId={`sf-progress-sharp-${v}`} value={v} />
                <span style={LABEL_STYLE}>{v}%</span>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-text-secondary">{FM('showcase.sections.rounded')}</h4>
            {BAR_VALUES.map((v) => (
              <div key={`rounded-${v}`} className="space-y-1">
                <SyncfusionProgressBar shape={SfProgressBarShape.Rounded} size="sm" testId={`sf-progress-rounded-${v}`} value={v} />
                <span style={LABEL_STYLE}>{v}%</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="card space-y-6">
        <h3 className="text-lg font-semibold text-text-primary">{FM('showcase.sections.progressRing')}</h3>
        <div className="flex items-end gap-8">
          {RING_VALUES.map((v) => (
            <div key={`ring-${v}`} className="flex flex-col items-center gap-2">
              <SyncfusionProgressRing testId={`sf-progressring-${v}`} value={v} />
              <span style={LABEL_STYLE}>{v}%</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  </div>
);

export default SyncfusionProgressBarShowcase;
