/**
 * Displays a plan badge (Free, Pro, Enterprise) with appropriate styling.
 */
import PillBadge from '@/components/ui/native/PillBadge';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';
import { isValueDefined } from '@/utils/is';

interface OrgBadgeProps {
  plan: string;
}

const PLAN_STYLES: Record<string, string | undefined> = {
  Free: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300',
  Pro: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  Enterprise: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
};

const DEFAULT_PLAN_STYLE = 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300';

const PLAN_KEY_MAP: Record<string, string | undefined> = {
  Free: 'orgSwitcher.planFree',
  Pro: 'orgSwitcher.planPro',
  Enterprise: 'orgSwitcher.planEnterprise',
};

function getPlanLabel(plan: string): string {
  const key = PLAN_KEY_MAP[plan];
  return isValueDefined(key) ? FM(key) : plan;
}

export const OrgBadge = ({ plan }: OrgBadgeProps): JSX.Element => {
  const style = PLAN_STYLES[plan] ?? DEFAULT_PLAN_STYLE;

  return (
    <PillBadge className="inline-flex items-center" colorClass={style} testId={TestIds.ORG_BADGE}>
      {getPlanLabel(plan)}
    </PillBadge>
  );
};
