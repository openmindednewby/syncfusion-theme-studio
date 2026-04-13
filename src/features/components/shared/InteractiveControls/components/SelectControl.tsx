/**
 * SelectControl - Inline label + SelectNative for playground panels.
 */
import { memo, useCallback } from 'react';

import SelectNative from '@/components/ui/native/SelectNative';
import { FM } from '@/localization/utils/helpers';
import { isValueDefined } from '@/utils/is';

import type { ControlOption } from '../types';

interface Props {
  labelKey: string;
  options: ControlOption[];
  value: string;
  onChange: (value: string) => void;
  testId: string;
  className?: string;
}

const SelectControl = ({ labelKey, options, value, onChange, testId, className }: Props): JSX.Element => {
  const handleChange = useCallback(
    (v: string | number) => onChange(String(v)),
    [onChange],
  );

  const labelText = FM(labelKey);

  return (
    <div className="flex items-center gap-2">
      <span className="whitespace-nowrap text-xs text-text-secondary">{labelText}</span>
      <SelectNative aria-label={labelText} options={options} testId={testId} value={value} onChange={handleChange} {...(isValueDefined(className) ? { className } : {})} />
    </div>
  );
};

SelectControl.displayName = 'SelectControl';

export default memo(SelectControl);
