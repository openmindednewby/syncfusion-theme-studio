/**
 * Small inline icons used inside chip/pill components.
 * 16×16 fixed-size, no className prop — sized to fit chip UI.
 */

const ICON_SIZE = 16;
const STROKE_WIDTH = 1.5;

/** Close (×) icon — 16×16, stroke-based, inherits currentColor. */
export const ChipCloseIcon = (): JSX.Element => (
  <svg aria-hidden="true" fill="none" height={ICON_SIZE} viewBox="0 0 16 16" width={ICON_SIZE}>
    <path d="M4.5 4.5L11.5 11.5M11.5 4.5L4.5 11.5" stroke="currentColor" strokeLinecap="round" strokeWidth={STROKE_WIDTH} />
  </svg>
);

/** Filled check-circle icon — 16×16 circle with check stroke. */
export const ChipCheckIcon = (): JSX.Element => (
  <svg aria-hidden="true" fill="none" height={ICON_SIZE} viewBox="0 0 16 16" width={ICON_SIZE}>
    <circle cx="8" cy="8" fill="currentColor" r="7" />
    <path
      d="M5.5 8L7.2 9.7L10.5 6.3"
      fill="none"
      stroke="var(--component-datagrid-selbar-chip-bg, rgb(67 129 145))"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={STROKE_WIDTH}
    />
  </svg>
);
