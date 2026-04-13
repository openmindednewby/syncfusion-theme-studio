import { memo, useEffect } from 'react';

import type { BaseCardProps } from '@/components/ui/shared/cardTypes';
import { isValueDefined } from '@/utils/is';
import { loadSyncfusionCss, SyncfusionCssModule } from '@/utils/loadSyncfusionCss';

export type SyncfusionCardProps = BaseCardProps;

const SyncfusionCard = memo(({
  children,
  header,
  footer,
  onClick,
  hoverable = false,
  bordered = true,
  testId = 'sf-card',
  className = '',
}: SyncfusionCardProps): JSX.Element => {
  useEffect(() => { loadSyncfusionCss(SyncfusionCssModule.Layouts).catch(() => undefined); }, []);

  const Component = onClick ? 'button' : 'div';

  return (
    <Component
      className={`e-card overflow-hidden rounded-lg transition-shadow ${
        hoverable ? 'hover:shadow-md' : ''
      } ${onClick ? 'cursor-pointer text-left w-full' : ''} ${className}`}
      data-testid={testId}
      style={{
        backgroundColor: 'var(--component-card-background)',
        borderWidth: bordered ? 'var(--component-card-border-width)' : '0',
        borderColor: 'var(--component-card-border)',
        borderStyle: bordered ? 'solid' : 'none',
      }}
      type={onClick ? 'button' : undefined}
      onClick={onClick}
    >
      {isValueDefined(header) ? <div
          className="e-card-header border-b px-4 py-3"
          style={{
            backgroundColor: 'var(--component-card-header-bg)',
            borderColor: 'var(--component-card-header-border)',
            color: 'var(--component-card-header-text)',
          }}
        >
          {header}
        </div> : null}
      <div className="e-card-content" style={{ padding: 'var(--component-card-content-padding)', color: 'var(--component-card-text)' }}>
        {children}
      </div>
      {isValueDefined(footer) ? <div
          className="e-card-footer border-t px-4 py-3"
          style={{
            backgroundColor: 'var(--component-card-footer-bg)',
            borderColor: 'var(--component-card-footer-border)',
            color: 'var(--component-card-text)',
          }}
        >
          {footer}
        </div> : null}
    </Component>
  );
});

SyncfusionCard.displayName = 'SyncfusionCard';
export default SyncfusionCard;
