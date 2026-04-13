import { Button, ButtonVariant } from '@/components/ui/syncfusion';
import { FM } from '@/localization/utils/helpers';

interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

export const ErrorMessage = ({ message, onRetry }: ErrorMessageProps): JSX.Element => (
  <div className="rounded-md bg-danger-50 border border-danger-200 p-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="text-danger-600 text-xl">{FM('common.error')}</span>
        <div>
          <p className="text-sm font-medium text-danger-800">{FM('products.failedToLoad')}</p>
          <p className="text-xs text-danger-600">{message}</p>
        </div>
      </div>
      <Button testId="retry-button" variant={ButtonVariant.Secondary} onClick={onRetry}>
        {FM('common.tryAgain')}
      </Button>
    </div>
  </div>
);
