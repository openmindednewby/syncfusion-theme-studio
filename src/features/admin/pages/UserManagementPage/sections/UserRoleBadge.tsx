import PillBadge from '@/components/ui/native/PillBadge';
import { FM } from '@/localization/utils/helpers';
import { Role } from '@/shared/permissions';
import { isValueDefined } from '@/utils/is';

interface UserRoleBadgeProps {
  role: string | undefined;
}

export interface RoleConfig {
  labelKey: string;
  className: string;
}

export const ROLE_CONFIG = new Map<string, RoleConfig>([
  [Role.Admin, { labelKey: 'users.role.admin', className: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' }],
  [Role.Manager, { labelKey: 'users.role.manager', className: 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300' }],
  [Role.Viewer, { labelKey: 'users.role.viewer', className: 'bg-surface-200 text-text-muted dark:bg-gray-700 dark:text-gray-300' }],
  [Role.Analyst, { labelKey: 'users.role.analyst', className: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' }],
]);

const EM_DASH = '\u2014';

const UserRoleBadge = ({ role }: UserRoleBadgeProps): JSX.Element => {
  const config = isValueDefined(role) ? ROLE_CONFIG.get(role) : undefined;
  if (!isValueDefined(config))
    return <span className="text-text-muted">{EM_DASH}</span>;

  return (
    <PillBadge colorClass={config.className}>
      {FM(config.labelKey)}
    </PillBadge>
  );
};

export default UserRoleBadge;
