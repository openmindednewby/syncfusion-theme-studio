/**
 * Custom icons not available in the Feather icon set.
 * Includes media player controls, convenience aliases, and brand overrides.
 *
 * Icons that ARE in Feather but requested under different names are
 * re-exported as aliases from the generated Feather files.
 */
import type { IconProps } from './types';

const ICON_SIZE = 18;
const LABEL_FONT_SIZE = '8';
const FORWARD_LABEL = '30';
const REPLAY_LABEL = '10';

const defaults = {
  'aria-hidden': true as const,
  width: ICON_SIZE,
  height: ICON_SIZE,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

// ---------------------------------------------------------------------------
// Aliases: Feather icons re-exported under alternate names
// ---------------------------------------------------------------------------
export { IconSkipForward as IconSkipNext } from './FeatherIconsS1';
export { IconSkipBack as IconSkipPrevious } from './FeatherIconsS1';
export { IconRewind as IconFastRewind } from './FeatherIconsR';
export { IconVolume2 as IconVolumeUp } from './FeatherIconsV';
export { IconVolume1 as IconVolumeDown } from './FeatherIconsV';
export { IconVolumeX as IconVolumeMute } from './FeatherIconsV';
export { IconMoreHorizontal as IconEllipsis } from './FeatherIconsM';
export { IconX as IconClose } from './FeatherIconsX';
export { IconPlus as IconAdd } from './FeatherIconsP';
export { IconAlertTriangle as IconAlert } from './FeatherIconsA';

// ---------------------------------------------------------------------------
// Custom media icons (not in Feather)
// ---------------------------------------------------------------------------

/** Forward 30 seconds -- circled "30" with forward arrow. */
export const IconForward30 = ({ className }: IconProps): JSX.Element => (
  <svg {...defaults} className={className}>
    <path d="M18.4 5.6a9.5 9.5 0 1 1-1.3-1.3" />
    <polyline points="22 2 22 8 16 8" />
    <path d="M22 8a10 10 0 0 0-3.6-3.4" />
    <text
      fill="currentColor"
      fontFamily="system-ui, sans-serif"
      fontSize={LABEL_FONT_SIZE}
      fontWeight="600"
      stroke="none"
      textAnchor="middle"
      x="12"
      y="16"
    >
      {FORWARD_LABEL}
    </text>
  </svg>
);

/** Replay -- counter-clockwise arrow forming a circle. */
export const IconReplay = ({ className }: IconProps): JSX.Element => (
  <svg {...defaults} className={className}>
    <polyline points="1 4 1 10 7 10" />
    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
  </svg>
);

/** Replay 10 seconds -- counter-clockwise with "10" label. */
export const IconReplay10 = ({ className }: IconProps): JSX.Element => (
  <svg {...defaults} className={className}>
    <polyline points="1 4 1 10 7 10" />
    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
    <text
      fill="currentColor"
      fontFamily="system-ui, sans-serif"
      fontSize={LABEL_FONT_SIZE}
      fontWeight="600"
      stroke="none"
      textAnchor="middle"
      x="13.5"
      y="16"
    >
      {REPLAY_LABEL}
    </text>
  </svg>
);

/** Refresh last 24 hours -- clockwise arrow with embedded "24" (from Figma). */
export const IconRefreshLast24 = ({ className }: IconProps): JSX.Element => (
  <svg {...defaults} className={className} fill="currentColor" stroke="none" viewBox="0 0 134 141">
    <g transform="translate(0,141) scale(0.066667,-0.066667)">
      <path d="M755 1902 c-112 -110 -185 -195 -185 -212 0 -42 356 -400 397 -400 38 0 68 27 68 59 0 13 -59 79 -131 147 l-131 124 112 0 c588 0 943 -473 714 -954 -267 -562 -1135 -474 -1248 126 -21 110 -137 94 -120 -17 28 -185 221 -436 404 -526 687 -336 1404 374 1062 1053 -139 275 -372 409 -744 431 l-194 11 138 131 c137 131 154 158 120 192 -40 40 -81 14 -262 -165z" />
      <path d="M683 1239 c-90 -41 -109 -64 -81 -93 24 -23 28 -23 70 7 56 40 99 41 138 2 62 -62 26 -160 -118 -317 -63 -69 -92 -112 -92 -139 l0 -39 165 0 165 0 0 38 c0 36 -2 37 -122 37 l-123 0 82 86 c113 120 151 185 152 268 2 120 -126 201 -236 150z" />
      <path d="M1119 1060 c-111 -260 -112 -250 36 -250 l120 0 0 -75 c0 -70 3 -75 38 -75 35 0 37 5 37 75 0 70 3 75 38 75 27 0 37 8 37 30 0 22 -10 30 -37 30 -36 0 -38 5 -38 83 0 78 -2 82 -37 82 -36 0 -38 -4 -38 -82 l0 -83 -75 0 c-41 0 -75 3 -75 6 0 4 24 63 54 131 104 242 97 218 59 235 -33 15 -38 8 -119 -182z" />
    </g>
  </svg>
);

/** Audio playing / equalizer bars animation placeholder. */
export const IconPlaying = ({ className }: IconProps): JSX.Element => (
  <svg {...defaults} className={className}>
    <line x1="4" x2="4" y1="16" y2="8" />
    <line x1="8" x2="8" y1="16" y2="4" />
    <line x1="12" x2="12" y1="16" y2="10" />
    <line x1="16" x2="16" y1="16" y2="6" />
    <line x1="20" x2="20" y1="16" y2="12" />
  </svg>
);

/** Playlist / Queue icon -- stacked list with play indicator. */
export const IconQueue = ({ className }: IconProps): JSX.Element => (
  <svg {...defaults} className={className}>
    <line x1="3" x2="15" y1="6" y2="6" />
    <line x1="3" x2="15" y1="10" y2="10" />
    <line x1="3" x2="11" y1="14" y2="14" />
    <polygon points="16 13 21 16.5 16 20 16 13" />
  </svg>
);

/** Backspace -- delete-backward key shape. */
export const IconBackspace = ({ className }: IconProps): JSX.Element => (
  <svg {...defaults} className={className}>
    <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
    <line x1="18" x2="12" y1="9" y2="15" />
    <line x1="12" x2="18" y1="9" y2="15" />
  </svg>
);

/** Bar chart with L-shaped axis -- 3 vertical bars of varying heights. */
export const IconChartBar = ({ className }: IconProps): JSX.Element => (
  <svg {...defaults} className={className} strokeWidth={1.17} viewBox="0 0 14 14">
    <path d="M1.75 1.75V11.0833C1.75 11.3928 1.87292 11.6895 2.09171 11.9083C2.3105 12.1271 2.60725 12.25 2.91667 12.25H12.25" />
    <path d="M10.5 9.917V5.25" />
    <path d="M7.583 9.918V2.918" />
    <path d="M4.667 9.918V8.168" />
  </svg>
);
