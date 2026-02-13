import { memo, useCallback, useEffect } from 'react';

import { TagVariant } from '@/components/ui/shared/tagTypes';
import type { BaseTagProps } from '@/components/ui/shared/tagTypes';
import { isValueDefined } from '@/utils/is';
import { loadSyncfusionCss, SyncfusionCssModule } from '@/utils/loadSyncfusionCss';

export type SyncfusionTagProps = BaseTagProps;

export { TagVariant };

const VARIANT_MAP: Record<TagVariant, { bg: string; text: string; border: string }> = {
  [TagVariant.Default]: { bg: 'var(--component-chip-bg)', text: 'var(--component-chip-text)', border: 'var(--component-chip-border)' },
  [TagVariant.Primary]: { bg: 'var(--component-chip-primary-bg)', text: 'var(--component-chip-primary-text)', border: 'var(--component-chip-primary-border)' },
  [TagVariant.Success]: { bg: 'var(--component-chip-success-bg)', text: 'var(--component-chip-success-text)', border: 'var(--component-chip-success-border)' },
  [TagVariant.Warning]: { bg: 'var(--component-chip-warning-bg)', text: 'var(--component-chip-warning-text)', border: 'var(--component-chip-warning-border)' },
  [TagVariant.Danger]: { bg: 'var(--component-chip-danger-bg)', text: 'var(--component-chip-danger-text)', border: 'var(--component-chip-danger-border)' },
};

const SyncfusionTag = memo(({
  label,
  variant = TagVariant.Default,
  removable = false,
  onRemove,
  onClick,
  icon,
  testId = 'sf-tag',
  size = 'md',
}: SyncfusionTagProps): JSX.Element => {
  useEffect(() => { loadSyncfusionCss(SyncfusionCssModule.Buttons).catch(() => undefined); }, []);
  const styles = VARIANT_MAP[variant];
  const sizeClass = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm';

  const handleRemove = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove?.();
  }, [onRemove]);

  const Tag = onClick ? 'button' : 'span';

  return (
    <Tag
      aria-label={label}
      className={`e-chip inline-flex items-center gap-1.5 rounded-full border font-medium transition-colors ${sizeClass} ${
        onClick ? 'cursor-pointer' : ''
      }`}
      data-testid={testId}
      style={{ backgroundColor: styles.bg, color: styles.text, borderColor: styles.border }}
      type={onClick ? 'button' : undefined}
      onClick={onClick}
    >
      {isValueDefined(icon) ? <span className="shrink-0">{icon}</span> : null}
      {label}
      {removable ? <button
          aria-label={`Remove ${label}`}
          className="e-chip-delete ml-0.5 inline-flex shrink-0 items-center justify-center rounded-full p-0.5 transition-opacity hover:opacity-70"
          style={{ color: styles.text }}
          type="button"
          onClick={handleRemove}
        >
          ✕
        </button> : null}
    </Tag>
  );
});

SyncfusionTag.displayName = 'SyncfusionTag';
export default SyncfusionTag;
