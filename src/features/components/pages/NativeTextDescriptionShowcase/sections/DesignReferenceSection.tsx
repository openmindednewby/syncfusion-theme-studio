import { memo, type CSSProperties } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { DescriptionNative } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';

const wrappedContainerStyle: CSSProperties = {
  flex: '1 1 0',
  minWidth: 0,
};

const DEFAULT_MAX_LINES = 3;
const WRAPPED_MAX_LINES = 4;
const FIGMA_REFERENCE_BORDER_COLOR = 'rgba(123, 97, 255, 0.4)';

const containerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: '16px',
  gap: '50px',
  maxWidth: '742px',
  width: '100%',
  border: `1px dashed ${FIGMA_REFERENCE_BORDER_COLOR}`,
  borderRadius: '5px',
};

const variantRowStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  gap: '10px',
  alignSelf: 'stretch',
};

const labelStyle: CSSProperties = {
  flexShrink: 0,
  width: '56px',
  textAlign: 'right',
  fontSize: '12px',
  lineHeight: '14px',
  fontWeight: 400,
};

const CODE_SNIPPET = `<!-- Default (no wrap) -->
<DescriptionNative maxLines={3}>
  Short description text...
</DescriptionNative>

<!-- Wrapped (with inline See more) -->
<DescriptionNative maxLines={4}>
  Longer description text...
</DescriptionNative>`;

export const DesignReferenceSection = memo((): JSX.Element => (
  <section className="card space-y-4">
    <div>
      <h3 className="text-lg font-semibold text-text-primary">
        {FM('components.textDescriptionShowcase.sections.designReference')}
      </h3>
      <p className="mt-1 text-sm text-text-secondary">
        {FM('components.textDescriptionShowcase.sections.designReferenceDesc')}
      </p>
    </div>
    <div style={containerStyle}>
      {/* Default (Wrapped=false) */}
      <div style={variantRowStyle}>
        <span className="text-text-secondary" style={labelStyle}>
          {FM('components.textDescriptionShowcase.labelDefault')}
        </span>
        <DescriptionNative maxLines={DEFAULT_MAX_LINES} style={wrappedContainerStyle} testId="desc-figma-default">
          {FM('components.textDescriptionShowcase.specDefaultText')}
        </DescriptionNative>
      </div>

      {/* Wrapped (Wrapped=true) — inline See more */}
      <div style={variantRowStyle}>
        <span className="text-text-secondary" style={labelStyle}>
          {FM('components.textDescriptionShowcase.labelWrapped')}
        </span>
        <div style={wrappedContainerStyle}>
          <DescriptionNative maxLines={WRAPPED_MAX_LINES} testId="desc-figma-wrapped">
            {FM('components.textDescriptionShowcase.specWrappedText')}
          </DescriptionNative>
        </div>
      </div>
    </div>
    <CopyableCodeSnippet code={CODE_SNIPPET} />
  </section>
));

DesignReferenceSection.displayName = 'DesignReferenceSection';
