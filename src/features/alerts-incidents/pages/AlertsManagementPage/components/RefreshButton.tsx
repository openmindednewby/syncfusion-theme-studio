import { memo } from 'react';

import { IconRefresh } from '@/components/icons';
import IconButtonNative, { IconButtonVariant } from '@/components/ui/native/IconButtonNative';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

interface RefreshButtonProps {
  onRefresh?: () => void;
}

export const RefreshButton = memo(({ onRefresh }: RefreshButtonProps): JSX.Element => (
  <IconButtonNative
    ariaLabel={FM('common.refresh')}
    icon={<IconRefresh />}
    testId={TestIds.ALERT_TOOLBAR_REFRESH}
    variant={IconButtonVariant.Tertiary}
    onClick={onRefresh}
  />
));

RefreshButton.displayName = 'RefreshButton';
