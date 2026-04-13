import { CopyableCodeSnippet } from '@/components/common';
import { SkeletonLoaderNative, SkeletonVariant } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';
import { ComponentTestIds } from '@/shared/testIds.components';

const LABEL_CIRCLE = 'circle';
const LABEL_SQUARE = 'square';
const LABEL_TEXT = 'text';

const DEFAULT_SNIPPET = '<SkeletonLoaderNative />';
const CIRCLE_SNIPPET = '<SkeletonLoaderNative variant={SkeletonVariant.Circle} />';
const SQUARE_SNIPPET = '<SkeletonLoaderNative variant={SkeletonVariant.Square} />';
const PARAGRAPH_SNIPPET = '<SkeletonLoaderNative variant={SkeletonVariant.Paragraph} />';
const SIZES_SNIPPET = `<SkeletonLoaderNative variant={SkeletonVariant.Circle} width="32px" height="32px" />
<SkeletonLoaderNative variant={SkeletonVariant.Circle} width="48px" height="48px" />
<SkeletonLoaderNative variant={SkeletonVariant.Circle} width="64px" height="64px" />`;

const NativeSkeletonLoaderShowcase = (): JSX.Element => (
  <div className="h-full overflow-y-auto p-6" data-testid={ComponentTestIds.NATIVE_SKELETONLOADER_SHOWCASE}>
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">
          {FM('components.skeletonLoaderShowcase.nativeTitle')}
        </h2>
        <p className="mt-1 text-text-secondary">
          {FM('components.skeletonLoaderShowcase.nativeDescription')}
        </p>
      </div>

      <section className="card space-y-6">
        <h3 className="text-lg font-semibold text-text-primary">
          {FM('showcase.sections.defaultSkeleton')}
        </h3>
        <div className="flex flex-col gap-4" style={{ maxWidth: '320px' }}>
          <SkeletonLoaderNative />
        </div>
        <CopyableCodeSnippet code={DEFAULT_SNIPPET} />
      </section>

      <section className="card space-y-6">
        <h3 className="text-lg font-semibold text-text-primary">
          {FM('showcase.sections.allVariants')}
        </h3>
        <div className="flex items-start gap-8">
          <div className="flex flex-col items-center gap-2">
            <SkeletonLoaderNative variant={SkeletonVariant.Circle} />
            <span className="text-xs text-text-secondary">{LABEL_CIRCLE}</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <SkeletonLoaderNative variant={SkeletonVariant.Square} />
            <span className="text-xs text-text-secondary">{LABEL_SQUARE}</span>
          </div>
          <div className="flex flex-col items-center gap-2" style={{ width: '120px' }}>
            <SkeletonLoaderNative variant={SkeletonVariant.Text} />
            <span className="text-xs text-text-secondary">{LABEL_TEXT}</span>
          </div>
        </div>
        <CopyableCodeSnippet code={CIRCLE_SNIPPET} />
        <CopyableCodeSnippet code={SQUARE_SNIPPET} />
      </section>

      <section className="card space-y-6">
        <h3 className="text-lg font-semibold text-text-primary">
          {FM('showcase.sections.sizeVariations')}
        </h3>
        <div className="flex items-center gap-8">
          <SkeletonLoaderNative height="32px" variant={SkeletonVariant.Circle} width="32px" />
          <SkeletonLoaderNative height="48px" variant={SkeletonVariant.Circle} width="48px" />
          <SkeletonLoaderNative height="64px" variant={SkeletonVariant.Circle} width="64px" />
        </div>
        <CopyableCodeSnippet code={SIZES_SNIPPET} />
      </section>

      <section className="card space-y-6">
        <h3 className="text-lg font-semibold text-text-primary">
          {FM('showcase.sections.paragraphSkeleton')}
        </h3>
        <div style={{ maxWidth: '320px' }}>
          <SkeletonLoaderNative variant={SkeletonVariant.Paragraph} />
        </div>
        <CopyableCodeSnippet code={PARAGRAPH_SNIPPET} />
      </section>
    </div>
  </div>
);

export default NativeSkeletonLoaderShowcase;
