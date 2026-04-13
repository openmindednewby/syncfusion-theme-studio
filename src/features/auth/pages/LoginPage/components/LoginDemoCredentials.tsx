import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

interface DemoAccount {
  email: string;
  password: string;
  roleKey: string;
  badgeClass: string;
}

const DEMO_ACCOUNTS: DemoAccount[] = [
  { email: 'admin@example.com', password: 'admin123', roleKey: 'login.role.admin', badgeClass: 'login-demo-badge-admin' },
  { email: 'manager@example.com', password: 'manager123', roleKey: 'login.role.manager', badgeClass: 'login-demo-badge-manager' },
  { email: 'viewer@example.com', password: 'viewer123', roleKey: 'login.role.viewer', badgeClass: 'login-demo-badge-viewer' },
];

interface Props {
  onSelectCredentials: (email: string, password: string) => void;
}

const LoginDemoCredentials = ({ onSelectCredentials }: Props): JSX.Element => (
  <div className="mt-4 w-[322px]" data-testid={TestIds.LOGIN_DEMO_CREDENTIALS}>
    <p className="mb-2.5 text-center text-[11px] font-medium uppercase tracking-widest text-white/50">
      {FM('login.demoAccountsLabel')}
    </p>
    <div className="flex gap-2">
      {DEMO_ACCOUNTS.map((account) => (
        <button
          key={account.email}
          aria-label={`${FM('login.useCredentials')} ${FM(account.roleKey)}`}
          className="login-demo-btn group flex-1"
          data-testid={`login-demo-${account.email.split('@')[0]}`}
          type="button"
          onClick={() => onSelectCredentials(account.email, account.password)}
        >
          <span className={`login-demo-badge ${account.badgeClass}`}>
            {FM(account.roleKey)}
          </span>
          <span
            className="mt-1 hidden max-w-full truncate text-[10px] text-white/40 transition-colors group-hover:text-white/60 sm:block"
            title={account.email}
          >
            {account.email}
          </span>
        </button>
      ))}
    </div>
  </div>
);

export default LoginDemoCredentials;
