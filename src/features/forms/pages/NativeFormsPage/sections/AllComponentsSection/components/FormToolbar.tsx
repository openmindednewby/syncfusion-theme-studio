/**
 * FormToolbar - Toolbar for the All Components form.
 *
 * Native components used: ToolbarNative
 */
import { useMemo } from 'react';

import { ToolbarNative } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';

interface Props {
  onReset: () => void;
}

export const FormToolbar = ({ onReset }: Props): JSX.Element => {
  const toolbarItems = useMemo(
    () => [
      {
        type: 'button' as const,
        text: FM('common.reset'),
        onClick: onReset,
        testId: 'all-comp-toolbar-reset',
      },
    ],
    [onReset],
  );

  return (
    <ToolbarNative
      items={toolbarItems}
      testId="all-comp-toolbar"
    />
  );
};
