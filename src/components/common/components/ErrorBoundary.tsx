import { Component, type ReactNode } from 'react';

import { Button } from '@/components/ui/syncfusion';
import { FM } from '@/localization/utils/helpers';
import { isValueDefined } from '@/utils/is';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  override render(): ReactNode {
    const { hasError, error } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      if (isValueDefined(fallback)) return fallback;

      return (
        <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 p-8">
          <div className="text-6xl">{FM('common.warning')}</div>
          <h2 className="text-xl font-semibold text-text-primary">{FM('common.somethingWentWrong')}</h2>
          <p className="text-center text-text-secondary">
            {error?.message ?? FM('common.unexpectedError')}
          </p>
          <Button testId="error-boundary-retry" onClick={this.handleReset}>
            {FM('common.tryAgain')}
          </Button>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
