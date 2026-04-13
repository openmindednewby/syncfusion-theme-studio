/** Shared types for the Interactive Playground controls. */

/** A single key-value entry shown in the state display panel. */
export interface StateEntry {
  labelKey: string;
  value: string;
}

/** An option for a SelectControl dropdown. */
export interface ControlOption {
  value: string;
  label: string;
}
