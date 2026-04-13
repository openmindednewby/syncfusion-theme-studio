# ENT-25: Maps / Geolocation Page

## Status: TODO
## Priority: Low
## Depends on: None
## Agent: frontend-dev

## Objective

Add a Maps page using Syncfusion's Maps component — showing store locations, heatmaps, or geographic data visualization.

## Syncfusion Package

- `@syncfusion/ej2-react-maps`

## Implementation Plan

### 1. Page Structure

```
src/features/maps/
├── pages/
│   └── MapsPage/
│       ├── index.tsx
│       ├── components/
│       │   ├── WorldMap.tsx          # Main map view
│       │   ├── LocationMarkers.tsx   # Pin markers for locations
│       │   ├── MapToolbar.tsx        # View options, layer toggle
│       │   ├── LocationPanel.tsx     # Side panel with location details
│       │   └── HeatmapOverlay.tsx    # Data density overlay
│       └── hooks/
│           └── useMapData.ts
├── data/
│   └── locationData.ts             # Store/office locations
├── types.ts
└── constants.ts
```

### 2. Map Features

- World map with zoom and pan
- Location markers (mock office/store locations — 15-20 worldwide)
- Click marker → show detail panel (address, phone, hours)
- Heatmap layer: customer density or revenue by region
- Map layers: Default, Satellite-style, Dark
- Legend for data ranges
- Bubble markers sized by value (e.g., revenue per location)

### 3. Route + Navigation

- Add `/maps` route
- Add "Maps" to sidebar under "Apps" section

## Success Criteria

- [ ] Map renders with world view
- [ ] Location markers display and are clickable
- [ ] Heatmap overlay toggles on/off
- [ ] Zoom and pan work smoothly
- [ ] Detail panel shows location info
- [ ] Respects dark/light theme
