import type { IconProps } from './types';

export const ThemeStudioLogo = ({ className }: IconProps): JSX.Element => (
  <svg className={className} fill="none" viewBox="0 0 48 48">
    <rect height="36" rx="4" stroke="currentColor" strokeWidth="2" width="30" x="9" y="6" />
    <circle cx="20" cy="24" fill="currentColor" opacity="0.9" r="7" />
    <circle cx="30" cy="20" fill="currentColor" opacity="0.6" r="6" />
    <circle cx="26" cy="30" fill="currentColor" opacity="0.35" r="5" />
    <line stroke="currentColor" strokeLinecap="round" strokeWidth="2.5" x1="24" x2="24" y1="42" y2="48" />
  </svg>
);
