import { memo } from 'react';

import { cn } from '@/utils/cn';

interface Props {
  /** Size of the spinner */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes */
  className?: string;
  /** Full screen overlay */
  fullScreen?: boolean;
}

const sizeClasses = {
  sm: 'h-4 w-4 border-2',
  md: 'h-8 w-8 border-4',
  lg: 'h-12 w-12 border-4',
};

const LoadingSpinnerComponent = ({
  size = 'md',
  className,
  fullScreen = false,
}: Props): JSX.Element => {
  const spinner = (
    <div
      aria-label="Loading"
      className={cn(
        'animate-spin rounded-full border-primary-500 border-t-transparent',
        sizeClasses[size],
        className,
      )}
      role="status"
    />
  );

  if (fullScreen)
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80">
        {spinner}
      </div>
    );

  return (
    <div className="flex h-full w-full items-center justify-center p-8">{spinner}</div>
  );
}

export const LoadingSpinner = memo(LoadingSpinnerComponent);
