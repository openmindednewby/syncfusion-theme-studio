import { FM } from '@/localization/utils/helpers';

interface RoleBadgeProps {
  isBuiltIn: boolean;
}

const BUILT_IN_CLASSES = 'bg-primary-50 text-primary-700';
const CUSTOM_CLASSES = 'bg-success-50 text-success-700';

/** Displays a badge indicating whether a role is built-in or custom. */
export const RoleBadge = ({ isBuiltIn }: RoleBadgeProps): JSX.Element => {
  const label = isBuiltIn
    ? FM('roleManagement.builtIn')
    : FM('roleManagement.custom');
  const classes = isBuiltIn ? BUILT_IN_CLASSES : CUSTOM_CLASSES;

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${classes}`}
    >
      {label}
    </span>
  );
}
