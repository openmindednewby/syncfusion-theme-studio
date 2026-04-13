import PillBadge from '@/components/ui/native/PillBadge';
import { FM } from '@/localization/utils/helpers';

interface UserStatusBadgeProps {
  isActive: boolean;
}

const UserStatusBadge = ({ isActive }: UserStatusBadgeProps): JSX.Element => {
  const colorClass = isActive
    ? 'bg-success-50 text-success-700'
    : 'bg-surface-hover text-text-muted';

  const labelKey = isActive ? 'users.status.active' : 'users.status.inactive';

  return (
    <PillBadge colorClass={colorClass}>
      {FM(labelKey)}
    </PillBadge>
  );
};

export default UserStatusBadge;
