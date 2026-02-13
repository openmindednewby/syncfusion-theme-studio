import SyncfusionCard from '@/components/ui/syncfusion/Card';
import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';

const SyncfusionCardShowcase = (): JSX.Element => (
  <div className="h-full overflow-y-auto p-6" data-testid={TestIds.SYNCFUSION_CARD_SHOWCASE}>
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">{FM('components.cardShowcase.syncfusionTitle')}</h2>
        <p className="mt-1 text-text-secondary">{FM('components.cardShowcase.syncfusionDescription')}</p>
      </div>
      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">Basic Card</h3>
        <div className="max-w-md">
          <SyncfusionCard testId="sf-card-basic">
            <p>This is a basic Syncfusion-styled card with default content.</p>
          </SyncfusionCard>
        </div>
      </section>
      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">With Header & Footer</h3>
        <div className="max-w-md">
          <SyncfusionCard
            footer={<span className="text-sm">Footer content</span>}
            header={<h4 className="font-semibold">Card Header</h4>}
            testId="sf-card-sections"
          >
            <p>Card body with header and footer sections.</p>
          </SyncfusionCard>
        </div>
      </section>
    </div>
  </div>
);

export default SyncfusionCardShowcase;
