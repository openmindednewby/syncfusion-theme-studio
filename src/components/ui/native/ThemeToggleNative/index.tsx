/**
 * ThemeToggleNative - Animated sun/moon theme toggle with pure CSS animations.
 *
 * A pill-shaped toggle that transitions between sun (light) and moon (dark)
 * iconography with smooth sliding, rotation, and color transitions.
 * Zero external animation library dependencies.
 */
import { memo, useCallback } from 'react';

import { cn } from '@/utils/cn';
import { isValueDefined } from '@/utils/is';

import { ThemeToggleSize } from './themeToggleSize';

/** Dimensions lookup keyed by toggle size */
const SIZE_CONFIG = {
  [ThemeToggleSize.Sm]: { track: 'w-14 h-7', thumb: 'h-5 w-5', translate: 'translateX(30px)', icon: 14 },
  [ThemeToggleSize.Md]: { track: 'w-16 h-8', thumb: 'h-6 w-6', translate: 'translateX(32px)', icon: 16 },
  [ThemeToggleSize.Lg]: { track: 'w-20 h-10', thumb: 'h-8 w-8', translate: 'translateX(40px)', icon: 20 },
} as const;

/** Offset applied to the thumb in the "off" (light mode) position */
const THUMB_OFFSET_OFF = 'translateX(4px)';

/** Animation timing for all transitions */
const TRANSITION_DURATION = '400ms';
const TRANSITION_EASING = 'cubic-bezier(0.4, 0, 0.2, 1)';

/** Color constants for the track backgrounds */
const TRACK_LIGHT_BG = 'linear-gradient(135deg, #f59e0b, #f97316)';
const TRACK_DARK_BG = 'linear-gradient(135deg, #312e81, #1e1b4b)';

/** Star dot colors */
const STAR_COLOR = 'rgba(255, 255, 255, 0.9)';

/** Stagger delay between star dot animations (ms) */
const STAR_STAGGER_DELAY_MS = 50;

/** Star positions and sizes for the dark-mode constellation effect */
const STARS = [
  { id: 'star-tl', top: '20%', left: '15%', size: 2 },
  { id: 'star-ml', top: '55%', left: '22%', size: 3 },
  { id: 'star-cl', top: '35%', left: '10%', size: 2 },
  { id: 'star-bl', top: '70%', left: '30%', size: 2 },
  { id: 'star-tc', top: '15%', left: '35%', size: 3 },
] as const;

interface Props {
  /** Whether dark mode is active (true = moon/dark, false = sun/light) */
  checked: boolean;
  /** Called when the toggle is clicked */
  onChange: (checked: boolean) => void;
  /** Toggle size variant */
  size?: ThemeToggleSize;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for E2E testing */
  testId?: string;
  /** Accessible label override */
  label?: string;
  /** Disables interaction */
  disabled?: boolean;
}

/** SVG sun icon with rays */
const SunIcon = ({ size }: { size: number }): JSX.Element => (
  <svg
    aria-hidden="true"
    fill="none"
    height={size}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" fill="#fbbf24" r="5" />
    <g stroke="#f59e0b" strokeLinecap="round" strokeWidth="2">
      <line x1="12" x2="12" y1="1" y2="3" />
      <line x1="12" x2="12" y1="21" y2="23" />
      <line x1="4.22" x2="5.64" y1="4.22" y2="5.64" />
      <line x1="18.36" x2="19.78" y1="18.36" y2="19.78" />
      <line x1="1" x2="3" y1="12" y2="12" />
      <line x1="21" x2="23" y1="12" y2="12" />
      <line x1="4.22" x2="5.64" y1="19.78" y2="18.36" />
      <line x1="18.36" x2="19.78" y1="5.64" y2="4.22" />
    </g>
  </svg>
);

/** SVG crescent moon icon */
const MoonIcon = ({ size }: { size: number }): JSX.Element => (
  <svg
    aria-hidden="true"
    fill="none"
    height={size}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
      fill="#e0e7ff"
      stroke="#a5b4fc"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

const ThemeToggleNative = ({
  checked,
  onChange,
  size = ThemeToggleSize.Md,
  className,
  testId,
  label,
  disabled = false,
}: Props): JSX.Element => {
  const config = SIZE_CONFIG[size];

  const handleClick = useCallback(() => {
    if (!disabled) onChange(!checked);
  }, [checked, disabled, onChange]);

  const transition = `all ${TRANSITION_DURATION} ${TRANSITION_EASING}`;

  return (
    <button
      aria-checked={checked}
      aria-label={isValueDefined(label) ? label : undefined}
      className={cn(
        'relative inline-flex items-center rounded-full border-0 p-0 shadow-inner',
        'cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
        config.track,
        disabled && 'cursor-not-allowed opacity-50',
        className,
      )}
      data-testid={testId}
      disabled={disabled}
      role="switch"
      style={{
        backgroundImage: checked ? TRACK_DARK_BG : TRACK_LIGHT_BG,
        transition,
      }}
      type="button"
      onClick={handleClick}
    >
      {/* Star dots - visible in dark mode */}
      <span
        className="absolute inset-0 overflow-hidden rounded-full"
        style={{ transition }}
      >
        {STARS.map((star, i) => (
          <span
            key={star.id}
            className="absolute rounded-full"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              backgroundColor: STAR_COLOR,
              opacity: checked ? 1 : 0,
              transform: checked ? 'scale(1)' : 'scale(0)',
              transition: `opacity ${TRANSITION_DURATION} ${TRANSITION_EASING}, transform ${TRANSITION_DURATION} ${TRANSITION_EASING}`,
              transitionDelay: checked ? `${i * STAR_STAGGER_DELAY_MS}ms` : '0ms',
            }}
          />
        ))}
      </span>

      {/* Sliding thumb with icon */}
      <span
        className={cn(
          'relative z-10 flex items-center justify-center rounded-full bg-white shadow-md',
          config.thumb,
        )}
        style={{
          transform: checked ? config.translate : THUMB_OFFSET_OFF,
          transition,
        }}
      >
        {/* Sun icon - fades and rotates out when dark */}
        <span
          className="absolute inset-0 flex items-center justify-center"
          style={{
            opacity: checked ? 0 : 1,
            transform: checked ? 'rotate(90deg) scale(0.5)' : 'rotate(0deg) scale(1)',
            transition,
          }}
        >
          <SunIcon size={config.icon} />
        </span>

        {/* Moon icon - fades and rotates in when dark */}
        <span
          className="absolute inset-0 flex items-center justify-center"
          style={{
            opacity: checked ? 1 : 0,
            transform: checked ? 'rotate(0deg) scale(1)' : 'rotate(-90deg) scale(0.5)',
            transition,
          }}
        >
          <MoonIcon size={config.icon} />
        </span>
      </span>
    </button>
  );
};

ThemeToggleNative.displayName = 'ThemeToggleNative';

export default memo(ThemeToggleNative);
export type { Props as ThemeToggleNativeProps };
