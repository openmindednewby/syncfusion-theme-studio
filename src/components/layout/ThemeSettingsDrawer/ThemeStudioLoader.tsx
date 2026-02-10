import { memo } from 'react';

import { cn } from '@/utils/cn';

/** Predefined size presets for the spinner circle */
const SIZE_PRESETS = {
  sm: 24,
  md: 32,
  lg: 48,
} as const;

/** Predefined speed presets in milliseconds */
const SPEED_PRESETS = {
  slow: 1200,
  normal: 800,
  fast: 500,
} as const;

type SizePreset = keyof typeof SIZE_PRESETS;
type SpeedPreset = keyof typeof SPEED_PRESETS;

interface ThemeStudioLoaderProps {
  /** Spinner diameter — preset name or pixel value */
  size?: SizePreset | number;
  /** Spin duration — preset name or ms value */
  speed?: SpeedPreset | number;
  /** CSS color for the spinner arc (defaults to primary-500) */
  color?: string;
  /** CSS color for the track ring (defaults to border color) */
  trackColor?: string;
  /** Border thickness of the spinner ring in px */
  thickness?: number;
  /**
   * Minimum height of the loader container.
   * Prevents layout shift by reserving space equal to the content it replaces.
   * Accepts any CSS length value (e.g. "200px", "50vh").
   */
  minHeight?: string;
  /** Maximum width of the loader container */
  maxWidth?: string;
  /** Additional CSS classes on the outer wrapper */
  className?: string;
}

const DEFAULT_COLOR = 'rgb(var(--color-primary-500))';
const DEFAULT_TRACK_COLOR = 'rgb(var(--color-border))';
const DEFAULT_THICKNESS = 3;
const DEFAULT_MIN_HEIGHT = '200px';

const resolveSize = (size: SizePreset | number): number =>
  typeof size === 'number' ? size : SIZE_PRESETS[size];

const resolveSpeed = (speed: SpeedPreset | number): number =>
  typeof speed === 'number' ? speed : SPEED_PRESETS[speed];

/**
 * Dedicated loader for the Theme Studio panel sections.
 *
 * Uses a fixed `minHeight` (default 200px) so the container reserves the same
 * vertical space the real content will occupy — eliminating the shrink→expand
 * layout jump that the old `SectionLoader` caused.
 *
 * Every visual knob is configurable via props:
 * `size`, `speed`, `color`, `trackColor`, `thickness`, `minHeight`, `maxWidth`.
 */
const ThemeStudioLoaderComponent = ({
  size = 'md',
  speed = 'normal',
  color = DEFAULT_COLOR,
  trackColor = DEFAULT_TRACK_COLOR,
  thickness = DEFAULT_THICKNESS,
  minHeight = DEFAULT_MIN_HEIGHT,
  maxWidth,
  className,
}: ThemeStudioLoaderProps): JSX.Element => {
  const px = resolveSize(size);
  const ms = resolveSpeed(speed);

  return (
    <div
      className={cn(
        'flex w-full items-center justify-center',
        className,
      )}
      style={{ minHeight, maxWidth }}
    >
      <div
        aria-label="Loading section"
        className="animate-spin rounded-full"
        role="status"
        style={{
          width: px,
          height: px,
          border: `${thickness}px solid ${trackColor}`,
          borderTopColor: color,
          animationDuration: `${ms}ms`,
        }}
      />
    </div>
  );
};

export const ThemeStudioLoader = memo(ThemeStudioLoaderComponent);
