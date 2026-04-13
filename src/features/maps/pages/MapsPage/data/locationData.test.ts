import { describe, expect, it } from 'vitest';

import { OFFICE_LOCATIONS } from './locationData';

const MIN_LATITUDE = -90;
const MAX_LATITUDE = 90;
const MIN_LONGITUDE = -180;
const MAX_LONGITUDE = 180;

describe('OFFICE_LOCATIONS', () => {
  it('contains at least one location', () => {
    expect(OFFICE_LOCATIONS.length).toBeGreaterThan(0);
  });

  it('has unique IDs for every location', () => {
    const ids = OFFICE_LOCATIONS.map((loc) => loc.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('has valid latitude values between -90 and 90', () => {
    for (const loc of OFFICE_LOCATIONS) {
      expect(loc.latitude).toBeGreaterThanOrEqual(MIN_LATITUDE);
      expect(loc.latitude).toBeLessThanOrEqual(MAX_LATITUDE);
    }
  });

  it('has valid longitude values between -180 and 180', () => {
    for (const loc of OFFICE_LOCATIONS) {
      expect(loc.longitude).toBeGreaterThanOrEqual(MIN_LONGITUDE);
      expect(loc.longitude).toBeLessThanOrEqual(MAX_LONGITUDE);
    }
  });

  it('has positive employee counts for every location', () => {
    for (const loc of OFFICE_LOCATIONS) 
      expect(loc.employees).toBeGreaterThan(0);
    
  });

  it('has non-empty required string fields for every location', () => {
    for (const loc of OFFICE_LOCATIONS) {
      expect(loc.name).not.toBe('');
      expect(loc.city).not.toBe('');
      expect(loc.country).not.toBe('');
      expect(loc.address).not.toBe('');
      expect(loc.phone).not.toBe('');
      expect(loc.hours).not.toBe('');
      expect(loc.type).not.toBe('');
    }
  });

  it('includes the New York headquarters', () => {
    const nyc = OFFICE_LOCATIONS.find((loc) => loc.id === 'nyc');
    expect(nyc).toBeDefined();
    expect(nyc!.name).toBe('New York HQ');
    expect(nyc!.type).toBe('Headquarters');
  });
});
