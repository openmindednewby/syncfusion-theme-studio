import { ThemeStudioLogo } from '@/components/icons/ThemeStudioLogo';
import { FM } from '@/localization/utils/helpers';

interface Props {
  animateGradient: boolean;
}

const LoginBrandPanel = ({ animateGradient }: Props): JSX.Element => (
  <div
    className={`flex h-48 flex-col items-center justify-center gap-4 p-8 sm:h-auto sm:w-1/2 ${
      animateGradient ? 'brand-gradient-animated' : 'brand-gradient'
    }`}
  >
    <div className="flex items-center gap-4">
      <ThemeStudioLogo className="h-16 w-16 text-white" />
      <h1 className="text-4xl font-bold tracking-wide text-white">
        {FM('login.brandName')}
      </h1>
    </div>
    <p className="text-center text-xl font-semibold text-white">
      {FM('login.brandTagline')}
    </p>
  </div>
);

export default LoginBrandPanel;
