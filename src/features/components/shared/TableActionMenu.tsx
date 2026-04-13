/**
 * Reusable table action menu with View button and overflow dropdown.
 * Matches Figma TABLEACTIONS.png design.
 */
import type { GridDropdownItem } from '@/components/ui/native';
import GridButtonNative from '@/components/ui/native/GridButtonNative';
import GridDropdownNative from '@/components/ui/native/GridDropdownNative';
import { FM } from '@/localization/utils/helpers';

interface TableActionMenuProps {
  actions: GridDropdownItem[];
  viewLabelKey?: string;
  onViewClick?: () => void;
}

export const TableActionMenu = ({
  actions,
  viewLabelKey = 'gridShowcase.view',
  onViewClick,
}: TableActionMenuProps): JSX.Element => (
  <div className="flex items-center gap-1.5">
    <GridButtonNative testId="alert-action-view" onClick={onViewClick}>
      {FM(viewLabelKey)}
    </GridButtonNative>
    <GridDropdownNative
      ariaLabel={FM('common.moreActions')}
      items={actions}
      testId="alert-action-more"
    />
  </div>
);
