/**
 * FormCompletionProgress - Reusable form completion progress bar.
 *
 * Accepts a 0–1 progress value and renders a labeled ProgressBarNative
 * with max={1} so the bar fills proportionally.
 */
import ProgressBarNative from '@/components/ui/native/ProgressBarNative';
import { ProgressBarVariant } from '@/components/ui/shared/progressBarTypes';

const PERCENTAGE_MULTIPLIER = 100;
const PROGRESS_MAX = 1;

interface FormCompletionProgressProps {
  progress: number;
  label: string;
  testId?: string;
}

export const FormCompletionProgress = ({
  progress,
  label,
  testId = 'form-completion-progress',
}: FormCompletionProgressProps): JSX.Element => {
  const percentage = Math.round(progress * PERCENTAGE_MULTIPLIER);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-text-primary">
          {label}
        </span>
        <span className="text-sm text-text-secondary">{percentage}%</span>
      </div>
      <ProgressBarNative
        max={PROGRESS_MAX}
        testId={testId}
        value={progress}
        variant={ProgressBarVariant.Default}
      />
    </div>
  );
};
