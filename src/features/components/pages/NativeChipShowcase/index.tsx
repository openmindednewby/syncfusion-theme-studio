import { TagNative, TagVariant } from '@/components/ui/native';
import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';

const NativeChipShowcase = (): JSX.Element => (
  <div className="h-full overflow-y-auto p-6" data-testid={TestIds.NATIVE_CHIP_SHOWCASE}>
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">{FM('components.chipShowcase.nativeTitle')}</h2>
        <p className="mt-1 text-text-secondary">{FM('components.chipShowcase.nativeDescription')}</p>
      </div>
      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">{FM('showcase.sections.variants')}</h3>
        <div className="flex flex-wrap gap-2">
          <TagNative label="Default" testId="chip-default" />
          <TagNative label="Primary" testId="chip-primary" variant={TagVariant.Primary} />
          <TagNative label="Success" testId="chip-success" variant={TagVariant.Success} />
          <TagNative label="Warning" testId="chip-warning" variant={TagVariant.Warning} />
          <TagNative label="Danger" testId="chip-danger" variant={TagVariant.Danger} />
        </div>
      </section>
      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">{FM('showcase.sections.removable')}</h3>
        <div className="flex flex-wrap gap-2">
          <TagNative removable label="React" testId="chip-removable-1" variant={TagVariant.Primary} />
          <TagNative removable label="TypeScript" testId="chip-removable-2" variant={TagVariant.Success} />
          <TagNative removable label="Tailwind" testId="chip-removable-3" />
        </div>
      </section>
      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">{FM('showcase.sections.sizes')}</h3>
        <div className="flex flex-wrap items-center gap-2">
          <TagNative label="Small" size="sm" testId="chip-sm" variant={TagVariant.Primary} />
          <TagNative label="Medium" testId="chip-md" variant={TagVariant.Primary} />
        </div>
      </section>
      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">{FM('showcase.sections.withIcons')}</h3>
        <div className="flex flex-wrap gap-2">
          <TagNative
            icon={<svg aria-hidden="true" className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} /></svg>}
            label="Approved"
            testId="chip-icon-1"
            variant={TagVariant.Success}
          />
          <TagNative
            icon={<svg aria-hidden="true" className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} /></svg>}
            label="Pending"
            testId="chip-icon-2"
            variant={TagVariant.Warning}
          />
        </div>
      </section>
    </div>
  </div>
);

export default NativeChipShowcase;
