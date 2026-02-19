import { CopyableCodeSnippet } from '@/components/common';
import { ExternalLink } from '@/features/components/shared/ExternalLink';
import { FM } from '@/localization/helpers';
import { ComponentTestIds } from '@/shared/testIds.components';

const ExternalLinkShowcase = (): JSX.Element => (
  <div className="h-full overflow-y-auto p-6" data-testid={ComponentTestIds.EXTERNAL_LINK_SHOWCASE}>
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">{FM('components.externalLinkShowcase.title')}</h2>
        <p className="mt-1 text-text-secondary">{FM('components.externalLinkShowcase.description')}</p>
      </div>
      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">{FM('components.externalLinkShowcase.defaultTitle')}</h3>
        <div className="flex flex-wrap gap-6">
          <ExternalLink href="https://example.com" testId="external-link-default" text="Example Link" />
          <ExternalLink href="https://example.com/docs" testId="external-link-docs" text="Documentation" />
        </div>
        <CopyableCodeSnippet code='<ExternalLink href="https://example.com" text="Example Link" />' />
      </section>
      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">{FM('components.externalLinkShowcase.useCasesTitle')}</h3>
        <p className="text-sm text-text-secondary">{FM('components.externalLinkShowcase.useCasesDescription')}</p>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-text-secondary">{FM('components.externalLinkShowcase.docsLabel')}</span>
            <ExternalLink href="https://docs.example.com" testId="external-link-use-docs" text="View Documentation" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-text-secondary">{FM('components.externalLinkShowcase.apiLabel')}</span>
            <ExternalLink href="https://api.example.com" testId="external-link-use-api" text="API Explorer" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-text-secondary">{FM('components.externalLinkShowcase.supportLabel')}</span>
            <ExternalLink href="https://support.example.com" testId="external-link-use-support" text="Get Support" />
          </div>
        </div>
        <CopyableCodeSnippet code='<ExternalLink href="https://docs.example.com" text="View Documentation" />' />
      </section>
      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">{FM('components.externalLinkShowcase.inlineTitle')}</h3>
        <p className="text-sm text-text-secondary">
          {FM('components.externalLinkShowcase.inlinePrefix')}
          <ExternalLink href="https://example.com" testId="external-link-inline" text="our website" />
          {FM('components.externalLinkShowcase.inlineSuffix')}
        </p>
        <CopyableCodeSnippet code='Visit <ExternalLink href="https://example.com" text="our website" /> for more info.' />
      </section>
    </div>
  </div>
);

export default ExternalLinkShowcase;
