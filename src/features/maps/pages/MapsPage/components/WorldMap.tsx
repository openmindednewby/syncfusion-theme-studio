import { memo, useCallback } from 'react';

import {
  BubbleDirective,
  BubblesDirective,
  Bubble,
  Inject,
  LayerDirective,
  LayersDirective,
  MapsComponent,
  MapsTooltip,
  Marker,
  MarkerDirective,
  MarkersDirective,
  Zoom,
} from '@syncfusion/ej2-react-maps';

import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';
import { isValueDefined } from '@/utils';

import {
  BUBBLE_MAX_SIZE,
  BUBBLE_MIN_SIZE,
  MAP_MAX_ZOOM,
  MAP_MIN_ZOOM,
  MAP_ZOOM_FACTOR,
  MARKER_SIZE,
} from '../constants';
import { OFFICE_LOCATIONS } from '../data/locationData';

import type { OfficeLocation } from '../types';

/** Local type matching Syncfusion IMarkerClickEventArgs shape. */
interface MarkerClickArgs {
  readonly value: string;
}

interface WorldMapProps {
  readonly onMarkerClick: (location: OfficeLocation) => void;
  readonly showBubbles: boolean;
}

const OSM_URL = 'https://tile.openstreetmap.org/level/tileX/tileY.png';

const WorldMap = memo(({ onMarkerClick, showBubbles }: WorldMapProps): JSX.Element => {
  const handleMarkerClick = useCallback(
    (args: MarkerClickArgs) => {
      const markerName = isValueDefined(args.value) ? args.value : '';
      if (markerName !== '') {
        const location = OFFICE_LOCATIONS.find((loc) => loc.name === markerName);
        if (isValueDefined(location)) onMarkerClick(location);
      }
    },
    [onMarkerClick],
  );

  const markerData = OFFICE_LOCATIONS.map((loc) => ({
    latitude: loc.latitude,
    longitude: loc.longitude,
    name: loc.name,
    city: loc.city,
  }));

  const bubbleData = OFFICE_LOCATIONS.map((loc) => ({
    latitude: loc.latitude,
    longitude: loc.longitude,
    name: loc.name,
    value: loc.employees,
  }));

  return (
    <div className="h-full w-full" data-testid={TestIds.MAPS_VIEW}>
      <MapsComponent
        background="transparent"
        height="100%"
        markerClick={handleMarkerClick}
        titleSettings={{ text: FM('maps.title'), textStyle: { size: '0px' } }}
        width="100%"
        zoomSettings={{
          enable: true,
          zoomFactor: MAP_ZOOM_FACTOR,
          minZoom: MAP_MIN_ZOOM,
          maxZoom: MAP_MAX_ZOOM,
        }}
      >
        <Inject services={[Marker, MapsTooltip, Zoom, Bubble]} />
        <LayersDirective>
          <LayerDirective urlTemplate={OSM_URL}>
            <MarkersDirective>
              <MarkerDirective
                visible
                animationDuration={0}
                border={{ color: 'var(--color-surface)', width: 2 }}
                dataSource={markerData}
                fill="var(--color-primary)"
                height={MARKER_SIZE}
                shape="Circle"
                tooltipSettings={{
                  visible: true,
                  valuePath: 'name',
                  format: '${name} - ${city}',
                }}
                width={MARKER_SIZE}
              />
            </MarkersDirective>
            {showBubbles ? (
              <BubblesDirective>
                <BubbleDirective
                  visible
                  border={{ color: 'var(--color-primary)', width: 1 }}
                  dataSource={bubbleData}
                  fill="var(--color-primary)"
                  maxRadius={BUBBLE_MAX_SIZE}
                  minRadius={BUBBLE_MIN_SIZE}
                  opacity={0.3}
                  tooltipSettings={{
                    visible: true,
                    valuePath: 'name',
                    format: '${name}: ${value} employees',
                  }}
                  valuePath="value"
                />
              </BubblesDirective>
            ) : null}
          </LayerDirective>
        </LayersDirective>
      </MapsComponent>
    </div>
  );
});

WorldMap.displayName = 'WorldMap';

export { WorldMap };
