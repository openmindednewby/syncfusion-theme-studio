import { memo } from 'react';
import type { CSSProperties } from 'react';

import { BadgeNativeVariant as BadgeVariant } from '@/components/ui/native';
import { ComponentTestIds } from '@/shared/testIds.components';

import { AlertBadgeAppearance } from './alertBadgeAppearance';

interface AlertBadgeProps {
  text: string;
  variant: BadgeVariant;
  appearance?: AlertBadgeAppearance;
  testId?: string;
}

const SOLID_STYLES: Record<BadgeVariant, CSSProperties> = {
  [BadgeVariant.Success]: {
    background: 'var(--component-badge-success-bg)',
    color: 'var(--component-badge-success-text)',
  },
  [BadgeVariant.Warning]: {
    background: 'var(--component-badge-warning-bg)',
    color: 'var(--component-badge-warning-text)',
  },
  [BadgeVariant.Error]: {
    background: 'var(--component-badge-error-bg)',
    color: 'var(--component-badge-error-text)',
  },
  [BadgeVariant.Info]: {
    background: 'var(--component-badge-info-bg)',
    color: 'var(--component-badge-info-text)',
  },
};

const OUTLINE_STYLES: Record<BadgeVariant, CSSProperties> = {
  [BadgeVariant.Success]: {
    background: 'var(--component-badge-success-outline-bg)',
    color: 'var(--component-badge-success-border)',
    border: '1px solid var(--component-badge-success-border)',
  },
  [BadgeVariant.Warning]: {
    background: 'var(--component-badge-warning-outline-bg)',
    color: 'var(--component-badge-warning-border)',
    border: '1px solid var(--component-badge-warning-border)',
  },
  [BadgeVariant.Error]: {
    background: 'var(--component-badge-error-outline-bg)',
    color: 'var(--component-badge-error-border)',
    border: '1px solid var(--component-badge-error-border)',
  },
  [BadgeVariant.Info]: {
    background: 'var(--component-badge-info-outline-bg)',
    color: 'var(--component-badge-info-border)',
    border: '1px solid var(--component-badge-info-border)',
  },
};

const BASE_STYLE: Record<string, string> = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0.125rem 0.5rem',
  borderRadius: 'var(--radius-sm)',
  fontFamily: 'var(--component-alert-badge-font-family)',
  fontSize: 'var(--component-alert-badge-font-size)',
  fontWeight: 'var(--component-alert-badge-font-weight)',
  lineHeight: 'var(--component-alert-badge-line-height)',
  letterSpacing: 'var(--component-alert-badge-letter-spacing)',
  whiteSpace: 'nowrap',
};

const AlertBadge = memo(({
  text, variant, appearance = AlertBadgeAppearance.Outline, testId,
}: AlertBadgeProps): JSX.Element => {
  const variantStyle = appearance === AlertBadgeAppearance.Outline
    ? OUTLINE_STYLES[variant]
    : SOLID_STYLES[variant];

  return (
    <span
      data-testid={testId ?? ComponentTestIds.ALERT_BADGE}
      style={{ ...BASE_STYLE, ...variantStyle }}
    >
      {text}
    </span>
  );
});

AlertBadge.displayName = 'AlertBadge';

export { AlertBadge };
export type { AlertBadgeProps };
