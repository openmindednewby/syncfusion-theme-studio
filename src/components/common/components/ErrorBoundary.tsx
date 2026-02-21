import { Component, type ReactNode } from 'react';

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
          <button
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
            data-testid="error-boundary-retry"
            type="button"
            onClick={this.handleReset}
          >
            {FM('common.tryAgain')}
          </button>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
