import { CopyableCodeSnippet } from '@/components/common';
import { LoaderNative, LoaderSize } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';
import { ComponentTestIds } from '@/shared/testIds.components';

const LockIcon = (): JSX.Element => (
  <svg fill="none" height="1em" stroke="currentColor" strokeLinecap="round"
    strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="1em"
  >
    <rect height="11" rx="2" ry="2" width="18" x="3" y="11" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const DEFAULT_SNIPPET = '<LoaderNative />';
const SIZES_SNIPPET = `<LoaderNative size={LoaderSize.Sm} />
<LoaderNative size={LoaderSize.Md} />
<LoaderNative size={LoaderSize.Lg} />`;
const ICON_SNIPPET = '<LoaderNative icon={<LockIcon />} />';

const LABEL_SM = 'sm';
const LABEL_MD = 'md';
const LABEL_LG = 'lg';

const NativeLoaderShowcase = (): JSX.Element => (
  <div className="h-full overflow-y-auto p-6" data-testid={ComponentTestIds.NATIVE_LOADER_SHOWCASE}>
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">
          {FM('components.loaderShowcase.nativeTitle')}
        </h2>
        <p className="mt-1 text-text-secondary">
          {FM('components.loaderShowcase.nativeDescription')}
        </p>
      </div>

      <section className="card space-y-6">
        <h3 className="text-lg font-semibold text-text-primary">
          {FM('showcase.sections.defaultLoader')}
        </h3>
        <div className="flex items-center gap-6">
          <LoaderNative />
        </div>
        <CopyableCodeSnippet code={DEFAULT_SNIPPET} />
      </section>

      <section className="card space-y-6">
        <h3 className="text-lg font-semibold text-text-primary">
          {FM('showcase.sections.sizePresets')}
        </h3>
        <div className="flex items-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <LoaderNative size={LoaderSize.Sm} />
            <span className="text-xs text-text-secondary">{LABEL_SM}</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <LoaderNative size={LoaderSize.Md} />
            <span className="text-xs text-text-secondary">{LABEL_MD}</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <LoaderNative size={LoaderSize.Lg} />
            <span className="text-xs text-text-secondary">{LABEL_LG}</span>
          </div>
        </div>
        <CopyableCodeSnippet code={SIZES_SNIPPET} />
      </section>

      <section className="card space-y-6">
        <h3 className="text-lg font-semibold text-text-primary">
          {FM('showcase.sections.withCenterIcon')}
        </h3>
        <div className="flex items-center gap-8">
          <LoaderNative icon={<LockIcon />} />
          <LoaderNative icon={<LockIcon />} size={LoaderSize.Lg} />
        </div>
        <CopyableCodeSnippet code={ICON_SNIPPET} />
      </section>
    </div>
  </div>
);

export default NativeLoaderShowcase;
