/**
 * Demo-only icons for showcase pages (toolbar, breadcrumb, button demos).
 * Loaded only on demo/showcase routes.
 */
import type { IconProps } from './types';

export const HomeIcon = ({ className }: IconProps): JSX.Element => (
  <svg aria-hidden="true" className={className ?? 'h-4 w-4'} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const FolderDemoIcon = ({ className }: IconProps): JSX.Element => (
  <svg aria-hidden="true" className={className ?? 'h-4 w-4'} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path
      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ChartIcon = ({ className }: IconProps): JSX.Element => (
  <svg aria-hidden="true" className={className ?? 'h-4 w-4'} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CutIcon = ({ className }: IconProps): JSX.Element => (
  <svg aria-hidden="true" className={className ?? 'h-4 w-4'} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path
      d="M6 9a3 3 0 100-6 3 3 0 000 6zM6 21a3 3 0 100-6 3 3 0 000 6zM20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CopyIcon = ({ className }: IconProps): JSX.Element => (
  <svg aria-hidden="true" className={className ?? 'h-4 w-4'} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path
      d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2v-2M16 4h2a2 2 0 012 2v6a2 2 0 01-2 2h-8a2 2 0 01-2-2V6a2 2 0 012-2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const PasteIcon = ({ className }: IconProps): JSX.Element => (
  <svg aria-hidden="true" className={className ?? 'h-4 w-4'} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const UndoIcon = ({ className }: IconProps): JSX.Element => (
  <svg aria-hidden="true" className={className ?? 'h-4 w-4'} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M3 10h10a5 5 0 015 5v0a5 5 0 01-5 5H3M3 10l5-5M3 10l5 5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const RedoIcon = ({ className }: IconProps): JSX.Element => (
  <svg aria-hidden="true" className={className ?? 'h-4 w-4'} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M21 10H11a5 5 0 00-5 5v0a5 5 0 005 5h10M21 10l-5-5M21 10l-5 5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const SaveIcon = ({ className }: IconProps): JSX.Element => (
  <svg aria-hidden="true" className={className ?? 'h-4 w-4'} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path
      d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2zM17 21v-8H7v8M7 3v5h8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const BoldIcon = ({ className }: IconProps): JSX.Element => (
  <svg aria-hidden="true" className={className ?? 'h-4 w-4'} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6zM6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ItalicIcon = ({ className }: IconProps): JSX.Element => (
  <svg aria-hidden="true" className={className ?? 'h-4 w-4'} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M19 4h-9M14 20H5M15 4L9 20" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const UnderlineIcon = ({ className }: IconProps): JSX.Element => (
  <svg aria-hidden="true" className={className ?? 'h-4 w-4'} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M6 3v7a6 6 0 0012 0V3M4 21h16" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const AlignLeftIcon = ({ className }: IconProps): JSX.Element => (
  <svg aria-hidden="true" className={className ?? 'h-4 w-4'} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M17 10H3M21 6H3M21 14H3M17 18H3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const AlignCenterIcon = ({ className }: IconProps): JSX.Element => (
  <svg aria-hidden="true" className={className ?? 'h-4 w-4'} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M18 10H6M21 6H3M21 14H3M18 18H6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const AlignRightIcon = ({ className }: IconProps): JSX.Element => (
  <svg aria-hidden="true" className={className ?? 'h-4 w-4'} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M21 10H7M21 6H3M21 14H3M21 18H7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const DeleteIcon = ({ className }: IconProps): JSX.Element => (
  <svg aria-hidden="true" className={className ?? 'h-4 w-4'} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path
      d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const SearchDemoIcon = ({ className }: IconProps): JSX.Element => (
  <svg aria-hidden="true" className={className ?? 'h-4 w-4'} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const SettingsDemoIcon = ({ className }: IconProps): JSX.Element => (
  <svg aria-hidden="true" className={className ?? 'h-4 w-4'} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path
      d="M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ShareDemoIcon = ({ className }: IconProps): JSX.Element => (
  <svg aria-hidden="true" className={className ?? 'h-4 w-4'} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path
      d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const StarIcon = ({ className }: IconProps): JSX.Element => (
  <svg className={className ?? 'h-4 w-4'} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
  </svg>
);

export const ArrowIcon = ({ className }: IconProps): JSX.Element => (
  <svg className={className ?? 'h-4 w-4'} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
);
