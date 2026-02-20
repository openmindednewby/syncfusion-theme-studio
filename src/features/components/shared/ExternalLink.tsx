import { memo, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';

import { ComponentTestIds } from '@/shared/testIds.components';
import { isValueDefined } from '@/utils';

interface ExternalLinkProps {
  href: string;
  text: string;
  disabled?: boolean;
  icon?: ReactNode;
  testId?: string;
}

const BASE_STYLE: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 'var(--component-external-link-gap)',
  fontFamily: 'var(--component-external-link-font-family)',
  fontSize: 'var(--component-external-link-font-size)',
  fontWeight: 'var(--component-external-link-font-weight)',
  lineHeight: 'var(--component-external-link-line-height)',
  letterSpacing: 'var(--component-external-link-letter-spacing)',
  textDecoration: 'var(--component-external-link-text-decoration)',
  transition: 'color var(--component-external-link-transition) ease',
};

const ICON_SIZE = 'var(--component-external-link-icon-size)';

function resolveTextColor(disabled: boolean, hovered: boolean): string {
  if (disabled) return 'var(--component-external-link-disabled-text-color)';
  if (hovered) return 'var(--component-external-link-hover-text-color)';
  return 'var(--component-external-link-text-color)';
}

function resolveIconColor(disabled: boolean, hovered: boolean): string {
  if (disabled) return 'var(--component-external-link-disabled-icon-color)';
  if (hovered) return 'var(--component-external-link-hover-icon-color)';
  return 'var(--component-external-link-icon-color)';
}

const DISABLED_STYLE: CSSProperties = { pointerEvents: 'none', cursor: 'default' };

const DefaultIcon = ({ color }: { color: string }): JSX.Element => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={ICON_SIZE}
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width={ICON_SIZE}
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" x2="21" y1="14" y2="3" />
    </svg>
  );
}

const CUSTOM_ICON_STYLE: CSSProperties = { display: 'inline-flex', alignItems: 'center' };

const ExternalLink = memo(({ href, text, disabled = false, icon, testId }: ExternalLinkProps): JSX.Element => {
  const [hovered, setHovered] = useState(false);

  const textColor = resolveTextColor(disabled, hovered);
  const iconColor = resolveIconColor(disabled, hovered);

  const style: CSSProperties = {
    ...BASE_STYLE,
    color: textColor,
    ...(disabled && DISABLED_STYLE),
  };

  return (
    <a
      aria-disabled={disabled || undefined}
      data-testid={testId ?? ComponentTestIds.EXTERNAL_LINK}
      href={href}
      rel="noopener noreferrer"
      style={style}
      tabIndex={disabled ? -1 : undefined}
      target="_blank"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span>{text}</span>
      {isValueDefined(icon)
        ? <span aria-hidden="true" style={{ ...CUSTOM_ICON_STYLE, color: iconColor }}>{icon}</span>
        : <DefaultIcon color={iconColor} />}
    </a>
  );
});

ExternalLink.displayName = 'ExternalLink';

export { ExternalLink };
