import { memo } from 'react';
import type { CSSProperties } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { FM } from '@/localization/utils/helpers';

import { TYPESCALE_ROWS } from '../data/typescaleData';


interface TypescaleTableProps {
  fontWeight: number;
  fontStyle?: string;
  componentName: string;
}

function buildSnippet(componentName: string, sizeEnum: string): string {
  return `<${componentName} size={TypographySize.${sizeEnum}}>Text</${componentName}>`;
}

const HEADER_CLASS = 'text-xs font-medium uppercase tracking-wide text-text-muted';
const CELL_CLASS = 'py-2 text-sm text-text-secondary';

export const TypescaleTable = memo(({ fontWeight, fontStyle = 'normal', componentName }: TypescaleTableProps): JSX.Element => (
  <div className="overflow-x-auto">
    <table className="w-full text-left">
      <thead>
        <tr className="border-b border-border-default">
          <th className={`${HEADER_CLASS} w-1/5 pb-2`}>{FM('components.typographyShowcase.headerSample')}</th>
          <th className={`${HEADER_CLASS} w-16 pb-2`}>{FM('components.typographyShowcase.headerSize')}</th>
          <th className={`${HEADER_CLASS} w-20 pb-2`}>{FM('components.typographyShowcase.headerRem')}</th>
          <th className={`${HEADER_CLASS} w-28 pb-2`}>{FM('components.typographyShowcase.headerCssVariable')}</th>
          <th className={`${HEADER_CLASS} pb-2`}>{FM('components.typographyShowcase.headerComponent')}</th>
        </tr>
      </thead>
      <tbody>
        {TYPESCALE_ROWS.map((row) => {
          const sampleStyle: CSSProperties = {
            fontSize: row.fontSize,
            lineHeight: row.lineHeight,
            fontWeight,
            fontStyle,
            fontFamily: "'Fira Sans', sans-serif",
          };

          return (
            <tr key={row.cssVar} className="border-b border-border-subtle">
              <td className="py-3">
                <span className="text-text-primary" style={sampleStyle}>
                  {FM('components.typographyShowcase.sampleText')}
                </span>
              </td>
              <td className={CELL_CLASS}>{row.sizePx}</td>
              <td className={CELL_CLASS}>{row.sizeRem}</td>
              <td className={CELL_CLASS}>
                <code className="rounded bg-bg-surface-sunken px-1.5 py-0.5 font-mono text-xs text-text-secondary">
                  {row.cssVar}
                </code>
              </td>
              <td className="py-2">
                <CopyableCodeSnippet code={buildSnippet(componentName, row.sizeEnum)} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
));

TypescaleTable.displayName = 'TypescaleTable';
