import { describe, it, expect } from 'vitest';

import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  GRID_INTERVAL,
  PALETTE_HEIGHT,
  PALETTE_SYMBOL_HEIGHT,
  PALETTE_SYMBOL_WIDTH,
  PALETTE_WIDTH,
  ZOOM_FACTOR,
} from './constants';

describe('Diagram constants', () => {
  it('sets canvas width to 100%', () => {
    expect(CANVAS_WIDTH).toBe('100%');
  });

  it('sets canvas height to 600px', () => {
    expect(CANVAS_HEIGHT).toBe('600px');
  });

  it('defines a positive grid interval', () => {
    expect(GRID_INTERVAL).toBeGreaterThan(0);
    expect(GRID_INTERVAL).toBe(10);
  });

  it('defines zoom factor between 0 and 1', () => {
    expect(ZOOM_FACTOR).toBeGreaterThan(0);
    expect(ZOOM_FACTOR).toBeLessThan(1);
  });

  it('defines equal palette symbol dimensions', () => {
    expect(PALETTE_SYMBOL_WIDTH).toBe(50);
    expect(PALETTE_SYMBOL_HEIGHT).toBe(50);
  });

  it('sets palette container to full width and height', () => {
    expect(PALETTE_WIDTH).toBe('100%');
    expect(PALETTE_HEIGHT).toBe('100%');
  });
});
