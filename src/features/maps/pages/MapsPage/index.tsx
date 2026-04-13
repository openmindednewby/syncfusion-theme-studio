import { memo, useCallback, useState } from 'react';

import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

import { LocationMarkers } from './components/LocationMarkers';
import { LocationPanel } from './components/LocationPanel';
import { MapToolbar } from './components/MapToolbar';
import { WorldMap } from './components/WorldMap';
import { OFFICE_LOCATIONS } from './data/locationData';

import type { OfficeLocation } from './types';

const MapsPage = memo((): JSX.Element => {
  const [selectedLocation, setSelectedLocation] = useState<OfficeLocation | null>(null);
  const [showBubbles, setShowBubbles] = useState(false);

  const selectedId = selectedLocation?.id ?? '';

  const handleMarkerClick = useCallback((location: OfficeLocation) => {
    setSelectedLocation(location);
  }, []);

  const handleClosePanel = useCallback(() => {
    setSelectedLocation(null);
  }, []);

  const handleToggleBubbles = useCallback(() => {
    setShowBubbles((prev) => !prev);
  }, []);

  return (
    <div className="flex h-full flex-col" data-testid={TestIds.MAPS_PAGE}>
      <div className="flex items-center justify-between px-4 py-3">
        <h1 className="text-2xl font-bold text-text-primary">{FM('maps.title')}</h1>
      </div>
      <MapToolbar
        locationCount={OFFICE_LOCATIONS.length}
        showBubbles={showBubbles}
        onToggleBubbles={handleToggleBubbles}
      />
      <div className="relative flex flex-1 overflow-hidden">
        <div className="w-64 shrink-0">
          <LocationMarkers
            locations={OFFICE_LOCATIONS}
            selectedId={selectedId}
            onSelect={handleMarkerClick}
          />
        </div>
        <div className="flex-1">
          <WorldMap showBubbles={showBubbles} onMarkerClick={handleMarkerClick} />
        </div>
        <LocationPanel location={selectedLocation} onClose={handleClosePanel} />
      </div>
    </div>
  );
});

MapsPage.displayName = 'MapsPage';

export default MapsPage;
