import { memo } from 'react';

import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

interface MapToolbarProps {
  readonly showBubbles: boolean;
  readonly onToggleBubbles: () => void;
  readonly locationCount: number;
}

const MapToolbar = memo(
  ({ showBubbles, onToggleBubbles, locationCount }: MapToolbarProps): JSX.Element => (
    <div
      className="flex items-center justify-between border-b border-border bg-surface px-4 py-2"
      data-testid={TestIds.MAPS_TOOLBAR}
    >
      <div className="flex items-center gap-4">
        <span className="text-sm text-text-muted">
          {FM('maps.locationCount', String(locationCount))}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <label className="flex cursor-pointer items-center gap-2 text-sm text-text-secondary">
          <input
            checked={showBubbles}
            className="h-4 w-4 rounded border-border text-primary accent-primary"
            data-testid={TestIds.MAPS_BUBBLE_TOGGLE}
            type="checkbox"
            onChange={onToggleBubbles}
          />
          {FM('maps.showBubbles')}
        </label>
      </div>
    </div>
  ),
);

MapToolbar.displayName = 'MapToolbar';

export { MapToolbar };
