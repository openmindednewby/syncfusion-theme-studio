import { memo, type InputHTMLAttributes, type ReactNode } from 'react';

import { cn } from '@/utils/cn';

interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  containerClassName?: string;
  iconClassName?: string;
  inputClassName?: string;
  renderIcon?: () => ReactNode;
  testId?: string;
}

export const SearchInput = memo(({
  containerClassName,
  iconClassName,
  inputClassName,
  renderIcon,
  testId,
  ...inputProps
}: SearchInputProps): JSX.Element => (
  <div className={cn('relative', containerClassName)}>
    <span
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-y-0 left-2.5 flex items-center pt-[5px] text-text-muted', iconClassName)}
    >
      {renderIcon?.()}
    </span>
    <input
      className={
        inputClassName ??
        cn(
          'w-full rounded-md border border-border bg-transparent py-1.5 pl-9 pr-3 text-sm text-text-primary placeholder:text-text-muted',
        )
      }
      data-testid={testId}
      type="text"
      {...inputProps}
    />
  </div>
));

SearchInput.displayName = 'SearchInput';
