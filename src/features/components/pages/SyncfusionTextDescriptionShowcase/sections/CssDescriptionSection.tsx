import { memo } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { FM } from '@/localization/helpers';

export const CssDescriptionSection = memo((): JSX.Element => (
  <section className="card space-y-4">
    <div>
      <h3 className="text-lg font-semibold text-text-primary">
        {FM('components.textDescriptionShowcase.sections.cssDescription')}
      </h3>
      <p className="mt-1 text-sm text-text-secondary">
        {FM('components.textDescriptionShowcase.sections.cssDescriptionDesc')}
      </p>
    </div>
    <div className="space-y-4">
      <p
        data-testid="sf-css-desc-raw"
        style={{
          fontSize: 'var(--component-text-description-font-size)',
          fontWeight: 'var(--component-text-description-font-weight)',
          fontFamily: 'var(--component-text-description-font-family)',
          lineHeight: 'var(--component-text-description-line-height)',
          letterSpacing: 'var(--component-text-description-letter-spacing)',
          color: 'var(--component-text-description-color)',
        }}
      >
        {FM('components.textDescriptionShowcase.standalone')}
      </p>
      <div className="rounded bg-surface-secondary p-3">
        <code className="text-xs text-text-muted">
          {FM('components.textDescriptionShowcase.cssCodeSample')}
        </code>
      </div>
    </div>
    <CopyableCodeSnippet code='<p style={{ fontSize: "var(--component-text-description-font-size)" }}>Description text</p>' />
  </section>
));

CssDescriptionSection.displayName = 'CssDescriptionSection';
