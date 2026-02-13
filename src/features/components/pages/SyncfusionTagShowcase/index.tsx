import SyncfusionTag, { TagVariant } from '@/components/ui/syncfusion/Tag';
import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';

const SyncfusionTagShowcase = (): JSX.Element => (
  <div className="h-full overflow-y-auto p-6" data-testid={TestIds.SYNCFUSION_TAG_SHOWCASE}>
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">{FM('components.tagShowcase.syncfusionTitle')}</h2>
        <p className="mt-1 text-text-secondary">{FM('components.tagShowcase.syncfusionDescription')}</p>
      </div>
      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">Variants</h3>
        <div className="flex flex-wrap gap-2">
          <SyncfusionTag label="Default" testId="sf-tag-default" />
          <SyncfusionTag label="Primary" testId="sf-tag-primary" variant={TagVariant.Primary} />
          <SyncfusionTag label="Success" testId="sf-tag-success" variant={TagVariant.Success} />
          <SyncfusionTag label="Warning" testId="sf-tag-warning" variant={TagVariant.Warning} />
          <SyncfusionTag label="Danger" testId="sf-tag-danger" variant={TagVariant.Danger} />
        </div>
      </section>
      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">Removable</h3>
        <div className="flex flex-wrap gap-2">
          <SyncfusionTag removable label="JavaScript" testId="sf-tag-removable-1" variant={TagVariant.Primary} />
          <SyncfusionTag removable label="React" testId="sf-tag-removable-2" variant={TagVariant.Success} />
          <SyncfusionTag removable label="Node.js" testId="sf-tag-removable-3" />
        </div>
      </section>
    </div>
  </div>
);

export default SyncfusionTagShowcase;
