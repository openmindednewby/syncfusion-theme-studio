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
    background: 'transparent',
    color: 'var(--component-badge-success-border)',
    border: '1px solid var(--component-badge-success-border)',
  },
  [BadgeVariant.Warning]: {
    background: 'transparent',
    color: 'var(--component-badge-warning-border)',
    border: '1px solid var(--component-badge-warning-border)',
  },
  [BadgeVariant.Error]: {
    background: 'transparent',
    color: 'var(--component-badge-error-border)',
    border: '1px solid var(--component-badge-error-border)',
  },
  [BadgeVariant.Info]: {
    background: 'transparent',
    color: 'var(--component-badge-info-border)',
    border: '1px solid var(--component-badge-info-border)',
  },
};

const FONT_WEIGHT_SEMIBOLD = 600;
const LINE_HEIGHT_NORMAL = 1.5;

const BASE_STYLE: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0.125rem 0.5rem',
  borderRadius: 'var(--radius-sm)',
  fontSize: 'var(--font-size-xs)',
  fontWeight: FONT_WEIGHT_SEMIBOLD,
  lineHeight: LINE_HEIGHT_NORMAL,
  whiteSpace: 'nowrap',
};

const AlertBadge = memo(({
  text, variant, appearance = AlertBadgeAppearance.Solid, testId,
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
