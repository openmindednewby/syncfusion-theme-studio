/**
 * ToggleControl - Inline label + ToggleNative for playground panels.
 */
import { memo } from 'react';

import ToggleNative from '@/components/ui/native/ToggleNative';
import { FM } from '@/localization/utils/helpers';

interface Props {
  labelKey: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  testId: string;
}

const ToggleControl = ({ labelKey, checked, onChange, testId }: Props): JSX.Element => (
  <div className="flex items-center gap-2">
    <span className="text-xs text-text-secondary">{FM(labelKey)}</span>
    <ToggleNative checked={checked} label={FM(labelKey)} testId={testId} onChange={onChange} />
  </div>
);

ToggleControl.displayName = 'ToggleControl';

export default memo(ToggleControl);
