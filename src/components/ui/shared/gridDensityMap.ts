/** Row height (px) for each grid density level. */
import { GridDensity } from './GridDensity';

const ROW_HEIGHT_MEDIUM = 40;
const ROW_HEIGHT_LOW = 48;
const ROW_HEIGHT_HIGH = 32;

export const GRID_DENSITY_ROW_HEIGHT: Record<GridDensity, number> = {
  [GridDensity.Medium]: ROW_HEIGHT_MEDIUM,
  [GridDensity.Low]: ROW_HEIGHT_LOW,
  [GridDensity.High]: ROW_HEIGHT_HIGH,
};
