import { memo, useState, useCallback, useEffect } from 'react';

import type { BaseTabsProps } from '@/components/ui/shared/tabsTypes';
import { isValueDefined } from '@/utils/is';
import { loadSyncfusionCss, SyncfusionCssModule } from '@/utils/loadSyncfusionCss';

export type SyncfusionTabsProps = BaseTabsProps;

const SyncfusionTabs = memo(({
  items,
  defaultActiveId,
  onChange,
  testId = 'sf-tabs',
  orientation = 'horizontal',
}: SyncfusionTabsProps): JSX.Element => {
  const [activeId, setActiveId] = useState(defaultActiveId ?? items[0]?.id ?? '');

  useEffect(() => {
    loadSyncfusionCss(SyncfusionCssModule.Navigations).catch(() => undefined);
  }, []);

  const handleClick = useCallback((id: string) => {
    setActiveId(id);
    onChange?.(id);
  }, [onChange]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, id: string) => {
    const enabledItems = items.filter((item) => item.disabled !== true);
    const currentEnabledIndex = enabledItems.findIndex((item) => item.id === id);

    let nextIndex = -1;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextIndex = (currentEnabledIndex + 1) % enabledItems.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextIndex = (currentEnabledIndex - 1 + enabledItems.length) % enabledItems.length;
    }

    if (nextIndex >= 0) {
      const nextItem = enabledItems[nextIndex];
      if (isValueDefined(nextItem)) {
        handleClick(nextItem.id);
        const el = document.querySelector<HTMLElement>(`[data-tab-id="${nextItem.id}"]`);
        el?.focus();
      }
    }
  }, [items, handleClick]);

  const isVertical = orientation === 'vertical';
  const activeItem = items.find((i) => i.id === activeId);

  return (
    <div className={`e-tab ${isVertical ? 'flex gap-4' : ''}`} data-testid={testId}>
      <div
        className={`e-tab-header flex ${isVertical ? 'flex-col border-r' : 'border-b'}`}
        role="tablist"
        style={{ borderColor: 'var(--component-tabs-border)', backgroundColor: 'var(--component-tabs-bg)' }}
      >
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <button
              key={item.id}
              aria-selected={isActive}
              className={`e-tab-item relative px-4 py-2.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 ${
                item.disabled === true ? 'e-disable cursor-not-allowed opacity-50' : 'cursor-pointer'
              }`}
              data-tab-id={item.id}
              disabled={item.disabled}
              role="tab"
              style={{
                color: isActive ? 'var(--component-tabs-active-text)' : 'var(--component-tabs-inactive-text)',
                backgroundColor: isActive ? 'var(--component-tabs-active-bg)' : 'transparent',
              }}
              tabIndex={isActive ? 0 : -1}
              type="button"
              onClick={() => handleClick(item.id)}
              onKeyDown={(e) => handleKeyDown(e, item.id)}
              onMouseEnter={(e) => {
                if (!isActive && item.disabled !== true) {
                  const target = e.currentTarget;
                  target.style.backgroundColor = 'var(--component-tabs-hover-bg)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  const target = e.currentTarget;
                  target.style.backgroundColor = 'transparent';
                }
              }}
            >
              <span className="flex items-center gap-2">
                {item.icon}
                {item.label}
              </span>
              {isActive && !isVertical ? <span
                  className="absolute bottom-0 left-0 h-0.5 w-full"
                  style={{ backgroundColor: 'var(--component-tabs-indicator)' }}
                /> : null}
              {isActive && isVertical ? <span
                  className="absolute right-0 top-0 h-full w-0.5"
                  style={{ backgroundColor: 'var(--component-tabs-indicator)' }}
                /> : null}
            </button>
          );
        })}
      </div>
      <div className="e-content p-4" role="tabpanel">{activeItem?.content}</div>
    </div>
  );
});

SyncfusionTabs.displayName = 'SyncfusionTabs';
export default SyncfusionTabs;
