import { TagNative, TagVariant } from '@/components/ui/native';
import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';

const NativeTagShowcase = (): JSX.Element => (
  <div className="h-full overflow-y-auto p-6" data-testid={TestIds.NATIVE_TAG_SHOWCASE}>
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">{FM('components.tagShowcase.nativeTitle')}</h2>
        <p className="mt-1 text-text-secondary">{FM('components.tagShowcase.nativeDescription')}</p>
      </div>
      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">Variants</h3>
        <div className="flex flex-wrap gap-2">
          <TagNative label="Default" testId="tag-default" />
          <TagNative label="Primary" testId="tag-primary" variant={TagVariant.Primary} />
          <TagNative label="Success" testId="tag-success" variant={TagVariant.Success} />
          <TagNative label="Warning" testId="tag-warning" variant={TagVariant.Warning} />
          <TagNative label="Danger" testId="tag-danger" variant={TagVariant.Danger} />
        </div>
      </section>
      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">Removable Tags</h3>
        <div className="flex flex-wrap gap-2">
          <TagNative removable label="React" testId="tag-removable-1" variant={TagVariant.Primary} />
          <TagNative removable label="TypeScript" testId="tag-removable-2" variant={TagVariant.Success} />
          <TagNative removable label="Tailwind" testId="tag-removable-3" />
        </div>
      </section>
      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">Sizes</h3>
        <div className="flex flex-wrap items-center gap-2">
          <TagNative label="Small" size="sm" testId="tag-sm" variant={TagVariant.Primary} />
          <TagNative label="Medium" testId="tag-md" variant={TagVariant.Primary} />
        </div>
      </section>
    </div>
  </div>
);

export default NativeTagShowcase;
