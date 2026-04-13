/**
 * InputMessageNative - Status message component with icon and text.
 *
 * Supports idle/valid/invalid statuses and s/m/l scales.
 * Uses .native-input-message CSS class.
 */
import { memo } from 'react';

import { cn } from '@/utils/cn';

import { InputMessageScale } from './inputMessageScale';
import { InputMessageStatus } from './inputMessageStatus';

export { InputMessageStatus, InputMessageScale };

interface Props {
  message: string;
  status?: InputMessageStatus;
  scale?: InputMessageScale;
  testId?: string;
  className?: string;
}

const STATUS_ICONS: Record<InputMessageStatus, JSX.Element> = {
  [InputMessageStatus.Idle]: (
    <svg aria-hidden="true" className="native-input-message-icon" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <circle cx={12} cy={12} r={10} />
      <path d="M12 16v-4m0-4h.01" strokeLinecap="round" />
    </svg>
  ),
  [InputMessageStatus.Valid]: (
    <svg aria-hidden="true" className="native-input-message-icon" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  [InputMessageStatus.Invalid]: (
    <svg aria-hidden="true" className="native-input-message-icon" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <circle cx={12} cy={12} r={10} />
      <path d="m15 9-6 6m0-6 6 6" strokeLinecap="round" />
    </svg>
  ),
};

const InputMessageNative = memo(({
  message,
  status = InputMessageStatus.Idle,
  scale = InputMessageScale.Medium,
  testId,
  className,
}: Props): JSX.Element => (
  <div
    className={cn('native-input-message', className)}
    data-scale={scale}
    data-status={status}
    data-testid={testId}
  >
    {STATUS_ICONS[status]}
    <span>{message}</span>
  </div>
));

InputMessageNative.displayName = 'InputMessageNative';

export default InputMessageNative;
export type { Props as InputMessageNativeProps };
