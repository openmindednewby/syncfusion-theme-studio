/**
 * Shift Leader status bar for the Alert Management section.
 * Displays current shift leader assignment status.
 */
import { memo } from 'react';

import { IconUser } from '@/components/icons';
import { FM } from '@/localization/helpers';

const AMBER_COLOR = '#F59E0B';

export const AlertShiftLeader = memo((): JSX.Element => (
  <div
    className="flex w-full items-center border-b px-4 py-2 text-sm"
    data-testid="alert-shift-leader"
    style={{
      backgroundColor: 'rgb(var(--color-surface))',
      borderColor: 'rgb(var(--color-border))',
    }}
  >
    <span aria-hidden="true" className="mr-2 text-text-secondary">
      <IconUser />
    </span>
    <span className="font-semibold text-text-primary">
      {FM('gridShowcase.shiftLeader')}
    </span>
    <span className="mx-2 text-text-muted">|</span>
    <span style={{ color: AMBER_COLOR }}>
      {FM('gridShowcase.noActiveShiftLeader')}
    </span>
  </div>
));

AlertShiftLeader.displayName = 'AlertShiftLeader';
