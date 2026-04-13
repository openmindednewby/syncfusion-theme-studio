import { CopyableCodeSnippet } from '@/components/common';
import { ImagePlaceholder } from '@/features/components/shared/ImagePlaceholder';
import { FM } from '@/localization/utils/helpers';
import { ComponentTestIds } from '@/shared/testIds.components';

const SMALL_SIZE = '80px';
const MEDIUM_SIZE = '160px';
const LARGE_SIZE = '240px';
const ROUNDED_RADIUS_SM = '8px';
const ROUNDED_RADIUS_FULL = '50%';

const ImageShowcase = (): JSX.Element => (
  <div className="h-full overflow-y-auto p-6" data-testid={ComponentTestIds.IMAGE_SHOWCASE}>
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">{FM('components.imageShowcase.title')}</h2>
        <p className="mt-1 text-text-secondary">{FM('components.imageShowcase.description')}</p>
      </div>
      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">{FM('components.imageShowcase.placeholderTitle')}</h3>
        <p className="text-sm text-text-secondary">{FM('components.imageShowcase.placeholderDescription')}</p>
        <div className="flex flex-wrap gap-6">
          <ImagePlaceholder alt="Default placeholder" testId="image-placeholder-default" />
        </div>
        <CopyableCodeSnippet code='<ImagePlaceholder alt="Default placeholder" />' />
      </section>
      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">{FM('components.imageShowcase.withSourceTitle')}</h3>
        <p className="text-sm text-text-secondary">{FM('components.imageShowcase.withSourceDescription')}</p>
        <div className="flex flex-wrap gap-6">
          <ImagePlaceholder
            alt="Sample image"
            src="https://picsum.photos/160/160"
            testId="image-with-src"
          />
        </div>
        <CopyableCodeSnippet code='<ImagePlaceholder alt="Sample" src="https://picsum.photos/160/160" />' />
      </section>
      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">{FM('components.imageShowcase.sizesTitle')}</h3>
        <p className="text-sm text-text-secondary">{FM('components.imageShowcase.sizesDescription')}</p>
        <div className="flex flex-wrap items-end gap-6">
          <div className="text-center">
            <ImagePlaceholder alt="Small" height={SMALL_SIZE} testId="image-size-sm" width={SMALL_SIZE} />
            <span className="mt-1 block text-xs text-text-muted">{FM('components.imageShowcase.labelSmall')}</span>
          </div>
          <div className="text-center">
            <ImagePlaceholder alt="Medium" height={MEDIUM_SIZE} testId="image-size-md" width={MEDIUM_SIZE} />
            <span className="mt-1 block text-xs text-text-muted">{FM('components.imageShowcase.labelMedium')}</span>
          </div>
          <div className="text-center">
            <ImagePlaceholder alt="Large" height={LARGE_SIZE} testId="image-size-lg" width={LARGE_SIZE} />
            <span className="mt-1 block text-xs text-text-muted">{FM('components.imageShowcase.labelLarge')}</span>
          </div>
        </div>
        <CopyableCodeSnippet code='<ImagePlaceholder alt="Small" width="80px" height="80px" />' />
      </section>
      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">{FM('components.imageShowcase.roundedTitle')}</h3>
        <p className="text-sm text-text-secondary">{FM('components.imageShowcase.roundedDescription')}</p>
        <div className="flex flex-wrap items-end gap-6">
          <div style={{ borderRadius: ROUNDED_RADIUS_SM, overflow: 'hidden' }}>
            <ImagePlaceholder alt="Rounded" testId="image-rounded-sm" />
          </div>
          <div style={{ borderRadius: ROUNDED_RADIUS_FULL, overflow: 'hidden' }}>
            <ImagePlaceholder alt="Circle" testId="image-rounded-full" />
          </div>
        </div>
        <CopyableCodeSnippet code='<div style={{ borderRadius: "50%", overflow: "hidden" }}>\n  <ImagePlaceholder alt="Circle" />\n</div>' />
      </section>
      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">{FM('components.imageShowcase.hoverTitle')}</h3>
        <p className="text-sm text-text-secondary">{FM('components.imageShowcase.hoverDescription')}</p>
        <div className="flex flex-wrap gap-6">
          <ImagePlaceholder alt="Hover me" testId="image-hover-demo" />
          <ImagePlaceholder
            alt="Hover with image"
            src="https://picsum.photos/160/160?random=2"
            testId="image-hover-with-src"
          />
        </div>
        <CopyableCodeSnippet code='<ImagePlaceholder alt="Hover me" />' />
      </section>
    </div>
  </div>
);

export default ImageShowcase;
