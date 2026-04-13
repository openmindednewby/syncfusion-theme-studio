import { memo } from 'react';

import { IconMapPin } from '@/components/icons';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

import type { OfficeLocation } from '../types';

interface LocationMarkersProps {
  readonly locations: readonly OfficeLocation[];
  readonly selectedId: string;
  readonly onSelect: (location: OfficeLocation) => void;
}

/** Sidebar list of all office locations. */
const LocationMarkers = memo(
  ({ locations, selectedId, onSelect }: LocationMarkersProps): JSX.Element => (
    <div
      className="flex h-full flex-col border-r border-border bg-surface"
      data-testid={TestIds.MAPS_LOCATION_LIST}
    >
      <div className="border-b border-border px-4 py-3">
        <h2 className="text-sm font-semibold text-text-primary">{FM('maps.offices')}</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        {locations.map((loc) => (
          <button
            key={loc.id}
            aria-label={loc.name}
            className={`flex w-full items-center gap-3 border-b border-border px-4 py-3 text-left transition-colors hover:bg-surface-elevated ${
              selectedId === loc.id ? 'bg-surface-elevated' : ''
            }`}
            data-testid={`${TestIds.MAPS_LOCATION_ITEM}-${loc.id}`}
            type="button"
            onClick={() => onSelect(loc)}
          >
            <IconMapPin className="h-4 w-4 shrink-0 text-primary" />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-text-primary">{loc.name}</p>
              <p className="truncate text-xs text-text-muted">
                {loc.city}, {loc.country}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  ),
);

LocationMarkers.displayName = 'LocationMarkers';

export { LocationMarkers };
