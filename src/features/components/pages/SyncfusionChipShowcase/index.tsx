import SyncfusionTag, { TagVariant } from '@/components/ui/syncfusion/Tag';
import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';

const SyncfusionChipShowcase = (): JSX.Element => (
  <div className="h-full overflow-y-auto p-6" data-testid={TestIds.SYNCFUSION_CHIP_SHOWCASE}>
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">{FM('components.chipShowcase.syncfusionTitle')}</h2>
        <p className="mt-1 text-text-secondary">{FM('components.chipShowcase.syncfusionDescription')}</p>
      </div>
      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">Variants</h3>
        <div className="flex flex-wrap gap-2">
          <SyncfusionTag label="Default" testId="sf-chip-default" />
          <SyncfusionTag label="Primary" testId="sf-chip-primary" variant={TagVariant.Primary} />
          <SyncfusionTag label="Success" testId="sf-chip-success" variant={TagVariant.Success} />
          <SyncfusionTag label="Warning" testId="sf-chip-warning" variant={TagVariant.Warning} />
          <SyncfusionTag label="Danger" testId="sf-chip-danger" variant={TagVariant.Danger} />
        </div>
      </section>
      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">Removable</h3>
        <div className="flex flex-wrap gap-2">
          <SyncfusionTag removable label="JavaScript" testId="sf-chip-removable-1" variant={TagVariant.Primary} />
          <SyncfusionTag removable label="React" testId="sf-chip-removable-2" variant={TagVariant.Success} />
          <SyncfusionTag removable label="Node.js" testId="sf-chip-removable-3" />
        </div>
      </section>
      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">Sizes</h3>
        <div className="flex flex-wrap items-center gap-2">
          <SyncfusionTag label="Small" size="sm" testId="sf-chip-sm" variant={TagVariant.Primary} />
          <SyncfusionTag label="Medium" testId="sf-chip-md" variant={TagVariant.Primary} />
        </div>
      </section>
    </div>
  </div>
);

export default SyncfusionChipShowcase;
