/**
 * Theme settings drawer icons (tabs, import/export, sections).
 * Loaded when the settings drawer opens.
 */
import type { IconProps } from './types';

export const SettingsPaletteIcon = ({ className }: IconProps): JSX.Element => (
  <svg aria-hidden="true" className={className ?? 'h-4 w-4'} fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
    <path
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.38 0 2.5-1.12 2.5-2.5 0-.61-.23-1.17-.62-1.59-.35-.36-.57-.86-.57-1.41 0-1.1.9-2 2-2h2.34c2.87 0 5.35-2.34 5.35-5.21C22 5.67 17.52 2 12 2z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="8" cy="10" fill="currentColor" r="1.5" />
    <circle cx="12" cy="7" fill="currentColor" r="1.5" />
    <circle cx="16" cy="10" fill="currentColor" r="1.5" />
  </svg>
);

export const TextIcon = ({ className }: IconProps): JSX.Element => (
  <svg aria-hidden="true" className={className ?? 'h-4 w-4'} fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
    <path d="M4 7V4h16v3M9 20h6M12 4v16" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const GridIcon = ({ className }: IconProps): JSX.Element => (
  <svg aria-hidden="true" className={className ?? 'h-4 w-4'} fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
    <rect height="7" rx="1" width="7" x="3" y="3" />
    <rect height="7" rx="1" width="7" x="14" y="3" />
    <rect height="7" rx="1" width="7" x="14" y="14" />
    <rect height="7" rx="1" width="7" x="3" y="14" />
  </svg>
);

export const DrawerSunIcon = ({ className }: IconProps): JSX.Element => (
  <svg aria-hidden="true" className={className ?? 'h-4 w-4'} fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="5" />
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" strokeLinecap="round" />
  </svg>
);

export const DrawerMoonIcon = ({ className }: IconProps): JSX.Element => (
  <svg aria-hidden="true" className={className ?? 'h-4 w-4'} fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const PuzzleIcon = ({ className }: IconProps): JSX.Element => (
  <svg aria-hidden="true" className={className ?? 'h-4 w-4'} fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
    <path
      d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 01-.837.276c-.47-.07-.802-.48-.743-.95.059-.47-.01-.932-.265-1.328A2.5 2.5 0 0015 12.5a2.5 2.5 0 00-2.5 2.5c0 .883.51 1.652 1.25 2.039.371.194.654.485.761.878.107.392.054.822-.161 1.182l-1.65 2.201a2.405 2.405 0 01-3.4 0l-1.568-1.568a.98.98 0 01-.276-.837c.07-.47.48-.802.95-.743.47.059.932-.01 1.328-.265A2.5 2.5 0 0010.5 15a2.5 2.5 0 00-2.5-2.5c-.883 0-1.652.51-2.039 1.25-.194.371-.485.654-.878.761-.392.107-.822.054-1.182-.161L1.7 12.7a2.405 2.405 0 010-3.4l1.568-1.568c.23-.23.556-.338.878-.289.47.07.802.48.743.95-.059.47.01.932.265 1.328A2.5 2.5 0 007.5 10.5 2.5 2.5 0 0010 8c0-.883-.51-1.652-1.25-2.039-.371-.194-.654-.485-.761-.878-.107-.392-.054-.822.161-1.182l1.65-2.201a2.405 2.405 0 013.4 0l1.568 1.568c.23.23.338.556.289.878-.07.47-.48.802-.95.743-.47-.059-.932.01-1.328.265A2.5 2.5 0 0012 7.5a2.5 2.5 0 002.5 2.5c.883 0 1.652-.51 2.039-1.25.194-.371.485-.654.878-.761.392-.107.822-.054 1.182.161l1.84 1.35z"
      strokeLinecap="round" strokeLinejoin="round"
    />
  </svg>
);

export const SwatchesIcon = ({ className }: IconProps): JSX.Element => (
  <svg aria-hidden="true" className={className ?? 'h-4 w-4'} fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
    <path
      d="M4 7h4v10H4V7zm6-3h4v16h-4V4zm6 6h4v7h-4v-7z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const WandIcon = ({ className }: IconProps): JSX.Element => (
  <svg aria-hidden="true" className={className ?? 'h-4 w-4'} fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
    <path
      d="M15 4V2m0 2v2m0-2h2m-2 0h-2m-2.586 6.586L4.707 19.293a1 1 0 000 1.414l.586.586a1 1 0 001.414 0l6.707-6.707m-6.707 0l-.707.707a1 1 0 000 1.414l.586.586a1 1 0 001.414 0l.707-.707m-2 2l6.586-6.586a2 2 0 012.828 0l.586.586a2 2 0 010 2.828l-6.586 6.586"
      strokeLinecap="round" strokeLinejoin="round"
    />
  </svg>
);

export const SlidersIcon = ({ className }: IconProps): JSX.Element => (
  <svg aria-hidden="true" className={className ?? 'h-4 w-4'} fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
    <path
      d="M12 3v1m0 16v1m0-18a2 2 0 100 4 2 2 0 000-4zm6 6v1m0 8v1m0-10a2 2 0 100 4 2 2 0 000-4zM6 15v1m0 4v1m0-6a2 2 0 100 4 2 2 0 000-4z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ExportIcon = ({ className }: IconProps): JSX.Element => (
  <svg aria-hidden="true" className={className ?? 'h-4 w-4'} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ImportIcon = ({ className }: IconProps): JSX.Element => (
  <svg aria-hidden="true" className={className ?? 'h-4 w-4'} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const CheckIcon = ({ className }: IconProps): JSX.Element => (
  <svg aria-hidden="true" className={className ?? 'h-4 w-4'} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ShareSectionIcon = ({ className }: IconProps): JSX.Element => (
  <svg aria-hidden="true" className={className ?? 'h-5 w-5 text-primary-500'} fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
    <path
      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CollapseIcon = ({ isCollapsed }: { isCollapsed: boolean }): JSX.Element => (
  <svg
    aria-hidden="true"
    className={`h-5 w-5 transition-transform duration-200 ease-out ${isCollapsed ? '' : 'rotate-180'}`}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LOGO_LETTER = 'T';

export const DrawerLogoIcon = (): JSX.Element => (
  <svg
    aria-hidden="true"
    className="h-7 w-7"
    fill="none"
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="logo-gradient" x1="0%" x2="100%" y1="0%" y2="100%">
        <stop offset="0%" stopColor="rgb(var(--color-primary-500))" />
        <stop offset="100%" stopColor="rgb(var(--color-primary-700))" />
      </linearGradient>
    </defs>
    <rect fill="url(#logo-gradient)" height="32" rx="8" width="32" />
    <text
      fill="white"
      fontFamily="system-ui, sans-serif"
      fontSize="18"
      fontWeight="700"
      textAnchor="middle"
      x="16"
      y="22"
    >
      {LOGO_LETTER}
    </text>
  </svg>
);

export const ResetIcon = ({ className }: IconProps): JSX.Element => (
  <svg
    aria-hidden="true"
    className={className ?? 'h-4 w-4'}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ChevronDownIcon = ({ className }: IconProps): JSX.Element => (
  <svg
    aria-hidden="true"
    className={className ?? 'h-4 w-4 text-text-muted transition-transform duration-200'}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
);

export const TableIcon = ({ className }: IconProps): JSX.Element => (
  <svg
    aria-hidden="true"
    className={className ?? 'h-4 w-4'}
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    viewBox="0 0 24 24"
  >
    <path
      d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M10.875 12c-.621 0-1.125.504-1.125 1.125M12 12c.621 0 1.125.504 1.125 1.125m0 0v1.5c0 .621-.504 1.125-1.125 1.125M12 13.125c0 .621.504 1.125 1.125 1.125m1.125 2.625h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M12 15.75c0-.621.504-1.125 1.125-1.125m-1.125 2.25c0 .621.504 1.125 1.125 1.125m0 0c.621 0 1.125-.504 1.125-1.125m0 0c0-.621.504-1.125 1.125-1.125"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const LayoutSectionIcon = ({ className }: IconProps): JSX.Element => (
  <svg aria-hidden="true" className={className ?? 'h-5 w-5 text-primary-500'} fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
    <rect height="7" rx="1" width="7" x="3" y="3" />
    <rect height="7" rx="1" width="7" x="14" y="3" />
    <rect height="7" rx="1" width="7" x="14" y="14" />
    <rect height="7" rx="1" width="7" x="3" y="14" />
  </svg>
);

export const IconCogDetailed = ({ className }: IconProps): JSX.Element => (
  <svg aria-hidden="true" className={className ?? 'h-5 w-5'} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path
      d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
