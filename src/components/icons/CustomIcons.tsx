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
