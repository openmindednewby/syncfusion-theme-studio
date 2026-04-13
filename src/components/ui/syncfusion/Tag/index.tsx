import { memo, useCallback, useEffect } from 'react';

import { TagVariant } from '@/components/ui/shared/tagTypes';
import type { BaseTagProps } from '@/components/ui/shared/tagTypes';
import { isValueDefined } from '@/utils/is';
import { loadSyncfusionCss, SyncfusionCssModule } from '@/utils/loadSyncfusionCss';

export type SyncfusionTagProps = BaseTagProps;

export { TagVariant };

/** Syncfusion CSS class for each variant, enabling variant-specific !important overrides */
const VARIANT_CSS_CLASS: Record<TagVariant, string> = {
  [TagVariant.Default]: '',
  [TagVariant.Primary]: 'e-primary',
  [TagVariant.Success]: 'e-success',
  [TagVariant.Warning]: 'e-warning',
  [TagVariant.Danger]: 'e-danger',
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
  const variantClass = VARIANT_CSS_CLASS[variant];
  const sizeClass = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm';

  const handleRemove = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove?.();
  }, [onRemove]);

  const Tag = onClick ? 'button' : 'span';

  return (
    <Tag
      aria-label={label}
      className={`e-chip ${variantClass} inline-flex items-center gap-1.5 rounded-full border font-medium transition-colors ${sizeClass} ${
        onClick ? 'cursor-pointer' : ''
      }`}
      data-testid={testId}
      type={onClick ? 'button' : undefined}
      onClick={onClick}
    >
      {isValueDefined(icon) ? <span className="shrink-0">{icon}</span> : null}
      {label}
      {removable ? <button
          aria-label={`Remove ${label}`}
          className="e-chip-delete ml-0.5 inline-flex shrink-0 items-center justify-center rounded-full p-0.5 transition-opacity hover:opacity-70"
          type="button"
          onClick={handleRemove}
        >
          {'\u2715'}
        </button> : null}
    </Tag>
  );
});

SyncfusionTag.displayName = 'SyncfusionTag';
export default SyncfusionTag;
