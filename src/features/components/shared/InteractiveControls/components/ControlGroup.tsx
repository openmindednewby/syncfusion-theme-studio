/**
 * ControlGroup - Fieldset wrapper with a legend label for
 * grouping related playground controls.
 * Optionally renders a code-hint button that shows the full
 * section configuration snippet on hover and copies on click.
 */
import { memo } from 'react';

import { FM } from '@/localization/utils/helpers';
import { isValueDefined } from '@/utils/is';

import CodeHintButton from './CodeHintButton';

interface Props {
  titleKey: string;
  children: React.ReactNode;
  codeSnippet?: string;
  codeTestId?: string;
}

const ControlGroup = ({ titleKey, children, codeSnippet, codeTestId }: Props): JSX.Element => (
  <fieldset className="rounded-lg border border-border bg-surface-secondary p-3">
    <legend className="flex items-center gap-1.5 px-2 text-xs font-semibold text-text-secondary">
      {FM(titleKey)}
      {isValueDefined(codeSnippet) && isValueDefined(codeTestId)
        ? <CodeHintButton snippet={codeSnippet} testId={codeTestId} />
        : null}
    </legend>
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
      {children}
    </div>
  </fieldset>
);

ControlGroup.displayName = 'ControlGroup';

export default memo(ControlGroup);
