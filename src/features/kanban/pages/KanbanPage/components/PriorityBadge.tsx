import { memo } from 'react';

import PillBadge from '@/components/ui/native/PillBadge';
import { FM } from '@/localization/utils/helpers';

import { PRIORITY_COLORS } from '../../../constants';

interface PriorityBadgeProps {
  priority: string;
}

/** Renders a colored badge showing the task priority level. */
export const PriorityBadge = memo(({ priority }: PriorityBadgeProps): JSX.Element => {
  const colorClass = PRIORITY_COLORS[priority] ?? 'bg-gray-100 text-gray-800';
  const label = FM(`kanban.priority.${priority.toLowerCase()}`);

  return (
    <PillBadge className="inline-flex" colorClass={colorClass}>
      {label}
    </PillBadge>
  );
});

PriorityBadge.displayName = 'PriorityBadge';
