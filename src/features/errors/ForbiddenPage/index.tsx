import { useNavigate } from 'react-router-dom';

import { RoutePath } from '@/app/routePaths';
import { IconHome, IconShield } from '@/components/icons';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

const ForbiddenPage = (): JSX.Element => {
  const navigate = useNavigate();

  const handleGoHome = (): void => {
    Promise.resolve(navigate(RoutePath.Dashboard)).catch(() => undefined);
  };

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6">
      <div className="scale-[2.5] text-text-muted">
        <IconShield />
      </div>
      <div className="flex flex-col items-center gap-2 pt-4">
        <h1 className="text-4xl font-bold text-text-primary">
          {FM('errorPages.forbidden.title')}
        </h1>
        <p className="max-w-md text-center text-sm text-text-secondary">
          {FM('errorPages.forbidden.description')}
        </p>
      </div>
      <button
        aria-label={FM('notFound.goHome')}
        className="mt-2 inline-flex items-center gap-2 rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700"
        data-testid={TestIds.ERROR_403_GO_HOME}
        type="button"
        onClick={handleGoHome}
      >
        <IconHome />
        {FM('notFound.goHome')}
      </button>
    </div>
  );
};

export default ForbiddenPage;
