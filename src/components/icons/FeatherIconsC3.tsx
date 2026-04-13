/**
 * Auto-generated Feather icons (IconCreditCard – IconCrosshair).
 * DO NOT EDIT — re-run: npm run figma:generate:icons
 */
import type { IconProps } from './types';

const ICON_SIZE = 18;

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

export const IconCreditCard = ({ className }: IconProps): JSX.Element => (
  <svg {...defaults} className={className}>
    <path d="M21 4H2.99998C1.89542 4 0.999985 4.89543 0.999985 6V18C0.999985 19.1046 1.89542 20 2.99998 20H21C22.1046 20 23 19.1046 23 18V6C23 4.89543 22.1046 4 21 4Z" />
    <path d="M0.999985 10H23" />
  </svg>
);

export const IconCrop = ({ className }: IconProps): JSX.Element => (
  <svg {...defaults} className={className}>
    <g clipPath="url(#clip0_2868_2014)">
    <path d="M6.13 1L6 16C6 16.5304 6.21071 17.0391 6.58579 17.4142C6.96086 17.7893 7.46957 18 8 18H23" />
    <path d="M0.999969 6.13L16 6C16.5304 6 17.0391 6.21071 17.4142 6.58579C17.7893 6.96086 18 7.46957 18 8V23" />
    </g>
    <defs>
    <clipPath id="clip0_2868_2014">
    <rect fill="white" height="24" width="24" />
    </clipPath>
    </defs>
  </svg>
);

export const IconCrosshair = ({ className }: IconProps): JSX.Element => (
  <svg {...defaults} className={className}>
    <path d="M12 22C17.5229 22 22 17.5228 22 12C22 6.47715 17.5229 2 12 2C6.47718 2 2.00003 6.47715 2.00003 12C2.00003 17.5228 6.47718 22 12 22Z" />
    <path d="M22 12H18" />
    <path d="M6.00003 12H2.00003" />
    <path d="M12 6V2" />
    <path d="M12 22V18" />
  </svg>
);
