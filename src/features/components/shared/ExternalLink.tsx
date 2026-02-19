import { memo, useState } from 'react';
import type { CSSProperties } from 'react';

import { ComponentTestIds } from '@/shared/testIds.components';

interface ExternalLinkProps {
  href: string;
  text: string;
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

const ExternalLink = memo(({ href, text, testId }: ExternalLinkProps): JSX.Element => {
  const [hovered, setHovered] = useState(false);

  const textColor = hovered
    ? 'var(--component-external-link-hover-text-color)'
    : 'var(--component-external-link-text-color)';
  const iconColor = hovered
    ? 'var(--component-external-link-hover-icon-color)'
    : 'var(--component-external-link-icon-color)';

  const style: CSSProperties = { ...BASE_STYLE, color: textColor };

  return (
    <a
      data-testid={testId ?? ComponentTestIds.EXTERNAL_LINK}
      href={href}
      rel="noopener noreferrer"
      style={style}
      target="_blank"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span>{text}</span>
      <svg
        aria-hidden="true"
        fill="none"
        height={ICON_SIZE}
        stroke={iconColor}
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
    </a>
  );
});

ExternalLink.displayName = 'ExternalLink';

export { ExternalLink };
