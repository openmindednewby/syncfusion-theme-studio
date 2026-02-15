import { IconShieldCheck } from '@/components/layout/Sidebar/SidebarIcons';
import { FM } from '@/localization/helpers';

const NotImplementedPage = (): JSX.Element => (
  <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
    <div className="text-text-muted">
      <IconShieldCheck />
    </div>
    <h1 className="text-xl font-semibold text-text-primary">
      {FM('dashboard.notImplemented')}
    </h1>
    <p className="text-sm text-text-secondary">
      {FM('dashboard.notImplementedDesc')}
    </p>
  </div>
);

export default NotImplementedPage;
