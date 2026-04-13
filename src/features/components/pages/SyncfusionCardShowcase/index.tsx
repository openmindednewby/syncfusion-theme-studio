import { CopyableCodeSnippet } from '@/components/common';
import SyncfusionCard from '@/components/ui/syncfusion/Card';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

const SyncfusionCardShowcase = (): JSX.Element => (
  <div className="h-full overflow-y-auto p-6" data-testid={TestIds.SYNCFUSION_CARD_SHOWCASE}>
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">{FM('components.cardShowcase.syncfusionTitle')}</h2>
        <p className="mt-1 text-text-secondary">{FM('components.cardShowcase.syncfusionDescription')}</p>
      </div>
      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">{FM('showcase.sections.basicCard')}</h3>
        <div className="max-w-md">
          <SyncfusionCard testId="sf-card-basic">
            <p>{FM('showcase.content.basicCardContent')}</p>
          </SyncfusionCard>
        </div>
        <CopyableCodeSnippet code='<SyncfusionCard><p>Card content</p></SyncfusionCard>' />
      </section>
      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">{FM('showcase.sections.withHeaderFooter')}</h3>
        <div className="max-w-md">
          <SyncfusionCard
            footer={<span className="text-sm">{FM('showcase.content.footerContent')}</span>}
            header={<h4 className="font-semibold">{FM('showcase.content.cardHeader')}</h4>}
            testId="sf-card-sections"
          >
            <p>{FM('showcase.content.cardWithSections')}</p>
          </SyncfusionCard>
        </div>
        <CopyableCodeSnippet code='<SyncfusionCard header={<h4>Title</h4>} footer={<span>Footer</span>}><p>Content</p></SyncfusionCard>' />
      </section>
    </div>
  </div>
);

export default SyncfusionCardShowcase;
