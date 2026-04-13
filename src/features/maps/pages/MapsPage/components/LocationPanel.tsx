import { memo } from 'react';

import {
  IconBriefcase,
  IconClock,
  IconMapPin,
  IconPhone,
  IconUsers,
  IconX,
} from '@/components/icons';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';
import { isValueDefined } from '@/utils';

import type { OfficeLocation } from '../types';

const COORDINATE_PRECISION = 4;

interface LocationPanelProps {
  readonly location: OfficeLocation | null;
  readonly onClose: () => void;
}

interface DetailRowProps {
  readonly icon: JSX.Element;
  readonly label: string;
  readonly value: string;
}

const DetailRow = ({ icon, label, value }: DetailRowProps): JSX.Element => {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 text-text-muted">{icon}</span>
      <div>
        <p className="text-xs font-medium text-text-muted">{label}</p>
        <p className="text-sm text-text-primary">{value}</p>
      </div>
    </div>
  );
}

const LocationPanel = memo(({ location, onClose }: LocationPanelProps): JSX.Element | null => {
  if (!isValueDefined(location)) return null;

  return (
    <div
      className="absolute right-0 top-0 z-10 flex h-full w-96 flex-col border-l border-border bg-surface shadow-lg"
      data-testid={TestIds.MAPS_LOCATION_PANEL}
    >
      <div className="flex items-center justify-between border-b border-border p-4">
        <h2 className="text-lg font-semibold text-text-primary">{location.name}</h2>
        <button
          aria-label={FM('common.close')}
          className="rounded p-1 text-text-muted hover:bg-surface-elevated hover:text-text-primary"
          data-testid={TestIds.MAPS_PANEL_CLOSE}
          type="button"
          onClick={onClose}
        >
          <IconX className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          <DetailRow
            icon={<IconBriefcase className="h-4 w-4" />}
            label={FM('maps.locationType')}
            value={location.type}
          />
          <DetailRow
            icon={<IconMapPin className="h-4 w-4" />}
            label={FM('maps.address')}
            value={location.address}
          />
          <DetailRow
            icon={<IconPhone className="h-4 w-4" />}
            label={FM('maps.phone')}
            value={location.phone}
          />
          <DetailRow
            icon={<IconClock className="h-4 w-4" />}
            label={FM('maps.hours')}
            value={location.hours}
          />
          <DetailRow
            icon={<IconUsers className="h-4 w-4" />}
            label={FM('maps.employees')}
            value={String(location.employees)}
          />
        </div>

        <div className="mt-6 rounded-lg border border-border bg-surface-elevated p-3">
          <p className="text-xs text-text-muted">
            {location.city}, {location.country}
          </p>
          <p className="mt-1 text-xs text-text-muted">
            {FM('maps.coordinates')}: {location.latitude.toFixed(COORDINATE_PRECISION)},{' '}
            {location.longitude.toFixed(COORDINATE_PRECISION)}
          </p>
        </div>
      </div>
    </div>
  );
});

LocationPanel.displayName = 'LocationPanel';

export { LocationPanel };
