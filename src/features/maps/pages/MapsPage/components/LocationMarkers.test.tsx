import { describe, it, expect, vi } from 'vitest';

import { render, screen } from '@/test/utils';

import { LocationMarkers } from './LocationMarkers';

import type { OfficeLocation } from '../types';


const MOCK_LOCATIONS: OfficeLocation[] = [
  {
    id: 'nyc',
    name: 'New York HQ',
    city: 'New York',
    country: 'USA',
    latitude: 40.7128,
    longitude: -74.006,
    address: '123 Broadway',
    phone: '+1-555-0100',
    hours: '9:00 AM - 6:00 PM',
    employees: 250,
    type: 'Headquarters',
  },
  {
    id: 'lon',
    name: 'London Office',
    city: 'London',
    country: 'UK',
    latitude: 51.5074,
    longitude: -0.1278,
    address: '456 Oxford St',
    phone: '+44-20-5555-0100',
    hours: '9:00 AM - 5:30 PM',
    employees: 120,
    type: 'Regional',
  },
];

describe('LocationMarkers accessibility', () => {
  it('renders each location button with aria-label matching location name', () => {
    render(
      <LocationMarkers
        locations={MOCK_LOCATIONS}
        selectedId="nyc"
        onSelect={vi.fn()}
      />,
    );

    for (const loc of MOCK_LOCATIONS) {
      const button = screen.getByTestId(`maps-location-item-${loc.id}`);
      expect(button.getAttribute('aria-label')).toBe(loc.name);
    }
  });
});
