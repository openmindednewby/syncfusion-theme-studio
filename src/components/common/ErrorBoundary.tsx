import { Component, type ReactNode } from 'react';

import { Button } from '@/components/ui';
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
          <div className="text-6xl">Warning</div>
          <h2 className="text-xl font-semibold text-text-primary">Something went wrong</h2>
          <p className="text-center text-text-secondary">
            {error?.message ?? 'An unexpected error occurred. Please try again.'}
          </p>
          <Button testId="error-boundary-retry" onClick={this.handleReset}>
            Try Again
          </Button>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
