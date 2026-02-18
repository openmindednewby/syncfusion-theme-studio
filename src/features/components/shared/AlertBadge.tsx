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
    background: 'var(--component-alert-badge-success-bg)',
    color: 'var(--component-alert-badge-success-text)',
  },
  [BadgeVariant.Warning]: {
    background: 'var(--component-alert-badge-warning-bg)',
    color: 'var(--component-alert-badge-warning-text)',
  },
  [BadgeVariant.Error]: {
    background: 'var(--component-alert-badge-error-bg)',
    color: 'var(--component-alert-badge-error-text)',
  },
  [BadgeVariant.Info]: {
    background: 'var(--component-alert-badge-info-bg)',
    color: 'var(--component-alert-badge-info-text)',
  },
};

const OUTLINE_STYLES: Record<BadgeVariant, CSSProperties> = {
  [BadgeVariant.Success]: {
    color: 'var(--component-alert-badge-success-border)',
    border: '1px solid var(--component-alert-badge-success-border)',
  },
  [BadgeVariant.Warning]: {
    color: 'var(--component-alert-badge-warning-border)',
    border: '1px solid var(--component-alert-badge-warning-border)',
  },
  [BadgeVariant.Error]: {
    color: 'var(--component-alert-badge-error-border)',
    border: '1px solid var(--component-alert-badge-error-border)',
  },
  [BadgeVariant.Info]: {
    color: 'var(--component-alert-badge-info-border)',
    border: '1px solid var(--component-alert-badge-info-border)',
  },
};

const BASE_STYLE: Record<string, string> = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: 'var(--component-alert-badge-padding-top)',
  paddingRight: 'var(--component-alert-badge-padding-right)',
  paddingBottom: 'var(--component-alert-badge-padding-bottom)',
  paddingLeft: 'var(--component-alert-badge-padding-left)',
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
