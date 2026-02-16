import { memo } from 'react';

import { TextNative, TextVariant } from '@/components/ui/native';

interface ActivityItemProps {
  title: string;
  time: string;
  icon: 'success' | 'warning' | 'info';
}

export const ActivityItem = memo(({ title, time, icon }: ActivityItemProps): JSX.Element => {
  const iconClasses = {
    success: 'bg-success-50 text-success-500',
    warning: 'bg-warning-50 text-warning-500',
    info: 'bg-info-50 text-info-500',
  };

  return (
    <div className="flex items-center gap-3 py-3">
      <div className={`rounded-full p-2 ${iconClasses[icon]}`}>
        <svg
          aria-hidden="true"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 13l4 4L19 7"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
      </div>
      <div className="flex-1">
        <TextNative variant={TextVariant.Label}>{title}</TextNative>
        <TextNative variant={TextVariant.Caption}>{time}</TextNative>
      </div>
    </div>
  );
});

ActivityItem.displayName = 'ActivityItem';
