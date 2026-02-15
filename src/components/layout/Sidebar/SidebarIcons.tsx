/**
 * SVG icon components for the sidebar navigation.
 * All icons use currentColor and accept className for sizing.
 */

const ICON_SIZE = 18;

interface IconProps {
  className?: string;
}

const defaults = { width: ICON_SIZE, height: ICON_SIZE, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

export const CyberWatchLogo = ({ className }: IconProps): JSX.Element => (
  <svg className={className} fill="none" height="24" viewBox="0 0 24 24" width="24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    <path d="M22 12c0-5.52-4.48-10-10-10" stroke="url(#cw-grad)" strokeLinecap="round" strokeWidth="2" />
    <path d="M12 8a4 4 0 0 1 4 4" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    <path d="M16 12a4 4 0 0 1-4 4" stroke="url(#cw-grad)" strokeLinecap="round" strokeWidth="2" />
    <defs>
      <linearGradient id="cw-grad" x1="8" x2="22" y1="2" y2="16">
        <stop stopColor="rgb(var(--color-primary-400))" />
        <stop offset="1" stopColor="rgb(var(--color-primary-600))" />
      </linearGradient>
    </defs>
  </svg>
);

export const IconDashboard = ({ className }: IconProps): JSX.Element => (
  <svg {...defaults} className={className}>
    <rect height="7" rx="1" width="7" x="3" y="3" />
    <rect height="7" rx="1" width="7" x="14" y="3" />
    <rect height="7" rx="1" width="7" x="3" y="14" />
    <rect height="7" rx="1" width="7" x="14" y="14" />
  </svg>
);

export const IconFolder = ({ className }: IconProps): JSX.Element => (
  <svg {...defaults} className={className}>
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);

export const IconUser = ({ className }: IconProps): JSX.Element => (
  <svg {...defaults} className={className}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export const IconActivity = ({ className }: IconProps): JSX.Element => (
  <svg {...defaults} className={className}>
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

export const IconShieldAlert = ({ className }: IconProps): JSX.Element => (
  <svg {...defaults} className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <circle cx="12" cy="11" fill="currentColor" r="1" stroke="none" />
    <line x1="12" x2="12" y1="8" y2="8" />
  </svg>
);

export const IconBell = ({ className }: IconProps): JSX.Element => (
  <svg {...defaults} className={className}>
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

export const IconGlobe = ({ className }: IconProps): JSX.Element => (
  <svg {...defaults} className={className}>
    <circle cx="12" cy="12" r="10" />
    <line x1="2" x2="22" y1="12" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

export const IconZap = ({ className }: IconProps): JSX.Element => (
  <svg {...defaults} className={className}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

export const IconSignal = ({ className }: IconProps): JSX.Element => (
  <svg {...defaults} className={className}>
    <path d="M2 20h.01" />
    <path d="M7 20v-4" />
    <path d="M12 20v-8" />
    <path d="M17 20V8" />
    <path d="M22 20V4" />
  </svg>
);

export const IconShieldCheck = ({ className }: IconProps): JSX.Element => (
  <svg {...defaults} className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

export const IconBarChart = ({ className }: IconProps): JSX.Element => (
  <svg {...defaults} className={className}>
    <line x1="18" x2="18" y1="20" y2="10" />
    <line x1="12" x2="12" y1="20" y2="4" />
    <line x1="6" x2="6" y1="20" y2="14" />
  </svg>
);

export const IconCog = ({ className }: IconProps): JSX.Element => (
  <svg {...defaults} className={className}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

export const IconSettings = ({ className }: IconProps): JSX.Element => (
  <svg {...defaults} className={className}>
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const IconStore = ({ className }: IconProps): JSX.Element => (
  <svg {...defaults} className={className}>
    <path d="M3 9l1.5-5h15L21 9" />
    <path d="M3 9h18v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9z" />
    <path d="M9 21V13h6v8" />
    <path d="M3 9a3 3 0 0 0 3 3 3 3 0 0 0 3-3" />
    <path d="M9 9a3 3 0 0 0 3 3 3 3 0 0 0 3-3" />
    <path d="M15 9a3 3 0 0 0 3 3 3 3 0 0 0 3-3" />
  </svg>
);

export const IconChevronLeft = ({ className }: IconProps): JSX.Element => (
  <svg {...defaults} className={className} height="16" width="16">
    <polyline points="11 4 5 8 11 12" />
  </svg>
);

export const IconSearch = ({ className }: IconProps): JSX.Element => (
  <svg {...defaults} className={className} height="16" width="16">
    <circle cx="7.5" cy="7.5" r="5.5" />
    <line x1="12" x2="15" y1="12" y2="15" />
  </svg>
);

export const IconKey = ({ className }: IconProps): JSX.Element => (
  <svg {...defaults} className={className}>
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.78 7.78 5.5 5.5 0 0 1 7.78-7.78zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
  </svg>
);

export const IconWrench = ({ className }: IconProps): JSX.Element => (
  <svg {...defaults} className={className}>
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

export const IconPalette = ({ className }: IconProps): JSX.Element => (
  <svg {...defaults} className={className}>
    <circle cx="13.5" cy="6.5" fill="currentColor" r="0.5" />
    <circle cx="17.5" cy="10.5" fill="currentColor" r="0.5" />
    <circle cx="8.5" cy="7.5" fill="currentColor" r="0.5" />
    <circle cx="6.5" cy="12.5" fill="currentColor" r="0.5" />
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.9 0 1.5-.7 1.5-1.5 0-.4-.1-.7-.4-1-.3-.3-.4-.6-.4-1 0-.8.7-1.5 1.5-1.5H16c3.3 0 6-2.7 6-6 0-5.5-4.5-9-10-9z" />
  </svg>
);

export const IconFilter = ({ className }: IconProps): JSX.Element => (
  <svg {...defaults} className={className}>
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

export const IconRefresh = ({ className }: IconProps): JSX.Element => (
  <svg {...defaults} className={className}>
    <polyline points="23 4 23 10 17 10" />
    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
  </svg>
);

export const IconDownload = ({ className }: IconProps): JSX.Element => (
  <svg {...defaults} className={className}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" x2="12" y1="15" y2="3" />
  </svg>
);

export const IconMoreVertical = ({ className }: IconProps): JSX.Element => (
  <svg {...defaults} className={className}>
    <circle cx="12" cy="12" fill="currentColor" r="1" />
    <circle cx="12" cy="5" fill="currentColor" r="1" />
    <circle cx="12" cy="19" fill="currentColor" r="1" />
  </svg>
);

export const IconLayout = ({ className }: IconProps): JSX.Element => (
  <svg {...defaults} className={className}>
    <rect height="18" rx="2" ry="2" width="18" x="3" y="3" />
    <line x1="3" x2="21" y1="9" y2="9" />
    <line x1="9" x2="9" y1="21" y2="9" />
  </svg>
);

export const IconMessageSquare = ({ className }: IconProps): JSX.Element => (
  <svg {...defaults} className={className}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

export const IconPieChart = ({ className }: IconProps): JSX.Element => (
  <svg {...defaults} className={className}>
    <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
    <path d="M22 12A10 10 0 0 0 12 2v10z" />
  </svg>
);

export const IconFormInput = ({ className }: IconProps): JSX.Element => (
  <svg {...defaults} className={className}>
    <rect height="12" rx="2" width="20" x="2" y="6" />
    <path d="M12 12h.01" />
    <path d="M17 12h.01" />
    <path d="M7 12h.01" />
  </svg>
);
